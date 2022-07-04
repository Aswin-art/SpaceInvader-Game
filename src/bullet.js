export default class Bullet{
    constructor(game){
        this.ship = game.ship;
        this.width = 10;
        this.height = 20;
        this.speed = 8;
        this.position = {
            x: this.ship.position.x + this.ship.width / 2 - this.width / 2,
            y: this.ship.position.y,
        }
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        this.position.y -= this.speed;
    }
}