import { build } from 'vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = process.env.GITHUB_REPOSITORY || 'asdffffaa/YaninaWeb';
const name = repository.split('/')[1];
if (!name || !/^[\w.-]+$/.test(name)) throw new Error('Invalid GitHub repository name');
const base = name.endsWith('.github.io') ? '/' : `/${name}/`;
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');

await build({ root, base });

// The design contains literal public URLs in JavaScript. Rebase only the
// generated deployment files; keep all source components and styles intact.
async function rebase(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) await rebase(file);
    else if (/\.(?:js|css|html)$/.test(entry.name)) {
      const text = await readFile(file, 'utf8');
      const rebased = text.replace(/(?<![\w/.-])\/(?:assets|fonts)\//g, (url) => base + url.slice(1));
      if (rebased !== text) await writeFile(file, rebased);
    }
  }
}

await rebase(dist);
await import('./finalize-build.mjs');
await writeFile(resolve(dist, '.nojekyll'), '');
console.log(`GitHub Pages build ready at ${base}`);
