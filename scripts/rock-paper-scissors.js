const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
}

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

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = '\nWins: ' + score.wins + ', Losses: ' + score.losses + ', Ties: ' + score.ties;
}

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
