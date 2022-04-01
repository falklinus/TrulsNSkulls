class Display {
    constructor(canvas) {
        this.buffer = document
            .createElement('canvas')
            .getContext('2d');
        this.context = canvas.getContext('2d');
    }
    drawObject({ color, source, destination, width, height, }) {
        if (source) {
            this.buffer.drawImage(source.image, source.x, source.y, width, height, destination.x, destination.y, width, height);
        }
        else if (color) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(destination.x, destination.y, width, height);
        }
    }
    resize(width, height, heightWidthRatio) {
        if (height / width > heightWidthRatio) {
            this.context.canvas.height = width * heightWidthRatio;
            this.context.canvas.width = width;
        }
        else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / heightWidthRatio;
        }
        this.buffer.canvas.height = this.context.canvas.height;
        this.buffer.canvas.width = this.context.canvas.width;
        this.context.imageSmoothingEnabled = false;
    }
    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
}
export default Display;
