class World {
    constructor() {
        this.image = new Image();
        this.width = 0;
        this.height = 0;
        this.image.src = '../assets/world/level_0.png';
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }
}
export default World;
