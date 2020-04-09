var cnv; 
var INSTR = true;   // shows instructions
//sensitivities
var ampSense = 2;  
//general mode values 
var level;          //  amplitude val
//function modes
var audMode = 1;    // mic, chosen song/drag n drop
var visMode = 0; 
//visMode 0 values
var threshold = 0.1, cutoff = 0, decayRate = 0.95; 
var fruit = [];
var fruitNum = 0; 
var fCol = [[229, 217, 27], [239, 93, 12], [195, 47, 83], [119, 0, 243], [39, 121, 210], [20, 186, 103]];
let frootImg; 
//E5D91B, '#EF5D0C', '#C32F53', '#7700F3', '#2779D2', '#14BA67'];
//visMode 1 values
var ampLevs = new Array(55);
var spacing = 10; 
//vis Mode 2 values
var levBump;
//audMode 1 values
var micOn = false; 
//audMode 2 values
var playing = false; 
var songChange = false;
var froot, getup, laputa;
var curSong; 



function preload() {
    //  font preload
    raleway = loadFont("assets/Raleway.ttf"); 
    //  music preload
    froot = loadSound('assets/Froot.mp3');
    getup = loadSound('assets/GetUp.mp3');
    laputa = loadSound('assets/Laputa.m4a');
    // image preload
    frootImg = loadImage('assets/frootImg.png');
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
}

function draw() {
    //  AUD MODE IF STATEMENTS
    level = amplitude.getLevel();
    //  VIS MODE DRAW
    background(0); 
    if (visMode == 0) { 
        //  FROOT
        image(frootImg, (width/2-frootImg.width/2), (height/2-frootImg.height/2)); 
        //  threshold fruit loops
        fft.analyze();
        pd.update(fft); 
        if (pd.isDetected || level >.6) {
            console.log("vm0"); 
            randx = random(40, windowWidth-40);
            randy = random(40, windowHeight-40);
            var randCol = random(fCol);
            fruit.push(new Loop(randx, randy, randCol));
            fruitNum += 1; 
        }
        for (var i = 0; i < fruitNum; i++) {
            //console.log(fruitNum);
            fruit[i].display();             //  displays fruit
            if (fruit[i].pastDia() == true) {   //  erases fruit past viewing
                fruit.splice(i, 1); 
                fruitNum -= 1; 
            }
        }
        //  WAVEFORM
        var waveform = fft.waveform();
        noFill();
        beginShape();
        stroke(255); 
        strokeWeight(2);
        for (var i = 0; i< waveform.length; i+=10){
            var x = map(i, 0, waveform.length, 0, width);
            var y = map(waveform[i]/8, -1, 1, 0, height);
            vertex(x, y);
        }
        endShape();
    } else if (visMode == 1) {
        //  GET UP
        // alarm design
        background(0); 
        noStroke();
        fill(60);
        rect(0, windowHeight*.66, windowWidth, windowHeight*.34)
        fill(120);
        rect(windowWidth*.25, windowHeight*.45, windowWidth*.5, windowHeight*.3, 20, 20, 20, 20);
        fill(0,0,0); 
        rect(windowWidth*.275, windowHeight*.5, windowWidth*.45, windowHeight*.2, 20, 20, 20, 20);
        //  SCRIBBLE SNOWFLAKE
        
        if (level > .6) {                   //  if "v loud", extra extra snowflakes  
            
        } else if (level > .35) {                   //  if "loud", extra snowflakes  
            
        }
         
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
        // LAPUTA
        
    }
    // when song has ended, playing=false
    if (curSong) {curSong.onended(fPlay); }
    // instructions
    if (INSTR == true) {
        fill('rgba(255,255,255,.65)');
        rect(0,0,windowWidth, windowHeight);
        rect(100, 100, windowWidth - 200, windowHeight - 200); 
        noStroke(); 
        textFont(raleway, 25); 
        fill(40); 
        text("This audio visualizer is not designed for mobile devices.", 150, 170); 
        text("Press '1' to get sound from your microphone.", 150, 200); 
        text("Press '2' to play from preselected songs for each design.", 150, 230);
        text("Drag an mp3 onto the screen to play it.", 150, 260);
        text("Press 'm' or left and right keys to toggle the visualization mode.", 150, 310);
        text("Press 'p' or space to pause and play the song.", 150, 340);
        text("Songs: 'Froot' by Marina and the Diamonds", 150, 390);
        text("'Get Up' by clipping", 233, 420);
        text("'Laputa' by Hiatus Kyote", 233, 450);
        text("Click anywhere to continue.", 150, 500);
    }
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
    } else if (key == '2') {
        if (micOn == true) {
            mic.stop(); 
            micOn = false
            audMode = 1;
            console.log("mic False"); 
            fft.setInput();
            amplitude.setInput(); 
            amplitude.smooth(0.6);
        }
    } else if (key == 'X') {
        if (playing == true) {
            // if music
            curSong.stop(); 
            songChange = true;
            playing = false; //now no music
        }
    } else if ((key == 'P' || key == ' ') && audMode == 1) { //  play pause
        //play pause controlled w 'p'
        if (playing == true) {
            // if music
            curSong.pause(); 
            playing = false; //now no music
        } 
        else { //(playing == false) 
            if (curSong && songChange==true) {
                // if there is a song, play it
                curSong.play(); 
                playing = true; //now music
            } else {
                if (visMode == 0) {
                    curSong = froot;
                    curSong.play();
                    playing=true; 
                } else if (visMode ==1){
                    curSong = getup;
                    curSong.play();
                    playing=true; 
                } else {  //if visMode = 2
                    curSong = laputa;
                    curSong.play();
                    playing=true; 
                }
                songChange=false;
            }
        }
    }
    //  mode switch
    else if (key == 'M' || keyCode === RIGHT_ARROW) {
        visMode += 1; 
        if (visMode == 3) {
            visMode = 0; 
        }
    } else if (keyCode === LEFT_ARROW) {
        visMode -= 1;
        if (visMode == -1) {
            visMode=2; 
        }
    }
}

//  =|=|= MOUSE PRESSED IF STATEMENTS =|=|=
function mousePressed() {
    //  REMOVE INSTRUCTIONS
    if (INSTR == true) {
        INSTR = false; 
        console.log("instr down"); 
    }
}

//  =|=|=|=|=|=|=|=|=|=
//  =|=|= CLASSES =|=|=
//  =|=|=|=|=|=|=|=|=|=


//  Loop CLASS
function Loop(randx, randy, col) {
    this.x = randx;
    this.y = randy;
    this.r = col[0]; 
    this.g = col[1];
    this.b = col[2];
    this.alpha=255;
    this.diam = random(10, 40); 
    this.dia2 = 0;  
    this.display = function() {
        ellipseMode(CENTER); 
        console.log(this.r+" "+this.g+" "+this.b+" "+this.alpha); 
        fill(this.r, this.g, this.b, this.alpha); 
        stroke(255,255,255,this.alpha);
        ellipse(this.x, this.y, this.diam, this.diam); 
        if (this.diam>20){
            fill(0,0,0,this.alpha);
            ellipse(this.x, this.y, this.dia2, this.dia2);
        }
        this.diam+=2; 
        this.dia2+=1.25
        this.alpha-=2.5;
    }
    this.pastDia = function() {
        if (this.alpha < 0) {
            return true;
        }
    }
}

//  RESIZE WINDOW
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

