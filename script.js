const canvas = document.getElementById("randomWalkCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Random Walk Parameters
let points = [{ x: canvas.width / 2, y: canvas.height / 2 }]; // Start at the center
let zoom = 1; // Initial zoom level
let offsetX = 0;
let offsetY = 0;

// Redraw the entire path
function drawPath() {
  ctx.setTransform(zoom, 0, 0, zoom, offsetX, offsetY);
  ctx.clearRect(0, 0, canvas.width / zoom, canvas.height / zoom);

  // Draw the path
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Add a random step and update the path
function randomWalk() {
  const stepSize = 20;
  const lastPoint = points[points.length - 1];

  // Random direction
  const direction = Math.floor(Math.random() * 4);
  let newX = lastPoint.x;
  let newY = lastPoint.y;
  switch (direction) {
    case 0:
      newX += stepSize;
      break; // Right
    case 1:
      newX -= stepSize;
      break; // Left
    case 2:
      newY += stepSize;
      break; // Down
    case 3:
      newY -= stepSize;
      break; // Up
  }

  // Add the new point
  points.push({ x: newX, y: newY });

  // Adjust view if the walk goes beyond the visible canvas area
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  const pathWidth = maxX - minX;
  const pathHeight = maxY - minY;

  if (pathWidth > canvas.width || pathHeight > canvas.height) {
    zoom *= 0.9; // Reduce zoom level
    offsetX = canvas.width / 2 - (minX + pathWidth / 2) * zoom;
    offsetY = canvas.height / 2 - (minY + pathHeight / 2) * zoom;
  }

  drawPath();
  requestAnimationFrame(randomWalk);
}

// Start the random walk
drawPath();
randomWalk();
