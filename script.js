const secret = "pookie"; // CHANGE THIS
  const message = "On your special day, I just want to remind you how much you mean to me. You're my best friend, my partner, and my forever. From our late-night talks to our silly inside jokes, every moment with you is my favorite.";
  const typingEl = document.getElementById('typing');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const music = document.getElementById('bgMusic');

  function unlock() {
    const input = document.getElementById('password').value
      .trim()
      .toLowerCase();

    if (input === secret.toLowerCase()) {
      document.getElementById('lock').classList.add('hidden');
      document.getElementById('content').classList.remove('hidden');
      typeMessage();
    } else {
      alert('Oops 😜 try again');
    }
  }

  // Allow Enter key to unlock
  document.getElementById('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') unlock();
  });

  function typeMessage(i = 0) {
    if (i < message.length) {
      typingEl.textContent += message.charAt(i);
      setTimeout(() => typeMessage(i + 1), 40);
    }
  }

  // No button morphs into Yes
  function morphToYes() {
    noBtn.textContent = 'Yes 💕';
    noBtn.style.background = '#e63946';
    noBtn.style.color = '#fff';
    noBtn.style.transform = 'scale(1.05)';
  }

  function resetNo() {
    noBtn.textContent = 'No 🙈';
    noBtn.style.background = '#ccc';
    noBtn.style.color = '#333';
    noBtn.style.transform = 'scale(1)';
  }

  noBtn.addEventListener('mouseover', morphToYes);
  noBtn.addEventListener('mouseout', resetNo);

  // Clicking No triggers Yes action
  noBtn.addEventListener('click', () => {
    yesBtn.click();
  });

  yesBtn.addEventListener('click', () => {
    document.getElementById('buttons').classList.add('hidden');
    document.getElementById('chat').classList.remove('hidden');
    document.getElementById('final').classList.remove('hidden');
    music.play();
    hearts();
    confetti();
    startCountdown();
  });

  function hearts() {
    setInterval(() => {
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = '💖';
      h.style.left = Math.random() * 100 + 'vw';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 6000);
    }, 300);
  }

  function confetti() {
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = `hsl(${Math.random()*360},100%,70%)`;
      c.style.animationDuration = 2 + Math.random() * 2 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }

  function startCountdown() {
    const target = new Date('February 14, 2026');
    //target.setDate(target.getDate() + 3); // CHANGE DATE
    var x = setInterval(() => {
      var diff = target - new Date();
      var d = Math.floor(diff / (1000*60*60*24));
      var h = Math.floor(diff / (1000*60*60)) % 24;
      var m = Math.floor(diff / (1000*60)) % 60;
      var s = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('countdown').textContent =
        `${d}d ${h}h ${m}m ${s}s 💕`;
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Happy Valentine Day, Pookie ❤️";
        }
    }, 1000);
  }