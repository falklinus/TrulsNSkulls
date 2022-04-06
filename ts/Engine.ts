class Engine {
  frameRate: number
  update: Function
  render: Function
  frameId = 0
  time = window.performance.now()
  timeBuffer = 0
  updated = false
  running = false

  constructor({
    frameRate = 30,
    update,
    render,
  }: {
    frameRate: number
    update: Function
    render: Function
  }) {
    this.frameRate = frameRate
    this.update = update
    this.render = render
  }

  pause() {
    this.running = false
  }

  resume() {
    this.running = true
  }

  start() {
    this.running = true
    this.run(this.time)
  }

  stop() {
    window.cancelAnimationFrame(this.frameId)
  }

  run(currentTime: number) {
    this.frameId = window.requestAnimationFrame(this.handleRun)
    this.timeBuffer += currentTime - this.time
    this.time = currentTime

    if (this.timeBuffer >= (3 * 1000) / this.frameRate) {
      this.timeBuffer = 1000 / this.frameRate
    }

    while (this.timeBuffer >= 1000 / this.frameRate) {
      this.timeBuffer -= 1000 / this.frameRate
      this.update()
      this.updated = true
    }

    if (this.updated) {
      this.updated = false
      this.render()
    }
  }

  handleRun = (currentTime: number) => {
    this.run(currentTime)
  }
}

export default Engine
