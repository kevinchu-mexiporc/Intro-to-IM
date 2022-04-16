void setup() {
  Serial.begin(9600);
}

void loop() {
    int inByte = Serial.read();
    int sensorValue = analogRead(A0);
    Serial.print(sensorValue);
    Serial.print(",");
    Serial.println();
}
