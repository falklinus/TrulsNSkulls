import Display from '../Display.js'
import { StateStack, State } from './StateStack.js'

function FadeState({
  color,
  direction,
  duration,
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
  display: Display
  gameStack: StateStack
  toState: State
}) {
  const name = 'FadeState'
  let opacity = direction == 'in' ? 1 : 0

  const renderColor = () => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
  }

  let intervalId: number
  let timeOutId: number

  function onEnter() {
    intervalId = setInterval(() => {
      if (direction == 'in') opacity -= 0.01
      if (direction == 'out') opacity += 0.01
    }, duration / 100)
    timeOutId = setTimeout(() => {
      gameStack.pop()
      gameStack.push(toState)
    }, duration)
  }
  function onExit() {
    clearInterval(intervalId)
    clearTimeout(timeOutId)
  }
  function update() {}
  function render() {
    toState.render()
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
