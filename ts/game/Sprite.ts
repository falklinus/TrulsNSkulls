class Sprite {
  name: string
  image: HTMLImageElement
  frames: {
    cols: number
    rows: number
    idle: number
    start: number
    first: number
    last: number
  }
  frameIndex: number
  width: number
  height: number

  constructor({
    name,
    image,
    frames,
  }: {
    name: string
    image: HTMLImageElement
    frames: {
      cols: number
      rows: number
      idle: number
      start: number
      first: number
      last: number
    }
  }) {
    this.name = name
    this.image = image
    this.frames = frames
    this.frameIndex = this.frames.idle
    this.width = this.image.width / this.frames.cols
    this.height = this.image.height / this.frames.rows
  }

  get position() {
    return {
      x: (this.frameIndex % this.frames.cols) * this.width,
      y: Math.floor(this.frameIndex / this.frames.cols) * this.height,
    }
  }

  update({
    name,
    image,
    frames,
  }: {
    name: string
    image: HTMLImageElement
    frames: {
      cols: number
      rows: number
      idle: number
      start: number
      first: number
      last: number
    }
  }) {
    this.name = name
    this.image = image
    this.frames = frames
    this.frameIndex = this.frames.start
    this.width = this.image.width / this.frames.cols
    this.height = this.image.height / this.frames.rows
  }

  elapsed = 0
  animate({ delay }: { delay: number }) {
    this.elapsed++
    while (this.elapsed > delay) {
      this.elapsed -= delay
      if (this.frameIndex >= this.frames.last)
        this.frameIndex = this.frames.first
      else this.frameIndex++
    }
  }

  resetAnimation() {
    this.frameIndex = this.frames.idle
  }
}

export default Sprite
