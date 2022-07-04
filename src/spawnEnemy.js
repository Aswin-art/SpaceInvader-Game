import Enemy from './enemy.js';

export function spawn(game){
    let enemies = [];
    
    const enemiesAmount = randomNumber(3,5);

    for(let i = 0; i < enemiesAmount; ++i){
        const position = {
            x: randomNumber(20, game.maxWidth - 70),
            y: randomNumber(-200, -50)
        }

        enemies.push(new Enemy(position, game));
    }

    return enemies;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}