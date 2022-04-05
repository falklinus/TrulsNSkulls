class World {
  background = new Image()
  foreground = new Image()
  x = 0
  y = 0
  width: number
  height: number
  // width = 0
  // height = 0

  constructor() {
    // this.image.src = '../assets/world/level_0.png'
    // this.background.src = '../assets/pokemon/Pellet Town.png'
    this.background.src = '../assets/world/background.png'
    this.foreground.src = '../assets/world/foreground.png'

    this.width = this.background.width
    this.height = this.background.height
    this.background.onload = () => {}
  }
}

export default World
