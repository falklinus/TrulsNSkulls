import GameObject from './GameObject'

class WorldTile {
  world: {
    cols: number
    rows: number
    tiles: {
      src: {
        background: string
        foreground: string
      }
      position: GameObject
    }[]
  }
  index: number
  position: GameObject
  src: { background: string; foreground: string }
  constructor(
    index: number,
    world: {
      cols: number
      rows: number
      tiles: {
        src: {
          background: string
          foreground: string
        }
        position: GameObject
      }[]
    }
  ) {
    this.index = index
    this.world = world
    this.position = world.tiles[index].position
    this.src = world.tiles[index].src
  }

  onfirstColumn() {
    return this.index % this.world.cols === 0
  }
  onlastColumn() {
    return this.index % this.world.cols === this.world.cols - 1
  }
  onfirstRow() {
    return Math.floor(this.index / this.world.cols) === 0
  }
  onlastRow() {
    return Math.floor(this.index / this.world.cols) === this.world.rows - 1
  }
  left() {
    return this.world.tiles[this.index - 1] as WorldTile
  }
  right() {
    return this.world.tiles[this.index + 1] as WorldTile
  }
  top() {
    return this.world.tiles[this.index - this.world.cols] as WorldTile
  }
  bottom() {
    return this.world.tiles[this.index + this.world.cols] as WorldTile
  }
  topLeft() {
    return this.world.tiles[this.index - this.world.cols - 1] as WorldTile
  }
  topRight() {
    return this.world.tiles[this.index - this.world.cols + 1] as WorldTile
  }
  bottomLeft() {
    return this.world.tiles[this.index + this.world.cols - 1] as WorldTile
  }
  bottomRight() {
    return this.world.tiles[this.index + this.world.cols + 1] as WorldTile
  }
}

export default WorldTile
