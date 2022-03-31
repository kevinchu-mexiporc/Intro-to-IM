# A switch that does not require the use of hands

## Description:
This switch is very starght forward. It turns on th led when the environment is dark and turn off the led when the environment is bright. 

## Process:
The first idea I had is to create a switch that will turn on the led when my eyes open, which represents the moment I wake up. and I later thought of this is actually just the same as controlling the led with light. I saw there is a photoresistor in the arduino package we picked up, so I include it into my circuit to sense the brightness of the environment. To decide what is a "dark" environment, I used the serial monitor to detect the data when the light is off and assign that turn on the led if the parameter is below a certain number. I can also change the operator into greater than that certain number to turn on the led when it is bright.

## Video:

https://user-images.githubusercontent.com/98512579/160830843-cdf407e6-8360-4ec0-a496-f11cff0df0f5.MOV


![IMG_8428](https://user-images.githubusercontent.com/98512579/160988000-1310595e-45c8-40c3-ad73-8a19e95d1ed3.jpg)
![IMG_8429](https://user-images.githubusercontent.com/98512579/160988011-30b3ae85-0cad-4c8f-a265-8f849a96e165.jpg)

## Problem:
I haven't done the traing at the IM lab, so I am not sure if I have the full access to it so I tried to make the switch work with what I already have with me. I will attend the training as soon as possible to get more materials in hands.
