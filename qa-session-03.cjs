const fs=require('fs');
const path=require('path');
const assert=require('assert/strict');
const {chromium}=require('C:/Users/DELL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=__dirname,out=path.join(root,'.qa-session-03');
fs.mkdirSync(out,{recursive:true});
const file=n=>'file:///'+path.join(root,'session-0'+n+'.html').replace(/\\/g,'/').replace(/ /g,'%20');
for(const n of [1,2,3])new Function(fs.readFileSync(path.join(root,'session-0'+n+'.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1]);
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(file(1));await page.evaluate(()=>localStorage.clear());await page.reload();
  assert.equal(await page.locator('.previous-session').getAttribute('aria-disabled'),'true');
  await page.locator('.next-session').click();
  assert.match(page.url(),/session-02\.html/);
  await page.locator('.previous-session').click();
  assert.match(page.url(),/session-01\.html/);
  await page.locator('.next-session').click();
  await page.locator('.next-session').click();
  assert.match(page.url(),/session-03\.html/);
  assert.equal(await page.locator('.next-session').getAttribute('href'),'session-04.html');
  await page.locator('.previous-session').click();
  assert.match(page.url(),/session-02\.html/);
  await page.locator('.next-session').click();
  const go=i=>page.evaluate(i=>go(i),i);
  assert.equal(await page.evaluate(()=>slides.length),36);
  assert.equal(await page.evaluate(()=>sections.reduce((t,s)=>t+s.time,0)),120);
  const exhaustive=await page.evaluate(()=>{
    let comparisons=0;
    for(const mode of ['unit','weighted']){
      for(const [a,b,w] of edges){const c=mode==='unit'?1:w;if(heuristics[mode][a]>c+heuristics[mode][b]||heuristics[mode][b]>c+heuristics[mode][a])throw new Error('Inconsistent heuristic');}
      for(let mask=0;mask<(1<<edges.length);mask++){
        const blocked=edges.filter((_,i)=>mask&(1<<i)).map(([a,b])=>a+'-'+b);
        const adjacency={A:[],B:[],C:[],D:[],E:[],F:[]};
        edges.forEach(([a,b,w],i)=>{if(mask&(1<<i))return;const cost=mode==='unit'?1:w;adjacency[a].push([b,cost]);adjacency[b].push([a,cost]);});
        let minCost=Infinity,minMoves=Infinity;
        function enumerate(node,visited,cost){if(node==='F'){minCost=Math.min(minCost,cost);minMoves=Math.min(minMoves,visited.length-1);return;}for(const [next,w] of adjacency[node])if(!visited.includes(next))enumerate(next,[...visited,next],cost+w);}
        enumerate('A',['A'],0);
        for(const algorithm of ['bfs','dfs','ucs','greedy','astar']){
          const e=runEngine(algorithm,mode,blocked),expected=Number.isFinite(minCost);
          if(!e.result||e.result.found!==expected)throw new Error('Reachability mismatch '+algorithm+' mask '+mask);
          if(expected){
            if(['ucs','astar'].includes(algorithm)&&e.result.cost!==minCost)throw new Error('Optimal cost mismatch '+algorithm+' '+mask);
            if(algorithm==='bfs'&&e.result.path.length-1!==minMoves)throw new Error('BFS move count mismatch');
            let verifiedCost=0;for(let i=1;i<e.result.path.length;i++){const a=e.result.path[i-1],b=e.result.path[i],edge=adjacency[a].find(x=>x[0]===b);if(!edge)throw new Error('Invalid path');verifiedCost+=edge[1];}if(verifiedCost!==e.result.cost)throw new Error('Wrong cost');
          }
          comparisons++;
        }
      }
    }
    return comparisons;
  });
  assert.equal(exhaustive,2560);
  const initialCosts=await page.evaluate(()=>Object.fromEntries(Object.keys(algorithms).map(a=>[a,runEngine(a,'weighted').result.cost])));
  assert.deepEqual(initialCosts,{bfs:10,dfs:6,ucs:5,greedy:10,astar:5});
  await go(5);
  for(const [key,answer] of Object.entries({start:'Initial state',action:'Action',goal:'Goal test',cost:'Path cost'}))await page.locator('[data-form-role="'+key+'"]').selectOption(answer);
  await page.locator('#checkFormulation').click();
  assert.match(await page.locator('#formulationFeedback').innerText(),/^Correct/);
  await go(9);
  for(let i=0;i<4;i++)await page.locator('#agentStep').click();
  assert.equal(await page.evaluate(()=>state.vacuum.moves),2);
  assert.equal(await page.evaluate(()=>state.vacuum.cleans),2);
  await page.locator('[data-vacuum-type="model"]').click();
  for(let i=0;i<4;i++)await page.locator('#agentStep').click();
  assert.match(await page.locator('#agentAction').innerText(),/Wait/);
  assert.equal(await page.evaluate(()=>state.vacuum.moves),1);
  await page.locator('[data-dirty-room="A"]').click();
  await page.locator('#agentStep').click();
  assert.equal(await page.evaluate(()=>state.vacuum.dirty.A),true);
  assert.equal(await page.evaluate(()=>state.vacuum.memory.A),false);
  assert.match(await page.locator('#agentAction').innerText(),/Wait/);
  await go(18);
  await page.locator('#searchReset').click();
  await page.locator('#searchStep').click();
  assert.deepEqual(await page.evaluate(()=>state.engine.frontier.map(r=>r.node)),['B','C']);
  await page.locator('#searchRun').click();
  assert.equal(await page.evaluate(()=>state.engine.result.cost),3);
  await page.locator('#costMode').selectOption('weighted');
  await page.locator('#searchRun').click();
  assert.equal(await page.evaluate(()=>state.engine.result.cost),10);
  await page.locator('#searchAlgorithm').selectOption('astar');
  await page.locator('#searchRun').click();
  assert.equal(await page.evaluate(()=>state.engine.result.cost),5);
  await page.locator('#roadScenario').selectOption('gate');
  await page.locator('#searchRun').click();
  assert.equal(await page.evaluate(()=>state.engine.result.cost),6);
  await page.locator('#roadScenario').selectOption('isolated');
  await page.locator('#searchRun').click();
  assert.equal(await page.evaluate(()=>state.engine.result.found),false);
  assert.match(await page.locator('#searchResult').innerText(),/No route exists/);
  await page.locator('[data-node="F"]').click();
  assert.match(await page.locator('#nodeInfo').innerText(),/no open neighbours/);
  await go(24);
  await page.locator('#compareResetRoads').click();
  assert.match(await page.locator('#comparisonTable').innerText(),/Uniform-cost/);
  await page.locator('[data-compare-mode="unit"]').click();
  assert.equal(await page.locator('#comparisonTable tbody tr').count(),5);
  await go(29);
  await page.locator('#runCode').click();
  assert.equal(await page.locator('#codeOutput').innerText(),"Gate\n['Library', 'Lab']");
  assert.equal(await page.evaluate(()=>runTeachingCode('frontier = ["A", "B"]\ncurrent = frontier.pop(0)\nprint(current)\nprint(frontier)')),"A\n['B']");
  assert.equal(await page.evaluate(()=>runTeachingCode('frontier = ["A", "B"]\ncurrent = frontier.pop()\nprint(current)\nprint(frontier)')),"B\n['A']");
  assert.match(await page.evaluate(()=>runTeachingCode('frontier = []\ncurrent = frontier.pop(0)')),/outside the list/);
  assert.match(await page.evaluate(()=>runTeachingCode('print(missing)')),/NameError/);
  await go(30);
  await page.locator('[data-code-line="1"]').click();
  assert.match(await page.locator('#lineDetail').innerText(),/removes and returns/);
  await go(32);
  await page.locator('[data-field="practicalWhy"]').fill('BFS prioritises moves; UCS prioritises total cost.');
  const downloading=page.waitForEvent('download');await page.locator('#downloadWork').click();const download=await downloading;await download.saveAs(path.join(out,download.suggestedFilename()));
  assert.match(fs.readFileSync(path.join(out,download.suggestedFilename()),'utf8'),/UCS prioritises/);
  await page.reload();
  assert.equal(await page.locator('[data-field="practicalWhy"]').inputValue(),'BFS prioritises moves; UCS prioritises total cost.');
  await page.locator('#teacherBtn').click();assert.match(await page.locator('#drawerBody').innerText(),/costs5/);await page.keyboard.press('Escape');
  await page.locator('#glossaryBtn').click();await page.locator('#wordSearch').fill('heuristic');assert.match(await page.locator('#wordList').innerText(),/estimate/);await page.keyboard.press('Escape');
  await go(0);await page.locator('#nextBtn').click();assert.equal(await page.evaluate(()=>state.slide),1);await page.locator('#prevBtn').click();assert.equal(await page.evaluate(()=>state.slide),0);
  const overflow=[];
  for(const n of [1,2,3]){
    await page.goto(file(n));
    for(const theme of ['bright','dark']){
      await page.evaluate(t=>applyTheme(t),theme);
      for(const width of [1440,1280,390,320]){
        await page.setViewportSize({width,height:width===1280?720:900});
        const count=await page.evaluate(()=>slides.length);
        for(let i=0;i<count;i++){
          await go(i);const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
          if(size.scroll>size.width+1)overflow.push({session:n,theme,slide:i+1,...size});
        }
      }
    }
  }
  assert.deepEqual(overflow,[],'Horizontal overflow');
  assert.deepEqual(errors,[],'Runtime errors');
  await page.goto(file(3));await page.evaluate(()=>localStorage.clear());await page.reload();await page.setViewportSize({width:1440,height:900});
  for(const theme of ['bright','dark']){
    await page.evaluate(t=>applyTheme(t),theme);
    for(const i of [0,9,18,24,29]){
      await go(i);if(i===18)await page.evaluate(()=>{state.algorithm='astar';state.costMode='weighted';state.roadScenario='open';resetSearch();while(!state.engine.result)stepEngine(state.engine);updateSearch();});
      if(i===24)await page.locator('[data-compare-mode="weighted"]').click();
      if(i===29)await page.locator('#runCode').click();
      await page.screenshot({path:path.join(out,theme+'-'+String(i+1).padStart(2,'0')+'.png'),fullPage:true,animations:'disabled'});
    }
  }
  await page.setViewportSize({width:1280,height:720});await go(18);await page.screenshot({path:path.join(out,'projector-search.png'),fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});await go(18);await page.screenshot({path:path.join(out,'mobile-search.png'),fullPage:true,animations:'disabled'});
  console.log(JSON.stringify({slides:36,minutes:120,exhaustiveSearchComparisons:exhaustive,sessionsLinked:[1,2,3],themes:['bright','dark'],testedWidths:[1440,1280,390,320],horizontalOverflow:overflow.length,browserErrors:errors.length,checks:['bidirectional session links','slide navigation','formulation matching','reflex and model-based agents','stale observation handling','five search methods','cost and road changes','heuristic consistency','unreachable goal','queue interpreter and errors','line explanations','worksheet persistence and export','notes and glossary'],screenshots:out},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
