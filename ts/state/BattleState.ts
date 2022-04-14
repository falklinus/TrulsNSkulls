import Display from '../Display.js'

function BattleState({ display }: { display: Display }) {
  const name = 'BattleState'
  const image = new Image()
  image.src = '../../assets/battles/battleBG.png'

  function onEnter() {}
  function onExit() {}
  function update() {}
  function render() {
    display.drawObject({
      source: {
        image,
        x: 0,
        y: 0,
      },
      destination: { x: 0, y: 0, offset: { x: 0, y: 0 } },
    })
  }

  function onPause() {}
  function onResume() {}

  return { name, onEnter, onExit, update, render }
}

export default BattleState
