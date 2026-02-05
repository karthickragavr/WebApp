let score = 0;
let bossHealth = 5;
let gameActive = false;
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const boss = document.getElementById('boss');

// 1. Jump Logic
// Function to trigger the jump
function performJump() {
    if (gameActive && !player.classList.contains("jump")) {
        player.classList.add("jump");
        setTimeout(() => player.classList.remove("jump"), 500);
    }
}

// Listen for Spacebar (Desktop)
document.addEventListener('keydown', (e) => {
    if (e.code === "Space") performJump();
});

// Listen for Taps/Clicks (Mobile & Desktop)
// "touchstart" is preferred for mobile to avoid the ~300ms click delay
document.addEventListener('touchstart', (e) => {
    performJump();
    // prevents double-triggering if the browser also sends a click event
    if (e.cancelable) e.preventDefault(); 
}, { passive: false });

document.addEventListener('click', performJump);

// 2. Obstacle Movement & Collision
let gameLoop = setInterval(() => {
    if (!gameActive) return;

    let obsLeft = parseInt(window.getComputedStyle(obstacle).left);
    let playerBottom = parseInt(window.getComputedStyle(player).bottom);

    // Reset obstacle
    if (obsLeft < -50) {
        obstacle.style.left = "600px";
        score++;
        document.getElementById('score-val').innerText = score;
        
        if (score >= 10) {
            startBossBattle();
        }
    } else {
        obstacle.style.left = (obsLeft - 5) + "px";
    }

    // --- UPDATED COLLISION DETECTION ---
    if (obsLeft > 50 && obsLeft < 90 && playerBottom < 40) {
        clearInterval(gameLoop); // 1. Stop the loop instantly
        gameActive = false;      // 2. Prevent any other logic
        
        alert("Oops! Try again for love!");
        location.reload();       // 3. Now it will reload properly
    }
}, 20);

function startBossBattle() {
    gameActive = false;
    obstacle.style.display = "none";
    boss.style.display = "block";
    document.getElementById('status').innerText = "TAP THE HEART TO REVEAL THE MESSAGE!";
}

// 3. Boss Defeat Logic
function handleBossHit(e) {
    if (e.cancelable) e.preventDefault(); // Stop mobile from doing "default" click logic
    
    bossHealth--;
    
    // Visual feedback for the hit
    boss.style.transform = "scale(1.3)";
    boss.style.filter = "brightness(1.5)";
    setTimeout(() => {
        boss.style.transform = "scale(1)";
        boss.style.filter = "brightness(1)";
    }, 100);
    
    if (bossHealth <= 0) {
        defeatBoss();
    }
}

// Attach both event types
boss.addEventListener('click', handleBossHit);
boss.addEventListener('touchstart', handleBossHit, { passive: false });

function defeatBoss() {
    boss.style.display = "none";
    document.getElementById('letter').classList.remove('hidden');
    // Your special message
    document.getElementById('daily-message').innerText = "I love you more than all the code in the world!";
}

//surprise button
const navBtn = document.getElementById('nav-btn');

function navigateToSurprise(e) {
    if (e.cancelable) e.preventDefault(); // Stop double-triggering
    window.location.href = "surprise.html";
}

// Add BOTH for maximum compatibility
navBtn.addEventListener('click', navigateToSurprise);
navBtn.addEventListener('touchstart', navigateToSurprise, { passive: false });



//Instructions
const modal = document.getElementById('instructions-modal');
// Modal Close & Game Start
document.getElementById('start-btn').addEventListener('click', () => {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
    gameActive = true; // Start your game loop here
});
document.getElementById('start-btn').addEventListener('touchstart', () => {
    // 1. Hide instructions
    document.getElementById('instructions-modal').style.display = "none";
    
    // 2. Show countdown
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownText = document.getElementById('countdown-text');
    countdownOverlay.style.display = "flex";

    let count = 3;
    countdownText.innerText = count;

    const timer = setInterval(() => {
        count--;
        if (count === 0) {
            countdownText.innerText = "GO!";
        } else if (count < 0) {
            // 3. Start Game
            clearInterval(timer);
            countdownOverlay.style.display = "none";
            document.body.classList.remove('no-scroll');
            gameActive = true; // The flag we added earlier to start the loop
        } else {
            countdownText.innerText = count;
        }
    }, 1000); // 1-second interval
});

//cheatcode
const playerDiv = document.getElementById('player');
let longPressTimer;
let lastTap = 0;

// Backdoor Logic
function backdoorAction() {
    console.log("Backdoor: Skipping to Boss!");
    score = 10;
    document.getElementById('score-val').innerText = score;
    startBossBattle();
}

// 1. Long Press (Web & Mobile)
playerDiv.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(backdoorAction, 800); 
});
playerDiv.addEventListener('mouseup', () => clearTimeout(longPressTimer));
playerDiv.addEventListener('touchstart', (e) => {
    longPressTimer = setTimeout(backdoorAction, 800);
}, { passive: true });
playerDiv.addEventListener('touchend', () => clearTimeout(longPressTimer));

// 2. Double Tap (Mobile/Touch)
playerDiv.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
        backdoorAction();
    }
    lastTap = currentTime;
});


