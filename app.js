const app = new PIXI.Application();
document.body.appendChild(app.view);

import {Keyboard} from './models/keyboard.js'
import {SpaceshipLaser} from './models/spaceship_laser.js'
import {EnemySpaceShip} from './models/enemy_spaceship.js'
import {Spaceship} from './models/spaceship.js'
import {texture} from './constants.js';
import {count_seconds} from './helpers.js';

// Initializing keyboard listeners
let kb = new Keyboard()
kb.watch();

// Initializing background
const tilingSprite = new PIXI.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height,
);

// Kill count text
let kill_count = new PIXI.Text('Enemies killed: 0',{fontFamily : 'Arial', fontSize: 18, fill : 0xffffff, align : 'center'});

// Adding background and first character to stage
app.stage.addChild(tilingSprite);
app.stage.addChild(new Spaceship(app));
app.stage.addChild(kill_count);

// Defining variables
let current_seconds = -1;
let now = new Date().getTime();

// Game life cycle 
app.ticker.add((delta) => {
    tilingSprite.tilePosition.x -= 5; // Scrolling background

    // Updating game elements
    app.stage.children.forEach(child => {
        if(child instanceof Spaceship || child instanceof SpaceshipLaser || child instanceof EnemySpaceShip)
            child.update(delta,app,kb,kill_count);
    });

    // Adding ennemies ever 2 seconds
    let seconds = count_seconds(now);
    if(seconds & 1 == 1 && (seconds != current_seconds)){
        app.stage.addChild(new EnemySpaceShip(app))
        current_seconds = seconds;
    }
});

