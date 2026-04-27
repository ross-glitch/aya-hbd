// Letter Content Data
const letters = {
  "Elai": "Happy Birthday Aya! 💖\n\nI just want you to know how special you are and how lucky we are to have you in our lives. You brighten up every room you walk into and inspire everyone around you.\n\nI hope today brings you endless happiness, beautiful memories, and all the love you deserve! Enjoy your day to the fullest, you deserve it all! ✨",
  "Leah": "To my dearest Aya 🌸\n\nWishing you the most magical birthday! You are such a radiant soul and I cherish every moment we spend together.\n\nMay this year bring you closer to your dreams. Let's celebrate soon! Love you to the moon and back.",
  "Wej": "Happy B-Day Aya! 🎈\n\nHope you have an amazing day filled with cake, laughter, and all your favorite things.\n\nYou're an awesome friend and I'm so grateful for you. Cheers to another fantastic year ahead!",
  "Cha": "Aya!!! Happy Birthday! 🎀\n\nYou are literally the sweetest person ever. Thank you for always being there for me and for being such a wonderful friend.\n\nSending you the biggest hugs today. Have the best birthday ever!",
  "Liam": "Happy Birthday Aya! 🎂\n\nWishing you a day as wonderful as you are. Keep shining your light and being the amazing person we all know and love.\n\nHave a great celebration today!",
  "Chloe": "My darling Aya! 💝\n\nHappy, happy birthday! I hope your day is filled with everything pastel, cute, and magical, just like you.\n\nI love you so much and can't wait to see what this next year brings for you!"
};

// DOM Elements
const modalOverlay = document.getElementById('letterModal');
const modalName = document.getElementById('modalName');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.modal-close');
const friendBtns = document.querySelectorAll('.friend-btn');
const modalContent = document.querySelector('.modal-content');

// Typing Animation State
let typingInterval = null;
let isTyping = false;
let currentFullText = "";

function openModal(friendName) {
  currentFullText = letters[friendName] || "Happy Birthday!";
  modalName.textContent = friendName;
  modalText.innerHTML = ""; // Clear previous text

  // Show modal
  modalOverlay.classList.add('active');

  // Start typing effect after a small delay (300-500ms)
  setTimeout(() => {
    startTypingEffect(currentFullText);
  }, 200);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  stopTypingEffect();
}

function startTypingEffect(text) {
  isTyping = true;
  modalText.innerHTML = '<span class="typed-text"></span><span class="cursor"></span>';
  const textSpan = modalText.querySelector('.typed-text');

  let i = 0;

  function typeChar() {
    if (!isTyping) return; // Stop if skipped or closed

    if (i < text.length) {
      const char = text.charAt(i);

      // Handle newlines
      if (char === '\n') {
        textSpan.appendChild(document.createElement('br'));
      } else {
        textSpan.innerHTML += char;
      }

      i++;

      // Calculate delay (20-40ms random)
      let delay = Math.floor(Math.random() * 40) + 40;

      // Pause on commas and periods
      if (char === ',' || char === '.' || char === '!' || char === '?') {
        delay += 300; // Extra pause for realism
      }

      typingInterval = setTimeout(typeChar, delay);
    } else {
      finishTypingEffect();
    }
  }

  // Start the typing loop
  typeChar();
}

function stopTypingEffect() {
  isTyping = false;
  if (typingInterval) {
    clearTimeout(typingInterval);
  }
}

function finishTypingEffect() {
  stopTypingEffect();
  // Ensure the full text is displayed correctly with line breaks
  modalText.innerHTML = currentFullText.replace(/\n/g, '<br>') + '<span class="cursor"></span>';
}

// Event Listeners for Modal
friendBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.name);
  });
});

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeModal();
});

modalOverlay.addEventListener('click', (e) => {
  // Close if clicking outside the modal content
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Click modal content to skip typing
modalContent.addEventListener('click', () => {
  if (isTyping) {
    finishTypingEffect();
  }
});

// --- Magic Effects ---

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Click to spawn hearts
if (!prefersReducedMotion) {
  document.addEventListener('click', (e) => {
    // Don't spawn hearts if clicking a button or inside modal content
    if (e.target.closest('button') || e.target.closest('.modal-content')) return;

    const numHearts = Math.floor(Math.random() * 3) + 3; // 3 to 5 hearts
    const emojis = ['♥'];

    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement('div');
      heart.classList.add('magic-heart');
      heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

      // Randomize position slightly around the cursor
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;

      heart.style.left = `${e.clientX + offsetX}px`;
      heart.style.top = `${e.clientY + offsetY}px`;

      // Randomize animation duration slightly
      heart.style.animationDuration = `${0.8 + Math.random() * 0.5}s`;

      document.body.appendChild(heart);

      // Clean up after animation
      setTimeout(() => {
        heart.remove();
      }, 1500);
    }
  });

  // Ambient Drifting Petals
  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Random properties
    const size = Math.random() * 10 + 5;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 5 + 5; // 5-10s fall
    petal.style.animationDuration = `${duration}s`;

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000);
  }

  // Spawn petals periodically
  setInterval(createPetal, 800);
}
