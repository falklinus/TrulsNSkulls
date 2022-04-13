import GameObject from './GameObject.js'

class MapTile {
  index: number
  background: string
  foreground: string
  position: GameObject
  constructor({
    index,
    background,
    foreground,
    position,
  }: {
    index: number
    background: string
    foreground: string
    position: GameObject
  }) {
    this.index = index
    this.background = background
    this.foreground = foreground
    this.position = position
  }
}

export default MapTile
