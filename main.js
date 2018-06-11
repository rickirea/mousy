window.onload = function(){
  var mousy = new Mousy();

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var canvasCuadricula = document.getElementById("canvasCuadricula");
  var ctxC = canvasCuadricula.getContext("2d");

  function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "images/pasto1.png ";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //ctx.fillStyle = 'rgb(61, 60, 60)';
      //ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      //ctx.drawImage(this.img, this.xCloud - this.width, this.y, this.width, this.height);
    }
  }

  function BoardMap(rowH,colW,rows,columns){
    this.coordinates = [];
    this.rowHeight = rowH;
    this.columnWidth = colW;
    this.rows = rows;
    this.columns = columns;
  
    this.build = function(){
       for(let y=0; y < this.rows; y++)
       {   
        let row =[]
        for(let x=0; x < this.columns; x++)
        {
          row.push({"x" : x*this.columnWidth, "y" : y*this.rowHeight});
        }
  
        this.coordinates.push(row);
      }
    }
    
  }

  function Cuadricula(){
    this.x = 0;
    this.y = 0;
    this.sizeWidth = 10;
    this.sizeHeight = 5;
    this.width = canvas.width;
    this.height = canvas.height;

    this.draw = function(){
      for(let x=0; x <= canvas.width; x += (canvas.width/this.sizeWidth))
      {
        ctxC.moveTo(x, 0);
        ctxC.lineTo(x, canvas.height);
        ctxC.stroke();
      }

      for(let y=0; y <= canvas.height; y += (canvas.height/this.sizeHeight))
      {
        ctxC.moveTo(0, y);
        ctxC.lineTo(canvas.width, y);
        ctxC.stroke();
      }
    }
  }

  function Mousy(){
    this.x = 0;
    this.y = 360;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = "images/mousyUp.png";
    this.isGoingUP = true;
    this.isGoingDown = false;
    this.isGoingLeft = false;
    this.isGoingRight = false;
    this.speed = 2;
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      if(this.y <= 0)
      {
        this.dontGoUp(0);
        //gameOver();
      }
      if(this.y >= canvas.height - this.height)
      {
        this.dontGoDown(canvas.height);
      }

      if(this.x <= 0)
      {
        this.dontGoLeft(0);
        //gameOver();
      }
      if(this.x >= canvas.width - this.width)
      {
        this.dontGoRight(canvas.width);
      }
    }

    this.dontGoUp = function(pipeY){
      this.y = pipeY;
    }

    this.dontGoDown = function(pipeY){
      this.y = pipeY - this.height;
    }

    this.dontGoLeft = function(pipeX){
      this.x = pipeX;
    }

    this.dontGoRight = function(pipeX){
      this.x = pipeX - this.width;
    }

    this.moveUp = function(){
      if(!this.isGoingUP)
      {
      //   this.y -= this.speed;
      // }
      // else
      // {
        this.img.src = "images/mousyUp.png";
        this.isGoingUP = true;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = false;
      }
      //this.sound.pause();
      //this.sound.play();
    }

    this.moveDown = function(){
      if(!this.isGoingDown)
      {
      //   this.y += this.speed;
      // }
      // else
      // {
        this.img.src = "images/mousyDown.png";
        this.isGoingUP = false;
        this.isGoingDown = true;
        this.isGoingLeft = false;
        this.isGoingRight = false;
      }
      //this.sound.pause();
      //this.sound.play();
    }

    this.moveLeft = function(){
      if(!this.isGoingLeft)
      {
      //   this.x -= this.speed;
      // }
      // else
      // {
        this.img.src = "images/mousyLeft.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = true;
        this.isGoingRight = false;
      }
      //this.sound.pause();
      //this.sound.play();
    }

    this.moveRight = function(){
      if (!this.isGoingRight)
      {
      //   this.x += this.speed;
      // }
      // else
      // {
        this.img.src = "images/mousyRight.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = true;       
      }
      //this.sound.pause();
      //this.sound.play();
    }

    this.turnLeft = function(){
      if(this.isGoingUP)
      {
        this.img.src = "images/mousyLeft.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = true;
        this.isGoingRight = false; 
        return;
      }
      if(this.isGoingDown)
      {
        this.img.src = "images/mousyRight.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = true; 
        return;
      }
      if(this.isGoingLeft)
      {
        this.img.src = "images/mousyDown.png";
        this.isGoingUP = false;
        this.isGoingDown = true;
        this.isGoingLeft = false;
        this.isGoingRight = false; 
        return;
      }
      if (this.isGoingRight)
      {
        this.img.src = "images/mousyUp.png";
        this.isGoingUP = true;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = false; 
        return;
      } 
    }

    this.turnRight = function(){
      if(this.isGoingUP)
      {
        this.img.src = "images/mousyRight.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = true; 
        return;
      }
      if(this.isGoingDown)
      {
        this.img.src = "images/mousyLeft.png";
        this.isGoingUP = false;
        this.isGoingDown = false;
        this.isGoingLeft = true;
        this.isGoingRight = false; 
        return;
      }
      if(this.isGoingLeft)
      {
        this.img.src = "images/mousyUp.png";
        this.isGoingUP = true;
        this.isGoingDown = false;
        this.isGoingLeft = false;
        this.isGoingRight = false; 
        return;
      }
      if (this.isGoingRight)
      {
        this.img.src = "images/mousyDown.png";
        this.isGoingUP = false;
        this.isGoingDown = true;
        this.isGoingLeft = false;
        this.isGoingRight = false; 
        return;
      }
    }

    this.moveFordward = function()
    {
      if(this.isGoingUP)
      {
        this.y -= this.speed;
      }
      if(this.isGoingDown)
      {
        this.y += this.speed;
      }
      if(this.isGoingLeft)
      {
        this.x -= this.speed;
      }
      if (this.isGoingRight)
      {
        this.x += this.speed;
      } 
    }

    this.isTouching = function(pipe){

      //console.log(this.x + this.width + "-->" + pipe.x);
      return ((this.x + this.width > pipe.x && this.y === pipe.y) && (this.x < pipe.x))
          || ((this.y + this.height > pipe.y && this.x === pipe.x) && (this.y < pipe.y)) 
          || ((this.x < pipe.x + pipe.width && this.y === pipe.y) && (this.x + this.width > pipe.x + pipe.width))
          || ((this.y < pipe.y + pipe.height && this.x === pipe.x) && (this.y + this.height > pipe.y + pipe.height))
          || (this.x === pipe.x && this.y === pipe.y)
    }
  }

  function Queso(){
    this.x = 720;
    this.y = 0;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = "images/queso.png";
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      if(this.y < 0 || this.y > canvas.height - this.height)
      {
        gameOver();
      }
    }

    this.move = function(){
      this.y -= 50;
      //this.sound.pause();
      //this.sound.play();
    }.bind(this);

    // this.isTouching = function(pipe){
    //   return (this.x < pipe.x + pipe.width) 
    //       && (this.x + this.width > pipe.x)
    //       && (this.y < pipe.y + pipe.height)
    //       && (this.y + this.height > pipe.y);
    // }
  }

  function Texture(celda,textureImage){
    this.x = celda.x;
    this.y = celda.y;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = textureImage;
    this.textureImage = textureImage;
    this.show = true;
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      // if(this.y < 0 || this.y > canvas.height - this.height)
      // {
      //   gameOver();
      // }
    }

    this.move = function(){
      this.y -= 50;
      //this.sound.pause();
      //this.sound.play();
    }

    this.flipShow = function(){
      this.show = !this.show;

      if(this.show)
      {
        this.img.src = this.textureImage;
      }
      else
      {
        this.img.src = "";
      }
    }

    // this.isTouching = function(pipe){
    //   return (this.x < pipe.x + pipe.width) 
    //       && (this.x + this.width > pipe.x)
    //       && (this.y < pipe.y + pipe.height)
    //       && (this.y + this.height > pipe.y);
    // }
  }

  //declaraciones
  var board = new Board();
  var boardMap = new BoardMap(80,80,5,10);
  var mousy = new Mousy();
  var queso = new Queso();
  var cuadricula = new  Cuadricula();
  var intervalo;
  var frames = 0;
  var textures = [];
  var edges = [];
  var stepCount =80;
  var traps = [];
  var program = [];

  //listeners
  //listener
  var timeoutId;
  var timeoutFlip;
  addEventListener('keydown', function(e){
    if(e.keyCode === 32)
    {
      program.push("pause");
    }
    if(e.keyCode === 37)
    {
      //mousy.turnLeft();
      program.push("left");
    }
    if(e.keyCode === 38)
    {
      //stepCount=0;
      program.push("fordward");
    }
    if(e.keyCode === 39)
    {
      //mousy.turnRight();
      program.push("right");
    }
    if(e.keyCode === 40)
    {
      timeoutId = setTimeout(callbackFunction, 0);
      timeoutFlip = setTimeout(callbackFlip,0);
    }
  });

  var counter = 0;
  var seconds = 1000;

  var callbackFunction = function () {
    //console.log(counter);
    executeInstruction(program[counter]);
    timeoutId = setTimeout(callbackFunction, seconds);

    counter += 1;
    //seconds += 1000;

    if (counter === program.length) {
      clearTimeout(timeoutId);
      program = [];
      counter = 0;
      //seconds = 1000;
    }
  } 

  var callbackFlip = function () {
    traps.forEach(function(trap){
      trap.flipShow();
    });

    timeoutFlip = setTimeout(callbackFlip, 3000);
  }

  //aux
  function executeInstruction(instruction)
  {
    switch(instruction)
        {
          case "left":
          {
            mousy.turnLeft();
            break;
          }
          case "right":
          {
            mousy.turnRight();
            break;
          }
          case "fordward":
          {
            stepCount=0;
            break;
          }
          case "pause":
          {
            break;
          }
        }
  }

  function gameOver(){
    //alert("Game Over...");
    stop();
    ctx.font = "100px courier";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;

    ctx.strokeText("Game Over",0,70);
  }

  function stop(){
    clearInterval(intervalo);
    intervalo = 1;
    //board.sound.pause();
    //board.soundGameOver.play();
  }

  function checkColitionEdges(){
    edges.forEach(function(edge){
      if(mousy.isTouching(edge))
      {
        if(mousy.isGoingUP)
        {
          mousy.dontGoUp(edge.y + edge.height);
        }
        if(mousy.isGoingDown)
        {
          mousy.dontGoDown(edge.y);
        }
        if(mousy.isGoingLeft)
        {
          mousy.dontGoLeft(edge.x + edge.width);
        }
        if(mousy.isGoingRight)
        {
          mousy.dontGoRight(edge.x);
        }
        //gameOver();
      }
    });
  }

  function checkColitionTraps(){
    traps.forEach(function(trap){
      if(mousy.isTouching(trap) && trap.show)
      {
        gameOver();
      }
    });
  }

  function generateTextures(){
    textures.push(new Texture(boardMap.coordinates[4][0],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][0],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[2][0],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[2][1],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][1],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][2],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][3],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[0][3],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[2][3],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][3],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][4],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[0][4],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[0][5],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[4][4],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[4][5],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][5],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][6],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[4][6],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][6],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][7],"images/stone7.jpg"));   
    textures.push(new Texture(boardMap.coordinates[1][7],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[2][7],"images/stone7.jpg")); 
    textures.push(new Texture(boardMap.coordinates[2][8],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[2][9],"images/stone7.jpg"));  
    textures.push(new Texture(boardMap.coordinates[1][9],"images/stone7.jpg"));
    textures.push(new Texture(boardMap.coordinates[0][9],"images/stone7.jpg"));  
  }

  function generateTraps()
  {
    traps.push(new Texture(boardMap.coordinates[2][3],"images/mousetrap2.png"));
    traps.push(new Texture(boardMap.coordinates[1][7],"images/snake.png"));
  }

  function generateEdges(){
    var existe = false;

    for(let row=0; row < boardMap.rows; row++)
    {
      for(let column = 0; column < boardMap.columns; column++)
      {
        existe=false;
        textures.forEach(function(texture){
          if(boardMap.coordinates[row][column].x === texture.x && boardMap.coordinates[row][column].y === texture.y)
          {
            existe = true;
          }
        });
        if (!existe)
        {
          //edges.push(new Texture(boardMap.coordinates[row][column].x,boardMap.coordinates[row][column].y,"images/tree.png"));
          edges.push(new Texture(boardMap.coordinates[row][column],"images/tree.png"));
        }
      }
    }
  }

  function drawTextures(){
    //ctx.strokeStyle = "white";
    textures.forEach(function(texture){
      texture.draw();
    });
  }

  function drawEdges(){
    //ctx.strokeStyle = "white";
    edges.forEach(function(edge){
      edge.draw();
    });
  }

  function drawTraps(){
    //ctx.strokeStyle = "white";
    traps.forEach(function(trap){
      trap.draw();
    });
  }

  function checkForWalk(){

    if(stepCount < 80)
    {
      mousy.moveFordward();
      stepCount += mousy.speed;
    }
  }

  function update(){
    frames++;
    console.log("frame: " + frames);
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    board.draw();
    drawTextures();
    drawEdges();
    drawTraps();

    mousy.draw();
    queso.draw();

    checkColitionEdges();
    checkColitionTraps();
    checkForWalk();
  }

  function startGame(){
    //generatePipes();
    //drawPipes();
    boardMap.build();
    generateTextures();
    generateEdges();
    generateTraps();
    cuadricula.draw();

    if(intervalo > 0)
    {
      return;
    }

    intervalo = setInterval(function(){
      update();
    },1000/60);
  }

  startGame();
};