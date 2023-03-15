//characters
var ninja,bandit,background1,lightningBolt,coin,shuriken

//Images
var ninjaImage,ninjaImageLeft,shurikenImage,coinImage,muteImg,banditImage,banditGroup,backgroundImage,backgroundMusic,lightningBoltImage,muteButton

//kill and score
var kill = 0
var score = 0

//gameState 1 = end
//gameState 0 = play
var gameState = 0

var lightningSound



function preload()
{
    banditImage = loadImage("./assets/bandit.png");
    ninjaImage = loadImage("./assets/ninja.png");
    ninjaImageLeft = loadImage("./assets/ninjaLeft.png");
    backgroundImage = loadImage("./assets/road.png");
    lightningBoltImage = loadImage("./assets/lightning.png");
    coinImage = loadImage("./assets/coin.png");
    shurikenImage = loadImage("./assets/shuriken.png")
  // backgroundMusic = loadSound("./assets/japanese.mp3");
   lightningSound = loadSound("lightningSound.mp3")
    
}

function setup()
{
    createCanvas(windowWidth,windowHeight)

    background1 = createSprite(windowWidth/2,windowHeight/2,500,600)
    background1.addImage(backgroundImage)
    background1.scale = 2
    background1.velocityY = -5

    ninja = createSprite(displayWidth/2,displayHeight-200)
    ninja.addImage("right",ninjaImage)
    ninja.scale = 0.2
    ninja.addImage("left",ninjaImageLeft)
        
    banditGroup = new Group()
    lightningGroup = new Group()
    shurikenGroup = new Group()
    coinGroup = new Group()

   /* muteButton = createImg("./assets/mute.png");
    muteButton.position(450,0)
    muteButton.size(50,50)
    muteButton.mouseClicked(mute)*/


    invisibleBottomBorder = createSprite(displayWidth/2,660)
    invisibleBottomBorder2 = createSprite(displayWidth/2.3,660)
    invisibleBottomBorder2.setCollider("circle",0,0,40)
    
}

function draw()
{
background("white")
    ninja.collide(invisibleBottomBorder)
    ninja.collide(invisibleBottomBorder2)
    //backgroundMusic.play()
    

if(gameState === 0)
{
   
    
    if(background1.y<175)
    {
      background1.y = 550
    }

    createBandits()
    createCoins()


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


if(keyDown("F") )
{
    if(kill<5)
    {
createShuriken()
    }
else{
    createLightning()
}
}





if(lightningGroup.isTouching(banditGroup))
{
    for(var i = 0;i<banditGroup.length;i++)
    {
        if(lightningGroup[i].isTouching(banditGroup))
        {
            banditGroup[i].destroy()
            lightningGroup.destroyEach()
            kill = kill+1
        }
    }
}

if(banditGroup.isTouching(shurikenGroup))
{
    for(var i = 0;i<shurikenGroup.length;i++)
    {
        if(banditGroup[i].isTouching(shurikenGroup))
        {
            banditGroup[i].destroy()
            shurikenGroup.destroyEach()
            kill = kill+1
        }
    }
}

if(ninja.isTouching(coinGroup))
{
    for(var i = 0;i<coinGroup.length;i++)
    {
        if(ninja.isTouching(coinGroup))
        {
            coinGroup[i].destroy()
            score = score +1
        }
    }
}

if(ninja.isTouching(banditGroup))
    {
       
        gameState = 1
    }
    text("Kills:"+kill,900,20)
    text("Score:"+score,300,20)
}
   

if(gameState === 1)
{
    text("Game Over",windowWidth/2-25,windowHeight/2-50)
    text("You achived score:" +score,windowWidth/2-50,windowHeight/2-100)
    text("You achived kills:" +kill,windowWidth/2-50,windowHeight/2)
    ninja.destroy()
    banditGroup.destroyEach()
    shurikenGroup.destroyEach()
    background1.destroy()
    coinGroup.destroyEach()
   
}

  
  
    drawSprites()
 



   



}

function createLightning()
{
    lightningBolt = createSprite(ninja.x+10,ninja.y-200,20,20)
    lightningBolt.scale = 0.5
    lightningBolt.addImage("letThereBeLight",lightningBoltImage)
    lightningBolt.lifetime = 50
    lightningSound.play()
    lightningGroup.add(lightningBolt)
}

function createShuriken()
{
    shuriken = createSprite(ninja.x+10,ninja.y-100,20,20)
    shuriken.scale = 0.03
    shuriken.addImage(shurikenImage)
    shuriken.velocityY = -6
    shuriken.setCollider("circle",10,10,10)
    shuriken.debug = false
    shuriken.lifetime = 200
    shurikenGroup.add(shuriken)
}



function createBandits()
{
    if(frameCount%200===0)
    {
        bandit = createSprite(Math.round(random(ninja.x-50,ninja.x+50)),-20,50,50)
        bandit.addImage(banditImage)
        bandit.scale = 0.15
        bandit.velocityY = 5
        bandit.lifetime = 500
        banditGroup.add(bandit)
    
    }
   
    
}



function createCoins()
{
  if(frameCount%60===0)
    {
        coin = createSprite(Math.round(random(displayWidth/2,displayHeight-200)))
        coin.addImage(coinImage)
        coin.scale = 0.04
        coin.velocityY = 5
        coin.lifetime = 500
        coinGroup.add(coin)
    
    }
}
