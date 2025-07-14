// Smooth Scroll with Inertia (Desktop Only)
class SmoothScroll {
    constructor() {
        if (window.innerWidth <= 768) return;
        
        this.wrapper = document.getElementById('smooth-wrapper');
        this.content = document.getElementById('smooth-content');
        this.height = 0;
        this.scrollY = 0;
        this.targetY = 0;
        this.ease = 0.08;
        
        this.init();
    }
    
    init() {
        this.setHeight();
        this.bindEvents();
        this.render();
    }
    
    setHeight() {
        this.height = this.content.offsetHeight;
        document.body.style.height = this.height + 'px';
    }
    
    bindEvents() {
        window.addEventListener('scroll', () => {
            this.targetY = window.pageYOffset;
        });
        
        window.addEventListener('resize', () => {
            this.setHeight();
        });
    }
    
    render() {
        this.scrollY += (this.targetY - this.scrollY) * this.ease;
        this.content.style.transform = `translateY(-${this.scrollY}px)`;
        
        requestAnimationFrame(() => this.render());
    }
}

// Enhanced Custom Cursor
class EnhancedCursor {
    constructor() {
        if (window.innerWidth <= 768) return;
        
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.ripple = document.querySelector('.cursor-ripple');
        
        if (!this.cursor || !this.follower || !this.ripple) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.rippleX = 0;
        this.rippleY = 0;
        
        this.init();
    }
    
    init() {
        if (!this.cursor) return;
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        });
        
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
        
        // Magnetic effect for buttons
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('magnetic');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('magnetic');
            });
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.3;
                    const moveY = y * force * 0.3;
                    
                    this.cursor.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.5)`;
                }
            });
        });
        
        // Hover effects
        document.querySelectorAll('a, button, .portfolio-item, .service-card, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover', 'magnetic');
                this.follower.classList.remove('hover');
                this.cursor.style.transform = '';
            });
        });
    }
    
    createRipple(x, y) {
        this.ripple.style.left = x + 'px';
        this.ripple.style.top = y + 'px';
        this.ripple.style.opacity = '1';
        this.ripple.style.transform = 'scale(1)';
        
        setTimeout(() => {
            this.ripple.style.opacity = '0';
            this.ripple.style.transform = 'scale(0)';
        }, 600);
    }
    
    render() {
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        this.rippleX += (this.mouseX - this.rippleX) * 0.05;
        this.rippleY += (this.mouseY - this.rippleY) * 0.05;
        
        this.follower.style.left = this.followerX + 'px';
        this.follower.style.top = this.followerY + 'px';
        this.ripple.style.left = this.rippleX + 'px';
        this.ripple.style.top = this.rippleY + 'px';
        
        requestAnimationFrame(() => this.render());
    }
}

// Canvas Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas || window.innerWidth <= 768) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        if (!this.canvas) return;
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00d4ff' : '#ff6b6b'
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach(otherParticle => {
                const dx2 = particle.x - otherParticle.x;
                const dy2 = particle.y - otherParticle.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (distance2 < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (100 - distance2) / 100 * 0.2;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 3D Tilt Effect
class TiltEffect {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.setProperty('--tilt-x', rotateX + 'deg');
                card.style.setProperty('--tilt-y', rotateY + 'deg');
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            });
        });
    }
}



// Enhanced Preloader
let loadingProgress = 0;
const progressBar = document.querySelector('.loading-progress');

function updateProgress() {
    loadingProgress += Math.random() * 15;
    if (loadingProgress > 100) loadingProgress = 100;
    
    if (progressBar) {
        progressBar.style.width = loadingProgress + '%';
    }
    
    if (loadingProgress < 100) {
        setTimeout(updateProgress, 100);
    } else {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            preloader.style.transform = 'scale(0.8)';
            setTimeout(() => {
                preloader.style.display = 'none';
                initializeWebsite();
            }, 800);
        }, 500);
    }
}

function initializeWebsite() {
    try {
        // Initialize systems based on device
        if (window.innerWidth > 768) {
            new SmoothScroll();
            new EnhancedCursor();
            new ParticleSystem();
        }
        
        new TiltEffect();
        initHeroAnimations();
    } catch (error) {
        console.log('Some features may not be available');
        initHeroAnimations();
    }
}

window.addEventListener('load', () => {
    setTimeout(updateProgress, 500);
});

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Split Text Animation
class SplitTextAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            type: 'words', // 'words' or 'chars'
            delay: 100,
            duration: 800,
            ...options
        };
        
        this.init();
    }
    
    init() {
        const text = this.element.textContent;
        this.element.innerHTML = '';
        
        if (this.options.type === 'words') {
            const words = text.split(' ');
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                span.style.transition = `all ${this.options.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                
                this.element.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, index * this.options.delay);
            });
        } else {
            const chars = text.split('');
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(30px) rotateX(90deg)';
                span.style.transition = `all ${this.options.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                
                this.element.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * (this.options.delay / 2));
            });
        }
    }
}

// Hero Section Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    // Split text animation for title
    if (heroTitle) {
        new SplitTextAnimation(heroTitle, {
            type: 'words',
            delay: 150,
            duration: 1000
        });
    }
    
    // Subtitle animation
    if (subtitle) {
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 1000);
    }
    
    // CTA button animation
    if (ctaButton) {
        setTimeout(() => {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'translateY(0)';
        }, 1200);
    }
}

// Enhanced Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => {
                entry.target.classList.add('animate');
                
                // Trigger counter animation
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter) animateCounter(counter);
                }
            }, delay);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .portfolio-item, .section-title, .stat-item, .fade-up, .fade-left, .fade-right, .scale-up'
    );
    animateElements.forEach(el => observer.observe(el));
    
    // Footer animation
    const footer = document.querySelector('.footer');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up-footer');
            }
        });
    }, { threshold: 0.1 });
    
    if (footer) footerObserver.observe(footer);
});

// Animated Counters
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Enhanced Testimonials slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Add exit animation to current testimonial
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active', 'exit');
        dots[i].classList.remove('active');
        
        if (i === currentTestimonial && i !== index) {
            testimonial.classList.add('exit');
        }
    });
    
    // Show new testimonial with entrance animation
    setTimeout(() => {
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }, 300);
}

function currentSlide(index) {
    if (index - 1 !== currentTestimonial) {
        const oldIndex = currentTestimonial;
        currentTestimonial = index - 1;
        showTestimonial(currentTestimonial);
    }
}

// Auto-slide testimonials with enhanced transitions
setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    currentTestimonial = nextIndex;
    showTestimonial(currentTestimonial);
}, 6000);

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (!nameField || !emailField || !subjectField || !messageField) {
            alert('Form error. Please refresh the page.');
            return;
        }
        
        // Get form data
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Form input animations with mobile optimization
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        
        // Prevent zoom on mobile
        if (isMobile()) {
            input.style.fontSize = '16px';
        }
    });
    
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.parentElement.classList.remove('focused');
        }
        
        // Reset font size
        if (isMobile()) {
            input.style.fontSize = '';
        }
    });
    
    // Check if input has value on load
    if (input.value.trim()) {
        input.parentElement.classList.add('focused');
    }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function openModal(projectId) {
    if (!modal || !modalBody) return;
    const projectData = {
        project1: {
            title: 'E-commerce Platform',
            description: 'A modern, responsive e-commerce platform built with cutting-edge technologies.',
            features: [
                'Responsive design for all devices',
                'Secure payment integration',
                'Advanced search and filtering',
                'Real-time inventory management',
                'Customer review system'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API']
        },
        project2: {
            title: 'Fitness Mobile App',
            description: 'A comprehensive fitness tracking application for iOS and Android.',
            features: [
                'Workout tracking and planning',
                'Nutrition monitoring',
                'Progress analytics',
                'Social features and challenges',
                'Wearable device integration'
            ],
            technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit']
        },
        project3: {
            title: 'SaaS Dashboard',
            description: 'An intuitive analytics dashboard for business intelligence.',
            features: [
                'Real-time data visualization',
                'Custom report generation',
                'Multi-user collaboration',
                'API integrations',
                'Advanced filtering and search'
            ],
            technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL']
        },
        project4: {
            title: 'Food Delivery App',
            description: 'On-demand food delivery platform connecting restaurants and customers.',
            features: [
                'Real-time order tracking',
                'Multiple payment options',
                'Restaurant management system',
                'Delivery route optimization',
                'Customer rating system'
            ],
            technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe']
        }
    };
    
    const project = projectData[projectId];
    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p style="margin: 20px 0; color: #666; line-height: 1.6;">${project.description}</p>
            
            <h3 style="color: #333; margin: 25px 0 15px 0;">Key Features:</h3>
            <ul style="margin: 0 0 25px 20px; color: #666;">
                ${project.features.map(feature => `<li style="margin: 8px 0;">${feature}</li>`).join('')}
            </ul>
            
            <h3 style="color: #333; margin: 25px 0 15px 0;">Technologies Used:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${project.technologies.map(tech => `
                    <span style="background: linear-gradient(45deg, #00d4ff, #0099cc); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">${tech}</span>
                `).join('')}
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Advanced Multi-layer Parallax
class AdvancedParallax {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Register parallax elements
        this.addElement('.hero-bg-animation', -0.5);
        this.addElement('.orb-1', 0.3, 0.1);
        this.addElement('.orb-2', -0.2, -0.1);
        this.addElement('.floating-shapes', 0.1);
        
        this.bindEvents();
    }
    
    addElement(selector, speedY, speedX = 0) {
        const element = document.querySelector(selector);
        if (element) {
            this.elements.push({
                element,
                speedY,
                speedX,
                initialY: 0,
                initialX: 0
            });
        }
    }
    
    bindEvents() {
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(item => {
                const yPos = scrolled * item.speedY;
                const xPos = scrolled * item.speedX;
                
                item.element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            });
        };
        
        // Use requestAnimationFrame for smooth parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// ScrollTrigger-like Effects
class ScrollTrigger {
    constructor() {
        this.triggers = [];
        this.init();
    }
    
    init() {
        // Pin sections
        this.addPin('.services', { start: 'top center', end: 'bottom center' });
        
        // Reveal animations
        this.addReveal('.section-title', { animation: 'fadeUp', stagger: 0.2 });
        this.addReveal('.feature-card', { animation: 'slideUp', stagger: 0.1 });
        
        this.bindEvents();
    }
    
    addPin(selector, options) {
        const element = document.querySelector(selector);
        if (element) {
            this.triggers.push({
                element,
                type: 'pin',
                options
            });
        }
    }
    
    addReveal(selector, options) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            this.triggers.push({
                element,
                type: 'reveal',
                options: { ...options, delay: index * (options.stagger || 0) }
            });
        });
    }
    
    bindEvents() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const trigger = this.triggers.find(t => t.element === entry.target);
                    if (trigger && trigger.type === 'reveal') {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, trigger.options.delay * 1000);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        this.triggers.forEach(trigger => {
            if (trigger.type === 'reveal') {
                observer.observe(trigger.element);
            }
        });
    }
}

// Add loading animation to CTA button
document.querySelector('.cta-button').addEventListener('click', function() {
    const button = this;
    const originalText = button.textContent;
    
    button.textContent = 'Loading...';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.pointerEvents = 'auto';
        
        // Scroll to about section
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1000);
});

// Enhanced Micro Interactions with Mobile Support
document.querySelectorAll('.service-card').forEach(card => {
    // Desktop hover effects
    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    } else {
        // Mobile tap interactions
        card.addEventListener('touchstart', () => {
            card.classList.toggle('active');
        });
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            card.classList.toggle('active');
        });
    }
});

// Magnetic effect for buttons
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Enhanced button click effects
document.querySelectorAll('button, .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced number animation with easing
function animateNumbers() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (!counter.dataset.animated) {
            animateCounter(counter);
            counter.dataset.animated = 'true';
        }
    });
}

// Intersection observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.dataset.animated) {
                animateCounter(counter);
                counter.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat items for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => counterObserver.observe(item));
});

// Section Transitions
function createSectionTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #00d4ff, #667eea);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
    
    overlay.style.opacity = '1';
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }, 150);
}

// Enhanced navigation with transitions
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            createSectionTransition();
            
            setTimeout(() => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 150);
        }
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Stagger animations with data-delay
    const elementsWithDelay = document.querySelectorAll('[data-delay]');
    elementsWithDelay.forEach(el => {
        const delay = parseInt(el.dataset.delay);
        el.style.transitionDelay = delay + 'ms';
    });
    
    // Initialize smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Enhanced typing effect with cursor
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor at the end
            element.innerHTML += '<span class="typing-cursor">|</span>';
        }
    }
    
    type();
}

// Add typing cursor styles
const typingStyle = document.createElement('style');
typingStyle.textContent = `
    .typing-cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(typingStyle);

// Performance optimization: Debounce and Throttle
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer with mobile optimization
function createOptimizedObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: isMobile() ? 0.05 : 0.1,
        rootMargin: isMobile() ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Mobile-friendly scroll detection
function initMobileScrollOptimizations() {
    if (isMobile()) {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                
                .parallax-layer {
                    transform: none !important;
                }
                
                .floating-shape {
                    animation-duration: 8s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize mobile scroll optimizations
document.addEventListener('DOMContentLoaded', initMobileScrollOptimizations);

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttle to scroll events for better performance
const throttledScrollHandler = throttle(() => {
    // Additional scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Mobile Detection and Optimization
const isMobile = () => {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Mobile-specific optimizations
function initMobileOptimizations() {
    if (isMobile()) {
        // Disable smooth scroll on mobile
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Add touch-friendly classes
        document.body.classList.add('mobile-device');
        
        // Optimize viewport for mobile
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Prevent zoom on input focus
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            });
        });
    }
}

// Touch interactions for mobile
function initTouchInteractions() {
    if (isTouchDevice()) {
        // Add touch feedback to buttons
        document.querySelectorAll('button, .btn, .nav-link').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
        
        // Swipe gestures for testimonials
        let startX = 0;
        let startY = 0;
        const testimonialSlider = document.querySelector('.testimonials-slider');
        
        if (testimonialSlider) {
            testimonialSlider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            testimonialSlider.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                // Only trigger swipe if horizontal movement is greater than vertical
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe left - next testimonial
                        const nextIndex = (currentTestimonial + 1) % testimonials.length;
                        currentSlide(nextIndex + 1);
                    } else {
                        // Swipe right - previous testimonial
                        const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
                        currentSlide(prevIndex + 1);
                    }
                }
            });
        }
    }
}

// Initialize all animations with mobile considerations
function initAllAnimations() {
    // Set initial states for animated elements
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up');
    animatedElements.forEach(el => {
        const duration = isMobile() ? '0.6s' : '0.8s';
        el.style.transition = `all ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    });
    
    // Initialize magnetic buttons only on desktop
    if (!isMobile()) {
        document.querySelectorAll('.cta-button, .service-btn, .portfolio-btn').forEach(btn => {
            btn.classList.add('magnetic');
        });
    }
    
    // Initialize advanced systems based on device
    if (!isMobile()) {
        new AdvancedParallax();
        new ScrollTrigger();
    }
    
    // Initialize mobile-specific features
    initMobileOptimizations();
    initTouchInteractions();
}

// Responsive resize handler
function handleResize() {
    // Reinitialize features based on new screen size
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}

// Call initialization
document.addEventListener('DOMContentLoaded', initAllAnimations);
window.addEventListener('resize', debounce(handleResize, 250));

// Add smooth reveal for images when they come into view
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.1 });

// Observe images for lazy reveal
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img, .portfolio-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'all 0.6s ease';
        imageObserver.observe(img);
    });
});

// Add page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Preload critical animations
function preloadAnimations() {
    const criticalElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadAnimations);