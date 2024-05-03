import { delay } from './utils.js';
function setDrops(columns) {
    var drops = [];
    for (var i = 0; i < columns; i++) {
        var drop = {
            isDropping: false,
            droppingFunction: () => { },
            currentX: -1,
            elements: [],
            speed: 0
        };
        drops.push(drop);
    }
    return drops;
}
function renderDrop(drop, column, context, dropsLength, fontSize) {
    for (var i = 1; i < drop.elements.length; i++) {
        if (context) {
            if (i > drop.currentX - dropsLength) {
                context.fillStyle = 'rgba(101, 163, 13, 1)';
                if (i === drop.currentX) {
                    context.fillStyle = `rgba(236, 252, 203, 1)`;
                }
                if (i < (drop.currentX - dropsLength / 2) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 4))) {
                    context.fillStyle = 'rgba(101, 163, 13, 0.8)';
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 4)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 3))) {
                    context.fillStyle = 'rgba(101, 163, 13, 0.6)';
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 3)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 2))) {
                    context.fillStyle = 'rgba(101, 163, 13, 0.4)';
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 2)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 1))) {
                    context.fillStyle = 'rgba(101, 163, 13, 0.2)';
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 1))) {
                    context.fillStyle = 'rgba(101, 163, 13, 0.01)';
                }
                context.fillText(drop.elements[i], column * fontSize, i * fontSize);
            }
            if (i === drop.currentX)
                break;
        }
    }
}
function thereIsAvailableDropSpaces(drops) {
    for (var i = 0; i < drops.length; i++) {
        if (!drops[i].isDropping)
            return true;
    }
    return false;
}
function columnIsInUse(column, drops) {
    if (drops[column].isDropping)
        return true;
    return false;
}
function createDrop(elements, dropsSpeeds) {
    return {
        isDropping: true,
        droppingFunction: async function () {
            for (var i = 0; i < this.elements.length + this.speed; i++) {
                await delay(this.speed);
                this.currentX++;
            }
            this.isDropping = false;
            return;
        },
        elements,
        currentX: 1,
        speed: dropsSpeeds[Math.floor(Math.random() * dropsSpeeds.length)]
    };
}
async function startDrop(drop) {
    drop.droppingFunction();
}
async function dropsJuggler(drops, columns, lines, letters, dropsSpeeds) {
    if (!thereIsAvailableDropSpaces(drops))
        return null;
    var column = 0;
    do {
        column = Math.floor(Math.random() * columns);
    } while (columnIsInUse(column, drops));
    var elements;
    elements = [];
    // Randomly populate the elements array
    for (var i = 0; i < lines; i++) {
        elements.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    drops[column] = createDrop(elements, dropsSpeeds);
    startDrop(drops[column]);
}
export { setDrops, renderDrop, thereIsAvailableDropSpaces, columnIsInUse, createDrop, startDrop, };
