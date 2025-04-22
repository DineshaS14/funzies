// ⏰ Update live time every second
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // 🌞 Optional: personalize greeting if ?name=John in URL
  function personalizeGreeting() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
      document.getElementById('greeting').textContent = `Good Morning, ${decodeURIComponent(name)}!`;
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
  
  // 📥 Save to-do list as a .txt file
  document.getElementById('download-btn').addEventListener('click', function () {
    const tasks = Array.from(document.querySelectorAll('#todo-list li'))
      .map(li => `• ${li.textContent}`);
  
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
  
  // 🔁 Initialize page
  personalizeGreeting();
  updateTime();
  setInterval(updateTime, 1000); // Update clock every second
  