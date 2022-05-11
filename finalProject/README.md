# Intro to IM final project: Social Distancing

## Link to P5js Sketch:
- Fullscreen: (https://editor.p5js.org/kevinchu-mexiporc/full/8s2mdY_YX)
- Edit: (https://editor.p5js.org/kevinchu-mexiporc/sketches/8s2mdY_YX)

## Description:
The social distancing is a device that will go to the opposite direction as the user's approaching direction. There are two parts to build up this device, one is the Arduino end, and another is the P5.js end. On the Arduino end, there will be four sensors detecting user from four different directions and two servo motors to control a pole to go to the opposite directions of the user. Meanwhile, the P5.js interface will have four pinkish violet bars on four edges of the canva. These bars will grow into larger areas when the user is approaching the device from the corresponding direction on the Auduino end.

## Overview:

### Arduino:
In this project, two micro servo motors and four Sharp IR distance sensors are involved. I used black and red wires to represent the ground and power source respectively, yellow wires as the analog inputs, and white as pmw outputs. To decrease the noise produced by the Arduino board, I add a capacitor to the circuit, use 5v external ppower source instead of the Vcc output from the Arduino, and include smoothing process in my code, which is to take the average of every 100 inputs. 

### P5.js:
For the P5.js end, I decide to use pixel as my display method to create the glitch effect. The four bars growing from four edges are displayed by a single function, and the areas of them are decided by the always updating position variables that are controlled by the serial input from the Arduino end. 

## User Testing:
- User test 1: (https://youtu.be/NgyO99n5pWI)
- User test 2: (https://youtu.be/W-FqSBCVuVM)
- User test 3: (https://youtu.be/fM7WPYMcwfE)
- User test 4: (https://youtu.be/_jcF8elSU9E)

## Problems, Solutions, and Discoveries:
During the process, I bumped into several problems. On the Arduino end, I had problems of motors, noises amoung sensors, and smoothing the dataset. On the P5.js end, I encounter problems of how to display the pixels in the specific way I want. For the motors, I accidentally used the continuous rotation motors in the beginning without noticing, and the solution is just to change them into micro servo motors that came with the kit. After that I found two of my sensors are not generating stable data, and professor suggested me to add a capacitor to the circuit and use a 5V external power source instead. Lastly, to smooth. the dataset better, I collect 100 data and take their average as the data I am using, so the outstanding data will be smoothed. On the P5.js end, I spent a while to figure out why the pixels are not displaying the way I want. When I am trying to fill the pixel from the row 360 to the row 400 by assigning the mapped variable to the pixel array, the system will not fill up the later pixels after the variable. So, I realized I sould fill the pixels from the edge backward to the variable I mapped.

## Schematic:

## Reference:
- Jack's code for catching Arduino's serial output on P5.js
- Tutorial of Sharp IR distance sensor on Maker guides: (https://www.makerguides.com/sharp-gp2y0a21yk0f-ir-distance-sensor-arduino-tutorial/)
