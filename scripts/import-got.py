"""Rebuild the complete TV reference dataset from the supplied Markdown."""
import json,re,unicodedata,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
raw=(root/'data/game-of-thrones-reference.md').read_text()
def plain(t):
 t=re.sub(r'\[([^\]]+)\]\((https?://(?:[^\s()]|\([^)]*\))*)\)',r'\1',t)
 return t.replace('**','').strip()
def slug(t):
 return re.sub('[^a-z0-9]+','-',unicodedata.normalize('NFKD',t).encode('ascii','ignore').decode().lower()).strip('-')
def links(t):
 return [{'label':a,'url':b} for a,b in re.findall(r'\[([^\]]+)\]\((https?://(?:[^\s()]|\([^)]*\))*)\)',t)]
sections=[]
for match in re.finditer(r'^## (\d+)\. (.+)\n([\s\S]*?)(?=^## |\Z)',raw,re.M):
 num,title,body=match.groups();sections.append({'number':int(num),'title':title,'body':body.strip(),'sources':links(body)})
aliases={'Jon Snow / Aegon Targaryen':('jon','Jon Snow'),'Daenerys Targaryen':('dany','Daenerys Targaryen'),'Tyrion Lannister':('tyrion','Tyrion Lannister'),'Arya Stark':('arya','Arya Stark'),'Eddard “Ned” Stark':('ned','Ned Stark'),'Brandon “Bran” Stark':('bran','Bran Stark'),'Sandor “the Hound” Clegane':('hound','Sandor Clegane'),'Gregor “the Mountain” Clegane':('mountain','Gregor Clegane'),'Petyr “Littlefinger” Baelish':('littlefinger','Petyr Baelish'),'Eddison “Dolorous Edd” Tollett':('edd','Eddison Tollett'),'Brynden “Blackfish” Tully':('blackfish','Brynden Tully'),'Ramsay Bolton / Snow':('ramsay','Ramsay Bolton')}
famous=['jon','dany','tyrion','arya','sansa-stark','cersei-lannister','jaime-lannister','ned','bran','theon-greyjoy','hound','brienne-of-tarth','tywin-lannister','robb-stark','catelyn-stark','jorah-mormont','samwell-tarly','night-king','tormund-giantsbane','margaery-tyrell','littlefinger','davos-seaworth','melisandre','varys','bronn','olenna-tyrell','oberyn-martell']
animals={'Drogon','Rhaegal','Viserion','Ghost','Grey Wind','Lady','Nymeria','Summer','Shaggydog','Ser Pounce'}
first={'jon':1,'dany':1,'tyrion':1,'arya':1,'sansa-stark':1,'cersei-lannister':1,'jaime-lannister':1,'ned':1,'bran':1,'theon-greyjoy':1,'hound':1,'mountain':1,'brienne-of-tarth':2,'tywin-lannister':1,'robb-stark':1,'catelyn-stark':1,'jorah-mormont':1,'samwell-tarly':1,'night-king':4,'tormund-giantsbane':3,'margaery-tyrell':2,'littlefinger':1,'davos-seaworth':2,'melisandre':2,'varys':1,'bronn':1,'olenna-tyrell':3,'oberyn-martell':4,'ramsay':3,'ygritte':2,'gilly':2,'maester-aemon':1,'jeor-mormont':1,'alliser-thorne':1,'edd':2,'mance-rayder':3,'craster':2,'three-eyed-raven':4,'leaf':4,'beric-dondarrion':1,'thoros-of-myr':3,'drogon':1,'rhaegal':1,'viserion':1,'ghost':1,'grey-wind':1,'lady':1,'nymeria':1,'summer':1,'shaggydog':1,'ser-pounce':4}
subtitle={'jon':'The watcher on the Wall','dany':'Mother of Dragons','tyrion':'A mind needs books','arya':'A girl with her own path','sansa-stark':'The eldest Stark daughter','cersei-lannister':'The lioness of Casterly Rock','jaime-lannister':'The Kingslayer','ned':'Lord of Winterfell','bran':'The young wolf','theon-greyjoy':'Between two houses','hound':'The Hound','mountain':'The Mountain','littlefinger':'Littlefinger','blackfish':'The Blackfish'}
nodes=[];relationships=[];counts={}
for s in sections:
 rows=[]
 for line in s['body'].splitlines():
  if not line.startswith('|') or re.match(r'^\|[\s:|-]+\|$',line):continue
  cells=[x.strip() for x in line.strip('|').split('|')]
  if cells[0] in ['Character','When','Family or alliance']:continue
  rows.append(cells)
 counts[str(s['number'])]=len(rows)
 if s['number']==1:
  relationships=[{'name':plain(c[0]),'description':plain(c[1])} for c in rows];continue
 if not 2<=s['number']<=12:continue
 for cells in rows:
  original=plain(cells[0]);desc=plain(cells[1]);id,name=aliases.get(original,(slug(original),original))
  category='Creature' if original in animals else 'Faction' if original in ['White Walkers','Wights','Unsullied, Sons of the Harpy and Second Sons'] else 'Character'
  season=first.get(id)
  if season is None:
   m=re.search(r'\bS([1-8])',desc);season=int(m.group(1)) if m else 8
  group=s['title'];color='blue' if s['number'] in [2,6,8,10] else 'red' if s['number'] in [5,11] else 'gold' if s['number'] in [3,4,9] else 'violet'
  ownlinks=links(cells[1]);sources=ownlinks or s['sources']
  nodes.append(dict(id=id,name=name,referenceName=original,subtitle=subtitle.get(id,'Dragon' if original in ['Drogon','Rhaegal','Viserion'] else 'Direwolf' if original in animals and original!='Ser Pounce' else 'HBO television reference'),type=category,level=season-1,revealLevel=7,sigil='♆' if category=='Creature' else '♙',color=color,description=desc,source='Provided Game of Thrones reference · Section '+str(s['number']),sources=sources,group=group,section=s['number'],year=season,order=famous.index(id) if id in famous else 1000+len(nodes),grouped=bool(re.search(r' and |, ',original))))
# The timeline contains actual events, not character introduction cards.
s=next(s for s in sections if s['number']==13)
for m in re.finditer(r'^### (.+)\n([\s\S]*?)(?=^### |\Z)',s['body'],re.M):
 title,body=m.groups();season=re.match(r'Season ([1-8])',title);num=int(season.group(1)) if season else 0
 nodes.append(dict(id='season-'+str(num),name=title,subtitle='Historical context & later revelations' if not num else 'Season '+str(num)+' overview',type='Event',level=num-1 if num else 7,revealLevel=num-1 if num else 7,sigil='◷',color='violet',description=plain(body),source='Provided reference · Major events',sources=links(body),group='Season overviews',section=13,year=num,episode=0,order=2000+num))
s=next(s for s in sections if s['number']==14)
for line in s['body'].splitlines():
 if line.startswith('|') and not re.match(r'^\|[\s:|-]+\|$',line):
  cells=[x.strip() for x in line.strip('|').split('|')]
  if cells[0]=='When':continue
  when,name,desc=cells;name=plain(name);seasons=re.findall(r'S([1-8])',when);episodes=re.findall(r'E(\d+)',when);num=int(seasons[0]) if seasons else 0
  nodes.append(dict(id='battle-'+slug(name),name=name,subtitle=when,type='Battle',level=int(seasons[-1])-1 if seasons else 7,revealLevel=int(seasons[-1])-1 if seasons else 7,sigil='⚔',color='red',description=plain(desc),source='Provided reference · Battles and sieges',sources=links(desc) or s['sources'],group='Battles & sieges',section=14,year=num,episode=int(episodes[0]) if episodes else 0,order=3000+len(nodes)))
for line in s['body'].splitlines():
 m=re.match(r'- \*\*(.+?) — (.+?):\*\* (.+)',line)
 if not m:continue
 name,when,desc=m.groups();seasons=re.findall(r'S([1-8])',when);eps=re.findall(r'E(\d+)',when);num=int(seasons[0])
 nodes.append(dict(id='event-'+slug(name),name=name,subtitle=when,type='Event',level=int(seasons[-1])-1,revealLevel=int(seasons[-1])-1,sigil='✴',color='red',description=plain(desc),source='Provided reference · Killings and duels',sources=s['sources'],group='Turning points & duels',section=14,year=num,episode=int(eps[0]) if eps else 0,order=4000+len(nodes)))
# Family and organization pages retain the complete supplied relationship descriptions.
for r in relationships:
 nodes.append(dict(id='family-'+slug(r['name']),name=r['name'],subtitle='Family relationships',type='Faction',level=0,revealLevel=7,sigil='⚑',color='gold',description=r['description'],source='Provided reference · Family relationships',sources=sections[0]['sources'],group='Families & alliances',section=1,year=1,order=5000+len(nodes)))
s=next(s for s in sections if s['number']==15)
nodes.append(dict(id='final-settlement',name='Where the survivors finish',subtitle='The final settlement · Season 8',type='Event',level=7,revealLevel=7,sigil='♜',color='gold',description=plain(s['body']),source='Provided reference · Finale',sources=s['sources'],group='Finale & unresolved fates',section=15,year=8,episode=6,order=6000))
assert len({n['id'] for n in nodes})==len(nodes)
out={'nodes':nodes,'sections':sections,'relationships':relationships,'raw':raw,'featured':famous,'coverage':counts}
(root/'dist/got-data.js').write_text('window.GOT_REFERENCE = '+json.dumps(out,ensure_ascii=False)+';\n')
print(json.dumps({'entities':len(nodes),'characters':sum(n['type']=='Character' for n in nodes),'battles':sum(n['type']=='Battle' for n in nodes),'events':sum(n['type']=='Event' for n in nodes),'creatures':sum(n['type']=='Creature' for n in nodes),'sections':len(sections),'tableRows':counts}))
