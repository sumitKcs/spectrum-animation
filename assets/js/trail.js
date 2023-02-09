const trailRange = document.getElementById("trail-range");

export default function trailEffect(
  particlesArray,
  ctx,
  width,
  height,
  rangeValue
) {
  const image = new Image(width, height);
  image.src = "/assets/img/bkg.jpg";
  image.style.objectFit = "cover";
  trailRange.style.display = "block";
  // ctx.fillStyle = "rgba(0, 0, 0," + rangeValue + ")";
  // ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}
