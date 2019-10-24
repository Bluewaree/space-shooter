import {Input} from './models/input.js';
import {Spaceship} from './models/spaceship.js';
import {background} from './constants.js';
import {EnemySpaceShip} from './models/enemy_spaceship.js'
import {SpaceshipLaser} from './models/spaceship_laser.js'

export const count_seconds = (old_time) => {

    let new_time = new Date().getTime();
    let distance = new_time - old_time;

    return Math.floor((distance % (1000 * 60)) / 1000);
}

export const initial_game_state = (app) => {

    // Initializing background
    let tilingSprite = new PIXI.TilingSprite(
        background,
        app.screen.width,
        app.screen.height,
    );

    // Initializing Input listeners
    let input = new Input()
    input.watch();
    
    // Kill count text
    let kill_count = new PIXI.Text('Enemies killed: 0',{fontFamily : 'Arial', fontSize: 18, fill : 0xffffff, align : 'center'});
    
    // Adding background and first character to stage
    let spaceship = new Spaceship(app);
    app.stage.addChild(tilingSprite);
    app.stage.addChild(spaceship);
    app.stage.addChild(kill_count);
    
    // Defining variables
    let current_seconds = -1;
    let now = new Date().getTime();

    return {
        input,
        spaceship,
        kill_count,
        current_seconds,
        now,
        tilingSprite
    }
}

export const on_game_lose = (app) => {
    app.stage.children.forEach(child => {
        if(child instanceof Spaceship || child instanceof SpaceshipLaser || child instanceof EnemySpaceShip)
            app.stage.removeChild(child);
    });
    document.getElementById('menu').style.display = "block";
}