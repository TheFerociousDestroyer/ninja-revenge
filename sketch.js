//characters
var ninja,bandit,background,lightningBolt

//Images
var ninjaImage,neenjaImageLeft,banditImage,backgroundImage,backgroundMusic,lightningBoltImage


function preload()
{
    banditImage = loadImage("./assets/bandit.jpg");
    ninjaImage = loadImage("./assets/neenja.png");
    neenjaImageLeft = loadImage("./assets/neenjaleft.png");
    backgroundImage = loadImage("./assets/road.png");
    lightningBoltImage = loadImage("./assets/lightning.png");
}

function setup()
{
    createCanvas(windowWidth,windowHeight)

    background = createSprite(windowWidth/2,windowHeight/2,500,600)
    background.addImage(backgroundImage)
    background.scale = 2

    ninja = createSprite(displayWidth/2,displayHeight-500)
    ninja.addImage("right",ninjaImage)
    ninja.scale = 0.5

    ninja.addImage("left",neenjaImageLeft)
        
    
}

function draw()
{
    drawSprites()



    if(keyDown("UP_ARROW"))
    {
        ninja.y = ninja.y - 5
     
    }

    if(keyDown("DOWN_ARROW"))
    {
        ninja.y = ninja.y + 5
       
    }

    if(keyDown("RIGHT_ARROW"))
    {
        ninja.x = ninja.x + 5
        ninja.changeImage("right")
    }

    if(keyDown("LEFT_ARROW"))
    {
        ninja.x = ninja.x - 5
        
        ninja.changeImage("left")
       
    }
if(keyDown("UP_ARROW"))
{
    background.velocityY = +2
}

if(keyDown("F"))
{
createLightning()
}



}

function createLightning()
{
    lightningBolt = createSprite(ninja.x+50,ninja.y-400,20,20)
    lightningBolt.addImage("letThereBeLight",lightningBoltImage)
}