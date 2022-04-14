import Display from '../Display.js'
import { StateStack, State } from './StateStack.js'

function FadeState({
  color,
  direction,
  duration,
  repeat,
  display,
  gameStack,
  toState,
}: {
  color: {
    r: number
    g: number
    b: number
  }
  direction: string
  duration: number
  repeat: number
  display: Display
  gameStack: StateStack
  toState: State
}) {
  const name = 'FadeState'

  let opacity = direction == 'in' ? 1 : 0
  let fadeDirection = direction
  let start: number
  let count = 0
  const fadeDuration = (gameStack.frameRate * duration) / 1000
  const opacityDelta = 1 / ((gameStack.frameRate * duration) / 1000)

  const renderColor = () => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity.toFixed(2)})`
  }

  function onEnter() {
    start = Date.now()
  }

  function onExit() {
    console.log('time', Date.now() - start)
  }
  function update() {
    count++
    if (count >= fadeDuration * repeat) {
      gameStack.pop()
      gameStack.push(toState)
      return
    }
    if (count % Math.ceil(fadeDuration) == 0) {
      fadeDirection = fadeDirection == 'in' ? 'out' : 'in'
    }

    if (fadeDirection == 'in') opacity -= opacityDelta
    if (fadeDirection == 'out') opacity += opacityDelta

    opacity = Math.min(1, Math.max(0, opacity))
  }

  function render() {
    if (direction == 'out')
      gameStack.states.states[gameStack.states.states.length - 2].render()
    if (direction == 'in') {
      toState.render()
    }

    display.drawObject({
      color: renderColor(),
      destination: {
        x: 0,
        y: 0,
        offset: {
          x: 0,
          y: 0,
        },
      },
    })
  }

  return {
    name,
    onEnter,
    onExit,
    update,
    render,
  }
}

export default FadeState
