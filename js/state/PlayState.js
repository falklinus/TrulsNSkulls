import Controller from '../Controller.js';
import World from '../game/World.js';
import Menu from '../game/menu.js';
function PlayState(display, gameStack) {
    const name = 'PlayState';
    const controller = Controller();
    const world = new World();
    let running = true;
    function keyDownUp(event) {
        controller.keyDownUp(event.type, event.key);
    }
    function movePlayer() {
        let playerDirection = controller.direction();
        world.movePlayer({
            direction: playerDirection,
            moveFast: controller.shift.active,
        });
    }
    function onEnter() {
        Menu(gameStack);
        window.addEventListener('keydown', keyDownUp);
        window.addEventListener('keyup', keyDownUp);
    }
    function onExit() {
        window.removeEventListener('keydown', keyDownUp);
        window.removeEventListener('keyup', keyDownUp);
    }
    let prevWorldIndex;
    let prevInnerMapIndex = {
        x: 0,
        y: 0,
    };
    function update() {
        const worldIndex = world.world.findIndex((worldPart) => world.collisionManager.allSidesCollision(worldPart.position, world.player, { isPlayer: false }));
        if (worldIndex !== prevWorldIndex) {
            prevWorldIndex = worldIndex;
            console.log('world tile: ', {
                x: worldIndex % 3,
                y: Math.floor(worldIndex / 3),
            });
        }
        const innerMapIndex = {
            x: world.player.getLeft() < world.world[worldIndex].position.getCenterX()
                ? 0
                : 1,
            y: world.player.getTop() < world.world[worldIndex].position.getCenterY()
                ? 0
                : 1,
        };
        if (innerMapIndex.x !== prevInnerMapIndex.x ||
            innerMapIndex.y !== prevInnerMapIndex.y) {
            prevInnerMapIndex = innerMapIndex;
            console.log('position in tile: ', innerMapIndex);
        }
        if (!running)
            return;
        if (world.player.moving && world.isEncounter())
            console.log('ENCOUNTER');
        movePlayer();
    }
    function render() {
        // Background
        for (let i = 0; i < world.backgrounds.length; i++) {
            display.drawObject({
                source: {
                    image: world.backgrounds[i],
                    x: 0,
                    y: 0,
                },
                destination: {
                    x: -world.width / 2 - world.player.getLeft() + world.width * i,
                    y: -world.height / 2 - world.player.getTop(),
                    offset: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                width: world.width,
                height: world.height,
            });
        }
        // BattleZones
        // for (let battleObject of world.collisionManager.battleObjects) {
        //   display.drawObject({
        //     color: 'rgba(255, 0, 255, 0.5)',
        //     destination: {
        //       x: -(
        //         world.player.getLeft() -
        //         battleObject.x +
        //         world.player.width / 2
        //       ),
        //       y: -(
        //         world.player.getTop() -
        //         battleObject.y +
        //         world.player.height / 2
        //       ),
        //       offset: {
        //         x: 0.5,
        //         y: 0.5,
        //       },
        //     },
        //     width: battleObject.width,
        //     height: battleObject.height,
        //   })
        // }
        const playerShadow = new Image();
        playerShadow.src = '../assets/player/playerShadow.png';
        // Player shadow
        display.drawObject({
            source: {
                image: playerShadow,
                x: 0,
                y: 0,
            },
            width: world.player.width,
            height: world.player.height,
            destination: {
                x: -(world.player.width / 2),
                y: world.player.height / 2 - playerShadow.height / 2 - 6,
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
            },
        });
        // Player battle collisionbox
        // display.drawObject({
        //   color: 'rgba(0, 0, 255, 0.5)',
        //   width: 36,
        //   height: 36,
        //   destination: {
        //     x: -18,
        //     y: 12,
        //     offset: {
        //       x: 0.5,
        //       y: 0.5,
        //     },
        //   },
        // })
        // Player
        display.drawObject({
            source: Object.assign({ image: world.player.sprite.image }, world.player.sprite.position),
            width: world.player.width,
            height: world.player.height,
            destination: {
                x: -(world.player.width / 2),
                y: -(world.player.height / 2),
                offset: {
                    x: 0.5,
                    y: 0.5,
                },
            },
        });
        // Foreground
        for (let i = 0; i < world.foregrounds.length; i++) {
            display.drawObject({
                source: {
                    image: world.foregrounds[i],
                    x: 0,
                    y: 0,
                },
                destination: {
                    x: -world.width / 2 - world.player.getLeft() + world.width * i,
                    y: -world.height / 2 - world.player.getTop(),
                    offset: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                width: world.width,
                height: world.height,
            });
        }
        // Collisionboxes
        // for (let collisionObject of world.collisionManager.normal) {
        //   display.drawObject({
        //     color: 'rgba(255, 0, 0, 0.2)',
        //     destination: {
        //       x: -(
        //         world.player.getLeft() -
        //         collisionObject.x +
        //         world.player.width / 2
        //       ),
        //       y: -(
        //         world.player.getTop() -
        //         collisionObject.y +
        //         world.player.height / 2
        //       ),
        //       offset: {
        //         x: 0.5,
        //         y: 0.5,
        //       },
        //     },
        //     width: collisionObject.width,
        //     height: collisionObject.height,
        //   })
        // }
    }
    function onPause() {
        running = false;
    }
    function onResume() {
        running = true;
    }
    return {
        name,
        onEnter,
        onExit,
        update,
        render,
        onPause,
        onResume,
    };
}
export default PlayState;
