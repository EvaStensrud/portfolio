var fade;
var fadeAmount = 1

function setup() {
  createCanvas(400, 400);
  fade = 0;
}

function draw() {
  background(36, 9, 187);
  textSize(200);
  textAlign(CENTER, CENTER);
  text("a", 200, 200);
  
  push();
  fill(0, 0, 0, fade)
  strokeWeight(7);
  stroke(0, 0, 0);
  ellipse(200, 136, 40)
  if (fade<0) fadeAmount=1; 
 
  if (fade>255) fadeAmount=-10; 
 
  fade += fadeAmount; 
  pop();
}