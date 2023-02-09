const trailRange = document.getElementById("trail-range");

export default function trailEffect(
  particlesArray,
  ctx,
  width,
  height,
  rangeValue
) {
  trailRange.style.display = "block";
  ctx.fillStyle = "rgba(0, 0, 0," + rangeValue + ")";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}
