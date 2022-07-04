export default class Input{
    constructor(game){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 37:
                    game.ship.moveLeft();
                    break;
                case 38:
                    game.ship.moveUp();
                    break;
                case 39:
                    game.ship.moveRight();
                    break;
                case 40:
                    game.ship.moveDown();
                    break;
                default:
                    break;
            }
        })

        document.addEventListener('keyup', e => {
            switch(e.keyCode){
                case 37:
                    if(game.ship.speed < 0){
                        game.ship.stop();
                    }
                    break;
                case 38:
                    if(game.ship.speedUp < 0){
                        game.ship.stop();
                    }
                    break;
                case 39:
                    if(game.ship.speed > 0){
                        game.ship.stop();
                    }
                    break;
                case 40:
                    if(game.ship.speedUp > 0){
                        game.ship.stop();
                    }
                    break;
                default:
                    break;
            }
        })

        document.addEventListener('keydown', e => {
            switch(e.key){
                case ' ':
                    game.shoot();
                    break;
                default:
                    break;
            }
        })
    }


}