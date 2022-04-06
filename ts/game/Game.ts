import Display from '../Display.js'
import Engine from '../Engine.js'
import { StateStack } from '../state/StateStack.js'
import StartScreenState from '../state/StartScreenState.js'

function Game() {
  const gameMode = new StateStack()

  function update() {
    gameMode.update()
  }

  function render() {
    gameMode.render()
    display.render()
  }

  const engine = new Engine({
    frameRate: 30,
    update,
    render,
  })

  const display = new Display(
    document.querySelector('canvas') as HTMLCanvasElement
  )

  function resize() {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      9 / 16
    )
    display.render()
  }

  function start() {
    resize()
    gameMode.push(StartScreenState(display, gameMode))
    engine.start()
    window.addEventListener('resize', resize)
  }

  return { start }
}

export default Game
