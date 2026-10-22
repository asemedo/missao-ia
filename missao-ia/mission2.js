/* Simulação local de um classificador por vizinhos mais próximos. */
window.startBITTraining = function({show,bit,home,setBit,playCorrect,playError,playVictory}) {
  const animal=(name,icon,ears,muzzle,label)=>({name,icon,ears,muzzle,label});
  const initial=[animal('Mimi','🐱','pontiagudas','curto','gato'),animal('Bobi','🐶','caídas','comprido','cão'),animal('Tico','🐱','pontiagudas','curto','gato'),animal('Luna','🐶','caídas','comprido','cão')];
  const tests=[animal('Nico','🐱','pontiagudas','curto','gato'),animal('Rex','🐶','caídas','comprido','cão'),animal('Kiko, um cão de orelhas pontiagudas','🐕','pontiagudas','comprido','cão')];
  const additions=[animal('Lobo, um cão de orelhas pontiagudas','🐕','pontiagudas','comprido','cão'),animal('Max, outro cão de orelhas pontiagudas','🐕','pontiagudas','comprido','cão')];
  let step=0, memory=[], before=[], after=[], locked=false, correct=0;
  const P=window.GameProgress,old=P.get('m2');let restoring=false;if(old){({step,memory,before,after,correct}=old);restoring=old.locked;}
  function save2(done=false){P.save('m2',{step,memory,before,after,correct,locked,done,ui:P.capture()});}
  const total=14;
  function predict(a) {
    const distances=memory.map(x=>({label:x.label,d:Number(x.ears!==a.ears)+Number(x.muzzle!==a.muzzle)}));
    const min=Math.min(...distances.map(x=>x.d));
    const votes=distances.filter(x=>x.d===min);
    const cats=votes.filter(x=>x.label==='gato').length;
    return cats===votes.length-cats?'não tenho a certeza':cats>votes.length-cats?'gato':'cão';
  }
  function card(a) {return `<div class="animal-card"><span class="animal-icon" aria-hidden="true">${a.icon}</span><h3>${a.name}</h3><p>Orelhas: <strong>${a.ears}</strong><br>Focinho: <strong>${a.muzzle}</strong></p></div>`;}
  function render() {
    locked=false;
    const train=step<4, test=step>=4&&step<7, improve=step>=7&&step<9, retest=step>=9&&step<12;
    const a=train?initial[step]:test?tests[step-4]:improve?additions[step-7]:retest?tests[step-9]:null;
    const prediction=(test||retest)?predict(a):null;
    const phase=train?'1 · Ensinar':test?'2 · Testar':improve?'3 · Melhorar':retest?'3 · Melhorar — voltar a testar':'4 · Refletir';
    const title=train?'Ensina o BIT!':improve?'Mais variedade para aprender':test||retest?'O que prevê o BIT?':step===12?'Porque melhorou o BIT?':'E se aparecer um coelho?';
    const explanation=train||improve?'Observa o animal e escolhe a etiqueta correta. O exemplo só entra no treino quando a etiqueta está certa.':test||retest?'O BIT compara apenas as orelhas e o focinho com os exemplos de treino. Tu vais verificar a previsão.':step===12?'Pensa na diferença entre os dois conjuntos de exemplos.':'Os exemplos de treino só incluíam gatos e cães. Um coelho pode ter orelhas pontiagudas e focinho curto.';
    const options=train||improve?[['gato','Gato'],['cão','Cão']]:test||retest?[['gato','É um gato'],['cão','É um cão']]:step===12?[['variedade','Recebeu exemplos de cães com características variadas.'],['magia','Começou a pensar como uma pessoa.'],['repetir','Bastava repetir sempre o mesmo gato.']]:[['verificar','Pode confundir com um gato. Precisa de exemplos de outras categorias e de verificação humana.'],['sempre','Vai acertar sempre, porque já treinou.']];
    show(`<section class="play"><div class="play-top"><button class="text-button" id="back">← Mapa de missões</button><span class="points">${memory.length} exemplos no treino</span></div><p class="eyebrow">MISSÃO 02 · ${phase}</p><h1>${title}</h1><p>${explanation}</p>${step===0?`<div class="takeaway" aria-label="Mensagem do BIT"><strong>O BIT diz:</strong><p>Vamos começar! Mostra-me alguns exemplos. Quanto mais variados forem, mais oportunidades terei de distinguir as características dos gatos e dos cães. No final, vamos comparar os meus resultados antes e depois do treino!</p></div>`:''}<p class="micro">Simulação educativa: não é um sistema real de reconhecimento de imagens. Os desenhos são ilustrações; o BIT usa as duas características escritas.</p><div class="progress-label"><span>Etapa ${step+1} de ${total}</span><span id="percent">${Math.round(step/total*100)}% explorado</span></div><progress value="${step}" max="${total}" aria-label="Etapas concluídas"></progress><div class="challenge-layout"><aside class="guide" data-state="neutral">${bit}<div class="guide-note"><strong>O meu caderno de treino</strong><p>${memory.length?memory.map(x=>`${x.name}: ${x.label}`).join(' · '):'Ainda não tenho exemplos. Vamos começar?'}</p></div></aside><article class="question">${a?card(a):''}${prediction?`<p class="prediction">Previsão do BIT: <strong>${prediction}</strong></p>`:''}<fieldset><legend>${train||improve?'Que etiqueta vais dar a este exemplo?':test||retest?'Qual é a identificação correta para verificar o BIT?':'Escolhe a melhor explicação.'}</legend><div class="choices">${options.map(([value,label])=>`<button class="choice" data-training="${value}">${label}</button>`).join('')}</div></fieldset><div id="feedback" role="status" aria-live="polite" aria-atomic="true"></div><button class="primary next" id="next" hidden>${step===13?'Concluir missão':'Continuar'} →</button></article></div></section>`);
    document.querySelector('#back').onclick=home;
    document.querySelectorAll('[data-training]').forEach(b=>b.onclick=()=>{
      if(locked)return;
      const right=b.dataset.training===(a?a.label:step===12?'variedade':'verificar');
      if(!right){setBit('doubt');playError();document.querySelector('#feedback').innerHTML=`<div class="feedback learn"><strong>Vamos pensar mais um pouco.</strong><p>${a?`Este exemplo é um ${a.label}. Observa o nome e as características. Nem todos os cães têm orelhas caídas!`:'Mais variedade ajuda a reconhecer casos diferentes, mas não garante que o sistema acerte sempre.'} Experimenta outra opção.</p></div>`;return;}
      locked=true;setBit('joy');playCorrect();correct++;
      let message;
      if(train||improve){memory.push({...a});message=`Exemplo guardado: ${a.name} → ${a.label}. ${improve?'Agora o treino também inclui cães de orelhas pontiagudas.':'Ensinar é dar exemplos com etiquetas corretas.'}`;}
      else if(test||retest){(test?before:after).push(prediction===a.label);message=`A identificação verificada é ${a.label}. ${prediction===a.label?'A previsão do BIT acertou neste caso.':prediction==='não tenho a certeza'?'O BIT encontrou um empate: faltam exemplos variados para distinguir este caso.':'A previsão do BIT falhou neste caso.'} ${test?'Os animais de teste não são acrescentados automaticamente ao treino.':'Usámos os mesmos testes para comparar; para avaliar melhor, precisaríamos também de outros animais novos.'}`;}
      else message=step===12?'Exemplos variados ajudam a reconhecer características que antes faltavam. Repetir os mesmos exemplos não resolve todas as dificuldades.':'O BIT pode confundir animais desconhecidos com as categorias que aprendeu. Esta simulação usa apenas duas características e tem limites.';
      document.querySelectorAll('[data-training]').forEach(x=>{x.setAttribute('aria-disabled','true');x.tabIndex=-1;});
      document.querySelector('#feedback').innerHTML=`<div class="feedback positive"><strong>Boa descoberta!</strong><p>${message}</p></div>`;
      const note=document.querySelector('.guide-note');
      note.innerHTML=`<strong>Vamos descobrir porquê!</strong><p>${message}</p><button class="text-button" id="discover">Descobrir com o BIT →</button>`;
      document.querySelector('#discover').onclick=()=>setBit('discovery');
      document.querySelector('progress').value=step+1;document.querySelector('#percent').textContent=`${Math.round((step+1)/total*100)}% explorado`;
      document.querySelector('#next').hidden=false;save2();
    });
    document.querySelector('#next').onclick=()=>{if(!locked)return;step++;step<total?render():finish();};
    if(restoring){locked=true;P.restore(old.ui);restoring=false;}save2();
  }
  function finish(){save2(true);
    show(`<section class="results training-results"><div class="celebration" data-state="joy">${bit}</div><p class="eyebrow">MISSÃO 02 CONCLUÍDA</p><h1>Ensinaste o BIT!</h1><p>100% explorado · ${correct} etapas concluídas</p><progress value="100" max="100" aria-label="Missão concluída"></progress><div class="takeaway"><h2>O que mudou com o treino?</h2><div class="training-comparison" role="group" aria-label="Comparação dos resultados do treino"><div class="training-result"><h3>Antes do treino adicional</h3><p><strong>${before.filter(Boolean).length}/3</strong> — 4 exemplos</p><span>previsões certas nos três testes</span></div><div class="training-result training-result-after"><h3>Depois do treino adicional</h3><p><strong>${after.filter(Boolean).length}/3</strong> — 6 exemplos</p><span>previsões certas nos três testes</span></div></div><p>Antes, o BIT tinha dúvidas ao identificar um cão de orelhas pontiagudas. Depois de receber mais exemplos semelhantes, conseguiu classificá-lo corretamente.</p><p>Os exemplos e as etiquetas influenciam as previsões. Precisamos de variedade, testes e verificação humana.</p><p>Este resultado vale para estes três casos. Repetir testes conhecidos não demonstra que o BIT acerte em todos os animais.</p><p>O BIT é uma personagem: aprender padrões não significa pensar ou sentir como uma pessoa.</p></div><div class="result-actions"><button class="primary" id="again">Voltar a ensinar</button><button class="secondary" id="home">Ver mapa de missões</button></div><p class="micro">A Missão 3 — Verdade ou Invenção? já está disponível no mapa de missões.</p></section>`);
    playVictory();document.querySelector('#again').textContent='Ver mapa de missões';document.querySelector('#again').onclick=home;document.querySelector('#home').onclick=home;
  }
  function introduction(){
    show(`<section class="play"><div class="play-top"><button class="text-button" id="back">← Mapa de missões</button><span class="points">14 etapas</span></div><p class="eyebrow">MISSÃO 02</p><h1>Ensina o BIT!</h1><div class="challenge-layout"><aside class="guide" data-state="neutral">${bit}<div class="guide-note"><strong>Preciso de um treinador!</strong><p>Vamos aprender com exemplos?</p></div></aside><article class="question"><h2>Olá! Preciso da tua ajuda!</h2><p>Quero aprender a distinguir gatos e cães, mas ainda não sei fazê-lo muito bem! Nesta missão, vais ser o meu treinador. Primeiro, vais mostrar-me exemplos de gatos e cães e dizer-me a que grupo pertence cada um. Depois, vou utilizar as características desses exemplos para tentar identificar outros animais. Mas atenção: posso enganar-me! Se isso acontecer, vamos investigar porquê e descobrir como posso melhorar as minhas respostas.</p><h2>O que vamos fazer?</h2><ol><li><strong>Ensinar:</strong> dar exemplos de gatos e cães com as etiquetas corretas.</li><li><strong>Testar:</strong> verificar como identifico outros animais.</li><li><strong>Melhorar:</strong> acrescentar exemplos mais variados e repetir os testes para comparar os resultados.</li><li><strong>Refletir:</strong> explicar o que mudou e descobrir os meus limites.</li></ol><div class="takeaway"><h2>O que vais descobrir?</h2><p>Alguns sistemas de IA identificam padrões a partir de exemplos. Se tiverem poucos dados ou exemplos pouco variados, podem cometer erros.</p></div><p class="micro">Esta é uma simulação educativa: comparo características definidas — as orelhas e o focinho — e não analiso imagens. Os desenhos servem apenas para ilustrar os animais.</p><button class="primary" id="begin-training">Vamos começar! →</button></article></div></section>`);
    document.querySelector('#back').onclick=home;
    document.querySelector('#begin-training').onclick=render;
  }
  if(old?.done)finish();else if(old)render();else introduction();
};
