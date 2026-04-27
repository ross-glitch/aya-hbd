// Letter Content Data
const letters = {
  "Elai": `Happy Birthday Aya! 💖\n\nFrom being my first roommate to surviving pharmacy school together, you’ve been one of my constants, the kind of person I can be completely unhinged with and still feel understood.Same humor, same brainrot, same random references that no one else gets.Peak connection.

    You’re one of the purest and most genuine souls I know.You love deeply, you care quietly, and you show up in ways that people don’t always notice, but I do.And I hope you never lose that softness, even if the world tries to make you harder.

I know the past months were heavy, but somehow you’re still here, still choosing to be you, and that alone is something I admire so much.Healing looks good on you, even on the days it doesn’t feel like it.

We are really lucky to have you in our lives.Through everything, games, late talks, chaos, and all the little in-betweens.

With love,
  Elai ✨`,
  "Leah": `To my Aya,

You were my first friend in college, aside from Yesha and Faith kay kilala ko na sila ngadaan nga duwa. I never thought we would become this close, and I’m grateful that we did. I appreciate you, Aya. It’s funny that you see me as your younger sister, even though you don’t really want one. I guess I’m honored hehe. You are a genuinely good friend, di lang sakon, but to everyone. You always care and consider other people’s feelings, even when you don’t agree sometimes. You’re someone worth keeping in life, Aya. I admire you for your intelligence and for making decisions that are truly good for you. I hope you heal from the things you don’t talk about. You deserve to be happy and to be loved just the way you are. Bisan kis-a, love-hate aton relationship, I’m always here for you bebe ko. I hope our friendship continues to grow, and I’m rooting for you, future RPh. Don’t let anyone drag you down from your dreams.`,
  "Wej": `Happy Birthday, my roomie!\n\nI really miss our after-class debriefings where we’d unpack each other's chaos (chismis). I hope this year treats you with a lot more kindness. Happy first day of duty? aw ah. HAHAHAAHHA `,
  "Erika": `(KAARAWANISMO)

Sabi nila, sa kolehiyo mahirap makatagpo ng isang tunay na kaibigan. At totoo nga, sa dinami dami ng taong aking nakasama't nakakuwentuhan, isa ka sa mga hindi ko inaasahan. Aya, sa iyong kaarawan gusto ko lamang ipaalam na isa kang biyaya na binigay ng may kapal. Lagi mong tatandaan na ang ating pagkakaibigan ay parang dagat na kung saan hindi makikita ang katapusan. Salamat sayong mga pangaral, payo at sa pag tanggap sakin sa iyong buhay. Isa ka sa mga taong tumulong saking maniwala, na ok lang maging masaya, maging malungkot, at higit sa lahat  magkaroon ng isang tunay na babaeng kaibigan. Maligayang Kaarawan, Aya! Mahal ka namin! Nawa'y nahanap mo na ang tunay na kaligayahan!`,
  "Elle": `happiest birthday to one of the most genuine souls i know\n\nyou have been more than just a friend to me you became my comfort during my lowest days, my safe place when life too heavy & the person who reminded me that brighter days would come of course. im so hrateful for your presence, your kindness and the way you always make people feel loved & understood. \n\nyou truly deserve every beautiful thing happening in your life right now because you worked hard for it, prayed for it, and stayed strong through everything. seeing you happy, glowing and thriving makes my heart so proud because you deserve all the love, peace, success, and blessings this world can offer. \n\nhappy birthday happy birthday, my ayaness! love you always and forever🥰❤️`
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

      // Auto-scroll to bottom of letter
      const scrollArea = document.querySelector('.letter-scroll-area');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
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

// --- Music Toggle Logic ---
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;
let player;

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('ytplayer', {
    height: '0',
    width: '0',
    videoId: 'Gpd85y_iTxY', // Minecraft - Mice On Venus
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'Gpd85y_iTxY'
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  player.setVolume(50);

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      player.pauseVideo();
      musicBtn.classList.remove('playing');
      musicBtn.querySelector('.music-icon').textContent = '🎵';
      musicBtn.querySelector('.music-text').textContent = 'Play Music';
    } else {
      player.playVideo();
      musicBtn.classList.add('playing');
      musicBtn.querySelector('.music-icon').textContent = '🔊';
      musicBtn.querySelector('.music-text').textContent = 'Pause Music';
    }
    isPlaying = !isPlaying;
  });

  // Optional: Try to play when the user first interacts with the page anywhere
  document.addEventListener('click', () => {
    if (!isPlaying && player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.playVideo();
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.querySelector('.music-icon').textContent = '🔊';
      musicBtn.querySelector('.music-text').textContent = 'Pause Music';
    }
  }, { once: true });
}

// --- End Credits Logic ---
const endCreditsBtn = document.getElementById('endCreditsBtn');
const endCreditsScene = document.getElementById('endCreditsScene');
const backFromCreditsBtn = document.getElementById('backFromCreditsBtn');
const mainContainer = document.querySelector('.container');
const scrollContainer = document.querySelector('.credits-scroll-container');
let autoScrollInterval;
let resumeScrollTimeout;
let isProgrammaticScroll = false;

function resumeAutoScroll() {
  clearInterval(autoScrollInterval); // ensure we don't double up
  autoScrollInterval = setInterval(() => {
    isProgrammaticScroll = true;
    scrollContainer.scrollTop += 1;
  }, 40); // Auto-scroll speed
}

function handleUserScroll() {
  if (isProgrammaticScroll) {
    isProgrammaticScroll = false;
    return; // Ignore scrolls triggered by setInterval
  }

  clearInterval(autoScrollInterval);
  clearTimeout(resumeScrollTimeout);
  
  // Resume scrolling after 1.5 seconds of no interaction
  resumeScrollTimeout = setTimeout(() => {
    resumeAutoScroll();
  }, 1500);
}

function startAutoScroll() {
  scrollContainer.scrollTop = 0;
  resumeAutoScroll();
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  clearTimeout(resumeScrollTimeout);
}

if (endCreditsBtn && endCreditsScene && backFromCreditsBtn && mainContainer) {
  endCreditsBtn.addEventListener('click', () => {
    endCreditsScene.classList.add('active');
    mainContainer.classList.add('slide-up');
    startAutoScroll();
  });

  backFromCreditsBtn.addEventListener('click', () => {
    mainContainer.classList.remove('slide-up');
    stopAutoScroll();
    setTimeout(() => {
      endCreditsScene.classList.remove('active');
    }, 1500); // Wait for slide down to finish before hiding
  });

  // Pause auto-scroll when user interacts, and resume after delay
  scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });
}
