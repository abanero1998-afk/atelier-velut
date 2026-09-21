document.querySelectorAll(".reveal,.wipe,.act-media,.textures,.tex").forEach((el)=>{
  el.classList.add("reveal");
});
const io=new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{ if(e.isIntersecting){ e.target.classList.add("on","wipe"); io.unobserve(e.target);} });
},{threshold:.18});
document.querySelectorAll(".reveal,.wipe").forEach((el)=>io.observe(el));
