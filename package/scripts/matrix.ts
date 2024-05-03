import { drop } from "./interfaces";
import { hexToRgb, rgbEnlighter } from './utils.js';
import { setDrops } from './matrix-functions.js';
import { startDrop } from "./matrix-functions.js";
import { renderDrop } from "./matrix-functions.js";
import { createDrop } from "./matrix-functions.js";
import { columnIsInUse } from "./matrix-functions.js";
import { thereIsAvailableDropSpaces } from "./matrix-functions.js";

let matrixCanvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let drops: Array<drop>;
let dropsJugglerInterval: ReturnType<typeof setInterval>;
let renderScreenInterval: ReturnType<typeof setInterval>;
let letters: string = '';
let backgroundColor: string = ''; 
let lettersColor: string = '';
let lettersColorEnlighted: string = '';
let fontSize: number = 0;

const defineLetters = (lettersSequence: string ='!@#$%¨&*()_+-=/?123456789ABCDEFGHIJKLMNOPQRSTUVWYXZ') => {
	letters = lettersSequence;
}

const defineLettersColor = (color: string = '#00FF00') => {
	const { r, g, b } = hexToRgb(color);
	const { re, ge, be } = rgbEnlighter({ r, g, b });
	lettersColor = `${r}, ${g}, ${b}`;
	lettersColorEnlighted = `${re}, ${ge}, ${be}`;
}

const defineBackgroundColor = (color: string = '#000000') => {
	backgroundColor = color;
}

const defineFontSize = (size: number = 12) => {
	fontSize = size;
}

defineLetters();
defineLettersColor('#65a30d');
defineBackgroundColor();
defineFontSize();

document.addEventListener("DOMContentLoaded",() => {

  matrixCanvas = document.querySelector('#matrix');
  context = matrixCanvas!.getContext("2d");

  if (context == null || matrixCanvas == null) 
    return console.log("could not build context element!");

  // Setting up the background color
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  // Setting up the columns, lines and characters font size
  var columns = Math.floor(matrixCanvas.width / fontSize);
  var lines = matrixCanvas.height / fontSize;

  context.font = `${fontSize}px Arial`
  const dropsLength = 50;
  const dropsSpeeds = [ 50, 60, 70, 80, 90 ];

  drops = [];

  const resizeObserver = new ResizeObserver(async () => {
    if (matrixCanvas && matrixCanvas.parentElement) {
      matrixCanvas.width = matrixCanvas.parentElement.clientWidth;
      matrixCanvas.height = matrixCanvas.parentElement.clientHeight;
      clearInterval(dropsJugglerInterval);
      clearInterval(renderScreenInterval);
      drops = [];
      context = matrixCanvas.getContext("2d");
      if (context) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      }
      columns = Math.floor(matrixCanvas.width / fontSize);
      lines = matrixCanvas.height / fontSize;
      drops = setDrops(columns);
      dropsJugglerInterval = setInterval(dropsJuggler, 60);
      renderScreenInterval = setInterval(renderScreen, 60);
    }
  });
    
  // Setting up canvas dimensions and resize observer
  if (matrixCanvas.parentElement) {
    matrixCanvas.width = matrixCanvas!.parentElement.clientWidth;
    matrixCanvas.height = matrixCanvas.parentElement.clientHeight;
    resizeObserver.observe(matrixCanvas.parentElement);
  }
  
  async function dropsJuggler() {
    if (!thereIsAvailableDropSpaces(drops))
      return null;

    var column = 0;

    do {
      column = Math.floor(Math.random() * columns);
    } while (columnIsInUse(column, drops))

    var elements: Array<string>
    elements = []

    // Randomly populate the elements array
    for (var i = 0; i < lines; i++) {
      elements.push(letters[Math.floor(Math.random() * letters.length)])
    }

    drops[column] = createDrop(elements, dropsSpeeds);
    startDrop(drops[column]);
  }

  function renderScreen() {
    // set the canvas background style
    if(context && matrixCanvas) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    }

    // iterates drop array
    for(var i = 0; i < drops.length; i++) {
      if (drops[i].isDropping) {
        renderDrop(drops[i], i, context, dropsLength, fontSize, lettersColor, lettersColorEnlighted);
      }
    }
  }

  drops = setDrops(columns);
  dropsJugglerInterval = setInterval(dropsJuggler, 60);
  renderScreenInterval = setInterval(renderScreen, 60);
});

export {
	defineLetters,
	defineLettersColor,
	defineBackgroundColor,
	defineFontSize
}
