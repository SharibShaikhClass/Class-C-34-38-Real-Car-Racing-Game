class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,200);
    car1.addImage("car1",car1Image);
    car2 = createSprite(400,200);
    car2.addImage("car2",car2Image);
    car3 = createSprite(600,200);
    car3.addImage("car3",car3Image);
    car4 = createSprite(800,200);
    car4.addImage("car4",car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
     
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    background("brown")
    image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);

    
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){

          
          fill("white")
          ellipse(x,y,90,90);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }


  if(player.distance>displayHeight*5-90){
        gameState = 2;
        player.rank+=1;

        Player.updateCarsAtEnd(player.rank);


        

    }

  drawSprites();

  
}




  end(){

   // text("Game Over And Your Rank is" + player.rank,
    //var gameOver = createSprite(displayWidth/2,-displayHeight*4-90,50,50);
    //gameOver.shapeColor = "white";
    console.log("Game Over Your Rank Is " + player.rank)
    drawSprites();

    form.gameOver.html("Gamover Your Rank is " + player.rank);
    form.gameOver.position(displayWidth/2,100);

  }

  
  
}
