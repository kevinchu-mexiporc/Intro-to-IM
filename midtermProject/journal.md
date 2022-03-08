# Midterm Project Journal - Chicken Attack
## Initial Concept:
Since violent games are banned, I want to construct a weirdly satisfying and humurous game instead. The idea in my head is originned from a game I played with my friends when I was little which is called **"eagle catches chicks."** I rename the game with a funny song called **"Chicken Attack."**

I am not sure if there is such game in other regions, but the game is about a person plays as a ham protecting other players playing as her chicks lining up behind her from the opponent player in the role of eagle. To avoid the potential violence of the game and to make the game even cuter, I decided to let the player proect eggs from the raindrops. There will be one ham in the frame walking and laying egges randomly, and the mission for the player wll be controlling a brick above them to protect the eggs from the keep randomly generating raindrops.

The game comes to the end when the player failed to protect 5 eggs from the raindrops, and the player is considered as failing to protect an egg when there are three raindrops falling on it before the chick break the eggshell. I now set the time for a chick to break the eggshell in 10 seconds, but will adjust that if it does not work well. The game will keep the score in terms of how many eggs have cracked successfully and the life of the player in terms of 5 chances to fail to protect the eggs. Also, to increase the hardness of the game, I will let the ham lays the eggs faster as the player survives for longer.

## Elements in the Game:
- A class for raindrops
- A class for the eggs
- A clsss for the ham
- A class for the brick
- Image for eggs
- Image for chicks
- Imake for the ham
- Screen text for life and score recording purpose
- Background sound of raindrops
- Sound when a raindrop touches an egg

## Potential Problems:
The potential challenges I can think of now is mostly the construstion of a randomly moving objects all together and the image transformation from an egg to a chick when the eggs are cracked. Also, how the chicks are going to fade or disappear on the screen when they are born is another concern. The more technical problems will be the formation of the eggs when the ham lays them randomly.

## Solutions to Potential Problems:
I will first do the first version of the code to see if these are really problems.

### UPDATED problems:
The potential problems turn out to be just fine. However, there were other problems happening when I worked on the project.
- Program ended at unexpected error of undifined attributes in the rain array objects.
- Program ended at unexpected error of undifined attributes in the egg array objects.
- The problem of not able to increase the amount of the rain and the speed of it.

### UPDATED Solutions:
I walked through the loop to display the arrays that contain different types of classes. 

#### Eg. Rain array loop
````
 for (let i = 0; i < Rain.length; i++) {
    Rain[i].display();
    if (Rain[i].y > 600 || Rain[i].block(brick.x, brick.y) == true) {
      Rain.splice(i, 1);
    }
  }
````

#### Eg. Egg array loop
````
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
````
I found that the problems were all happening after the ````spliced()```` function was called. After it was called, any other actions that required the index within the object that was just deleted would trigger the "attribute not defined
" error and the code crashed.

After recognizing the problem, I rearranged the order of the code to make it more logical and check everthing that include the index before deleting the object within the arrays.

### UPDATE:
I have not added the background and the sound to the game. I am thinking about using the song "Chicken Attack" as background music and some rooster sound when a chick is hatched. Also, I want to have a weird sound when the rains drop on eggs.

### UPDATE:
I added the song "Chicken Attack" as background music, the explode sound when a raindrop collide with an egg, and a rooster sound when an egg hatches.

## Behind The Scene:
