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

