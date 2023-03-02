

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//all the jquery part goes here


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //nextSequence();
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keydown(function (event) {
    console.log(event.key);
    if (event.key !== "a") {
        alert("You can only press the A key to start the game");
    }
    else {
        $("h1").text("Level " + level);
        nextSequence();

    }
})


//function coding will be done here
function nextSequence() {

    //here we reset the userclickedpattern Array to empty again
    userClickedPattern = [];

    //here we update the level everytime this function is called
    level = level + 1;

    //here we display the updated level
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    //shows the flash animation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //sound code
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    //console.log(audio);
    audio.play();



}

function playSound(name) {
    //shows the flash animation
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);

    //sound code
    let audio = new Audio("sounds/" + name + ".mp3");
    //console.log(audio);
    audio.play();
}

//this function is used to display the pressed css class on the button for a fraction of time.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //to call the next sequence after a one second(1000ms) delay we do the following
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    //if we click the wrong patten this code runs
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        //to change the h1 text we do this
        $("h1").text("Press the A key to Restart.");
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}




