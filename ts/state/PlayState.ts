import Controller from '../Controller.js'
import Display from '../Display.js'
import World from '../game/World.js'
import Menu from '../game/menu.js'
import { StateStack } from './StateStack.js'

function PlayState(display: Display, gameStack: StateStack) {
  const name = 'PlayState'
  const controller = Controller()
  const world = new World()
  let running = true

  function keyDownUp(event: KeyboardEvent) {
    controller.keyDownUp(event.type, event.key)
  }

  function movePlayer() {
    let playerDirection = controller.direction()

    world.movePlayer({
      direction: playerDirection,
      moveFast: controller.shift.active,
    })
  }

  function onEnter() {
    Menu(gameStack)
    window.addEventListener('keydown', keyDownUp)
    window.addEventListener('keyup', keyDownUp)
  }

  function onExit() {
    window.removeEventListener('keydown', keyDownUp)
    window.removeEventListener('keyup', keyDownUp)
  }

  function update() {
    if (!running) return
    if (world.player.moving && world.isEncounter()) console.log('ENCOUNTER')
    movePlayer()
  }

  function render() {
    // Background
    display.drawObject({
      source: {
        image: world.background,
        x: 0,
        y: 0,
      },
      destination: {
        x:
          display.buffer.canvas.width / 2 -
          world.width / 2 -
          world.player.getLeft(),
        y:
          display.buffer.canvas.height / 2 -
          world.height / 2 -
          world.player.getTop(),
      },
      width: world.width,
      height: world.height,
    })

    // BattleZones
    for (let battleObject of world.collisionManager.battleObjects) {
      display.drawObject({
        color: 'rgba(255, 0, 255, 0.5)',
        destination: {
          x:
            display.buffer.canvas.width / 2 -
            world.player.getLeft() +
            battleObject.x -
            world.player.width / 2,
          y:
            display.buffer.canvas.height / 2 -
            world.player.getTop() +
            battleObject.y -
            world.player.height / 2,
        },
        width: battleObject.width,
        height: battleObject.height,
      })
    }

    const playerShadow = new Image()
    playerShadow.src = '../assets/player/playerShadow.png'

    // Player shadow
    display.drawObject({
      source: {
        image: playerShadow,
        x: 0,
        y: 0,
      },
      width: world.player.width,
      height: world.player.height,
      destination: {
        x: display.context.canvas.width / 2 - world.player.width / 2,
        y:
          display.context.canvas.height / 2 +
          world.player.height / 2 -
          playerShadow.height / 2 -
          6,
      },
    })

    // Player battle collisionbox
    display.drawObject({
      color: 'rgba(0, 0, 255, 0.5)',
      width: 36,
      height: 36,
      destination: {
        x: display.context.canvas.width / 2 - 18,
        y: display.context.canvas.height / 2 + 12,
      },
    })

    // Player
    display.drawObject({
      source: {
        image: world.player.sprite.image,
        ...world.player.sprite.position,
      },
      width: world.player.width,
      height: world.player.height,
      destination: {
        x: display.context.canvas.width / 2 - world.player.width / 2,
        y: display.context.canvas.height / 2 - world.player.height / 2,
      },
    })

    // Foreground
    display.drawObject({
      source: {
        image: world.foreground,
        x: 0,
        y: 0,
      },
      destination: {
        x:
          display.buffer.canvas.width / 2 -
          world.width / 2 -
          world.player.getLeft(),
        y:
          display.buffer.canvas.height / 2 -
          world.height / 2 -
          world.player.getTop(),
      },
      width: world.width,
      height: world.height,
    })

    // Collisionboxes
    for (let collisionObject of world.collisionManager.normal) {
      display.drawObject({
        color: 'rgba(255, 0, 0, 0.2)',
        destination: {
          x:
            display.buffer.canvas.width / 2 -
            world.player.getLeft() +
            collisionObject.x -
            world.player.width / 2,
          y:
            display.buffer.canvas.height / 2 -
            world.player.getTop() +
            collisionObject.y -
            world.player.height / 2,
        },
        width: collisionObject.width,
        height: collisionObject.height,
      })
    }
  }

  function onPause() {
    running = false
  }
  function onResume() {
    running = true
  }

  return {
    name,
    onEnter,
    onExit,
    update,
    render,
    onPause,
    onResume,
  }
}

export default PlayState
