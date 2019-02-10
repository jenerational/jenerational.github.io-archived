//function modes
var audMode = 1;    // mic, workwork
//sensitivities
var ampSense = 2;  
//general mode values 
var level;          //  amplitude val
//visMode values
var boxes = []; 
var boxesNum = 7; 
//audMode 1 values
var micOn = false; 
//audMode 2 values
var curSong, workwork; 
var playing = false; 


function preload() {
    //  music preload
    workwork = loadSound('assets/WorkWork.mp3');
 
}

function setup() {
    //  create canvas
    cnv=createCanvas(windowWidth, windowHeight, WEBGL);
    //  allow for drag and drop onto canvas
    cnv.drop(gotFile); 
    //  MIC SET UP
    mic = new p5.AudioIn()
    //  VIS 3D SET UP
    //  AMP AND FREQ SET UP
    amplitude = new p5.Amplitude();
    for (var i = 0; i < boxesNum; i++) {
        rand = random(10, 80);
        rand1 = random(-250, 300);
        rand2 = random(-250, 300);
        boxes.push(new Box(rand, rand1, rand2)); 
        rotateX(frameCount * 2);
        rotateY(frameCount * 2);
    }    
}

function draw() {
    //  AUD MODE IF STATEMENTS
    if (audMode == 0) {
        level = mic.getLevel(.75);
    } else if (audMode == 1) {
        level = amplitude.getLevel();
    } 
    //  VIS MODE DRAW
    background(200); 
    //  PLAY PAUSE BUTTON
    push();
    translate(-width/2, -height/2); 
    if (audMode == 1) {
        if (playing == false) {
            triangle(15, 15, 35, 30, 15, 45);
        }
        else {
            rect(15, 15, 10,30);
            rect(30, 15, 10,30);
        }   
    }
    pop(); 
    //  SPHERE setup
    push();
    push(); 
    translate(400, 100); 
    sphere(250 * level + 20);
    pop(); 
    push(); 
    translate(-400, 100); 
    sphere(250 * level + 20);
    pop(); 
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    sphere(250 * level + 20);
    //  BOXES SETUP
    translate(level * 500 + 40,level * 500 + 40); 
    for (var i = 0; i < boxesNum; i++) {
        boxes[i].display(); 
    } 
    pop(); 
}

//  =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
//  =|=|= MOUSE / KEY PRESSED =|=|=
//  =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=
function keyPressed() {
    console.log(key);
    if (key == '1' && micOn == false) {
        if (curSong) {curSong.stop();}
        mic.start();
        micOn = true;
        audMode = 0;
        console.log("mic True"); 
        amplitude.setInput(mic);
        amplitude.smooth(0.6);
        playing = false;  
    } else if (key == 2) {
        mic.stop(); 
        micOn = false
        audMode = 1;
        console.log("mic False"); 
        curSong = workwork;
        amplitude.setInput(curSong); 
        amplitude.smooth(0.6);
        curSong.play(); 
        playing = true; 
    } 
}
function mousePressed() {
    console.log("mouse pressed at " + mouseX + " and " + mouseY)
    //  PLAY PAUSE
    if (mouseY<= 60 && mouseX <= 60) {
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
}

//  =|=|=|=|=|=|=|=|=|=
//  =|=|= CLASSES =|=|=
//  =|=|=|=|=|=|=|=|=|=

//  BOX CLASS
function Box(rand, rand1, rand2) {
    this.dim = rand; 
    this.t1 = rand1;
    this.t2 = rand2; 
    this.display = function() {
        push(); 
        rotateX(frameCount * 0.005 + level * ampSense);
        rotateY(frameCount * 0.007); // + level * 5);
        box(this.dim, this.dim, this.dim); 
        pop(); 
        translate(this.t1, this.t2); 

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
    amplitude.setInput(curSong); 
}

//  STOP PLAYING CALLBACK
function fPlay(curSong) {
    playing == false; 
}

//  RESIZE WINDOW
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

