// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu a');
    let isAnimating = false;

    function toggleMenu() {
        if (isAnimating) return;
        isAnimating = true;

        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

        // Reset animation state after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && 
            !hamburger.contains(event.target) && 
            mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevent body scroll when menu is open
    mobileMenu.addEventListener('wheel', function(e) {
        if (mobileMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            mobileMenu.classList.remove('active');
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Send form data to PHP script
    fetch('send_email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = data.message;
            form.appendChild(successMessage);
            
            // Reset form
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = data.message;
            form.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    })
    .catch(error => {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'An error occurred while sending the message. Please try again later.';
        form.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    })
    .finally(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function validateForm(data) {
    const { name, email, message } = data;
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Name validation
    if (!name || name.trim().length < 2) {
        showError('name', 'Please enter a valid name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!message || message.trim().length < 10) {
        showError('message', 'Please enter a message (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    field.parentNode.appendChild(errorMessage);
    field.classList.add('error');
    
    // Remove error class after user interaction
    field.addEventListener('input', function() {
        field.classList.remove('error');
        errorMessage.remove();
    }, { once: true });
}

// Add scroll event listener for navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Portfolio data
const projects = [
    {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with payment integration and inventory management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
        link: "projects/project1.html",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        features: ["Payment Processing", "Inventory Management", "User Authentication", "Order Tracking"],
        service: "Web Development"
    },
    {
        title: "Social Media Management System",
        description: "A comprehensive social media management platform for content scheduling and analytics.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        link: "projects/project4.html",
        tech: ["Vue.js", "Firebase", "Social Media APIs", "Analytics"],
        features: ["Content Scheduling", "Performance Tracking", "Team Collaboration", "Analytics Dashboard"],
        service: "Social Media Management"
    },
    {
        title: "Brand Video Production",
        description: "Professional video production and editing for a leading fashion brand.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        link: "projects/project5.html",
        tech: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading"],
        features: ["4K Video Production", "Professional Editing", "Color Grading", "Motion Graphics"],
        service: "Video Editing"
    },
    {
        title: "Social Media Marketing Campaign",
        description: "Strategic social media marketing campaign for a lifestyle brand.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        link: "projects/project7.html",
        tech: ["Content Strategy", "Paid Advertising", "Influencer Marketing", "Analytics"],
        features: ["Content Strategy", "Paid Advertising", "Influencer Partnerships", "Performance Analytics"],
        service: "Social Media Marketing"
    }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolioGrid');

// Function to create portfolio items
function createPortfolioItems() {
    projects.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="portfolio-content">
                <span class="service-tag">${project.service}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="portfolio-link">View Project →</a>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createPortfolioItems();
}); 