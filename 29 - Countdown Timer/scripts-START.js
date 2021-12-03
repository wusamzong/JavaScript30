{/* <div class="timer">
<div class="timer__controls">
  <button data-time="20" class="timer__button">20 Secs</button>
  <button data-time="300" class="timer__button">Work 5</button>
  <button data-time="900" class="timer__button">Quick 15</button>
  <button data-time="1200" class="timer__button">Snack 20</button>
  <button data-time="3600" class="timer__button">Lunch Break</button>
  <form name="customForm" id="custom">
    <input type="text" name="minutes" placeholder="Enter Minutes">
  </form>
</div>
<div class="display">
  <h1 class="display__time-left"></h1>
  <p class="display__end-time"></p>
</div>
</div> */}
let timer__controls = document.querySelector('div[class="timer__controls"]')
let timer__btns = document.getElementsByClassName('timer__button')
timer__controls.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.getAttribute('data-time')){
        let btn_data = e.target.getAttribute('data-time')
        setTimmer(btn_data)
    }
})

function load_input(){
    console.log('load');
    let re = /minutes=\d+/g 
    let url = window.location.href.match(re)
    
    if(url == null)
        return;

    setTimmer(parseInt(url[0].split('=')[1])*60)
    // console.log(url);
}

let display__time = document.querySelector('h1')
let display__end = document.querySelector('p')
let timer
function setTimmer(secs){
    calcEndTime(secs)
    if(timer){
        clearInterval(timer)
    }
    timer = setInterval(()=>{
        let min = Math.floor(secs/60)
        let sec = secs%60
        
        secs -= 1;
        display__time.innerHTML = `${min>=10?'':0}${min}:${sec>=10?'':0}${sec}`
        if(secs<0){
            clearInterval(timer);
        }
    },1000)
}

function calcEndTime(secs){
    let date = new Date();
    let endTime = new Date()
    endTime.setTime(Date.parse(date)+secs*1000)
    display__end.innerHTML = `Be Back At ${endTime.getHours()}:${endTime.getMinutes()}`
    
}