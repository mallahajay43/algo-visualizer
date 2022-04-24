const btns=document.querySelector('.btns');
const contents=document.querySelector('.contents');
const sizeRange=document.querySelector('.size');
const speedRange=document.querySelector('.speed');
const btnShort=document.querySelector('#short');

let size;
let speed;
let isSorting=false;

window.onload= function (){
    if(isSorting)
        return;
    size=sizeRange.value;
    speed=(200-speedRange.value)*10 +10;
    Genertate(size);
}

sizeRange.addEventListener('change', (e)=>{
    if(isSorting)
        return;
    size=e.target.value;
    Genertate(size);
})

speedRange.addEventListener('change', (e)=>{
    speed=(200-e.target.value)*5 +10;
})

btnShort.addEventListener('click', (e)=>{
    if(isSorting)
        return
    Short();
})



function Genertate(i){

    //removes all the preadded child nodes
    while(contents.hasChildNodes()){
        contents.removeChild(contents.childNodes[0]);
    }

    // width of the container
    let w=document.querySelector('.contents').clientWidth;
    //width of each bar
    w/=i;
    let h=contents.clientHeight -10;
    while(i--){
        const bar=document.createElement("div");
        contents.appendChild(bar);
        bar.classList.add('bar');
        let hr=(Math.ceil(Math.random()*100)*h)/100;
        bar.style.height=`${hr}px`;
        bar.style.width=`${w}px`;
    }
}

async function Swap(j){
    let h1 = parseInt(contents.childNodes[j].style.height);
    let h2 = parseInt(contents.childNodes[j - 1].style.height);
    contents.childNodes[j].style.backgroundColor="orange";
    
    await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed/2)
      );

    contents.childNodes[j-1].style.backgroundColor="orange";
    if(h1>h2){
        contents.childNodes[j].style.backgroundColor="red";
        contents.childNodes[j-1].style.backgroundColor="red";
        contents.childNodes[j].style.height=h2+"px";
        contents.childNodes[j-1].style.height=h1+"px";
    }
    else{
        contents.childNodes[j].style.backgroundColor="yellow";
        contents.childNodes[j-1].style.backgroundColor="yellow";
    }

    await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed)
      );
      contents.childNodes[j].style.backgroundColor="cyan";
      if(firstBar==size-2)
        contents.childNodes[j].style.backgroundColor="green";
}


let firstBar;

async function Short(){
    isSorting=true;
    for(let i=0; i<size-1; i++){
        firstBar=i;
        // due to rotation of container by 180deg along z axis we are taking last element as first. 
        for(let j=size-1; j>i; j--){
            Swap(j);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed)
            );
        }
        contents.childNodes[i].style.backgroundColor="green";
    }
    isSorting=false;
}