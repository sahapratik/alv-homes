import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
// Keep the complete first frame styled before painting, including on a slow connection.
export default defineConfig({
 plugins:[{name:'alv-first-frame',transformIndexHtml(html){return html.replace('<link rel="stylesheet" href="/style.css">',`<style>${readFileSync(new URL('./public/style.css',import.meta.url),'utf8')}</style>`);}}],
 server:{host:'0.0.0.0',port:4173,strictPort:true,allowedHosts:['terminal.local']},
 build:{target:'es2022'}
});
