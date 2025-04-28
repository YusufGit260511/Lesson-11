const emojis = ["🍎", "🍎", "🍌", "🍌", "🍒", "🍒", "🍇", "🍇", "🍉", "🍉", "🍍", "🍍", "🍓", "🍓", "🥑", "🥑"];
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Перемешиваем
let shuffledEmojis = shuffle([...emojis]);

const gameBoard = document.getElementById("game-board");

let flippedCards = [];
let lockBoard = false;

// Создаём карточки
shuffledEmojis.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    flippedCards = [];
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.add("shake");
      card2.classList.add("shake");
      setTimeout(() => {
        card1.classList.remove("shake");
        card2.classList.remove("shake");
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        flippedCards = [];
        lockBoard = false;
      }, 400)
    }, 400);
  }
}