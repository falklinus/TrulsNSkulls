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
            tileSize: collisionMapData.tileSize,
            data: collisionMapData.data,
            symbol: collisionMapData.symbol,
            width: collisionMapData.width,
            height: collisionMapData.height,
        });
    }
    willCollide({ x, y }) {
        const playerObject = new GameObject({
            x: this.player.x + x,
            y: this.player.y + y,
            width: this.player.width,
            height: this.player.height,
        });
        for (let collisionObject of this.collisionObjects) {
            if (collisionObject.getLeft() < playerObject.getRight() - 6 &&
                collisionObject.getRight() > playerObject.getLeft() + 6 &&
                collisionObject.getTop() < playerObject.getBottom() - 6 &&
                collisionObject.getBottom() > playerObject.getCenterY() + 6) {
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
