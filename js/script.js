// Wedding Website JavaScript

// DOM Elements
const cardContainer = document.getElementById('cardContainer');
const mainContent = document.getElementById('mainContent');
const musicPlayer = document.getElementById('background-music');
const musicIcon = document.getElementById('music-icon');
const qrContainer = document.getElementById('qrContainer');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializeCountdown();
    initializeScrollAnimations();
    initializeGallery();
    initializeRSVP();
    createParticles();
    initializeAdvancedAnimations();
    initializeCustomCursor();
});

// Initialize website
function initializeWebsite() {
    // Auto-play music after card animation
    setTimeout(() => {
        playMusic();
    }, 5000);
    
    // Add scroll listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add smooth scrolling for anchor links
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
}

// Music Player Functions
function toggleMusic() {
    if (musicPlayer.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

function playMusic() {
    musicPlayer.play().then(() => {
        musicIcon.className = 'fas fa-pause';
        musicIcon.style.animation = 'musicPulse 1s ease-in-out infinite';
        document.querySelector('.music-player').classList.add('playing');
    }).catch(error => {
        console.log('Music autoplay prevented:', error);
    });
}

function pauseMusic() {
    musicPlayer.pause();
    musicIcon.className = 'fas fa-music';
    musicIcon.style.animation = 'none';
    document.querySelector('.music-player').classList.remove('playing');
}

// Countdown Timer
function initializeCountdown() {
    const weddingDate = new Date('2025-12-28T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Add animation to changing numbers
            animateCountdownNumber('seconds');
            if (seconds === 0) animateCountdownNumber('minutes');
            if (minutes === 0 && seconds === 0) animateCountdownNumber('hours');
            if (hours === 0 && minutes === 0 && seconds === 0) animateCountdownNumber('days');
        } else {
            // Wedding day has arrived!
            document.getElementById('countdown').innerHTML = `
                <div class="wedding-arrived">
                    <h2>🎉 Hôm nay là ngày cưới! 🎉</h2>
                    <p>Chúc mừng cô dâu chú rể!</p>
                </div>
            `;
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function animateCountdownNumber(elementId) {
    const element = document.getElementById(elementId);
    element.style.transform = 'scale(1.2)';
    element.style.color = '#ff6b6b';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#ff6b6b';
    }, 200);
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
                entry.target.classList.add('active');
                
                // Special animations for story items
                if (entry.target.classList.contains('story-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.slide-in, .story-item, .info-card, .countdown-item').forEach(el => {
        observer.observe(el);
    });
}

function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}

// Gallery Swiper
function initializeGallery() {
    const swiper = new Swiper('.gallerySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    });
    
    // Add click event to gallery items for lightbox effect
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
    
    // Add click event to wedding photos for lightbox effect
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

// Lightbox for gallery images
function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox events
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Add lightbox styles
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10001;
        }
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 10px;
            font-size: 1.1rem;
        }
    `;
    
    if (!document.querySelector('#lightbox-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'lightbox-styles';
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);
    }
}

// QR Code Toggle
function toggleQR() {
    qrContainer.classList.toggle('active');
    
    // Add animation to QR cards
    if (qrContainer.classList.contains('active')) {
        const qrCards = qrContainer.querySelectorAll('.qr-card');
        qrCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.5s ease forwards';
            }, index * 200);
        });
    }
}

// RSVP Form
function initializeRSVP() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('guestName').value,
                attendance: document.getElementById('attendance').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            submitRSVP(formData);
        });
    }
}

function submitRSVP(formData) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn.', 'success');
        
        // Reset form
        document.getElementById('rsvpForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // In a real application, you would send this data to your server
        console.log('RSVP Data:', formData);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        document.body.removeChild(notification);
    });
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        .notification-success {
            border-left: 5px solid #28a745;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-content i {
            color: #28a745;
            font-size: 1.2rem;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
            color: #666;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
}

// Floating Hearts Animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 20 + 10}px;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    }, 5000);
}

// Add floating hearts animation styles
const floatingHeartsStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = floatingHeartsStyles;
document.head.appendChild(styleSheet);

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('div');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(145deg, #ff6b6b, #ee5a52);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(238, 90, 82, 0.3);
                transition: all 0.3s ease;
                animation: fadeInUp 0.3s ease;
            `;
            
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            scrollBtn.addEventListener('mouseenter', () => {
                scrollBtn.style.transform = 'scale(1.1)';
            });
            
            scrollBtn.addEventListener('mouseleave', () => {
                scrollBtn.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            document.body.removeChild(scrollBtn);
        }
    }
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Create sparkle effect on mouse move (throttled)
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
        font-size: 12px;
        animation: sparkleAnimation 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle animation
const sparkleStyles = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

const sparkleStyleSheet = document.createElement('style');
sparkleStyleSheet.textContent = sparkleStyles;
document.head.appendChild(sparkleStyleSheet);

// Create Particles System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle(particlesContainer);
        }, i * 300);
    }
    
    // Continue creating particles
    setInterval(() => {
        createParticle(particlesContainer);
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
        }
    }, 20000);
}

// Advanced Animations Controller
function initializeAdvancedAnimations() {
    // Intersection Observer for advanced animations
    const advancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('countdown-item')) {
                    animateCountdownItems(entry.target);
                }
                
                if (entry.target.classList.contains('photo-item')) {
                    animatePhotoItems(entry.target);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.countdown-item, .photo-item, .story-content, .info-card').forEach(el => {
        advancedObserver.observe(el);
    });
}

function animateCountdownItems(element) {
    const number = element.querySelector('.countdown-number');
    if (number) {
        number.style.animation = 'none';
        setTimeout(() => {
            number.style.animation = 'bounceIn 0.8s ease-out forwards';
        }, 100);
    }
}

function animatePhotoItems(element) {
    element.style.transform = 'scale(0.8) rotateY(45deg)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.transform = 'scale(1) rotateY(0deg)';
        element.style.opacity = '1';
    }, 200);
}

// Enhanced Scroll Effects
function createScrollMagic() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.floating-heart, .floating-rose');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Dynamic background color change
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                document.body.style.setProperty('--dynamic-color', `hsl(${index * 30}, 70%, 95%)`);
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize scroll magic
createScrollMagic();

// Mouse Trail Effect
function createMouseTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail particle
        if (Math.random() > 0.8) {
            const trailParticle = document.createElement('div');
            trailParticle.style.cssText = `
                position: fixed;
                left: ${mouseX}px;
                top: ${mouseY}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #ff6b6b, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: trailFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(trailParticle);
            
            setTimeout(() => {
                if (document.body.contains(trailParticle)) {
                    document.body.removeChild(trailParticle);
                }
            }, 1000);
        }
    });
    
    // Add trail fade animation
    const trailStyles = `
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    
    const trailStyleSheet = document.createElement('style');
    trailStyleSheet.textContent = trailStyles;
    document.head.appendChild(trailStyleSheet);
}

// Initialize mouse trail
createMouseTrail();

// Custom Cursor Controller
function initializeCustomCursor() {
    const cursor = document.getElementById('customCursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow
    function updateCursor() {
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Hover effects for clickable elements
    const clickableElements = document.querySelectorAll('a, button, .photo-item, .heart-button, .music-player, .countdown-item, .story-content, .info-card');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        element.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}