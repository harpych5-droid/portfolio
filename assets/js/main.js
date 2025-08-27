document.addEventListener('DOMContentLoaded', function() {
    // Variables for quote carousel
    let currentQuote = 0;
    let quoteTimer;
    const QUOTE_INTERVAL = 5000;

    // Get DOM elements
    const quotes = document.querySelectorAll('.quote');
    const dots = document.querySelectorAll('.quote-dots .dot');
    const prevBtn = document.querySelector('.quote-nav.prev');
    const nextBtn = document.querySelector('.quote-nav.next');
    const typewriter = document.querySelector('.typewriter');

    function animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        let charIndex = 0;

        function addChar() {
            if (charIndex < text.length) {
                element.textContent += text[charIndex];
                charIndex++;
                setTimeout(addChar, 30);
            }
        }

        addChar();
    }

    function showQuote(index, animate = true) {
        // Hide current quote
        if (quotes[currentIndex]) {
            quotes[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
        }

        // Update index
        currentIndex = index;

        // Show new quote
        const currentQuote = quotes[currentIndex];
        currentQuote.classList.add('active');
        dots[currentIndex].classList.add('active');

        if (animate) {
            // Reset and animate text elements
            const glitchText = currentQuote.querySelector('.glitch-text');
            const typingTexts = currentQuote.querySelectorAll('.typing-text');
            const neonText = currentQuote.querySelector('.neon-text');

            // Trigger animations
            if (glitchText) {
                glitchText.style.animation = 'none';
                glitchText.offsetHeight; // Force reflow
                glitchText.style.animation = null;
            }

            typingTexts.forEach((text, i) => {
                text.style.opacity = '0';
                setTimeout(() => {
                    text.style.opacity = '1';
                    animateText(text);
                }, i * 500 + 200);
            });

            if (neonText) {
                neonText.style.animation = 'none';
                neonText.offsetHeight; // Force reflow
                neonText.style.animation = null;
            }
        }

        // Reset timer
        clearTimeout(quoteTimer);
        quoteTimer = setTimeout(() => showQuote((currentIndex + 1) % quotes.length), QUOTE_INTERVAL);
    }

    // Event Listeners for quotes
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showQuote((currentIndex - 1 + quotes.length) % quotes.length);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showQuote((currentIndex + 1) % quotes.length);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showQuote(index);
        });
    });

    // Initialize typewriter effect
    function initTypewriter() {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            const text = "hi, my name is happy chilala, i'm a developer.";
            typewriter.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    typewriter.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 55);
                }
            }
            
            type();
        }
    }

    // Start the quote carousel
    showQuote(0);

    function updateQuote(index) {
        // Remove active classes
        quotes[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // Update index
        currentIndex = index;

        // Add active classes
        quotes[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Animate text elements
        const textElements = quotes[currentIndex].querySelectorAll('.typing-text');
        textElements.forEach((el, i) => {
            el.style.setProperty('--char-index', i + 1);
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });

        // Reset timer
        clearTimeout(timer);
        timer = setTimeout(() => updateQuote((currentIndex + 1) % quotes.length), INTERVAL);
    }

    function nextQuote() {
        updateQuote((currentIndex + 1) % quotes.length);
    }

    function prevQuote() {
        updateQuote((currentIndex - 1 + quotes.length) % quotes.length);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevQuote);
    if (nextBtn) nextBtn.addEventListener('click', nextQuote);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateQuote(index));
    });

    // Start carousel
    updateQuote(0);
}

    // Quote Carousel
    const quotes = document.querySelectorAll('.quote');
    const dots = document.querySelectorAll('.quote-dots .dot');
    const prevBtn = document.querySelector('.quote-nav.prev');
    const nextBtn = document.querySelector('.quote-nav.next');
    let currentQuote = 0;
    let quoteTimer;

    function showQuote(index) {
        // Remove active class from current quote and dot
        quotes[currentQuote].classList.remove('active');
        dots[currentQuote].classList.remove('active');

        // Update current quote index
        currentQuote = index;

        // Add active class to new quote and dot
        quotes[currentQuote].classList.add('active');
        dots[currentQuote].classList.add('active');

        // Animate the text elements
        const activeQuote = quotes[currentQuote];
        const textElements = activeQuote.querySelectorAll('.typing-text');
        textElements.forEach((element, i) => {
            element.style.setProperty('--char-index', i + 1);
        });

        // Reset and restart the timer
        clearTimeout(quoteTimer);
        quoteTimer = setTimeout(nextQuote, 5000);
    }

    function nextQuote() {
        showQuote((currentQuote + 1) % quotes.length);
    }

    function prevQuote() {
        showQuote((currentQuote - 1 + quotes.length) % quotes.length);
    }

    // Event Listeners for quote navigation
    prevBtn.addEventListener('click', () => {
        prevQuote();
    });

    nextBtn.addEventListener('click', () => {
        nextQuote();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showQuote(index);
        });
    });

    // Start the quote rotation
    showQuote(0);

    // Quote Carousel Functionality
    const quotes = document.querySelectorAll('.quote');
    const dots = document.querySelectorAll('.quote-dots .dot');
    let currentQuote = 0;
    const quoteInterval = 5000; // 5 seconds per quote

    function showQuote(index) {
        // Remove active class from all quotes and dots
        quotes.forEach(quote => quote.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current quote and dot
        quotes[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextQuote() {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentQuote = index;
            showQuote(currentQuote);
            // Reset the interval timer when manually changing quotes
            clearInterval(quoteTimer);
            quoteTimer = setInterval(nextQuote, quoteInterval);
        });
    });

    // Start the automatic quote rotation
    let quoteTimer = setInterval(nextQuote, quoteInterval);
});
