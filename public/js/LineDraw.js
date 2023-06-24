var lineCoordinates = []; // Array to store line coordinates
var isDrawing = false; // Flag to track if the line is being drawn
var canvas = document.getElementById('overlayCanvas');
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext('2d');

// Add event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('mouseup', endDrawing);

function startDrawing(event) {
  isDrawing = true;
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  lineCoordinates.push({ x: x, y: y });
  console.log(lineCoordinates);
}

function drawLine(event) {
  if (!isDrawing) return;
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var lastIndex = lineCoordinates.length - 1;
  lineCoordinates[lastIndex].x = x;
  lineCoordinates[lastIndex].y = y;
  redrawLines();
}

function endDrawing(event) {
  isDrawing = false;
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  lineCoordinates.push({ x: x, y: y });
  
}

function redrawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
  
    for (var i = 0; i < lineCoordinates.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(lineCoordinates[i].x, lineCoordinates[i].y);
      ctx.lineTo(lineCoordinates[i + 1].x, lineCoordinates[i + 1].y);
      ctx.stroke();
    }
  }