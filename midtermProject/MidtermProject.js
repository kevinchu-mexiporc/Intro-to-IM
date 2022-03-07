````
//////////A function to preload the images i used in the game/////////
function preload() {
  rain = loadImage("Rain.png");
  egg = loadImage("Egg.png");
  ham = loadImage("Ham.png");
  chick = loadImage("Chick.png");
}
/////////I set several global variables and arrays//////////
let offset = 0.0; //This is the offset for random motion of the ham
let life = [];// This is the array to hold player's life display
let Rain = [];//This is the array to hold RainDrops objects
let Egg = [];//This is the array to hold Eggs objects
let Chick = [];//This is the array to hold Chicks objects
let TIME = 0;//This is a timer to keep the time of the game
             //TIME will later to help leveling up the game as time passes
let Level = 15;//This is the variable controlling the amount of the rain
let game_state = 0;//This is how I check game start and game over
//////////Class Player to keep score and life//////////
class Player {
  constructor() {
    this.score = 0;//score attribute of the player
    this.life = 5;//life attribute of the player
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
    if(game_state == 0 && TIME == 1){
      noLoop();
      textSize(18);
      text("CHICKEN ATTACK", width / 3.25, height / 2);
      text("Protect the eggs before they hatch!!! ", width / 12, (height / 2)+20);
      text("Click to start", width / 2.75, (height / 2)+40);
    }
    else if (game_state == 1){
      textSize(15);
      text("Score:", 220, 15);
      text(str(this.score), 270, 15);
      text("Life:", 220, 30);
      for(let i = 0; i < this.life; i++){
        image(egg, 260 + i*10, 25, 7, 13);
      }
    }
    else if(game_state == 0 && TIME != 1){
      textSize(28);
      text("GAME OVER", 100, 200);
      textSize(15);
      text("Click to restart", width / 2.85, (height / 2)+40);
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
    rect(this.x, this.y, 50, 10, 5);
  }
}
//////////Class RainDrops that keep falling//////////
class RainDrops {
  constructor() {
    this.x = random(360);
    this.y = 0;
    this.speed = 2 + floor(TIME/4000);
  }
  display() {
    image(rain, this.x, this.y, 7, 13);
    this.y += this.speed;
  }
  clash(px, py) {
    if (this.x - 10 <= px && px <= this.x + 10 && py == this.y) {
      return true;
    } else {
      return false;
    }
  }
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
  move() {
    offset = offset + 0.0125;
    this.x = noise(offset) * width;
  }
  display() {
    this.move();
    image(ham, this.x, this.y, 50, 60);
  }
  lay() {
    this.timer++;
    if (this.timer % 280 == 0) {
      Egg.push(new Eggs(this.x));
    }
  }
}
/////////The setup fynction//////////
function setup() {
  imageMode(CENTER);
  createCanvas(360, 560);
}
let theham = new Ham();
let player = new Player();
let brick = new Block();
//////////The draw function/////////
function draw() {
  background(220);
  TIME++;
  if(TIME % 2000 == 0 && Level > 5){
     Level--;
  }
  if (TIME % Level == 0) {
    Rain.push(new RainDrops());
  }
  for (let i = 0; i < Rain.length; i++) {
    Rain[i].display();
    if (Rain[i].y > 600 || Rain[i].block(brick.x, brick.y) == true) {
      Rain.splice(i, 1);
    }
  }
  theham.lay();
  for (let i = 0; i < Egg.length; i++) {
    Egg[i].display();
    Egg[i].timer++;
    for (let j = 0; j < Rain.length; j++) {
      if (Rain[j].clash(Egg[i].x, Egg[i].y) == true) {
        Egg[i].lose_life();
      }
    }
    if (Egg[i].timer == 1000) {
      Chick.push(new Chicks(Egg[i].x, Egg[i].y));
      Egg.splice(i, 1);
      player.get_point();
    } else if (Egg[i].life == 0) {
      Egg.splice(i, 1);
      player.lose_life();
    }
  }
  for (let i = 0; i < Chick.length; i++) {
    Chick[i].timer++;
    Chick[i].display();
    if (Chick[i].timer == 200) {
      Chick.splice(i, 1);
    }
  }
  brick.x = mouseX - 25;
  //This is to make the controll of the block more instinctive
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
````
