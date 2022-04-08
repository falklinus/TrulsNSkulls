import Controller from '../Controller.js';
import FadeState from './FadeState.js';
import PlayState from './PlayState.js';
function StartScreenState(display, gameStack) {
    const name = 'MainMenuState';
    const controller = Controller();
    let colorsArray = [];
    let colorIndex = 0;
    const textColor = () => `rgb(${colorsArray[colorIndex]}, ${colorsArray[colorIndex]}, ${colorsArray[colorIndex]})`;
    function keyDownUp(event) {
        controller.keyDownUp(event.type, event.key);
    }
    function onEnter() {
        let values = [];
        for (let i = 1; i <= 100; i++) {
            values.push(Math.round(Math.sin((Math.PI * i) / 100) * 255));
        }
        colorsArray = values;
        window.addEventListener('keydown', keyDownUp);
    }
    function onExit() {
        window.removeEventListener('keydown', keyDownUp);
    }
    const playState = PlayState(display, gameStack);
    function update() {
        if (controller.enter.active) {
            gameStack.pop();
            gameStack.push(FadeState({
                color: { r: 0, g: 0, b: 0 },
                direction: 'in',
                duration: 2000,
                display,
                gameStack,
                toState: playState,
            }));
        }
        if (colorIndex == colorsArray.length) {
            colorIndex = 0;
        }
        colorIndex++;
    }
    function render() {
        display.drawObject({
            color: 'black',
            destination: {
                x: 0,
                y: 0,
                offset: {
                    x: 0,
                    y: 0,
                },
            },
        });
        display.drawText({
            text: 'Press Enter to Start',
            font: '32px PKMN',
            color: textColor(),
            destination: {
                x: display.buffer.canvas.width / 2,
                y: display.buffer.canvas.height / 2,
            },
        });
    }
    return {
        name,
        onEnter,
        onExit,
        update,
        render,
    };
}
export default StartScreenState;
