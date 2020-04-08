//  VARS
var colArr = []; 
var caSz = 0; 
var bgCol = 200; 
//mouse pressed
var mClick = false; 
var colName; 
// color vars
var xRed;
var xGreen;
var xBlue; 
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
    //console.log("push"); 
    caSz++; 
  }
}

function draw() {
  background(color(bgCol)); 
  for (var i = 0; i < caSz; i++) {
    colArr[i].display(); 
  }
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

//  CLASSES
function ColDot(name, hex) {
  this.x = random(windowWidth);
  this.y = random(windowHeight); 
  this.name = name; 
  this.color = color(hex); 
  //console.log(this.color); 
  this.dia = 11; 
  this.display = function() {
    fill(this.color); 
    ellipse (this.x, this.y, this.dia, this.dia); 
    if (mouseX >= this.x-this.dia/2 && mouseX < this.x + this.dia/2) {
      if (mouseY >= this.y-this.dia/2 && mouseY < this.y + this.dia/2) {
        background(250, 250, 250, .2);
        textSize(15); 
        text(this.name, mouseX+10, mouseY+10); 
          //BAHAHAHAHAHAHA
          //thRed =str(this.color);
          //console.log(thRed.substring(0,2)); 
          //xred = unhex(str(this.color).substring(0, 2));
          //green = unhex(str(this.color).substring(2, 4));
          //blue = unhex(str(this.color).substring(4, 6));
          //console.log(red+", "+green+", "+blue)
          xRed = red(this.color);
          xGreen = green(this.color);
          xBlue = blue(this.color); 
          console.log(xRed+", "+xGreen+", "+xBlue); 
          dRed = (xRed-50>0) ? xRed-50:0; 
          dBlue = (xBlue-50>0) ? xBlue-50:0; 
          dGreen = (xGreen-50>0) ? xGreen-50:0; 
          lRed = (xRed+50<255) ? xRed+50:255; 
          lBlue = (xBlue+50<255) ? xBlue+50:255;
          lGreen = (xGreen+50<255) ? xGreen+50:255;
          fill(lRed,lGreen,lBlue); 
          ellipse(this.x+this.dia, this.y, this.dia, this.dia); 
          fill(dRed,dGreen,dBlue); 
          ellipse(this.x-this.dia, this.y, this.dia, this.dia);
      }
    }
  }
}