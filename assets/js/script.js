//block watermark from chatbot
document.querySelectorAll('span').forEach((el) => {
    if (el.textContent.trim() === "Powered by Smartsupp") {
        el.style.setProperty('display', 'none', 'important');
    }
});


// Initialize Swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .skill-card, .contact-card').forEach(card => {
    observer.observe(card);
});

// Skills Switcher Functionality
const switchButtons = document.querySelectorAll('.switch-btn');
const skillsContainers = document.querySelectorAll('.skills-container');

switchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.target;

        // Update buttons
        switchButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update containers
        skillsContainers.forEach(container => {
            container.classList.remove('active');
            if (container.id === `${target}-content`) {
                container.classList.add('active');
            }
        });
    });
});


const goTopBtn = document.querySelector("[data-go-top]");

// Debounce function to improve scroll performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll handler with debouncing
const handleScroll = debounce(() => {
    if (window.scrollY >= 200) {
        goTopBtn.classList.add("active");
    } else {
        goTopBtn.classList.remove("active");
    }
}, 10);

window.addEventListener("scroll", handleScroll);

// Smooth scroll to top when button is clicked
goTopBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Check if smooth scrolling is supported and not reduced
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } else {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, 0);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons and projects
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const projectItems = document.querySelectorAll('[data-filter-item]');

    // Function to handle filtering
    function filterProjects(category) {
        projectItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            // Show all items if category is 'all'
            if (category.toLowerCase() === 'all') {
                item.style.display = 'block';
                return;
            }

            // Show/hide items based on category match
            if (itemCategory === category.toLowerCase()) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get category from button text and filter projects
            const category = button.textContent.trim();
            filterProjects(category);
        });
    });

    // Initialize with "All" selected
    const defaultButton = document.querySelector('[data-filter-btn].active');
    if (defaultButton) {
        filterProjects('all');
    }
});
