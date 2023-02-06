import trailEffect from "./trail.js";
import constellationEffect from "./constellation.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("range");
const selectedEffect = document.querySelector("select");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let hue = 0;
let color;
selectedEffect.value === "1"
  ? (color = "rgba(255, 255, 255, 1)")
  : (color = "hsl(" + hue + " ,100%, 50% )");

canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 30; i++) {
    particlesArray.push(new Particle(e.x, e.y, color));
  }
});

canvas.addEventListener("touchmove", (e) => {
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(x, y, color));
  }
});

canvas.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(e.x, e.y, color));
  }
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 7) + 2; // between 1 to 7
    this.speedX = Math.random() * 3 - 1.5; //between 1 and -1
    this.speedY = Math.random() * 3 - 1.5; //between 1 and -1
    this.color = color;
  }

  draw() {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.3) {
      this.size -= 0.1;
    }
  }
}

function effect() {
  if (selectedEffect.value == "1") {
    color = "rgba(255, 255, 255, 1)";
    trailEffect(particlesArray);
  }
  if (selectedEffect.value == "2") {
    color = "hsl(" + hue + " ,100%, 50% )";
    trailEffect(particlesArray);
  }
  if (selectedEffect.value == "3") {
    color = "hsl(" + hue + " ,100%, 50% )";
    constellationEffect(particlesArray, ctx);
  }
}

function animate() {
  console.log(selectedEffect.value);
  effect();
  ctx.fillStyle = "rgba(0, 0, 0," + range.value + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  hue += 2;
  console.log(color);
  requestAnimationFrame(animate);
}

animate();
