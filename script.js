// Select the necessary HTML elements
const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0; // Keeps track of which image is open

// Function to update the image source based on the index
function updateLightboxImage(index) {
    lightboxImg.src = galleryImages[index].src;
}

// Open the lightbox when a gallery image is clicked
galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentIndex = index; // Set the current index to the clicked image
        updateLightboxImage(currentIndex);
        lightbox.classList.remove('hidden'); 
    });
});

// Show the next image
function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length; // Loops back to start
    updateLightboxImage(currentIndex);
}

// Show the previous image
function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; // Loops to end
    updateLightboxImage(currentIndex);
}

// Button Event Listeners (with Event Bubbling prevented)
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the click from registering on the background
    showNext();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the click from registering on the background
    showPrev();
});

// Close the lightbox when the 'X' is clicked
closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

// Close the lightbox ONLY if the actual dark background is clicked
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') lightbox.classList.add('hidden');
    }
});