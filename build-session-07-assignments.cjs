const fs=require('fs'),path=require('path');
const root=__dirname,base=fs.readFileSync(path.join(root,'session-02.html'),'utf8');
const css=base.match(/<style>([\s\S]*?)<\/style>/)[1];
const theme=base.match(/\/\/ Bright and dark themes share[\s\S]*?(?=<\/script>)/)[0];
const styles=fs.readFileSync(path.join(root,'session-07-assignments.styles.css'),'utf8');
const source=fs.readFileSync(path.join(root,'session-07-assignments.source.js'),'utf8');
function header(label){return `<header class="top"><div class="brand">APTECH <span>/</span> FOUNDATIONS OF AI<br><span class="small muted">SESSION 07 · ${label}</span></div><div class="toolbar"><a class="upload-label" href="session-07.html">Back to Session 7</a><button id="themeBtn" aria-pressed="false">☾ Dark theme</button></div></header>`;}
const head=title=>`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f4f2e9"><title>${title}</title><style>${css}\n${styles}</style></head><body>`;
const html=head('Session 7 · Student tasks and assignments')+header('STUDENT ASSIGNMENT PACK')+`<main class="assign-app"><div id="intro"></div><nav id="taskTabs" class="task-tabs" aria-label="Assignment navigation"></nav><section id="taskPanel" class="task-panel" aria-label="Current task"></section></main><footer class="pack-bottom"><button id="previousTask">← Previous</button><div class="pack-status"><div id="progressLabel"></div><div id="saveStatus" class="save-message" aria-live="polite"></div></div><button id="nextTask">Next task →</button></footer><div id="printContent"></div><script>${source}\n${theme}</script></body></html>`;
fs.writeFileSync(path.join(root,'session-07-assignments.html'),html);
const teacher=fs.readFileSync(path.join(root,'session-07-teacher-guide.body.html'),'utf8');
fs.writeFileSync(path.join(root,'session-07-teacher-guide.html'),head('Session 7 · Teacher answers and marking guide')+header('TEACHER ANSWERS & MARKING GUIDE')+'<main class="teacher-guide">'+teacher+'</main><script>'+theme+'</script></body></html>');
console.log('Built student assignment pack and separate teacher answer guide.');
