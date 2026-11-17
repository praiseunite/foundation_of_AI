const titles = ['Machine learning','Deep learning','Problem solving and search','Knowledge and reasoning','OpenAI coding','Practise and consolidate','Train your first model'];
const css = `
.course-nav{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:center;padding:9px 32px;border-bottom:1px solid var(--line);background:var(--panel)}
.session-link{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;width:fit-content;text-decoration:none;color:var(--ink);font-size:14px;border:1px solid var(--line);border-radius:9px;padding:7px 13px}
.session-link.next-session{justify-self:end}.session-link:not([aria-disabled]):hover{background:var(--soft);border-color:var(--accent)}.session-link[aria-disabled]{color:var(--muted);opacity:.65}
.course-position{display:grid;gap:1px;text-align:center;font-size:13px}.course-position b{letter-spacing:.08em;text-transform:uppercase;font-size:11px;color:var(--accent)}.course-position span{color:var(--muted)}
.stage{min-height:calc(100vh - 219px)}.pageinfo{min-width:0;text-align:center}.bottom button{flex-shrink:0}
@media(max-width:520px){.course-nav{gap:7px;padding:8px 12px}.session-link{font-size:12px;padding:6px 8px;max-width:103px;min-height:44px;line-height:1.3}.course-position{font-size:11px}.course-position span{display:none}.course-position b{font-size:10px;letter-spacing:.02em}.bottom{padding:10px 12px;gap:8px}.bottom button{font-size:12px;max-width:99px;line-height:1.4;padding:7px 9px;flex-shrink:1}.pageinfo{font-size:11px;overflow-wrap:anywhere}}
@media print{.course-nav{display:none}}
`;
function availableSessions(){let count=0;for(let n=1;n<=titles.length;n++){if(!require('fs').existsSync(require('path').join(__dirname,'session-0'+n+'.html')))break;count=n;}return count;}
function decorate(html, current, available=availableSessions()) {
  const prev = current>1 ? `<a class="session-link previous-session" href="session-0${current-1}.html" aria-label="Previous session: ${titles[current-2]}">← Previous session</a>` : '<span class="session-link previous-session" aria-disabled="true">← Previous session</span>';
  const next = current<available ? `<a class="session-link next-session" href="session-0${current+1}.html" aria-label="Next session: ${titles[current]}">${current===6?'Workshop 7 →':'Next session →'}</a>` : `<span class="session-link next-session" aria-disabled="true" title="${current===6?'This is the final scheduled session in the manual':current>6?'No later workshop has been created':'The next session has not been created yet'}">${current===6?'Final core session':current>6?'End of workshop':'Next session →'}</span>`;
  const nav=`<!-- course-session-navigation:start --><nav class="course-nav" aria-label="Course session navigation">${prev}<div class="course-position"><b>${current<=6?'Session '+current+' of 6':'Session '+current+' · extra workshop'}</b><span>${titles[current-1]}</span></div>${next}</nav><!-- course-session-navigation:end -->`;
  if(html.includes('<!-- course-session-navigation:start -->')) html=html.replace(/<!-- course-session-navigation:start -->[\s\S]*?<!-- course-session-navigation:end -->/,nav);
  else html=html.replace('</header>','</header>'+nav);
  const style='<style id="course-navigation-style">'+css+'</style>';
  if(html.includes('id="course-navigation-style"'))html=html.replace(/<style id="course-navigation-style">[\s\S]*?<\/style>/,style);
  else html=html.replace('</head>',style+'</head>');
  html=html.replace('>← Previous</button>','>← Previous slide</button>').replace('>Next →</button>','>Next slide →</button>');
  return html;
}
module.exports={decorate};
