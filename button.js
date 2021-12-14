class Button {
  
  constructor (x,y,w,h, text){
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.text = text;
    this.strokeColor = "white"
    this.setValue = false;
  }
  
  show() {
    noFill();
    if (this.strokeColor == "white") stroke(240);
    if (this.strokeColor == "green") stroke(40,240,40);

    strokeWeight(0.2)
    rect(this.x - this.width / 2, this.y - this.height/2, this.width, this.height,0.4)
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER)
    textSize(1);
    text(this.text, this.x, this.y)
  }
  
  isClicked() {
    if (mouseX > this.x && mouseX < this.x+ this.width){
    }
  }
  isHover() {
    let x = mouseX / resolution;
    let y = mouseY / resolution;
    if (x > this.x - this.width/2 && x < this.x + this.width/2 && y > this.y - this.height/2 && y < this.y + this.height/2){
        this.strokeColor = "green"
        return true;
    } 
    if(!this.setValue){
      this.strokeColor = "white";
    }
    return false;
  }
  set() {
    this.setValue = true;
    this.strokeColor = "green";
  }
  unset() {
    this.setValue = false;
    this.strokeColor = "white";
  }
}