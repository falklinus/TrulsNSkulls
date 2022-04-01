import GameObject from './GameObject.js'
import Sprite from './Sprite.js'

const MOVE_DATA = [
  // {
  //   name: 'up',
  //   src: '../assets/player/playerUp.png',
  //   frames: {
  //     cols: 2,
  //     rows: 1,
  //     start: 0,
  //     end: 2,
  //     delay: 10,
  //   },
  // },
  {
    name: 'down',
    src: '../assets/pokemon/playerDown.png',
    frames: {
      cols: 4,
      rows: 1,
      idle: 0,
      start: 1,
      first: 0,
      last: 4,
      // delay: 4,
    },
  },
  {
    name: 'left',
    src: '../assets/pokemon/playerLeft.png',
    frames: {
      cols: 4,
      rows: 1,
      idle: 0,
      start: 1,
      first: 0,
      last: 4,
      // delay: 4,
    },
  },
  {
    name: 'right',
    src: '../assets/pokemon/playerRight.png',
    frames: {
      cols: 4,
      rows: 1,
      idle: 1,
      start: 0,
      first: 0,
      last: 4,
      // delay: 4,
    },
  },
  {
    name: 'up',
    src: '../assets/pokemon/playerUp.png',
    frames: {
      cols: 4,
      rows: 1,
      idle: 0,
      start: 1,
      first: 0,
      last: 4,
      // delay: 4,
    },
  },
]

class Player extends GameObject {
  speed = {
    fast: 10,
    slow: 5,
  }
  direction = ''

  spriteSet = this.setSpriteset()
  sprite = new Sprite({ ...this.spriteSet[0] })

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      width: 0,
      height: 0,
    })
    this.width = this.sprite.width
    this.height = this.sprite.height
  }

  resetAnimation() {
    this.sprite.resetAnimation()
  }

  changeDirection(direction: string) {
    if (this.direction === direction) return

    const newSprite = this.spriteSet.find((sprite) => sprite.name === direction)

    if (!newSprite) return

    this.direction = direction
    this.sprite.update({
      ...newSprite,
    })
    this.width = this.sprite.width
    this.height = this.sprite.height
  }

  setSpriteset() {
    return MOVE_DATA.map((sprite) => {
      const img = new Image()
      img.src = sprite.src
      return {
        name: sprite.name,
        image: img,
        frames: sprite.frames,
      }
    })
  }

  move({ direction, moveFast }: { direction: string; moveFast: boolean }) {
    console.log(direction)
    const speed = moveFast ? this.speed.fast : this.speed.slow
    switch (direction) {
      case 'left':
        this.moveLeft(speed)
        break
      case 'right':
        this.moveRight(speed)
        break
      case 'up':
        this.moveUp(speed)
        break
      case 'down':
        this.moveDown(speed)
        break
      default:
        return this.resetAnimation()
    }
    this.changeDirection(direction)
    this.sprite.animate({ delay: 30 / speed })
  }
}

export default Player
