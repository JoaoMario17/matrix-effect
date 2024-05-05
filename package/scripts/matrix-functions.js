import { delay } from './utils.js';
import { hexToRgb, rgbLit } from './utils.js';
function setDrops(columns) {
    var drops = [];
    for (var i = 0; i < columns; i++) {
        var drop = {
            isDropping: false,
            droppingFunction: () => { },
            currentX: -1,
            elements: [],
            rgb: '',
            rgbe: '',
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
                context.fillStyle = `rgba(${drop.rgb}, 1)`;
                if (i === drop.currentX) {
                    context.fillStyle = `rgba(${drop.rgbe}, 1)`;
                }
                if (i < (drop.currentX - dropsLength / 2) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 4))) {
                    context.fillStyle = `rgba(${drop.rgb}, 0.8)`;
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 4)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 3))) {
                    context.fillStyle = `rgba(${drop.rgb}, 0.6)`;
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 3)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 2))) {
                    context.fillStyle = `rgba(${drop.rgb}, 0.4)`;
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 2)) && i > drop.currentX - (dropsLength - (dropsLength / 10 * 1))) {
                    context.fillStyle = `rgba(${drop.rgb}, 0.2)`;
                }
                if (i <= drop.currentX - (dropsLength - (dropsLength / 10 * 1))) {
                    context.fillStyle = `rgba(${drop.rgb}, 0.1)`;
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
function createDrop(elements, dropsSpeeds, color) {
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
        rgb: hexToRgb(color),
        rgbe: rgbLit(color),
        currentX: 1,
        speed: dropsSpeeds[Math.floor(Math.random() * dropsSpeeds.length)]
    };
}
async function startDrop(drop) {
    drop.droppingFunction();
}
export { setDrops, startDrop, renderDrop, createDrop, columnIsInUse, thereIsAvailableDropSpaces };
