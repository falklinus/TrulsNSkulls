class Engine {
    constructor({ frameRate = 30, update, render, }) {
        this.frameId = 0;
        this.time = window.performance.now();
        this.timeBuffer = 0;
        this.updated = false;
        this.handleRun = (currentTime) => {
            this.run(currentTime);
        };
        this.frameRate = frameRate;
        this.update = update;
        this.render = render;
    }
    start() {
        this.run(this.time);
    }
    stop() {
        window.cancelAnimationFrame(this.frameId);
    }
    run(currentTime) {
        this.frameId = window.requestAnimationFrame(this.handleRun);
        this.timeBuffer += currentTime - this.time;
        this.time = currentTime;
        if (this.timeBuffer >= (3 * 1000) / this.frameRate) {
            this.timeBuffer = 1000 / this.frameRate;
        }
        while (this.timeBuffer >= 1000 / this.frameRate) {
            this.timeBuffer -= 1000 / this.frameRate;
            this.update();
            this.updated = true;
        }
        if (this.updated) {
            this.updated = false;
            this.render();
        }
    }
}
export default Engine;
