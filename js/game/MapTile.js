import collisionMapData from './data/collisionMap.js';
import CollisionManager from './CollisionManager.js';
class MapTile {
    constructor({ index, background, foreground, position, }) {
        this.index = index;
        this.background = background;
        this.foreground = foreground;
        this.position = position;
        this.collisionManager = new CollisionManager({
            data: collisionMapData.data,
            tiles: {
                width: collisionMapData.tileSize.width,
                height: collisionMapData.tileSize.height,
                cols: collisionMapData.width,
                rows: collisionMapData.height,
            },
            offset: {
                x: this.position.x,
                y: this.position.y,
            },
        });
    }
}
export default MapTile;
