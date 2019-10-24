import {spaceship,edge,velocity} from '/constants.js';
import {EnemySpaceShip} from './enemy_spaceship.js'
import {SpaceshipLaser} from './spaceship_laser.js'

export class Spaceship extends PIXI.Sprite {

    constructor(app){
        super(spaceship);
        this.x = edge;
        this.y = app.screen.height / 2;
        this.anchor.y = 0.5;
        this.anchor.x = 0.5;
        this.scale.set(0.7,0.7);
        this.lost = false;
    }

    update(delta, app, kb){
        if(kb.pressed.ArrowUp && this.y - velocity* delta >= edge)
            this.y -= velocity * delta;
        if(kb.pressed.ArrowDown && this.y + velocity* delta <= app.screen.height - edge)
            this.y += velocity * delta;
        if(kb.pressed.ArrowRight && this.x + velocity* delta <= app.screen.width - edge)
            this.x += velocity * delta;
        if(kb.pressed.ArrowLeft && this.x - velocity* delta >= edge)
            this.x -= velocity * delta;
        if(kb.pressed['32']){
            app.stage.addChild(new SpaceshipLaser(this.x,this.y))
            kb.held = true;
            kb.pressed['32'] = false;
        }

        app.stage.children.forEach(child => {
            if(child instanceof EnemySpaceShip
                && Math.abs(child.position.y - this.position.y) < this.height
                && Math.abs(child.position.x - this.position.x) < this.width){
                    
                    app.stage.removeChild(this);
                    this.lost=true;
            }
        });
    }
}