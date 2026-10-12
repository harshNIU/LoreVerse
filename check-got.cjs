const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const raw=fs.readFileSync('data/game-of-thrones-reference.md','utf8');
const ctx={window:{},document:{querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:()=>null},console,assert,raw};ctx.window=ctx;vm.createContext(ctx);
for(const file of ['got-data.js','got-relations.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8'),ctx);
vm.runInContext(fs.readFileSync('dist/app.js','utf8').split("$('#searchOpen').onclick=showSearch")[0],ctx);
vm.runInContext(fs.readFileSync('dist/got-app.js','utf8').split("\n$('#universeSwitcher').onclick=")[0],ctx);
vm.runInContext(`
assert.equal(GOT_REFERENCE.raw,raw);
assert.equal(GOT_REFERENCE.sections.length,15);
assert.equal(got.nodes.length,348);
assert.equal(got.nodes.filter(n=>n.type==='Battle').length,34);
assert.equal(got.nodes.filter(n=>n.type==='Creature').length,10);
assert.equal(got.nodes.filter(n=>n.type==='Character').length,270);
assert.equal(new Set(got.nodes.map(n=>n.id)).size,got.nodes.length);
assert.equal(got.nodes.filter(n=>n.type==='Character').slice(0,6).map(n=>n.id).join(','),'jon,dany,tyrion,arya,sansa-stark,cersei-lannister');
universe='got';
for(level=0;level<=7;level++){
 const ids=new Set(visible().map(n=>n.id));
 for(const n of visible()){
  assert(n.level<=level);
  if(n.revealLevel>level){assert(!safeDescription(n).includes(n.description));assert(safeDescription(n).includes('later-season'));}
 }
 for(const e of edges()){assert(ids.has(e[0]));assert(ids.has(e[1]));assert(e[3]<=level)}
 for(const id of ['jon','dany','tyrion','arya','sansa-stark']) for(const target of ['ned','night-king','rhaegar-targaryen','cersei-lannister']){
  if(!ids.has(id)||!ids.has(target))continue;
  const p=shortestPath(id,target);if(p){for(const v of p)assert(ids.has(v));for(let i=1;i<p.length;i++)assert(edges().some(e=>(e[0]===p[i-1]&&e[1]===p[i])||(e[1]===p[i-1]&&e[0]===p[i])))}
 }
}
level=0;assert(!visible().some(n=>n.id==='family-jon-s-true-family'));assert(!searchable(entity('jon')).includes('rhaegar'));assert(!edges().some(e=>e[0]==='rhaegar-targaryen'&&e[1]==='jon'));
level=7;assert(searchable(entity('jon')).includes('rhaegar'));assert(shortestPath('jon','dany'));
assert(entity('season-0'));assert.equal(entity('season-0').year,0);
for(let i=1;i<=8;i++)assert.equal(entity('season-'+i).year,i);
assert(inlineMarkdown('[Ned](https://en.wikipedia.org/wiki/Ned_Stark)').includes('href="https://en.wikipedia.org/wiki/Ned_Stark"'));
assert(inlineMarkdown('[Jon](https://en.wikipedia.org/wiki/Jon_Snow_(character))').includes('href="https://en.wikipedia.org/wiki/Jon_Snow_(character)"'));
assert(!markdownBlock('<script>alert(1)</script>').includes('<script>'));
console.log('Passed: complete reference coverage, famous-first ordering, 8 spoiler levels, source links, safe rendering, graph integrity and paths.');
`,ctx);
