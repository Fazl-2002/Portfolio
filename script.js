// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const currentYearSpan = document.getElementById('currentYear');
const typingTextElement = document.querySelector('.typing-text');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navContainer = document.querySelector('.nav-container');

// Typing Effect Variables
const typingTexts = [
    "UI/UX DESIGNER.",
    "FULL-STACK DEVELOPER.",
    "GRAPHIC DESIGNER.",
    "DATA SCIENTIST.",
    "NATURE PAINTER.",
    "CREATIVE PROBLEM SOLVER."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update button state
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (theme === 'light') {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    } else {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    }
}

// Typing Effect
function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing text
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Check if text is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of typing
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navContainer.classList.remove('mobile-open');
                }
            }
        });
    });
}

// Set Active Nav Link on Scroll
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        navContainer.classList.toggle('mobile-open');
        
        // Toggle between hamburger and close icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navContainer.classList.contains('mobile-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            // Show nav links in mobile
            const navLinksContainer = document.querySelector('.nav-links');
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '100%';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.background = 'var(--glass-bg)';
            navLinksContainer.style.backdropFilter = 'blur(20px)';
            navLinksContainer.style.padding = '2rem';
            navLinksContainer.style.borderRadius = '0 0 30px 30px';
            navLinksContainer.style.borderTop = '1px solid var(--glass-border)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Hide nav links
            document.querySelector('.nav-links').style.display = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && navContainer.classList.contains('mobile-open')) {
            navContainer.classList.remove('mobile-open');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.querySelector('.nav-links').style.display = 'none';
        }
    });
}

// Animate Skill Bars on Scroll
function initSkillBarAnimation() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.setProperty('--width', width);
                bar.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Update Copyright Year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
}

// Initialize Floating Elements Animation
function initFloatingAnimations() {
    // Add random animation delays to floating blobs
    const blobs = document.querySelectorAll('.floating-blob');
    blobs.forEach((blob, index) => {
        blob.style.animationDelay = `${index * 5}s`;
    });
}

// Initialize Everything
function init() {
    // Set current year
    updateCopyrightYear();
    
    // Initialize theme
    initTheme();
    
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Initialize navigation
    initSmoothScroll();
    initScrollSpy();
    initMobileMenu();
    
    // Initialize animations
    initSkillBarAnimation();
    initFloatingAnimations();
    
    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && document.querySelector('.nav-links').style.display === 'none') {
            document.querySelector('.nav-links').style.display = 'flex';
        }
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-container.mobile-open {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 1rem;
        }
        
        .nav-container.mobile-open .nav-links {
            display: flex !important;
            flex-direction: column;
            width: 100%;
            margin-top: 1rem;
        }
        
        .nav-container.mobile-open .nav-link {
            padding: 0.8rem 0;
            font-size: 1.1rem;
        }
        
        .nav-container.mobile-open .nav-actions {
            position: absolute;
            right: 2rem;
            top: 1.2rem;
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);