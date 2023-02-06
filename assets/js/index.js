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

const mouse = {
  x: undefined,
  y: undefined,
};
let hue = 0;

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 30; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.floor(Math.random() * 7) + 2; // between 1 to 5
    this.speedX = Math.random() * 3 - 1.5; //between 1 and -1
    this.speedY = Math.random() * 3 - 1.5; //between 1 and -1
    this.color = "hsl(" + hue + " ,100%, 50% )";
  }

  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
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

function trailEffect() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function rainbowEffect(
    
) {

}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    // for (let j = 0; j < particlesArray.length; j++) {
    //   const dx = particlesArray[i].x - particlesArray[j].x;
    //   const dy = particlesArray[i].y - particlesArray[j].y;
    //   const distance = Math.sqrt(dx * dx + dy * dy);
    //   if (distance < 70) {
    //     ctx.beginPath();
    //     ctx.strokeStyle = particlesArray[i].color;
    //     ctx.lineWidth = 0.1;
    //     ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
    //     ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
    //     ctx.stroke();
    //     ctx.closePath();
    //   }
    // }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  ctx.fillStyle = "rgba(0, 0, 0," + range.value + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  hue += 2;
  // console.log(particlesArray.length);
  requestAnimationFrame(animate);
}

animate();
