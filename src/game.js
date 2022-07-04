import Ship from './ship.js';
import Input from './input.js';
import Bullet from './bullet.js';

import { spawn } from './spawnEnemy.js';
import { spawnBullet } from './spawnBullet.js';
import Enemy from './enemy.js';

export default class Game{
    constructor(gameWidth, gameHeight){
        this.maxWidth = gameWidth;
        this.maxHeight = gameHeight;
        this.score = 0;
        this.lives = 3;
        this.bullets = [];
        this.enemy = [];
        this.gameState = {
            Running: 1,
            GameOver: 0
        }

        this.status = 1;

        this.reset();
    }

    reset(){
        this.ship = new Ship(this);
        this.enemy = [
            new Enemy({
                x: 20,
                y: -100
            }, this),
            new Enemy({
                x: 200,
                y: -100
            }, this),
            new Enemy({
                x: 800 / 2 - 25,
                y: -100
            }, this),
            new Enemy({
                x: 550,
                y: -100
            }, this),
            new Enemy({
                x: 800 - 50 - 20,
                y: -100
            }, this)
        ];

        new Input(this);
        
        this.gameObject = [
            this.ship, ...this.enemy, ...this.bullets
        ]
    }

    shoot(){
        if(this.bullets.length < 3){
            const audio = new Audio('../audio/laser.m4a');
            audio.play();
            this.bullets.push(new Bullet(this));
        }
    }

    notCrashed(object1, object2){
        return object1.position.x > object2.position.x + object2.width ||
        object1.position.x + object1.width < object2.position.x ||
        object1.position.y > object2.position.y + object2.height ||
        object1.position.y + object1.height < object2.position.y
    }

    draw(ctx){
        if(this.status === this.gameState.Running){
            [this.ship, ...this.bullets, ...this.enemy].forEach(object => object.draw(ctx));
            ctx.fillStyle = 'white';
            ctx.font = '15px arial';
            ctx.fillText('Score: ' + this.score, 20, 20);
            ctx.fillText('Lives: ' + this.lives, 20, 40);
            ctx.fillText('Name: ' + localStorage.getItem('name'), 20, 60);
        }

        if(this.status === this.gameState.GameOver){
            ctx.fillStyle = 'white';
            ctx.font = '50px arial';
            ctx.fillText('Game Over!', this.maxWidth / 2 - 120, this.maxHeight / 2);
            // ctx.fillRect(this.maxWidth / 2 - 100 / 2, this.maxHeight / 2, 100, 50);
            // ctx.fillStyle = 'black';
            // ctx.font = '20px arial';
            // ctx.fillText('Main Lagi?', this.maxWidth / 2 - 200 / 2 + 50, this.maxHeight / 2 + 30);
            
            // document.querySelector('#gameScreen').addEventListener('click', () => {
            //     this.status = 1;
            // }, {once: true});
        }
    }

    update(deltaTime){
        if(this.lives <= 0){
            this.status = 0;
            return;
        }
        [this.ship, ...this.bullets, ...this.enemy].forEach(object => object.update(deltaTime));

        if(this.enemy.length <= 0){
            this.enemy = spawn(this);
        }

        // this.bullets.forEach(object => object.update(deltaTime));

        this.enemy.forEach((object, index) => {
            if(object.position.y > this.maxHeight){
                this.enemy.splice(index, 1);
            }
        });

        this.bullets.forEach((object, index) => {
            if(object.position.y < 0){
                this.bullets.splice(index, 1);
            }
        });

        this.enemy.forEach((object, index) => {
            this.bullets.forEach((bullet, indexBullet) => {
                if(!this.notCrashed(bullet, object)){
                    this.score += 10;
                    this.enemy.splice(index, 1);
                    this.bullets.splice(indexBullet, 1);
                }
            });
        });

        this.enemy.forEach((object, index) => {
            if(!this.notCrashed(this.ship, object)){
                this.lives -= 1;
                this.reset();
            }
        });
    }
}