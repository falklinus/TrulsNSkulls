class GameObject {
  x: number
  y: number
  width: number
  height: number
  moving = false

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number
    y: number
    width: number
    height: number
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  getLeft = () => this.x
  getRight = () => this.x + this.width
  getTop = () => this.y
  getCenterX = () => this.x + this.width * 0.5
  getBottom = () => this.y + this.height
  getCenterY = () => this.y + this.height * 0.5

  setLeft = (x: number) => {
    this.x = x
  }
  setRight = (x: number) => {
    this.x = x - this.width
  }
  setCenterX = (x: number) => {
    this.x = x - this.width * 0.5
  }
  setTop = (y: number) => {
    this.y = y
  }
  setBottom = (y: number) => {
    this.y = y - this.height
  }
  setCenterY = (y: number) => {
    this.y = y - this.height * 0.5
  }

  moveLeft(speed: number = 1) {
    this.moving = speed > 0
    this.x -= speed
  }

  moveRight(speed: number = 1) {
    this.moving = speed > 0
    this.x += speed
  }

  moveUp(speed: number = 1) {
    this.moving = speed > 0
    this.y -= speed
  }

  moveDown(speed: number = 1) {
    this.moving = speed > 0
    this.y += speed
  }
}

export default GameObject
