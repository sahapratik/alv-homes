// Refinement layer: one stroke-icon family (1.5px, round caps), scroll-linked journey rail.
const P={'arrow':'M4 12h15M13 6l6 6-6 6','out':'M7 17 17 7M8 7h9v9','phone':'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z','mail':'M4 6h16v12H4zM4 7l8 6 8-6','chat':'M4 20l1.3-4A8 8 0 1 1 8 18.7z','bed':'M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5','bath':'M4 12h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 3.5-1.3M7 18l-1 2M17 18l1 2','area':'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5','left':'M15 5l-7 7 7 7','right':'M9 5l7 7-7 7'};
export const icon=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${P[n]}"/></svg>`;
export function decorate(){
 const add=(s,n)=>document.querySelectorAll(s).forEach(a=>{if(!a.querySelector('.i'))a.insertAdjacentHTML('afterbegin',icon(n))});
 add('.footer-grid a[href^="tel:"]','phone');add('.footer-grid a[href^="mailto:"]','mail');add('.footer-grid a[href*="wa.me"]','chat');
 const p=document.querySelector('#gallery-prev'),n=document.querySelector('#gallery-next');
 if(p&&!p.querySelector('.i'))p.insertAdjacentHTML('afterbegin',icon('left'));if(n&&!n.querySelector('.i'))n.insertAdjacentHTML('beforeend',icon('right'));
}
// Marks steps as the visitor scrolls past them and fills a rail to the last one reached. Layout is never changed.
export function mountJourney(root){
 if(!root)return()=>{};
 const items=[...root.querySelectorAll('details')],reached=new Set();
 const paint=()=>{const last=Math.max(-1,...reached),it=items[last];root.style.setProperty('--p',String(it?Math.min(1,(it.offsetTop+40)/(root.offsetHeight||1)):0));items.forEach((d,i)=>d.toggleAttribute('data-reached',i<=last))};
 const io=new IntersectionObserver(es=>{es.forEach(e=>{const i=items.indexOf(e.target.parentElement);(e.isIntersecting||e.boundingClientRect.top<0)?reached.add(i):reached.delete(i)});paint()},{rootMargin:'0px 0px -55% 0px'});
 items.forEach(d=>{io.observe(d.querySelector('summary'));d.addEventListener('toggle',paint)});
 const ro=new ResizeObserver(paint);ro.observe(root);
 return()=>{io.disconnect();ro.disconnect();items.forEach(d=>d.removeEventListener('toggle',paint))};
}
