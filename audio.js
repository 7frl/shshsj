// Define your playlist of songs
const playlist = [
    { src: '1.mp3', type: 'audio/mp3', title: '...' },
    // Add more songs as needed
];

// Get references to necessary elements
const audioPlayer = document.getElementById('audioPlayer');
const currentSongTitle = document.getElementById('currentSongTitle');
const playPrompt = document.getElementById('playPrompt');

let currentSongIndex = 0; // Index to keep track of current song in playlist

// Function to play the next song in the playlist
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    audioPlayer.src = playlist[currentSongIndex].src;
    audioPlayer.type = playlist[currentSongIndex].type;
    audioPlayer.play();

    // Update current song title in UI
    updateCurrentSongInfo();
}

// Event listener for when current song ends
audioPlayer.addEventListener('ended', () => {
    playNextSong();
});

// Function to update current song info in UI
function updateCurrentSongInfo() {
    currentSongTitle.textContent = playlist[currentSongIndex].title;
}

// Function to detect if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to start playback, with fallback for mobile devices
function startPlayback() {
    audioPlayer.src = playlist[currentSongIndex].src;
    audioPlayer.type = playlist[currentSongIndex].type;
    audioPlayer.muted = isMobileDevice(); // Mute only if on mobile
    audioPlayer.play().then(() => {
        // Autoplay started successfully
        if (isMobileDevice()) {
            audioPlayer.muted = false; // Unmute for mobile after play starts
        }
        updateCurrentSongInfo();
    }).catch(() => {
        // Autoplay failed, user interaction required
        if (isMobileDevice()) {
            // Show the prompt to the user to start the music
            playPrompt.style.display = 'block';
        }
    });
}

// Start playback attempt
startPlayback();

// Add event listener for user interaction on mobile
if (isMobileDevice()) {
    playPrompt.addEventListener('click', () => {
        audioPlayer.play();
        playPrompt.style.display = 'none';
    });
}
