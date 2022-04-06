class Sprite {
    constructor({ name, image, frames, }) {
        this.elapsed = 0;
        this.name = name;
        this.image = image;
        this.frames = frames;
        this.frameIndex = this.frames.idle;
        this.width = this.image.width / this.frames.cols;
        this.height = this.image.height / this.frames.rows;
    }
    get position() {
        return {
            x: (this.frameIndex % this.frames.cols) * this.width,
            y: Math.floor(this.frameIndex / this.frames.cols) * this.height,
        };
    }
    update({ name, image, frames, }) {
        this.name = name;
        this.image = image;
        this.frames = frames;
        this.frameIndex = this.frames.start;
        this.width = this.image.width / this.frames.cols;
        this.height = this.image.height / this.frames.rows;
    }
    animate({ delay }) {
        this.elapsed++;
        while (this.elapsed > delay) {
            this.elapsed -= delay;
            if (this.frameIndex >= this.frames.last)
                this.frameIndex = this.frames.first;
            else
                this.frameIndex++;
        }
    }
    resetAnimation() {
        this.frameIndex = this.frames.idle;
    }
}
export default Sprite;
