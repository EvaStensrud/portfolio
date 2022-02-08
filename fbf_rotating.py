

letterNumb = 10
angle = 5
pagewidth = 1000
pageheight = 1000
frames = 150
angle = 0




for i in range(frames):
    newPage(1000, 1000)
    fill(0.1, 0.1, 0)
    rect(0, 0, 1000, 1000)
    font('Sriracha', cursive, 50)
    myString = "fbf"
    txtDimension = textSize(myString)
    textW = txtDimension[0]
    textH = txtDimension[1]
    foo = 0
    frameDuration(1/25)
    yPos = 30
    for row in range(letterNumb):
        xPos = 10
        for column in range(letterNumb):
                       
        
            fill(random(), random(), random())
        
           
            with savedState():
                translate(xPos + 50, yPos + 50)
                
                rotate(angle+foo)
                foo = foo + 1
                
                text(myString, (-textW/2,-10))
   
         
      
       
            xPos += 100
        yPos += 100  
    angle -= 360/frames


saveImage("fbf_rotating.gif")