import { setDrops, renderDrop, thereIsAvailableDropSpaces, columnIsInUse, createDrop, startDrop, } from './matrix-functions.js';
document.addEventListener("DOMContentLoaded", () => {
    var canvas;
    var context;
    var dropsJugglerInterval;
    var renderScreenInterval;
    var letters = '!@#$%¨&*()_+-=/?123456789ABCDEFGHIJKLMNOPQRSTUVWYXZ';
    canvas = document.querySelector('#matrix');
    if (canvas == null)
        return console.log("could not build canvas element!");
    context = canvas.getContext("2d");
    if (context == null)
        return console.log("could not build context element!");
    // Setting up the background color
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Setting up the columns, lines and characters font size
    var fontSize = 12;
    var columns = Math.floor(canvas.width / fontSize);
    var lines = canvas.height / fontSize;
    context.font = `${fontSize}px Arial`;
    const dropsLength = 50;
    const dropsSpeeds = [50, 60, 70, 80, 90];
    var drops;
    drops = [];
    const resizeObserver = new ResizeObserver(async (entries) => {
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            clearInterval(dropsJugglerInterval);
            clearInterval(renderScreenInterval);
            drops = [];
            context = canvas.getContext("2d");
            if (context) {
                context.fillStyle = '#000000';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            columns = Math.floor(canvas.width / fontSize);
            lines = canvas.height / fontSize;
            drops = setDrops(columns);
            dropsJugglerInterval = setInterval(dropsJuggler, 60);
            renderScreenInterval = setInterval(renderScreen, 60);
        }
    });
    // Setting up canvas dimensions and resize observer
    if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        resizeObserver.observe(canvas.parentElement);
    }
    async function dropsJuggler() {
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
    function renderScreen() {
        // set the canvas background style
        if (context && canvas) {
            context.fillStyle = '#000000';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        // iterates drop array
        for (var i = 0; i < drops.length; i++) {
            if (drops[i].isDropping) {
                renderDrop(drops[i], i, context, dropsLength, fontSize);
            }
        }
    }
    drops = setDrops(columns);
    dropsJugglerInterval = setInterval(dropsJuggler, 60);
    renderScreenInterval = setInterval(renderScreen, 60);
});
