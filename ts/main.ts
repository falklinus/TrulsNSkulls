import Controller from './Controller.js'
import Display from './Display.js'
import Engine from './Engine.js'
import Game from './Game.js'

/*
Get move from controller
*/
function movePlayer() {
  game.player.move({
    direction: controller.direction,
    moveFast: controller.shift.active,
  })
}

/*
Runs before render every game loop
*/
function update() {
  movePlayer()
}

/*
Draw game state to canvas
*/
function render() {
  // Add world to buffer
  display.drawObject({
    source: {
      image: game.world.image,
      x: 0,
      y: 0,
    },
    destination: {
      x:
        display.buffer.canvas.width / 2 -
        game.world.width / 2 +
        game.player.getLeft(),
      y:
        display.buffer.canvas.height / 2 -
        game.world.height / 2 +
        game.player.getTop(),
    },
    width: game.world.image.width,
    height: game.world.image.height,
  })

  // Add player to buffer
  display.drawObject({
    source: {
      image: game.player.sprite.image,
      ...game.player.sprite.position,
    },
    width: game.player.width,
    height: game.player.height,
    destination: {
      x: display.context.canvas.width / 2 - game.player.width / 2,
      y: display.context.canvas.height / 2 - game.player.height / 2,
    },
  })

  // Draw buffer to canvas
  display.render()
}

/*
Pass input to controller
*/
function keyDownUp(event: KeyboardEvent) {
  controller.keyDownUp(event.type, event.key)
}

/*
Redraw canvas based on new size
*/
function resize() {
  display.resize(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    9 / 16
  )
  display.render()
}

/*
Instantiate objects
  cotroller: Handles keyboardinput
  display: Handles rendering of canvas to screen
  engine: Handles game loop
  game: Handles game state including map and player
*/
const controller = new Controller()
const display = new Display(
  document.querySelector('canvas') as HTMLCanvasElement
)
const engine = new Engine({ frameRate: 30, update, render })
const game = new Game()

/*
Load game
*/
function start() {
  // Resize world to fit screen
  resize()
  // Start game loop
  engine.start()
  // Listen for keyboardevents
  window.addEventListener('keydown', keyDownUp)
  window.addEventListener('keyup', keyDownUp)
  // Listen for window resize
  window.addEventListener('resize', resize)
}

start()
