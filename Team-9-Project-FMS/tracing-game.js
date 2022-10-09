let firstLinePointX1 = Math.floor(Math.random() * 500);
let firstLinePointY1 = Math.floor(Math.random() * 500);
let firstLinePointX2 = Math.floor(Math.random() * 500);
let firstLinePointY2 = Math.floor(Math.random() * 500);

let secondLinePointX2 = Math.floor(Math.random() * 500);
let secondLinePointY2 = Math.floor(Math.random() * 500);

let thirdLinePointX2 = Math.floor(Math.random() * 500);
let thirdLinePointY2 = Math.floor(Math.random() * 500);

let fourthLinePointX2 = Math.floor(Math.random() * 500);
let fourthLinePointY2 = Math.floor(Math.random() * 500);

var points = []
var startX = 50;
var startY = 50;
var curPoint;
var counter = 0;
var done = false;
var time = 0;
var number = 0;
var fr = 30;
class Point{
  constructor(x,y, index){
  this.x = x
  this.y = y
  this.index = index
  this.passed = false;
  }
  show(){
    noStroke()
    if(this.passed == true){
      fill("green")
    }
    else{
      if(this.index == counter){
        fill("yellow")
      }
      else{
        fill("red")
      }
    }
    circle(this.x, this.y, 15)
  }
}
function fillLine(x1, x2, y1, y2, table, numOfPoints){
  var x = (x1-x2)/numOfPoints
  var y = (y1-y2)/numOfPoints
  for(var i = 0; i < numOfPoints; i++){
    var point = new Point(x1 - x*i, y1 - y*i, number)
    table.push(point)
    number++
  }
}
function setup() {
  createCanvas(600, 600);
  fillLine(firstLinePointX1,firstLinePointX2,firstLinePointY1,firstLinePointY2,points, 30)
  fillLine(firstLinePointX2, secondLinePointX2, firstLinePointY2, secondLinePointY2, points, 30)
  fillLine(secondLinePointX2,thirdLinePointX2,secondLinePointY2, thirdLinePointY2, points, 30)
  fillLine(thirdLinePointX2, fourthLinePointX2, thirdLinePointY2, fourthLinePointY2, points, 30)
  textSize(15);
  
}
function draw() {
  frameRate(fr);

  //current.x = mouseX;
  //current.y = mouseY;
  if(!done){
    background(255);
    text("Time: " + realTime() + " Seconds", 0, 20);
    stroke(10);
    line(firstLinePointX1, firstLinePointY1, firstLinePointX2, firstLinePointY2);
    line(firstLinePointX2, firstLinePointY2, secondLinePointX2, secondLinePointY2);
    line(secondLinePointX2, secondLinePointY2, thirdLinePointX2, thirdLinePointY2);
    line(thirdLinePointX2, thirdLinePointY2, fourthLinePointX2, fourthLinePointY2);
    if(counter>0){
      time++;
    }
    for(var i = points.length-1; i >= 0; i--){
      var p = points[i]
      p.show()
    }
    curPoint = points[counter]
    if(mouseX > curPoint.x-5 && mouseX < curPoint.x+5 && mouseY > curPoint.y - 5 && mouseY < curPoint.y + 5){
        curPoint.passed = true;
        counter++
      }
    if(counter >= points.length){
        done = true;
    }
  }
  if (done == true) {
    background('cyan');
    textSize(40);
      fill("black");
      text("You finished tracing the line", width/8, height/2);
      textSize(30);
      text("Your time: " + realTime() + " Seconds", width/4.6+10, height/2+50);
  }
  function realTime(){
    return nfc(time/fr,1);
  }
}

 
