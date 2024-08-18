document.querySelector(".control-buttons span").onclick = function() {
  let yourname = prompt("What's your Name?");
  if (yourname == null || yourname == "") {
      document.querySelector(".name span").innerHTML = 'Unknown Player';
  } else {
      document.querySelector(".name span").innerHTML = yourname;
  }
  document.querySelector(".control-buttons").remove();
  startTimer();
  initializeGame();
};

let duration = 3000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector('.tries span');
let clickElement = document.querySelector('.clicks span');
let scoreElement = document.querySelector('.score span');
let timerElement = document.querySelector('.timer span');
let clickCounter = 0;
let scoreCounter = 0;
let timer;
let seconds = 0;

document.querySelector(".reset-button").onclick = resetGame;

function initializeGame() {
  blocksContainer.innerHTML = '';
  triesElement.innerHTML = '0';
  clickElement.innerHTML = '0';
  scoreElement.innerHTML = '0';
  clickCounter = 0;
  scoreCounter = 0;

  let images = [
      "cherries", "cherries",
      "pineapple", "pineapple",
      "tomato", "tomato",
      "watermelon", "watermelon",
      "strawberry", "strawberry",
      "orange", "orange",
      "grapes", "grapes",
      "lemon", "lemon"
  ];

  let shuffledImages = shuffle(images);

  shuffledImages.forEach(image => {
      let block = document.createElement('div');
      block.classList.add('game-Block');
      block.dataset.technology = image;

      let frontFace = document.createElement('div');
      frontFace.classList.add('face', 'front');

      let backFace = document.createElement('div');
      backFace.classList.add('face', 'back');
      let img = document.createElement('img');
      img.src = `D:\\Spring 24\\Internet programing\\Project\\Second try\\${image}.png`;
      backFace.appendChild(img);

      block.appendChild(frontFace);
      block.appendChild(backFace);

      block.addEventListener('click', function() {
          flipBlock(block);
      });

      blocksContainer.appendChild(block);
  });
}

function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add('is-flipped');
  clickCounter++;
  clickElement.innerHTML = clickCounter;
  let allFlippedBlocks = Array.from(document.querySelectorAll('.game-Block.is-flipped'));
  if (allFlippedBlocks.length === 2) {
      stopClicking();
      matchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
      blocksContainer.classList.remove('no-clicking');
  }, duration);
}

function matchBlocks(block1, block2) {
  if (block1.dataset.technology === block2.dataset.technology) {
      block1.classList.remove('is-flipped');
      block2.classList.remove('is-flipped');
      block1.classList.add('has-match');
      block2.classList.add('has-match');
      scoreCounter++;
      scoreElement.innerHTML = scoreCounter;
  } else {
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
      setTimeout(() => {
          block1.classList.remove('is-flipped');
          block2.classList.remove('is-flipped');
      }, duration);
  }
  checkCompletion();
}

function checkCompletion() {
  if (document.querySelectorAll('.game-Block.has-match').length === 16) {
      clearInterval(timer);
      setTimeout(() => {
          document.getElementById('win-sound').play();
          alert('Congratulations! You have successfully completed the game.');
      }, duration);
  } else if (parseInt(triesElement.innerHTML) >= 8) {
      clearInterval(timer);
      setTimeout(() => {
          alert('Failed! Try again.');
          resetGame();
      }, duration);
  }
}

function resetGame() {
  clearInterval(timer);
  seconds = 0;
  timerElement.innerHTML = seconds;
  startTimer();
  initializeGame();
}

function startTimer() {
  timer = setInterval(() => {
      seconds++;
      timerElement.innerHTML = seconds;
  }, 1000);
}

window.onload = initializeGame;
