const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=__dirname,out=path.join(root,'.qa-session-05');fs.mkdirSync(out,{recursive:true});
const file=n=>'file:///'+path.join(root,'session-0'+n+'.html').replace(/\\/g,'/').replace(/ /g,'%20');
for(const n of [1,2,3,4,5])new Function(fs.readFileSync(path.join(root,'session-0'+n+'.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1]);
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true}),errors=[],remote=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});
 await page.goto(file(5));await page.evaluate(()=>localStorage.clear());await page.reload();
 const go=i=>page.evaluate(i=>go(i),i);
 assert.equal(await page.evaluate(()=>slides.length),40);assert.equal(await page.evaluate(()=>sections.reduce((n,s)=>n+s.time,0)),120);
 assert.equal(await page.locator('.next-session').getAttribute('href'),'session-06.html');
 for(let n=5;n>1;n--){await page.locator('.previous-session').click();assert.match(page.url(),new RegExp('session-0'+(n-1)+'\\.html'));}
 assert.equal(await page.locator('.previous-session').getAttribute('aria-disabled'),'true');await page.locator('#themeBtn').click();
 for(let n=1;n<5;n++){await page.locator('.next-session').click();assert.match(page.url(),new RegExp('session-0'+(n+1)+'\\.html'));assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');}
 await page.evaluate(()=>applyTheme('bright'));await page.locator('#nextBtn').click();assert.equal(await page.evaluate(()=>state.slide),1);await page.locator('#prevBtn').click();assert.equal(await page.evaluate(()=>state.slide),0);
 await go(5);assert.match(await page.locator('#stage').innerText(),/23 October 2026/);assert.match(await page.locator('#stage').innerText(),/26 March 2026/);
 await go(10);await page.locator('#assignPrint').click();assert.equal(await page.locator('#variableOutput').innerText(),'Python variables');await page.locator('#literalPrint').check();assert.equal(await page.locator('#variableOutput').innerText(),'topic');
 await page.locator('#variableName').fill('1 topic');await page.locator('#assignPrint').click();assert.match(await page.locator('#variableOutput').innerText(),/valid variable name/);
 await page.locator('#variableName').fill('learner');await page.locator('#variableValue').fill('<img src=x onerror=alert(1)>');await page.locator('#literalPrint').uncheck();assert.equal(await page.locator('#variableOutput').innerText(),'<img src=x onerror=alert(1)>');assert.equal(await page.locator('#variableOutput img').count(),0);
 await go(13);await page.locator('#requestStep').click();assert.equal(await page.evaluate(()=>state.requestStep),1);await page.locator('#requestRun').click();assert.match(await page.locator('#requestOutput').innerText(),/variable is a name/);
 await page.locator('#requestModel').selectOption('gpt-3.5-turbo');assert.equal(await page.evaluate(()=>state.requestStep),0);await page.locator('#requestRun').click();assert.match(await page.locator('#requestOutput').innerText(),/retired/);
 await page.locator('#requestModel').selectOption('gpt-6-astra');await page.locator('#requestTopic').selectOption('api');await page.locator('#requestRun').click();assert.match(await page.locator('#requestOutput').innerText(),/one program request/);
 await go(16);await page.locator('[data-code-line="6"]').click();assert.match(await page.locator('#lineDetail').innerText(),/literal word prompt/);
 await go(18);await page.locator('#roleRun').click();assert.match(await page.locator('#roleOutput').innerText(),/one-sentence/);await page.locator('#instructionRole').selectOption('user');await page.locator('#roleRun').click();assert.match(await page.locator('#roleOutput').innerText(),/later user request/);
 await go(19);await page.locator('#weakPrompt').click();assert.equal(await page.locator('.check-item05.pass').count(),1);await page.locator('#strongPrompt').click();assert.equal(await page.locator('.check-item05.pass').count(),5);
 await page.locator('[data-prompt-field="task"]').fill('Explain a list with a two-item example.');assert.match(await page.locator('#promptOutput').innerText(),/two-item/);
 const promptDownload=page.waitForEvent('download');await page.locator('#downloadPrompt').click();const pd=await promptDownload;await pd.saveAs(path.join(out,pd.suggestedFilename()));assert.match(fs.readFileSync(path.join(out,pd.suggestedFilename()),'utf8'),/two-item/);
 await go(23);await page.locator('#fewRun').click();assert.equal(await page.locator('#fewOutput').innerText(),'HOURS');await page.locator('[data-few-label="HOURS"]').selectOption('BOOKING');await page.locator('#fewRun').click();assert.equal(await page.locator('#fewOutput').innerText(),'BOOKING');
 await page.locator('#useExamples').uncheck();await page.locator('#fewRun').click();assert.match(await page.locator('#fewOutput').innerText(),/seems to be/);await page.locator('#useExamples').check();
 const logicChecks=await page.evaluate(()=>{
   let checks=0;
   for(const b of ['BOOKING','HOURS','SAFETY','UNKNOWN'])for(const h of ['BOOKING','HOURS','SAFETY','UNKNOWN'])for(const s of ['BOOKING','HOURS','SAFETY','UNKNOWN']){
     const labels={BOOKING:b,HOURS:h,SAFETY:s},r=evaluateLabels(labels,true);
     if(r.correct!==1+(b==='BOOKING')+(h==='HOURS')+(s==='SAFETY')||r.format!==4)throw Error('Evaluation mismatch');
     for(const [topic,text] of Object.entries(fewInputs))if(scriptedLabel(text,labels,true)!==(topic==='unknown'?'UNKNOWN':labels[topic.toUpperCase()]))throw Error('Mapped label mismatch');checks++;
   }
   for(let n=0;n<=20;n++){const b=contextBudget(n);if(b.total!==200+80*n||b.remaining!==824-80*n||b.overflow!==(n>=11))throw Error('Context budget mismatch');checks++;}
   for(const text of ['null','[]','{}','{"category":"HOURS"}','{"label":"INVALID"}','{"label":"HOURS","extra":1}'])if(validateJSON(text).schema)throw Error('Invalid schema accepted');
   if(!validateJSON('{"label":"HOURS"}').meaning||validateJSON('{"label":"BOOKING"}').meaning||validateJSON('{"label":"HOURS",}').syntax)throw Error('JSON check mismatch');checks+=9;
   for(const name of ['Amina','Ṣọlá','<script>']){const all=historyMessages(name);if(historyAnswer(all)!=='Hello, '+name+'!'||historyAnswer(all.slice(-1))!=='What name would you like me to use?')throw Error('History mismatch');checks++;}
   return checks;
 });assert.equal(logicChecks,97);
 await go(24);await page.locator('[data-json-example="syntax"]').click();await page.locator('#validateJSON').click();assert.match(await page.locator('#jsonResult').innerText(),/syntax failed/);await page.locator('[data-json-example="meaning"]').click();await page.locator('#validateJSON').click();assert.match(await page.locator('#jsonResult').innerText(),/Meaning failed/);await page.locator('[data-json-example="correct"]').click();await page.locator('#validateJSON').click();assert.match(await page.locator('#jsonResult').innerText(),/Meaning matches/);
 await go(27);await page.locator('#historyRun').click();assert.equal(await page.locator('#historyOutput').innerText(),'Hello, Amina!');await page.locator('#includeHistory').uncheck();await page.locator('#historyRun').click();assert.match(await page.locator('#historyOutput').innerText(),/What name/);assert.doesNotMatch(await page.locator('#historyPacket').innerText(),/Amina/);
 await page.locator('#includeHistory').check();await page.locator('#studentName').fill('Bola');await page.locator('#historyRun').click();assert.equal(await page.locator('#historyOutput').innerText(),'Hello, Bola!');
 await go(31);await page.locator('#contextTurns').fill('15');assert.match(await page.locator('#contextResult').innerText(),/exceeds/);
 await go(34);await page.locator('#evaluateLabels').click();assert.equal(await page.evaluate(()=>state.evalOutput.correct),3);await page.locator('#resetExamples').click();await page.locator('#evaluateLabels').click();assert.equal(await page.evaluate(()=>state.evalOutput.correct),4);
 await go(35);await page.locator('[data-field="assistantHistory"]').fill('The second request includes the earlier user name and assistant acknowledgement.');await page.reload();assert.match(await page.locator('[data-field="assistantHistory"]').inputValue(),/earlier user name/);
 await go(36);const workDownload=page.waitForEvent('download');await page.locator('#downloadWork').click();const wd=await workDownload;await wd.saveAs(path.join(out,wd.suggestedFilename()));assert.match(fs.readFileSync(path.join(out,wd.suggestedFilename()),'utf8'),/earlier user name/);
 await page.locator('#teacherBtn').click();assert.match(await page.locator('#drawerBody').innerText(),/120-minute/);await page.keyboard.press('Escape');await page.locator('#glossaryBtn').click();await page.locator('#wordSearch').fill('previous_response_id');assert.match(await page.locator('#wordList').innerText(),/links/);await page.keyboard.press('Escape');
 await page.locator('#outlineBtn').click();await page.locator('[data-outline-go="13"]').click();assert.equal(await page.evaluate(()=>state.slide),13);
 await go(39);await page.locator('#sourcesBtn').click();assert.equal(await page.locator('#drawerBody a').count(),8);await page.keyboard.press('Escape');
 const overflow=[],projectorScroll=[],missingDownloads=[];
 for(let i=0;i<40;i++){await go(i);for(const href of await page.locator('#stage a[download]').evaluateAll(links=>links.map(a=>a.getAttribute('href'))))if(!fs.existsSync(path.join(root,href)))missingDownloads.push(href);}
 assert.deepEqual(missingDownloads,[]);
 for(const theme of ['bright','dark']){await page.evaluate(t=>applyTheme(t),theme);for(const width of [1440,1280,390,320]){await page.setViewportSize({width,height:width===1280?720:900});for(let i=0;i<40;i++){await go(i);const s=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,viewport:innerHeight}));if(s.scroll>s.width+1)overflow.push({theme,slide:i+1,...s});if(theme==='bright'&&width===1280&&s.height>s.viewport+30)projectorScroll.push({slide:i+1,height:s.height});}}}
 assert.deepEqual(overflow,[],'Horizontal overflow');assert.deepEqual(errors,[],'Browser script errors');assert.deepEqual(remote,[],'Offline page attempted a network request');
 await page.setViewportSize({width:1440,height:900});
 for(const theme of ['bright','dark']){await page.evaluate(t=>applyTheme(t),theme);for(const i of [0,13,19,23,27,34]){await go(i);if(i===13)await page.locator('#requestRun').click();if(i===23)await page.locator('#fewRun').click();if(i===27)await page.locator('#historyRun').click();await page.screenshot({path:path.join(out,theme+'-'+String(i+1).padStart(2,'0')+'.png'),fullPage:true,animations:'disabled'});}}
 await page.evaluate(()=>applyTheme('bright'));await page.setViewportSize({width:1280,height:720});for(const i of [13,19,23,27]){await go(i);await page.screenshot({path:path.join(out,'projector-'+(i+1)+'.png'),fullPage:true,animations:'disabled'});}
 await page.setViewportSize({width:390,height:844});await go(27);await page.screenshot({path:path.join(out,'mobile-history.png'),fullPage:true,animations:'disabled'});
 console.log(JSON.stringify({slides:40,minutes:120,logicChecks,sessionLinks:'1 ↔ 2 ↔ 3 ↔ 4 ↔ 5',themes:['bright','dark'],testedWidths:[1440,1280,390,320],horizontalOverflow:overflow.length,browserErrors:errors.length,networkRequests:remote.length,projectorScroll,screenshots:out},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
