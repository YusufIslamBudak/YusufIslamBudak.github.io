// assets/js/dynamic-bg.js
(function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'dynamic-bg-canvas';
    // Style it to be fixed in the background
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.4
    });
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            // Primary theme color matching
            this.color = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(88, 166, 255,' : 'rgba(31, 111, 235,';
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            
            // Check theme change dynamically via body background color check or data property but simple is better here
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const baseColor = isDark ? 'rgba(88, 166, 255,' : 'rgba(31, 111, 235,';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = baseColor + this.alpha + ')';
            ctx.fill();
        }
    }
    
    // Init particles
    const numParticles = Math.min(window.innerWidth / 15, 60); // Responsive amount
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        for(let i=0; i<particles.length; i++) {
            for(let j=i; j<particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < 150) {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    const baseColor = isDark ? 'rgba(88, 166, 255,' : 'rgba(31, 111, 235,';
                    ctx.beginPath();
                    ctx.strokeStyle = baseColor + (1 - distance/150) * 0.2 + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(p => p.update());
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
