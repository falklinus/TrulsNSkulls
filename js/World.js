class World {
    constructor() {
        this.background = new Image();
        this.foreground = new Image();
        this.x = 0;
        this.y = 0;
        this.background.src = '../assets/world/background.png';
        this.foreground.src = '../assets/world/foreground.png';
        this.width = this.background.width;
        this.height = this.background.height;
    }
}
export default World;
