# Project name: Social Distancing
## Creator: Kevin Chu

## Process: 
I had a lot of ideas crossed my mind when I was brainstorming about the final project. Most of them were game-based with a winning or losing condition. I thoght of basing on a game called eletric shock, a game similar to my midterm project, or a game kind of like battle ship. However, I really want to think outside the box and create a system that interacts with human instead of gamers. In the end, I came up with this idea, "Social Distancing," a phrase that has been brought pu a lot in the past few years.

## Description:
(2022/04/17) 
The Social Distancing system will basically be a device that keeps avoiding people from touching it, which will be controlled by the Arduino platform. Meanwhile, the P5js interface will showcase where are the people approaching from. The iterface will bright up at four edges in different colors and frequencies to represent the distance in between the device and the approaching person. When the signal at the edges is lighting up in red and higher frequency, it means the distance between the person and the item is too close. On the other hand, when the light is in green and lower frequency, it means it is in the acceptable range. Back to the device itself, it will be a pole that can lean into four different directions that will be controlled by a combination of two servo motors. One of the servo motors will controll the pole to move in frontward and backward direction. while another servo motor will controll the pole to move in leftward and rightward directions. To detect the distance between the approaching person and the pole, I will have four ultrasonic sensors attached to the pole in four different directions. In this way, the system can have the data of which direction is the person approaching. I also want to make the system more engaging, so I am still thinking what else can the device give as feebacks to the user. I will probably add the speaker to it(?

(2022/04/21)
I will add leds(maybe neon)to visualize the distance by different colors. For the speaker part, I will take the advice from professor to play the sound from the p5js edge, I think i will not add a speaker to the device.

## P5js elements:
  - Four classes of light on different edges
    - Methods to controll shining frequency and color
  - A class to receive data from the Arduino
  - A function for sound display

## Arduino elements:
  - Analog input of ultrasonic sensors
  - Analog output to controll two servo motors
  - Analog output to controll the speaker(X
  - Digital output of leds
  - A pole
  - Four ultrasonic sensors -> Four IR distance sensors (2022/05/05)
  - Two servo motors(continuous rotation)
  - Bread board and circuts
  - A speaker(X
  - Some leds

## P5js Progress:
(2022/04/26)
I did the basic data spliting and reading from the Arduino end, and I decided to use pixels to create the lights on edges in different colors according to the distance between the user and the device.

(2022/05/10)
I now can get the serial input from the arduino properly, and I decided to change the color display into the area of four colored bars on four edges of the window. In this way, there will be more interaction between the user and the device. However, I am struggling with the mapping just like the problems I faced when building up the Arduino system. I am thinking of changing the inputs from the Arduino through an equation to map them more precisely, or maybe I will pick up the same startegy as what I did to my Arduino, which is to alter the variables that control the area boundaries a bit at a time.

## Arduino Progress:
(2022/04/26)
I set up the basic input and output pinmode according the functions I need supported by different pin on the Arduino Uno board. I have not started the hardware setup yet.

(2022/04/26)
The hardware design is more of a problem to me, and I need to spend extra time to get used to what can I do in the IM lab to achive the design in my head. I will try to visualize my design by drawing it down and reach out to Jack for help. Also, I am still trying to figur out what kind of design should I adapt for the P5js display window by using pixels. The pixels are not really displaying in the way I expect them to. So, I will need to spend extra time to think of how to make them work properly.

(2022/05/10)
This is the update for yesterday. I worked on the hardwares for an amount of time to connect two servo motors together, to connect the IR distance sensors to the device, and to connect all the wires and circuits. I was trying to debugging the servo motors I was using and found out they were actually continuous rotation motors, which I could not assign specific angle or turning speed to them. To fix the problem, I ended up using the micro servos from the kit, which are able to write to specific positions. Also, the mapping of distance reading to the angle of the servo motors ended up to be too sensitive, which is not what I imagined in my head. So, to make the servo motors to turn in a more calming way, I made the positions of the motors to change in a small amount whenever the detected distance is too close. Another problem I am facing now is that two out of four sensors are not giving very stable feedbacks, which I guess might due to the fact that I am powering the system with my Arduino, which I will try to fix with supplying the power from the external source.

(2022/05/10)
Since the sensors and motors I borrowed from the IM lab are all different from what we have in our kit, I had to make sure how they work properly. 
For the Sharp IR distance sensors model GP2Y0A02YK0F, I found several zip library online and decided to pick up the SharpIR files provided by guillaume-rico on the gitHub. 
Following is the link: https://github.com/guillaume-rico/SharpIR
This basically fix all my problems of interpreting the analog input I get from the sensors into the distacnce unit of cenimeters. The other problem regarding the sensors is that two out of four sesors always return very unstable values, and I guessed they might be affected the noises when connecting Arduino as a controller and a power source at the same time. So, I borrowed a 5v power plug from the IM lab, and power the device directly from the external source. After doing this, the values returned by all four sensors are a lot more stable. To make the returned values even more stable, I added a capacitor to the circuit, implied a smoothing method to my Arduino code to smooth the values collected by the sensors by taking the averages of ten values, and added a delay(1) to stable the readings while not stopping the code for too long.


