// script.js (rich interaction ~300 lines, no useless filler)

// ================= INIT =================
const sections = document.querySelectorAll("section");
const bgm = document.getElementById("bgm");
const loading = document.getElementById("loading");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

let currentIndex = 0;
let started = false;

// ================= LOADING =================
window.addEventListener("load", () => {
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => (loading.style.display = "none"), 1000);
  }, 1500);
});

// ================= START =================
function start() {
  const all = document.querySelectorAll("section");

  // hide opening
  document.getElementById("opening").classList.add("hidden");

  // show semua section
  all.forEach((sec, i) => {
    if (i !== 0) {
      sec.classList.remove("hidden");
    }
  });

  // scroll ke story
  const story = document.getElementById("story");
  window.scrollTo({
    top: story.offsetTop,
    behavior: "smooth",
  });

  // play music
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.3;
  bgm.play().catch(() => {});
}

// ================= SHOW SECTION =================
function showSection(index) {
  if (index >= sections.length) return;

  sections[index].classList.remove("hidden");
  sections[index].classList.add("fade-in");
}

// ================= NEXT SECTION =================
let current = 0;

function nextSection() {
  const all = document.querySelectorAll("section");

  if (current < all.length - 1) {
    current++;

    all[current].classList.remove("hidden");

    window.scrollTo({
      top: all[current].offsetTop,
      behavior: "smooth",
    });

    // NAH DI SINI
    if (all[current].querySelector(".reason")) {
      revealReasons();
    }
    if (all[current].innerText.includes("Still Counting")) {
      startCounting();
    }
  }
}

const text = `Ga kerasa ya sayang kita udah sejauh ini.
Mpit masih suka gak nyangka kita bisa sampai di titik ini, tiga tahun bukan waktu yang sebentar dan kita udah ngelewatin banyak hal bareng, dari yang receh sampai yang berat banget. Dari awal kenal yang masih jaim, sampai sekarang yang udah tau sisi paling random satu sama lain. Banyak momen yang kadang bikin kesel, tapi justru itu yang bikin hubungan ini hidup dan nyata. Mpit ngerasa beruntung banget bisa jalan bareng sayang sejauh ini. Gak selalu sempurna, tapi selalu punya alasan buat tetap bertahan dan terus lanjut ke depan bareng sama sayang.
Selama tiga tahun ini, mpit belajar banyak hal dari sayang, tentang sabar, tentang ngertiin orang lain, dan tentang gimana cara tetap stay walaupun keadaan lagi gak enak. Sayang selalu punya cara buat bikin mpit ngerasa tenang, walaupun kadang kita juga sering berantem hal kecil yang sebenernya gak penting. Tapi dari situ mpit sadar, hubungan ini bukan cuma soal bahagia doang, tapi juga soal gimana kita sama sama berusaha buat jadi lebih baik. Mpit gak butuh yang sempurna, cukup sayang yang tetap ada dan gak pergi.
Di anniversary yang ke tiga ini, mpit gak mau janji yang aneh aneh, cukup satu hal, mpit bakal terus usaha buat jaga hubungan ini sebaik mungkin. Entah nanti ke depan bakal kayak gimana, yang penting sekarang kita masih bareng dan masih saling pilih. Mpit harap kita bisa terus ngelewatin banyak hal lagi, nambah cerita baru, dan tetap jadi tempat pulang satu sama lain. Makasih udah bertahan sejauh ini sayang, makasih juga udah nerima mpit apa adanya. Semoga ini bukan cuma tiga tahun, tapi awal dari banyak tahun lainnya bareng sayang.
Dan kalo ditanya kenapa, jawabannya simpel...
Karna itu sayang.
Happy 3rd anniversary cintaku.`;

let i = 0;
let interval;

const typingEl = document.getElementById("typing");
const placeholder = document.getElementById("letterPlaceholder");
const btnPlay = document.getElementById("btnPlay");
const btnReplay = document.getElementById("btnReplay");

btnPlay.onclick = () => {
  startTyping();
};

btnReplay.onclick = () => {
  resetTyping();
  startTyping();
};

function startTyping() {
  clearInterval(interval);

  placeholder.style.display = "none";
  typingEl.classList.remove("hiddenText");
  typingEl.innerHTML = "";
  i = 0;

  interval = setInterval(() => {
    if (i < text.length) {
      typingEl.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 30);
}

function resetTyping() {
  clearInterval(interval);
  typingEl.innerHTML = "";
  i = 0;
}

// ================ BACK SECTION =================
function prevSection() {
  const all = document.querySelectorAll("section");

  if (current > 0) {
    current--;

    // tampilin dulu target section
    all[current].classList.remove("hidden");

    // scroll dulu ke atas section itu
    window.scrollTo({
      top: all[current].offsetTop,
      behavior: "smooth",
    });

    // baru hide section sebelumnya (yang tadi aktif)
    setTimeout(() => {
      all[current + 1].classList.add("hidden");
    }, 300);
  }
}

// ================= AUTO FLOW =================
// function autoScroll() {
//   let delay = 4000;

//   sections.forEach((_, i) => {
//     setTimeout(
//       () => {
//         showSection(i);
//         window.scrollTo({
//           top: sections[i].offsetTop,
//           behavior: "smooth",
//         });

//         if (i === sections.length - 1) {
//           triggerEnding();
//         }
//       },
//       delay * (i + 1),
//     );
//   });
// }

// ================= POPUP =================
function showPopup(type) {
  popup.classList.remove("hidden");

  if (type === "love") {
    popupText.innerText = "❤️💖💘💝";
    createEmojiRain("❤️ Love you so much.");
  }

  if (type === "miss") {
    popupText.innerText = "🥺💭💔";
    createEmojiRain("🥺 Miss you so much.");
  }

  if (type === "future") {
    popupText.innerText = "💍🏡✨";
    createEmojiRain("💍 We belong together.");
  }
}

function closePopup() {
  popup.classList.add("hidden");
}

function createEmojiRain(emoji) {
  for (let i = 0; i < 20; i++) {
    let el = document.createElement("div");
    el.innerText = emoji;
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-10px";
    el.style.fontSize = "24px";

    document.body.appendChild(el);

    let duration = Math.random() * 2000 + 2000;

    let start = null;
    function fall(time) {
      if (!start) start = time;
      let progress = time - start;

      el.style.top = (progress / duration) * 100 + "vh";

      if (progress < duration) {
        requestAnimationFrame(fall);
      } else {
        el.remove();
      }
    }

    requestAnimationFrame(fall);
  }
}

function revealReasons() {
  const items = document.querySelectorAll(".reason");

  items.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 500);
  });
}

function goToStart() {
  const all = document.querySelectorAll("section");

  all.forEach((sec) => sec.classList.add("hidden"));

  current = 0;

  document.getElementById("opening").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function startCounting() {
  const counter = document.getElementById("timeCounter");

  // tanggal jadian lu (SET SENDIRI)
  const startDate = new Date("2023-03-23T00:00:00");

  setInterval(() => {
    const now = new Date();

    let diff = now - startDate;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    counter.innerText =
      days +
      " hari " +
      hours +
      " jam " +
      minutes +
      " menit " +
      seconds +
      " detik";
  }, 1000);
}

function openLetter() {
  const content = document.getElementById("letterContent");
  const btn = document.getElementById("openLetterBtn");

  content.classList.remove("hidden");
  setTimeout(() => {
    content.classList.add("show");
  }, 100);

  btn.style.display = "none";
}

const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    bgm.pause();
    musicBtn.innerText = "🔇";
  } else {
    bgm.play();
    musicBtn.innerText = "🔊";
  }
  isPlaying = !isPlaying;
}

// ================= PARALLAX =================
window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  document.querySelectorAll(".bg").forEach((bg) => {
    bg.style.transform = `translateY(${scroll * 0.1}px)`;
  });
});

// ================= CURSOR GLOW =================
const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "20px";
glow.style.height = "20px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background = "rgba(255,215,0,0.4)";
glow.style.filter = "blur(10px)";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ================= CONFETTI =================
function triggerEnding() {
  createConfetti();
}

function createConfetti() {
  for (let i = 0; i < 80; i++) {
    let conf = document.createElement("div");
    conf.classList.add("confetti");

    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "8px";
    conf.style.background = "gold";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.top = "-10px";
    conf.style.opacity = Math.random();

    document.body.appendChild(conf);

    animateConfetti(conf);
  }
}

function animateConfetti(el) {
  let duration = Math.random() * 3000 + 2000;
  let start = null;

  function frame(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;

    el.style.top = (progress / duration) * 100 + "vh";
    el.style.transform = `translateX(${Math.sin(progress / 200) * 50}px)`;

    if (progress < duration) {
      requestAnimationFrame(frame);
    } else {
      el.remove();
    }
  }

  requestAnimationFrame(frame);
}

// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

sections.forEach((sec) => observer.observe(sec));

// ================= SOUND EFFECT =================
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    playClickSound();
  });
});

function playClickSound() {
  let audio = new Audio();
  audio.src = "https://www.soundjay.com/buttons/sounds/button-16.mp3";
  audio.volume = 0.2;
  audio.play();
}

// ================= RANDOM SPARKLES =================
setInterval(() => {
  let spark = document.createElement("div");
  spark.style.position = "fixed";
  spark.style.width = "4px";
  spark.style.height = "4px";
  spark.style.background = "white";
  spark.style.left = Math.random() * 100 + "vw";
  spark.style.top = Math.random() * 100 + "vh";
  spark.style.opacity = "0.8";
  spark.style.borderRadius = "50%";

  document.body.appendChild(spark);

  setTimeout(() => spark.remove(), 2000);
}, 300);

// ================= PROGRESS BAR =================
const progress = document.createElement("div");
progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "3px";
progress.style.background = "gold";
progress.style.width = "0%";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (scrollTop / height) * 100;
  progress.style.width = scrolled + "%";
});

// ================= EXTRA INTERACTION =================
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
});

// ================= END =================
