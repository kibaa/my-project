const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const audio = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const deg = 45; //article이 회전하는 각도
const len = lists.length-1;//순번이 0부터 시작하므로 1번을 빼줌
let i = 0;
let num = 0;
let active = 0;

function activation(index, lists){
  for( let el of lists){
    el.classList.remove("on");
  }
  lists[index].classList.add("on");
}

for(let el of lists){
  let pic = el.querySelector(".pic");

  //article을 45도 회전하고 배치
  el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`;
  pic.style.backgroundImage = `url(img/member${i+1}.jpg)`;
  i++;

  // 재생, 정지, 처음부터 재생
  let play = el.querySelector(".play");
  let pause = el.querySelector(".pause");
  let load = el.querySelector(".load");

  // play 버튼 클릭시
  play.addEventListener("click", e=>{
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if(isActive){
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      e.currentTarget.closest("article").querySelector("audio").play();
    }
    
  });
  //pause 버튼 클릭시
  pause.addEventListener("click",e=>{
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if(isActive){
      e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
      e.currentTarget.closest("article").querySelector("audio").pause();
    }
    
  });
  //load 버튼 클릭시
  load.addEventListener("click",e=>{
    let isActive = e.currentTarget.closest("article").classList.contains("on");
    if(isActive){
      e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
      e.currentTarget.closest("article").querySelector("audio").load();
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  });
   
}
//모든 audio 정지 초기화
function initMusic(){
  for(let el of audio){
    el.pause();
    el.load();
    el.closest("article").querySelector(".pic").classList.remove("on");
  }
}
//prev 버튼 클릭시
prev.addEventListener("click", ()=>{
  initMusic();
  //num값을 증가시켜 45도 만큼 오른쪽 방향으로 회전
  num++;
  frame.style.transform = `rotate(${deg * num}deg)`;  

  (active == 0) ? active = len : active--;
  activation(active, lists);
});
//next 버튼 클릭시
next.addEventListener("click", ()=>{
  initMusic();
  //num갑을 감소시켜 45도 만큼 왼쪽 방향으로 회전
  num--;
  frame.style.transform = `rotate(${deg*num}deg)`;
  
  (active == len) ? active = 0 : active++;
  activation(active, lists);
});