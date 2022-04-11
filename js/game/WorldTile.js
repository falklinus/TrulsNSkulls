class WorldTile {
    constructor(index, world) {
        this.index = index;
        this.world = world;
        this.position = world.tiles[index].position;
        this.src = world.tiles[index].src;
    }
    onfirstColumn() {
        return this.index % this.world.cols === 0;
    }
    onlastColumn() {
        return this.index % this.world.cols === this.world.cols - 1;
    }
    onfirstRow() {
        return Math.floor(this.index / this.world.cols) === 0;
    }
    onlastRow() {
        return Math.floor(this.index / this.world.cols) === this.world.rows - 1;
    }
    left() {
        return this.world.tiles[this.index - 1];
    }
    right() {
        return this.world.tiles[this.index + 1];
    }
    top() {
        return this.world.tiles[this.index - this.world.cols];
    }
    bottom() {
        return this.world.tiles[this.index + this.world.cols];
    }
    topLeft() {
        return this.world.tiles[this.index - this.world.cols - 1];
    }
    topRight() {
        return this.world.tiles[this.index - this.world.cols + 1];
    }
    bottomLeft() {
        return this.world.tiles[this.index + this.world.cols - 1];
    }
    bottomRight() {
        return this.world.tiles[this.index + this.world.cols + 1];
    }
}
export default WorldTile;
