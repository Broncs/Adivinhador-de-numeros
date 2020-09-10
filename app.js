/*  Game function:
  -player must guess a number between a min and max 
  -player gets a certain amount of guesses
  -notify player of guesses remaining
  - Notify the player of the correct answer if loose
-let player choose to play again */

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//  UI elements
const UIgame = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
UIgame.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  //   validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //   check if won
  if (guess === winningNum) {
    //   game Over - Won
    gameOver(true, `${winningNum} está correto, VOCÊ GANHOU!`);
  } else {
    //   wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //  Game over - lost

      gameOver(
        false,
        `Game Over, você perdeu. o número correto era ${winningNum}`
      );
    } else {
      // game continues - answer wrong

      // change border color
      guessInput.style.borderColor = "red";

      // clear input
      guessInput.value = "";

      // tell user its the wrong number
      setMessage(
        `${guess} esta incorreto, ${guessesLeft} palpites restantes`,
        "red"
      );
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //  Disable input
  guessInput.disabled = true;
  //  change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  //  set message
  setMessage(msg);

  //   Play again ?
  guessBtn.value = "Jogar Novamente";
  guessBtn.className += "play-again";
}

// get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
