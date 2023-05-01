// creating the variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".container").hide();

// game start command
$(".start-button").click(function () {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".center-style").hide();
        $(".container").show();
        $(".start-button").hide();
    } 
});


// function for user keypresses
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // So function to check answer runs immediately after the button is pressed
    checkAnswer(userClickedPattern.length - 1);
});
// Function to check checkAnswer...the most important function
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");  
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function(){
                nextSequence();
            }, 1200);
         } 
    } else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        console.log("Wrong"); 
        var buttonSound2 = new Audio('sounds/wrong.mp3');
         buttonSound2.play();
         animateWrong();
         $("#level-title").text('Game Over! Press "Play" to restart');
         startOver();
        }
    }
    
// Function to generate random button flashes for the game
function nextSequence() {
    // To reset the user clicked pattern array when the next level starts remving this line will make the game super easy
    userClickedPattern = [];
    level++;
    
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
}
// Sound function
function playSound(name) {
    var buttonSound = new Audio('sounds/' + name + '.mp3');
    buttonSound.play();
}
// function to animate the user pressing the button
function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");
    setTimeout (reClass, 200);
    function reClass(){
    activeButton.removeClass("pressed");
    }
}
// function to show the game is over
function animateWrong() {
    $("body").addClass("game-over");
    setTimeout (remClass, 200);
    function remClass(){
        $("body").removeClass("game-over");
    }
}
// Resetting the variables for a new round after the game has been lost
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("h3").show();
    $(".container").hide();
    $(".start-button").show();
    level = 0;
}

