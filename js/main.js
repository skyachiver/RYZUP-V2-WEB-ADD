// Smooth Professional Cursor Effect
document.addEventListener("DOMContentLoaded", function() {
    
    // CRITICAL FIX: Force correct grid layout for services cards
    function fixServicesGrid() {
        const servicesGrid = document.querySelector('.services-grid');
        
        if (servicesGrid) {
            const screenWidth = window.innerWidth;
            
            // Detect Chrome browser
            const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            
            // Large Desktop: 6 columns
            if (screenWidth >= 1200) {
                servicesGrid.style.display = 'grid';
                servicesGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
                servicesGrid.style.gridAutoRows = '1fr';
                servicesGrid.style.alignItems = 'stretch';
                servicesGrid.style.gap = '20px';
                servicesGrid.style.width = '100%';
                
                // Chrome-specific fix
                if (isChrome) {
                    servicesGrid.style.gridAutoFlow = 'row';
                    const cards = servicesGrid.querySelectorAll('.service-card');
                    cards.forEach(card => {
                        card.style.minWidth = '0';
                        card.style.minHeight = '0';
                    });
                }
            }
            // Small Desktop/Laptop: 3 columns (2 rows)
            else if (screenWidth >= 1025 && screenWidth < 1200) {
                servicesGrid.style.display = 'grid';
                servicesGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                servicesGrid.style.gridAutoRows = '1fr';
                servicesGrid.style.alignItems = 'stretch';
                servicesGrid.style.gap = '22px';
                servicesGrid.style.width = '100%';
                
                // Chrome-specific fix
                if (isChrome) {
                    servicesGrid.style.gridAutoFlow = 'row';
                    const cards = servicesGrid.querySelectorAll('.service-card');
                    cards.forEach(card => {
                        card.style.minWidth = '0';
                        card.style.minHeight = '0';
                    });
                }
            }
            // Tablet: 3 columns (2 rows)
            else if (screenWidth >= 769 && screenWidth < 1025) {
                servicesGrid.style.display = 'grid';
                servicesGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                servicesGrid.style.gridAutoRows = '1fr';
                servicesGrid.style.alignItems = 'stretch';
                servicesGrid.style.gap = '25px';
            }
            // Mobile Landscape: 2 columns
            else if (screenWidth >= 601 && screenWidth <= 768) {
                servicesGrid.style.display = 'grid';
                servicesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                servicesGrid.style.gridAutoRows = 'auto';
                servicesGrid.style.alignItems = 'start';
                servicesGrid.style.gap = '20px';
            }
            // Mobile Portrait: 1 column
            else if (screenWidth <= 600) {
                servicesGrid.style.display = 'grid';
                servicesGrid.style.gridTemplateColumns = '1fr';
                servicesGrid.style.gridAutoRows = 'auto';
                servicesGrid.style.alignItems = 'start';
                servicesGrid.style.gap = '20px';
            }
        }
    }
    
    // Apply fix immediately and on resize
    fixServicesGrid();
    window.addEventListener('resize', fixServicesGrid);
    
    // Check if device supports touch (more precise detection)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768; // Only hide on actual mobile devices
    
    // Disable cursor only on actual touch devices and mobile screens
    if (isTouchDevice && isMobile) {
        const cursorElements = document.querySelectorAll("[data-cursor-dot], [data-cursor-outline]");
        cursorElements.forEach(el => {
            if (el) {
                el.style.display = 'none';
                el.style.opacity = '0';
            }
        });
        return;
    }

    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (!cursorDot || !cursorOutline) {
        console.log('Cursor elements not found');
        return;
    }

    // Ultra-smooth cursor movement variables
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;
    let isOnText = false;
    let isOnNav = false;

    // Enhanced linear interpolation for ultra-smooth movement
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Mouse movement tracking with debounced updates
    let mouseMoveTimeout;
    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Clear previous timeout
        clearTimeout(mouseMoveTimeout);
        
        if (!isVisible) {
            isVisible = true;
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
        
        // Set a timeout to hide cursor if not moving for a while
        mouseMoveTimeout = setTimeout(() => {
            // Keep cursor visible but reduce animation intensity
        }, 100);
    });

    // Ultra-smooth animation loop with optimized performance
    const animateCursor = () => {
        if (isVisible) {
            // Much smoother dot movement (very responsive)
            dotX = lerp(dotX, mouseX, 0.35);
            dotY = lerp(dotY, mouseY, 0.35);
            
            // Smoother outline movement (gentle trailing effect)
            outlineX = lerp(outlineX, mouseX, 0.18);
            outlineY = lerp(outlineY, mouseY, 0.18);
            
            // Subtle scale adjustments for different states
            let dotScale = 1;
            let outlineScale = 1;
            let dotTransform, outlineTransform;
            
            if (isOnText) {
                // Text cursor: minimal and subtle
                dotScale = 0.6;
                outlineScale = 0.8;
                dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
                outlineTransform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
            } else if (isClicking) {
                // Click state: subtle shrink
                dotScale = 0.85;
                outlineScale = 0.9;
                dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
                outlineTransform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
            } else if (isOnNav) {
                // Navigation: minimal change
                dotScale = 1.05;
                outlineScale = 1.1;
                dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
                outlineTransform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
            } else if (isHovering) {
                // Hover state: very subtle growth
                dotScale = 1.1;
                outlineScale = 1.15;
                dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
                outlineTransform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
            } else {
                // Normal state: smooth and stable
                dotTransform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
                outlineTransform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
            }
            
            // Apply transforms with GPU acceleration
            cursorDot.style.transform = dotTransform;
            cursorOutline.style.transform = outlineTransform;
        }
        
        requestAnimationFrame(animateCursor);
    };

    // Start animation loop
    animateCursor();

    // Show cursor when mouse enters window
    document.addEventListener("mouseenter", function () {
        isVisible = true;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Hide cursor when mouse leaves window
    document.addEventListener("mouseleave", function () {
        isVisible = false;
        isHovering = false;
        isClicking = false;
        isOnText = false;
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        document.body.classList.remove("cursor-hover", "cursor-click", "cursor-text");
    });
    
    // Global mouse up to reset clicking state
    document.addEventListener("mouseup", function () {
        isClicking = false;
    });

    // Enhanced cursor hover effects with smooth transitions
    const addCursorHoverEffect = (element) => {
        let hoverTimeout;
        
        element.addEventListener("mouseenter", function () {
            clearTimeout(hoverTimeout);
            // Add small delay to prevent flicker on quick movements
            hoverTimeout = setTimeout(() => {
                isHovering = true;
                isOnText = false; // Override text state when hovering interactive elements
                document.body.classList.add("cursor-hover");
                document.body.classList.remove("cursor-text");
            }, 20);
        });

        element.addEventListener("mouseleave", function () {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isHovering = false;
                document.body.classList.remove("cursor-hover");
            }, 80); // Longer delay for smoother transitions
        });

        element.addEventListener("mousedown", function () {
            isClicking = true;
            document.body.classList.add("cursor-click");
        });

        element.addEventListener("mouseup", function () {
            setTimeout(() => {
                isClicking = false;
                document.body.classList.remove("cursor-click");
            }, 150); // Longer delay for better visual feedback
        });
        
        // Ensure click events work properly
        element.addEventListener("click", function(e) {
            // Don't prevent default - let clicks work normally
            console.log("Click registered on:", element.tagName, element.className);
        });
    };

    // Apply effects to interactive elements with better targeting
    const hoverElements = document.querySelectorAll("button, .btn, .service-card, .mobile-nav-toggle, input, textarea, .brand-item, .social-link, .cta-btn");
    hoverElements.forEach(addCursorHoverEffect);

    // Navigation specific hover effect (minimal scaling)
    const addNavHoverEffect = (element) => {
        let hoverTimeout;
        
        element.addEventListener("mouseenter", function () {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isOnNav = true;
                isOnText = false;
            }, 25);
        });

        element.addEventListener("mouseleave", function () {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isOnNav = false;
            }, 75);
        });

        element.addEventListener("mousedown", function () {
            isClicking = true;
        });

        element.addEventListener("mouseup", function () {
            setTimeout(() => {
                isClicking = false;
            }, 100);
        });
    };

    // Apply navigation effects to nav elements
    const navElements = document.querySelectorAll("nav a, .navbar-nav a, .nav-link, .navbar-brand");
    navElements.forEach(addNavHoverEffect);
    
    // Text hover effects for minimal cursor
    const addTextHoverEffect = (element) => {
        element.addEventListener("mouseenter", function () {
            // Only apply text effect if not hovering over interactive elements
            if (!isHovering) {
                isOnText = true;
                // Add smooth transition classes
                cursorDot.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                cursorOutline.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                cursorDot.classList.add("cursor-text");
                cursorOutline.classList.add("cursor-text");
            }
        });

        element.addEventListener("mouseleave", function () {
            isOnText = false;
            // Smooth exit transition
            cursorDot.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            cursorOutline.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            cursorDot.classList.remove("cursor-text");
            cursorOutline.classList.remove("cursor-text");
            
            // Reset to normal transition after animation
            setTimeout(() => {
                if (!isOnText) {
                    cursorDot.style.transition = '';
                    cursorOutline.style.transition = '';
                }
            }, 400);
        });
    };

    // Apply text effects to text elements (excluding navigation and interactive elements)
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, blockquote, em, strong, small, .info-text, .hero-content p, .brands-header p, span:not(.nav-toggle):not(.navbar-brand):not(.btn), li:not(.nav-item)");
    textElements.forEach(addTextHoverEffect);
    
    // Also add effects to elements that might be added dynamically
    document.addEventListener('click', function(e) {
        if (e.target.matches('a, button, .btn, .service-btn, [onclick]')) {
            console.log("Document click on interactive element:", e.target);
        }
    });
});

// Enhanced Services Slider
let currentSlide = 0;
let isAnimating = false;
let slideDirection = 'next';

// Slider data
const slideData = [
    {
        title: "Professional Photography",
        subtitle: "Capturing your vision with precision"
    },
    {
        title: "Creative Videography", 
        subtitle: "Bringing stories to life through motion"
    },
    {
        title: "360° Virtual Tours",
        subtitle: "Immersive experiences that showcase spaces"
    },
    {
        title: "Social Media Management",
        subtitle: "Building your digital presence"
    },
    {
        title: "Design & Branding",
        subtitle: "Crafting memorable brand identities"
    },
    {
        title: "Web Design & Development",
        subtitle: "Creating digital experiences that convert"
    }
];

    // Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effect - ensure elements exist
    setTimeout(() => {
        const cursorDot = document.querySelector("[data-cursor-dot]");
        const cursorOutline = document.querySelector("[data-cursor-outline]");
        
        if (cursorDot && cursorOutline) {
            // Make cursor visible initially
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            // Position at center initially with proper centering
            cursorDot.style.transform = 'translate3d(50px, 50px, 0) translate(-50%, -50%)';
            cursorOutline.style.transform = 'translate3d(50px, 50px, 0) translate(-50%, -50%)';
            
            console.log('Cursor initialized successfully');
        } else {
            console.log('Cursor elements not found');
        }
    }, 100);    // Re-add hover effects for dynamically loaded elements
    const addCursorEffects = () => {
        const hoverElements = document.querySelectorAll("a, button, .btn, .service-card, .mobile-nav-toggle, input, textarea, .brand-item, .social-link");
        
        hoverElements.forEach(element => {
            if (!element.hasAttribute('data-cursor-init')) {
                element.setAttribute('data-cursor-init', 'true');
                
                element.addEventListener("mouseenter", function () {
                    document.body.classList.add("cursor-hover");
                });

                element.addEventListener("mouseleave", function () {
                    document.body.classList.remove("cursor-hover");
                });

                element.addEventListener("mousedown", function () {
                    document.body.classList.add("cursor-click");
                });

                element.addEventListener("mouseup", function () {
                    document.body.classList.remove("cursor-click");
                });
            }
        });
    };
    
    // Initialize cursor effects
    addCursorEffects();
    
    // Mobile Hamburger Menu Functionality
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (mobileToggle && mobileMenu) {
        // Toggle mobile menu
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Hero CTA Button functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Add subtle interaction effects
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Smooth scroll for navigation links (both desktop and mobile)
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                let headerOffset = 80;
                
                // Special handling for service cards section
                if (targetId === 'services-cards') {
                    headerOffset = 100;
                }
                
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight effect for service cards
                if (targetId.includes('-card')) {
                    highlightServiceCard(targetElement);
                }
            }
        });
    });
    
    // Service card highlight function
    function highlightServiceCard(cardElement) {
        // Remove previous highlights
        const allCards = document.querySelectorAll('.service-card');
        allCards.forEach(card => {
            card.classList.remove('highlighted');
        });
        
        // Add highlight to clicked card
        setTimeout(() => {
            cardElement.classList.add('highlighted');
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                cardElement.classList.remove('highlighted');
            }, 3000);
        }, 500); // Delay to allow scroll to complete
    }
    
    // Premium Hero Interactions
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const primaryCTA = document.querySelector('.btn-primary');
    const secondaryCTA = document.querySelector('.btn-secondary');
    
    // Primary CTA - Navigate to services cards
    if (primaryCTA) {
        primaryCTA.addEventListener('click', function() {
            const servicesCardsSection = document.getElementById('services-cards');
            if (servicesCardsSection) {
                const headerOffset = 100;
                const elementPosition = servicesCardsSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Secondary CTA - Navigate to portfolio/brands
    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', function() {
            const brandsSection = document.querySelector('.brands');
            if (brandsSection) {
                brandsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Scroll indicator - Navigate to about section
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.info-sections');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Trust indicators hover effects
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for premium elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.3 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        const corners = document.querySelectorAll('.corner-accent');
        corners.forEach(corner => {
            corner.style.transform = `translateY(${rate}px)`;
        });
    });
});

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing slider...');
    
    // Get slider elements
    const sliderImages = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const overlayTitle = document.querySelector('.overlay-title');
    const overlaySubtitle = document.querySelector('.overlay-subtitle');
    const progressBar = document.querySelector('.progress-bar');
    
    if (sliderImages.length === 0) {
        console.error('No slider images found');
        return;
    }
    
    console.log(`Found ${sliderImages.length} slider images`);
    
    function updateSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        console.log(`Updating to slide ${index}, direction: ${slideDirection}`);
        
        // Remove all classes first
        sliderImages.forEach(img => {
            img.classList.remove('active', 'prev', 'next');
        });
        
        // Set new classes based on direction
        sliderImages[index].classList.add('active');
        
        if (slideDirection === 'next') {
            sliderImages.forEach((img, i) => {
                if (i < index) img.classList.add('prev');
                if (i > index) img.classList.add('next');
            });
        } else {
            sliderImages.forEach((img, i) => {
                if (i > index) img.classList.add('next');
                if (i < index) img.classList.add('prev');
            });
        }
        
        // Update overlay content
        if (overlayTitle && overlaySubtitle && slideData[index]) {
            overlayTitle.textContent = slideData[index].title;
            overlaySubtitle.textContent = slideData[index].subtitle;
        }
        
        // Update progress bar
        if (progressBar) {
            const progress = ((index + 1) / sliderImages.length) * 100;
            progressBar.style.width = progress + '%';
        }
        
        currentSlide = index;
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function nextSlide() {
        slideDirection = 'next';
        currentSlide = (currentSlide + 1) % sliderImages.length;
        updateSlide(currentSlide);
    }
    
    function previousSlide() {
        slideDirection = 'prev';
        currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
        updateSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('Next button listener added');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSlide);
        console.log('Prev button listener added');
    }
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 5000);
        console.log('Auto-play started');
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        console.log('Auto-play stopped');
    }
    
    // Initialize slider
    updateSlide(0);
    startAutoPlay();
    
    // Pause auto-play on hover
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
        sliderWrapper.addEventListener('mouseleave', startAutoPlay);
        console.log('Hover listeners added');
    }
    
    console.log('Slider initialization complete');
});

// Terms and Conditions functionality - Now opens in new tab
// The modal functionality has been replaced with a separate page

// Keep these functions for compatibility (they won't be used but won't cause errors)
function closeTermsModal() {
    // This function is kept for compatibility but won't be used
    console.log('Modal close function called - now using separate page');
}

function agreeToTerms() {
    // This function is kept for compatibility but won't be used
    console.log('Agree function called - now using separate page');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('termsModal');
    
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTermsModal();
            }
        });
    }
    
    // Enhanced Footer Functionality
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Back to top button functionality with animation
    const backToTopBtn = document.querySelector('.back-top-btn');
    if (backToTopBtn) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0.8';
                backToTopBtn.style.transform = 'translateY(2px)';
            }
        });
        
        // Smooth scroll to top with easing
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a subtle animation effect
            backToTopBtn.style.transform = 'translateY(-4px)';
            setTimeout(() => {
                backToTopBtn.style.transform = 'translateY(0)';
            }, 150);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Footer animations on scroll
    const footerElements = document.querySelectorAll('.footer-col');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    footerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        footerObserver.observe(element);
    });
    
    // Social links tracking (optional analytics)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add subtle click animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // You can add analytics tracking here
            const platform = this.classList.contains('instagram') ? 'Instagram' :
                          this.classList.contains('facebook') ? 'Facebook' :
                          this.classList.contains('linkedin') ? 'LinkedIn' :
                          this.classList.contains('tiktok') ? 'TikTok' : 'Unknown';
            
            console.log(`Social media click: ${platform}`);
        });
    });
    
    // Current year update
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement && currentYear > 2025) {
        copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
    }
});

// Simple smooth scroll function for "Discover Excellence"
function smoothScrollToAbout(event) {
    event.preventDefault();
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        // Smooth scroll with offset for header
        const headerOffset = 100;
        const elementPosition = aboutSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Tablet and Touch Device Optimizations
function initTabletOptimizations() {
    const isTabletOrMobile = window.innerWidth <= 1024;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTabletOrMobile || isTouchDevice) {
        // Remove cursor elements completely on tablets
        const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-outline, [data-cursor-dot], [data-cursor-outline]');
        cursorElements.forEach(el => {
            if (el) {
                el.remove();
            }
        });
        
        // Add touch-friendly classes
        document.body.classList.add('touch-device');
        
        // Optimize touch events for buttons
        const buttons = document.querySelectorAll('.btn, .service-btn, button');
        buttons.forEach(btn => {
            btn.style.touchAction = 'manipulation';
            
            // Add touch feedback
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Optimize slider for touch
        const slider = document.querySelector('.services-slider');
        if (slider) {
            slider.style.touchAction = 'pan-x';
        }
        
        // Prevent zoom on double tap for inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.focus();
            }, { passive: false });
        });
    }
}

// Handle orientation changes on tablets
function handleOrientationChange() {
    // Trigger reflow to fix any layout issues
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        initTabletOptimizations();
    }, 100);
}

// Initialize tablet optimizations
document.addEventListener('DOMContentLoaded', initTabletOptimizations);
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', initTabletOptimizations);