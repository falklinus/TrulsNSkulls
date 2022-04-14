function BattleState({ display }) {
    const name = 'BattleState';
    const background = new Image();
    background.src = '../../assets/battles/battleBG.png';
    const enemy = new Image();
    enemy.src = '../../assets/battles/spiritA.png';
    const battleOverlay = document.querySelector('#battleOverlay');
    function onEnter() {
        if (!battleOverlay)
            return;
        battleOverlay.style.display = 'block';
    }
    function onExit() { }
    function update() { }
    function render() {
        display.drawObject({
            source: {
                image: background,
                x: 0,
                y: 0,
            },
            destination: { x: 0, y: 0, offset: { x: 0, y: 0 } },
        });
        display.drawObject({
            source: {
                image: enemy,
                x: 0,
                y: 0,
            },
            destination: {
                x: -enemy.width / 2,
                y: -enemy.height / 2,
                offset: { x: 0.75, y: 0.25 },
            },
        });
    }
    function onPause() { }
    function onResume() { }
    return { name, onEnter, onExit, update, render };
}
export default BattleState;
