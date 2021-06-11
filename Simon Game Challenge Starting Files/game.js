
var gameStarted=false;
var level=0;
var buttonColours=["red", "blue", "green", "yellow"];


var gamePattern=[];
var userClickedPattern=[];



// To start the game
$(document).keydown(function(event){
  if(gameStarted===false){
    $("#level-title").text("Level " + level);
     nextSequence();
    gameStarted=true;

  }
});


//Game random Sequence
function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  //Generating randomNumber
  var randomNumber = Math.floor( Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);



  //Chossing random button for flash
 $("#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);


 // Playing Sound
 playSound(randomChosenColour);
}


// Handling button clicks
$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


//Play Sound
function playSound(name){
  var audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Animating Buttons
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}




//Check Sequence

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){ //values are checked simulatneously as you click button not after you have clicked all the buttons
          if(gamePattern.length===userClickedPattern.length){

             setTimeout(function(){
                    nextSequence();
                  },1000);
        }
    }

  else{
         var audio=new Audio("sounds/wrong.mp3");
         audio.play();

         $("body").addClass("game-over");

         setTimeout(function(){
           $("body").removeClass("game-over");
         },200);

         $("#level-title").text("Game over , Press any key to restart");

         startOver();

         }
}


//Restart Game
function startOver(){
  level=0;
  gamePattern= [];
  gameStarted=false;
}
