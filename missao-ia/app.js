(() => {
  'use strict';
  const app = document.querySelector('#app');
  const missions = window.MISSIONS;
  let current, index = 0, score = 0, answers = [], locked = false;
  let audioContext, soundEnabled = false;
  let bitTimer, victoryPlayed = false;
  const activeVoices = new Set();
  const soundButton = document.querySelector('#sound');
  soundButton.onclick = async () => {
    soundEnabled = !soundEnabled;
    try {
      if(soundEnabled) {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if(!Audio) throw new Error('Audio indisponível');
        audioContext ||= new Audio();
        await audioContext.resume();
      }
    } catch { soundEnabled=false; document.querySelector('#audio-status').textContent='Os efeitos sonoros não estão disponíveis neste navegador.'; }
    if(!soundEnabled) activeVoices.forEach(o=>{try{o.stop();}catch{}});
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
    soundButton.innerHTML = `<span aria-hidden="true">♬</span> Efeitos: ${soundEnabled?'ligados':'desligados'}`;
  };
  function playNotes(notes, step, length, volume=0.035) {
    if(!soundEnabled || !audioContext || audioContext.state!=='running') return;
    const t=audioContext.currentTime;
    notes.forEach((frequency,i)=>{
      const oscillator=audioContext.createOscillator(), gain=audioContext.createGain(), filter=audioContext.createBiquadFilter();
      const at=t+i*step;
      oscillator.type='square'; oscillator.frequency.value=frequency;
      filter.type='lowpass'; filter.frequency.value=1800;
      gain.gain.setValueAtTime(0,at); gain.gain.linearRampToValueAtTime(volume,at+0.008);
      gain.gain.setValueAtTime(volume,at+length*0.5); gain.gain.exponentialRampToValueAtTime(0.0001,at+length-0.005);
      oscillator.connect(filter); filter.connect(gain); gain.connect(audioContext.destination);
      activeVoices.add(oscillator);
      oscillator.onended=()=>{activeVoices.delete(oscillator);oscillator.disconnect();filter.disconnect();gain.disconnect();};
      oscillator.start(at);oscillator.stop(at+length);
    });
  }
  function playCorrect(){playNotes([523.251,659.255,783.991],0.125,0.15);}
  function playError(){playNotes([392,329.628],0.18,0.2,0.018);}
  function playVictory(){playNotes([523.251,659.255,783.991,659.255,783.991,1046.502,783.991,1046.502],0.23,0.39);}
  function setBit(state){
    const guide=app.querySelector('.guide');
    if(guide) guide.dataset.state=state;
  }
  function shuffle(items) {
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy;
  }
  let round=[]; let restoring=false; const P=window.GameProgress; function save1(){P.save('m1',{index,score,answers,round,locked,ui:P.capture()});}
  const bit = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 440" class="bit" aria-hidden="true" focusable="false">\n<title>BIT, o teu companheiro de missão</title><desc>Robô azul e lilás com antena amarela, olhos expressivos e um pequeno coração de circuitos.</desc>\n<g stroke="#242351" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">\n<ellipse cx="214" cy="408" rx="122" ry="16" fill="#242351" opacity=".12" stroke="none"/>\n<path d="m160 344-13 45q17 19 49 3l8-45m54-3 13 45q-17 19-49 3l-8-45" fill="#8d7bea"/>\n<path d="M126 255q-35-17-48 26l-20 33 30 16 29-35" fill="#63d7e7"/>\n<g class="welcome-arm"><path d="m295 256 30-34 15-46 28 9-6 55-38 49" fill="#63d7e7"/><path d="m339 185-7-27m17 25 5-29m6 34 18-21" fill="none"/></g>\n<rect x="124" y="244" width="175" height="117" rx="38" fill="#8d7bea"/>\n<path d="M154 268h113v65H154z" fill="#f9f6ea"/>\n<path d="m195 287 15 13 15-13 12 12-27 23-27-23z" fill="#ff8b86" stroke-width="4"/>\n<path d="M210 101V65" fill="none"/><circle cx="210" cy="51" r="17" fill="#ffce55"/>\n<rect x="76" y="155" width="37" height="60" rx="15" fill="#8d7bea"/><rect x="308" y="155" width="37" height="60" rx="15" fill="#8d7bea"/>\n<rect x="99" y="100" width="222" height="157" rx="49" fill="#63d7e7"/>\n<path d="M125 125q14-12 38-12" stroke="white" opacity=".8"/>\n<rect x="124" y="141" width="172" height="80" rx="29" fill="#242351"/>\n<path class="eyes-original" d="M151 176q12-20 24 0m71 0q12-20 24 0" stroke="#a2f5ed" fill="none"/>\n<path class="mouth-original" d="M194 192q16 15 32 0" stroke="#a2f5ed" stroke-width="5" fill="none"/>\n<path d="m51 110-16-13m23-8-3-20m305 35 16-13" stroke="#8d7bea"/>\n<path d="m60 360 7-16 7 16 17 7-17 7-7 16-7-16-17-7z" fill="#ffce55" stroke-width="4"/>\n<g class="face-joy" stroke="#a2f5ed" fill="none"><path d="m148 174 14-12 14 12m67 0 14-12 14 12"/><path d="M190 188q20 32 40 0z" fill="#a2f5ed"/></g>\n<g class="face-doubt" stroke="#a2f5ed" fill="none"><path d="m149 165 26 5m69-10 25-7M153 181h17m77 0h17M198 201q13-9 27-2"/></g>\n<g class="face-discovery" stroke="#a2f5ed" fill="none"><circle cx="162" cy="175" r="9"/><circle cx="257" cy="175" r="9"/><ellipse cx="210" cy="198" rx="8" ry="10"/></g>\n<g class="discovery-spark" stroke="#ffce55"><path d="M337 94v-24m-12 12h24m-6 33 15-10"/></g>\n</g></svg>\n';
  // One audience label for future adaptations; no alternate game is enabled.
  const AUDIENCE_LABEL = '2.º ciclo';
  document.documentElement.dataset.inputModality = 'pointer';
  document.addEventListener('keydown', e => {
    if (!e.altKey && !e.ctrlKey && !e.metaKey) document.documentElement.dataset.inputModality = 'keyboard';
  }, true);
  document.addEventListener('pointerdown', () => { document.documentElement.dataset.inputModality = 'pointer'; }, true);
  function show(html) { clearTimeout(bitTimer); app.innerHTML = html; const heading=app.querySelector('h1'); if(heading){heading.tabIndex=-1;heading.focus();} P.afterShow(home,show,bit,playVictory,start); }
  function home() {
    show(`<section class="hero"><div class="hero-copy"><p class="eyebrow">PENSA. EXPLORA. DESCOBRE.</p><h1>Missão <span>IA</span><small class="title-year">${AUDIENCE_LABEL}</small><i>Será que as máquinas pensam?</i></h1><p class="intro">Há inteligência artificial à tua volta. Mas será que a consegues reconhecer?</p><p>Junta-te ao BIT e põe a tua curiosidade à prova.</p><button class="primary" id="start">Começar a aventura <span aria-hidden="true">→</span></button><p class="micro">${missions.filter(m=>m.available).length} missões disponíveis · Missão 1: 9 desafios · Missão 2: 14 etapas · Missão 3: 12 desafios · Missão 4: 12 decisões</p></div><div class="hero-art"><div class="orbit"></div><div class="speech">Olá! Sou o BIT.<br>Vamos descobrir juntos?</div>${bit}<span class="sticker">CURIOSIDADE<br>ATIVADA!</span></div></section><section class="map" aria-labelledby="map-title"><div class="section-label"><h2 id="map-title">O teu mapa de missões</h2><span>UMA DESCOBERTA DE CADA VEZ</span></div><div class="mission-grid">${missions.map(m => `<article class="mission-card ${m.available?'ready':'future'}"><div class="card-top"><span class="mission-icon" aria-hidden="true">${m.icon}</span><span class="status">${m.available?'JÁ PODES JOGAR':'EM BREVE'}</span></div><p class="mission-number">MISSÃO ${m.number}</p><h3>${m.title}</h3><p>${m.subtitle}</p>${m.available?`<button class="text-button" data-mission="${m.id}">Entrar na missão →</button>`:'<span class="soon">Ainda em construção</span>'}</article>`).join('')}</div></section>`);
    P.decorate(home,show,bit,playVictory);
    document.querySelector('#start').onclick = () => P.begin(start,home,show,bit,playVictory);
    document.querySelectorAll('[data-mission]').forEach(b => b.onclick = () => start(b.dataset.mission));
  }
  function start(id) { if(id==='responsavel'){window.startBITResponsibility({show,bit,home,setBit,playCorrect,playError,playVictory});return;} if(id==='verificar'){window.startBITInvestigation({show,bit,home,setBit,playCorrect,playError,playVictory});return;} if(id==='treinar'){window.startBITTraining({show,bit,home,setBit,playCorrect,playError,playVictory});return;} current=missions.find(m => m.id===id && m.available); if(!current || !current.questions?.length)return; index=0;score=0;answers=[];victoryPlayed=false;round=[...shuffle(current.questions.filter(q=>!q.transfer)),...current.questions.filter(q=>q.transfer)];const old=P.get('m1'); if(old){({index,score,answers,round}=old);restoring=old.locked;if(old.done){results();return;}} renderQuestion(); }
  function renderQuestion() {
    locked=false;
    const q=round[index];
    show(`<section class="play"><div class="play-top"><button class="text-button" id="back">← Mapa de missões</button><span class="points" id="points">★ ${score} / ${current.questions.length*100} pontos</span></div><div class="mission-heading"><p class="eyebrow">MISSÃO ${current.number} · ${current.title.toUpperCase()}</p><h1>${current.heading}</h1><p>${current.intro}</p></div><div class="progress-label"><span>Desafio ${index+1} de ${current.questions.length}</span><span id="percent">${Math.round(index/current.questions.length*100)}% explorado</span></div><progress value="${index}" max="${current.questions.length}" aria-label="Desafios concluídos">${index}</progress><div class="challenge-layout"><aside class="guide" data-state="neutral">${bit}<div class="guide-note"><strong>Dica do BIT</strong><p>${q.hint || current.hint}</p></div></aside><article class="question"><p class="eyebrow">${q.tag}</p><h2>${q.title}</h2><p class="scenario">${q.text}</p><fieldset><legend>${q.prompt || 'Este sistema usa IA?'}</legend><div class="choices">${shuffle(q.options || [{label:'Sim, usa IA',value:true},{label:'Não usa IA',value:false}]).map((o,i)=>`<button class="choice" data-option="${i}" data-value="${o.value}">${o.label}</button>`).join('')}</div></fieldset><div id="feedback" role="status" aria-live="polite" aria-atomic="true"></div><button class="primary next" id="next" hidden>${index===current.questions.length-1?'Ver resultados':'Próximo desafio'} →</button></article></div></section>`);
    document.querySelector('#back').onclick=home;
    document.querySelectorAll('[data-option]').forEach(button => button.onclick=()=>answer(button.dataset.value,button.textContent));
    document.querySelector('#next').onclick=()=> {index++;index<current.questions.length?renderQuestion():results();};
    if(restoring){locked=true;P.restore(P.get('m1').ui);restoring=false;} save1();
  }
  function answer(value,label) {
    if(locked)return;
    locked=true;
    const q=round[index], correct=value===String(q.answer);
    if(correct){score+=100;playCorrect();}else{playError();}
    setBit(correct?'joy':'doubt');
    answers.push({correct,value,label});
    document.querySelector('#points').textContent=`★ ${score} / ${current.questions.length*100} pontos`;
    document.querySelectorAll('[data-option]').forEach(b=>{
      b.setAttribute('aria-disabled','true'); b.tabIndex=-1;
      const right=b.dataset.value===String(q.answer), chosen=b.dataset.value===value;
      if(right)b.classList.add('correct');else if(chosen)b.classList.add('incorrect');
      if(chosen || right){const badge=document.createElement('small');badge.textContent=[chosen?'A tua resposta':'',right?'Resposta correta':''].filter(Boolean).join(' · ');b.append(badge);}
    });
    document.querySelector('progress').value=index+1;
    document.querySelector('#percent').textContent=`${Math.round((index+1)/round.length*100)}% explorado`;
    const correctLabel=q.options?q.options.find(o=>String(o.value)===String(q.answer)).label:(q.answer?'Sim, usa IA':'Não usa IA');
    document.querySelector('#feedback').innerHTML=`<div class="feedback ${correct?'positive':'learn'}"><strong>${correct?'Boa descoberta! +100 pontos':'Vamos descobrir porquê. +0 pontos'}</strong><p>A tua resposta: ${label}. Resposta correta: ${correctLabel}.</p><p>${q.explanation}</p></div>`;
    const note=app.querySelector('.guide-note');
    note.innerHTML=`<strong>${correct?'BIT está alegre!':'BIT ficou com uma dúvida.'}</strong><p>${correct?'Boa descoberta!':'Repara na pista: '+(q.hint || current.hint)+' Não faz mal errar: lê a explicação e continua a explorar.'}</p><button class="text-button" id="explain">Descobrir com o BIT →</button>`;
    const discover=()=>{
      clearTimeout(bitTimer); setBit('discovery');
      note.querySelector('strong').textContent='BIT descobriu porquê!';
      note.querySelector('p').textContent=q.explanation;
    };
    note.querySelector('button').onclick=discover;
    bitTimer=setTimeout(discover,2400);
    document.querySelector('#next').hidden=false;save1();
    // Mantém o foco no controlo escolhido; o estado anuncia a explicação.
    // Tab segue para o botão de avanço, sem desviar a leitura do feedback.
  }
  function results() {
    P.save('m1',{index,score,answers,round,locked,done:true});
    const total=answers.filter(a=>a.correct).length;
    show(`<section class="results"><div class="celebration" data-state="joy">${bit}<div class="confetti" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i><i style="--i:7"></i><i style="--i:8"></i><i style="--i:9"></i><i style="--i:10"></i><i style="--i:11"></i><i style="--i:12"></i><i style="--i:13"></i><i style="--i:14"></i><i style="--i:15"></i><i style="--i:16"></i><i style="--i:17"></i></div></div><p class="eyebrow">MISSÃO ${current.number} CONCLUÍDA</p><h1>${total>=Math.ceil(round.length*2/3)?'Curiosidade em grande!':'Cada descoberta conta!'}</h1><p>Acertaste ${total} de ${current.questions.length} desafios. O mais importante é perceber o porquê.</p><p>100% explorado</p><progress value="100" max="100" aria-label="Missão concluída">100%</progress><div class="score-medal">★<strong>${score}</strong><span>DE ${current.questions.length*100} PONTOS</span></div><div class="takeaway"><h2>A descoberta da missão</h2>${current.takeaways.map(text=>`<p>${text}</p>`).join('')}</div><details><summary>Rever as minhas respostas</summary><ol class="review">${round.map((q,i)=>`<li><strong>${q.title} — ${answers[i].correct?'Certo':'A rever'}</strong><p>Respondeste: ${answers[i].label}. Resposta correta: ${q.options?q.options.find(o=>String(o.value)===String(q.answer)).label:(q.answer?'Sim, usa IA':'Não usa IA')}.</p><p>${q.explanation}</p></li>`).join('')}</ol></details><div class="result-actions"><button class="primary" id="again">Voltar a jogar ↻</button><button class="secondary" id="home">Ver mapa de missões</button></div><p class="micro">${current.nextText}</p></section>`);
    if(!victoryPlayed){victoryPlayed=true;playVictory();}
    document.querySelector('#again').textContent='Ver mapa de missões';document.querySelector('#again').onclick=home;document.querySelector('#home').onclick=home;
  }
  home();
})();
