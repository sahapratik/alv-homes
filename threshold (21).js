import * as THREE from 'three';
// Abstract framing geometry. It does not depict a property for sale.
export function createThreshold(host){
 if(new URLSearchParams(location.search).get('webgl')==='off')throw new Error('Static preview requested');
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 renderer.domElement.setAttribute('aria-hidden','true');host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,40);camera.position.set(0,0,10);
 const group=new THREE.Group();scene.add(group);group.rotation.set(.012,-.17,0);
 const stone=new THREE.MeshStandardMaterial({color:0xb7a78c,roughness:.92,metalness:0});
 const bronze=new THREE.MeshStandardMaterial({color:0xa98b54,roughness:.4,metalness:.65});
 // Small procedural mineral variation: no model, HDRI or texture downloads.
 const texCanvas=document.createElement('canvas');texCanvas.width=128;texCanvas.height=128;
 const ctx=texCanvas.getContext('2d'),pixels=ctx.createImageData(128,128);let seed=13;
 for(let y=0;y<128;y++)for(let x=0;x<128;x++){seed=(seed*16807)%2147483647;const v=185+Math.sin(y*.7)*4+(seed%20);const i=(y*128+x)*4;pixels.data[i]=v;pixels.data[i+1]=v-5;pixels.data[i+2]=v-13;pixels.data[i+3]=255;}ctx.putImageData(pixels,0,0);
 const texture=new THREE.CanvasTexture(texCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(1,5);stone.map=texture;
 const geometries=[];
 const box=(w,h,d,x,y,z,mat=stone)=>{const geo=new THREE.BoxGeometry(w,h,d);geometries.push(geo);const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
 const left=box(.16,5.7,.62,-2.18,0,0),right=box(.24,5.7,.62,2.18,0,0),top=box(4.6,.18,.62,0,2.76,0),bottom=box(4.6,.14,.7,0,-2.76,0);
 const edges=[box(.025,5.52,.035,-2.08,0,.33,bronze),box(.025,5.52,.035,2.04,0,.33,bronze),box(4.15,.025,.035,0,2.66,.33,bronze),box(4.15,.025,.035,0,-2.66,.37,bronze)];
 scene.add(new THREE.HemisphereLight(0xfaf3da,0x37525a,2.3));const sun=new THREE.DirectionalLight(0xffe9ba,3.6);sun.position.set(-4,6,7);scene.add(sun);
 let progress=0,visible=true,dead=false,frame=0;
 const render=()=>{frame=0;if(dead||!visible||document.hidden)return;group.rotation.y=-.17+progress*.1;group.position.z=progress*1.4;left.position.x=-2.18-progress*.6;right.position.x=2.18+progress*.6;top.scale.x=bottom.scale.x=1+progress*.26;edges[0].position.x=-2.08-progress*.6;edges[1].position.x=2.04+progress*.6;edges[2].scale.x=edges[3].scale.x=1+progress*.26;sun.intensity=3.6-progress*.6;renderer.render(scene,camera);host.dataset.drawCalls=String(renderer.info.render.calls);};
 const request=()=>{if(!frame&&!dead&&visible)frame=requestAnimationFrame(render)};
 const size=()=>{if(dead)return;const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();group.position.x=2.15;request();};
 const resize=new ResizeObserver(size);resize.observe(host);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)request()},{threshold:0});intersection.observe(host);
 const visibility=()=>{if(!document.hidden)request()};document.addEventListener('visibilitychange',visibility);
 const lost=e=>{e.preventDefault();host.classList.remove('ready');document.documentElement.dataset.webgl='fallback';dispose();};renderer.domElement.addEventListener('webglcontextlost',lost);
 function dispose(){if(dead)return;dead=true;cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());texture.dispose();stone.dispose();bronze.dispose();renderer.dispose();renderer.domElement.remove();host.classList.remove('ready');}
 size();render();host.classList.add('ready');document.documentElement.dataset.webgl='ready';
 return{update(p){progress=p;request()},dispose};
}
