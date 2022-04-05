class World {
  background = new Image()
  foreground = new Image()
  x = 0
  y = 0
  width: number
  height: number

  constructor() {
    this.background.src = '../assets/world/background.png'
    this.foreground.src = '../assets/world/foreground.png'

    this.width = this.background.width
    this.height = this.background.height
  }
}

export default World
