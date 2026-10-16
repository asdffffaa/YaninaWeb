import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, basename } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { createSiteServer } from '../server.mjs';
let server, root, url;
const script = 'console.log("cached script");';
before(async () => {
  root = await mkdtemp(join(tmpdir(), 'yanina-server-test-'));
  await mkdir(join(root, 'assets'));
  await writeFile(join(root, 'index.html'), '<html>Yanina</html>');
  await writeFile(join(root, 'assets/app-12345678.js'), script);
  await writeFile(join(root, 'assets/app-12345678.js.br'), brotliCompressSync(script));
  await writeFile(join(root, 'assets/app-12345678.js.gz'), gzipSync(script));
  await writeFile(join(root, 'assets/photo.webp'), 'webp');
  server = createSiteServer(root);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  url = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server) {
    await new Promise((r) => server.close(r));
  }
  if (root) {
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    assert.ok(basename(root).startsWith('yanina-server-test-'));
    await rm(root, { recursive: true, force: true });
  }
});
test('HTML revalidates and unknown routes receive the application', async () => {
  const response = await fetch(url + '/course/example');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-cache');
  assert.match(await response.text(), /Yanina/);
});
test('hashed scripts use compression and immutable caching', async () => {
  const response = await fetch(url + '/assets/app-12345678.js', {
    headers: { 'Accept-Encoding': 'br, gzip' },
  });
  assert.equal(response.headers.get('content-encoding'), 'br');
  assert.match(response.headers.get('cache-control'), /immutable/);
  assert.equal(await response.text(), script);
});
test('disabled Brotli falls back to gzip', async () => {
  const response = await fetch(url + '/assets/app-12345678.js', {
    headers: { 'Accept-Encoding': 'br;q=0,gzip' },
  });
  assert.equal(response.headers.get('content-encoding'), 'gzip');
  assert.equal(await response.text(), script);
});
test('matching ETag avoids retransmission', async () => {
  const first = await fetch(url + '/assets/app-12345678.js');
  await first.text();
  const response = await fetch(url + '/assets/app-12345678.js', {
    headers: { 'If-None-Match': first.headers.get('etag') },
  });
  assert.equal(response.status, 304);
  assert.equal(await response.text(), '');
});
test('HEAD has headers but no body', async () => {
  const response = await fetch(url + '/assets/photo.webp', { method: 'HEAD' });
  assert.equal(response.headers.get('content-type'), 'image/webp');
  assert.equal(response.headers.get('content-length'), '4');
  assert.equal(await response.text(), '');
});
test('missing assets are real 404s; writes are rejected', async () => {
  assert.equal((await fetch(url + '/assets/missing.js')).status, 404);
  assert.equal((await fetch(url, { method: 'POST' })).status, 405);
});
test('encoded traversal cannot leave the website directory', async () => {
  assert.equal((await fetch(url + '/%2e%2e%5cprivate.txt')).status, 403);
});
