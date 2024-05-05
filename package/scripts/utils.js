async function delay(time) {
    await new Promise(resolve => {
        return setTimeout(resolve, time);
    });
}
function hexToRgb(hex) {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}
function rgbLit(hex) {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    const rEnlighted = r + 50 > 255 ? 255 : r + 50;
    const gEnlighted = g + 50 > 255 ? 255 : g + 50;
    const bEnlighted = b + 50 > 255 ? 255 : b + 50;
    return `${rEnlighted}, ${gEnlighted}, ${bEnlighted}`;
}
export { delay, hexToRgb, rgbLit };
