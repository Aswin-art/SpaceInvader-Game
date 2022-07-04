export default class Enemy{
    constructor(position, game){
        this.image = document.getElementById('enemy');
        this.width = 50;
        this.height = 40;
        this.maxHeight = game.maxHeight;
        this.position = position;
        this.speed = 3;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        this.position.y += this.speed;
    }
}