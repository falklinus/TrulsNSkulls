class Controller {
  shift = new KeyboardInput()

  KEY_MAP: Record<string, string> = {
    a: 'left',
    d: 'right',
    w: 'up',
    s: 'down',
  }

  keyBuffer: string[] = []

  keyDownUp(type: string, key: string) {
    const down = type === 'keydown' ? true : false

    const inputKey = key.toLowerCase()

    if (inputKey === 'shift') return this.shift.getInput(down)

    if (!Object.keys(this.KEY_MAP).includes(inputKey)) return

    if (!down)
      return (this.keyBuffer = this.keyBuffer.filter((k) => k !== inputKey))

    if (!this.keyBuffer.includes(inputKey))
      return this.keyBuffer.unshift(inputKey)
  }

  get direction() {
    return this.KEY_MAP[this.keyBuffer[0]]
  }
}

export default Controller

class KeyboardInput {
  active = false
  down = false
  getInput(down: boolean) {
    if (this.down != down) this.active = down
    this.down = down
  }
}
