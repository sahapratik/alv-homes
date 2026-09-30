import * as THREE from 'three';
// Original abstract architecture. No listed property is represented by this geometry.
export function createThreshold(host,{canvas,context}={}){
 if(new URLSearchParams(location.search).get('webgl')==='off')throw Error('Static scene requested');
 const renderer=new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.08,60);
 const geometries=[],materials=[],textureCanvas=document.createElement('canvas');textureCanvas.width=textureCanvas.height=128;
 const ctx=textureCanvas.getContext('2d'),pixels=ctx.createImageData(128,128);let seed=13;
 for(let i=0;i<pixels.data.length;i+=4){seed=seed*16807%2147483647;const v=189+seed%19;pixels.data.set([v,v-5,v-13,255],i)}ctx.putImageData(pixels,0,0);
 const texture=new THREE.CanvasTexture(textureCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(1,4);
 const material=props=>{const m=new THREE.MeshStandardMaterial(props);materials.push(m);return m};
 const stone=material({color:0xb7a78c,map:texture,roughness:.92,metalness:0,transparent:true});
 const bronze=material({color:0xb79a68,roughness:.5,metalness:.55,transparent:true});
 const introStone=material({color:0x7f8176,map:texture,roughness:.96,metalness:0,transparent:true});
 const introBronze=material({color:0xcbb083,roughness:.36,metalness:.68,transparent:true});
 function box(parent,w,h,d,x,y,z,mat){const geo=new THREE.BoxGeometry(w,h,d);geometries.push(geo);const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh}
 function frame(parent,mat,edgeMat){
  box(parent,.13,5.7,.42,-2.2,0,0,mat);box(parent,.15,5.7,.42,2.2,0,0,mat);
  box(parent,4.55,.13,.42,0,2.79,0,mat);box(parent,4.55,.1,.45,0,-2.79,0,mat);
  return [box(parent,.018,5.5,.03,-2.11,0,.23,edgeMat),box(parent,4.23,.018,.03,0,2.68,.23,edgeMat),box(parent,.018,5.5,.03,2.11,0,.23,edgeMat),box(parent,4.23,.018,.03,0,-2.68,.23,edgeMat)];
 }
 const settled=new THREE.Group();settled.position.z=-10;scene.add(settled);frame(settled,stone,bronze);
 const portal=new THREE.Group();portal.position.set(2.15,0,3);scene.add(portal);const edges=frame(portal,introStone,introBronze);
 const planes=[box(portal,2.16,5.45,.19,-1.08,0,-.1,introStone),box(portal,2.16,5.45,.19,1.08,0,-.25,introStone),box(portal,4.25,.52,.26,0,2.25,-.4,introStone)];
 scene.add(new THREE.HemisphereLight(0xfaf3da,0x24414e,2.15));const light=new THREE.DirectionalLight(0xffe9be,3.1);light.position.set(-4,6,8);scene.add(light);
 let intro=1,progress=0,dead=false,visible=true,raf=0;
 const smooth=(a,b,t)=>THREE.MathUtils.smoothstep(t,a,b);
 function render(){
  raf=0;if(dead||!visible||document.hidden)return;
  camera.position.set(2.15*(1-smooth(.72,1,intro)),0,12*(1-smooth(.22,.94,intro)));
  portal.visible=intro<.98;portal.rotation.y=-.16*(1-smooth(.2,.7,intro));
  const opening=smooth(.16,.58,intro);planes[0].position.x=-1.08-opening*3.5;planes[1].position.x=1.08+opening*3.5;planes[2].position.y=2.25+opening*2.8;
  introStone.opacity=1-smooth(.63,.92,intro);introBronze.opacity=1-smooth(.77,.96,intro);
  edges.forEach((edge,i)=>{const drawn=smooth(i*.045,.25+i*.045,intro);if(i%2)edge.scale.x=Math.max(.001,drawn);else edge.scale.y=Math.max(.001,drawn)});
  const rest=smooth(.57,1,intro);stone.opacity=bronze.opacity=rest;
  settled.rotation.y=-.17+progress*.12;settled.position.z=-10+progress*.85;
  renderer.render(scene,camera);host.dataset.drawCalls=String(renderer.info.render.calls);host.dataset.triangles=String(renderer.info.render.triangles);
 }
 function request(){if(!raf&&!dead&&visible&&!document.hidden)raf=requestAnimationFrame(render)}
 function size(){if(dead)return;const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();const viewHeight=2*Math.tan(THREE.MathUtils.degToRad(42/2))*10;const viewWidth=viewHeight*camera.aspect;settled.position.x=viewWidth*.23;settled.position.y=-viewHeight*.02;settled.scale.set(viewWidth*.36/4.55,viewHeight*.72/5.7,1);request()}
 const resize=new ResizeObserver(size);resize.observe(host);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)request()});intersection.observe(host);
 const visibility=()=>{if(!document.hidden)request()};document.addEventListener('visibilitychange',visibility);
 const lost=e=>{e.preventDefault();document.documentElement.dataset.webgl='fallback-context-lost';dispose()};renderer.domElement.addEventListener('webglcontextlost',lost);
 function dispose(){if(dead)return;dead=true;cancelAnimationFrame(raf);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());texture.dispose();renderer.dispose();renderer.domElement.remove();host.classList.remove('ready')}
 size();render();host.classList.add('ready');document.documentElement.dataset.webgl='ready';
 return{update(p){progress=THREE.MathUtils.clamp(p,0,1);request()},introduction(p){intro=THREE.MathUtils.clamp(p,0,1);request()},dispose};
}
