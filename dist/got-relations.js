/* Relationships below are explicitly supported by the supplied HBO reference.
 * Levels are zero-based season cutoffs; seven means the complete series.
 * A textual mention is never promoted to a factual relationship. */
window.GOT_RELATIONS = [];
{
 const out=window.GOT_RELATIONS;
 const edge=(a,b,label,season=8)=>out.push([a,b,label,season-1]);
 const family=(parent,children,season=1)=>children.split(',').forEach(c=>edge(parent,c,'parent of',season));
 family('ned','robb-stark,sansa-stark,arya,bran,rickon-stark');
 family('catelyn-stark','robb-stark,sansa-stark,arya,bran,rickon-stark');
 family('tywin-lannister','jaime-lannister,cersei-lannister,tyrion');
 family('cersei-lannister','joffrey-baratheon,myrcella-baratheon,tommen-baratheon');
 family('jaime-lannister','joffrey-baratheon,myrcella-baratheon,tommen-baratheon');
 family('robert-baratheon','gendry',2);family('stannis-baratheon','shireen-baratheon',3);family('selyse-baratheon','shireen-baratheon',3);
 family('lysa-arryn','robin-arryn');family('jon-arryn','robin-arryn');family('hoster-tully','catelyn-stark,lysa-arryn,edmure-tully',3);
 family('olenna-tyrell','mace-tyrell',3);family('mace-tyrell','margaery-tyrell,loras-tyrell',2);
 family('balon-greyjoy','theon-greyjoy,yara-greyjoy',2);family('doran-martell','trystane-martell',5);
 family('oberyn-martell','obara-sand,nymeria-sand,tyene-sand',5);family('ellaria-sand','tyene-sand',5);
 family('jeor-mormont','jorah-mormont');family('maege-mormont','lyanna-mormont',6);
 family('howland-reed','jojen-reed,meera-reed',3);family('roose-bolton','ramsay',3);
 family('aerys-ii-targaryen','dany,viserys-targaryen,rhaegar-targaryen',7);
 family('rhaegar-targaryen','jon',7);family('lyanna-stark','jon',6);
 family('randyll-tarly','samwell-tarly,dickon-tarly,talla-tarly',6);family('melessa-tarly','samwell-tarly,dickon-tarly,talla-tarly',6);
 family('gilly','little-sam',3);family('craster','gilly',2);family('craster','little-sam',3);
 family('walder-frey','roslin-frey-tully,lothar-frey,black-walder-rivers',3);
 family('kevan-lannister','lancel-lannister');family('rickard-stark','ned,lyanna-stark,benjen-stark',6);
 family('rickard-karstark','torrhen-karstark,harald-karstark',6);family('harald-karstark','alys-karstark',7);
 family('davos-seaworth','matthos-seaworth',2);
 const relations=[
 ['ned','catelyn-stark','married to',1],['ned','jon','raised as son',1],['ned','jon','maternal uncle of',6],['ned','robert-baratheon','friend of',1],['ned','lyanna-stark','sibling of',1],['ned','benjen-stark','sibling of',1],['jon','arya','raised as sibling of',1],['jon','samwell-tarly','friend of',1],['jon','ygritte','lover of',3],['jon','tormund-giantsbane','allied with',5],['jon','dany','lover of',7],['dany','jon','paternal aunt of',7],['jon','dany','killed',8],['dany','khal-drogo','married to',1],['dany','jorah-mormont','advised by',1],['dany','barristan-selmy','advised by',3],['dany','missandei','advised by',3],['dany','tyrion','advised by',5],['dany','daario-naharis','lover of',4],['dany','varys','executed',8],['missandei','grey-worm','partner of',7],['tyrion','shae','lover of',1],['tyrion','sansa-stark','married to',3],['tyrion','bronn','protected by',1],['tyrion','podrick-payne','squired for by',2],['tyrion','tywin-lannister','killed',4],['tyrion','shae','killed',4],['jaime-lannister','cersei-lannister','twin and lover of',1],['jaime-lannister','tyrion','sibling of',1],['jaime-lannister','bran','attacked',1],['jaime-lannister','brienne-of-tarth','knighted',8],['cersei-lannister','robert-baratheon','married to',1],['cersei-lannister','euron-greyjoy','allied with',7],['cersei-lannister','high-sparrow','empowered',5],['cersei-lannister','qyburn','advised by',6],['qyburn','mountain','transformed',5],['hound','mountain','sibling of',1],['hound','arya','travelled with',3],['hound','sansa-stark','protected',2],['brienne-of-tarth','podrick-payne','mentored',4],['brienne-of-tarth','catelyn-stark','sworn to',2],['brienne-of-tarth','renly-baratheon','sworn to',2],['brienne-of-tarth','sansa-stark','protected',6],['brienne-of-tarth','stannis-baratheon','executed',5],['robb-stark','talisa-maegyr-stark','married to',2],['robb-stark','theon-greyjoy','friend of',1],['theon-greyjoy','ned','ward of',1],['theon-greyjoy','sansa-stark','rescued',5],['theon-greyjoy','bran','died protecting',8],['ramsay','theon-greyjoy','tortured',3],['ramsay','sansa-stark','married to',5],['ramsay','roose-bolton','killed',6],['ramsay','rickon-stark','killed',6],['roose-bolton','robb-stark','murdered',3],['walder-frey','roose-bolton','allied with',3],['tywin-lannister','walder-frey','allied with',3],['arya','walder-frey','killed',6],['arya','night-king','killed',8],['arya','syrio-forel','trained by',1],["arya","jaqen-h-ghar","trained by",5],['arya','gendry','friend of',2],['arya','hot-pie','friend of',2],['arya','littlefinger','executed',7],['littlefinger','sansa-stark','manipulated',4],['littlefinger','lysa-arryn','married to',4],['littlefinger','lysa-arryn','murdered',4],['littlefinger','ned','betrayed',1],['littlefinger','olenna-tyrell','conspired with',4],['lysa-arryn','jon-arryn','poisoned',4],['lysa-arryn','catelyn-stark','sibling of',1],['edmure-tully','catelyn-stark','sibling of',3],['edmure-tully','roslin-frey-tully','married to',3],['blackfish','catelyn-stark','uncle of',3],['margaery-tyrell','renly-baratheon','married to',2],['margaery-tyrell','joffrey-baratheon','married to',4],['margaery-tyrell','tommen-baratheon','married to',5],['loras-tyrell','renly-baratheon','lover of',1],['olenna-tyrell','joffrey-baratheon','poisoned',4],['oberyn-martell','ellaria-sand','partner of',4],['oberyn-martell','tyrion','champion for',4],['mountain','oberyn-martell','killed',4],['oberyn-martell','mountain','poisoned',4],['ellaria-sand','myrcella-baratheon','poisoned',5],['ellaria-sand','doran-martell','murdered',6],['myrcella-baratheon','trystane-martell','betrothed to',5],['euron-greyjoy','balon-greyjoy','murdered',6],['euron-greyjoy','yara-greyjoy','captured',7],['theon-greyjoy','yara-greyjoy','rescued',8],['yara-greyjoy','dany','allied with',6],['robert-baratheon','stannis-baratheon','sibling of',2],['robert-baratheon','renly-baratheon','sibling of',1],['stannis-baratheon','selyse-baratheon','married to',3],['stannis-baratheon','davos-seaworth','advised by',2],['stannis-baratheon','melisandre','advised by',2],['melisandre','jon','resurrected',6],['davos-seaworth','gendry','rescued',3],['shireen-baratheon','davos-seaworth','taught to read',3],['samwell-tarly','gilly','partner of',3],['samwell-tarly','jorah-mormont','cured',7],['jeor-mormont','jon','mentored',1],['maester-aemon','samwell-tarly','mentored',1],['bran','hodor-wylis','protected by',1],['bran','osha','protected by',1],['rickon-stark','osha','protected by',1],['bran','jojen-reed','guided by',3],['bran','meera-reed','protected by',3],['bran','three-eyed-raven','trained by',6],['night-king','three-eyed-raven','killed',6],['leaf','bran','protected',6],['benjen-stark','jon','rescued',7],['beric-dondarrion','thoros-of-myr','resurrected by',3],['beric-dondarrion','arya','died protecting',8],['dany','drogon','bonded with',1],['dany','rhaegal','bonded with',1],['dany','viserion','bonded with',1],['night-king','viserion','killed and reanimated',7],['euron-greyjoy','rhaegal','killed',8],['jon','ghost','bonded with',1],['arya','nymeria','bonded with',1],['sansa-stark','lady','bonded with',1],['bran','summer','bonded with',1],['robb-stark','grey-wind','bonded with',1],['rickon-stark','shaggydog','bonded with',1]
 ];relations.forEach(r=>edge(...r));
 const households={
 'family-stark-household':['ned','catelyn-stark','robb-stark','sansa-stark','arya','bran','rickon-stark','jon','theon-greyjoy'],
 'family-lannister-household':['tywin-lannister','jaime-lannister','cersei-lannister','tyrion','joffrey-baratheon','myrcella-baratheon','tommen-baratheon'],
 'family-baratheon-succession':['robert-baratheon','stannis-baratheon','renly-baratheon','gendry'],
 'family-tullyarryn-connection':['catelyn-stark','lysa-arryn','edmure-tully','blackfish','jon-arryn','robin-arryn'],
 'family-tyrell-connection':['olenna-tyrell','mace-tyrell','margaery-tyrell','loras-tyrell'],
 'family-greyjoy-connection':['balon-greyjoy','yara-greyjoy','theon-greyjoy','euron-greyjoy','aeron-greyjoy'],
 'family-martell-connection':['doran-martell','oberyn-martell','trystane-martell','ellaria-sand','obara-sand','nymeria-sand','tyene-sand'],
 'family-mormont-connection':['jeor-mormont','jorah-mormont','maege-mormont','lyanna-mormont'],
 'family-jon-s-true-family':['jon','ned','dany','rhaegar-targaryen','lyanna-stark']
 };for(const [h,members]of Object.entries(households))members.forEach(m=>edge(m,h,'connected to family',8));
 const eventParticipants={
 'event-red-wedding':['robb-stark','catelyn-stark','talisa-maegyr-stark','roose-bolton','walder-frey','edmure-tully'],
 'battle-blackwater':['tyrion','stannis-baratheon','tywin-lannister','bronn','podrick-payne','davos-seaworth'],
 'battle-battle-of-the-bastards':['jon','sansa-stark','ramsay','rickon-stark','tormund-giantsbane'],
 'battle-hardhome':['jon','tormund-giantsbane','night-king','karsi','loboda','wun-wun'],
 'battle-winterfell-the-long-night':['jon','arya','dany','night-king','theon-greyjoy','jorah-mormont','lyanna-mormont','edd','beric-dondarrion','melisandre'],
 'event-purple-wedding':['joffrey-baratheon','margaery-tyrell','olenna-tyrell','littlefinger','tyrion'],
 'event-great-sept-explosion':['cersei-lannister','margaery-tyrell','loras-tyrell','mace-tyrell','high-sparrow','kevan-lannister','lancel-lannister'],
 'event-daenerys-s-assassination':['jon','dany','drogon'],
 'battle-king-s-landing-the-bells':['dany','drogon','cersei-lannister','jaime-lannister','hound','mountain','grey-worm']
 };for(const [ev,people]of Object.entries(eventParticipants)){const n=GOT_REFERENCE.nodes.find(n=>n.id===ev);if(!n)throw Error('Missing event '+ev);people.forEach(p=>edge(p,ev,'involved in',n.level+1))}
 const ids=new Set(GOT_REFERENCE.nodes.map(n=>n.id));for(const e of out){if(!ids.has(e[0])||!ids.has(e[1]))throw Error('Unknown reference entity: '+e.join(' / '))}
}
