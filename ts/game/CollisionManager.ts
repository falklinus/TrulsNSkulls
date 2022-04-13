import GameObject from './GameObject.js'
import Player from './Player.js'

class CollisionManager {
  normal: GameObject[] = []
  up: GameObject[] = []
  down: GameObject[] = []
  left: GameObject[] = []
  right: GameObject[] = []
  battleObjects: GameObject[] = []

  constructor({
    data,
    tiles: { width, height, cols, rows },
    offset,
  }: {
    data: number[]
    tiles: {
      width: number
      height: number
      cols: number
      rows: number
    }
    offset: {
      x: number
      y: number
    }
  }) {
    this.normal = []

    let index = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        switch (data[index]) {
          case 4096:
            this.normal.push(
              new GameObject({
                x: x * width - offset.x,
                y: y * height - offset.y,
                width: width,
                height: height,
              })
            )
        }
        switch (data[index]) {
          case 300:
            this.battleObjects.push(
              new GameObject({
                x: x * width - offset.x,
                y: y * height - offset.y,
                width: width,
                height: height,
              })
            )
        }
        index++
      }
    }
  }

  isEncounter(
    playerObject: Player,
    {
      encounterRate,
    }: {
      encounterRate: number
    }
  ) {
    for (let battleObject of this.battleObjects) {
      if (
        this.allSidesCollision(playerObject, battleObject, { isPlayer: true })
      ) {
        const battleZone = new GameObject({
          x: battleObject.x,
          y: battleObject.y,
          width: battleObject.width,
          height: battleObject.height,
        })

        let corner = false

        for (let collisionObject of this.normal) {
          const battleZoneRight = new GameObject({
            x: battleObject.x + 1,
            y: battleObject.y,
            width: battleObject.width,
            height: battleObject.height,
          })
          const battleZoneLeft = new GameObject({
            x: battleObject.x - 1,
            y: battleObject.y,
            width: battleObject.width,
            height: battleObject.height,
          })
          const battleZoneUp = new GameObject({
            x: battleObject.x,
            y: battleObject.y - 1,
            width: battleObject.width,
            height: battleObject.height,
          })
          const battleZoneDown = new GameObject({
            x: battleObject.x,
            y: battleObject.y + 1,
            width: battleObject.width,
            height: battleObject.height,
          })

          if (
            this.allSidesCollision(battleZoneRight, collisionObject, {
              isPlayer: false,
            })
          ) {
            battleZone.setRight(battleZone.getCenterX())
            corner = true
          }
          if (
            this.allSidesCollision(battleZoneLeft, collisionObject, {
              isPlayer: false,
            })
          ) {
            battleZone.setLeft(battleZone.getCenterX())
            corner = true
          }
          if (
            this.allSidesCollision(battleZoneUp, collisionObject, {
              isPlayer: false,
            })
          ) {
            battleZone.setTop(battleZone.getCenterY())
            corner = true
          }
          if (
            this.allSidesCollision(battleZoneDown, collisionObject, {
              isPlayer: false,
            })
          ) {
            battleZone.setBottom(battleZone.getCenterY())
            corner = true
          }

          if (corner) break
        }

        const overlappingArea =
          (Math.min(
            playerObject.getCenterX() + battleZone.width / 2,
            battleZone.getRight()
          ) -
            Math.max(
              playerObject.getCenterX() - battleZone.width / 2,
              battleZone.getLeft()
            )) *
          (Math.min(
            playerObject.getCenterY() + (4 * battleZone.height) / 3,
            battleZone.getBottom()
          ) -
            Math.max(
              playerObject.getCenterY() + battleZone.height / 3,
              battleZone.getTop()
            ))
        if (overlappingArea > 0.5 * battleZone.width * battleZone.height)
          return Math.random() < encounterRate
      }
    }
    return false
  }

  allSidesCollision(
    object1: GameObject,
    object2: GameObject,
    { isPlayer = false }: { isPlayer: boolean }
  ) {
    return (
      object2.getLeft() < object1.getRight() - (isPlayer ? 4 : 0) &&
      object2.getRight() > object1.getLeft() + (isPlayer ? 4 : 0) &&
      object2.getTop() < object1.getBottom() - (isPlayer ? 4 : 0) &&
      object2.getBottom() > (isPlayer ? object1.getCenterY() : object1.getTop())
    )
  }

  willCollide(playerObject: GameObject) {
    for (let collisionObject of this.normal) {
      if (
        this.allSidesCollision(playerObject, collisionObject, {
          isPlayer: true,
        })
      )
        return true
    }
    for (let collisionObject of this.up) {
      if (
        collisionObject.getLeft() < playerObject.getRight() - 6 &&
        collisionObject.getRight() > playerObject.getLeft() + 6 &&
        collisionObject.getTop() < playerObject.getBottom() - 6 &&
        collisionObject.getBottom() > playerObject.getCenterY() + 6
      ) {
        return true
      }
    }
    for (let collisionObject of this.down) {
      if (
        collisionObject.getLeft() < playerObject.getRight() - 6 &&
        collisionObject.getRight() > playerObject.getLeft() + 6 &&
        collisionObject.getTop() < playerObject.getBottom() - 6 &&
        collisionObject.getBottom() > playerObject.getCenterY() + 6
      ) {
        return true
      }
    }
    for (let collisionObject of this.left) {
      if (
        collisionObject.getLeft() < playerObject.getRight() - 6 &&
        collisionObject.getRight() > playerObject.getLeft() + 6 &&
        collisionObject.getTop() < playerObject.getBottom() - 6 &&
        collisionObject.getBottom() > playerObject.getCenterY() + 6
      ) {
        return true
      }
    }
    for (let collisionObject of this.right) {
      if (
        collisionObject.getLeft() < playerObject.getRight() - 6 &&
        collisionObject.getRight() > playerObject.getLeft() + 6 &&
        collisionObject.getTop() < playerObject.getBottom() - 6 &&
        collisionObject.getBottom() > playerObject.getCenterY() + 6
      ) {
        return true
      }
    }
    return false
  }
}

export default CollisionManager
