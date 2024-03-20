import { createCanvas } from 'canvas';
import Color from 'color';
import seedrandom from 'seedrandom';

class ParticleGenerator {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.options = options;
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticles();
    requestAnimationFrame(this.animate.bind(this));
  }

  createParticles() {
    for (let i = 0; i < this.options.count || 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 5,
        color: new Color(`hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`).string(),
        speedX: seedrandom()() * 2 - 1,
        speedY: seedrandom()() * 2 - 1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(particle => {
      this.drawParticle(particle);
      this.updateParticle(particle);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  drawParticle(particle) {
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  updateParticle(particle) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
  }
}

export default ParticleGenerator;
