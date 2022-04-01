class GameObject {
    constructor({ x, y, width, height, }) {
        this.getLeft = () => this.x;
        this.getRight = () => this.x + this.width;
        this.getTop = () => this.y;
        this.getCenterX = () => this.x + this.width * 0.5;
        this.getBottom = () => this.y + this.height;
        this.getCenterY = () => this.y + this.height * 0.5;
        this.setLeft = (x) => {
            this.x = x;
        };
        this.setRight = (x) => {
            this.x = x - this.width;
        };
        this.setCenterX = (x) => {
            this.x = x - this.width * 0.5;
        };
        this.setTop = (y) => {
            this.y = y;
        };
        this.setBottom = (y) => {
            this.y = y - this.height;
        };
        this.setCenterY = (y) => {
            this.y = y - this.height * 0.5;
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    moveLeft(speed = 1) {
        this.x += speed;
    }
    moveRight(speed = 1) {
        this.x -= speed;
    }
    moveUp(speed = 1) {
        this.y += speed;
    }
    moveDown(speed = 1) {
        this.y -= speed;
    }
}
export default GameObject;
