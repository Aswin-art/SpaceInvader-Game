export default class Ship{
    constructor(game){
        this.maxWidth = game.maxWidth;
        this.maxHeight = game.maxHeight;

        this.image = document.getElementById('ship');
        this.width = 40;
        this.height = 40;
        this.position = {
            x: this.maxWidth / 2 - this.width / 2,
            y: this.maxHeight - this.height - 10
        }

        this.speed = 0;
        this.speedUp = 0;
        this.maxSpeed = 10;
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    moveUp(){
        this.speedUp = -this.maxSpeed;
    }

    moveDown(){
        this.speedUp = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
        this.speedUp = 0;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        if(this.position.x + this.width > this.maxWidth){
            this.position.x = this.maxWidth - this.width;
        }

        if(this.position.x < 0){
            this.position.x = 0;
        }

        this.position.x += this.speed;
        this.position.y += this.speedUp;
    }
}