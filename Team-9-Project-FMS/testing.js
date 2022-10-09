let x = 25
let y = 25
let offset = 10
let clicked = false
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(x,y,offset*2)
  if(mouseIsPressed){
    if(mouseX < x+25 && mouseX > x-25 && mouseY < y+25 && mouseY > y-25 && !clicked){
    clicked = true
    }
    if(clicked){
      x = mouseX
      y = mouseY
    }
  }
  else{
    clicked = false
  }
  if(clicked){
    x = mouseX
    y = mouseY
  }
}// 