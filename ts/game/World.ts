import Player from './Player.js'
import collisionMapData from './data/collisionMap.js'
import GameObject from './GameObject.js'
import CollisionManager from './CollisionManager.js'
import WorldTile from './WorldTile.js'

class World {
  backgrounds: {
    image: HTMLImageElement
    position: { x: number; y: number }
  }[] = [
    /* { image: new Image(), position: { x: 0, y: 0 } } */
  ]
  foregrounds: {
    image: HTMLImageElement
    position: { x: number; y: number }
  }[] = []
  // background = new Image()
  // foreground = new Image()
  width: number
  height: number
  activeImage = 0
  player = new Player({ x: 5400, y: 5400 })
  collisionManager: CollisionManager
  worldTiles = {
    cols: 3,
    rows: 3,
  }

  world: {
    cols: number
    rows: number
    tiles: {
      src: { background: string; foreground: string }
      position: GameObject
    }[]
  } = {
    cols: 3,
    rows: 3,
    tiles: [
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 0,
          y: 0,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 3600,
          y: 0,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 7200,
          y: 0,
          width: 3600,
          height: 3600,
        }),
      },

      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 0,
          y: 3600,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 3600,
          y: 3600,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 7200,
          y: 3600,
          width: 3600,
          height: 3600,
        }),
      },

      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 0,
          y: 7200,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 3600,
          y: 7200,
          width: 3600,
          height: 3600,
        }),
      },
      {
        src: {
          background: '../assets/world/background.png',
          foreground: '../assets/world/foreground.png',
        },
        position: new GameObject({
          x: 7200,
          y: 7200,
          width: 3600,
          height: 3600,
        }),
      },
    ],
  }

  activeIndex = 4
  activeTile = new WorldTile(4, this.world)
  renderTiles: WorldTile[] = []

  constructor() {
    // this.background.src = '../assets/world/background.png'
    // this.foreground.src = '../assets/world/foreground.png'
    this.setRenderTiles({ innerPosition: { x: 1, y: 1 } })
    for (let worldTile of this.renderTiles) {
      const background = new Image()
      background.src = worldTile.src.background
      this.backgrounds.push({ image: background, position: worldTile.position })
      const foreground = new Image()
      foreground.src = worldTile.src.foreground
      this.foregrounds.push({ image: foreground, position: worldTile.position })
    }

    this.width = this.backgrounds[0].image.width
    this.height = this.backgrounds[0].image.height
    // this.width = this.background.width
    // this.height = this.background.height

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

  setRenderTiles({
    innerPosition: { x, y },
  }: {
    innerPosition: { x: number; y: number }
  }) {
    const activeTile = new WorldTile(this.activeIndex, this.world)
    this.activeTile = activeTile
    const renderTiles = []
    renderTiles.push(activeTile)

    if (x == 0 && !activeTile.onfirstColumn()) {
      renderTiles.push(activeTile.left())
      if (y == 0 && !activeTile.onfirstRow()) {
        renderTiles.push(activeTile.topLeft())
      } else if (y == 1 && !activeTile.onlastRow()) {
        renderTiles.push(activeTile.bottomLeft())
      }
    } else if (x == 1 && !activeTile.onlastColumn()) {
      renderTiles.push(activeTile.right())
      if (y == 0 && !activeTile.onfirstRow()) {
        renderTiles.push(activeTile.topRight())
      } else if (y == 1 && !activeTile.onlastRow()) {
        renderTiles.push(activeTile.bottomRight())
      }
    }

    if (y == 0 && !activeTile.onfirstRow()) {
      renderTiles.push(activeTile.top())
    } else if (y == 1 && !activeTile.onlastRow()) {
      renderTiles.push(activeTile.bottom())
    }

    console.log(renderTiles)
    this.renderTiles = renderTiles
    const backgrounds = []
    const foregrounds = []

    for (let worldTile of renderTiles) {
      const background = new Image()
      background.src = worldTile.src.background
      backgrounds.push({ image: background, position: worldTile.position })
      const foreground = new Image()
      foreground.src = worldTile.src.foreground
      foregrounds.push({ image: foreground, position: worldTile.position })
    }

    this.backgrounds = backgrounds
    this.foregrounds = foregrounds
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
