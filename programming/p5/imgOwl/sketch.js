var myImage;
var x = 0;
var y = 0;

function preload() {
	myImage = loadImage("assets/owl.jpg")
}

function setup() {
	//
	createCanvas(window, 600);

	//image(myImage,0,0);
	//background(255);

	noStroke();

	//for (var i =0; i <= myImage.width; i+=20) {
}

function draw() {
	// get returns the color value of a single pixel
	var myColor = myImage.get(mouseX,mouseY);
	fill(myColor);
	ellipse(mouseX-5, mouseY-5, 25, 25);
}

/*function mousePressed() {
	rectCol();
}*/

/*function rectCol() {
	while (y < height) {
		var myColor = myImage.get(x,y);
		console.log(myColor);
		console.log(x);
		console.log(y);

		fill(myColor);
		rect(width/2, height/2, 50, 50); 

		if (x < width) {
			x +=1; 
		}
		else {
			x = 0;
			y+=1; 
		}
	}
}*/
