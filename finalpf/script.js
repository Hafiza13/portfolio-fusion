// Scroll to About (homepage only)
function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
}

// RPS game logic – runs only on rps.html
if (window.location.pathname.includes("rps.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const rockBtn = document.getElementById("rock");
    const paperBtn = document.getElementById("paper");
    const scissorsBtn = document.getElementById("scissors");
    const resultText = document.getElementById("result");
    const wins = document.getElementById("wins");
    const losses = document.getElementById("losses");
    const ties = document.getElementById("ties");
    const resetBtn = document.getElementById("reset");
    const sparkles = document.getElementById("sparkles");

    let winCount = 0, lossCount = 0, tieCount = 0;

    const choices = ["rock", "paper", "scissors"];
    const sounds = {
      rock: new Audio("../sounds/rock.mp3"),
      paper: new Audio("../sounds/paper.mp3"),
      scissors: new Audio("../sounds/scissors.mp3"),
    };

    function getComputerChoice() {
      return choices[Math.floor(Math.random() * choices.length)];
    }

    function play(playerChoice) {
      const computerChoice = getComputerChoice();
      let result;

      if (playerChoice === computerChoice) {
        result = "tie";
        resultText.textContent = `It's a tie! You both chose ${playerChoice}.`;
        tieCount++;
      } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
      ) {
        result = "win";
        resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
        winCount++;
      } else {
        result = "loss";
        resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
        lossCount++;
      }

      wins.textContent = winCount;
      losses.textContent = lossCount;
      ties.textContent = tieCount;

      // Sound
      if (sounds[playerChoice]) {
        sounds[playerChoice].currentTime = 0;
        sounds[playerChoice].play();
        setTimeout(() => {
          sounds[playerChoice].pause();
          sounds[playerChoice].currentTime = 0;
        }, 5000);
      }

      if (result === "win") {
        for (let i = 0; i < 15; i++) createSparkles();
      }
    }

    function createSparkles() {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.animationDuration = (1 + Math.random()) + "s";
      sparkles.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 2000);
    }

    rockBtn.addEventListener("click", () => play("rock"));
    paperBtn.addEventListener("click", () => play("paper"));
    scissorsBtn.addEventListener("click", () => play("scissors"));
    resetBtn.addEventListener("click", () => {
      winCount = lossCount = tieCount = 0;
      wins.textContent = losses.textContent = ties.textContent = 0;
      resultText.textContent = "";
    });
  });
}

// ------------------------------
// Flatland Activity JavaScript
// ------------------------------

let words, square;

function greeting() {
    if (words) {
        words.innerHTML = "Welcome to Flatland.<br>I am Square.";
    }
}

function changeColour(colour) {
    if (square) {
        square.style.backgroundColor = colour;
    }
}

function createBuzzwordPhrase() {
    const buzz = ["Paradigm-changing", "Multi-tier", "10,000-foot", "Agile", "Customer", "Win-win"];
    const action = ["empowered", "value-added", "synergy", "creative", "oriented", "focused", "aligned"];
    const outcome = ["process", "deliverable", "solution", "tipping-point", "strategy", "vision"];

    return `${buzz[Math.floor(Math.random() * buzz.length)]} ${action[Math.floor(Math.random() * action.length)]} ${outcome[Math.floor(Math.random() * outcome.length)]}`;
}

window.onload = () => {
    words = document.getElementById("words");
    square = document.getElementById("square");

    if (words && square) {
        greeting();

        square.addEventListener("click", () => {
            words.innerHTML = createBuzzwordPhrase();
            changeColour("green");
        });

        square.addEventListener("mouseover", () => changeColour("red"));
        square.addEventListener("mouseout", () => changeColour("gray"));
    }
};


// === RSS FEED LOGIC ===

function loadFeed(feedUrl) {
  const contentDiv = document.getElementById('content');
  const feedTitle = document.getElementById('feed-title');

  contentDiv.innerHTML = '<p>Loading feed...</p>';

  fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl))
    .then(response => response.json())
    .then(data => {
      feedTitle.textContent = 'Feed: ' + data.feed.title;
      displayArticles(data.items);
    })
    .catch(error => {
      console.error('Feed error:', error);
      contentDiv.innerHTML = '<p style="color:red;">Unable to load the feed. Try again later.</p>';
    });
}

function displayArticles(articles) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  articles.forEach(article => {
    const el = document.createElement('article');
    const date = new Date(article.pubDate).toLocaleDateString();

    el.innerHTML = `
      <div class="icon">📰</div>
      <div>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <small>📅 ${date}</small>
      </div>
    `;
    contentDiv.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById('feed-selector');
  const themeBtn = document.getElementById('theme-toggle');

  if (selector) {
    selector.addEventListener('change', () => loadFeed(selector.value));
    loadFeed(selector.value);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      document.body.classList.toggle('light-theme');
    });
  }
});
