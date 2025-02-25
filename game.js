const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // switch(userChosenColour) {
    //     case "red":
    //         checkAnswer(0);
    //         break;
    //     case "blue":
    //         checkAnswer(1);
    //         break;
    //     case "green":
    //         checkAnswer(2);
    //         break;
    //     case "yellow":
    //         checkAnswer(3);
    //         break;
    //     default:
    //         console.log("error");
    // }
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function animatePress(currentColour) {
    let button = $(`#${currentColour}`);
    button.addClass("pressed");

    setTimeout(function () {
        button.removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(curr) {
    if (userClickedPattern[curr] === gamePattern[curr]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}