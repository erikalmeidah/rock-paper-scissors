//get local storage score feature
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

//reset score feature
function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}

//autoplay feature
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

//event listeners for buttons
//rock button
const rockButton = document.querySelector('.js-rock-button');
rockButton.addEventListener('click', () => {
  playGame('rock');
});

//paper button
const paperButton = document.querySelector('.js-paper-button');
paperButton.addEventListener('click', () => {
  playGame('paper');
});

//scissors button
const scissorsButton = document.querySelector('.js-scissors-button');
scissorsButton.addEventListener('click', () => {
  playGame('scissors');
});

//autoplay button
const autoplayButton = document.querySelector('.js-autoplay-button');
autoplayButton.addEventListener('click', () => {
  autoPlay();
});

//reset button
const resetScoreButton = document.querySelector('.js-reset-score-button');
resetScoreButton.addEventListener('click', () => {
  resetScore();
});

//event listeners for keyboard play functionality
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  }else if(event.key === 'p') {
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }else{
    console.log('Not a playable move.');
  }
});

//play feature
function playGame(playerMove){
  const computerMove = pickComputerMove();
  let res = '';

  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      res = 'You Lose.';
    }else if(computerMove === 'paper'){
      res = 'You Win.';
    }else{
      res = 'Tie.';
    }
  }else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      res = 'You Win.';
    }else if(computerMove === 'paper'){
      res = 'Tie.';
    }else{
      res = 'You Lose.';
    }    
  }else{
    if(computerMove === 'rock'){
      res = 'Tie.';
    }else if(computerMove === 'paper'){
      res = 'You Lose.';
    }else{
      res = 'You Win.';
    }
  }

  if (res === 'You Win.'){
    score.wins++;
  }else if(res === 'You Lose.'){
    score.losses++;
  }else{
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = res;
  document.querySelector('.js-moves').innerHTML = 
    `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
  return;
}

//update score 
function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = '\nWins: ' + score.wins + ', Losses: ' + score.losses + ', Ties: ' + score.ties;
}

//pick computer move
function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else{
    computerMove = 'scissors';
  }

  return computerMove;
}
