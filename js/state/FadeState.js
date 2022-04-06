function FadeState({ color, direction, duration, display, gameStack, toState, }) {
    const name = 'FadeState';
    let opacity = direction == 'in' ? 1 : 0;
    const renderColor = () => {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    };
    let intervalId;
    let timeOutId;
    function onEnter() {
        intervalId = setInterval(() => {
            if (direction == 'in')
                opacity -= 0.01;
            if (direction == 'out')
                opacity += 0.01;
        }, duration / 100);
        timeOutId = setTimeout(() => {
            gameStack.pop();
            gameStack.push(toState);
        }, duration);
    }
    function onExit() {
        clearInterval(intervalId);
        clearTimeout(timeOutId);
    }
    function update() { }
    function render() {
        toState.render();
        display.drawObject({ color: renderColor(), destination: { x: 0, y: 0 } });
    }
    return {
        name,
        onEnter,
        onExit,
        update,
        render,
    };
}
export default FadeState;
