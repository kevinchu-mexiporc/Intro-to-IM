const int analogInput = A2;
const int digitalInput = 2;
const int buzzer = 6;
const int led1 = 9;
const int led2 = 10;
const int led3 = 11;
int count = 0;
int mode = 0;
void setup() {
  pinMode(analogInput,INPUT);
  pinMode(digitalInput,INPUT);
  pinMode(buzzer,OUTPUT);
  pinMode(led1,OUTPUT);
  pinMode(led2,OUTPUT);
  pinMode(led3,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int button = digitalRead(digitalInput);
  int turn = analogRead(analogInput);
  if(button == HIGH){count++;}
  if(count % 99 == 0){mode++;}
  if(mode %3 == 0){
    analogWrite(led1,turn/4);
    digitalWrite(led2,LOW);
    digitalWrite(led3,LOW);
    tone(buzzer,200);
    delay(500/(turn+1));
    noTone(buzzer);
  }
  else if(mode %3 == 1){
    analogWrite(led2,turn/4);
    digitalWrite(led1,LOW);
    digitalWrite(led3,LOW);
    tone(buzzer,600);
    delay(500/(turn+1));
    noTone(buzzer);
  }
  else{
    analogWrite(led3,turn/4);
    digitalWrite(led1,LOW);
    digitalWrite(led2,LOW);
    tone(buzzer,1000);
    delay(500/(turn+1));
    noTone(buzzer);
  }
}
