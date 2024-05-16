
buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickPattern = [];
var randomNumber
var userChosenColour;
var level = 0;
var started = false;


$("body").keypress(function (){
    if(!started){
        nextSequence();
        started = true;
    }
});
function nextSequence(){ 

    userClickPattern = [];

    level++;
    $("h1").text("Level " + level);   

    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){


        if(userClickPattern.length == gamePattern.length){
            setTimeout(()=>{nextSequence();} , 1000);
        }
    }
    else{
        gameOver();
    }

}

function gameOver(){

    level = 0;
    started = false;
    gamePattern = [];
    userClickPattern = [];
    $("body").addClass("game-over")
    setTimeout(() =>{$("body").removeClass("game-over")}, 200);
    playSound('wrong');

    $("h1").text("Game Over, Press Any Key to Restart");
    
}

function playSound(colour){
    var audio = new Audio("/sounds/" + colour + ".mp3");
    audio.play();
}


$(".btn").click( function(){
    userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    animatePress(userChosenColour);

    playSound(userChosenColour);
    checkAnswer(userClickPattern.length - 1);
});


function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(() =>{$("." + currentColour).removeClass("pressed") }, 100);
}

