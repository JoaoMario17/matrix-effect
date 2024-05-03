async function delay(time: number) {
  await new Promise(resolve => {
    return setTimeout(resolve, time);
  });
}

function hexToRgb(hex: string) {
	const hexValue = hex.replace('#', '');
	const r = parseInt(hexValue.substring(0, 2), 16);
	const g = parseInt(hexValue.substring(2, 4), 16);
	const b = parseInt(hexValue.substring(4, 6), 16);

	return { r, g, b };
}

function rgbEnlighter(rgb: { r: number, g: number, b: number }) {
	const { r, g, b } = rgb;
	const rEnlighted = r + 50 > 255 ? 255 : r + 50;
	const gEnlighted = g + 50 > 255 ? 255 : g + 50;
	const bEnlighted = b + 50 > 255 ? 255 : b + 50;

	return { re: rEnlighted, ge: gEnlighted, be: bEnlighted };
}

export { delay, hexToRgb, rgbEnlighter }
