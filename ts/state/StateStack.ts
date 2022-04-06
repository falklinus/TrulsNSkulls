export type State = {
  name: string
  update: () => void
  render: () => void
  onEnter: () => void
  onExit: () => void

  // Optional but useful
  onPause?: () => void
  onResume?: () => void
}

const EmptyState: State = {
  name: 'EmptyState',
  update: () => {},
  render: () => {},
  onEnter: () => {},
  onExit: () => {},
}

class StateList {
  states: State[] = []

  pop = () => this.states.pop()
  push = (state: State) => this.states.push(state)
  top = () => this.states[this.states.length - 1]
}

export class StateStack {
  states: StateList = new StateList()

  constructor() {
    this.states.push(EmptyState)
  }

  update() {
    const state = this.states.top()
    state.update()
  }

  render() {
    const state = this.states.top()
    state.render()
  }

  push(state: State) {
    console.log('PUSH', state.name)
    this.states.push(state)
    state.onEnter()
  }

  pop() {
    const state = this.states.top()
    console.log('POP', state.name)
    state.onExit()
    return this.states.pop()
  }

  pause() {
    const state = this.states.top()
    console.log('PAUSE', state.name)
    if (state.onPause) state.onPause()
  }

  resume() {
    const state = this.states.top()
    console.log('RESUME', state.name)
    if (state.onResume) state.onResume()
  }
}
