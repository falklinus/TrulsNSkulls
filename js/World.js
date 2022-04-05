class World {
    // width = 0
    // height = 0
    constructor() {
        this.background = new Image();
        this.foreground = new Image();
        this.x = 0;
        this.y = 0;
        // this.image.src = '../assets/world/level_0.png'
        // this.background.src = '../assets/pokemon/Pellet Town.png'
        this.background.src = '../assets/world/background.png';
        this.foreground.src = '../assets/world/foreground.png';
        this.width = this.background.width;
        this.height = this.background.height;
        this.background.onload = () => { };
    }
}
export default World;
