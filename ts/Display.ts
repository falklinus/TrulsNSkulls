class Display {
  buffer: CanvasRenderingContext2D
  context: CanvasRenderingContext2D
  constructor(canvas: HTMLCanvasElement) {
    this.buffer = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  drawObject({
    color,
    source,
    destination,
    width = this.buffer.canvas.width,
    height = this.buffer.canvas.height,
  }: {
    color?: string
    source?: { image: HTMLImageElement; x: number; y: number }
    destination: { x: number; y: number /* ; width: number; height: number */ }
    width?: number
    height?: number
  }) {
    if (source) {
      this.buffer.drawImage(
        source.image,
        source.x,
        source.y,
        width,
        height,
        destination.x,
        destination.y,
        width,
        height
      )
    } else if (color) {
      this.buffer.fillStyle = color
      this.buffer.fillRect(destination.x, destination.y, width, height)
    }
  }

  drawText({
    text,
    font,
    color = 'black',
    destination,
  }: {
    text: string
    font: string
    color: string
    destination: { x: number; y: number }
  }) {
    this.buffer.fillStyle = color
    this.buffer.font = font
    this.buffer.textAlign = 'center'
    this.buffer.fillText(text, destination.x, destination.y)
  }

  resize(width: number, height: number, heightWidthRatio: number) {
    if (height / width > heightWidthRatio) {
      this.context.canvas.height = width * heightWidthRatio
      this.context.canvas.width = width
    } else {
      this.context.canvas.height = height
      this.context.canvas.width = height / heightWidthRatio
    }

    this.buffer.canvas.height = this.context.canvas.height
    this.buffer.canvas.width = this.context.canvas.width

    this.context.imageSmoothingEnabled = false
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
  }
}

export default Display
