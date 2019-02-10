var squares = [];	//	square array
var volsOn = false, aVolsCol, volsCol, volNum; 	//	volume button color vars
var vol1 = 1, vol2 = 1, vol3 = 1, vol4 = 1; 	//	square vol control
var melody, melody2, guitar, bass;				//	media tracks
var osc, amp, freq;  							//	oscillator vars
var INSTR = true; 								//	show instructions

function preload() {
	// reaper music bites
	melody = loadSound("assets/melody.wav"); 
	melody2 = loadSound("assets/melody2.wav");
	guitar = loadSound("assets/guitar.wav"); 
	bass = loadSound("assets/bass.wav"); 
	//	font load
	raleway = loadFont("../ccFinal/assets/Raleway.ttf");
	title = loadFont("../ccFinal/assets/Channel.ttf");
}

function setup() {
	// canvas + sq setup
	createCanvas(windowWidth, windowHeight); 
	squares.push(new Square(width/5, height/5, 'rgb(188, 130, 181)', 'rgb(255, 137, 239)'));
	squares.push(new Square(width/5 + height/5*2, height/5, 'rgb(125, 165, 116)', 'rgb(140, 255, 114)'));
	squares.push(new Square(width/5, height/5*3, 'rgb(107, 163, 161)', 'rgb(91, 255, 249)'));
	squares.push(new Square(width/5 + height/5*2, height/5*3, 'rgb(198, 186, 93)', 'rgb(255, 232, 58)'));
	//	rect setup
	osc = new p5.TriOsc(); // set frequency and type
  	osc.amp(0);
  	osc.start();
}

function draw() {
	background(0); 
	//	squares draw
	for(var i=0; i<4; i++) {
		squares[i].display(); 
	}
	//	gradient rect
	setGradient(width/5 + height/5*4, height/5, height/6, height/5*3);
	//	sound on rect
	if (mouseX > width/5 + height/5*4 && mouseX < width/5 + height && mouseY>height/5 && mouseY<height/5*4) {
		freq = map(mouseY, height/5, height/5*4, 40, 1200);
		osc.freq(freq); 
  		amp = map(mouseX, width/5 + height/5*4, width/5 + height, .01, 1);
  		osc.amp(amp);
	}
	else {
		osc.amp(0); 
	}
	//	volume buttons
	if (volsOn == true) {
		fill(volsCol); 
		stroke(aVolsCol); 
		//	top vol button
		rect(width*0.075, height*.3, width*.05, width*.05); 
		triangle(width*0.085, height*.3+width*.04, width*0.1, height*.3+width*.01, width*0.115, height*.3+width*.04);
		//	bottom vol button
		rect(width*0.075, height*.65, width*.05, width*.05);
		triangle(width*0.085, height*.65+width*.01, width*0.1, height*.65+width*.04, width*0.115, height*.65+width*.01); 
	}
	//	instructions
	if (INSTR == true) {
		strokeWeight(1); 
        fill('rgba(255,255,255,.4)');
        rect(0,0,windowWidth, windowHeight);
        rect(100, 100, windowWidth - 200, windowHeight - 200); 
        stroke(35); 
        fill(35); 
        textFont(title, 20);
        text("Reaper Game", 130, 150);
        textFont(raleway, 15);
        text("Press '1' '2' '3' or '4' to active volume controls for the corresponding square.", 150, 190); 
        text("Press '0' to turn off volume controls.", 150, 215);
        text("Drag your mouse along the rectangle up and down to control a frequency pitch.", 150, 260);
        text("Drag it left to right to control volume.", 150, 285);
        text("Created by Abril, Jennie, and Val.", 150, 330);
        text("Click anywhere to continue.", 150, 375);
    }
}

//	gradient func
function setGradient(x, y, w, h) {
	var c1 = color(216, 32, 32);
	var c2 = color(241, 247, 71);
	var c3 = color(74, 116, 206); 
	var c4 = color(209, 48, 190); 
	for (var i = y; i <= y+h/3; i++) {
      var inter = map(i, y, y+h/3, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
    for (var i = y+h/3; i <= y+h/3*2; i++) {
      var inter = map(i, y+h/3, y+h/3*2, 0, 1);
      var c = lerpColor(c2, c3, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
    for (var i = y+h/3*2; i <= y+h; i++) {
      var inter = map(i, y+h/3*2, y+h, 0, 1);
      var c = lerpColor(c3, c4, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
}

//	SQUARES CLASS
function Square(x, y, colour, acolour) {
	this.dim = height*.2; 
	this.x = x;
	this.y = y; 
	this.colour = colour; 
	this.aColour = acolour;
	this.active = false; 
	this.display = function() {
		if (!this.active) {
			stroke(this.aColour);
			fill(this.colour); 
		}
		else {
			fill(this.aColour);
			stroke(this.colour); 
		}
		strokeWeight(4); 
		rect(this.x, this.y, this.dim, this.dim);
	}
}

//	MOUSE CLICKED FUNCTION
function mousePressed() {
	if (mouseX < width/5 + height/5 && mouseX > width/5) {
		//first box column 
		if (mouseY > height/5 && mouseY < height/5*2) {
			// upper left square
			if (squares[0].active == false) {
				console.log("square to true");
				squares[0].active = true; 
				melody.loop(); 
				console.log("melody playing."); 
			}
			else {
				squares[0].active = false; 
				console.log("square to false");	
				melody.stop(); 
			}
		}
		else if (mouseY > height/5*3 && mouseY < height/5*4) {
			// bottom left square
			if (squares[2].active == false) {
				console.log("square to true");
				squares[2].active = true; 
				bass.loop(); 
			}
			else {
				squares[2].active = false; 
				console.log("square to false");	
				bass.stop(); 
			}
		}
	}
	else if (mouseX < width/5 + height/5*3 && mouseX > width/5 + height/5*2) {
		//second box column
		if (mouseY > height/5 && mouseY < height/5*2) {
			// upper right square
			if (squares[1].active == false) {
				console.log("square to true");
				squares[1].active = true; 
				guitar.loop();
			}
			else {
				squares[1].active = false; 
				console.log("square to false");	
				guitar.stop(); 
			}
		}

		else if (mouseY > height/5*3 && mouseY < height/5*4) {
			// bottom right square
			if (squares[3].active == false) {
				console.log("square to true");
				squares[3].active = true; 
				melody2.loop(); 
			}
			else {
				squares[3].active = false; 
				console.log("square to false");	
				melody2.stop(); 
			}
		}
	}
	else if (mouseX > width*0.075 && mouseX < width*.125) {
		//	volume buttons
		if (mouseY> height*.3 && mouseY < height*.3 + width*.05) {
			console.log("up clicked"); 
			if (volNum == 1 && vol1<1) {
				vol1 +=.1;
				melody.amp(vol1); 
			}
			if (volNum == 2 && vol2<1) {
				vol2 +=.1;
				guitar.amp(vol2); 
			}
			if (volNum == 3 && vol3<1) {
				vol3 +=.1;
				bass.amp(vol3); 
			}
			if (volNum == 4 && vol4<1) {
				vol4 +=.1;
				melody2.amp(vol4); 
			}
		}
		if (mouseY > height*.65 && mouseY < height*.65 + width*.05) {
			console.log("down clicked"); 
			if (volNum == 1 && vol1>0) {
				vol1 -=.1;
				melody.amp(vol1); 
			}
			if (volNum == 2 && vol2>0) {
				vol2 -=.1;
				guitar.amp(vol2); 
			}
			if (volNum == 3 && vol3>0) {
				vol3 -=.1;
				bass.amp(vol3); 
			}
			if (volNum == 4 && vol4>0) {
				vol4 -=.1;
				melody2.amp(vol4); 
			}
		}
	}
	//  REMOVE INSTRUCTIONS
    if (INSTR == true) {
        INSTR = false; 
        console.log("instr down"); 
    }
}

function keyPressed() {
	if (key == 0) {		//	turn off vol buttons
		volsOn = false; 
		volNum = 0; 
	}
	if (key == 1) {		//	pink
		volsCol = color('rgb(188, 130, 181)');
		aVolsCol = color('rgb(255, 137, 239)'); 
		volsOn = true; 
		volNum = 1;
	}
	if (key == 2) {		//	green
		volsCol = color('rgb(125, 165, 116)');
		aVolsCol = color('rgb(140, 255, 114)'); 
		volsOn = true; 
		volNum = 2;
	}
	if (key == 3) {		//	blue
		volsCol = color('rgb(107, 163, 161)');
		aVolsCol = color('rgb(91, 255, 249)'); 
		volsOn = true; 
		volNum = 3; 
	}
	if (key == 4) {		//	yellow
		volsCol = color('rgb(198, 186, 93)');
		aVolsCol = color('rgb(255, 232, 58)'); 
		volsOn = true; 
		volNum = 4; 
	}
}

//	RESIZE WINDOW
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 


