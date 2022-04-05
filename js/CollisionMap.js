import GameObject from './GameObject.js';
class CollisionMap {
    constructor(map) {
        this.map = map.data;
        this.symbol = map.symbol;
        this.width = map.width;
        this.height = map.height;
        this.collisionObjects = this.mapCollisionObjects({
            tileSize: map.tileSize,
            data: map.data,
            symbol: map.symbol,
            width: map.width,
            height: map.height,
        });
    }
    mapCollisionObjects({ tileSize, data, symbol, width, height, }) {
        const collisionObjects = [];
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (data[index] === symbol) {
                    collisionObjects.push(new GameObject({
                        x: x * tileSize.height,
                        y: y * tileSize.height,
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
export default CollisionMap;
