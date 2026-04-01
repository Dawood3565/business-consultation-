
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // Higher = Slower

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const current = +counter.innerText.replace(/[+%]/g, '');
                    const increment = target / speed;

                    if (current < target) {
                        counter.innerText = `+${Math.ceil(current + increment)}%`;
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = `+${target}%`;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    };

    const options = { threshold: 0.5 }; // Starts when 50% of the card is visible
    const observer = new IntersectionObserver(startCounter, options);

    counters.forEach(counter => observer.observe(counter));
});
