// Original AI-generated oil-painting interpretations; prompts are in data/portrait-prompts.json.
const paintedCharacters=new Set(["jon", "dany", "tyrion", "arya", "sansa-stark", "cersei-lannister", "jaime-lannister", "ned", "bran", "theon-greyjoy", "hound", "brienne-of-tarth", "tywin-lannister", "robb-stark", "catelyn-stark", "jorah-mormont", "samwell-tarly", "tormund-giantsbane", "margaery-tyrell", "littlefinger", "davos-seaworth", "melisandre", "varys"]);
const crestArtwork=art;
art=n=>{
  if(universe!=='got'||!paintedCharacters.has(n.id))return crestArtwork(n);
  return `<div class="art painted-art" aria-hidden="true">${crestArtwork(n)}<img class="character-painting" src="assets/paintings/${n.id}.jpg" width="720" height="960" loading="lazy" decoding="async" alt=""><span class="art-label">PAINTED PORTRAIT</span></div>`;
};
document.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement&&event.target.classList.contains('character-painting'))event.target.parentElement.classList.add('portrait-unavailable')},true);
const paintedShowEntity=showEntity;
showEntity=id=>{paintedShowEntity(id);const artwork=document.querySelector('#modalContent>.painted-art');if(artwork){const note=document.createElement('p');note.className='painting-note';note.textContent='Original AI-generated character painting';artwork.after(note)}};
render();
