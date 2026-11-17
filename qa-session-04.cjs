const fs=require('fs');
const path=require('path');
const assert=require('assert/strict');
const {chromium}=require('C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=__dirname,out=path.join(root,'.qa-session-04');
fs.mkdirSync(out,{recursive:true});
const file=n=>'file:///'+path.join(root,'session-0'+n+'.html').replace(/\\/g,'/').replace(/ /g,'%20');
for(const n of [1,2,3,4])new Function(fs.readFileSync(path.join(root,'session-0'+n+'.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1]);
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(file(4));await page.evaluate(()=>localStorage.clear());await page.reload();
 const go=i=>page.evaluate(i=>go(i),i);
 assert.equal(await page.evaluate(()=>slides.length),40);
 assert.equal(await page.evaluate(()=>sections.reduce((t,s)=>t+s.time,0)),120);
 assert.equal(await page.locator('.next-session').getAttribute('href'),'session-05.html');
 for(let n=4;n>1;n--){await page.locator('.previous-session').click();assert.match(page.url(),new RegExp('session-0'+(n-1)+'\\.html'));}
 assert.equal(await page.locator('.previous-session').getAttribute('aria-disabled'),'true');
 await page.locator('#themeBtn').click();
 for(let n=1;n<4;n++){await page.locator('.next-session').click();assert.match(page.url(),new RegExp('session-0'+(n+1)+'\\.html'));assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');}
 await page.evaluate(()=>applyTheme('bright'));
 await page.locator('#nextBtn').click();assert.equal(await page.evaluate(()=>state.slide),1);
 await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>state.slide),0);
 await go(5);await page.locator('[data-knowledge-type="meta"]').click();assert.match(await page.locator('#knowledgeDetail').innerText(),/Provenance/);
 await go(7);await page.locator('[data-representation="graph"]').click();assert.match(await page.locator('#representationDetail').innerText(),/labelled edges/i);
 await go(8);await page.locator('[data-relation="Lab2"]').click();assert.match(await page.locator('#relationDetail').innerText(),/physical whole/);
 await go(11);await page.locator('#ruleStep').click();assert.equal(await page.evaluate(()=>state.ruleStep),1);assert.match(await page.locator('#ruleTrace').innerText(),/trained: True/);
 await page.locator('#ruleRun').click();assert.match(await page.locator('#ruleVerdict').innerText(),/condition satisfied/);
 await page.locator('[data-fact="completed_safety"]').selectOption('unknown');assert.equal(await page.evaluate(()=>state.ruleStep),0);
 await page.locator('#ruleRun').click();assert.match(await page.locator('#ruleVerdict').innerText(),/Insufficient evidence/);
 await page.locator('[data-fact="suspended"]').selectOption('true');await page.locator('#ruleRun').click();assert.match(await page.locator('#ruleVerdict').innerText(),/not satisfied/);
 const reasoningChecks=await page.evaluate(()=>{
   let checks=0;
   for(const enrolled of [true,false,null])for(const completed_safety of [true,false,null])for(const suspended of [true,false,null]){
     const all=knowledgeTrace({enrolled,completed_safety,suspended});
     const completions=[];
     for(const e of enrolled===null?[true,false]:[enrolled])for(const t of completed_safety===null?[true,false]:[completed_safety])for(const s of suspended===null?[true,false]:[suspended])completions.push(e&&t&&!s);
     const expected=completions.every(Boolean)?true:completions.every(v=>!v)?false:null;
     if(all[2].value!==expected)throw Error('Three-valued rule mismatch');checks++;
   }
   for(const p of [true,false])for(const q of [true,false])for(const op of ['and','or','not','implies']){
     const expected=op==='and'?p&&q:op==='or'?p||q:op==='not'?!p:!p||q;
     if(connective(p,q,op)!==expected)throw Error('Connective mismatch');checks++;
   }
   return checks;
 });assert.equal(reasoningChecks,43);
 await go(19);await page.locator('#logicOperator').selectOption('implies');assert.match(await page.locator('#logicResult').innerText(),/False/);
 await page.locator('#toggleP').click();assert.match(await page.locator('#logicResult').innerText(),/True/);
 await go(20);assert.match(await page.locator('#predicateResult').innerText(),/Result: False/);
 await page.locator('[data-person="Bola"]').click();assert.match(await page.locator('#predicateResult').innerText(),/Result: True/);
 await go(23);await page.locator('#runCode').click();assert.equal(await page.locator('#codeOutput').innerText(),'False\nCheck requirements');
 await page.locator('#codeEditor').fill(await page.evaluate(()=>INITIAL_CODE.replace('completed_safety = False','completed_safety = True')));await page.locator('#runCode').click();assert.equal(await page.locator('#codeOutput').innerText(),'True\nLab access granted');
 const codeChecks=await page.evaluate(()=>{
   let checks=0;
   for(const e of [true,false])for(const t of [true,false])for(const s of [true,false]){
     const source=INITIAL_CODE.replace('enrolled = True','enrolled = '+truth(e)).replace('completed_safety = False','completed_safety = '+truth(t)).replace('suspended = False','suspended = '+truth(s));
     const yes=e&&t&&!s,expected=truth(yes)+'\n'+(yes?'Lab access granted':'Check requirements');
     if(runTeachingCode(source)!==expected)throw Error('Code outcome mismatch');checks++;
   }
   if(runTeachingCode('x = True or missing\nprint(x)')!=='True')throw Error('Short-circuit OR failed');checks++;
   if(runTeachingCode('x = False and missing\nprint(x)')!=='False')throw Error('Short-circuit AND failed');checks++;
   if(runTeachingCode('x = not (True and False)\nprint(x)')!=='True')throw Error('Parentheses failed');checks++;
   if(!/NameError/.test(runTeachingCode('print(missing)')))throw Error('Unknown name not reported');checks++;
   if(!/four spaces/.test(runTeachingCode('if True:\nprint("Hello")')))throw Error('Missing indentation not reported');checks++;
   if(!/NameError/.test(runTeachingCode('x = true\nprint(x)')))throw Error('Wrong literal case not reported');checks++;
   if(!/unsupported/.test(runTeachingCode('import os')))throw Error('Unsupported instruction not reported');checks++;
   if(runTeachingCode('x = False\nif x:\n    print("wrong")\nelse:\n    if not x:\n        print("right")')!=='right')throw Error('Nested branch failed');checks++;
   return checks;
 });assert.equal(codeChecks,16);
 await go(24);await page.locator('[data-code-line="6"]').click();assert.match(await page.locator('#lineDetail').innerText(),/Four leading spaces/);
 await go(28);assert.match(await page.locator('#metricSummary').innerText(),/75.0%/);await page.locator('[data-message="M05"]').click();assert.match(await page.locator('#messageDetail').innerText(),/wrongly flagged/);
 const metricChecks=await page.evaluate(()=>{
   let count=0;
   for(let threshold=0;threshold<=100;threshold++)for(const baseline of [true,false]){
     const c=metricsAt(threshold,baseline),positives=messages.filter(m=>!baseline&&m.score>=threshold),negatives=messages.filter(m=>baseline||m.score<threshold);
     const tp=positives.filter(m=>m.spam).length,fp=positives.filter(m=>!m.spam).length,fn=negatives.filter(m=>m.spam).length,tn=negatives.filter(m=>!m.spam).length;
     if(c.tp!==tp||c.fp!==fp||c.fn!==fn||c.tn!==tn||tp+fp+fn+tn!==12)throw Error('Confusion count mismatch');
     if(c.accuracy!==(tp+tn)/12||c.precision!==(positives.length?tp/positives.length:null)||c.recall!==tp/4||c.f1!==2*tp/(2*tp+fp+fn))throw Error('Metric ratio mismatch');count++;
   }return count;
 });assert.equal(metricChecks,202);
 await page.locator('[data-threshold="80"]').click();assert.deepEqual(await page.evaluate(()=>({tp:metricsAt(state.threshold).tp,fp:metricsAt(state.threshold).fp})),{tp:2,fp:0});
 await page.locator('#baselineBtn').click();assert.match(await page.locator('#metricSummary').innerText(),/Undefined/);assert.equal(await page.locator('#threshold').isDisabled(),true);
 await page.locator('[data-threshold="35"]').click();assert.equal(await page.locator('#threshold').isDisabled(),false);assert.equal(await page.evaluate(()=>metricsAt(state.threshold).recall),1);
 await go(35);await page.locator('#generateDemo').click();assert.match(await page.locator('#genAnswer').innerText(),/09:00/);
 await page.locator('#grounded').uncheck();await page.locator('#generateDemo').click();assert.match(await page.locator('#genAnswer').innerText(),/08:00/);assert.match(await page.locator('#genWhy').innerText(),/unsupported/);
 await page.locator('#grounded').check();await page.locator('#genQuestion').selectOption('fee');await page.locator('#generateDemo').click();assert.match(await page.locator('#genAnswer').innerText(),/does not state a booking fee/);
 await go(36);await page.locator('[data-field="ownKnowledge"]').fill('Membership and availability support a booking request.');
 await page.reload();assert.equal(await page.locator('[data-field="ownKnowledge"]').inputValue(),'Membership and availability support a booking request.');
 await go(37);const downloadEvent=page.waitForEvent('download');await page.locator('#downloadWork').click();const download=await downloadEvent;await download.saveAs(path.join(out,download.suggestedFilename()));assert.match(fs.readFileSync(path.join(out,download.suggestedFilename()),'utf8'),/Membership and availability/);
 await page.locator('#teacherBtn').click();assert.match(await page.locator('#drawerBody').innerText(),/80/);await page.keyboard.press('Escape');
 await page.locator('#glossaryBtn').click();await page.locator('#wordSearch').fill('precision');assert.match(await page.locator('#wordList').innerText(),/TP\//);await page.keyboard.press('Escape');
 await page.locator('#outlineBtn').click();await page.locator('[data-outline-go="11"]').click();assert.equal(await page.evaluate(()=>state.slide),11);assert.equal(await page.locator('#drawer').isHidden(),true);
 await go(38);await page.locator('[data-quiz="exit2"][data-choice="1"]').click();assert.match(await page.locator('#feedback-exit2').innerText(),/^Yes/);
 await go(39);await page.locator('#sourcesBtn').click();assert.equal(await page.locator('#drawerBody a').count(),3);await page.keyboard.press('Escape');
 const overflow=[],projectorScroll=[];
 for(const theme of ['bright','dark']){await page.evaluate(t=>applyTheme(t),theme);for(const width of [1440,1280,390,320]){
   await page.setViewportSize({width,height:width===1280?720:900});
   for(let i=0;i<40;i++){await go(i);const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,viewport:innerHeight}));if(size.scroll>size.width+1)overflow.push({theme,slide:i+1,...size});if(theme==='bright'&&width===1280&&size.height>size.viewport+60)projectorScroll.push({slide:i+1,height:size.height});}
 }}
 assert.deepEqual(overflow,[],'Horizontal overflow');assert.deepEqual(errors,[],'Browser errors');
 await page.setViewportSize({width:1440,height:900});
 for(const theme of ['bright','dark']){await page.evaluate(t=>applyTheme(t),theme);for(const i of [0,11,19,23,28,35]){await go(i);if(i===11)await page.locator('#ruleRun').click();if(i===28)await page.locator('[data-threshold="50"]').click();if(i===35)await page.locator('#generateDemo').click();await page.screenshot({path:path.join(out,theme+'-'+String(i+1).padStart(2,'0')+'.png'),fullPage:true,animations:'disabled'});}}
 await page.evaluate(()=>applyTheme('bright'));await page.setViewportSize({width:1280,height:720});await go(28);await page.screenshot({path:path.join(out,'projector-metrics.png'),fullPage:true,animations:'disabled'});
 await page.setViewportSize({width:390,height:844});await go(11);await page.screenshot({path:path.join(out,'mobile-rules.png'),fullPage:true,animations:'disabled'});
 console.log(JSON.stringify({slides:40,minutes:120,reasoningChecks,codeChecks,metricChecks,sessionLinks:'1 ↔ 2 ↔ 3 ↔ 4',themes:['bright','dark'],testedWidths:[1440,1280,390,320],horizontalOverflow:overflow.length,browserErrors:errors.length,projectorScroll,screenshots:out},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
