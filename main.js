var canvas = document.querySelector('canvas');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

c = canvas.getContext('2d');
let mountainColors = ['#813945', '#7B3647', '#753146', '#663047'];

function drawBackground() {
  let gradient = c.createLinearGradient(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  gradient.addColorStop(0, "#303461");
  gradient.addColorStop(0.3, "#85536E");
  gradient.addColorStop(0.6, "#D46A4B");
  gradient.addColorStop(0.9, "#EB7337");
  c.fillStyle = gradient;
  c.fillRect(0, 0, windowWidth, windowHeight);
}

function drawMountain(mountainColor) {
  let x = 0;
  let y = windowHeight * ((Math.random() * 0.2) + 0.7); // 0.4 - 0.6
  c.strokeStyle = mountainColor;
  c.beginPath();
  c.moveTo(x, y);
  while (x < windowWidth) {
    let dx = (Math.random() * 20) + 50; // 50-70
    let dy = (Math.random() - 0.5) * 100; // -50 - 50
    x = x + dx;
    y = y + dy;
    if (y < 0 || y > windowHeight) { // if it goes over the top or under the bottom of the canvas
      y = y - 2 * dy; // go in the other direction twice the distance (basically like just going the original direction the same amount once);
    }
    if (x > windowWidth) {
      x = windowWidth;
    }
    c.lineTo(x, y);
  }
  // make a box around the bottom of the canvas
  c.lineTo(windowWidth, y);
  c.lineTo(windowWidth, windowHeight);
  c.lineTo(0, windowHeight);
  c.lineTo(0, windowHeight * 0.4);

  // fill in the colors
  c.stroke();
  c.fillStyle = mountainColor
  c.fill();
}

function drawMountains () {
  for (let i = 0; i < mountainColors.length; i++ ) {
    drawMountain(mountainColors[i]);
  }
}

let starLowerBound = windowHeight * 0.3;

function drawStar() {
  c.beginPath();

  let randomX = Math.random() * windowWidth;
  let randomY = Math.random() * starLowerBound;

  let randomOpacity = Math.random();
  c.fillStyle = `rgba(255,255,255, ${randomOpacity})`;

  c.arc(randomX, randomY, 1, 0, 2 * Math.PI);
  c.fill();
}

let numberOfStars = 100;
function drawStars() {
  for (let i = 0; i < numberOfStars; i++) {
    drawStar();
  }
}

function drawScene() {
  drawBackground();
  drawStars();
  drawMountains();
}

drawScene();

let el = document.querySelector('.reset');
el.addEventListener('click', drawScene);
