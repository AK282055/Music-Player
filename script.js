// Audio Context for Visualizer
let audioContext;
let analyser;
let source;

// Canvas Elements
const visualizer = document.getElementById('visualizer');
const visualizerCtx = visualizer.getContext('2d');
const gradientCanvas = document.getElementById('gradient-canvas');
const gradientCtx = gradientCanvas.getContext('2d');

// Initialize canvas sizes
function initializeCanvases() {
    // Set visualizer canvas size
    visualizer.width = visualizer.offsetWidth;
    visualizer.height = visualizer.offsetHeight;

    // Set gradient canvas size
    gradientCanvas.width = window.innerWidth;
    gradientCanvas.height = window.innerHeight;
}

// Handle window resize
window.addEventListener('resize', initializeCanvases);
initializeCanvases();

// Audio Context Setup
function setupAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }
}

// Visualizer Animation
function drawVisualizer() {
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    visualizerCtx.clearRect(0, 0, visualizer.width, visualizer.height);
    visualizerCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    visualizerCtx.fillRect(0, 0, visualizer.width, visualizer.height);

    const barWidth = (visualizer.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * visualizer.height;

        const gradient = visualizerCtx.createLinearGradient(0, visualizer.height, 0, visualizer.height - barHeight);
        gradient.addColorStop(0, 'rgba(108, 99, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(108, 99, 255, 0.8)');

        visualizerCtx.fillStyle = gradient;
        visualizerCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    requestAnimationFrame(drawVisualizer);
}

// Dynamic Background
function updateGradient(colors) {
    const [color1, color2] = colors.split(',');
    const gradient = gradientCtx.createLinearGradient(0, 0, gradientCanvas.width, gradientCanvas.height);
    
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    gradientCtx.fillStyle = gradient;
    gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
}

// Sample music data - Replace with your actual music data or API integration
const musicData = {
    happy: [
        { 
            id: 1, 
            title: "Aaj Ki Party", 
            artist: "Mika Singh", 
            url: "songs/happy/Aaj Ki Party.mp3",
            cover: "assets/aaj.jpg"
        },
        { 
            id: 2, 
            title: "Badtameez Dil", 
            artist: "Benny Dayal, Shefali Alvares", 
            url: "songs/happy/Badtameez Dil.mp3",
            cover: "assets/batmiz.jpg"
        },
        { 
            id: 3, 
            title: "Desi Girl", 
            artist: "Shankar Mahadevan, Sunidhi Chauhan, Vishal Dadlani", 
            url: "songs/happy/Desi Girl.mp3",
            cover: "assets/desi.jpg"
        },
        { 
            id: 4, 
            title: "Gallan Goodiyaan", 
            artist: "Yashita Sharma, Shankar Mahadevan, Sunidhi Chauhan, Vishal Dadlani", 
            url: "songs/happy/Gallan Goodiyaan.mp3",
            cover: "assets/gall.jpg"
        },
        { 
            id: 5, 
            title: "Ude Dil Befikre", 
            artist: "Benny Dayal", 
            url: "songs/happy/Ude Dil Befikre.mp3",
            cover: "assets/ude dil befikre.jpg"
        }
    ],
    sad: [
        { 
            id: 6, 
            title: "Agar Tum Saath Ho", 
            artist: "Alka Yagnik,Arijit Singh", 
            url: "songs/sad/AGAR TUM SAATH HO.mp3",
            cover: "assets/agar tum.jpeg"
        },
        { 
            id: 7, 
            title: "Bhula Dena Mujhe", 
            artist: " Mustafa Zahid", 
            url: "songs/sad/Bhula Dena Mujhe.mp3",
            cover: "assets/bhula.jpeg"
        },
        { 
            id: 8, 
            title: "Channa Mereya", 
            artist: " Arijit Singh", 
            url: "songs/sad/Channa Mereya.mp3",
            cover: "assets/chana.jpeg"
        },
        { 
            id: 9, 
            title: "Judaai", 
            artist: "Rekha Bhardwaj, Arijit Singh", 
            url: "songs/sad/Judaai.mp3",
            cover: "assets/judaai.jpeg"
        },
        { 
            id: 10, 
            title: "Tujhe Bhula Diya", 
            artist: "Mohit Chauhan, Shekhar Ravjiani, Shruti Pathak", 
            url: "songs/sad/Tujhe Bhula Diya.mp3",
            cover: "assets/tujhe bhula.jpeg"
        }
    ],
    relaxing: [
        { 
            id: 11, 
            title: "Ilahi", 
            artist: "Arijit Singh", 
            url: "songs/relaxing/Ilahi.mp3",
            cover: "assets/ilahi.jpeg"
        },
        { 
            id: 12, 
            title: "Matargashti", 
            artist: "Mohit Chauhan", 
            url: "songs/relaxing/MATARGASHTI.mp3",
            cover: "assets/matargasti.jpeg"
        },
        { 
            id: 13, 
            title: "Raabta", 
            artist: "Arijit Singh, Aditi Singh Sharma", 
            url: "songs/relaxing/Raabta Kehte Hain Khuda.mp3",
            cover: "assets/raabta.jpeg"
        },
        { 
            id: 14, 
            title: "Shayad", 
            artist: "Arijit Singh", 
            url: "songs/relaxing/Shayad.mp3",
            cover: "assets/sayed.jpeg"
        },
        { 
            id: 15, 
            title: "Tum Mile", 
            artist: "Javed Ali", 
            url: "songs/relaxing/Tum Mile.mp3",
            cover: "assets/tum mila.jpeg"
        }
    ],
    energetic: [
        { 
            id: 16, 
            title: "Malhari", 
            artist: "Vishal Dadlani", 
            url: "songs/energetic/Malhari.mp3",
            cover: "assets/malhari.jpeg"
        },
        { 
            id: 17, 
            title: "Jai Jai Shivshankar", 
            artist: "Vishal Dadlani, Benny Dayal", 
            url: "songs/energetic/Jai Jai Shivshankar.mp3",
            cover: "assets/shivsankar.jpeg"
        },
        { 
            id: 18, 
            title: "Zinda", 
            artist: "Siddharth Mahadevan", 
            url: "songs/energetic/Zinda.mp3",
            cover: "assets/zinda.jpeg"
        },
        { 
            id: 19, 
            title: "Sultan", 
            artist: " Sukhwinder Singh, Shadab Faridi", 
            url: "songs/energetic/Sultan.mp3",
            cover: "assets/sultan.jpeg"
        },
        { 
            id: 20, 
            title: "Sher Khul Gaye", 
            artist: "Vishal Dadlani, Shekhar Ravjiani", 
            url: "songs/energetic/Sher Khul Gaye.mp3",
            cover: "assets/sheer.jpeg"
        }
    ],
    romantic: [
        { 
            id: 21, 
            title: "Dil Dhadakne Do", 
            artist: " Farhan Akhtar, Priyanka Chopra", 
            url: "songs/romantic/Dil Dhadakne Do.mp3",
            cover: "assets/dil dadkana.jpeg"
        },
        { 
            id: 22, 
            title: "Hawayein", 
            artist: "Arijit Singh", 
            url: "songs/romantic/Hawayein.mp3",
            cover: "assets/hawayein.jpeg"
        },
        { 
            id: 23, 
            title: "Janam Janam", 
            artist: "Arijit Singh, Antara Mitra", 
            url: "songs/romantic/Janam Janam.mp3",
            cover: "assets/janam.jpeg"
        },
        { 
            id: 24, 
            title: "Ranjha", 
            artist: " Jasleen Royal, B Praak", 
            url: "songs/romantic/Ranjha.mp3",
            cover: "assets/ranjha.jpeg"
        },
        { 
            id: 25, 
            title: "Tum Se Hi", 
            artist: "Mohit Chauhan", 
            url: "songs/romantic/Tum Se Hi.mp3",
            cover: "assets/tum se hi.jpeg"
        }
    ]
};

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const moodButtons = document.querySelectorAll('.mood-btn');
const playlist = document.getElementById('playlist');
const audioPlayer = new Audio();
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const progressBar = document.querySelector('.progress');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const currentSongTitle = document.getElementById('current-song');
const currentSongArtist = document.getElementById('current-artist');
const albumCover = document.getElementById('album-cover');
const searchInput = document.getElementById('searchInput');

// State
let currentMood = localStorage.getItem('currentMood') || 'happy';
let currentPlaylist = [];
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let repeatMode = 'none'; // none, one, all
let originalPlaylist = [];

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Initialize theme
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Mood Selection
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        const colors = button.dataset.color;
        updateGradient(colors);
        setMood(mood);
    });
});

function setMood(mood) {
    currentMood = mood;
    localStorage.setItem('currentMood', mood);
    
    // Update active button
    moodButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mood === mood);
        if (btn.dataset.mood === mood) {
            updateGradient(btn.dataset.color);
        }
    });
    
    // Update playlist
    originalPlaylist = [...musicData[mood]];
    currentPlaylist = isShuffled ? shuffleArray([...originalPlaylist]) : [...originalPlaylist];
    displayPlaylist();
}

// Shuffle functionality
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffleButton.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleButton.classList.toggle('active');
    
    if (isShuffled) {
        currentPlaylist = shuffleArray([...currentPlaylist]);
    } else {
        currentPlaylist = [...originalPlaylist];
    }
    
    displayPlaylist();
});

// Repeat functionality
repeatButton.addEventListener('click', () => {
    switch (repeatMode) {
        case 'none':
            repeatMode = 'one';
            repeatButton.innerHTML = '<i class="fas fa-repeat-1"></i>';
            break;
        case 'one':
            repeatMode = 'all';
            repeatButton.innerHTML = '<i class="fas fa-repeat"></i>';
            repeatButton.classList.add('active');
            break;
        case 'all':
            repeatMode = 'none';
            repeatButton.innerHTML = '<i class="fas fa-repeat"></i>';
            repeatButton.classList.remove('active');
            break;
    }
});

// Search Functionality with Debounce
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.trim().toLowerCase();
        displayPlaylist(searchTerm);
    }, 300);
});

// Display Playlist
function displayPlaylist(searchTerm = '') {
    playlist.innerHTML = '';
    
    // Filter songs based on search term
    const filteredPlaylist = currentPlaylist.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );

    if (filteredPlaylist.length === 0) {
        playlist.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--text-light);">No songs found</div>';
        return;
    }

    filteredPlaylist.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        if (index === currentSongIndex && isPlaying) {
            songElement.classList.add('playing');
        }

        // Highlight search term if present
        const title = searchTerm ? highlightSearchTerm(song.title, searchTerm) : song.title;
        const artist = searchTerm ? highlightSearchTerm(song.artist, searchTerm) : song.artist;

        songElement.innerHTML = `
            <i class="fas fa-music"></i>
            <div style="margin-left: 1rem; flex-grow: 1;">
                <div>${title}</div>
                <div style="font-size: 0.8rem; color: var(--primary-color)">${artist}</div>
            </div>
        `;
        songElement.addEventListener('click', () => playSong(index));
        playlist.appendChild(songElement);
    });
}

// Helper function to highlight search terms
function highlightSearchTerm(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Audio Player Controls
async function playSong(index) {
    if (index >= 0 && index < currentPlaylist.length) {
        currentSongIndex = index;
        const song = currentPlaylist[currentSongIndex];
        
        // Update album art
        albumCover.src = song.cover || 'assets/default-album.png';
        
        // Setup audio context for visualizer
        try {
            setupAudioContext();
            drawVisualizer();
        } catch (error) {
            console.error('Error setting up audio context:', error);
        }
        
        audioPlayer.src = song.url;
        audioPlayer.play()
            .catch(error => {
                console.error('Error playing audio:', error);
                alert('Unable to play audio. Please make sure you have audio files in the correct location.');
            });
        
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
        isPlaying = true;
        updatePlayButton();
        displayPlaylist(searchInput.value);
    }
}

playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPrevious);
nextButton.addEventListener('click', playNext);

function togglePlay() {
    if (audioPlayer.src) {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying;
        updatePlayButton();
        displayPlaylist(searchInput.value);
    } else if (currentPlaylist.length > 0) {
        playSong(0);
    }
}

function playPrevious() {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
        newIndex = currentPlaylist.length - 1;
    }
    playSong(newIndex);
}

function playNext() {
    if (repeatMode === 'one') {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        return;
    }

    let newIndex = currentSongIndex + 1;
    if (newIndex >= currentPlaylist.length) {
        if (repeatMode === 'all') {
            newIndex = 0;
        } else {
            audioPlayer.pause();
            isPlaying = false;
            updatePlayButton();
            return;
        }
    }
    playSong(newIndex);
}

function updatePlayButton() {
    playButton.innerHTML = `<i class="fas fa-${isPlaying ? 'pause' : 'play'}"></i>`;
}

// Progress Bar
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audioPlayer.duration);
});

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioPlayer.volume = volume;
});

// Click on progress bar to seek
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.offsetX / progressBar.offsetWidth;
    audioPlayer.currentTime = clickPosition * audioPlayer.duration;
});

// Auto-play next song
audioPlayer.addEventListener('ended', () => {
    playNext();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
        playPrevious();
    } else if (e.code === 'ArrowRight' && e.ctrlKey) {
        playNext();
    }
});

// Initialize the player
setMood(currentMood); 