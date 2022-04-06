import GameObject from './GameObject.js';
class CollisionManager {
    constructor({ data, tiles: { width, height, cols, rows }, offset, }) {
        this.normal = [];
        this.up = [];
        this.down = [];
        this.left = [];
        this.right = [];
        this.battleObjects = [];
        this.normal = [];
        let index = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                switch (data[index]) {
                    case 289:
                        this.normal.push(new GameObject({
                            x: x * width - offset.x,
                            y: y * height - offset.y,
                            width: width,
                            height: height,
                        }));
                }
                switch (data[index]) {
                    case 300:
                        this.battleObjects.push(new GameObject({
                            x: x * width - offset.x,
                            y: y * height - offset.y,
                            width: width,
                            height: height,
                        }));
                }
                index++;
            }
        }
    }
    isEncounter(playerObject, { encounterRate, }) {
        for (let battleObject of this.battleObjects) {
            if (this.allSidesCollision(playerObject, battleObject, { isPlayer: true })) {
                const battleZone = new GameObject({
                    x: battleObject.x,
                    y: battleObject.y,
                    width: battleObject.width,
                    height: battleObject.height,
                });
                for (let collisionObject of this.normal) {
                    const battleZoneRight = new GameObject({
                        x: battleObject.x + 1,
                        y: battleObject.y,
                        width: battleObject.width,
                        height: battleObject.height,
                    });
                    const battleZoneLeft = new GameObject({
                        x: battleObject.x - 1,
                        y: battleObject.y,
                        width: battleObject.width,
                        height: battleObject.height,
                    });
                    const battleZoneUp = new GameObject({
                        x: battleObject.x,
                        y: battleObject.y - 1,
                        width: battleObject.width,
                        height: battleObject.height,
                    });
                    const battleZoneDown = new GameObject({
                        x: battleObject.x,
                        y: battleObject.y + 1,
                        width: battleObject.width,
                        height: battleObject.height,
                    });
                    if (this.allSidesCollision(battleZoneRight, collisionObject, {
                        isPlayer: false,
                    })) {
                        battleZone.setRight(battleZone.getCenterX());
                        break;
                    }
                    else if (this.allSidesCollision(battleZoneLeft, collisionObject, {
                        isPlayer: false,
                    })) {
                        battleZone.setLeft(battleZone.getCenterX());
                        break;
                    }
                    else if (this.allSidesCollision(battleZoneUp, collisionObject, {
                        isPlayer: false,
                    })) {
                        battleZone.setTop(battleZone.getCenterY());
                        break;
                    }
                    else if (this.allSidesCollision(battleZoneDown, collisionObject, {
                        isPlayer: false,
                    })) {
                        battleZone.setBottom(battleZone.getCenterY());
                        break;
                    }
                }
                const overlappingArea = (Math.min(playerObject.getCenterX() + battleZone.width / 2, battleZone.getRight()) -
                    Math.max(playerObject.getCenterX() - battleZone.width / 2, battleZone.getLeft())) *
                    (Math.min(playerObject.getCenterY() + (4 * battleZone.height) / 3, battleZone.getBottom()) -
                        Math.max(playerObject.getCenterY() + battleZone.height / 3, battleZone.getTop()));
                if (overlappingArea > 0.5 * battleZone.width * battleZone.height)
                    return Math.random() < encounterRate;
            }
        }
        return false;
    }
    allSidesCollision(object1, object2, { isPlayer = false }) {
        return (object2.getLeft() < object1.getRight() &&
            object2.getRight() > object1.getLeft() &&
            object2.getTop() < object1.getBottom() &&
            object2.getBottom() > (isPlayer ? object1.getCenterY() : object1.getTop()));
    }
    willCollide(playerObject) {
        for (let collisionObject of this.normal) {
            if (this.allSidesCollision(playerObject, collisionObject, {
                isPlayer: true,
            }))
                return true;
        }
        for (let collisionObject of this.up) {
            if (collisionObject.getLeft() < playerObject.getRight() - 6 &&
                collisionObject.getRight() > playerObject.getLeft() + 6 &&
                collisionObject.getTop() < playerObject.getBottom() - 6 &&
                collisionObject.getBottom() > playerObject.getCenterY() + 6) {
                return true;
            }
        }
        for (let collisionObject of this.down) {
            if (collisionObject.getLeft() < playerObject.getRight() - 6 &&
                collisionObject.getRight() > playerObject.getLeft() + 6 &&
                collisionObject.getTop() < playerObject.getBottom() - 6 &&
                collisionObject.getBottom() > playerObject.getCenterY() + 6) {
                return true;
            }
        }
        for (let collisionObject of this.left) {
            if (collisionObject.getLeft() < playerObject.getRight() - 6 &&
                collisionObject.getRight() > playerObject.getLeft() + 6 &&
                collisionObject.getTop() < playerObject.getBottom() - 6 &&
                collisionObject.getBottom() > playerObject.getCenterY() + 6) {
                return true;
            }
        }
        for (let collisionObject of this.right) {
            if (collisionObject.getLeft() < playerObject.getRight() - 6 &&
                collisionObject.getRight() > playerObject.getLeft() + 6 &&
                collisionObject.getTop() < playerObject.getBottom() - 6 &&
                collisionObject.getBottom() > playerObject.getCenterY() + 6) {
                return true;
            }
        }
        return false;
    }
}
export default CollisionManager;
