// script.js

const caption = document.getElementById('caption');
const gif = document.getElementById('gif');
const sound = document.getElementById('sound'); // Audio element

// Arrays for GIFs and captions
const gifs = [
    'de805afc329f44a410607be52dcc3a13.gif',
    '789894dba0b581842e5a52cf56d8ec85.gif',
    'hello-kitty-pompompurin-stretches-the-face-doodle.gif', // Third GIF
    'ad3dcae1f2180019998a3a79a2844931.gif', // Fourth GIF
    'pompompurin-sanrio.gif' // Fifth GIF that will loop forever
];

const captions = [
    'Hi there, Lou',
    'Are you sad?',
    'Everything will be okay!', // Third text
    'Click Anywhere to listen to some tunes', // Fourth text
    'Pompurin is the cure to sadness' // Final text for the fifth GIF
];

const particleImages = [
    '0c6a00f9a37c966c45a63db911210fb6.png', // Replace with your actual particle image URLs
    '8b2ebcbd3d39bfb2784f536b8852f72b.png',
    '58a0c7b786b097f540cebb7ca16a4734.png',
    '718432c11b8bbcaaaf3fe5b01b8f30c3.png',
    'pompompurin-png-6.png',
    'Pompompurin-PNG-Picture.png',
    'sanrio-pompompurin-and-flower-pack.png'
];

let currentIndex = 0; // Track the current index

// Function to change GIF and text
function changeContent() {
    // Update GIF and text
    gif.src = gifs[currentIndex]; 
    caption.innerText = captions[currentIndex]; 

    // Increment the index
    currentIndex++;

    // Check if we reached the fifth GIF
    if (currentIndex >= gifs.length) {
        caption.innerText = captions[currentIndex - 1]; // Keep the last caption
        clearInterval(contentInterval); // Stop changing content after the fifth GIF
    }
}

// Function to unmute and play sound
function playSound() {
    sound.muted = false; // Unmute the audio
    sound.play().catch((error) => {
        console.log("Audio playback failed: ", error);
    });
}

// Function to create a falling particle effect
function createFallingParticle(x, y) {
    const particle = document.createElement('img');
    
    // Select a random particle image from the array
    const randomIndex = Math.floor(Math.random() * particleImages.length);
    particle.src = particleImages[randomIndex]; // Randomly choose a particle image
    particle.classList.add('particle');

    // Set initial position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    // Animate the falling particle
    const fallSpeed = 2; // Speed of falling
    const fall = () => {
        const currentTop = parseFloat(particle.style.top);
        particle.style.top = `${currentTop + fallSpeed}px`; // Move down

        // Remove the particle after it goes off-screen
        if (currentTop > window.innerHeight) {
            particle.remove();
        } else {
            requestAnimationFrame(fall); // Continue animation
        }
    };

    requestAnimationFrame(fall); // Start falling animation
}

// Function to request full screen
function requestFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

// Start the process and set interval for changing content every 5 seconds
const contentInterval = setInterval(changeContent, 5000); // Change every 5000ms (5 seconds)

// Add a click event to the document to play sound on interaction and request full screen
document.addEventListener('click', (event) => {
    playSound();
    createFallingParticle(event.clientX, event.clientY); // Create falling particle at mouse click position
    requestFullScreen(); // Request full screen on click
});
