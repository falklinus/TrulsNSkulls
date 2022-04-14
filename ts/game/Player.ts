import GameObject from './GameObject.js'
import Sprite from './Sprite.js'
import playerSprites from './data/playerSpriteData.js'

class Player extends GameObject {
  speed = {
    fast: 10,
    slow: 5,
  }
  direction = ''
  moving = false

  spriteSet = playerSprites.map((sprite) => {
    const img = new Image()
    img.src = sprite.src
    return {
      name: sprite.name,
      image: img,
      frames: sprite.frames,
    }
  })
  sprite: Sprite = new Sprite({ ...this.spriteSet[0] })

  constructor({ x, y }: { x: number; y: number }) {
    super({
      x,
      y,
      width: 0,
      height: 0,
    })

    this.sprite.image.onload = () => {
      this.width = this.sprite.image.width / this.sprite.frames.cols
      this.height = this.sprite.image.height / this.sprite.frames.rows
    }
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
}

export default Player
