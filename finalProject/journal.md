# Project name: Social Distancing
## Creator: Kevin Chu

## Process: 
I had a lot of ideas crossed my mind when I was brainstorming about the final project. Most of them were game-based with a winning or losing condition. I thoght of basing on a game called eletric shock, a game similar to my midterm project, or a game kind of like battle ship. However, I really want to think outside the box and create a system that interacts with human instead of gamers. In the end, I came up with this idea, "Social Distancing," a phrase that has been brought pu a lot in the past few years.

## Description:
### (v1):
(2022/04/17) The Social Distancing system will basically be a device that keeps avoiding people from touching it, which will be controlled by the Arduino platform. Meanwhile, the P5js interface will showcase where are the people approaching from. The iterface will bright up at four edges in different colors and frequencies to represent the distance in between the device and the approaching person. When the signal at the edges is lighting up in red and higher frequency, it means the distance between the person and the item is too close. On the other hand, when the light is in green and lower frequency, it means it is in the acceptable range. Back to the device itself, it will be a pole that can lean into four different directions that will be controlled by a combination of two servo motors. One of the servo motors will controll the pole to move in frontward and backward direction. while another servo motor will controll the pole to move in leftward and rightward directions. To detect the distance between the approaching person and the pole, I will have four ultrasonic sensors attached to the pole in four different directions. In this way, the system can have the data of which direction is the person approaching. I also want to make the system more engaging, so I am still thinking what else can the device give as feebacks to the user. I will probably add the speaker to it(?

## P5js elements:
  - Four classes of light on different edges
    - Methods to controll shining frequency and color
  - A class to receive data from the Arduino

## Arduino elements:
  - Analog input of ultrasonic sensors
  - Analog output to controll two servo motors
  - Analog output to controll the speaker(?
  - Digital output of leds(?
  - A pole
  - Four ultrasonic sensors
  - Two servo motors
  - Bread board and circuts
  - A speaker(?
  - Some leds(?
## Problems & corresponding solutions:
