//  Jennifer Walker Feb 22 2018

//  led pin vars
int LEDPin = 9; 
int button = 2; 
//  recording state
bool recording = false; 
int num0s = 0; 
void setup() {
  // set up pin modes
  pinMode(LEDPin, OUTPUT); 
  pinMode(button, INPUT);
  //  set up serial
  Serial.begin(9600); 
}

void loop() {
  // button resistance val
  int buttonVal = digitalRead(button);
  Serial.println(buttonVal);   //used for debugging
  //  if button is pressed and not recording
  if (buttonVal == 1 && recording == false) {
    record(); 
  }
  //  if button is not pressed and is recording
  else if (buttonVal == 0 && recording == true) {
    //  make sure its not a mistake or slip of the finger for 800 loops 
    num0s++; 
    //  if 800 loops and still 0, stop recording 
    if (num0s >= 800) {
      num0s = 0;
      noRecord();
    }  
  }
}

void record() {
  //  turn on LED, signal beginning of recording, change recording var
  digitalWrite(LEDPin, HIGH);
  recording = true; 
  Serial.println("recording"); 
}

void noRecord() {
  //  turn off LED, signal end of recording, change recording var 
  digitalWrite(LEDPin, LOW);
  recording = false; 
  Serial.println("stopped recording"); 
}

