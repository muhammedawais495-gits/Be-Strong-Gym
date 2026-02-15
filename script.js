/* ========================================
   JAVASCRIPT FOR BE STRONG GYM WEBSITE
   This file handles all interactive features and animations
======================================== */

// ========================================
// DOCUMENT READY - INITIALIZE ALL FUNCTIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initFormValidation();
    initVideoBackground();
    initCounterAnimation();
});

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon to X
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================
function initSmoothScroll() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS FOR ELEMENTS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ========================================
// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-yellow-400');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-yellow-400');
        }
    });
});

// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================
function initFormValidation() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // If validation passes, show success message
            showNotification('Thank you! We will contact you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-500 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white font-semibold`;
    notification.style.transform = 'translateX(400px)';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ========================================
// VIDEO BACKGROUND MANAGEMENT
// ========================================
function initVideoBackground() {
    const video = document.querySelector('video');
    
    if (video) {
        // Ensure video plays on mobile devices
        video.play().catch(error => {
            console.log('Video autoplay failed:', error);
            // Fallback: show a static background image
            video.parentElement.style.backgroundImage = 'url("gym-background.jpg")';
            video.style.display = 'none';
        });
        
        // Pause video when out of viewport to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        });
        
        videoObserver.observe(video);
    }
}

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.text-4xl.font-bold.text-yellow-400');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with + sign
            const displayValue = Math.floor(current);
            if (element.textContent.includes('+')) {
                element.textContent = displayValue + '+';
            } else {
                element.textContent = displayValue;
            }
        }, stepTime);
    };
    
    // Observe counters and animate when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const target = parseInt(text.replace(/\D/g, ''));
                
                animateCounter(element, target);
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ========================================
// PARALLAX EFFECT FOR SECTIONS
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.timing-card, .facility-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 100);
        // Subtle parallax effect
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ========================================
// DYNAMIC PACKAGE CARD HIGHLIGHTING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 0 40px rgba(250, 204, 21, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '';
        });
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
// Create scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'fixed bottom-8 right-8 bg-yellow-400 text-black w-12 h-12 rounded-full shadow-2xl z-40 opacity-0 transition-all duration-300 hover:bg-yellow-500 hover:scale-110';
    button.style.pointerEvents = 'none';
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// ========================================
// TYPING EFFECT FOR HERO HEADING (OPTIONAL)
// ========================================
function typingEffect() {
    const text = "TRANSFORM YOUR BODY";
    const element = document.querySelector('h1');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Uncomment to enable typing effect
    // type();
}

// ========================================
// CURSOR FOLLOW EFFECT (OPTIONAL)
// ========================================
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-50 transition-transform duration-100';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Enlarge cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .package-card, .facility-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Uncomment to enable cursor effect (works best on desktop)
// initCursorEffect();

// ========================================
// PERFORMANCE MONITORING
// ========================================
// Log page load time
window.addEventListener('load', function() {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log('Page loaded in ' + loadTime + 'ms');
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🏋️ Welcome to Be Strong Gym! 💪', 'font-size: 20px; color: #facc15; font-weight: bold;');
console.log('%cTransform Your Body, Transform Your Life!', 'font-size: 14px; color: #fff;');

// ========================================
// END OF JAVASCRIPT
// ========================================
