void setup() {
  Serial.begin(9600);
  pinMode(5, OUTPUT);
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
        analogWrite(5, 0);
        break;
      case 1:
        analogWrite(5, 50);
        break;
      case 2:
        analogWrite(5, 100);
        break;

      case 3:
        analogWrite(5, 150);
        break;
      case 4:
        analogWrite(5, 200);
        break;
      case 5:
        analogWrite(5, 250);
        break;
    }
  }
}
