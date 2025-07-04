// Main JavaScript File for Notemycode

document.addEventListener('DOMContentLoaded', function() {
    // Add animation to cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card, .lang-card');
        
        cards.forEach(card => {
            // Get card position relative to viewport
            const cardPosition = card.getBoundingClientRect().top;
            // If card is in viewport (with some buffer)
            if (cardPosition < window.innerHeight - 100) {
                card.style.opacity = 1;
                card.style.transform = card.classList.contains('lang-card') 
                    ? 'translateY(0) scale(1)' 
                    : 'translateY(0)';
            }
        });
    };
    
    // Set initial state for cards
    const cards = document.querySelectorAll('.card, .lang-card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = card.classList.contains('lang-card') 
            ? 'translateY(30px) scale(0.9)' 
            : 'translateY(30px)';
        card.style.transition = 'all 0.5s ease-out';
    });
    
    // Run animation initially and on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Language cards navigation to respective pages
    const langCards = document.querySelectorAll('.lang-card');
    if(langCards) {
        langCards.forEach(card => {
            card.addEventListener('click', function() {
                const language = this.querySelector('h3').textContent.toLowerCase();
                
                // Navigate to appropriate page
                if (language === 'html') {
                    window.location.href = 'notes/htmlnotes.html';
                } else if (language === 'css') {
                    window.location.href = 'notes/css.html';
                } else if (language === 'dsa') {
                    window.location.href = 'notes/dsa.html';
                } else {
                    window.location.href = `notes/${language}.html`;
                }
            });
        });
    }
    
    // Active nav link highlighting
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Simple path checking - could be enhanced for deeper file structures
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('index.html') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
});


 