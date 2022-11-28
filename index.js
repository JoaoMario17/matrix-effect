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
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  letters = letters.split('');

  // Setting up the columns and lines
  var fontSize = 10;
  var columns = canvas.width / fontSize;
  var lines = canvas.height / fontSize

  // Setting up the drops
  var drops = [];
  for (var i = 0; i < columns; i++) {
    drops[i] = 13;
  }

  function drawline(lineheight) {
    for (var i = 0; i < columns ; i++) {
      var text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = `rgba(168,85,247, 1)`;
      ctx.fillText(text, i * fontSize, lineheight * fontSize)
    }
  }

  function fadingEffect(lineheight, alpha) {
    if (lineheight > 0) {
      for (var i = 0; i < columns ; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = `rgba(168,85,247, ${alpha})`;
        ctx.fillText(text, i * fontSize, lineheight * fontSize)
      }
    }
  }

  var lineheight = 1

  function matrix() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fadingEffect(lineheight - 8, 0.1)
    fadingEffect(lineheight - 7, 0.2)
    fadingEffect(lineheight - 6, 0.3)
    fadingEffect(lineheight - 5, 0.4)
    fadingEffect(lineheight - 4, 0.5)
    fadingEffect(lineheight - 3, 0.6)
    fadingEffect(lineheight - 2, 0.7)
    fadingEffect(lineheight - 1, 0.8)
    drawline(lineheight);
    lineheight ++

    if (lineheight > lines) 
      lineheight = 0
  }

  // Loop the animation 
  setInterval(matrix, 50);
});