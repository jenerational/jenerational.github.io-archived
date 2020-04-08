// ~+~ MOUSE PAINT ADAPTATION ~+~

//  mice array
var mice = [];
//  puddles array
// 2 = blue, 1 = yellow, 0 = red 
var puddles = []; 
// PRELOAD title font
var titleF, textF;
// PRELOAD images
var catEyes, catEyesRed; 
var paintR, paintY, paintB; 
var mW, mR, mY, mB;
//var mRY, mRB, mYR, mYB, mBR, mRB;

// screen clicked bool 
var fClick = false, sClick = false, tClick = false;
// eyes opening bool
var eyes = false;  
// draw var
var drawTime = false, intro = true;
// intro mouse location
var j = 0, mWx = 10; 
// last mouse selected
var mSel = 0;


function preload() {
    // fonts
    titleF = loadFont("assets/AmaticSC.ttf");
    textF = loadFont("assets/Raleway.ttf");
    // cat eyes photos
    catEyes = loadImage("assets/catEyes.png");
    catEyesRed = loadImage("assets/catEyesRed.png");
    // paint can photos
    paintR = loadImage("assets/paintR.png");
    paintY = loadImage("assets/paintY.png");
    paintB = loadImage("assets/paintB.png");
    // mice photos
    mW = loadImage("assets/mouseW.png"); 
    mR = loadImage("assets/mouseR.png"); 
    mY = loadImage("assets/mouseY.png"); 
    mB = loadImage("assets/mouseB.png"); 
    // mice feet photos
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    //creating mouse array w 3 mice
    //creating puddles array of red, yellow, and blue 
    for (var i = 0; i < 3; i++) { 
        if (i == 0) {
            puddles.push(new Puddle(255,0,0));
            mice.push(new Mouse('B'));
        }
        else if (i == 1) {
            puddles.push(new Puddle(255,255,0));
            mice.push(new Mouse('Y'));
        }
        else {
            puddles.push(new Puddle(0,0,255));
            mice.push(new Mouse('R'));
        }
    }

    textFont(titleF, 60);
    text("click to start. be careful of the cat", windowWidth*(2/7), windowHeight/2); 
    //  set up "paper" 
    // noFill();    
}

function draw(){
    // if ready to draw
    if (drawTime == true && intro == true) {
        background(256);
        image(paintR, 75, 50);
        image(paintY, 75, 250);
        image(paintB, 75, 450);
        if (j < 490) {
            j++; 
        }
        else {
            if (mWx != 35) {
                mWx++;
            }
            else {
                mice[0].photo = mB;
                mice[0].color = color(0,0,255);
                mice[1].photo = mY;
                mice[1].color = color(255,255,0);
                mice[2].photo = mR;
                mice[2].color = color(255,0,0);
                for (var i = 0; i < 3; i++) {
                    puddles[i].x = random(200, windowWidth-100);
                    puddles[i].y = random(100, windowHeight-100);
                }
                intro = false;
            }
        }
        for (var i = 0; i < 3; i++) {
            mice[i].x = mWx;
            mice[i].y = j-(200*i); 
            mice[i].display();
        }
    }
    else if (intro == false) {
        background(255); 
        image(paintR, 75, 50);
        image(paintY, 75, 250);
        image(paintB, 75, 450);
        for (var i = 0; i < 3; i++) {
            puddles[i].display();
            mice[i].display(); 
        }
    }
}

function mousePressed() {
    if (fClick == false) {
        background(255);
        //eyes = true;
        image(catEyes, windowWidth/2-(catEyes.width/2), windowHeight/2-30);
        fill(0);
        triangle(windowWidth/2-15, windowHeight/2+45, windowWidth/2+15, windowHeight/2+45, windowWidth/2, windowHeight/2+60);
        noFill();
        arc(windowWidth/2-30, windowHeight/2+55, 60, 60, 0, HALF_PI); 
        arc(windowWidth/2+30, windowHeight/2+55, 60, 60, HALF_PI, PI);
        fClick = true;
    }
    else if (sClick == false) {
        image(catEyesRed, windowWidth/2-(catEyes.width/2), windowHeight/2-30);
        triangle(windowWidth/2-28, windowHeight/2+85, windowWidth/2-38, windowHeight/2+85, windowWidth/2-33, windowHeight/2+95);
        triangle(windowWidth/2+28, windowHeight/2+85, windowWidth/2+38, windowHeight/2+85, windowWidth/2+33, windowHeight/2+95);
        sClick = true;
    }
    else if (tClick == false) {
        background(256); 
        stroke(0);
        fill(0);
        textFont(textF, 30);
        text("Here in Mouse Paint there are three white mice that live in a white room.", 30,60); 
        text("They stay white to hide from the cat. When the cat is away, the mice will create.", 30, 100);
        text("The mice jump into cans of paint to dye themselves that color.", 30, 160);
        text("They can then splash around in a puddle of the color to mix the paint colors.", 30, 200);
        text("Press 'r' for the red mouse, 'y' for the yellow mouse, or 'b' for the blue mouse.", 30, 260); 
        text("Then, use wasd to move the mouse around. You must repeatedly press the key.", 30, 300); 
        text("Press 'n' to start.", 30, 360);
    }
}

function keyPressed() {
    console.log(key);
    if (intro == false && (key == 'R' || key == 'Y' || key == 'B')) {
        console.log("we in");
        for (var i = 0; i < 3; i++) {
            if (mice[i].let == key) {
                mSel = i; 
                console.log("mSel now " + key);
            }
        }
    }
    else if (intro == false) {
        if (key == 'W') {
            mice[mSel].move('y', -5);
        }
        else if (key == 'S') {
            mice[mSel].move('y', +5);
        }
        else if (key == 'A') {
            mice[mSel].move('x', -5); 
        }
        else if (key == 'D') {
            mice[mSel].move('x', +5); 
        }
    }
    else if (tClick == false && key == 'N') {
        tClick = true;
        drawTime = true;
    }
}



/* ---------------------
-------  CLASSES -------
----------------------*/

//  MOUSE CLASS
function Mouse(letter) {
    this.let = letter; 
    this.color = color(0,0,0); 
    this.x = 0;
    this.y = 0; 
    this.photo = mW;
    this.display = function() {
        image(this.photo, this.x, this.y);
    }
    this.move = function(dir, dist) {
        if (dir == 'x') {
            this.x += dist; 
        }
        else {
            this.y += dist; 
        }
        this.check(); 
    }
    this.check = function() {
        for (var i=0; i<3; i++) {
            if (this.x <= puddles[i].x+puddles[i].width/2 && this.x >= puddles[i].x-puddles[i].width/2) {
                if (this.y <= puddles[i].y+puddles[i].width/2 && this.y >= puddles[i].y-puddles[i].width/2) {
                    if (this.let == 'R') {
                        if (i == 1) {
                            puddles[i].color = color(255, 165, 0);
                        }
                        else if (i == 2) {
                            puddles[i].color = color(148,0,211);
                        }
                    }
                    else if (this.let == 'Y') {
                        if (i == 0) {
                            puddles[i].color = color(255, 165, 0);
                        }
                        else if (i == 2) {
                            puddles[i].color = color(0,255,0);
                        }
                    }
                    else if (this.let == 'B') {
                        if (i == 0) {
                            puddles[i].color = color(148,0,211);
                        }
                        else if (i == 1) {
                            puddles[i].color = color(0,255,0);
                        }
                    }
                }
            }
        }
    }
}

//  PUDDLES CLASS
function Puddle(rVal, bVal, gVal) {
    this.color = color(rVal, bVal, gVal); 
    this.x = 0;
    this.y = 0; 
    this.height = 85;
    this.width = 100; 
    this.display = function() {
        this.height += random(-1, 1);
        this.width += random(-1, 1);
        strokeWeight(1);
        fill(this.color); 
        ellipse(this.x, this.y, this.width, this.height);
    }
}



