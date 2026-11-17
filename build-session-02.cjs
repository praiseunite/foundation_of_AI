const fs = require('fs');
const path = require('path');
const { decorate } = require('./course-navigation.cjs');
const root = __dirname;
let first = fs.readFileSync(path.join(root, 'session-01.html'), 'utf8');
const themeCSS = `
/* Course theme controls */
:root{--on-accent:#fff;--chart-1:#b54120;--chart-2:#246b50;--chart-3:#5c58a6;--code-text:#f6f3df;color-scheme:light}
:root[data-theme="dark"]{--paper:#101c1c;--panel:#182b2a;--ink:#eef3ec;--muted:#b8cbc0;--line:#3d5751;--accent:#ffb27f;--soft:#3a2a25;--green:#9ce2b5;--green-soft:#213f32;--dark:#091515;--yellow:#473d21;--on-accent:#231a12;--chart-1:#ffb27f;--chart-2:#9ce2b5;--chart-3:#bab1ff;--shadow:0 12px 40px #0004;color-scheme:dark}
button.accent{color:var(--on-accent)}.track{background:var(--line)}#themeBtn{white-space:nowrap}#themeBtn[aria-pressed="true"]{background:var(--soft);border-color:var(--accent)}
@media print{:root[data-theme="dark"]{--paper:#fff;--panel:#fff;--ink:#213633;--muted:#586a64;--line:#cbd3c9;--accent:#b54120;--soft:#fce5da;--green-soft:#e0efe5;color-scheme:light}}
`;
const themeJS = `
// Bright and dark themes share a local preference across the course.
function applyTheme(mode){const dark=mode==='dark';document.documentElement.dataset.theme=dark?'dark':'bright';const b=document.getElementById('themeBtn');if(b){b.textContent=dark?'☀ Bright theme':'☾ Dark theme';b.setAttribute('aria-pressed',String(dark));b.setAttribute('aria-label','Switch to '+(dark?'bright':'dark')+' theme');}const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#101c1c':'#f4f2e9';try{localStorage.setItem('aptech-ai-theme',dark?'dark':'bright');}catch(e){}}
let preferredTheme='bright';try{preferredTheme=localStorage.getItem('aptech-ai-theme')||'bright';}catch(e){}applyTheme(preferredTheme);
document.getElementById('themeBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'bright':'dark'));
`;
if (!first.includes('/* Course theme controls */')) {
  first = first.replace('</style>', themeCSS + '</style>');
  first = first.replace('<button id="fullscreenBtn"', '<button id="themeBtn" aria-pressed="false">☾ Dark theme</button><button id="fullscreenBtn"');
  first = first.replace('</script>', themeJS + '</script>');
  fs.writeFileSync(path.join(root, 'session-01.html'), first);
}
const baseCSS = first.match(/<style>([\s\S]*?)<\/style>/)[1];
fs.writeFileSync(path.join(root, 'session-01.html'), decorate(first, 1));
const extraCSS = fs.readFileSync(path.join(root, 'session-02.styles.css'), 'utf8');
const source = fs.readFileSync(path.join(root, 'session-02.source.js'), 'utf8');
const document = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4f2e9"><title>Session 02 · Inside a neural network</title><style>${baseCSS}\n${extraCSS}</style></head><body>
<header class="top"><div class="brand">APTECH <span>/</span> FOUNDATIONS OF AI<br><span class="small muted">SESSION 02 · DEEP LEARNING</span></div><div class="toolbar"><button id="outlineBtn" aria-haspopup="dialog">Contents</button><button id="glossaryBtn" aria-haspopup="dialog">Word bank</button><button id="teacherBtn" aria-haspopup="dialog">Teacher notes</button><button id="themeBtn" aria-pressed="false">☾ Dark theme</button><button id="fullscreenBtn" class="optional">Full screen</button></div></header>
<div class="track" id="progress" role="progressbar" aria-label="Slide progress" aria-valuemin="1" aria-valuemax="35"><div id="progressFill"></div></div><main id="stage" class="stage" aria-label="Presentation slide"></main>
<footer class="bottom"><button id="prevBtn" aria-label="Previous slide">← Previous</button><div class="pageinfo"><span id="pageLabel"></span><div class="jump-hint">← → to move · N for notes · Esc to close</div></div><button id="nextBtn" class="primary" aria-label="Next slide">Next →</button></footer>
<div class="drawer" id="drawer" hidden><section class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle"><div class="drawer-head"><h2 id="drawerTitle"></h2><button id="closeDrawer" aria-label="Close panel">Close ×</button></div><div id="drawerBody" class="stack"></div></section></div>
<script>${source}\n${themeJS}</script></body></html>`;
fs.writeFileSync(path.join(root, 'session-02.html'), decorate(document, 2));
console.log('Built standalone Session 2 and added bright/dark themes to Session 1.');
