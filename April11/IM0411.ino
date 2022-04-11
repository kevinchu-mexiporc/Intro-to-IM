/*
  Melody

  Plays a melody

  circuit:
  - 8 ohm speaker on digital pin 8

  created 21 Jan 2010
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/toneMelody
*/

#include "pitches.h"
const int buzz = 9;
// notes in the melody:
int melody1[] = {
  NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4
};
int melody2[] = {
  NOTE_C3, NOTE_D3, NOTE_E3, NOTE_F3
};


void setup() {
  pinMode(A5,INPUT);
  pinMode(4,INPUT);
  pinMode(7,INPUT);
  pinMode(8,INPUT);
  pinMode(12,INPUT);
  pinMode(buzz,OUTPUT);
}

void loop() {
  int Light = analogRead(A5);
  int One = digitalRead(4);
  int Two = digitalRead(7);
  int Three = digitalRead(8);
  int Four = digitalRead(12);
  if(Light <= 50){
    if(One == HIGH){
    tone(buzz,melody2[0]);
    }
    if(Two == HIGH){
      tone(buzz,melody2[1]);
    }
    if(Three == HIGH){
      tone(buzz,melody2[2]);
    }
    if(Four == HIGH){
      tone(buzz,melody2[3]);
    }
    if(One != HIGH && Two != HIGH && Three != HIGH && Four != HIGH){
      noTone(buzz);
    }
  }
  else{
    if(One == HIGH){
    tone(buzz,melody1[0]);
    }
    if(Two == HIGH){
      tone(buzz,melody1[1]);
    }
    if(Three == HIGH){
      tone(buzz,melody1[2]);
    }
    if(Four == HIGH){
      tone(buzz,melody1[3]);
    }
    if(One != HIGH && Two != HIGH && Three != HIGH && Four != HIGH){
      noTone(buzz);
    }
  }
  
}
