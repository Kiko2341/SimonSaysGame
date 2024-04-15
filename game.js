var color = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userPattern = [];

var started = false;
var gameLevel = 0;
var highScore = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level: " + gameLevel );
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  var clickedColor = $(this).attr("id");
  userPattern.push(clickedColor);

  playSound(clickedColor);
  animateClick(clickedColor);

  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    if(highScore>gameLevel-1||highScore==gameLevel-1){
      $('#high-score').text('High Score:'+highScore)
    }else{
      $('#high-score').text('New High Score:'+gameLevel)
      highScore=gameLevel
    }
    $("#level-title").text("Game Over Press Any Key on The Keyboard to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    Restart();
  }
}
function nextSequence() {
  userPattern = [];
  gameLevel++;
  $("#level-title").text("Level: " + gameLevel);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = color[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}
function animateClick(pressed){
    $('#'+pressed).addClass('pressed');
    setTimeout(function(){
        $('#'+pressed).removeClass('pressed');
    },100)
}
function playSound(sound){
    var audio = new Audio('sounds/'+sound+'.mp3');
    audio.play();
}
function Restart(){
    gamePattern=[]
    started=false;

    gameLevel = 0;

}

