class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(wt/2), floor(ht/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > wt-1 || x < 0 || y > ht-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      increaseScore();
      return true;
    }
    return false;
  }
  
  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(255);
        noStroke();
      if (i == this.body.length-1){
        rect(this.body[i].x, this.body[i].y,1 ,1)
      } else {
        rect(this.body[i].x + .1, this.body[i].y + .1, 0.8, 0.8) 
      }
    }
  }
  
  reset() {
    this.body = []
    this.body[0] = createVector(floor(wt/2), floor(ht/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

}