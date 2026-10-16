import { readdir, readFile, writeFile, stat, unlink } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)],
      ),
    )
  ).flat();
const files = await walk(root);
const textFiles = files.filter((file) => /\.(js|css|html)$/.test(file));
const texts = await Promise.all(textFiles.map((file) => readFile(file, 'utf8')));
const references = texts.join('\n');
let removed = 0,
  saved = 0;
// Keep original design assets in public; deploy only files referenced by the build.
// Check basenames as well as URLs to retain the certificate carousel's dynamic paths.
for (const file of files) {
  if (/\.(png|jpg|jpeg|webp|svg|ttf|woff2?)$/.test(file) && !references.includes(basename(file))) {
    saved += (await stat(file)).size;
    await unlink(file);
    removed++;
  }
}
for (let i = 0; i < textFiles.length; i++) {
  const body = Buffer.from(texts[i]);
  await Promise.all([
    writeFile(textFiles[i] + '.gz', gzipSync(body, { level: 9 })),
    writeFile(
      textFiles[i] + '.br',
      brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }),
    ),
  ]);
}
console.log(
  `Deployment: excluded ${removed} unused media files (${(saved / 1e6).toFixed(1)} MB); prepared Brotli and gzip.`,
);
