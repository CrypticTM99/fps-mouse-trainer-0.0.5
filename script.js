
// Mouse Enhancement Utility for FPS Training and Accessibility
//Created by Crypticwisdom99 (Tristan)
document.addEventListener("DOMContentLoaded", () => {
  const sensitivitySlider = document.getElementById("sensitivity");
  const accelToggle = document.getElementById("accelToggle");
  const canvas = document.getElementById("aimCanvas");
  const ctx = canvas.getContext("2d");

  let sensitivity = 1;
  let mouseAccel = false;
  let posX = canvas.width / 2;
  let posY = canvas.height / 2;

  // Track and draw movement for training/feedback
  canvas.addEventListener("mousemove", (e) => {
    let dx = e.movementX * sensitivity;
    let dy = e.movementY * sensitivity;

    if (mouseAccel) {
      const accelFactor = Math.min(Math.sqrt(Math.abs(dx) + Math.abs(dy)) / 5, 3);
      dx *= accelFactor;
      dy *= accelFactor;
    }

    posX += dx;
    posY += dy;

    // Bound the position
    posX = Math.max(0, Math.min(canvas.width, posX));
    posY = Math.max(0, Math.min(canvas.height, posY));

    drawCursor();
  });

  sensitivitySlider.addEventListener("input", (e) => {
    sensitivity = parseFloat(e.target.value);
    document.getElementById("sensDisplay").textContent = sensitivity.toFixed(2);
  });

  accelToggle.addEventListener("change", (e) => {
    mouseAccel = e.target.checked;
  });

  function drawCursor() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(posX, posY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff88";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }

  drawCursor();
});
