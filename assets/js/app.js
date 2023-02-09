import trailEffect from "./trail.js";
import constellationEffect from "./constellation.js";
import consoleText from "./console.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const trailRange = document.querySelector("[data-trail-range]");
let bubbleRange = document.querySelector("[data-bubble-range]");
const selectedEffect = document.querySelector("select");

document.body.width = window.innerWidth;
document.body.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let hue = 0;
let frame = 1;
let color;
selectedEffect.value === "1"
  ? (color = "rgba(255, 255, 255, 1)")
  : (color = "hsl(" + hue + " ,100%, 50% )");

canvas.addEventListener("click", (e) => {
  hue += 8;
  if (particlesArray.length < 100) {
    for (let i = 0; i < 20; i++) {
      particlesArray.push(new Particle(e.x, e.y, color));
    }
  }
});

canvas.addEventListener("touchmove", (e) => {
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  hue += 2;
  if (frame % 2 === 0) {
    for (let i = 0; i < 5; i++) {
      particlesArray.push(new Particle(x, y, color));
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  hue += 2;
  if (frame % 2 === 0) {
    for (let i = 0; i < 7; i++) {
      particlesArray.push(new Particle(e.x, e.y, color));
    }
  }
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * bubbleRange.value + 1; // between 1 to 21
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
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }
}

function effect() {
  if (selectedEffect.value == "1") {
    color = "hsl(" + hue + " ,100%, 50% )";
    constellationEffect(
      particlesArray,
      ctx,
      canvas.width,
      canvas.height,
      trailRange.value
    );
  }
  if (selectedEffect.value == "2") {
    color = "hsl(" + hue + " ,100%, 50% )";
    trailEffect(
      particlesArray,
      ctx,
      canvas.width,
      canvas.height,
      trailRange.value
    );
  }
  if (selectedEffect.value == "3") {
    color = "rgba(255, 255, 255, 1)";
    trailEffect(
      particlesArray,
      ctx,
      canvas.width,
      canvas.height,
      trailRange.value
    );
  }
}

function animate() {
  effect();
  frame++;
  requestAnimationFrame(animate);
}

animate();

function swRegistration() {
  const heart = [
    "font-size: 20px",
    "padding: 12px",
    "margin: 4px 0 4px 4px",
    "color: rgba(238,58,136,1)",
  ].join(";");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("serviceWorker.js", {
        scope: ".",
      })
      .then(function (registration) {
        console.log("%c❤️", heart);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
swRegistration();
consoleText();
