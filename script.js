const jobs = ["Web Developer", "Software Engineer", "Designer", "Freelancer"];
let index = 0;
let charIndex = 0;
let currentJob = "";
let isDeleting = false;
const textElement = document.getElementById('changing-text');

const mobileMenu = document.getElementById('mobile-menu');
const overlayMenu = document.getElementById('overlay-menu');
const closeBtn = document.querySelector('.close-btn');
// JavaScript to toggle the overlay menu
const menuToggle = document.querySelector('.menu-toggle');

// Function to open the overlay menu
function openOverlay() {
    overlayMenu.classList.add('active'); // Add the active class to show the menu
}

// Function to close the overlay menu
function closeOverlay() {
    overlayMenu.classList.remove('active'); // Remove the active class to hide the menu
}

// Open the overlay when clicking the mobile menu or hamburger icon
mobileMenu.addEventListener('click', openOverlay);
menuToggle.addEventListener('click', openOverlay);

// Close overlay when clicking the close button or the span inside it
closeBtn.addEventListener('click', closeOverlay);

// Close overlay when clicking outside the content area
overlayMenu.addEventListener('click', (e) => {
    if (e.target === overlayMenu) {
        closeOverlay(); // Close overlay on outside click
    }
});

// Close overlay when the screen is resized beyond 768px
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeOverlay(); // Ensure it closes on resize
    }
});

// Swipe to close the overlay on mobile
let touchStartX = 0;
let touchEndX = 0;

overlayMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

overlayMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) { // If swiped left
        closeOverlay(); // Close the overlay
    }
}

// Close overlay when clicking anywhere on the main page
document.addEventListener('click', (event) => {
    // Check if the overlay is currently open and the click target is not the mobile menu or overlay
    if (overlayMenu.classList.contains('active') && !overlayMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
        closeOverlay(); // Close the overlay
    }
});



function type() {
    currentJob = jobs[index];

    if (isDeleting) {
        textElement.textContent = currentJob.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentJob.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentJob.length) {
        setTimeout(() => isDeleting = true, 2000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % jobs.length; // Move to next job title
    }

    setTimeout(type, isDeleting ? 100 : 200); // Adjust speed for typing and deleting
}

type();
