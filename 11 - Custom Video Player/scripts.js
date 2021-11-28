let player = document.getElementsByClassName('player__video')[0]
let progress = document.getElementsByClassName('progress')[0]
let progress_filled = document.getElementsByClassName('progress__filled')[0]

let play_btn = document.getElementsByClassName('player__button')[0]
let volume = document.getElementsByClassName('player__slider')[0]
let playbackRate = document.getElementsByClassName('player__slider')[1]
let backward_10 = document.querySelector('button[data-skip="-10"]')
let forward_25 = document.querySelector('button[data-skip="25"]')

let position = 0;
progress.addEventListener('click',()=>{
    player.currentTime = Math.floor((position/640)*player.duration)
    document.body.style.setProperty('--progress', Math.floor((position/640)*1000)/10 +'%');

})
progress.addEventListener('mousemove',(e)=>{
    position=e.offsetX      
})

backward_10.addEventListener('click',(e)=>{
    player.currentTime -= 10 
})

forward_25.addEventListener('click',(e)=>{
    player.currentTime += 25 
})

volume.addEventListener('change',(e)=>{
    player.volume = e.target.value
})

playbackRate.addEventListener('change',(e)=>{
    player.playbackRate = e.target.value
})

play_btn.addEventListener('click',()=>{

    if(player.paused==false){
        play_btn.textContent = '►'        
        player.pause();
    }else{
        play_btn.textContent = '❚ ❚'  
        player.play();
    }
})

player.addEventListener('play',()=>{
    setInterval(()=>{
        let percent = (player.currentTime/player.duration)*1000
        document.body.style.setProperty('--progress', Math.floor(percent)/10 +'%');
    },200)
})

