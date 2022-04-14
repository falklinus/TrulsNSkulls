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

  const renderColor = () => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
  }

  let intervalId: number
  let timeOutId: number
  let start = Date.now()
  let frameId: number

  function onEnter() {
    // console.log(duration / 100, repeat * duration)
    let now = performance.now()
    let count = 0
    let fadeDirection = direction == 'in' ? 'out' : 'in'

    const fade = (time: number) => {
      const elapsed = time - now
      // console.log(elapsed)
      if (elapsed > 40 || count == 0) {
        count++
        if (fadeDirection == 'in') opacity += 40 / duration
        if (fadeDirection == 'out') opacity -= 40 / duration
        now = time
        console.log(count)
        if (count % (duration / 40) == 0)
          fadeDirection = fadeDirection == 'in' ? 'out' : 'in'
      }
      if (count == (duration * repeat) / 40) {
        gameStack.pop()
        gameStack.push(toState)
      } else {
        frameId = requestAnimationFrame(fade)
      }
    }

    fade(now)

    // timeOutId = setTimeout(() => {
    //   gameStack.pop()

    //   gameStack.push(toState)
    // }, repeat * duration)
  }

  function onExit() {
    console.log('time', Date.now() - start)
    cancelAnimationFrame(frameId)
    clearInterval(intervalId)
    clearTimeout(timeOutId)
  }
  function update() {}
  function render() {
    if (direction == 'out')
      gameStack.states.states[gameStack.states.states.length - 2].render()
    if (direction == 'in') toState.render()
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
