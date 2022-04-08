import Player from './Player.js'
import collisionMapData from './data/collisionMap.js'
import GameObject from './GameObject.js'
import CollisionManager from './CollisionManager.js'

class World {
  background = new Image()
  foreground = new Image()
  width: number
  height: number

  player = new Player({ x: 0, y: 1200 })
  collisionManager: CollisionManager

  constructor() {
    this.background.src = '../assets/world/background.png'
    this.foreground.src = '../assets/world/foreground.png'

    this.width = this.background.width
    this.height = this.background.height

    this.collisionManager = new CollisionManager({
      data: collisionMapData.data,
      tiles: {
        width: collisionMapData.tileSize.width,
        height: collisionMapData.tileSize.height,
        cols: collisionMapData.width,
        rows: collisionMapData.height,
      },
      offset: {
        x: this.width / 2 - this.player.width / 2,
        y: this.height / 2 - this.player.height / 2,
      },
    })
  }

  isEncounter() {
    return this.collisionManager.isEncounter(this.player, {
      encounterRate: 1,
    })
  }

  movePlayer({
    direction,
    moveFast,
  }: {
    direction: string
    moveFast: boolean
  }) {
    let speed = moveFast ? this.player.speed.fast : this.player.speed.slow

    this.player.changeDirection(direction)
    this.player.sprite.animate({ delay: 30 / speed })

    const playerObject = new GameObject({
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    })

    switch (direction) {
      case 'left':
        playerObject.setLeft(playerObject.getLeft() - speed)
        while (this.collisionManager.willCollide(playerObject)) {
          playerObject.setLeft(playerObject.getLeft() + 1)
          speed--
        }
        this.player.moveLeft(speed)
        break
      case 'right':
        playerObject.setRight(playerObject.getRight() + speed)
        while (this.collisionManager.willCollide(playerObject)) {
          playerObject.setRight(playerObject.getRight() - 1)
          speed--
        }
        this.player.moveRight(speed)
        break
      case 'up':
        playerObject.setTop(playerObject.getTop() - speed)
        while (this.collisionManager.willCollide(playerObject)) {
          playerObject.setTop(playerObject.getTop() + 1)
          speed--
        }
        this.player.moveUp(speed)
        return speed > 0
      case 'down':
        playerObject.setBottom(playerObject.getBottom() + speed)
        while (this.collisionManager.willCollide(playerObject)) {
          playerObject.setBottom(playerObject.getBottom() - 1)
          speed--
        }
        this.player.moveDown(speed)
        return speed > 0
      default:
        this.player.moving = false
        this.player.resetAnimation()
    }
  }
}

export default World
