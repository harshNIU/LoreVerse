const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let code=fs.readFileSync('dist/app.js','utf8').split("$('#searchOpen').onclick=showSearch")[0];
vm.runInNewContext(code+`
for(const key of Object.keys(universes)){
 universe=key;
 for(level=0;level<=3;level++){
 const ns=visible(), ids=new Set(ns.map(n=>n.id));
 assert.equal(ids.size,ns.length);
 for(const e of edges()){assert(ids.has(e[0])&&ids.has(e[1]));assert(e[3]<=level)}
 for(const a of ns) for(const b of ns){const p=shortestPath(a.id,b.id);if(p){assert.equal(p[0],a.id);assert.equal(p.at(-1),b.id);for(const id of p)assert(ids.has(id));for(let i=1;i<p.length;i++)assert(edges().some(e=>e.includes(p[i-1])&&e.includes(p[i])));}}
 }
}
universe='marvel';level=3;assert.equal(shortestPath('tony','thanos').length,5);
level=0;assert(!visible().some(n=>n.id==='wanda'));assert.equal(shortestPath('tony','thanos'),null);
universe='got';level=1;assert(!visible().some(n=>n.id==='redwedding'));assert(!edges().some(e=>e.includes('redwedding')));
console.log('Passed: both universe graphs, every spoiler level, all-pairs path integrity, spoiler exclusion.');
`,{document:{querySelector(){return null},querySelectorAll(){return[]}},localStorage:{getItem(){return null}},console,assert});
