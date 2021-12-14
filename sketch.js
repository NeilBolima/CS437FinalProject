let snake;
let resolution = 20;
let food;
let game = true;
let wt;
let ht;
let speed = 1;
let score = 0;
let time = 0;
let screen = "";
let loader;
let b1;
let difficulty = "easy";
let options = [];
let highscore = [0,0,0,0];
let goal = 10;
let easy,med,hard, surv;
var newScore = false;  

function setup() {
  createCanvas(400,400);
  wt = floor(width / resolution);
  ht = floor(height / resolution);
  frameRate(5);
  snake = new Snake();
  screen = "menu";
  foodLocation();
  loader = new Loading(10, 10)
  b1 = new Button(10,13, 7,2, "Start Game");
  easy = new Button(5,16, 4,1.8, "Easy");
  med = new Button(10,16, 4,1.8, "Medium");
  hard = new Button(15,16, 4,1.8, "Hard");
  surv = new Button(10,18.5, 7,1.8, "Survival");
  options.push(easy);
  options.push(med);
  options.push(hard);
  easy.set();
}

function foodLocation() {
  let x = floor(random(wt));
  let y = floor(random(ht));
  food = createVector(x, y);

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    if (screen == "menu"){
      screen = "game";
    } else if (screen == "game"){     
      speed += .2;
      frameRate(5 * speed) 
    }  
  } else if (keyCode == ENTER){
    if (screen == "end" || screen == "win"){    
      newScore = false;
      snake.reset();
      screen = "menu"
      speed = 1;
      frameRate(speed * 5)
      score = 0;
      time = 0; 
    }
  }
}

function mousePressed() {
  if (screen == "menu"){
    if (b1.isHover()){
    screen = "game"
    } else if (easy.isHover()){
      goal = 10;
      easy.set();
      med.unset();
      hard.unset();
      surv.unset();
      difficulty = "easy";
    } else if (med.isHover()){
      goal = 20;
      med.set();
      easy.unset();
      hard.unset();
      surv.unset();
      difficulty = "medium";
    } else if (hard.isHover()){
      goal = 30;
      hard.set();
      easy.unset();
      med.unset();
      surv.unset();
      difficulty = "hard";
    } else if (surv.isHover()){
      goal = 0;
      surv.set();
      easy.unset();
      med.unset();
      hard.unset();
      difficulty = "survival";
    }  
  }    
}
function draw() {
  scale(resolution);
  background(25);
  if (screen == "menu"){
    fill(240)
    textAlign(CENTER)
    noStroke();
    textSize(1.5);
    text('Welcome to SNAKE GAME', 10,8);
    textSize(1.2);
    text('Press \'SPACEBAR\' to start', 10, 5);
    loader.update();
    b1.show();
    b1.isHover();
    for(let i = 0; i < options.length; i++){
      options[i].show();
      options[i].isHover();
    }
    surv.show();
    surv.isHover();
    textSize(1);
    fill(255);
    if (difficulty == "easy"){
      text("High score: " + highscore[0].toString(), 10, 2);
    } else if (difficulty == "medium"){
      text("High score: " + highscore[1].toString(), 10, 2);
    } else if (difficulty == "hard"){
      text("High score: " + highscore[2].toString(), 10, 2);
    } else if (difficulty == "survival"){
      text("High score: " + highscore[3].toString(), 10, 2);
    }
  } else if (screen == "game"){
    if (snake.eat(food)) {
      foodLocation();
    }
    snake.update();
    snake.show();
    noStroke();
    fill(255, 0, 0);
    ellipse(food.x + .5, food.y + .5, .5, .5);
    textAlign(CENTER);
    fill(230);
    textSize(0.8)
    text('Press Arrow Keys to move', 10, 18)
    textSize(1)
    text('Press SPACE to speed up', 10, 19)
    if (difficulty != "survival"){
      text('Score: ' + score.toString() + ' / ' + goal.toString(), 5, 1)
    } else {
      text('Score: ' + score.toString(), 5, 1)
    }
    text('Time: ' + floor(time).toString(), 15, 1)
    time += 1 / (5 * speed);
    if (snake.endGame() && difficulty != "survival"){
      screen = "end"
    }
    if (score >= goal && difficulty != "survival"){
      screen = "win"
    }
    if (snake.endGame() && difficulty == "survival"){
      screen = "win";
    }
  } else if (screen == "end"){
    background(255,0,0)
    textSize(2.5)
    textAlign(CENTER);
    fill(0)
    noStroke();
    text('GAME OVER', 10,10);
    textSize(1)
    text('Press Enter to try again', 10, 17)
  } else if (screen == "win"){
    background(0,220,20)
    textSize(2)
    textAlign(CENTER);
    fill(0)
    noStroke();
    text('CONGRATULAIONS!', 10,10);
    textSize(1.1);
    if (difficulty != "survival"){
      text('Your time was: ' + floor(time).toString() + " seconds", 10, 12)      
    } else {
      text('Your score was: ' + floor(score).toString() + " points", 10, 12)      
    }
    textSize(1);
    text('Press Enter to try again', 10, 17)
    console.log("newScore: ", newScore)
    if (difficulty == "easy"){
      if (time < highscore[0] || highscore[2] == 0){
        highscore[0] = floor(time)
        newScore = true;
      }
        text("High score: " + highscore[0].toString(), 10, 14)
    } else if (difficulty == "medium"){
      if (time < highscore[1] || highscore[2] == 0){
        highscore[1] = floor(time)
        newScore = true;
      }
        text("High score: " + highscore[1].toString(), 10, 14)
    } else if (difficulty == "hard"){
      if (time < highscore[2] || highscore[2] == 0){
        highscore[2] = floor(time)
        newScore = true;
      } 
        text("High score: " + highscore[2].toString(), 10, 14)
    } else if (difficulty == "survival"){
      if (score > highscore[3]){
        highscore[3] = floor(score)
        newScore = true;
      }
        text("High score: " + highscore[3].toString(), 10, 14)
    } 
    if (newScore){
      console.log(score, highscore[3],  newScore)
      textSize(2);
      text ("NEW HIGH SCORE!", 10, 3);
    }
  }    
}

function increaseScore(){
  score += 1;
}