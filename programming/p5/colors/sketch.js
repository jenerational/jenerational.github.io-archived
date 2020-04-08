//  VARS
var colArr = []; 
var caSz = 0; 
var bgCol = 200; 
//mouse pressed
var mClick = false; 
// color vars
var red;
var green;
var blue; 
// darker colors
var dRed;
var dGreen;
var dBlue;
//lighter colors
var lRed;
var lGreen;
var lBlue; 

function preload() {
  hexData = loadJSON("assets/web_colors.json"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200); 
  noStroke(); 

  // load in data
  for(var i = 0; i < hexData.colors.length; i++){
    colArr.push(new ColDot(hexData.colors[i].color, hexData.colors[i].hex)); 
    console.log("push"); 
    caSz++; 
  }
}

function draw() {
  background(color(bgCol)); 
  for (var i = 0; i < caSz; i++) {
    colArr[i].display(); 
  }
  down = false; 
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (bgCol < 255) {
      bgCol +=5;
    }
    console.log(bgCol);
  } else if (keyCode === DOWN_ARROW) {
    if (bgCol > 0) {
      bgCol -=5;
    }
    console.log(bgCol);
  }
}

function mousePressed() {
  mClick = true; 
  colName = false;
}

//  CLASSES
function ColDot(name, hex) {
  this.x = random(windowWidth);
  this.y = random(windowHeight); 
  this.name = name; 
  this.color = color(hex); 
  console.log(this.color); 
  this.dia = 20; 
  this.display = function() {
    fill(this.color); 
    ellipse (this.x, this.y, this.dia, this.dia); 
    if (mouseX >= this.x-this.dia/2 && mouseX < this.x + this.dia/2) {
      if (mouseY >= this.y-this.dia/2 && mouseY < this.y + this.dia/2) {
        background(250, 250, 250, .2);
        textSize(20);
        if (colName=true){
          text(this.name, mouseX+10, mouseY+10); 
        }
        if(mClick) {
          red = unhex(this.color.substring(0, 2));
          green = unhex(this.color.substring(2, 4));
          blue = unhex(str.substring(4, 6));
          console.log(red+", "+green+", "+blue)
          dRed = (red-50>0) ? red-50:0; 
          dBlue = (blue-50>0) ? blue-50:0; 
          dGreen = (green-50>0) ? green-50:0; 
          lRed = (red+50<255) ? red+50:255; 
          lBlue = (blue+50<255) ? blue+50:255;
          lGreen = (green+50<255) ? green+50:255;
          //var c = ;
          //ellipse
        }
      }
    }
  }
}