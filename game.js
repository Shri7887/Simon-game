var buttonColor = ["red", "blue", "green", "yellow"]; //colors that are in the game

var gamePattern = []; //random pattern that will be added to the array after the nextSequence function runs

var userClickedPattern = []; //pattern that will get added to the array after the user clicks the button

var level = 0; //this variable is used to indicate that the user is at which level

var started = false; //this boolean value is used to set the flag for keyboard event on the start

var patternMatch = true;

/*for(var i = 0; i < buttonColor.length; i++){
    $("#"+buttonColor[i]).on("click", function(){
        var userChosenColor = $(".btn")[i].attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
    });
};*/

/*$(".btn").on("click", function(){
    var userChosenColor = $.each(".btn").attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
});*/

/**
 * $.each(buttonColor, function(i, val){
    $("#"+val).click(function(){
        userClickedPattern.push(val);
        console.log(userClickedPattern);
    })
});
 */

/*----------------------------------------------*/
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1); //parameter as length - 1 as it starts from 0
}); // here the btn class is selected and click function has a callback function where the attr-id added to the userClickedPattern array using 'this' method.

/**-------------------------------------------------------------------- */
function nextSequence() {
  userClickedPattern = []; //resets the array of the userClickedPattern

  level++; //level increments
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeTo(150, 0.4)
    .fadeTo(150, 1);
  /*var audio = new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();*/
  playSound(randomChosenColor);
} // here the function creates a random number from 0-3 and this uses as a index value for the buttonColor array and plays the sound associated with it

/**----------------------------------------------- */
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
} // here the function get a parameter name from the other both function where the id name is associated with the sound file name

/**------------------------------------------------------ */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
} //this function add a "pressed" class to the current btn and removes it after 100 ms

/**---------------------------------------------- */
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}); //here the keydown is listened by the system and executes the function and checks the condition of the started boolean value and turns it into false

/**------------------------------------------------------------------------------------------------- */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check the array items are matched or not. ref - btn.click
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    reset();
  }

}


function reset(){
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    started = false;

    level = 0;

    gamePattern = [];
}