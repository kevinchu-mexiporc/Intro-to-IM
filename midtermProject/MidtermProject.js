//////////A function to preload the images and sounds I used in the game/////////
function preload() {
  rain = loadImage("Rain.png");
  egg = loadImage("Egg.png");
  ham = loadImage("Ham.png");
  chick = loadImage("Chick.png");
  Forest = loadImage("background.png");
  ChickenAttack = loadSound("ChickenAttack.mp3");
  boom = loadSound("boom.mp3");
  rooster = loadSound("rooster.wav");
}
/////////I set several global variables and arrays//////////
let offset = 0.0; //This is the offset for random motion of the ham
let life = []; // This is the array to hold player's life display
let Rain = []; //This is the array to hold RainDrops objects
let Egg = []; //This is the array to hold Eggs objects
let Chick = []; //This is the array to hold Chicks objects
let TIME = 0; //This is a timer to keep the time of the game
//TIME will later to help leveling up the game as time passes
let Level = 15; //This is the variable controlling the amount of the rain
let game_state = 0; //This is how I check game start and game over
//////////Class Player to keep score and life//////////
class Player {
  constructor() {
    this.score = 0; //score attribute of the player
    this.life = 5; //life attribute of the player
  }
  //the function to deduct life from a player
  lose_life() {
    this.life--;
  }
  //the function to add score to a player
  get_point() {
    this.score++;
  }
  //the function to display information to a player in three cases
  display() {
    //The first if statement display the instruction when the game begin//
    if (game_state == 0 && TIME == 1) {
      noLoop();
      noStroke();
      fill(255);
      rect(10, 245, 340, 100);
      fill(0);
      textSize(18);
      text("CHICKEN ATTACK", width / 3.25, height / 2);
      text(
        "Protect the eggs before they hatch!!! ",
        width / 12,
        height / 2 + 20
      );
      text("Click to start", width / 2.75, height / 2 + 40);
    }
    //The second if statement display the score and life information while the game is on//
    else if (game_state == 1) {
      noStroke();
      fill(255);
      rect(210, 0, 150, 50);
      fill(0);
      textSize(23);
      text("Score:", 220, 20);
      text(str(this.score), 300, 20);
      text("Life:", 220, 43);
      for (let i = 0; i < this.life; i++) {
        image(egg, 275 + i * 15, 38, 9, 15);
      }
    }
    //The third if statement display the game over message when the player's life is 0//
    else if (game_state == 0 && TIME != 1) {
      textSize(28);
      text("GAME OVER", 100, 200);
      textSize(15);
      text("Click to restart", width / 2.85, height / 2 + 40);
    }
  }
}
//////////Class Block that controlled by the player/////////
class Block {
  constructor() {
    this.x = 155;
    this.y = 400;
  }
  display() {
    fill(255);
    rect(this.x, this.y, 50, 10, 5);
  }
}
//////////Class RainDrops that keep falling//////////
class RainDrops {
  constructor() {
    this.x = random(360);
    this.y = 0;
    this.speed = 2 + floor(TIME / 4000);
  }
  display() {
    image(rain, this.x, this.y, 7, 13);
    this.y += this.speed;
  }
  //This is the function to detect if the rain object collide with any egg//
  clash(px, py) {
    if (this.x - 10 <= px && px <= this.x + 10 && py == this.y) {
      return true;
    } else {
      return false;
    }
  }
  //This is the function to detect if the rain object collide with the platform//
  block(px, py) {
    if (
      px <= this.x &&
      this.x <= px + 50 &&
      py - 7 <= this.y &&
      this.y <= py + 5
    ) {
      return true;
    } else {
      return false;
    }
  }
}
//////////Class Eggs that lay by the ham//////////
class Eggs {
  constructor(x) {
    this.x = x;
    this.y = 540;
    this.timer = 0;
    this.life = 3;
  }
  lose_life() {
    this.life--;
  }
  display() {
    image(egg, this.x, this.y, 20, 30);
  }
}
/////////Class Chicks that hatch from the eggs//////////
class Chicks {
  constructor(px, py) {
    this.x = px;
    this.y = py;
    this.timer = 0;
  }
  display() {
    image(chick, this.x, this.y, 20, 30);
  }
}
//////////Class Ham that lay the eggs//////////
class Ham {
  constructor() {
    this.x = 180;
    this.y = 520;
    this.timer = 0;
    this.speed = 1;
  }
  //This is the function that let the ham moving randomly//
  move() {
    offset = offset + 0.0125;
    this.x = noise(offset) * width;
  }
  display() {
    this.move();
    image(ham, this.x, this.y, 50, 60);
  }
  //This is the function that make the Ham to lay the eggs while it moves//
  lay() {
    this.timer++;
    if (this.timer % 280 == 0) {
      Egg.push(new Eggs(this.x));
    }
  }
}
/////////The setup fynction//////////
function setup() {
  imageMode(CENTER); //Set the image mode to center to have a better controll
  createCanvas(360, 560);
  ChickenAttack.loop(); //Background music
}
let theham = new Ham(); //Construct a Ham object
let player = new Player(); //Construct a palyer object
let brick = new Block(); //construct a block object
//////////The draw function/////////
function draw() {
  image(Forest, 180, 280, 360, 560);
  TIME++;
  if (TIME % 2000 == 0 && Level > 5) {
    Level--;
  }
  //This is the place I controll the amount of raindrops generating and displaying by the lime passes//
  if (TIME % Level == 0) {
    Rain.push(new RainDrops());
  }
  for (let i = 0; i < Rain.length; i++) {
    Rain[i].display();
    if (Rain[i].y > 600 || Rain[i].block(brick.x, brick.y) == true) {
      Rain.splice(i, 1);
    }
  }
  //This is the place that the ham lays the eggs
  theham.lay();
  //This is the place where I display the eggs//
  for (let i = 0; i < Egg.length; i++) {
    Egg[i].display();
    Egg[i].timer++; //Here is the palce to keep time of the egg for the hatching
    //This loop detects if any rain collide with any egg one by one//
    for (let j = 0; j < Rain.length; j++) {
      if (Rain[j].clash(Egg[i].x, Egg[i].y) == true) {
        boom.play();
        Egg[i].lose_life();
      }
    }
    //This if condition delete the egg that are mature enough enough//
    //and generate a chick at the same place while the player gets a point//
    if (Egg[i].timer == 1000) {
      Chick.push(new Chicks(Egg[i].x, Egg[i].y));
      rooster.play();
      Egg.splice(i, 1);
      player.get_point();
    }
    //This if condition delete the egg that is hit by the rain for three times//
    //while the player loses a life//
    else if (Egg[i].life == 0) {
      Egg.splice(i, 1);
      player.lose_life();
    }
  }
  //This loop display the chick objects and delete them after a while//
  for (let i = 0; i < Chick.length; i++) {
    Chick[i].timer++;
    Chick[i].display();
    if (Chick[i].timer == 200) {
      Chick.splice(i, 1);
    }
  }
  //This is to make the controll of the block more instinctive
  brick.x = mouseX - 25;
  brick.display();
  theham.display();
  if (player.life == 0) {
    game_state = 0;
  }
  //Switch the game state into 0 when player loses 5 eggs
  player.display();
  //I put the player display function here so it can show the game over
  //text message when the game state switches to 0
  if (game_state == 0) {
    noLoop();
    //Here is a checker to see if the game is still on
    //If not then stop the loop
  } else {
    loop();
  }
}
//////////Mouse Clicked function to start the game//////////
////The mouse click action will start the game when it is first run////
////For the game that is over, the mouse click will restart the game////
///To start the game in the beginning, I check the state of the game///
////////Set the game state in to 1 and start the draw loop////////
///////To restart the game, I check the state of the game///////
///////If the game state is 0 and the time is not in the beginning///////
///////I will reset all the attributes of the game to origin///////
function mouseClicked() {
  if (game_state == 0 && TIME == 1) {
    game_state = 1;
    loop();
  } else if (game_state == 0 && TIME != 1) {
    game_state = 1;
    player.life = 5;
    player.score = 0;
    TIME = 0;
    offset = 0.0;
    Level = 15;
    Rain = [];
    Egg = [];
    Chick = [];
    loop();
  }
}
