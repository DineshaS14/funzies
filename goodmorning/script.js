// ⏰ Update live time every second and manage greetings
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

  const hour = now.getHours();
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const name = getNameFromQuery();
  const greeting = document.getElementById('greeting');
  const gifContainer = document.getElementById('gif-container');
  const todoTitle = document.getElementById('todo-title');

  if (hour >= 6 && hour < 20) {
    greeting.textContent = `Good Morning, ${name}! ☀️`;
    gifContainer.innerHTML = `
      <img src="https://media1.giphy.com/media/1Fm7jEapE18HwS6fkT/giphy.gif" alt="Sunrise GIF" />
      <img src="https://media.giphy.com/media/hxYfehakIY81nY3yoJ/giphy.gif" alt="Coffee GIF" />
    `;
    todoTitle.textContent = '☀️ Morning Planner';
    updateMarquees({
      top: "💨🍃💨🍃💨🍃💨🍃💨🍃💨🍃",
      sub: "🕊️  🦅  🕊️  🦅  🕊️  🦅",
      mid: "☀️ Your energy is golden today — go shine. 💛",
      bottom: "Have a wonderful day, stay fueled, energized, and attack the day! 💪☀️"
    });
  } else {
    greeting.textContent = `Good Night, ${name} 🌌`;
    gifContainer.innerHTML = `
      <img src="https://media4.giphy.com/media/nbJS250jag85kNv4jT/giphy.gif" alt="Night Cozy GIF" />
    `;
    todoTitle.textContent = '🌙 Night Journal — Self-Care Edition';
    updateMarquees({
      top: "🌙 Let your thoughts settle like stardust... you're doing great ✨",
      sub: "🌙 They say the brain leans 80% toward shadows and only 20% toward light — but love, even the smallest spark, can flip the balance.",
      mid: "💫 You're held in the warmth of the universe — safe, loved, born for a story only your heart can tell. 💜",
      bottom: "Sweet dreams start with sweet thoughts 💭💖 Write yours..."
    });
  }
}

function updateMarquees({ top, sub, mid, bottom }) {
  document.getElementById('top-marquee').textContent = top;
  document.getElementById('sub-marquee').textContent = sub;
  document.getElementById('mid-marquee').textContent = mid;
  document.getElementById('bottom-marquee').textContent = bottom;
}

// 🔤 Get name from query string
function getNameFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// 🌙 Moon phase
fetch('https://api.farmsense.net/v1/moonphases/?d=' + Math.floor(Date.now()/1000))
  .then(res => res.json())
  .then(data => {
    const moon = data[0]?.Phase || "Unavailable";
    document.getElementById('moon-phase').textContent = `🌙 Moon: ${moon}`;
  });

// 🎵 Music controls
const iframe = document.getElementById('bg-music');
let musicPlaying = false;

function playTrack(url) {
  iframe.src = url;
  musicPlaying = true;
}
function stopTrack() {
  iframe.src = '';
  musicPlaying = false;
}
function toggleMusic() {
  if (musicPlaying) {
    stopTrack();
  } else {
    playTrack("https://www.youtube.com/embed/AtPrjYp75uA?autoplay=1&loop=1&playlist=AtPrjYp75uA");
  }
}

// ✅ Add task to the to-do list
document.getElementById('todo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const task = input.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    li.classList.add('todo-animate');
    document.getElementById('todo-list').appendChild(li);
    input.value = '';
  }
});

// 📥 Save to-do list
document.getElementById('download-btn').addEventListener('click', function () {
  const tasks = Array.from(document.querySelectorAll('#todo-list li')).map(li => `• ${li.textContent}`);
  if (tasks.length === 0) {
    alert("Add at least one task to download your list!");
    return;
  }
  const blob = new Blob([tasks.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'my-todo-list.txt';
  link.click();
});

// 🔁 Start everything
updateTime();
setInterval(updateTime, 1000);
