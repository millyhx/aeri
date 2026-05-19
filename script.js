const canvas=document.getElementById("mist");
const ctx=canvas.getContext("2d");

const modal=document.getElementById("modal");
const beginBtn=document.getElementById("beginBtn");

const message=document.getElementById("message");
const moon=document.getElementById("moon");
const dreamBtn=document.getElementById("dreamBtn");

const scene=document.getElementById("scene");
const sky=document.getElementById("sky");

const windowContainer=
document.getElementById(
"windowContainer"
);

let phase=1;
let wipeCount=0;

/* modal */

beginBtn.addEventListener(
"click",
()=>{
modal.style.display="none";
}
);

/* mist canvas sizing */

function resizeCanvas(){

canvas.width=
windowContainer.offsetWidth;

canvas.height=
windowContainer.offsetHeight;

ctx.fillStyle=
"rgba(220,220,220,.9)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.globalCompositeOperation=
"destination-out";
}

resizeCanvas();

/* phase 1 */

let wiping=false;

canvas.addEventListener(
"pointerdown",
()=>{
wiping=true;
}
);

canvas.addEventListener(
"pointerup",
()=>{
wiping=false;
}
);

canvas.addEventListener(
"pointermove",
(e)=>{

if(!wiping || phase!==1)
return;

const rect=
canvas.getBoundingClientRect();

const x=
e.clientX-rect.left;

const y=
e.clientY-rect.top;

ctx.beginPath();

ctx.arc(
x,
y,
35,
0,
Math.PI*2
);

ctx.fill();

wipeCount++;

if(wipeCount>100){

phase=2;

windowContainer.style.display=
"none";

message.textContent=
"Tap to create stars";
}

});

/* phase 2 */

scene.addEventListener(
"pointerdown",
(e)=>{

if(phase!==2) return;

const star=
document.createElement("div");

star.className="star";

star.style.left=
e.clientX+"px";

star.style.top=
e.clientY+"px";

scene.appendChild(star);

if(
document.querySelectorAll(".star")
.length>=20
){

phase=3;

moon.style.display=
"block";

message.textContent=
"Drag the moon upward 🌙";
}

});

/* phase 3 */

let moonPlaced=false;
let dragging=false;

moon.addEventListener(
"pointerdown",
()=>{

if(moonPlaced) return;

dragging=true;

});

document.addEventListener(
"pointerup",
()=>{
dragging=false;
});

document.addEventListener(
"pointermove",
(e)=>{

if(!dragging)
return;

moon.style.left=
e.clientX+"px";

moon.style.top=
e.clientY+"px";

if(
e.clientY<
window.innerHeight*.45
){

dragging=false;

moonPlaced=true;

phase=4;

message.textContent=
"Ready to dream";

dreamBtn.style.display=
"block";
}

});

/* final */

dreamBtn.addEventListener(
"click",
()=>{

dreamBtn.style.display=
"none";

sky.style.transition = "5s ease";
sky.style.background =
"linear-gradient(to bottom, #ffb36b, #87ceeb, #dff9ff)";

moon.style.transition = "4s ease";
moon.style.top = "80px";
moon.style.opacity = "1";

document
.querySelectorAll(".star")
.forEach(star=>{

star.style.opacity=0;
star.style.transition="4s";

});

message.textContent=
"Tomorrow is a new day";

});