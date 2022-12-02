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
  var lines = canvas.height / fontSize

  // Setting up the drops
  interface drop {
    currentX: number;
    y: number;
    elements: Array<string>;
  }

  var drops: Array<drop>;
  drops = [];

  function drawElement(context: CanvasRenderingContext2D , x: number, y: number, fillStyle: string, element: string ) {
    context.fillStyle = fillStyle;
    context.fillText(element, x,y)
  }

  function yPositionIsInUse(y: number) {
    console.log(drops)

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].y === y)
        return true
    }
    return false
  }
  
  function createDrop() {
    if (drops.length === columns) {
      console.log('drops array is full');
      console.log(drops.length, columns);
      return;
    }

    var y = Math.floor(Math.random() * columns);

    yPositionIsInUse(y)

    while (yPositionIsInUse(y)) {
      console.log('try new combination');
      y = Math.floor(Math.random() * columns);
    }

    var elements: Array<string>
    elements = []
    var currentX = 0

    // Randomly populate the elements array
    for (var i = 0; i < lines; i++) {
      elements.push(letters[Math.floor(Math.random() * letters.length)])
    }

    drops.push({ y, elements, currentX})
  }

  async function startDrop(context:CanvasRenderingContext2D, drop: drop) {
    for (var i = 0; i < lines-1 ; i++) {
      drawElement(context, drop.y * fontSize ,drop.currentX * fontSize, `rgba(168,85,247, 1)`, drop.elements[i])
      drop.currentX++
    }
  }

  function renderDrop(drop: drop) {
    console.log(drop);
  }

  function matrix() {
    createDrop();

    renderDrop(drops[0]);
  }

  // Loop the animation 
  setInterval(matrix, 500);
});