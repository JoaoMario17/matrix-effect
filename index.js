document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector('#canvas-tag');
  var ctx = canvas.getContext("2d");

  // Setting up the width and height of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Setting up the background color
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Setting up the letters
  var letters = '123456789ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  letters = letters.split('');

  // Setting up the columns and lines
  var fontSize = 10;
  var columns = canvas.width / fontSize;
  var lines = canvas.height / fontSize

  // Setting up the drops
  var drops = [];

  function drawElement(context ,x, y, fillStyle, element) {
    context.fillStyle = fillStyle;
    context.fillText(element, x,y)
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function yPositionIsInUse(y) {
    console.log(drops)

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].y === y)
        return true
    }
    return false
  }
 
  function createDrop() {
    console.log(drops.length, columns);
    if (drops.length >= columns) {
      console.log('drops array is full');
      return;
    }

    var y = Math.floor(Math.random() * columns);

    yPositionIsInUse(y)

    while (yPositionIsInUse(y)) {
      console.log('try new combination');
      y = Math.floor(Math.random() * columns);
    }

    var elements = [] 
    var currentX = 0

    // Randomly populate the elements array
    for (var i = 0; i < lines; i++) {
      elements.push(letters[Math.floor(Math.random() * letters.length)])
    }

    drops.push({ y, elements, currentX})
  }

  async function startDrop(drop) {
    for (var i = 0; i < lines-1 ; i++) {
      drawElement(ctx, drop.y * fontSize ,drop.currentX * fontSize, `rgba(168,85,247, 1)`, drop.elements[i])
      await delay(100)
      drop.currentX++
    }
  }

  function matrix() {
    createDrop()

    startDrop(drops[drops.length - 1])
  }

  // Loop the animation 
  setInterval(matrix, 100);
});