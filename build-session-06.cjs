const fs=require('fs'),path=require('path');
const {decorate}=require('./course-navigation.cjs');
const root=__dirname,previous=fs.readFileSync(path.join(root,'session-02.html'),'utf8');
const baseCSS=previous.match(/<style>([\s\S]*?)<\/style>/)[1];
const style=fs.readFileSync(path.join(root,'session-06.styles.css'),'utf8');
const source=fs.readFileSync(path.join(root,'session-06.source.js'),'utf8');
const themeJS=previous.match(/\/\/ Bright and dark themes share[\s\S]*?(?=<\/script>)/)[0];
const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4f2e9"><title>Session 06 · Put the foundations to work</title><style>${baseCSS}\n${style}</style></head><body>
<header class="top"><div class="brand">APTECH <span>/</span> FOUNDATIONS OF AI<br><span class="small muted">SESSION 06 · PRACTISE & CONSOLIDATE</span></div><div class="toolbar"><button id="outlineBtn" aria-haspopup="dialog">Contents</button><button id="glossaryBtn" aria-haspopup="dialog">Word bank</button><button id="teacherBtn" aria-haspopup="dialog">Teacher notes</button><button id="coverageBtn" aria-haspopup="dialog">Book checklist</button><button id="themeBtn" aria-pressed="false">☾ Dark theme</button><button id="fullscreenBtn" class="optional">Full screen</button></div></header>
<div class="track" id="progress" role="progressbar" aria-label="Slide progress" aria-valuemin="1" aria-valuemax="40"><div id="progressFill"></div></div><main id="stage" class="stage" aria-label="Presentation slide"></main>
<footer class="bottom"><button id="prevBtn" aria-label="Previous slide">← Previous slide</button><div class="pageinfo"><span id="pageLabel"></span><div class="jump-hint">← → slides · N notes · Esc close</div></div><button id="nextBtn" class="primary" aria-label="Next slide">Next slide →</button></footer>
<div class="drawer" id="drawer" hidden><section class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle"><div class="drawer-head"><h2 id="drawerTitle"></h2><button id="closeDrawer" aria-label="Close panel">Close ×</button></div><div id="drawerBody" class="stack"></div></section></div>
<script>${source}\n${themeJS}</script></body></html>`;
fs.writeFileSync(path.join(root,'session-06.html'),decorate(html,6));
for(const n of [1,2,3,4,5]){const file=path.join(root,'session-0'+n+'.html');fs.writeFileSync(file,decorate(fs.readFileSync(file,'utf8'),n));}
console.log('Built Session 6 and connected all six sessions.');
