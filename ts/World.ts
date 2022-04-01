class World {
  image = new Image()

  width = 0
  height = 0

  constructor() {
    this.image.src = '../assets/world/level_0.png'

    this.image.onload = () => {
      this.width = this.image.width
      this.height = this.image.height
    }
  }
}

export default World
