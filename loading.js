class Loading {
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.flag = true;
    this.length = 0;
  }
  
  show(flag) {
    fill(255)
    noStroke()
    rect(this.x-.5, this.y-.5, 1,1);
    if (flag){
      fill(0)
      rect(this.x, this.y - .125, .5, .25)
    }
    for (let i = 0; i < length; i++){
      fill(255); 
      rect(this.x - 1.2 - (i * 1.1) - .4, this.y - .4, .8, .8)
    }
  }
  
  update() {
    this.flag = !this.flag; 
    if (this.flag){
      length += 1;
    }
    if (length == 8 ){
      length = 0;
    }
    this.show(this.flag)
  }
}