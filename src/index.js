import Game from './game.js';

const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const game = new Game(canvas.width, canvas.height);

let lastTime = 0;

function animate(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate);
}

function play(){
    if(localStorage.getItem('name')){
        requestAnimationFrame(animate);
        document.querySelector('.menu').style.display = 'none'
        document.querySelector('.game').style.display = 'flex'
    }
}

const input_name = document.getElementById('input_name')
input_name.addEventListener('change', () => {
    console.log(input_name.value)
    localStorage.setItem('name', input_name.value)
})

document.getElementById('submit').addEventListener('click', play)