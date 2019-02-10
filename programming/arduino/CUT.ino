//  Jennifer Walker Feb 22 2018

// led pin vars
int LEDRed=9; 
int LEDYel=10; 
int LEDGre=11; 

void setup() {
  //  setting pins as output
  pinMode(LEDRed, OUTPUT);  
  pinMode(LEDYel, OUTPUT); 
  pinMode(LEDGre, OUTPUT);
  //  serial begin
  Serial.begin(9600);
}

void loop() {
  /*//  simple blink testing
  digitalWrite(LEDRed, HIGH);
  digitalWrite(LEDYel, LOW);
  digitalWrite(LEDGre, HIGH);
  delay(1000); 
  digitalWrite(LEDRed, LOW);
  digitalWrite(LEDYel, HIGH);
  digitalWrite(LEDGre, LOW);
  delay(1000);*/ 
  int buttonVal = analogRead(A4);
  int lightVal = analogRead(A5);
  Serial.println(lightVal); 
  if (buttonVal == 0) {
    if (lightVal < 450) { //  low light, blink red
      digitalWrite(LEDYel, LOW);  //  turn off yellow and green LED
      digitalWrite(LEDGre, LOW); 
      digitalWrite(LEDRed, HIGH);  // blink on
      delay(500);
      digitalWrite(LEDRed, LOW);  //  blink off
      delay(500); 
    } else if (lightVal < 650) {  //  med light, blink yellow red on
      digitalWrite(LEDGre, LOW);  //  turn off green light 
      digitalWrite(LEDRed, HIGH); 
      digitalWrite(LEDYel, HIGH);  // blink on
      delay(500);
      digitalWrite(LEDYel, LOW);  //  blink off
      delay(500);
    } else if (lightVal < 950) {  //  high light, blink green, red yellow on
      digitalWrite(LEDRed, HIGH); 
      digitalWrite(LEDYel, HIGH); 
      digitalWrite(LEDGre, HIGH);  // blink on
      delay(500);
      digitalWrite(LEDGre, LOW);  //  blink off
      delay(500);
    } else {  //  high high light, red yel green on
      stable(HIGH, HIGH, HIGH); 
    }
  } else {
     // all LEDs off
     stable(LOW, LOW, LOW); 
  }
}

int stable(int L1, int L2, int L3) { //  for when all three LEDs are a Stable High or Low
    digitalWrite(LEDRed, L1); 
    digitalWrite(LEDYel, L2); 
    digitalWrite(LEDGre, L3);
}

