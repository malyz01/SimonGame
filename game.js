var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(e){
  if (!started) {
    nextSequence();
    started = true;
  }
});

$('.btn').click(function(e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);
      }
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
  $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
}
