// Global variables:
int lastButtonState = LOW;            // state of the button last time you checked
boolean mouseIsActive = false;    // whether or not the Arduino is controlling the mouse
 int lastButton2State = LOW;  
void setup() {
  // initialize serial communication:
  Serial.begin(9600);
pinMode(2, INPUT_PULLUP);
}
 
void loop() {
  // read the analog sensors:
  int sensor1 = analogRead(A0);
  delay(100);
  int sensor2 = analogRead(A1);
 
//  int xAxis = map(sensor1, 1, 1023,-5 , 5);
//  int yAxis = map(sensor2, 1, 1023, -5, 5);
// 
// // print their values. Remove this when you have things working:
  Serial.print(sensor1);
  Serial.print(" , ");
  Serial.print(sensor2);
    Serial.print(" , ");
  // read the first pushbutton:
  int buttonState = digitalRead(2);
  Serial.println(buttonState);
 
  // if it's changed and it's high, toggle the mouse state:
  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      // if mouseIsActive is true, make it false;
      // if it's false, make it true:
      mouseIsActive = !mouseIsActive;
      //Serial.print("Mouse control state: ");
     // Serial.println(mouseIsActive);
    }
  }
  // save button state for next comparison:
  lastButtonState = buttonState;
// 
//  // read the analog sensors:
//  int sensor1 = analogRead(A0);
//  delay(1);
//  int sensor2 = analogRead(A1);
//  // print their values. Remove this when you have things working:
//  Serial.print(sensor1);
//  Serial.print("  ");
//  Serial.println(sensor2);
//}



if (mouseIsActive == true) {
    // read the second pushbutton:
    int button2State = digitalRead(2);
 
    // if it's changed and it's high, toggle the mouse state:
    if (button2State != lastButton2State) {
      if (button2State == LOW) {
        //Serial.println("mouse pressed");
      }
      else {
        //Serial.println("mouse released");
      }
    }
    // save second button state for next comparison:
    lastButton2State = button2State;
  }
//
//      Serial.print("\r");
//    Serial.print("\n");
}

