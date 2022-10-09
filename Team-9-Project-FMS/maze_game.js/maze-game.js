




var x = 25
var y = 25
var offset = 25
var clicked = false
var canPlay = true
var myFill = (255, 87, 20, 200)
var pastpastCell = 0
var pastCell = 0
var curCell
var numVisited = 0
var cols, rows;
var w = 100;
var grid = [];
var hits = 0
var counted = false
var hitWall = false

var current;

var stack = [];

function setup(){
  let cnv = createCanvas(600, 600);
  // cnv.position(0, 0, "static");
  
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(5);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];


}

function draw(){
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
  square(500, 500, 100)
for (var a = 0; a < grid.length; a++) {
  var gridX = grid[a].i*w
  var gridY = grid[a].j*w
  if(x >= gridX && x <= gridX + w && y >= gridY && y <= gridY + w)
  if(grid[a] != curCell){
    pastpastCell = pastCell;
    pastCell = curCell;
    curCell = grid[a];
    print(curCell)
    counted = false;
    numVisited++;
    if(numVisited>1 && !counted){
      if(curCell.i == (width/w)-1 && curCell.j == (height/w)-1){
      canPlay = false
      }
      //if the cells are in the same row
      if(pastCell.j == curCell.j){
        //if the current Cell is to the right of the past Cell
        if(pastCell.i > curCell.i){
          //if there is a wall on the left of the pastCell or a wall on the right of the current cell
          if(pastCell.walls[3] == true || curCell.walls[1] == true){
            hits++;
            counted = true;
            throwBack(pastCell)
            var hold = curCell
            curCell = pastCell
            pastCell = pastpastCell
            pastpastCell = hold
          }
        }
        // if the current Cell is to the left of the past Cell
        if(pastCell.i < curCell.i){
          //if there is a wall on the right of the pastCell or a wall on the left of the current cell
          if(pastCell.walls[1] == true || curCell.walls[3] == true){
            hits++;
            counted = true;
            throwBack(pastCell)
            var hold = curCell
            curCell = pastCell
            pastCell = pastpastCell
            pastpastCell = hold
          }
        }
      }
      //if the cells are in the same column
      if(pastCell.i == curCell.i){
        //if the current Cell is above the past Cell
        if(pastCell.j > curCell.j){
          //if there is a wall on the top of the pastCell or a wall on the bottom of the current cell
          if(pastCell.walls[0] == true || curCell.walls[2] == true){
            hits++;
            counted = true;
            throwBack(pastCell)
            var hold = curCell
            curCell = pastCell
            pastCell = pastpastCell
            pastpastCell = hold
          }
        }
        //if the current Cell is below the past Cell
        if(pastCell.j < curCell.j){
          //if there is a wall on the bottom of the pastCell or a wall on the top of the current cell
          if(pastCell.walls[2] == true || curCell.walls[0] == true){
            hits++;
            counted = true;
            throwBack(pastCell)
            var hold = curCell
            curCell = pastCell
            pastCell = pastpastCell
            pastpastCell = hold
          }
        }
      }
    }
  }
}
textSize(20);
fill("red");
text("Hits: " + hits, width-80,25);
  if(canPlay){
    fill(255, 87, 20, 200);
    circle(x,y,offset*2)
    if(mouseIsPressed){
      if(mouseX < x+offset && mouseX > x-offset && mouseY < y+offset && mouseY > y-offset && !clicked){
      clicked = true
      }
    }
    else{
      clicked = false
    }
    if(clicked){
      x = mouseX
      y = mouseY
    }
  }
  if (hits == 3){
    canPlay = false
  }
  if(canPlay == false){
    if(hits == 3){
      fill(200);
      rect(0,0,width,height);
      textSize(40);
      fill("red");
      text("You hit 3 walls", width/4, height/2);
      text("You lose...", width/3, height/2+50);
    }
    else{
      fill(200);
      rect(0,0,width,height);
      textSize(40);
      fill("green");
      text("You got to the end", width/4, height/2);
      text("You hit walls " + hits + " time(s)", width/5, height/2+50);
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
function throwBack(curPastCell){
  x = (curPastCell.i)*100+50;
  y = (curPastCell.j)*100+50;
  clicked = false;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
