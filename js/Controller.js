function Controller() {
    const shift = new KeyboardInput();
    const enter = new KeyboardInput();
    const KEY_MAP = {
        a: 'left',
        d: 'right',
        w: 'up',
        s: 'down',
    };
    let keyBuffer = [];
    function keyDownUp(type, key) {
        const down = type === 'keydown' ? true : false;
        const inputKey = key.toLowerCase();
        if (inputKey === 'shift')
            return shift.getInput(down);
        if (inputKey === 'enter')
            return enter.getInput(down);
        if (!Object.keys(KEY_MAP).includes(inputKey))
            return;
        if (!down)
            return (keyBuffer = keyBuffer.filter((k) => k !== inputKey));
        if (!keyBuffer.includes(inputKey))
            return keyBuffer.unshift(inputKey);
    }
    function direction() {
        return KEY_MAP[keyBuffer[0]];
    }
    return { shift, enter, direction, keyDownUp };
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
