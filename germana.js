
function setup() {
    createCanvas(400, 400);
    x = 180;
    y = 140;
    x2 = 220;
    y2 = 140;
    speed = 1;
  }
  
  function draw() {
    background(36, 9, 187);
    textSize(200);
    textAlign(CENTER, CENTER);
    text("a", 200, 200);
    fill(0);
    noStroke();
    ellipse(x, y, 20);
    ellipse(x2, y2, 20);
    
    x = x + random(-1, 1);
    y2 = y2 + random(-1, 1);
    // Moving up at a constant speed
    y = y - speed;
    x2 = x2 + speed;
    // Reset to the bottom
    if (y < 0) {
      y = 140;
      x = 180;
      if (y2 < 400){
       y2 = 140;
      x2 = 220; 
      }
  
  }
  }