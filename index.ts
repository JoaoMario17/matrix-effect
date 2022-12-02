document.addEventListener("DOMContentLoaded",() => {
  var canvas: HTMLCanvasElement | null;
  var context: CanvasRenderingContext2D | null;

  // Building canvas
  canvas = document.querySelector('#canvas-tag');

  if (canvas == null) 
    return console.log("could not build canvas element!");

  //Setting up canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Building context
  context = canvas.getContext("2d");

  if (context == null) 
    return console.log("could not build context element!");

  // Setting up the background color
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Setting up the letters
  var letters = '123456789ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';

  // Setting up the columns and lines
  var fontSize = 10;
  var columns = Math.floor(canvas.width / fontSize);
  var lines = canvas.height / fontSize;




  // Setting up the drops
  interface drop {
    isDropping: boolean;
    currentX: number;
    elements: Array<string>;
  }

  var drops: Array<drop>;
  drops = [];

  async function delay(time: number) {
    await new Promise(resolve => {
      return setTimeout(resolve, time);
    })
  }

  function setDrops()  {
    for (var i = 0; i < columns; i++) {
      var drop = {
        isDropping: false,
        currentX: -1,
        elements: [],
      }

      drops.push(drop);
    }
  }

  function thereIsAvailableDropSpaces() {
    for (var i = 0; i < drops.length; i++) {
      if(!drops[i].isDropping)
        return true;
    }

    return false;
  }

  function columnIsInUse(column: number) {
    if (drops[column].isDropping)
      return true;

    return false;
  }
  
  function createDrop(column: number, elements: Array<string>) {
    drops[column] = { isDropping: true, elements, currentX: 0} 
  }
  
  async function createDroptemp() {
    if (!thereIsAvailableDropSpaces()) 
      return;

    var column = 0;

    do {
      column = Math.floor(Math.random() * columns);
    } while (columnIsInUse(column))

    var elements: Array<string>
    elements = []

    // Randomly populate the elements array
    for (var i = 0; i < lines; i++) {
      elements.push(letters[Math.floor(Math.random() * letters.length)])
    }

    createDrop(column, elements);
    startDrop(drops[column], column);
  }

  async function startDrop(drop: drop, column: number) {
    for(var i = 0; i < drop.elements.length + 15; i++) {
      await delay(100);
      drop.currentX++;
    }

    //remover drop do array de drops
    drops[column].isDropping = false;
    return;
  }

  function renderDrop(drop: drop, column: number) {
    for(var i = 0; i < drop.elements.length; i++) {
      if (context) {
        if (i > drop.currentX - 15) {
          context.fillStyle = 'rgba(168,85,247, 1)';
          context.fillText(drop.elements[i], column * fontSize, i * fontSize);
        }

        if (i === drop.currentX) 
          break;
      }
    }
  }

  function renderScreen() {
    if(context && canvas) {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    for(var i = 0; i < drops.length; i++) {
      if (drops[i].isDropping) {
        renderDrop(drops[i], i);
      }
    }
  }

  function matrix() {
    createDroptemp();
  }

  setDrops();
  setInterval(matrix, 100);
  setInterval(renderScreen, 10);
});