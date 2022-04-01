import Player from './Player.js'
import World from './World.js'

class Game {
  world = new World()
  player = new Player({ x: 0, y: 0 })
}

export default Game
