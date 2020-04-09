var cnv; 
var INSTR = true;
//  scribble lib added
var scribble = new Scribble();              // global mode
//function modes
var audMode = 1;    // mic, chosen songs, drag n drop
var visMode = 1; 
//sensitivities
var ampSense = 2;  
//general mode values 
var level;          //  amplitude val
//visMode 0 values
var threshold = 0.1, cutoff = 0, decayRate = 0.95;
var dots = []; 
var dotsNum = 0; 
var drops = [];
var dropsNum = 0; 
//visMode 1 values
var ampLevs = new Array(55);
var spacing = 10; 
//vis Mode 2 values
var col2 = [[173, 20, 160],[237, 101, 169],[255, 150, 128]]
var boxes = [];     //  setup will have 100 boxes
var levBump;
//audMode 1 values
var micOn = false; 
//audMode 2 values
var playing = false; 
var menuDown = false; 
var sametome, beginning, endofp, getup, greenlight, itslikethat, willhe;
var curSong; 



function preload() {
    //  font preload
    songsel = loadFont("assets/Channel.ttf");
    raleway = loadFont("assets/Raleway.ttf"); 
    //  music preload
    sametome = loadSound('assets/AllTheSameToMe.mp3');
    beginning = loadSound('assets/TheBeginning.mp3');
    endofp = loadSound('assets/EndOfThePiLlOwT4lK.mp3');
    getup = loadSound('assets/GetUp.mp3');
    greenlight = loadSound('assets/GreenLight.mp3');
    itslikethat = loadSound('assets/ItsLikeThat.mp3');
    willhe = loadSound('assets/WillHe.mp3');
}

function setup() {
    //  create canvas
    cnv = createCanvas(windowWidth, windowHeight);
    //  MIC SET UP
    mic = new p5.AudioIn()
    //  AMP AND FREQ SET UP
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();  
    pd = new p5.PeakDetect();  
    //  allow for drag and drop onto canvas
    cnv.drop(gotFile); 
    //  set up boxes for vMode 2
    for (var i = 0; i < 100; i++) {
        var randx = random(-windowWidth/2, windowWidth/2);
        var randy = random(-windowHeight/2, windowHeight/2);
        var dim = random(3, 15);
        var randcol = random(col2); 
        var ynFill = random([true, false]); 
        var isSq = random([true, false]); 
        boxes.push(new Box(dim, randx, randy, randcol, ynFill, isSq));
    }
}

function draw() {
    //  AUD MODE IF STATEMENTS
    level = amplitude.getLevel();
    //  VIS MODE DRAW
    background(80); 
    if (visMode == 0) { 
        //  SUNSET DOTS
        if (level > threshold + cutoff) { //(pd.isDetected) {
            var randx = random(0, windowWidth);
            var randy = random(0, windowHeight);
            var randdim = random(20, 85); 
            //console.log(randy + " " + randx + " " + randdim); 
            dots.push(new Dot(randdim, randx, randy));
            dotsNum += 1; 
            cutoff = level;
        }
        cutoff *= decayRate;
        for (var i = 0; i < dotsNum; i++) {
            //console.log("in display");
            dots[i].display(); 
        }
        //  CENTER ELLIPSE
        fill('rgb(224, 174, 47)'); 
        strokeWeight(2); 
        stroke(35);
        scribble.scribbleEllipse(windowWidth/2, windowHeight/3, level*350+100, level*350+100);
        //  SPECTRUM DRAW
        var spectrum = fft.analyze();
        pd.update(fft);
        fill(71, 98, 155);
        stroke(66, 134, 244);
        strokeWeight(1);

        for (var i = 0; i< spectrum.length; i+=10){
            var x = map(i, 0, spectrum.length, 0, width);
            var h = -height + map(spectrum[i], 0, 255, height, 0);
            rect(x, height, (width / spectrum.length) * 10, h )
        }

        //  THRESHOLD RAIN DROPS 
        if (pd.isDetected) {
            randx = random(40, windowWidth-40);
            randy = random(0, windowHeight-100);
            drops.push(new Drop(randx, randy));
            dropsNum += 1; 
        }
        noFill();
        strokeWeight(2);
        stroke(230); 
        for (var i = 0; i < dropsNum; i++) {
            drops[i].display();             //  displays drops
            if (drops[i].pastH == true) {   //  erases drops past viewing
                drops.splice(i, 1); 
                dropsNum -= 1; 
            }
        }
    } else if (visMode == 1) {
        //  SCRIBBLE SNOWFLAKE
        stroke(255); 
        push(); 
        translate(width/2, height/5*2);     //  height matches amp wave
        push(); 
        scribble.scribbleLine(0, -15, 0, 15);
        rotate(PI / 3); 
        scribble.scribbleLine(0, -15, 0, 15);
        rotate(PI / 3); 
        scribble.scribbleLine(0, -15, 0, 15);
        pop(); 
        if (level > .35) {                   //  if "loud", extra snowflakes  
            push(); 
            translate(0,height/9);
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            pop(); 
            push(); 
            translate(0, -height/9);
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            pop(); 
        }
        if (level > .6) {                   //  if "v loud", extra extra snowflakes  
            push(); 
            translate(0,height/9*2);
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            pop(); 
            push(); 
            translate(0, -height/9*2);
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            rotate(PI / 3); 
            scribble.scribbleLine(0, -15, 0, 15);
            pop(); 
        }
        pop(); 
        //  AMP WAVE
        var w = width/(ampLevs.length * spacing);
        ampLevs.push(level);
        ampLevs.splice(0, 1);
        //  display ampLevs
        for (var i = 0; i < 60; i++) {
            var x = map(i, ampLevs.length, 0, (width/2+20), width);
            var h = map(ampLevs[i], 0, 0.6, 1, height/2);
            stroke(189, 141, 224);
            fill(230); 
            rect(x, (height/5*2)-(h/2), w, h);
            rect(width - x, (height/5*2)-(h/2), w, h);
        }
        //  WAVEFORM
        var waveform = fft.waveform();
        noFill();
        beginShape();
        stroke(255); 
        strokeWeight(2);
        for (var i = 0; i< waveform.length; i+=10){
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i]/8, -1, 1, height/3*2, height);
            vertex(x, y);
        }
        endShape();
    } else if (visMode == 2) { 
        push(); 
        //  push rotate point to center
        translate(width/2, height/2);
        rectMode(CENTER);
        //  layer 3
        push()
        levBump = level * 10;
        rotate(frameCount/720);
        strokeWeight(1);
        for (var i = 0; i < 40; i++) {
            boxes[i].display();
        }
        pop(); 
        //  layer 2
        push();
        levBump = level * 20;
        rotate(frameCount/600);
        strokeWeight(2);
        for (var i = 40; i < 70; i++) {
            boxes[i].display();
        }
        pop();
        //  layer 1
        push();
        levBump = level * 30; 
        rotate(frameCount/480);
        strokeWeight(3);
        for (var i = 70; i < 100; i++) {
            boxes[i].display();
        }
        pop();
        pop();
    }
    //  SONG SELECT
    if (audMode == 1) {
        stroke(240); 
        strokeWeight(1);
        fill('rgba(160, 160, 160, .4)'); 
        rect(windowWidth-210, 10, 200, 40); 
        textFont(songsel, 15);
        text("Song Selection", windowWidth-190, 35);
        if (menuDown == true) {
            rect (windowWidth-190, 50, 180, 30); 
            textFont(raleway, 15);
            text("All The Same To Me", windowWidth-170, 70);
            rect (windowWidth-190, 80, 180, 30); 
            textFont(raleway, 15);
            text("The Beginning", windowWidth-170, 100);
            rect (windowWidth-190, 110, 180, 30); 
            textFont(raleway, 15);
            text("End of the PiLlOwT4lK", windowWidth-170, 130);
            rect (windowWidth-190, 140, 180, 30); 
            textFont(raleway, 15);
            text("Get Up", windowWidth-170, 160);
            rect (windowWidth-190, 170, 180, 30); 
            textFont(raleway, 15);
            text("Green Light", windowWidth-170, 190);
            rect (windowWidth-190, 200, 180, 30); 
            textFont(raleway, 15);
            text("It's Like That", windowWidth-170, 220);
            rect (windowWidth-190, 230, 180, 30); 
            textFont(raleway, 15);
            text("Will He", windowWidth-170, 250);
        }
        stroke(255);
        if (playing == false) {
            scribble.scribbleLine( 15, 15, 35, 30 );
            scribble.scribbleLine( 15, 45, 35, 30 );
            scribble.scribbleLine( 15, 15, 15, 45 ); 
        }
        else {
            scribble.scribbleRect(20, 30, 10,30);
            scribble.scribbleRect(35, 30, 10,30);
        }   
    }
    if (curSong) {curSong.onended(fPlay); }
    if (INSTR == true) {
        fill('rgba(255,255,255,.4)');
        rect(0,0,windowWidth, windowHeight);
        rect(100, 100, windowWidth - 200, windowHeight - 200); 
        stroke(35); 
        fill(35); 
        textFont(songsel, 20);
        text("Audio Visualizer", 130, 150);
        textFont(raleway, 15);
        text("Press '1' to get sound from your microphone.", 150, 190); 
        text("Press '2' to select a song from the drop down menu.", 150, 215);
        text("Drag an mp3 onto the screen to play it.", 150, 240);
        text("Press 'm' to toggle the visualization mode.", 150, 285);
        text("Press 'c' to clear the circles in the sunset mode.", 150, 310);
        text("Click the 'i' in the bottle right corner to bring up the instructions.", 150, 355);
        text("Click anywhere to continue.", 150, 400);
    }
    noFill(); 
    strokeWeight(2);
    stroke(160);
    ellipse(width-30, height-30, 30, 30); 
    textFont(songsel, 18);
    text("i", width-35, height-22);
}


//  =|=|=|=|=|=|=|=|=|=|=|=|=|=
//  =|=|= OTHER FUNCTIONS =|=|=
//  =|=|=|=|=|=|=|=|=|=|=|=|=|=

//  DRAG AND DROP FUNCTIONS 
function gotFile(file) {
  if (curSong) {curSong.stop();}
  curSong = loadSound(file, function() {
    playSong();});
}

function playSong() {   //  needed bc callback
    audMode = 1; 
    curSong.play(); 
    playing = true; 
}

//  STOP PLAYING CALLBACK
function fPlay(curSong) {
    playing == false; 
}


//  =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//  =|=|= MOUSE / KEY PRESSED =|=|=
//  =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=

//  =|=|= KEY PRESSED IF STATEMENTS =|=|=
function keyPressed() {
    console.log(key);
    if (key == '1') {
        if (curSong) {curSong.stop();}
        mic.start();
        micOn = true;
        audMode = 0;
        console.log("mic True"); 
        fft.setInput(mic); 
        amplitude.setInput(mic);
        amplitude.smooth(0.6);
        playing = false; 
    } else if (key == 2) {
        if (micOn == true) {
            mic.stop(); 
            micOn = false
            audMode = 1;
            console.log("mic False"); 
            fft.setInput();
            amplitude.setInput(); 
            amplitude.smooth(0.6);
        }
    }
    //  mode switch
    else if (key == 'M') {
        visMode += 1; 
        if (visMode == 3) {
            visMode = 0; 
        }
    }
    //  clear sunset dots
    else if (key == 'C') {
        dots.splice(0, dotsNum);    //  rids array of dots to start anew
        dotsNum = 0;                //  resets array count back to 0
    }
}

//  =|=|= MOUSE PRESSED IF STATEMENTS =|=|=
function mousePressed() {
    console.log("mouse pressed at " + mouseX + " and " + mouseY)
    //  DROP DOWN MENU
    if (mouseX < windowWidth && mouseX > windowWidth-220) {
        if (mouseY < 50) {
            if (menuDown == true) {
                menuDown = false; 
            }
            else {
                menuDown = true; 
            }
        }
        else if (menuDown == true) {
            if (mouseY >= 50 && mouseY < 70) {
                if (curSong) {curSong.stop();}
                curSong = sametome;
                curSong.play();
                playing = true; 
            } 
            else if (mouseY >= 80 && mouseY < 100) {
                if (curSong) {curSong.stop();}
                curSong = beginning;
                curSong.play();
                playing = true; 
            }
            else if (mouseY >= 110 && mouseY < 140) {
                if (curSong) {curSong.stop();}
                curSong = endofp;
                curSong.play();
                playing = true; 
            }
            else if (mouseY >= 140 && mouseY < 170) {
                if (curSong) {curSong.stop();}
                curSong = getup;
                curSong.play();
                playing = true; 
            }
            else if (mouseY >= 170 && mouseY < 200) {
                if (curSong) {curSong.stop();}
                curSong = greenlight;
                curSong.play();
                playing = true; 
            }
            else if (mouseY >= 200 && mouseY < 230) {
                if (curSong) {curSong.stop();}
                curSong = itslikethat;
                curSong.play();
                playing = true; 
            }
            else if (mouseY >= 230 && mouseY < 260) {
                if (curSong) {curSong.stop();}
                curSong = willhe;
                curSong.play();
                playing = true; 
            }
        }
    }
    //  PLAY PAUSE
    else if (mouseY<= 60 && mouseX <= 60) {
        if (playing == false) {
            if (curSong) {
                curSong.play(); 
                playing = true; 
            }
        }
        else {
            if (curSong) {
                curSong.pause(); 
                playing = false; 
            }
        }
    }
    //  REMOVE INSTRUCTIONS
    if (INSTR == true) {
        INSTR = false; 
        console.log("instr down"); 
    }
    //  INFO CLICK
    if (mouseX > width-60 && mouseY > height-60) {
        console.log("instr up"); 
        INSTR = true;      
    }
}

//  =|=|=|=|=|=|=|=|=|=
//  =|=|= CLASSES =|=|=
//  =|=|=|=|=|=|=|=|=|=

//  DOTS CLASS
function Dot(dim, x, y, col) {
    this.dim = dim;
    this.x = x;
    this.y = y; 
    this.display = function() {
        //console.log(randy + " " + randx + " " + randdim);
        noStroke();
        if (this.y > height*2/3) {
                fill('rgba(68, 20, 81, .6)'); 
            }
            else if (this.y > height/2) {
                fill('rgba(132, 25, 123, .6)'); 
            }
            else if (this.y > height/3) {
                fill('rgba(198, 111, 156, .6)'); 
            }
            else if (this.y > height/5) {
                fill('rgba(241, 119, 138, .6)'); 
            }
            else {
                fill('rgba(255, 150, 128, .6)'); 
            }
        ellipse(this.x, this.y, this.dim); 
    }
}

//  DROP CLASS
function Drop(randx, randy) {
    this.dim = 60;
    this.x = randx;
    this.y = randy;
    this.el = true; 
    this.ln = 4; 
    this.display = function() {
        stroke(250); 
        if (this.el == true){ 
            ellipse(this.x, this.y, this.dim, this.dim/2);
            this.dim-=1; 
            if (this.dim <= 2) {
                this.dim = 0; 
                this.el = false;
            }
        }
        else {
            if (this.ln < 10) {
                line(this.x, this.y, this.x, this.y+this.ln);
                this.ln += 1;
            }
            else {
                line(this.x, this.y, this.x, this.y+this.ln);
                this.y += 3; 
            }
        }
    }
    this.pastH = function() {
        if (this.y > windowHeight) {
            return true;
        }
        else {
            return false; 
        }
    }
}

//  BOX CLASS
function Box(rand, rand1, rand2, col, ynFill, isSq) {
    this.dim = rand; 
    this.x = rand1;
    this.y = rand2; 
    this.col = col; 
    this.ynFill = ynFill;
    this.isSq = isSq;
    this.display = function() {
        stroke(this.col);
        if (this.ynFill) {
            fill(this.col);
        }
        else {
            noFill(); 
        }
        if (isSq == true) {
            rect(this.x, this.y, this.dim+levBump, this.dim+levBump);
        }
        else {
            ellipse(this.x, this.y, this.dim+levBump, this.dim+levBump);
        }
    }
}

//  RESIZE WINDOW
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

