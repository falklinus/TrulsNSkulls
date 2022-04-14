const EmptyState = {
    name: 'EmptyState',
    update: () => { },
    render: () => { },
    onEnter: () => { },
    onExit: () => { },
};
class StateList {
    constructor() {
        this.states = [];
        this.pop = () => this.states.pop();
        this.push = (state) => this.states.push(state);
        this.top = () => this.states[this.states.length - 1];
    }
}
export class StateStack {
    constructor({ frameRate = 30 }) {
        this.states = new StateList();
        this.frameRate = frameRate;
        this.states.push(EmptyState);
    }
    update() {
        const state = this.states.top();
        state.update();
    }
    render() {
        const state = this.states.top();
        state.render();
    }
    push(state) {
        console.log('PUSH', state.name);
        this.states.push(state);
        state.onEnter();
    }
    pop() {
        const state = this.states.top();
        console.log('POP', state.name);
        state.onExit();
        return this.states.pop();
    }
    pause() {
        const state = this.states.top();
        console.log('PAUSE', state.name);
        if (state.onPause)
            state.onPause();
    }
    resume() {
        const state = this.states.top();
        console.log('RESUME', state.name);
        if (state.onResume)
            state.onResume();
    }
}
