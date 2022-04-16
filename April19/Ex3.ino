void setup() {
   Serial.begin(9600);
   pinMode(5, OUTPUT);
   pinMode(A0,INPUT);
   while (Serial.available() <= 0) {
     delay(300);              // wait 1/3 second
   }
 }

void loop() {
   while (Serial.available() > 0) {
     // read the incoming byte:
     int inByte = Serial.read();
     switch (inByte) {
       case 0:
         digitalWrite(5, LOW);
         break;
       case 1:
         digitalWrite(5, HIGH);
         break;
     }
     int sensorValue = analogRead(A0);
     Serial.print(sensorValue);
     Serial.println();

   }
 }
