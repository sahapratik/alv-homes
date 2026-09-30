import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=gsap.utils.clamp(0,1);

export function createMotion(isReduced){
 let media,scene,token=0,introTimeline,entry,refreshTimer,abort,resizeObserver,galleryTrigger,galleryTween,scrollTween;
 let active=0,targets=[],travel=0,viewedIntro=false,route='home';
 const vp=$('.rail-viewport'),rail=$('#property-rail'),cards=[...rail.children];
 const progress=gsap.quickSetter('.gallery-progress span','scaleX');
 function state(p){
  const x=clamp(p)*travel;
  active=targets.length?targets.reduce((best,t,i)=>Math.abs(t-x)<Math.abs(targets[best]-x)?i:best,0):0;
  $('#gallery-number').textContent=String(active+1).padStart(2,'0');
  $('#gallery-prev').disabled=active===0;$('#gallery-next').disabled=active===cards.length-1;
  progress(1/cards.length+clamp(p)*(1-1/cards.length));
  cards.forEach((card,i)=>{card.dataset.active=String(i===active)});
 }
 function measureGallery(){
  const style=getComputedStyle(vp),padding=parseFloat(style.paddingLeft)+parseFloat(style.paddingRight);
  travel=Math.max(0,rail.scrollWidth-vp.clientWidth+padding);
  const first=cards[0].offsetLeft;
  targets=cards.map((c,i)=>i===0?0:i===cards.length-1?travel:Math.max(0,Math.min(travel,c.offsetLeft-first+c.offsetWidth/2-(vp.clientWidth-padding)/2)));
 }
 const refresh=()=>{clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>{if(route==='home')measureGallery();ScrollTrigger.refresh()},100)};
 function finishIntro(){
  const wasActive=['preparing','playing','static'].includes(document.documentElement.dataset.intro);
  introTimeline?.kill();introTimeline=null;scene?.introduction(1);
  $('#intro-signature').hidden=true;gsap.set('.hero-photo',{clipPath:'none'});
  document.documentElement.dataset.intro='complete';
  if(wasActive)try{performance.mark('alv-intro-complete')}catch{}
 }
 function cleanup(){
  token++;finishIntro();entry?.revert();scrollTween?.kill();abort?.abort();resizeObserver?.disconnect();clearTimeout(refreshTimer);
  media?.revert();media=null;galleryTween=null;galleryTrigger=null;scene?.dispose();scene=null;
  vp.classList.remove('is-pinned');vp.scrollLeft=0;
  gsap.set(rail,{clearProps:'transform'});gsap.set('.hero-photo',{clearProps:'clipPath'});
  gsap.killTweensOf('.step-body');gsap.set('.step-body',{clearProps:'all'});
  $$('.journey-steps details').forEach(d=>{gsap.killTweensOf(d);d.style.height='';d.style.overflow='';delete d.dataset.expanding});
 }
 function reveal(target,vars={}){
  const nodes=typeof target==='string'?$$(`${route==='home'?'#home-page':'#route-page'} ${target}`):[target];
  nodes.forEach(el=>{
   const image=el.tagName==='IMG';
   gsap.fromTo(el,image?{clipPath:'inset(7% 6% 7% 6%)',scale:1.055}:{y:20,opacity:.92},
    {clipPath:image?'inset(0% 0% 0% 0%)':undefined,scale:image?1:undefined,y:0,opacity:1,duration:1.05,ease:'power3.out',...vars,
     scrollTrigger:{trigger:el,start:'top 94%',end:'bottom top',toggleActions:'play none none none',once:true}});
  });
 }
 function heroEntry(){
  entry?.kill();
  entry=gsap.timeline({defaults:{ease:'power3.out'}})
   .fromTo('.hero-photo',{scale:1.045},{scale:1,duration:1.7},0)
   .fromTo('.static-aperture i:nth-child(odd)',{scaleY:0},{scaleY:1,duration:1.05,stagger:.13},.05)
   .fromTo('.static-aperture i:nth-child(even)',{scaleX:0},{scaleX:1,duration:1.05,stagger:.13},.18)
   .fromTo('.hero h1 .line-inner',{yPercent:24,opacity:.65},{yPercent:0,opacity:1,duration:1.0,stagger:.11},.1)
   .fromTo('.hero-sub',{y:10,opacity:.7},{y:0,opacity:1,duration:.8},.37)
   .fromTo('.hero-actions',{y:5},{y:0,duration:.65},.4)
   .fromTo('.hero-bottom',{opacity:.7},{opacity:1,duration:1},.5);
 }
 async function initializeScene(wantsIntro,ownToken){
  const host=$('#threshold');
  const waitForHero=$('.hero-photo').decode?.().catch(()=>{})||Promise.resolve();
  const status=$('#intro-status');
  if(wantsIntro){performance.mark('alv-intro-request');$('#intro-signature').hidden=false;status.textContent=$('.hero-photo').complete?'Opening the view':'Preparing the view';document.documentElement.dataset.intro='preparing';}
  let guard=setTimeout(()=>{if(ownToken===token){finishIntro();heroEntry();}},1500);
  try{
   let unavailable=false;try{unavailable=sessionStorage.getItem('alv-webgl-unavailable')==='1'}catch{}
   if(unavailable)throw Error('WebGL unavailable in this session');
   const canvas=document.createElement('canvas');
   const context=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power'});
   if(!context){try{sessionStorage.setItem('alv-webgl-unavailable','1')}catch{};throw Error('WebGL unavailable')}
   const [{createThreshold}]=await Promise.all([import('./threshold.js'),waitForHero]);
   if(ownToken!==token||isReduced()){clearTimeout(guard);return}
   performance.mark('alv-hero-ready');scene=createThreshold(host,{canvas,context});clearTimeout(guard);
   if(!wantsIntro||document.documentElement.dataset.intro==='complete'&&$('#intro-signature').hidden){scene.introduction(1);return}
   status.textContent='Opening the view';document.documentElement.dataset.intro='playing';performance.mark('alv-intro-start');
   const phase={p:0};scene.introduction(0);
   introTimeline=gsap.timeline({onComplete:finishIntro});
   introTimeline.to(phase,{p:1,duration:1.6,ease:'power2.inOut',onUpdate:()=>scene?.introduction(phase.p)},0)
    .fromTo('.hero-photo',{clipPath:'inset(12% 9% 13% 54%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.1,ease:'power3.inOut'},.25)
    .to('#intro-signature',{opacity:0,duration:.3},.35)
    .call(heroEntry,[],.6);
  }catch{
   clearTimeout(guard);if(ownToken!==token)return;
   document.documentElement.dataset.webgl='fallback';
   if(wantsIntro)document.documentElement.dataset.intro='static';
   finishIntro();heroEntry();
  }
 }
 function setupGallery(desktop){
  measureGallery();
  state(0);
  if(desktop&&travel>0&&$('.gallery-stage').offsetHeight<=innerHeight-90){
   vp.classList.add('is-pinned');vp.scrollLeft=0;
   const position={p:0};
   galleryTween=gsap.to(position,{p:1,ease:'none',onUpdate:()=>{
    vp.scrollLeft=0;gsap.set(rail,{x:-position.p*travel});state(position.p);
   },scrollTrigger:{id:'alv-collection',trigger:'.gallery-stage',start:'top 82px',end:()=>`+=${travel}`,pin:true,pinType:'transform',pinSpacing:true,anticipatePin:1,scrub:.3,invalidateOnRefresh:true,
    onRefresh:()=>{measureGallery();gsap.set(rail,{x:-position.p*travel});state(position.p)}}});
   galleryTrigger=galleryTween.scrollTrigger;
  }
  if(!desktop)vp.addEventListener('scroll',()=>{if(!galleryTrigger){state(vp.scrollLeft/Math.max(1,travel))}},{passive:true,signal:abort.signal});
  if(!desktop)rail.addEventListener('focusin',e=>{const card=e.target.closest('.property-card');if(card)go(+card.dataset.index,true)},{signal:abort.signal});
 }
 function go(index,instant=false){
  measureGallery();index=Math.max(0,Math.min(cards.length-1,index));
  const x=targets[index]||0;
  if(galleryTrigger){
   vp.scrollLeft=0;scrollTween?.kill();
   const y=galleryTrigger.start+(galleryTrigger.end-galleryTrigger.start)*x/Math.max(1,travel);
   if(instant||isReduced()){scrollTo({top:y,behavior:'instant'});galleryTween.progress(x/Math.max(1,travel));}
   else{const p={y:scrollY};scrollTween=gsap.to(p,{y,duration:.72,ease:'power2.inOut',onUpdate:()=>scrollTo({top:p.y,behavior:'instant'})});}
  }else vp.scrollTo({left:x,behavior:instant||isReduced()?'instant':'smooth'});
 }
 function accordions(){
  $$(`${route==='home'?'#home-page':'#route-page'} .journey-steps details`).forEach(d=>{
   d.querySelector('summary').addEventListener('click',e=>{
    if(isReduced())return;
    e.preventDefault();const open=d.dataset.expanding?d.dataset.expanding!=='true':!d.open;
    gsap.killTweensOf(d);const start=d.getBoundingClientRect().height;
    d.dataset.expanding=String(open);d.open=true;d.style.height='auto';
    const end=open?d.getBoundingClientRect().height:d.querySelector('summary').getBoundingClientRect().height+1;
    d.style.height=`${start}px`;d.style.overflow='hidden';
    gsap.to(d,{height:end,duration:.48,ease:'power3.inOut',onComplete:()=>{d.open=open;d.style.height='';d.style.overflow='';delete d.dataset.expanding;refresh()}});
    gsap.fromTo(d.querySelector('.step-body'),{opacity:open?.5:1,y:open?-8:0},{opacity:open?1:0,y:open?0:-5,duration:.32,delay:open?.1:0});
   },{signal:abort.signal});
  });
 }
 function categoryInteractions(){
  const glimpse=$('.category-glimpse');if(!glimpse)return;
  const show=i=>{glimpse.querySelectorAll('img').forEach((img,n)=>img.classList.toggle('active',i===n));if(!isReduced())gsap.to(glimpse,{clipPath:'inset(0% 0% 0% 0%)',opacity:1,duration:.55,ease:'power3.out',overwrite:true})};
  const hide=()=>gsap.to(glimpse,{clipPath:'inset(0% 0% 0% 100%)',opacity:0,duration:.35,ease:'power2.inOut',overwrite:true});
  $$('#categories a').forEach((a,i)=>{a.addEventListener('pointerenter',()=>show(i),{signal:abort.signal});a.addEventListener('focus',()=>show(i),{signal:abort.signal});a.addEventListener('pointerleave',hide,{signal:abort.signal});a.addEventListener('blur',hide,{signal:abort.signal})});
 }
 function setup(nextRoute,{arrival=true,first=false}={}){
  route=nextRoute;abort=new AbortController();
  document.documentElement.classList.toggle('no-motion',isReduced());
  $('#motion-toggle').setAttribute('aria-pressed',String(isReduced()));$('#motion-toggle').textContent=isReduced()?'Motion reduced':'Reduce motion';
  accordions();
  if(route==='home'){
   setupGallery(false);categoryInteractions();
   if(!$('.hero h1 .line-inner'))$$('.hero h1>span').forEach(s=>{s.innerHTML=`<span class="line-inner">${s.innerHTML}</span>`});
  }
  if(isReduced()){finishIntro();return}
  media=gsap.matchMedia();
  media.add({all:'(min-width:0px)',desktop:'(min-width:1025px) and (min-height:820px) and (pointer:fine)',mobile:'(max-width:800px)'},ctx=>{
   const desktop=ctx.conditions.desktop;
   if(route==='home'){
    // Only the collection is pinned. The hero remains in ordinary document flow.
    if(desktop)setupGallery(true);
    const heroScroll=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:.45}});
    heroScroll.to('.hero-photo',{yPercent:15,ease:'none'},0)
     .to('.hero-content',{y:-65,opacity:.15,ease:'none'},0)
     .to('.hero-bottom',{y:-28,opacity:.2,ease:'none'},0)
     .to('.static-aperture',{rotationY:2,yPercent:9,ease:'none'},0);
    const depth={p:0};gsap.to(depth,{p:1,ease:'none',onUpdate:()=>scene?.update(depth.p),scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:.45}});
    gsap.fromTo('.statement',{'--light-wipe':1},{'--light-wipe':0,ease:'none',scrollTrigger:{trigger:'.statement',start:'top bottom',end:'top 38%',scrub:.45}});
    gsap.fromTo('.statement-quote>span',{opacity:.5},{opacity:1,stagger:.2,duration:1,ease:'power2.out',scrollTrigger:{trigger:'.statement-quote',start:'top 88%',once:true}});
    reveal('.attribution',{duration:.9,delay:.16});reveal('.statement-bottom p',{delay:.2});
    gsap.fromTo('.statement-bottom',{'--rule':0},{'--rule':1,duration:1.2,ease:'power2.inOut',scrollTrigger:{trigger:'.statement-bottom',start:'top 93%',once:true}});
    reveal('.featured .section-heading');
    // Reveal only the photograph; prices and facts stay continuously visible.
    gsap.fromTo('#property-rail .property-image img',{clipPath:'inset(0% 16% 0% 16%)',scale:1.07},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:1.15,stagger:.06,ease:'power3.inOut',scrollTrigger:{trigger:'.featured .section-heading',start:'top 90%',once:true}});
    reveal('.categories h2');
    gsap.fromTo('#categories a',{'--rule':0},{'--rule':1,duration:.9,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'#categories',start:'top 87%',once:true}});
    gsap.fromTo('#categories a h3',{x:15,opacity:.55},{x:0,opacity:1,duration:.75,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'#categories',start:'top 87%',once:true}});
    gsap.fromTo('.markets-home',{'--market-wipe':1},{'--market-wipe':0,ease:'none',scrollTrigger:{trigger:'.markets-home',start:'top bottom',end:'top 65%',scrub:.4}});
    reveal('.markets-home .section-heading');
    $$('.market-image').forEach((el,i)=>{
     gsap.fromTo(el.querySelector('img'),{clipPath:i?'inset(12% 0% 0% 0%)':'inset(0% 12% 0% 0%)',scale:1.08},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:1.4,ease:'power3.inOut',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
     gsap.fromTo(el.querySelector('img'),{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.5}});
    });
    reveal('.thailand-row',{duration:.7});reveal('.journey-intro h2');
    reveal('.testimonial blockquote',{duration:1.4});reveal('.testimonial>p:not(.eyebrow)',{delay:.15,duration:1.2});
    gsap.fromTo('.closing>img',{scale:1.08,yPercent:-5},{scale:1,yPercent:0,ease:'none',scrollTrigger:{trigger:'.closing',start:'top bottom',end:'center center',scrub:.7}});
    reveal('.closing h2',{duration:1.2});reveal('.closing .button',{duration:.8,delay:.15});
    if(arrival)heroEntry();
    let stored=false;try{stored=!!sessionStorage.getItem('alv-intro-seen')}catch{}
    const query=new URLSearchParams(location.search),wantsIntro=first&&!viewedIntro&&query.get('intro')!=='off'&&(!stored||query.get('intro')==='1')&&scrollY<80;
    viewedIntro=true;try{sessionStorage.setItem('alv-intro-seen','1')}catch{}
    if(!ctx.conditions.mobile){gsap.set('#intro-signature',{opacity:1});const ownToken=token;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(ownToken===token)initializeScene(wantsIntro,ownToken)}))}else{document.documentElement.dataset.webgl='static-mobile';finishIntro()}
   }else{
    if(arrival){
     gsap.fromTo('.route-top h1',{y:18,opacity:.65,clipPath:'inset(0% 0% 8% 0%)'},{y:0,opacity:1,clipPath:'inset(0% 0% 0% 0%)',duration:.95,ease:'power3.out'});
     gsap.fromTo('.route-top>p',{y:8,opacity:.6},{y:0,opacity:1,duration:.8,stagger:.08,ease:'power2.out'});
    }
    if(route==='properties'){
     reveal('.catalog-grid .property-image img',{duration:.85});reveal('.filter-bar',{duration:.55});
    }else if(route==='markets'||route==='about'){
     reveal('.editorial-media img',{duration:1.3});reveal('.editorial-copy h2',{duration:1.1});reveal('.statement-quote',{duration:1.3});
    }else if(route==='services'){
     reveal('.journey-intro h2');reveal('.service-links a',{duration:.65});
    }else if(route==='contact'){
     reveal('.contact-details h2',{duration:.75});
     // Controls never wait for an entrance animation to become usable.
     gsap.fromTo('.contact-form',{borderTopColor:'#b5a27e'},{borderTopColor:'rgba(17,51,60,.2)',duration:1.2});
    }
   }
   gsap.utils.toArray(`${route==='home'?'#home-page':'#route-page'} .journey-steps`).forEach(el=>gsap.fromTo(el,{'--journey-rule':0},{'--journey-rule':1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
   return ()=>{token++;scene?.dispose();scene=null;galleryTrigger=null;vp.classList.remove('is-pinned');finishIntro()};
  });
  resizeObserver=new ResizeObserver(refresh);resizeObserver.observe(rail);resizeObserver.observe(document.querySelector('main'));
  document.fonts.ready.then(refresh);
  $$('img').forEach(img=>{if(!img.complete)img.addEventListener('load',refresh,{once:true,signal:abort.signal})});
  $('#skip-intro').addEventListener('click',finishIntro,{signal:abort.signal});
  addEventListener('wheel',()=>{scrollTween?.kill();if(!$('#intro-signature').hidden)finishIntro()},{passive:true,signal:abort.signal});
  addEventListener('touchstart',()=>{scrollTween?.kill();finishIntro()},{passive:true,signal:abort.signal});
  addEventListener('keydown',e=>{if(['Escape','PageDown','ArrowDown',' '].includes(e.key))finishIntro()},{signal:abort.signal});
 }
 function animateFilter(){if(isReduced())return;gsap.fromTo('#catalog-grid .property-image img',{clipPath:'inset(0% 6% 0% 6%)',scale:1.03},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:.55,stagger:.045,ease:'power3.out'});refresh()}
 return {setup,cleanup,finishIntro,animateFilter,next:()=>go(active+1),previous:()=>go(active-1),refresh};
}
