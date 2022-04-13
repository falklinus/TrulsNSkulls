import mapData from './data/worldData.js';
import GameObject from './GameObject.js';
import MapTile from './MapTile.js';
class Map {
    constructor({ index, playerPosition, }) {
        this.backgrounds = [];
        this.foregrounds = [];
        this.tiles = mapData.tiles.map((mapTile, index) => new MapTile(Object.assign(Object.assign({ index }, mapTile), { position: new GameObject({
                x: (index % mapData.cols) * 3600,
                y: Math.floor(index / mapData.cols) * 3600,
                width: 3600,
                height: 3600,
            }) })));
        this.activeIndex = index;
        this.playerPosition = playerPosition;
        this.update(playerPosition);
    }
    get activeTile() {
        return this.tiles[this.activeIndex];
    }
    positionChanged(playerPosition) {
        return (this.playerPosition.x !== playerPosition.x ||
            this.playerPosition.y !== playerPosition.y);
    }
    positionIn(tile) {
        const bgIndex = this.backgrounds.findIndex((bg) => bg.position == tile.position);
        const fgIndex = this.foregrounds.findIndex((fg) => fg.position == tile.position);
        if (bgIndex === -1 && fgIndex === -1)
            return false;
        return {
            bgIndex,
            fgIndex,
        };
    }
    update(playerPosition) {
        this.playerPosition = playerPosition;
        const { x, y } = playerPosition;
        const newTiles = [];
        let backgrounds = [];
        let foregrounds = [];
        console.log(playerPosition);
        console.log(this.activeTile);
        const shouldBePushed = () => {
            let res = [this.activeTile];
            if (x == 0 && y == 0) {
                if (!this.onFirstColumn()) {
                    res.push(this.left());
                    res.push(this.topLeft());
                }
                res.push(this.top());
            }
            else if (x == 1 && y == 0) {
                if (!this.onLastColumn()) {
                    res.push(this.right());
                    res.push(this.topRight());
                }
                res.push(this.top());
            }
            else if (x == 0 && y == 1) {
                if (!this.onFirstColumn()) {
                    res.push(this.left());
                    res.push(this.bottomLeft());
                }
                res.push(this.bottom());
            }
            else if (x == 1 && y == 1) {
                if (!this.onLastColumn()) {
                    res.push(this.right());
                    res.push(this.bottomRight());
                }
                res.push(this.bottom());
            }
            res = res.filter((tile) => tile);
            return res;
        };
        shouldBePushed().forEach((tile) => {
            console.log('tile', tile);
            const index = this.positionIn(tile);
            if (!index)
                newTiles.push(tile);
            else {
                backgrounds.push(...this.backgrounds.splice(index.bgIndex, 1));
                foregrounds.push(...this.foregrounds.splice(index.fgIndex, 1));
            }
        });
        console.log('newTiles', newTiles);
        for (let tile of newTiles) {
            const background = new Image();
            background.src = tile.background;
            backgrounds.push({ image: background, position: tile.position });
            const foreground = new Image();
            foreground.src = tile.foreground;
            foregrounds.push({ image: foreground, position: tile.position });
        }
        console.log('backgrounds', backgrounds);
        this.backgrounds = backgrounds;
        this.foregrounds = foregrounds;
    }
    onFirstColumn() {
        return this.activeIndex % mapData.cols === 0;
    }
    onLastColumn() {
        return this.activeIndex % mapData.cols === mapData.cols - 1;
    }
    onFirstRow() {
        return Math.floor(this.activeIndex / mapData.cols) === 0;
    }
    onlastRow() {
        return Math.floor(this.activeIndex / mapData.cols) === mapData.rows - 1;
    }
    left() {
        return this.tiles[this.activeIndex - 1];
    }
    right() {
        return this.tiles[this.activeIndex + 1];
    }
    top() {
        return this.tiles[this.activeIndex - mapData.cols];
    }
    bottom() {
        return this.tiles[this.activeIndex + mapData.cols];
    }
    topLeft() {
        return this.tiles[this.activeIndex - mapData.cols - 1];
    }
    topRight() {
        return this.tiles[this.activeIndex - mapData.cols + 1];
    }
    bottomLeft() {
        return this.tiles[this.activeIndex + mapData.cols - 1];
    }
    bottomRight() {
        return this.tiles[this.activeIndex + mapData.cols + 1];
    }
}
export default Map;
