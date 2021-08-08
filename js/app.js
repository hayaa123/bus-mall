'use strict';

let img_array = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg',
  'pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

let obj_arr=[];
let counter = 0;
let NumRounds = 25 ;

let imgR = document.getElementById('right');
let imgL = document.getElementById('left');
let imgM = document.getElementById('mid');
let list = document.getElementById('list1');
let button =document.querySelector('button');

function img_object (imgName ,imgSrc){
  this.name = imgName;
  this.imgSrc = imgSrc;
  obj_arr.push(this);
  this.shown = 0;
  this.n_click =0;
}



for(let i=0;i<img_array.length;i++){
  // eslint-disable-next-line new-cap
  new img_object(img_array[i].split('.')[0],img_array[i]);
}
console.log(obj_arr);
function render(){
  let left_random =  random(0,obj_arr.length-1);
  let right_random = random(0,obj_arr.length-1);
  let mid_random =  random(0,obj_arr.length-1);


  imgR.src = 'img/'+obj_arr[right_random].imgSrc;
  imgM.src = 'img/'+obj_arr[mid_random].imgSrc;
  imgL.src = 'img/'+obj_arr[left_random].imgSrc;

  obj_arr[right_random].shown++;
  obj_arr[mid_random].shown++;
  obj_arr[left_random].shown++;
}

render();


function random (min , max){
  return Math.floor( Math.random() * ( max - min + 1 ) + min) ;
}


let sec = document.querySelector('section');
sec.addEventListener('click', changeImg);

function changeImg (e){
  let t = e.target.id;


  for(let i=0;i<obj_arr.length;i++){
    if (e.target.src.split('/')[4] === obj_arr[i].imgSrc){
      obj_arr[i].n_click++;
      console.log(obj_arr[i]);
    }
  }
  if ((t==='left' || t==='right' || t==='mid')&& counter<NumRounds){
    render();
    counter++;

  }
  else{
    sec.removeEventListener('click', changeImg);
  }
}


function list_result (Name,n_click,shown){
  let li = document.createElement('li');
  li.textContent = `${Name} had ${n_click} votes, and was seen ${shown} times.`;
  list.appendChild(li);
}

button.addEventListener('click',function(){
  for (let i=0;i<obj_arr.length;i++){
    list_result (obj_arr[i].name,obj_arr[i].n_click,obj_arr[i].shown);
  }
});
