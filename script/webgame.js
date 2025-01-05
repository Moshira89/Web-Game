$(document).ready(function () {
    const WORDS = ["apple", "banana", "cherry", "grape", "melon"];
    const MAX_ATTEMPTS = 6;
  
    let secretWord = "";
    let guessedLetters = [];
    let attemptsLeft = MAX_ATTEMPTS;
    let currentWordDisplay = [];
    let totalGames = 0;
    let wins = 0;
    let losses = 0;
  
    function startGame() {
      secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      guessedLetters = [];
      attemptsLeft = MAX_ATTEMPTS;
      currentWordDisplay = Array(secretWord.length).fill("_");
      updateDisplay();
      hideHangman();
      $("#message").hide().text("Game started! Guess a letter.").fadeIn(500);
      $("#replayButton").slideUp();
    }
  
    function makeGuess() {
      const guess = $("#guessInput").val().toLowerCase();
      $("#guessInput").val("");
  
      if (!guess || !/^[a-z]$/.test(guess)) {
        $("#message").hide().text("Invalid input. Enter a single letter.").fadeIn(500);
        return;
      }
  
      if (guessedLetters.includes(guess)) {
        $("#message").hide().text(`You already guessed "${guess}".`).fadeIn(500);
        return;
      }
  
      guessedLetters.push(guess);
  
      if (secretWord.includes(guess)) {
        secretWord.split("").forEach((letter, index) => {
          if (letter === guess) {
            currentWordDisplay[index] = letter;
          }
        });
        $("#message").hide().text(`Correct! "${guess}" is in the word.`).fadeIn(500);
      } else {
        attemptsLeft--;
        showHangmanPart();
        $("#message").hide().text(`"${guess}" is not in the word.`).fadeIn(500);
      }
  
      checkGameStatus();
      updateDisplay();
    }
  
    function updateDisplay() {
      $("#wordDisplay").text(currentWordDisplay.join(" "));
      $("#attemptsLeft").text(attemptsLeft);
      $("#guessedLetters").text(guessedLetters.join(", "));
    }
  
    function showHangmanPart() {
      const part = `#hangman div:nth-child(${MAX_ATTEMPTS - attemptsLeft + 1})`;
      $(part).slideDown(300);
    }
  
    function hideHangman() {
      $("#hangman div").slideUp(300);
    }
  
    function checkGameStatus() {
      if (!currentWordDisplay.includes("_")) {
        $("#message").hide().text(`You win! The word was "${secretWord}".`).fadeIn(500);
        wins++;
        endGame();
      } else if (attemptsLeft === 0) {
        $("#message").hide().text(`Game over! The word was "${secretWord}".`).fadeIn(500);
        losses++;
        endGame();
      }
    }
  
    function endGame() {
      totalGames++;
      $("#totalGames").text(totalGames);
      $("#wins").text(wins);
      $("#losses").text(losses);
      $("#replayButton").slideDown(500);
    }
  
    $("#startButton").click(startGame);
    $("#guessButton").click(makeGuess);
    $("#replayButton").click(startGame);
  });
  
  
  




