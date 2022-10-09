var gameStart = false;

var circleXPos = 300;
var circleYPos = 0;
var circleRadius = 30;

var tooEarlyCounter = 0;
var okayCounter = 0;
var greatCounter = 0;
var perfectCounter = 0;
var tooLateCounter = 0;

var menuCircleXPos = 101;
var menuCircleRadius = 20;
var menuCircleVelocity = -3;
var menuCircleChangeRadius = -1;

var difficulty = "";
var countRequired;
var count = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(60);
}

function draw() {
  background(245);
  
  //menu before game starts prompting user to choose difficulty
  if(!gameStart){
    
    textSize(40);
    text("Visual Rhythm Game", 113, 130);
    textSize(20);
    text("Choose a difficulty, and click the screen when the", 83, 180);
    text("circle falls into the target circle!", 83, 200);

    //Menu circle code
    circle(menuCircleXPos, 300, menuCircleRadius);
    menuCircleXPos += menuCircleVelocity;
    if(menuCircleXPos < 101 || menuCircleXPos > 499){
      menuCircleVelocity = -menuCircleVelocity;
    }
    menuCircleRadius += menuCircleChangeRadius;
    if(menuCircleRadius < 20 || menuCircleRadius > 40){
      menuCircleChangeRadius = -menuCircleChangeRadius;
    }

    //choose difficulty buttons
    textSize(12);
    //Easy difficulty
    fill(204, 229, 255);
    if(mouseX > 100 && mouseX < 200 && mouseY > 400 && mouseY < 450) {
      fill(255, 255, 153)
      if(mouseIsPressed){
        frameRate(10);
        gameStart = true;
        countRequired = 10;
        difficulty = "easy";
      }
    }
    rect(100, 400, 100, 50);
    fill(0);
    text('Easy', 138, 430)
    
    //Medium difficulty
    fill(102, 204, 102);
    if(mouseX > 250 && mouseX < 350 && mouseY > 400 && mouseY < 450) {
      fill(255, 255, 153)
      if(mouseIsPressed){
        frameRate(30);
        gameStart = true;
        countRequired = 20;
        difficulty = "medium";
      }
    }
    rect(250, 400, 100, 50);
    fill(0);
    text('Medium', 280, 430)
    
    //Hard difficulty
    fill(255, 51, 51);
    if(mouseX > 400 && mouseX < 500 && mouseY > 400 && mouseY < 450) {
      fill(255, 255, 153)
      if(mouseIsPressed){
        frameRate(50);
        gameStart = true;
        countRequired = 30;
        difficulty = "hard";
      }
    }
    rect(400, 400, 100, 50);
    fill(0);
    text('Hard', 438, 430)
  }

  //Difficulty chosen, game has begun.
  if(gameStart){

    //if statement deciding whether to draw the game running or the results screen
    if(count < countRequired){

      textSize(12);
      text('Too Early: ' + tooEarlyCounter, 20, 20);
      text('Too Late: ' + tooLateCounter, 20, 35);
      text('Okay: ' + okayCounter, 20, 50);
      text('Great: ' + greatCounter, 20, 65);
      text('Perfect: ' + perfectCounter, 20, 80);
      text(count + ' / ' + countRequired, 20, 95);

      //fills in the target circle
      fill(0, 0, circleYPos - 100);
      circle(circleXPos, 450, 100);
      fill(255);
      circle(circleXPos, 450, 80);

      //fills in the falling circle
      fill(0);
      circle(circleXPos, circleYPos, circleRadius);
      circleYPos += 10;
      circleRadius += 1;

      //when the player clicks check for what range they clicked in(such as too early or great)
      if(mouseIsPressed){

        //If circle is in too early range
        if(circleYPos < 390 && circleYPos > 280){
          tooEarlyCounter++;
          circleYPos = 0;
          circleRadius = 30;
          count++;
        }

        //If circle is in okay range
        else if( (circleYPos >= 390 && circleYPos < 410) || (circleYPos > 490 && circleYPos <= 510) ){
          okayCounter++;
          circleYPos = 0;
          circleRadius = 30;
          count++;
        }

        //If circle is in great range
        else if( (circleYPos >= 410 && circleYPos < 440) || (circleYPos > 460 && circleYPos <= 490) ) {
          greatCounter++;
          circleYPos = 0;
          circleRadius = 30;
          count++;
        }

        //If circle is in perfect range
        else if(circleYPos >=440 && circleYPos <= 460){
          perfectCounter++;
          circleYPos = 0;
          circleRadius = 30;
          count++;
        }

        //If circle is in too late range
        else if(circleYPos > 510){
          tooLateCounter++;
          circleYPos = 0;
          circleRadius = 30;
          count++;
        }

      }

      //If the player does not click before the circle goes off screen
      else if(circleYPos > 580){
        tooLateCounter++;
        circleYPos = 0;
        circleRadius = 30;
        count++;
      }
    }
    else{
      fill(252, 186, 3);
      rect(0, 0, width, height);
      textSize(20);
      fill("white");
      text('You completed ' +  difficulty + ' difficulty with', 140, 300);
      textSize(19);
      text(tooEarlyCounter + ' too early(s), ' + tooLateCounter + ' too late(s), ' + okayCounter + ' okay(s), ' + greatCounter + ' great(s), and ' + perfectCounter + ' perfect(s)!',  25, 340);
    }

  }
}