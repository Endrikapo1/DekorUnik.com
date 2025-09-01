// Modern Elegant JavaScript - Version 2
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    initializeLoadingScreen();
    initializeCustomCursor();
    initializeNavigation();
    initializePortfolioFilter();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeFormHandling();
    initializeThemeToggle();
    initializeWhatsApp();
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading progress
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        
        // Start entrance animations
        startEntranceAnimations();
    }, 2000);
}

function startEntranceAnimations() {
    // Animate header
    const header = document.querySelector('.header');
    header.style.transform = 'translateY(0)';
    header.style.opacity = '1';
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Custom Cursor
function initializeCustomCursor() {
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let dotX = 0;
    let dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot position immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Animate follower cursor
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.background = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.background = 'var(--accent-color)';
        });
    });
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 1000);
                updateActiveNavigation(this);
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavigationOnScroll(sections);
    }, 100));
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

function updateActiveNavigation(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveNavigationOnScroll(sections) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.pageYOffset + headerHeight + 100;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Portfolio Filter
function initializePortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add click effects to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            showProjectModal(this);
        });
    });
}

function showProjectModal(portfolioItem) {
    const image = portfolioItem.querySelector('img');
    const title = portfolioItem.querySelector('h4').textContent;
    const description = portfolioItem.querySelector('p').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-image">
                <img src="${image.src}" alt="${title}">
            </div>
            <div class="modal-info">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-heart"></i>
                        Më Pëlqen
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-share"></i>
                        Ndaj
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Close functionality
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        mobileNavLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('animate-in');
        });
    });
    
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        
        // Reset animations
        mobileNavLinks.forEach(link => {
            link.classList.remove('animate-in');
        });
    });
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animations for child elements
                const children = entry.target.querySelectorAll('[data-stagger]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .about-content').forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 10));
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add floating label effects
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
            }
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    e.target.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.value.trim()) {
            formObject[input.name || input.type] = input.value.trim();
        }
    });
    
    // Show success animation
    showSuccessNotification();
    
    // Reset form
    e.target.reset();
    
    // Remove focused states
    e.target.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused');
    });
}

function showSuccessNotification() {
    const notification = createNotification('Mesazhi u dërgua me sukses! 🎉', 'success');
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
    `;
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    return notification;
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// WhatsApp Integration
function initializeWhatsApp() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    whatsappButton.addEventListener('click', openWhatsApp);
    
    // Add hover effects
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
    });
}

function openWhatsApp() {
    const phoneNumber = '355684842211'; // WhatsApp number
    
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    
    // Create click effect
    const whatsappButton = document.querySelector('.whatsapp-button');
    whatsappButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        whatsappButton.style.transform = 'scale(1.1)';
    }, 150);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Utility Functions
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
    };
}

// Add CSS animations and styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Entrance animations */
    .header {
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.8s ease;
    }
    
    .hero-badge,
    .hero-title,
    .hero-description,
    .hero-actions {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    /* Scroll animations */
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Mobile menu animations */
    .mobile-nav-link {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.3s ease;
    }
    
    .mobile-nav-link.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Project modal */
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .project-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(44, 62, 80, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: white;
        border-radius: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
        transition: transform 0.3s ease;
    }
    
    .project-modal.show .modal-content {
        transform: translate(-50%, -50%) scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-primary);
        z-index: 1;
    }
    
    .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .modal-info {
        padding: 2rem;
    }
    
    .modal-info h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .modal-info p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.7;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .modal-actions .btn {
        flex: 1;
        min-width: 120px;
    }
    
    /* Notification animations */
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    /* Dark theme styles */
    [data-theme="dark"] {
        --background-white: #1a1a1a;
        --background-light: #2d2d2d;
        --text-primary: #ffffff;
        --text-secondary: #b0b0b0;
        --border-color: #404040;
        --shadow-light: rgba(0, 0, 0, 0.3);
        --shadow-medium: rgba(0, 0, 0, 0.4);
    }
    
    [data-theme="dark"] .header {
        background: rgba(26, 26, 26, 0.95);
        border-bottom-color: #404040;
    }
    
    [data-theme="dark"] .mobile-menu {
        background: #1a1a1a;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            max-height: 95%;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;

document.head.appendChild(styleSheet);

// Initialize everything when page loads
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Start any additional animations
    startEntranceAnimations();
});
