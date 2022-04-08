class Display {
    constructor(canvas) {
        this.scale_x = 1;
        this.scale_y = 1;
        this.canvas = canvas;
        this.buffer = document
            .createElement('canvas')
            .getContext('2d');
        this.context = canvas.getContext('2d');
    }
    drawObject({ color, source, destination, width = this.buffer.canvas.width / this.scale_x, height = this.buffer.canvas.height / this.scale_y, }) {
        if (source) {
            this.buffer.drawImage(source.image, source.x, source.y, width, height, destination.x * this.scale_x +
                destination.offset.x * this.buffer.canvas.width, destination.y * this.scale_y +
                destination.offset.y * this.buffer.canvas.height, width * this.scale_x, height * this.scale_y);
        }
        else if (color) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(destination.x * this.scale_x +
                destination.offset.x * this.buffer.canvas.width, destination.y * this.scale_y +
                destination.offset.y * this.buffer.canvas.height, width * this.scale_x, height * this.scale_y);
        }
    }
    drawText({ text, font, color = 'black', destination, }) {
        this.buffer.fillStyle = color;
        this.buffer.font = font;
        this.buffer.textAlign = 'center';
        this.buffer.fillText(text, destination.x, destination.y);
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
        this.scale_x = this.buffer.canvas.width / 1920;
        this.scale_y = this.buffer.canvas.height / 1080;
        this.context.imageSmoothingEnabled = false;
    }
    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
}
export default Display;
