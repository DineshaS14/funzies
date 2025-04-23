const audioFileInput = document.getElementById('audioFile');
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Initialize Web Audio API context and elements
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source = audioContext.createMediaElementSource(audio);
let analyser = audioContext.createAnalyser();
let dataArray, bufferLength;

// Set up audio graph
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 256;
bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);

// Function to play a song from a path
function playSong(src) {
  // 🔧 Fix: Resume AudioContext if it's suspended (due to browser autoplay policy)
  // Modern browsers often suspend AudioContext until a user gesture occurs.
  // Without resuming it, audio playback won't start even if play() is called.
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // 🎵 Set and play the new audio source
  audio.src = src;
  audio.load();

  // ✅ Always catch playback errors (common if autoplay is blocked)
  audio.play().catch(err => {
    console.error("Playback error:", err);
  });
}
// Function to draw the audio visualizer
function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5; // Adjusted for better spacing
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 1.3; // Increased height scaling factor

    // Create a gradient for each bar
    const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
    gradient.addColorStop(0, `hsl(${i * 2}, 100%, 50%)`);
    gradient.addColorStop(1, '#000');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

// Handle custom file upload
audioFileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  audio.src = fileURL;
  audio.load();
  audio.play();
});

// Start the visualizer loop
draw();
