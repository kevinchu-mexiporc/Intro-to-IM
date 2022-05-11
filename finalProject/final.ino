#include <Servo.h> // include the servo header
#include <SharpIR.h> // include the header for sharp IR distance sensors
#define model 1080 // define the model for sharp IR distance sensors according to the header files
const int numReadings = 100; // the number of taking how many readings to get the average to smooth

int readingsFront[numReadings];      // the readings from the analog input
int readingsRight[numReadings];
int readingsBack[numReadings];
int readingsLeft[numReadings];
int readIndex = 0;              // the index of the current reading
int totalFront = 0;                  // the running total
int totalRight = 0;
int totalBack = 0;
int totalLeft = 0;
int averageFront = 0;                // the average
int averageRight = 0;
int averageBack = 0;
int averageLeft = 0;

SharpIR Front = SharpIR(A0, model); // create four objects for each sensors
SharpIR Right = SharpIR(A1, model);
SharpIR Back = SharpIR(A2, model);
SharpIR Left = SharpIR(A3, model);

int sensorFront; // create four intergers for the data collected from four direction
int sensorRight;
int sensorBack;
int sensorLeft;

int servo1Factor; // create two factors that affect how two servo motors move
int servo2Factor;

int servo1Pos = 90; // create two intergers for the servo motors' positions and set them to the middle
int servo2Pos = 90;
     
Servo servo1;  // create servo object to control a servo
Servo servo2;  // create servo object to control a servo

void setup() {
   servo1.attach(9); // attatch two servos to two pmw pins and set them to 90 degrees
   servo2.attach(11);
   servo1.write(servo1Pos);
   servo2.write(servo2Pos);
   
   pinMode(A0,INPUT); // set four analog input pins for the sensors
   pinMode(A1,INPUT);
   pinMode(A2,INPUT);
   pinMode(A3,INPUT);

   for (int thisReading = 0; thisReading < numReadings; thisReading++) { // setup all the data in the array to 0
    readingsFront[thisReading] = 0;
    readingsRight[thisReading] = 0;
    readingsBack[thisReading] = 0;
    readingsLeft[thisReading] = 0;
   }
   Serial.begin(9600); // serial begins
 }

void loop() {
  sensorFront = Front.distance(); // assign four readings to the variables according to their directions
  sensorRight = Right.distance();
  sensorBack = Back.distance();
  sensorLeft = Left.distance();

  if(sensorFront > 150){ // the data that are outside 20-150 range will be rounded into this range to keep the dataset smooth
    sensorFront = 150;
  }
  if(sensorRight > 150){
    sensorRight = 150;
  }
  if(sensorBack > 150){
    sensorBack = 150;
  }
  if(sensorLeft > 150){
    sensorLeft = 150;
  }
  if(sensorFront < 20){
    sensorFront = 20;
  }
  if(sensorRight < 20){
    sensorRight = 20;
  }
  if(sensorBack < 20){
    sensorBack = 20;
  }
  if(sensorLeft < 20){
    sensorLeft = 20;
  }
  
  // subtract the last reading:
  totalFront = totalFront - readingsFront[readIndex];
  totalRight = totalRight - readingsRight[readIndex];
  totalBack = totalBack - readingsBack[readIndex];
  totalLeft = totalLeft - readingsLeft[readIndex];
  // read from the sensor:
  readingsFront[readIndex] = sensorFront;
  readingsRight[readIndex] = sensorRight;
  readingsBack[readIndex] = sensorBack;
  readingsLeft[readIndex] = sensorLeft;
  // add the reading to the total:
  totalFront = totalFront + readingsFront[readIndex];
  totalRight = totalRight + readingsRight[readIndex];
  totalBack = totalBack + readingsBack[readIndex];
  totalLeft = totalLeft + readingsLeft[readIndex];
  // advance to the next position in the array:
  readIndex++;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
  }

  // calculate the average:
  averageFront = totalFront / numReadings;
  averageRight = totalRight / numReadings;
  averageBack = totalBack / numReadings;
  averageLeft = totalLeft / numReadings;
  // send it to the computer as ASCII digits
  
  servo1Factor = averageFront - averageBack; // define the servo factor as the difference of two opposite directions
  servo2Factor = averageRight - averageLeft;
  
  if(servo1Factor > 50 && servo1Pos > 20){ // turn the servos if the differences are big enough and the servos are not at there max degrees 
    servo1Pos--;                            // also, readjust the servos to the center when the differences are not big enough
  }
  else if(servo1Factor < -50 && servo1Pos < 160){
    servo1Pos++;
  }
  else if(servo1Factor > -50 && servo1Factor < 50 && servo1Pos > 90){
    servo1Pos--;
  }
  else if(servo1Factor > -50 && servo1Factor < 50 && servo1Pos < 90){
    servo1Pos++;
  }
  if(servo2Factor > 50 && servo2Pos < 160){
    servo2Pos++;
  }
  else if(servo2Factor < -50 && servo2Pos > 20){
    servo2Pos--;
  }
  else if(servo2Factor > -50 && servo2Factor < 50 && servo2Pos > 90){
    servo2Pos--;
  }
  else if(servo2Factor > -50 && servo2Factor < 50 && servo2Pos < 90){
    servo2Pos++;
  }
  servo1.write(servo1Pos); // write the servos to the assigned positions
  servo2.write(servo2Pos);
  
  Serial.print(averageFront);Serial.print(","); // send the serial in the same line splited by comas and skip to the next line
  Serial.print(averageRight);Serial.print(",");
  Serial.print(averageBack);Serial.print(",");
  Serial.print(averageLeft);Serial.println();
  delay(1);        // delay in between reads for stability
 }
