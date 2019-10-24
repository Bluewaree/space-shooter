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

// Adding background and first character to stage
app.stage.addChild(tilingSprite);
app.stage.addChild(new Spaceship(app));

// Defining variables
let current_seconds = -1;
let now = new Date().getTime();

