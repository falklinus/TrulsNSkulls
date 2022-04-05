import Player from './Player.js';
import World from './World.js';
import collisionMapData from './data/collisionMap.js';
// import CollisionMap from './CollisionMap.js'
import GameObject from './GameObject.js';
class Game {
    constructor() {
        this.world = new World();
        this.player = new Player({ x: 0, y: 0 });
        this.collisionObjects = this.mapCollisionObjects({
            // tileSize: {
            //   width: this.world.width / collisionMapData.width,
            //   height: this.world.height / collisionMapData.height,
            // },
            tileSize: collisionMapData.tileSize,
            data: collisionMapData.data,
            symbol: collisionMapData.symbol,
            width: collisionMapData.width,
            height: collisionMapData.height,
        });
    }
    // collisionMap = new CollisionMap({
    //   ...collisionMapData,
    // })
    // canMove(direction: string) {
    //   switch (direction) {
    //     case 'left':
    //       return !this.willCollide({ x: -1, y: 0 })
    //     case 'right':
    //       return !this.willCollide({ x: 1, y: 0 })
    //     case 'up':
    //       return !this.willCollide({ x: 0, y: -1 })
    //     case 'down':
    //       return !this.willCollide({ x: 0, y: 1 })
    //   }
    // }
    willCollide({ x, y }) {
        const playerObject = new GameObject({
            x: this.player.x + x,
            y: this.player.y + y,
            width: this.player.width,
            height: this.player.height,
        });
        for (let collisionObject of this.collisionObjects) {
            // console.log(collisionObject, playerObject)
            /* if (
              ((playerObject.getRight() >= collisionObject.getLeft() ||
                playerObject.getLeft() <= collisionObject.getRight()) &&
                playerObject.getCenterY() <= collisionObject.getBottom() &&
                playerObject.getCenterY() >= collisionObject.getTop()) ||
              ((playerObject.getBottom() >= collisionObject.getTop() ||
                playerObject.getTop() <= collisionObject.getBottom()) &&
                playerObject.getCenterX() <= collisionObject.getRight() &&
                playerObject.getCenterX() >= collisionObject.getLeft())
            )  */
            if (collisionObject.getLeft() < playerObject.getRight() - 4 &&
                collisionObject.getRight() > playerObject.getLeft() + 4 &&
                collisionObject.getTop() < playerObject.getBottom() - 4 &&
                collisionObject.getBottom() > playerObject.getCenterY()) {
                console.log('player: ', {
                    top: playerObject.getTop(),
                    right: playerObject.getRight(),
                    bottom: playerObject.getBottom(),
                    left: playerObject.getLeft(),
                    centerY: playerObject.getCenterY(),
                    centerX: playerObject.getCenterX(),
                });
                console.log('object: ', {
                    top: collisionObject.getTop(),
                    right: collisionObject.getRight(),
                    bottom: collisionObject.getBottom(),
                    left: collisionObject.getLeft(),
                });
                return true;
            }
        }
        return false;
    }
    mapCollisionObjects({ tileSize, data, symbol, width, height, }) {
        const collisionObjects = [];
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (data[index] === symbol) {
                    collisionObjects.push(new GameObject({
                        x: x * tileSize.width -
                            this.world.width / 2 +
                            (this.player.width - tileSize.width) / 2 +
                            tileSize.width / 2,
                        y: y * tileSize.height -
                            this.world.height / 2 +
                            (this.player.height - tileSize.height) / 2 +
                            tileSize.height / 2,
                        width: tileSize.width,
                        height: tileSize.height,
                    }));
                }
                index++;
            }
        }
        return collisionObjects;
    }
}
export default Game;
