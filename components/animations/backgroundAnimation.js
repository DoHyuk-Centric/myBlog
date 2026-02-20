export function initBackgroundAnimation() {
  const container = document.querySelector('.background-Animation');
  if (!container) return;

  // Make sure container spans full width/height of its parent and limits particles
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden';
  container.style.zIndex = '1';

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 300; // Adjust for density
  
  // Try to find the section wrapper for better mouse interaction boundaries
  const section = container.closest('header') || container.parentElement;

  let mouse = {
    x: null,
    y: null,
    radius: 150
  };

  // Color sequence: Red, Orange, Yellow, Green, Blue, Purple
  const colorStops = [
    { r: 255, g: 0, b: 0 },       // Red
    { r: 255, g: 165, b: 0 },     // Orange
    { r: 255, g: 255, b: 0 },     // Yellow
    { r: 0, g: 128, b: 0 },       // Green
    { r: 0, g: 0, b: 255 },       // Blue
    { r: 128, g: 0, b: 128 }      // Purple
  ];

  let currentGlobalColor = { ...colorStops[0] };
  let colorProgress = 0;
  const colorSpeed = 0.005; // How fast colors transition globally

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function updateGlobalColor() {
    colorProgress += colorSpeed;
    const maxIndex = colorStops.length;
    
    // Which segment of the color track are we in?
    const floatIndex = colorProgress % maxIndex;
    const startIndex = Math.floor(floatIndex);
    const endIndex = (startIndex + 1) % maxIndex;
    
    // Progress within the current segment
    const segmentProgress = floatIndex - startIndex;

    currentGlobalColor.r = lerp(colorStops[startIndex].r, colorStops[endIndex].r, segmentProgress);
    currentGlobalColor.g = lerp(colorStops[startIndex].g, colorStops[endIndex].g, segmentProgress);
    currentGlobalColor.b = lerp(colorStops[startIndex].b, colorStops[endIndex].b, segmentProgress);
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      
      // Wind-like fluid movement
      this.baseVx = (Math.random() - 0.5) * 1.5;
      this.baseVy = (Math.random() - 0.5) * 1.5;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      
      this.density = (Math.random() * 30) + 1;
      
      // Individual offset for wind noise or organic feel
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() * 0.02) - 0.01;
    }

    update() {
      // Wind-like organic base movement
      this.angle += this.angleSpeed;
      this.x += this.vx + Math.cos(this.angle) * 0.5;
      this.y += this.vy + Math.sin(this.angle) * 0.5;

      // Mouse interaction
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let force = (mouse.radius - distance) / mouse.radius;

        if (distance < mouse.radius) {
          // Push away based on density
          this.x -= forceDirectionX * force * this.density;
          this.y -= forceDirectionY * force * this.density;
        } else {
          // Slow return to normal speed
          this.vx = this.baseVx;
          this.vy = this.baseVy;
        }
      }

      // Bound checking within container
      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;
      
      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;
    }

    draw() {
      // Small variation on global color per particle
      const r = Math.min(255, Math.max(0, currentGlobalColor.r + (Math.sin(this.angle)*20)));
      const g = Math.min(255, Math.max(0, currentGlobalColor.g + (Math.cos(this.angle)*20)));
      const b = Math.min(255, Math.max(0, currentGlobalColor.b + (Math.sin(this.angle+Math.PI)*20)));

      ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.6)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    // Clear canvas with trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Adjust alpha for longer/shorter trails
    ctx.fillRect(0, 0, width, height);
    
    updateGlobalColor();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    // Connect particles if they are close (adds to the "air flow" web look)
    connect();

    requestAnimationFrame(animate);
  }
  
  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = dx * dx + dy * dy;
        
        // Number below dictates how close to draw lines (lowered for performance and look)
        if (distance < (width/10) * (height/10)) {
          opacityValue = 1 - (distance / 10000);
          
          if (opacityValue > 0) {
              ctx.strokeStyle = `rgba(${Math.round(currentGlobalColor.r)}, ${Math.round(currentGlobalColor.g)}, ${Math.round(currentGlobalColor.b)}, ${opacityValue * 0.2})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
          }
        }
      }
    }
  }

  // Handle Mouse Events relative to the container
  section.addEventListener('mousemove', function(event) {
    const rect = container.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });

  section.addEventListener('mouseleave', function() {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  init();
  animate();
}
