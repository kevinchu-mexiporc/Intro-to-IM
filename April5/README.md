# Leds with analog and digital inputs
## Description:
This is a mutifunctioning device that includes leds, a digtal input button, an analog input potentiometer, and a buzzer.
The user can push the button to change the mode of the buzzer tone, and the leds represent the different modes.
There are three modes, and when the user turn the potentiometer in each mode will change the delay between the tone and no tone.
## Process:
I was trying to give the leds a meaning. Different colors represent different things while the brightness represent different things as well.
At a point, I just try to link audio output from a buzzer with the leds. I assigned each led different buzzer frequency, and assigned the different brightness of each led different delay time.
## Problem and Solution:
When I devided a constant number by the analog read I get from the potentiometer, the whole device stopped working somehow. After several times of changing the code to see what I had done wrong, I suddenly figured out that I was deviding something by zero when the analog read from the potentiometer is 0. So, I added one to the devidors, and the problem solved!
## Video:
https://youtu.be/12eUM4rhEYg
## Schematics:
[schematics0405.pdf](https://github.com/kevinchu-mexiporc/Intro-to-IM/files/8412597/schematics0405.pdf)
