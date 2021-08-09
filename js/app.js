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
let left_random = 0;
let right_random = 0;
let mid_random = 0;
let repeat_arr = [];
let char_labels = [];
let char_data =[];

function img_object (imgName ,imgSrc){
  this.name = imgName;
  this.imgSrc = imgSrc;
  obj_arr.push(this);
  this.shown = 0;
  this.n_click =0;
}

function random (min , max){
  return Math.floor( Math.random() * ( max - min + 1 ) + min) ;
}



for(let i=0;i<img_array.length;i++){
  // eslint-disable-next-line new-cap
  new img_object(img_array[i].split('.')[0],img_array[i]);
}
console.log(obj_arr);
function render(){

  do{
    left_random = random(0,obj_arr.length-1);
  }while((left_random===right_random || left_random===mid_random ) || repeat_arr.includes(left_random));
  do{
    right_random = random(0,obj_arr.length-1);
  }while ((left_random===right_random || right_random===mid_random ) || repeat_arr.includes(right_random) );

  do{
    mid_random = random(0,obj_arr.length-1);
  }while ((left_random===mid_random || right_random===mid_random) || repeat_arr.includes(mid_random));


  repeat_arr=[];
  repeat_arr.push(left_random,mid_random,right_random);
  console.log(repeat_arr);

  imgR.src = 'img/'+obj_arr[right_random].imgSrc;
  imgM.src = 'img/'+obj_arr[mid_random].imgSrc;
  imgL.src = 'img/'+obj_arr[left_random].imgSrc;

  obj_arr[right_random].shown++;
  obj_arr[mid_random].shown++;
  obj_arr[left_random].shown++;

}

render();

let sec = document.querySelector('section');
sec.addEventListener('click', changeImg);

function changeImg (e){
  let t = e.target.id;

  if ((t==='left' || t==='right' || t==='mid')&& counter<NumRounds){

    if (t === 'left'){
      obj_arr[left_random].n_click++;
    }
    else if(t==='right'){
      obj_arr[right_random].n_click++;
    }
    else if (t==='mid'){
      obj_arr[mid_random].n_click++;
    }


    render();
    counter++;

  }
  else if(counter>=NumRounds){
    sec.removeEventListener('click', changeImg);
  }
}


function list_result (Name,n_click,shown){
  let li = document.createElement('li');
  li.textContent = `${Name} had ${n_click} votes, and was seen ${shown} times.`;
  list.appendChild(li);
}

button.addEventListener('click',click_event);

function click_event(){
  for (let i=0;i<obj_arr.length;i++){
    list_result (obj_arr[i].name,obj_arr[i].n_click,obj_arr[i].shown);
  }
  for (let i=0;i<obj_arr.length;i++){
    char_labels.push(obj_arr[i].name);
    char_data.push(obj_arr[i].n_click);
  }
  bar_chart();
}


// bar_chart();

function bar_chart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: char_labels,
      datasets: [{
        label: '# of Votes',
        data: char_data,
        backgroundColor: [
          '#63BFF0',
          '#06E5DC',
          '#67F1B8',
          '#B0F88F',
          '#F9F871',
          '#19D3F0'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


}
