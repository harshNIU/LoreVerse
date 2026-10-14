const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{},document:{querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:()=>null},console,assert};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['got-data.js','got-relations.js','families-data.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),ctx);
vm.runInContext(fs.readFileSync('dist/app.js','utf8').split("$('#searchOpen').onclick=showSearch")[0],ctx);
vm.runInContext(fs.readFileSync('dist/got-app.js','utf8').split("\n$('#universeSwitcher').onclick=")[0],ctx);
vm.runInContext(fs.readFileSync('dist/families.js','utf8').split('const preFamilyRender=render;')[0],ctx);
vm.runInContext(`
universe='got';
assert.equal(LORE_HOUSES.length,45);
assert.equal(new Set(LORE_HOUSES.map(h=>h.id)).size,45);
for(const h of LORE_HOUSES){const ids=[...h.rows.flat(),...h.other];assert.equal(new Set(ids).size,ids.length);ids.forEach(id=>assert(entity(id),'Missing '+id));}
for(const e of LORE_FAMILY_EXTRA){assert(entity(e[0]));assert(entity(e[1]));}
for(level=0;level<8;level++)for(const h of LORE_HOUSES){const ids=new Set(houseMembers(h));for(const id of ids)assert(entity(id).level<=level);for(const e of houseRelations(h)){assert(ids.has(e[0])&&ids.has(e[1]));assert(e[3]<=level);}}
level=0;const dragons=LORE_HOUSES.find(h=>h.id==='targaryen');assert(!houseMembers(dragons).includes('jon'));assert(!houseMembers(dragons).includes('lyanna-stark'));familyQuery='jon';assert(!houseMatches().some(h=>h.id==='targaryen'));
level=7;assert(houseMembers(dragons).includes('jon'));assert(houseRelations(dragons).some(e=>e[0]==='rhaegar-targaryen'&&e[1]==='jon'&&e[2]==='parent of'));
const stark=LORE_HOUSES.find(h=>h.id==='stark');assert(!houseRelations(stark).some(e=>e[0]==='ned'&&e[1]==='jon'&&e[2]==='parent of'));
const bar=LORE_HOUSES.find(h=>h.id==='baratheon');assert(!houseRelations(bar).some(e=>e[0]==='robert-baratheon'&&e[1]==='joffrey-baratheon'&&e[2]==='parent of'));
familyQuery='Sansa';assert(houseMatches().some(h=>h.id==='stark'));familyQuery='<script>';assert.equal(houseMatches().length,0);
console.log('Passed: 45 houses, valid profiles, relationship integrity, all eight spoiler levels, hidden parentage and house search.');
`,ctx);
