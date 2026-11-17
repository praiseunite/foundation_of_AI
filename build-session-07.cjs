const fs=require('fs'),path=require('path');
const {decorate}=require('./course-navigation.cjs');
const previous=fs.readFileSync(path.join(__dirname,'session-02.html'),'utf8');
const css=previous.match(/<style>([\s\S]*?)<\/style>/)[1];
const themeJS=previous.match(/\/\/ Bright and dark themes share[\s\S]*?(?=<\/script>)/)[0];
const source=fs.readFileSync(path.join(__dirname,'session-07.source.js'),'utf8');
const styles=fs.readFileSync(path.join(__dirname,'session-07.styles.css'),'utf8');
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4f2e9"><title>Session 07 · Train your first model</title><style>${css}\n${styles}</style></head><body>
<header class="top"><div class="brand">APTECH <span>/</span> FOUNDATIONS OF AI<br><span class="small muted">SESSION 07 · EXTRA PRACTICAL WORKSHOP</span></div><div class="toolbar"><button id="outlineBtn" aria-haspopup="dialog">Contents</button><button id="glossaryBtn" aria-haspopup="dialog">Word bank</button><a class="assignment-link07" href="session-07-assignments.html">Assignments</a><button id="themeBtn" aria-pressed="false">☾ Dark theme</button><button id="fullscreenBtn" class="optional">Full screen</button></div></header>
<div class="track" id="progress" role="progressbar" aria-label="Slide progress" aria-valuemin="1" aria-valuemax="37"><div id="progressFill"></div></div><main id="stage" class="stage" aria-label="Presentation slide"></main>
<footer class="bottom"><button id="prevBtn" aria-label="Previous slide">← Previous slide</button><div class="pageinfo"><span id="pageLabel"></span><div class="jump-hint">← → slides · Esc close</div></div><button id="nextBtn" class="primary" aria-label="Next slide">Next slide →</button></footer>
<div class="drawer" id="drawer" hidden><section class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle"><div class="drawer-head"><h2 id="drawerTitle"></h2><button id="closeDrawer" aria-label="Close panel">Close ×</button></div><div id="drawerBody" class="stack"></div></section></div>
<script>${source}\n${themeJS}</script></body></html>`;
fs.writeFileSync(path.join(__dirname,'session-07.html'),decorate(html,7,7));
for(let n=1;n<=6;n++){const p=path.join(__dirname,'session-0'+n+'.html');fs.writeFileSync(p,decorate(fs.readFileSync(p,'utf8'),n,7));}
console.log('Built Session 7: an additional workshop linked to the six core sessions.');
