import {enenmy_spaceship,edge,velocity} from '/constants.js';

export class EnemySpaceShip extends PIXI.Sprite {

    constructor(app){
        super(enenmy_spaceship);
        this.x = app.screen.width - edge;
        this.y = Math.random() * ((app.screen.height-edge) - edge) + edge;;
        this.anchor.y = 0.5;
        this.anchor.x = 0.5;
    }

    update(delta){
        this.position.x -= delta * velocity;
    }
}