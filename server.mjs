import { createServer } from 'node:http';
import { networkInterfaces } from 'node:os';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = fileURLToPath(new URL('./dist/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json; charset=utf-8',
};
function encodings(header = '') {
  return header
    .split(',')
    .map((value) => {
      const [name, ...parameters] = value.trim().split(';');
      const q = parameters.find((p) => p.trim().startsWith('q='));
      return { name, quality: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((e) => ['br', 'gzip'].includes(e.name) && e.quality > 0)
    .sort((a, b) => b.quality - a.quality || (a.name === 'br' ? -1 : 1));
}
export function createSiteServer(directory = defaultRoot) {
  const root = resolve(directory);
  return createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.writeHead(405, { Allow: 'GET, HEAD' });
        res.end();
        return;
      }
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = resolve(root, '.' + pathname),
        info;
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        info = await stat(file);
        if (info.isDirectory()) {
          file = resolve(file, 'index.html');
          info = await stat(file);
        }
      } catch {
        if (extname(pathname)) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        file = resolve(root, 'index.html');
        info = await stat(file);
      }
      const extension = extname(file);
      let encoding = '';
      if (/\.(js|css|html)$/.test(file))
        for (const accepted of encodings(req.headers['accept-encoding'])) {
          const candidate = file + (accepted.name === 'br' ? '.br' : '.gz');
          try {
            const compressed = await stat(candidate);
            file = candidate;
            info = compressed;
            encoding = accepted.name;
            break;
          } catch {
            /* Plain files also work without a production build. */
          }
        }
      const etag = `"${info.size.toString(16)}-${Math.trunc(info.mtimeMs).toString(16)}-${encoding}"`;
      const immutable =
        /[\\/]assets[\\/](?:optimized-[a-f0-9]+\.webp|[^\\/]+-[\w-]{8}\.(?:js|css)(?:\.br|\.gz)?)$/.test(
          file,
        );
      const headers = {
        'Content-Type': types[extension] || 'application/octet-stream',
        'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
        ETag: etag,
        Vary: 'Accept-Encoding',
        'X-Content-Type-Options': 'nosniff',
        ...(encoding ? { 'Content-Encoding': encoding } : {}),
      };
      if (
        req.headers['if-none-match']
          ?.split(',')
          .some((tag) => tag.trim().replace(/^W\//, '') === etag)
      ) {
        res.writeHead(304, headers);
        res.end();
        return;
      }
      res.writeHead(200, { ...headers, 'Content-Length': info.size });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const stream = createReadStream(file);
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    } catch {
      if (!res.headersSent) res.writeHead(400);
      res.end('Bad request');
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 5173),
    host = process.env.HOST || '0.0.0.0';
  const server = createSiteServer();
  server.on('error', (e) => {
    console.error(
      e.code === 'EADDRINUSE'
        ? 'Port ' +
            port +
            ' is already in use. Close the previous site window or set a different PORT, then restart.'
        : e.message,
    );
    process.exitCode = 1;
  });
  server.listen(port, host, () => {
    console.log('\nYANINA — local preview\n');
    console.log('Computer: http://localhost:' + port);
    if (host === '0.0.0.0')
      for (const [name, addresses] of Object.entries(networkInterfaces())) {
        if (/vpn|vethernet|virtual|loopback/i.test(name)) continue;
        for (const address of addresses ?? [])
          if (address.family === 'IPv4' && !address.internal)
            console.log('Phone / LAN (' + name + '): http://' + address.address + ':' + port);
      }
    console.log('\nKeep this window open. Press Ctrl+C to stop.');
    console.log('If Windows asks, allow Node.js network access for your local network.');
  });
}
