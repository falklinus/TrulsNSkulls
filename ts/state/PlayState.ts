import Controller from '../Controller.js'
import Display from '../Display.js'
import World from '../game/World.js'
import Menu from '../game/menu.js'
import { StateStack } from './StateStack.js'
import FadeState from './FadeState.js'
import BattleState from './BattleState.js'

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
    world.update()
    if (!running) return
    if (world.player.moving && world.isEncounter()) {
      console.log('ENCOUNTER')
      gameStack.push(
        FadeState({
          color: { r: 0, g: 0, b: 0 },
          direction: 'out',
          duration: 200,
          repeat: 9,
          display,
          gameStack,
          toState: FadeState({
            color: { r: 0, g: 0, b: 0 },
            direction: 'in',
            duration: 1000,
            repeat: 1,
            display,
            gameStack,
            toState: BattleState({ display }),
          }),
        })
      )
    }
    movePlayer()
  }

  function render() {
    // Background
    for (let background of world.map.backgrounds) {
      display.drawObject({
        source: {
          image: background.image,
          x: 0,
          y: 0,
        },
        destination: {
          x: -world.player.getCenterX() + background.position.x,
          y: -world.player.getCenterY() + background.position.y,
          offset: {
            x: 0.5,
            y: 0.5,
          },
        },

        width: background.image.width,
        height: background.image.height,
      })
    }

    // BattleZones
    // for (let battleObject of world.map.activeTile.collisionManager
    //   .battleObjects) {
    //   display.drawObject({
    //     color: 'rgba(255, 0, 255, 0.5)',
    //     destination: {
    //       x: -(world.player.getCenterX() - battleObject.x),
    //       y: -(world.player.getCenterY() - battleObject.y),
    //       offset: {
    //         x: 0.5,
    //         y: 0.5,
    //       },
    //     },
    //     width: battleObject.width,
    //     height: battleObject.height,
    //   })
    // }

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
        x: -(world.player.width / 2),
        y: world.player.height / 2 - playerShadow.height / 2 - 6,
        offset: {
          x: 0.5,
          y: 0.5,
        },
      },
    })

    // Player battle collisionbox
    // display.drawObject({
    //   color: 'rgba(0, 0, 255, 0.5)',
    //   width: 36,
    //   height: 36,
    //   destination: {
    //     x: -18,
    //     y: 12,
    //     offset: {
    //       x: 0.5,
    //       y: 0.5,
    //     },
    //   },
    // })

    // Player
    // console.log(world.player.width)
    display.drawObject({
      source: {
        image: world.player.sprite.image,
        ...world.player.sprite.position,
      },
      width: world.player.width,
      height: world.player.height,
      destination: {
        x: -(world.player.width / 2),
        y: -(world.player.height / 2),
        offset: {
          x: 0.5,
          y: 0.5,
        },
      },
    })

    // Foreground
    for (let foreground of world.map.foregrounds) {
      display.drawObject({
        source: {
          image: foreground.image,
          x: 0,
          y: 0,
        },
        destination: {
          x: -world.player.getCenterX() + foreground.position.x,
          y: -world.player.getCenterY() + foreground.position.y,
          offset: {
            x: 0.5,
            y: 0.5,
          },
        },
        width: foreground.image.width,
        height: foreground.image.height,
      })
    }

    // Collisionboxes
    // for (let collisionObject of world.map.activeTile.collisionManager.normal) {
    //   display.drawObject({
    //     color: 'rgba(255, 0, 0, 0.2)',
    //     destination: {
    //       x: -(world.player.getCenterX() - collisionObject.x),
    //       y: -(world.player.getCenterY() - collisionObject.y),
    //       offset: {
    //         x: 0.5,
    //         y: 0.5,
    //       },
    //     },
    //     width: collisionObject.width,
    //     height: collisionObject.height,
    //   })
    // }
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
