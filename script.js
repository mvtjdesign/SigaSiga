/**
 * Siga Siga | Interaction System
 * Handles reveals, lighting parallax, and navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Parallax Golden-Hour Glow
    const heroGlow = document.getElementById('hero-glow');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Parallax for the hero glow
        if (heroGlow && scrollY < window.innerHeight) {
            const moveX = scrollY * 0.12;
            const moveY = scrollY * 0.06;
            const scale = 1 + (scrollY * 0.0004);
            heroGlow.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
            heroGlow.style.opacity = Math.max(0, 1 - (scrollY / (window.innerHeight * 0.8)));
        }

        // 3. Navigation State Transition
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrollY > 60) {
                navbar.style.backgroundColor = 'rgba(245, 242, 237, 0.92)';
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.paddingTop = '24px';
                navbar.style.paddingBottom = '24px';
                navbar.style.borderBottom = '1px solid rgba(26, 43, 60, 0.04)';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.paddingTop = '40px';
                navbar.style.paddingBottom = '40px';
                navbar.style.borderBottom = 'none';
            }
        }
    }, { passive: true });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Subtle Tile Parallax (Micro-interaction)
    document.querySelectorAll('.group').forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = tile.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Apply slight shift to children or overlays
            const overlay = tile.querySelector('div');
            if (overlay) {
                overlay.style.transform = `translate(${x * 12}px, ${y * 12}px) scale(1.04)`;
            }
        });

        tile.addEventListener('mouseleave', () => {
            const overlay = tile.querySelector('div');
            if (overlay) {
                overlay.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    });
});
