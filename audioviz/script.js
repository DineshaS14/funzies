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

// 🔄 Wave type preference (set 'bars' as default)
let waveType = 'bars';

// Function to play a song from a path
function playSong(src) {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  audio.src = src;
  audio.load();

  audio.play().catch(err => {
    console.error("Playback error:", err);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.canvas-wrapper');
  const canvas = document.getElementById('visualizer');

  wrapper.addEventListener('pointerup', (e) => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const clickX = e.clientX - wrapperRect.left;
    const clickY = e.clientY - wrapperRect.top;

    // Check if the click/tap is outside the canvas
    const isOutsideCanvas =
      e.clientX < canvasRect.left ||
      e.clientX > canvasRect.right ||
      e.clientY < canvasRect.top ||
      e.clientY > canvasRect.bottom;

    if (isOutsideCanvas) {
      const particleCount = 15; // Number of particles per explosion
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('smoke-particle');

        // Random size between 20px and 60px
        const size = Math.floor(Math.random() * 40) + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random offset to spread particles more widely
        const offsetX = (Math.random() - 0.5) * 200; // Increased spread
        const offsetY = (Math.random() - 0.5) * 200;

        particle.style.left = `${clickX + offsetX - size / 2}px`;
        particle.style.top = `${clickY + offsetY - size / 2}px`;

        // Random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        particle.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;

        wrapper.appendChild(particle);

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
          particle.remove();
        });
      }
    }
  });
});


// 🎨 Original drawBars (your original visualizer)
function drawBars() {
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 1.5;

    const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
    gradient.addColorStop(0, `hsl(${i * 2}, 100%, 50%)`);
    gradient.addColorStop(1, '#000');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight + 40); //

    x += barWidth + 1;
  }
}

// 🌊 Optional Sine Wave visualizer
function drawSineWave() {
  analyser.getByteTimeDomainData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00ffcc';
  ctx.beginPath();

  const sliceWidth = canvas.width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * canvas.height / 2;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    x += sliceWidth;
  }

  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

// 🪞 Optional mirrored bar visualizer
function drawMirror() {
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * .8;

    const gradient = ctx.createLinearGradient(0, canvas.height / 2 - barHeight, 0, canvas.height / 2 + barHeight);
    gradient.addColorStop(0, `hsl(${i * 2}, 100%, 50%)`);
    gradient.addColorStop(1, '#000');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height / 2 - barHeight, barWidth, barHeight); // top
    ctx.fillRect(x, canvas.height / 2, barWidth, barHeight);             // bottom

    x += barWidth + 1;
  }
}

// 🔁 Master draw loop: delegates based on waveType
function draw() {
  requestAnimationFrame(draw);

  switch (waveType) {
    case 'sine':
      drawSineWave();
      break;
    case 'mirror':
      drawMirror();
      break;
    case 'bars':
    default:
      drawBars();
      break;
  }
}

// Handle file upload for custom songs
audioFileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  audio.src = fileURL;
  audio.load();
  audio.play();
});

// Example: hook up to dropdown with id="waveTypeSelect"
const waveTypeSelect = document.getElementById('waveTypeSelect');
if (waveTypeSelect) {
  waveTypeSelect.addEventListener('change', function () {
    waveType = this.value;
  });
}

// 🚀 Kick off the animation
draw();
