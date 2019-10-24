import {spaceship_laser,edge} from '/constants.js';
import {EnemySpaceShip} from './enemy_spaceship.js'

export class SpaceshipLaser extends PIXI.Sprite {

    constructor(x,y){
        super(spaceship_laser);
        this.position.x = x;
        this.position.y = y;
        this.anchor.y = 0.5;
        this.anchor.x = 0.5;
        this.velocity = 10;
    }

    update(delta,app){
        this.position.x += delta * this.velocity;
        if(this.position.x > app.screen.width-edge)
            app.stage.removeChild(this);
        
        app.stage.children.forEach(child => {
            if(child instanceof EnemySpaceShip
                && Math.abs(child.position.y - this.position.y) < this.height
                && Math.abs(child.position.x - this.position.x) < this.width){
                    
                    app.stage.removeChild(this);
                    app.stage.removeChild(child);
            }
        });
    }
}