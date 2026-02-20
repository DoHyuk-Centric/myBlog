export function initGravityButton() {
  const btn = document.getElementById('gravityBtn');
  const container = document.getElementById('gravityContainer');

  if (!btn || !container) return;

  // Configuration
  const gravity = 0.5;
  const bounceFactor = 0.6; // Energy retained when bouncing
  const friction = 0.98; // Air friction to slow down horizontally and vertically

  // State
  let x = btn.offsetLeft;
  let y = btn.offsetTop;
  let vx = 0;
  let vy = 0;
  let isDragging = false;
  let isInitialized = false;

  // Drag state
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastTime = 0;

  function initializePosition() {
    if (isInitialized) return;
    
    // Convert right-based positioning to absolute left-based for easier physics
    x = btn.offsetLeft;
    y = btn.offsetTop;
    
    btn.style.right = 'auto';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    
    isInitialized = true;
  }

  function update() {
    if (!isDragging && isInitialized) {
      // Apply gravity
      vy += gravity;

      // Apply friction
      vx *= friction;
      vy *= friction;

      // Update position
      x += vx;
      y += vy;

      // Collision detection with container boundaries
      const bounds = container.getBoundingClientRect();
      const btnBounds = btn.getBoundingClientRect();
      const maxX = bounds.width - btnBounds.width;
      const maxY = bounds.height - btnBounds.height;

      // Bottom
      if (y > maxY) {
        y = maxY;
        vy = -vy * bounceFactor;
        // Stop tiny bounces
        if (Math.abs(vy) < 1) vy = 0;
        
        // Add ground friction
        vx *= 0.9;
      }
      
      // Top
      if (y < 0) {
        y = 0;
        vy = -vy * bounceFactor;
      }

      // Right
      if (x > maxX) {
        x = maxX;
        vx = -vx * bounceFactor;
      }
      
      // Left
      if (x < 0) {
        x = 0;
        vx = -vx * bounceFactor;
      }

      // Apply position
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    }

    requestAnimationFrame(update);
  }

  // Handle Dragging
  function pointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return; // Only left click empty

    initializePosition();
    e.preventDefault();
    isDragging = true;
    
    // Stop squish animation on drag by using JS class toggle instead if necessary, 
    // but clearing it can help let Tailwind handle it.
    btn.classList.remove('hover:animate-[squish_0.9s_ease-in-out]');
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Calculate offset inside the button
    const rect = btn.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    lastMouseX = clientX;
    lastMouseY = clientY;
    lastTime = performance.now();

    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);
    window.addEventListener('touchmove', pointerMove, { passive: false });
    window.addEventListener('touchend', pointerUp);
  }

  function pointerMove(e) {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling on mobile

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    // Calculate new position relative to container
    let newX = clientX - containerRect.left - dragOffsetX;
    let newY = clientY - containerRect.top - dragOffsetY;
    
    // Keep inside bounds while dragging
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    x = Math.max(0, Math.min(newX, maxX));
    y = Math.max(0, Math.min(newY, maxY));
    
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    // Calculate throw velocity
    const currentTime = performance.now();
    const dt = currentTime - lastTime;
    
    if (dt > 0) {
      // Scale velocity up slightly for feeling
      vx = (clientX - lastMouseX) / dt * 15;
      vy = (clientY - lastMouseY) / dt * 15;
    } else {
      vx = 0;
      vy = 0;
    }
    
    lastMouseX = clientX;
    lastMouseY = clientY;
    lastTime = currentTime;
  }

  function pointerUp() {
    isDragging = false;
    
    // Restore the squish animation 
    btn.classList.add('hover:animate-[squish_0.9s_ease-in-out]');
    btn.style.animation = '';
    
    window.removeEventListener('mousemove', pointerMove);
    window.removeEventListener('mouseup', pointerUp);
    window.removeEventListener('touchmove', pointerMove);
    window.removeEventListener('touchend', pointerUp);
  }


  function start() {
    initializePosition();
    requestAnimationFrame(update);
  }

  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start);
  }

  btn.addEventListener('mousedown', pointerDown);
  btn.addEventListener('touchstart', pointerDown, { passive: false });
}
