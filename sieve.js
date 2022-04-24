const contain=document.querySelector('.vis');

for(let i=1; i<=100; i++){
   const box=document.createElement("div");
   const num=document.createElement("div");
   box.appendChild(num);
   box.classList.add('box');
   box.setAttribute('id', i);
   num.textContent=box.id;
   contain.appendChild(box);
}

const btn=document.querySelector('#simulate');

btn.addEventListener('click', ()=>{
    sieve();
})

async function sieve(){
    let arr=new Array(101);
    for(let i=0; i<101; i++)
        arr[i]=0;
    for(let i=2; i<=100; i++){
        if(arr[i]==0){
            contain.childNodes[i].style.backgroundColor="green";
            
            await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, 1000)
                    );

            for(let j=i*i; j<101; j+=i){

                if(arr[j]==0){

                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, 100)
                    );

                    contain.childNodes[j].style.backgroundColor="#0093AB";
                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, 300)
                    );

                    arr[j]=1;
                    contain.childNodes[j].style.backgroundColor="#333C83";
                }
            }
        }
    }
}