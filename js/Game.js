import Player from './Player.js';
import World from './World.js';
class Game {
    constructor() {
        this.world = new World();
        this.player = new Player({ x: 0, y: 0 });
    }
}
export default Game;
