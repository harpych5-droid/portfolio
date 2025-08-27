// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initQuotes();
});

// Typewriter animation for main heading
function initTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.textContent;
        typewriter.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                typewriter.textContent += text[i];
                i++;
                requestAnimationFrame(() => setTimeout(type, 50));
            }
        }

        requestAnimationFrame(type);
    }
}

// Quote carousel and animations
function initQuotes() {
    const state = {
        currentQuote: 0,
        timer: null,
        interval: 5000
    };

    const elements = {
        quotes: document.querySelectorAll('.quote'),
        dots: document.querySelectorAll('.quote-dots .dot'),
        prevBtn: document.querySelector('.quote-nav.prev'),
        nextBtn: document.querySelector('.quote-nav.next')
    };

    function animateQuoteText(quote) {
        const textElements = {
            glitch: quote.querySelector('.glitch-text'),
            typing: quote.querySelectorAll('.typing-text'),
            neon: quote.querySelector('.neon-text')
        };

        // Reset and restart animations
        if (textElements.glitch) {
            textElements.glitch.style.animation = 'none';
            textElements.glitch.offsetHeight;
            textElements.glitch.style.animation = 'glitch 3s infinite';
        }

        textElements.typing.forEach((el, index) => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.opacity = '1';
                const text = el.textContent;
                el.textContent = '';
                let charIndex = 0;

                function typeChar() {
                    if (charIndex < text.length) {
                        el.textContent += text[charIndex];
                        charIndex++;
                        requestAnimationFrame(() => setTimeout(typeChar, 30));
                    }
                }

                typeChar();
            }, index * 200 + 100);
        });

        if (textElements.neon) {
            textElements.neon.style.animation = 'none';
            textElements.neon.offsetHeight;
            textElements.neon.style.animation = 'pulse 2s infinite';
        }
    }

    function showQuote(index) {
        // Hide current quote
        elements.quotes[state.currentQuote].classList.remove('active');
        elements.dots[state.currentQuote].classList.remove('active');

        // Update index
        state.currentQuote = index;

        // Show new quote
        elements.quotes[state.currentQuote].classList.add('active');
        elements.dots[state.currentQuote].classList.add('active');

        // Animate text
        animateQuoteText(elements.quotes[state.currentQuote]);

        // Reset timer
        clearTimeout(state.timer);
        state.timer = setTimeout(() => {
            showQuote((state.currentQuote + 1) % elements.quotes.length);
        }, state.interval);
    }

    // Event listeners
    elements.prevBtn?.addEventListener('click', () => {
        showQuote((state.currentQuote - 1 + elements.quotes.length) % elements.quotes.length);
    });

    elements.nextBtn?.addEventListener('click', () => {
        showQuote((state.currentQuote + 1) % elements.quotes.length);
    });

    elements.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showQuote(index));
    });

    // Start carousel
    showQuote(0);
}
