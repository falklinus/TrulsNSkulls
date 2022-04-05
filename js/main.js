import Controller from './Controller.js';
import Display from './Display.js';
import Engine from './Engine.js';
import Game from './Game.js';
import createMenu from './menu.js';
/*
Get move from controller
*/
function movePlayer() {
    let playerDirection = controller.direction;
    game.player.changeDirection(playerDirection);
    const wantedMove = game.player.tryMove({
        direction: playerDirection,
        moveFast: controller.shift.active,
    });
    if (game.willCollide(wantedMove))
        playerDirection = '';
    game.player.move({
        direction: playerDirection,
        moveFast: controller.shift.active,
    });
}
/*
Runs before render every game loop
*/
function update() {
    movePlayer();
}
/*
Draw game state to canvas
*/
function render() {
    // Add background to buffer
    display.drawObject({
        source: {
            image: game.world.background,
            x: 0,
            y: 0,
        },
        destination: {
            x: display.buffer.canvas.width / 2 -
                game.world.width / 2 -
                game.player.getLeft(),
            y: display.buffer.canvas.height / 2 -
                game.world.height / 2 -
                game.player.getTop(),
        },
        width: game.world.width,
        height: game.world.height,
    });
    // console.log(game.world)
    // Add player to buffer
    display.drawObject({
        source: Object.assign({ image: game.player.sprite.image }, game.player.sprite.position),
        width: game.player.width,
        height: game.player.height,
        destination: {
            x: display.context.canvas.width / 2 - game.player.width / 2,
            y: display.context.canvas.height / 2 - game.player.height / 2,
        },
    });
    // Player backlight
    // display.drawObject({
    //   color: 'rgba(0, 0, 255, 0.2)',
    //   width: game.player.width,
    //   height: game.player.height,
    //   destination: {
    //     x: display.context.canvas.width / 2 - game.player.width / 2,
    //     y: display.context.canvas.height / 2 - game.player.height / 2,
    //   },
    // })
    // Add foreground to buffer
    display.drawObject({
        source: {
            image: game.world.foreground,
            x: 0,
            y: 0,
        },
        destination: {
            x: display.buffer.canvas.width / 2 -
                game.world.width / 2 -
                game.player.getLeft(),
            y: display.buffer.canvas.height / 2 -
                game.world.height / 2 -
                game.player.getTop(),
        },
        width: game.world.width,
        height: game.world.height,
    });
    // for (let collisionObject of game.collisionObjects) {
    //   display.drawObject({
    //     color: 'rgba(255, 0, 0, 0.5)',
    //     destination: {
    //       x:
    //         display.buffer.canvas.width / 2 -
    //         game.player.getLeft() +
    //         collisionObject.x -
    //         (game.player.width - collisionObject.width) / 2 -
    //         collisionObject.width / 2,
    //       y:
    //         display.buffer.canvas.height / 2 -
    //         game.player.getTop() +
    //         collisionObject.y -
    //         (game.player.height - collisionObject.height) / 2 -
    //         collisionObject.height / 2,
    //     },
    //     width: collisionObject.width,
    //     height: collisionObject.height,
    //   })
    // }
    // Draw buffer to canvas
    display.render();
}
/*
Pass input to controller
*/
function keyDownUp(event) {
    controller.keyDownUp(event.type, event.key);
}
/*
Redraw canvas based on new size
*/
function resize() {
    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, 9 / 16);
    display.render();
}
/*
Instantiate objects
  cotroller: Handles keyboardinput
  display: Handles rendering of canvas to screen
  engine: Handles game loop
  game: Handles game state including map and player
*/
const controller = new Controller();
const display = new Display(document.querySelector('canvas'));
const engine = new Engine({ frameRate: 30, update, render });
const game = new Game();
/*
Load game
*/
function start() {
    // Resize world to fit screen
    resize();
    // Start game loop
    engine.start();
    // Menu
    createMenu(engine);
    // Listen for keyboardevents
    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);
    // Listen for window resize
    window.addEventListener('resize', resize);
}
start();
