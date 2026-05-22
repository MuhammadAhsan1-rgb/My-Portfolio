// script.js - Full Stack Developer Portfolio
// Mobile menu toggle, smooth scroll, contact form handler, and dynamic interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            // Change icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside (optional, improves UX)
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ========== 2. SMOOTH SCROLLING FOR NAVIGATION LINKS ==========
    // Select all anchor links that start with #
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== 3. CONTACT FORM HANDLER (with validation & feedback) ==========
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageTextarea = contactForm.querySelector('textarea');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageTextarea ? messageTextarea.value.trim() : '';
            
            // Simple validation
            if (name === '') {
                showFormFeedback('❌ Please enter your name.', 'error');
                highlightField(nameInput, true);
                return;
            }
            
            if (email === '') {
                showFormFeedback('❌ Please enter your email address.', 'error');
                highlightField(emailInput, true);
                return;
            }
            
            // Basic email regex
            const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
            if (!emailRegex.test(email)) {
                showFormFeedback('❌ Please enter a valid email address (e.g., name@example.com).', 'error');
                highlightField(emailInput, true);
                return;
            }
            
            if (message === '') {
                showFormFeedback('❌ Please write a message.', 'error');
                highlightField(messageTextarea, true);
                return;
            }
            
            // If all validations pass
            showFormFeedback('✅ Thank you, ' + name + '! Your message has been sent. (Demo simulation)', 'success');
            
            // Reset form fields
            contactForm.reset();
            
            // Remove any red highlights after success
            [nameInput, emailInput, messageTextarea].forEach(field => {
                if (field) highlightField(field, false);
            });
            
            // Optional: log to console for debugging
            console.log(`Message from ${name} (${email}): ${message}`);
        });
        
        // Remove error highlight on focus
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                highlightField(this, false);
                if (formFeedback) formFeedback.textContent = '';
            });
        });
    }
    
    // Helper: show form feedback with styling
    function showFormFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.textContent = message;
        formFeedback.style.color = type === 'error' ? '#dc2626' : '#16a34a';
        formFeedback.style.fontWeight = '500';
        formFeedback.style.marginTop = '0.8rem';
        
        // Auto clear after 5 seconds
        setTimeout(() => {
            if (formFeedback.textContent === message) {
                formFeedback.textContent = '';
            }
        }, 5000);
    }
    
    // Helper: highlight field border on error
    function highlightField(field, isError) {
        if (!field) return;
        if (isError) {
            field.style.borderColor = '#dc2626';
            field.style.backgroundColor = '#fef2f2';
        } else {
            field.style.borderColor = '#e2e8f0';
            field.style.backgroundColor = '';
        }
    }
    
    // ========== 4. ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavOnScroll() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active-nav');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active-nav');
            }
        });
    }
    
    // Add extra style for active link (CSS class)
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active-nav {
            color: #3b82f6 !important;
            font-weight: 700;
            position: relative;
        }
        .nav-links a.active-nav::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 100%;
            height: 2px;
            background: #3b82f6;
            border-radius: 2px;
        }
        @media (max-width: 768px) {
            .nav-links a.active-nav::after {
                bottom: -4px;
            }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll(); // initial call
    
    // ========== 5. PROFILE IMAGE PLACEHOLDER HANDLER ==========
    // If the profile image fails to load (user hasn't added actual image yet),
    // show a subtle background or fallback message but keep layout intact.
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Instead of broken icon, set a gradient or default avatar
            this.style.objectFit = 'cover';
            this.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            this.style.opacity = '0.9';
            // optional: add a default icon but keep the note visible.
            this.alt = "Developer portrait - add your image";
            const parentNote = document.querySelector('.image-note');
            if (parentNote) {
                parentNote.style.background = '#fff3bf';
                parentNote.innerHTML = '🖼️ Add your photo: replace "profile-placeholder.jpg"';
            }
        });
    }
    
    // ========== 6. ADD DYNAMIC YEAR IN FOOTER (optional future-proof) ==========
    const footerYear = document.querySelector('.footer-content p');
    if (footerYear && !footerYear.innerHTML.includes('2026')) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
    
    // ========== 7. PROJECT CARD INTERACTION: subtle hover log (dev friendly) ==========
    const projectCard = document.querySelector('.project-card-large');
    if (projectCard) {
        projectCard.addEventListener('mouseenter', () => {
            // just a playful effect - no console spam, but adds micro-interaction feel
            projectCard.style.transition = 'transform 0.2s ease, box-shadow 0.3s';
        });
    }
    
    // ========== 8. SCROLL REVEAL (lightweight) ==========
    // Add a fade-up animation on scroll for skill cards, edu, etc.
    const fadeElements = document.querySelectorAll('.skill-card, .edu-card, .project-card-large, .contact-grid > *');
    
    function checkFadeIn() {
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 80) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // set initial hidden styles
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn);
    checkFadeIn(); // immediate trigger
    
    // ========== 9. BONUS: Tailwind CSS version badge (just info in console) ==========
    console.log('✅ Portfolio loaded | Tailwind CSS 3.4.17 ready | Frontend: HTML5, CSS3, React JS ready');
    
    // ========== 10. Handle any external github/demo links (prevent default empty) ==========
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        const hrefValue = link.getAttribute('href');
        if (hrefValue === '#' || hrefValue === '' || hrefValue === '#0') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // provide small user-friendly alert or console message
                const feedbackMsg = document.createElement('span');
                feedbackMsg.textContent = '🔧 Live demo link will be added soon!';
                feedbackMsg.style.position = 'fixed';
                feedbackMsg.style.bottom = '20px';
                feedbackMsg.style.left = '50%';
                feedbackMsg.style.transform = 'translateX(-50%)';
                feedbackMsg.style.backgroundColor = '#0f172a';
                feedbackMsg.style.color = 'white';
                feedbackMsg.style.padding = '8px 16px';
                feedbackMsg.style.borderRadius = '40px';
                feedbackMsg.style.fontSize = '0.8rem';
                feedbackMsg.style.zIndex = '999';
                feedbackMsg.style.fontWeight = '500';
                document.body.appendChild(feedbackMsg);
                setTimeout(() => {
                    feedbackMsg.remove();
                }, 2000);
            });
        }
    });
});