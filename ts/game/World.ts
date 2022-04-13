import Player from './Player.js'
import collisionMapData from './data/collisionMap.js'
import GameObject from './GameObject.js'
import CollisionManager from './CollisionManager.js'
import Map from './Map.js'

class World {
  player = new Player({ x: 0, y: 0 })
  map = new Map({ index: 0, playerPosition: { x: 0, y: 0 } })
  collisionManager: CollisionManager

  constructor() {
    this.collisionManager = new CollisionManager({
      data: collisionMapData.data,
      tiles: {
        width: collisionMapData.tileSize.width,
        height: collisionMapData.tileSize.height,
        cols: collisionMapData.width,
        rows: collisionMapData.height,
      },
      offset: {
        x: this.map.activeTile.position.width / 2 - this.player.width / 2,
        y: this.map.activeTile.position.height / 2 - this.player.height / 2,
      },
    })

    this.update()
  }

  update() {
    const mapIndex = this.map.tiles.findIndex((tile) =>
      this.collisionManager.allSidesCollision(tile.position, this.player, {
        isPlayer: false,
      })
    )

    if (mapIndex === -1) return

    if (mapIndex !== this.map.activeIndex) {
      this.map.activeIndex = mapIndex
    }

    const playerPosition = {
      x: this.player.x < this.map.activeTile.position.getCenterX() ? 0 : 1,
      y: this.player.y < this.map.activeTile.position.getCenterY() ? 0 : 1,
    }

    if (this.map.positionChanged(playerPosition)) {
      this.map.update(playerPosition)
    }
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
