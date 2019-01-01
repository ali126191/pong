const ctx = document.getElementById('ctx').getContext("2d");
const WIDTH = 600;
const HEIGHT = 400;
const playerDisplayLeft = document.querySelector('.playerLeft');
const playerDisplayRight = document.querySelector('.playerRight');
const playAgainPopup = document.querySelector('.popUp');
ctx.font = "32px Calibri";
playerLeftScore = 0;
playerRightScore = 0;




let canvas = {
  width:600,
  height:400
}

let ball = {
  x:300,
  y:200,
  speedX:2,
  speedY:3,
  radius:6.5,
  diameter:13
}

let playerLeft = {
  x: 50,
  y: 200,
  boardHeight:5,
  boardWidth:60,
  speed:0
}

let playerRight = {
  x: 500,
  y: 200,
  boardHeight: 5,
  boardWidth: 60,
  speed:0
}

startGame();

function startGame(){
  moveBoard();
  setInterval(draw, 10);
}

function moveBoard(){
  window.addEventListener('keydown', function (event) {
    if (event.keyCode == 38) {
      playerRight.speed = -4;
    } else if (event.keyCode == 40) {
      playerRight.speed = 4;
    }
    if (event.keyCode == 65) {
      playerLeft.speed = -4;
    } else if (event.keyCode == 90) {
      playerLeft.speed = 4;
    }
  });
}

window.addEventListener('keyup', function (event) {
  if (event.keyCode == 38) {
    playerRight.speed = 0;
  } else if (event.keyCode == 40) {
    playerRight.speed = 0;
  }
  if (event.keyCode == 65) {
    playerLeft.speed = 0;
  } else if (event.keyCode == 90) {
    playerLeft.speed = 0;
  }
});

///////////////////////////////////
///////////////////////////////////

/*Child*/
function playerSpeed() {
  playerLeft.y += playerLeft.speed;
  playerRight.y += playerRight.speed;
}

function makeBoard(positionX, positionY,height,width){
  keepInBorder(playerLeft);
  keepInBorder(playerRight);
  ctx.fillRect(positionX, positionY, height, width);
} 
/*Parent*/
function createPanels(){
  ctx.fillStyle = "#fff";
  playerSpeed();
  makeBoard(playerLeft.x, playerLeft.y, playerLeft.boardHeight, playerLeft.boardWidth);
  makeBoard(playerRight.x, playerRight.y, playerRight.boardHeight, playerRight.boardWidth);
}

///////////////////////////////////////////////////////

/*Parent*/
function createCentre(){
  ctx.fillStyle = "#fff";
  for(var i=0; i< 400;i+=30){
    let next = 400-i;
    ctx.fillRect(300, next, 1, 15);
  }
}

////////////////////

function keepInBorder(player){
  if(player.y >= 340) {
    player.y = 340;
    player.speed= 0;
  } else if(player.y <= 0) {
    player.y = 0;
    player.speed = 0;
  }
}

/////////////////////////////////////////////////
/*Child Sub Parent*/

function endGame() {
  playerLeft.y = 150;
  playerRight.y = 150;
  playerLeftScore = 0;
  playerRightScore = 0;
  playAgainPopup.style.display = "block";
  if (playAgainPopup.addEventListener('click', function () {
    startGame();

  })) { }
}

function testWin() {
  if (playerLeftScore == 2) {
    endGame();
  } else if (playerRightScore == 10) {
    endGame();
  }
}

/*Sub Parent*/
function testScore(playerLeft, playerRight) {
  if (ball.x > playerRight.x + 89) {
    ball.x = undefined;
    setTimeout(resetBall, 1000);
    playerLeftScore += 1;
  } else if (ball.x < playerLeft.x - 39) {
    ball.x = undefined;
    setTimeout(resetBall, 1000);
    playerRightScore += 1;
  }
  playerDisplayLeft.innerHTML = playerLeftScore;
  playerDisplayRight.innerHTML = playerRightScore;
  testWin();
}


function ballHitPanels(player) {
  if (player.y < ball.y + ball.radius &&
    player.y + 65 > ball.y && player.x < ball.x + ball.radius && player.x + 3 > ball.x) {
    ball.speedX *= -1.05;
    ball.speedY *= -Math.floor(Math.random() * 2);
  }
}

function keepBallInBorder(ball){
  testScore(playerLeft, playerRight);
  ballHitPanels(playerLeft);
  ballHitPanels(playerRight);
  if (ball.x >= 590) {
    ball.x = 590;

  } else if (ball.x <= 10) {
    ball.x = 10;
    ball.speedX *= -1;
  } else if (ball.y >= 390) {
    ball.y = 390;
    ball.speedY *= -1;
  } else if (ball.y <= 10) {
    ball.y = 10;
    ball.speedY *= -1;
  }
}


//////////////////////////////////

/*Child*/
function resetBall(){
  ball.x = 300,
  ball.y = 200,
  // ball.speedY = 0
  ball.speedX *= -1
}

function ballSpeed() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}

/* Parent */
function drawBall() {
  keepBallInBorder(ball);
  ballSpeed();
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}


/*Grand*/
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createPanels();
  drawBall();
  createCentre();
}


/* Ya Mohammad
   Ya Ali
   Ya Fatima
   Ya Hussan
   Ya Hussain
*/