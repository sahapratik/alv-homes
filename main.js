import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { properties, categories, steps, services, verifiedOn } from './data.js';
import { createMotion } from './motion.js';
import { icon, decorate, mountJourney } from './refine.js';
gsap.registerPlugin(ScrollTrigger);
const $ = s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const official='https://www.alv-homes.com/';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const card=(p,i)=>`<a class="property-card" href="${official}properties/id${p.id}" target="_blank" rel="noopener" data-index="${i}"><div class="property-image"><img src="/assets/${p.image}.webp" width="1000" height="667" alt="${escape(p.alt)}" loading="lazy"><span class="property-tag">${escape(p.type.toUpperCase())}</span><span class="property-id">ALV / ${p.id}</span><span class="image-kind">${p.kind}</span></div><div class="property-info"><div class="property-meta"><span>${escape(p.location.toUpperCase())}</span><span>${p.caption.split(' · ')[0]}</span></div><h3>${escape(p.title)}</h3><div class="property-facts">${p.beds?`<span>${icon('bed')}${p.beds} bedrooms</span><span>${icon('bath')}${p.baths} bathrooms</span>`:'<span>'+icon('bed')+'1–2 bedroom options</span>'}<span>${icon('area')}${p.size}</span><strong>${p.price}</strong></div></div><span class="sr-only">View official listing ${p.id} (opens in new tab)</span></a>`;
const stepsHTML=()=>steps.map((s,i)=>`<details ${i===0?'open':''}><summary><span>0${i+1}</span><h3>${s[0]}</h3></summary><div class="step-body"><p>${s[1]}</p></div></details>`).join('');
$('#property-rail').innerHTML=properties.map(card).join('');
$('#categories').innerHTML=categories.map((c,i)=>`<a href="${official+c[1]}" target="_blank" rel="noopener"><span>0${i+1}</span><h3>${c[0]}</h3><small>EXPLORE</small></a>`).join('');
$('#journey-steps').innerHTML=stepsHTML();
const top=(label,title,copy)=>`<section class="route-top"><p class="eyebrow">${label}</p><h1 tabindex="-1">${title}</h1><p>${copy}</p></section>`;
const templates={
properties:()=>top('THE ALV COLLECTION','Find your <em>perspective.</em>','A selection of homes in Türkiye and Bali. Find a place that fits the life you have in mind.')+`<section class="catalog"><div class="filter-bar" aria-label="Filter properties">${['All','Villas','Apartments','Sea front','Sea view','Bali','Luxury','Payment plan'].map((f,i)=>`<button data-filter="${f}" aria-pressed="${i===0}">${f}</button>`).join('')}</div><p id="catalog-count" class="catalog-count" aria-live="polite"></p><div class="catalog-grid" id="catalog-grid"></div><div class="catalog-note"><p>Published asking prices checked ${verifiedOn}.<br>Availability and final terms are confirmed by ALV.</p><a class="button" href="${official}buy-rent" target="_blank" rel="noopener">View the complete ALV collection</a></div></section>`,
markets:()=>top('OUR MARKETS','A world of <em>possibility.</em>','Different places call for different knowledge. Begin with the setting, then consider how it fits your plans.')+`<section class="editorial-page"><div class="editorial-split"><img src="/assets/turkey.webp" width="1000" height="667" alt="Alanya harbour and Red Tower in Türkiye"><div class="editorial-copy"><p class="eyebrow">01 — TÜRKİYE</p><h2>The coast.<br><em>And beyond.</em></h2><p>From Mediterranean neighbourhoods to major cities, Türkiye offers distinct property markets. ALV considers each location in relation to your lifestyle, practical needs and intended ownership period.</p><a class="under-link" href="${official}why-turkey" target="_blank" rel="noopener">Explore Türkiye</a><a class="under-link" href="${official}buyturkey" target="_blank" rel="noopener">Türkiye listings</a></div></div><div class="editorial-split"><div class="editorial-copy"><p class="eyebrow">02 — BALI &amp; SURROUNDING ISLANDS</p><h2>An island.<br><em>Your own rhythm.</em></h2><p>Bali, Nusa Penida, Lombok and the Gili Islands have different characteristics. ALV’s approach considers local rules, ownership arrangements and intended use before matching a destination to your goals.</p><a class="under-link" href="${official}why-bali" target="_blank" rel="noopener">Explore Bali</a><a class="under-link" href="${official}buybali" target="_blank" rel="noopener">Bali listings</a></div><img src="/assets/bali.webp" width="1000" height="661" alt="Kelingking Beach on Nusa Penida, in the Bali and surrounding islands market"></div><div class="editorial-copy"><p class="eyebrow">03 — THAILAND</p><h2>A personal conversation.</h2><p>Thailand is part of ALV’s international advisory focus. Contact the team to discuss your preferred area and currently available opportunities.</p><a class="button" href="#contact">Discuss Thailand</a></div></section>`,
services:()=>top('OUR SERVICES','Clarity at <em>every step.</em>','Personal guidance through the decisions, details and conversations that shape a property purchase.')+`<section class="journey section-pad"><div class="journey-intro"><p class="eyebrow">A STRUCTURED APPROACH</p><h2>Your goals.<br><em>Our full attention.</em></h2><p>ALV helps buyers with selection, evaluation, negotiations and coordination through transfer. Sellers can discuss positioning, pricing and reaching international buyers.</p><a class="under-link" href="#contact">Discuss your plans</a></div><div class="journey-steps">${stepsHTML()}</div></section><section class="editorial-page"><p class="eyebrow">EXPLORE THE DETAILS WITH ALV</p><h2>A little more <em>understanding.</em></h2><div class="service-links">${services.map(s=>`<a href="${official+s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join('')}</div></section>`,
about:()=>top('OUR STORY','A more personal<br><em>perspective.</em>','A boutique agency with an international outlook, based in Alanya.')+`<section class="editorial-page"><div class="editorial-split"><img src="/assets/turkey.webp" width="1000" height="667" alt="Alanya, home to ALV Homes"><div class="editorial-copy"><p class="eyebrow">ROMIOU SHAIKH · FOUNDER &amp; CEO</p><h2>Property decisions.<br><em>Life decisions.</em></h2><p>ALV works with buyers, sellers and investors whose reasons for purchasing go beyond an address. Its advice draws on first-hand investment experience, local relationships and a structured approach to evaluating opportunities.</p><p>The team combines property selection with negotiation support and coordination through the transaction. The starting point is your purpose: a holiday home, a permanent move or an international property portfolio.</p><a class="under-link" href="${official}our-story" target="_blank" rel="noopener">Read ALV’s story</a></div></div><div class="statement-quote">“Our work is selective. Our advice is independent. We focus on decisions that remain sound over time.”</div><p class="attribution">ALV HOMES <span>Our approach</span></p></section>`,
contact:()=>top('A PERSONAL CONVERSATION','Your next chapter<br><em>starts here.</em>','Tell us about the place, the purpose and the possibilities you have in mind.')+`<section class="contact-layout"><div class="contact-details"><p class="eyebrow">SPEAK WITH ALV HOMES</p><h2>Let’s begin<br><em>with you.</em></h2><a class="contact-number" href="tel:+905365157499">+90 536 515 74 99</a><p>Romiou Shaikh, Founder &amp; CEO<br>German · English · Turkish · Urdu</p><p>Russian and Ukrainian client support<br>with Viktoriia Darian.</p><a class="under-link" href="https://wa.me/905365157499" target="_blank" rel="noopener">Open WhatsApp</a><p>Kargicak Mahallesi, Sahil Caddesi No:67<br>Alanya / Antalya / Türkiye<br><br>Monday–Saturday, 09:00–18:00<br>Sunday closed</p></div><form id="inquiry-form" class="contact-form"><div class="form-grid"><div class="field"><label for="first-name">First name *</label><input id="first-name" name="firstName" autocomplete="given-name" required maxlength="80"></div><div class="field"><label for="last-name">Last name</label><input id="last-name" name="lastName" autocomplete="family-name" maxlength="80"></div><div class="field"><label for="email">Email *</label><input id="email" type="email" name="email" autocomplete="email" required maxlength="160"></div><div class="field"><label for="phone">Telephone</label><input id="phone" type="tel" name="phone" autocomplete="tel" maxlength="40"></div><div class="field full"><label for="language">Preferred language</label><select id="language" name="language">${['English','German','Turkish','Russian','Ukrainian','Urdu'].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="field full"><label for="message">What are you looking for? *</label><textarea id="message" name="message" rows="5" required maxlength="3000" placeholder="Location, property type, budget, and anything else that matters to you."></textarea></div></div><p class="form-help">This opens a draft in your email app. Review it and press Send there. Your inquiry is not sent by this website.</p><button class="button" type="submit">Prepare email inquiry</button><a class="under-link fallback-link" href="${official}inquiryform" target="_blank" rel="noopener">Use ALV’s inquiry form</a><p class="form-status" id="form-status" role="status"></p></form></section>`
};
let journeyStop=()=>{};let currentRoute='home',motionOff=false,routeTransition=null,transitionSerial=0,pendingHash=null;
try{motionOff=sessionStorage.getItem('alv-motion')==='off'}catch{}
const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
const reduced=()=>systemMotion.matches||motionOff;
const motion=createMotion(reduced);
const imageFallbacks=()=>$$('img').forEach(img=>{if(img.complete&&!img.naturalWidth)img.parentElement.classList.add('image-failed');img.addEventListener('error',()=>img.parentElement.classList.add('image-failed'),{once:true})});
// Reuse verified ALV imagery for category glimpses. No new property claims.
const glimpse=document.createElement('div');glimpse.className='category-glimpse';glimpse.setAttribute('aria-hidden','true');
glimpse.innerHTML=['property-2','property-164','property-165','property-154','bali'].map(src=>`<img src="/assets/${src}.webp" width="270" height="145" loading="lazy" alt="">`).join('');$('.categories>div').appendChild(glimpse);
$('#gallery-prev').onclick=()=>motion.previous();$('#gallery-next').onclick=()=>motion.next();
function parseRoute(){let v;try{v=decodeURIComponent(location.hash.slice(1))}catch{v='home'}const [route,filter]=v.split(':');return{route:templates[route]?route:'home',filter,anchor:route==='statement'?'statement':null}}
function updateHeader(){$('#header').classList.toggle('scrolled',scrollY>35||currentRoute!=='home')}
function closeMenu(){const nav=$('#navigation');nav.classList.remove('open');document.documentElement.classList.remove('menu-open');$('#menu').setAttribute('aria-expanded','false')}
$('#menu').onclick=()=>{const open=$('#navigation').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));document.documentElement.classList.toggle('menu-open',open);if(open){$('#navigation a').focus();if(!reduced())gsap.fromTo('#navigation a',{x:14,opacity:.5},{x:0,opacity:1,duration:.4,stagger:.055,ease:'power3.out'})}};
addEventListener('keydown',e=>{const open=$('#navigation').classList.contains('open');if(e.key==='Escape'&&open){closeMenu();$('#menu').focus()}
 if(e.key==='Tab'&&open){const f=[...$('#header').querySelectorAll('a[href],button')].filter(x=>x.getClientRects().length),a=document.activeElement;if(e.shiftKey&&a===f[0]){e.preventDefault();f.at(-1).focus()}else if(!e.shiftKey&&a===f.at(-1)){e.preventDefault();f[0].focus()}}});
function filterProperties(filter='All',animate=false){
 const aliases={'Sea View':'Sea view','Sea Front':'Sea front','Payment Plan':'Payment plan'};filter=aliases[filter]||filter;
 const allowed=['All','Villas','Apartments','Sea front','Sea view','Bali','Luxury','Payment plan'];if(!allowed.includes(filter))filter='All';
 const list=properties.filter(p=>filter==='All'||p.filters.includes(filter));$('#catalog-grid').innerHTML=list.map(card).join('');
 $('#catalog-count').textContent=`${list.length} ${list.length===1?'property':'properties'} in this selection · ${filter}`;
 $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));imageFallbacks();if(animate)motion.animateFilter();
}
function mountContact(){
 const form=$('#inquiry-form');if(!form)return;
 const status=$('#form-status'),submit=form.querySelector('[type=submit]');
 form.noValidate=true;const msgs={firstName:'Please enter your first name.',email:'Please enter a valid email address, for example name@example.com.',message:'Please tell us a little about what you are looking for.'};
 const clear=el=>{const f=el.closest('.field');f?.classList.remove('has-error');el.removeAttribute('aria-invalid');el.removeAttribute('aria-describedby');f?.querySelector('.field-error')?.remove()};
 form.addEventListener('input',e=>{clear(e.target);if(status.dataset.state==='error'&&!form.querySelector('[aria-invalid]')){status.textContent='';delete status.dataset.state}});
 form.addEventListener('submit',event=>{
  event.preventDefault();form.querySelectorAll('[aria-invalid]').forEach(clear);
  const bad=[...form.elements].filter(el=>el.name&&!el.checkValidity());
  if(bad.length){bad.forEach(el=>{const f=el.closest('.field'),id=`err-${el.id}`,p=document.createElement('p');f.classList.add('has-error');el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',id);p.className='field-error';p.id=id;p.textContent=msgs[el.name]||'Please check this field.';f.append(p)});status.dataset.state='error';status.textContent=bad.length===1?'One field needs your attention before we can prepare the email.':`${bad.length} fields need your attention before we can prepare the email.`;bad[0].focus();return}
  form.setAttribute('aria-busy','true');submit.disabled=true;status.dataset.state='preparing';status.textContent='Preparing your email draft…';
  requestAnimationFrame(()=>{
   try{
    const f=new FormData(form),subject=`Property inquiry from ${f.get('firstName')} ${f.get('lastName')||''}`.trim();
    const body=`Name: ${f.get('firstName')} ${f.get('lastName')||''}\nEmail: ${f.get('email')}\nTelephone: ${f.get('phone')||'Not provided'}\nPreferred language: ${f.get('language')}\n\n${f.get('message')}`;
    const href=`mailto:alanya.luxury.villas.and.homes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.dataset.state='draft';status.textContent='Your email draft is ready. Complete sending in your email app. If it did not open, use ALV’s inquiry form above.';
    const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener';a.textContent='Open email draft';status.append(' ',a);a.click();
   }catch{status.dataset.state='error';status.textContent='We could not prepare the draft. Please use ALV’s inquiry form or contact the team by phone.'}
   finally{form.setAttribute('aria-busy','false');submit.disabled=false}
  });
 });
}
function renderRoute({focus=true,restore=0,first=false,arrival=true}={}){
 const {route,filter,anchor}=parseRoute();motion.cleanup();journeyStop();currentRoute=route;closeMenu();
 $('#home-page').hidden=route!=='home';$('#route-page').hidden=route==='home';$('#route-page').innerHTML=route==='home'?'':templates[route]();
 $$('[data-route-end]').forEach(el=>el.remove());
 document.title=route==='home'?'ALV Homes | Privacy. Precision. Performance.':`${route==='about'?'Our story':route[0].toUpperCase()+route.slice(1)} | ALV Homes`;
 document.body.dataset.route=route;
 $$('#navigation a').forEach(a=>{if(a.hash===`#${route}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 if(route==='properties'){
  filterProperties(filter);
  $$('[data-filter]').forEach(button=>button.onclick=()=>{saveScroll();history.pushState({scroll:scrollY},'',`#properties:${encodeURIComponent(button.dataset.filter)}`);filterProperties(button.dataset.filter,true)});
 }
 // Media wrappers isolate masks without moving editorial text or changing image dimensions.
 $$('#route-page .editorial-split>img').forEach(img=>{const wrap=document.createElement('div');wrap.className='editorial-media';img.before(wrap);wrap.appendChild(img)});
 mountContact();imageFallbacks();journeyStop=mountJourney($(route==='home'?'#home-page .journey-steps':'#route-page .journey-steps'));
 scrollTo({top:restore,behavior:'instant'});
 motion.setup(route,{arrival,first});updateHeader();
 requestAnimationFrame(()=>{
  ScrollTrigger.refresh();
  if(anchor)$('#statement').scrollIntoView({behavior:'instant'});else scrollTo({top:restore,behavior:'instant'});
  if(focus)(route==='home'?$('.hero h1'):$('#route-page h1'))?.focus({preventScroll:true});
 });
}
function transitionRoute(options={}){
 if(pendingHash===location.hash&&routeTransition?.isActive())return;
 pendingHash=location.hash;const serial=++transitionSerial;routeTransition?.kill();motion.finishIntro();closeMenu();
 if(reduced()){pendingHash=null;gsap.set('#route-curtain',{visibility:'hidden'});renderRoute(options);return}
 gsap.set('#route-curtain',{visibility:'visible'});
 routeTransition=gsap.timeline({onComplete:()=>{if(serial===transitionSerial){gsap.set('#route-curtain',{visibility:'hidden'});pendingHash=null}}})
  .fromTo('#route-curtain>div:first-child',{xPercent:-101},{xPercent:0,duration:.23,ease:'power2.in'},0)
  .fromTo('#route-curtain>div:nth-child(2)',{xPercent:101},{xPercent:0,duration:.23,ease:'power2.in'},0)
  .to('#route-curtain>i',{opacity:1,duration:.12},.12)
  .call(()=>{if(serial===transitionSerial)renderRoute(options)},[],.23)
  .to('#route-curtain>div:first-child',{xPercent:-101,duration:.43,ease:'power3.out'},.25)
  .to('#route-curtain>div:nth-child(2)',{xPercent:101,duration:.43,ease:'power3.out'},.25)
  .to('#route-curtain>i',{opacity:0,duration:.2},.25);
}
function saveScroll(){history.replaceState({...history.state,scroll:scrollY},'')}
history.scrollRestoration='manual';
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 if(a.hash==='#main'){e.preventDefault();$('#main').focus();motion.finishIntro();return}
 e.preventDefault();clearTimeout(saveTimer);saveScroll();history.pushState({scroll:0},'',a.hash);
 if(a.hash==='#statement'&&currentRoute==='home'){motion.finishIntro();$('#statement').scrollIntoView({behavior:reduced()?'instant':'smooth'});return}
 transitionRoute();
});
addEventListener('popstate',e=>transitionRoute({restore:e.state?.scroll||0}));
addEventListener('hashchange',()=>transitionRoute());
let scrollFrame=0,saveTimer=0;addEventListener('scroll',()=>{clearTimeout(saveTimer);saveTimer=setTimeout(saveScroll,160);if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{updateHeader();scrollFrame=0})},{passive:true});
$('#motion-toggle').onclick=()=>{
 motionOff=!motionOff;try{sessionStorage.setItem('alv-motion',motionOff?'off':'on')}catch{}
 const section=[...document.querySelectorAll(`${currentRoute==='home'?'#home-page':'#route-page'}>section,.footer`)].filter(el=>el.getBoundingClientRect().top<innerHeight/2).at(-1);
 const offset=section?.getBoundingClientRect().top||0;
 motion.cleanup();motion.setup(currentRoute,{arrival:false});
 requestAnimationFrame(()=>{ScrollTrigger.refresh();if(section)scrollTo({top:scrollY+section.getBoundingClientRect().top-offset,behavior:'instant'})});
};
systemMotion.addEventListener('change',()=>{motion.cleanup();motion.setup(currentRoute,{arrival:false})});
addEventListener('pagehide',saveScroll);
renderRoute({focus:false,restore:history.state?.scroll||0,first:true});

decorate();
