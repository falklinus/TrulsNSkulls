import mapData from './data/worldData.js'
import GameObject from './GameObject.js'
import MapTile from './MapTile.js'
import Player from './Player.js'

class Map {
  tiles: MapTile[]
  backgrounds: { image: HTMLImageElement; position: GameObject }[] = []
  foregrounds: { image: HTMLImageElement; position: GameObject }[] = []
  playerPosition: { x: number; y: number }
  activeIndex: number

  constructor({
    index,
    playerPosition,
  }: {
    index: number
    playerPosition: { x: number; y: number }
  }) {
    this.tiles = mapData.tiles.map(
      (mapTile, index) =>
        new MapTile({
          index,
          ...mapTile,
          position: new GameObject({
            x: (index % mapData.cols) * 3600,
            y: Math.floor(index / mapData.cols) * 3600,
            width: 3600,
            height: 3600,
          }),
        })
    )
    this.activeIndex = index
    this.playerPosition = playerPosition
    this.update(playerPosition)
  }

  get activeTile() {
    return this.tiles[this.activeIndex]
  }

  positionChanged(playerPosition: { x: number; y: number }) {
    return (
      this.playerPosition.x !== playerPosition.x ||
      this.playerPosition.y !== playerPosition.y
    )
  }

  update(playerPosition: { x: number; y: number }) {
    this.playerPosition = playerPosition
    const { x, y } = playerPosition
    const renderTiles = []
    console.log(playerPosition)
    renderTiles.push(this.activeTile)

    if (x == 0 && !this.onfirstColumn()) {
      renderTiles.push(this.left())
      if (y == 0 && !this.onfirstRow()) {
        renderTiles.push(this.topLeft())
      } else if (y == 1 && !this.onlastRow()) {
        renderTiles.push(this.bottomLeft())
      }
    } else if (x == 1 && !this.onlastColumn()) {
      renderTiles.push(this.right())
      if (y == 0 && !this.onfirstRow()) {
        renderTiles.push(this.topRight())
      } else if (y == 1 && !this.onlastRow()) {
        renderTiles.push(this.bottomRight())
      }
    }

    if (y == 0 && !this.onfirstRow()) {
      renderTiles.push(this.top())
    } else if (y == 1 && !this.onlastRow()) {
      renderTiles.push(this.bottom())
    }

    console.log(renderTiles)
    const backgrounds = []
    const foregrounds = []

    for (let tile of renderTiles) {
      const background = new Image()
      background.src = tile.background
      backgrounds.push({ image: background, position: tile.position })
      const foreground = new Image()
      foreground.src = tile.foreground
      foregrounds.push({ image: foreground, position: tile.position })
    }

    this.backgrounds = backgrounds
    this.foregrounds = foregrounds
  }

  onfirstColumn() {
    return this.activeIndex % mapData.cols === 0
  }
  onlastColumn() {
    return this.activeIndex % mapData.cols === mapData.cols - 1
  }
  onfirstRow() {
    return Math.floor(this.activeIndex / mapData.cols) === 0
  }
  onlastRow() {
    return Math.floor(this.activeIndex / mapData.cols) === mapData.rows - 1
  }
  left() {
    return this.tiles[this.activeIndex - 1]
  }
  right() {
    return this.tiles[this.activeIndex + 1]
  }
  top() {
    return this.tiles[this.activeIndex - mapData.cols]
  }
  bottom() {
    return this.tiles[this.activeIndex + mapData.cols]
  }
  topLeft() {
    return this.tiles[this.activeIndex - mapData.cols - 1]
  }
  topRight() {
    return this.tiles[this.activeIndex - mapData.cols + 1]
  }
  bottomLeft() {
    return this.tiles[this.activeIndex + mapData.cols - 1]
  }
  bottomRight() {
    return this.tiles[this.activeIndex + mapData.cols + 1]
  }
}

export default Map
