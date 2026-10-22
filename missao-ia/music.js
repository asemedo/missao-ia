/* Original ambient pattern, synthesized locally. No audio files or network. */
(()=>{'use strict';const button=document.querySelector('#music');let context,enabled=false,timer,epoch=0;const voices=new Set();
const BPM=116,step=60/BPM/2;
const melody=[72,0,76,79,76,0,74,72,67,0,72,74,76,74,72,0,69,0,72,76,79,0,76,74,71,74,79,0,74,71,67,0];let phrase=0;
function stop(){epoch++;clearTimeout(timer);timer=null;voices.forEach(o=>{try{o.stop();}catch{}});voices.clear();}
function note(n,at,length,volume,type){const o=context.createOscillator(),g=context.createGain(),f=context.createBiquadFilter();o.type=type;o.frequency.value=440*2**((n-69)/12);f.type='lowpass';f.frequency.value=1800;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.006);g.gain.exponentialRampToValueAtTime(.0001,at+length);o.connect(f);f.connect(g);g.connect(context.destination);voices.add(o);o.onended=()=>{voices.delete(o);o.disconnect();f.disconnect();g.disconnect();};o.start(at);o.stop(at+length+.01);}
function loop(){if(!enabled||document.hidden||context.state!=='running')return;const t=context.currentTime+.03;melody.forEach((n,i)=>{if(n)note(n+(phrase%4===3&&i===30?12:0),t+i*step,.13,.009,'square');if(i%4===0)note([48,48,53,55][Math.floor(i/8)],t+i*step,.2,.014,'triangle');});phrase++;timer=setTimeout(loop,32*step*1000);}
function label(){button.innerHTML='<span aria-hidden="true">♫</span> Música: '+(enabled?'ligada':'desligada');button.setAttribute('aria-pressed',String(enabled));}
button.onclick=async()=>{enabled=!enabled;stop();label();const token=epoch;if(!enabled){context?.suspend();return;}try{const Audio=window.AudioContext||window.webkitAudioContext;context||=new Audio();await context.resume();if(token===epoch&&enabled&&!document.hidden)loop();}catch{enabled=false;label();document.querySelector('#audio-status').textContent='A música não está disponível neste navegador.';}};
document.addEventListener('visibilitychange',async()=>{stop();if(document.hidden){context?.suspend();}else if(enabled){const token=epoch;await context.resume();if(token===epoch&&enabled)loop();}});
window.addEventListener('pagehide',()=>{stop();context?.suspend();});
})();
