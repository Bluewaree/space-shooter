const app = new PIXI.Application();
document.body.appendChild(app.view);

import {Input} from './models/input.js'
import {SpaceshipLaser} from './models/spaceship_laser.js'
import {EnemySpaceShip} from './models/enemy_spaceship.js'
import {Spaceship} from './models/spaceship.js'
import {count_seconds, initial_game_state} from './helpers.js';

let { input,kill_count,spaceship,current_seconds, now, tilingSprite} = initial_game_state(app);

// Game life cycle 
app.ticker.add((delta) => {
    tilingSprite.tilePosition.x -= 5; // Scrolling background
    if(input.start && !spaceship.lost){
        
        document.getElementById('menu').style.display = "none";
        // Updating game elements
        app.stage.children.forEach(child => {
            if(child instanceof Spaceship || child instanceof SpaceshipLaser || child instanceof EnemySpaceShip)
                child.update(delta,app,input,kill_count);
        });

        // Adding ennemies ever 2 seconds
        let seconds = count_seconds(now);
        if(seconds & 1 == 1 && (seconds != current_seconds)){
            app.stage.addChild(new EnemySpaceShip(app))
            current_seconds = seconds;
        }
    }

    if(spaceship.lost)
        on_game_lose();
});

const on_game_lose = () => {
    app.stage.children.forEach(child => {
        if(child instanceof Spaceship || child instanceof SpaceshipLaser || child instanceof EnemySpaceShip)
            app.stage.removeChild(child);
    });
    ({ input,kill_count,spaceship,current_seconds, now, tilingSprite} = initial_game_state(app));
    document.getElementById('menu').style.display = "block";
}
