class Controller {
    constructor() {
        this.shift = new KeyboardInput();
        this.KEY_MAP = {
            a: 'left',
            d: 'right',
            w: 'up',
            s: 'down',
        };
        this.keyBuffer = [];
    }
    keyDownUp(type, key) {
        const down = type === 'keydown' ? true : false;
        const inputKey = key.toLowerCase();
        if (inputKey === 'shift')
            return this.shift.getInput(down);
        if (!Object.keys(this.KEY_MAP).includes(inputKey))
            return;
        if (!down)
            return (this.keyBuffer = this.keyBuffer.filter((k) => k !== inputKey));
        if (!this.keyBuffer.includes(inputKey))
            return this.keyBuffer.unshift(inputKey);
    }
    get direction() {
        return this.KEY_MAP[this.keyBuffer[0]];
    }
}
export default Controller;
class KeyboardInput {
    constructor() {
        this.active = false;
        this.down = false;
    }
    getInput(down) {
        if (this.down != down)
            this.active = down;
        this.down = down;
    }
}
