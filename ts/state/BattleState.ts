import Display from '../Display.js'

function BattleState({ display }: { display: Display }) {
  const name = 'BattleState'
  function onEnter() {}
  function onExit() {}
  function update() {}
  function render() {
    display.drawObject({
      color: 'red',
      destination: { x: 0, y: 0, offset: { x: 0, y: 0 } },
    })
  }

  function onPause() {}
  function onResume() {}

  return { name, onEnter, onExit, update, render }
}

export default BattleState
