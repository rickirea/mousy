window.onload = function(){
  //var mousy = new Mousy();

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var canvasCuadricula = document.getElementById("canvasCuadricula");
  var ctxC = canvasCuadricula.getContext("2d");

  var canvasTitle = document.getElementById("canvasTitle");
  var ctxT = canvasTitle.getContext("2d");

  function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    //this.img.src = "images/waterSplit-0.png";
    this.img.src = "images/water.jpg";
    this.frames = 0;

    this.sound = new Audio();
    this.sound.src = "sounds/ringtones-pink-panther.mp3";
    this.sound.loop = true;

    this.soundGameOver = new Audio();
    this.soundGameOver.src="sounds/game_over2.mp3";

    this.soundGameWin = new Audio();
    this.soundGameWin.src="sounds/aplausos.mp3";

    this.img.onload = function(){
      //this.draw();
      this.sound.play();
    }.bind(this);

    this.draw = function(){
      //ctx.fillStyle = 'rgb(61, 60, 60)';
      //ctx.fillRect(this.x, this.y, this.width, this.height);

      // if(frames % 10 == 0)
      // {
      //   if(this.frames < 29)
      //   {
      //     this.frames++;
      //   }
      //   else
      //   {
      //     this.frames = 0;
      //   }

      //   this.img.src = "images/waterSplit-"+this.frames+".png"
      // }

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

  function Mousy(x, y, texture, speed){
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = texture;
    this.isGoingUP = true;
    this.isGoingDown = false;
    this.isGoingLeft = false;
    this.isGoingRight = false;
    this.speed = speed;
    
    this.sound = new Audio();
    this.sound.src = "sounds/caminar.mp3";

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
      // this.sound.play();
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

      //this.sound.currentTime = 100;
      this.sound.pause();
      this.sound.play();
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

  function Boat(x, y, texture, speed){
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = texture;
    this.isGoingUP = true;
    this.isGoingDown = false;
    this.isGoingLeft = false;
    this.isGoingRight = false;
    this.speed = speed;
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      if(this.y < 0-this.height)
      {
        this.y = canvas.height;
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

  function Texture(celda,textureImage){
    this.x = celda.x;
    this.y = celda.y;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = textureImage;
    this.textureImage = textureImage;
    this.show = true;
    this.frames = 0;
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      //this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      // if(this.y < 0 || this.y > canvas.height - this.height)
      // {
      //   gameOver();
      // }
    }

    this.drawGif = function(){
      if(frames % 10 == 0)
      {
        if(this.frames < 29)
        {
          this.frames++;
        }
        else
        {
          this.frames = 0;
        }

        this.img.src = "images/waterSplit-"+this.frames+".png"
      }

      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    this.showTexture = function(showText){
      this.show = showText;

      if(this.show)
      {
        this.img.src = this.textureImage;
      }
      else
      {
        this.img.src = "";
      }
    }

    this.openBridge = function()
    {
      this.img.src = "";
    }

    this.closeBridge = function()
    {
      this.img.src = "images/bridge3H.png";
    }
  }

  function TextureTitle(celda,textureImage){
    this.x = celda.x;
    this.y = celda.y;
    this.width = 80;
    this.height = 80;
    this.img = new Image();
    this.img.src = textureImage;
    this.textureImage = textureImage;
    this.show = true;
    this.score = 0;
    this.moves = 0;
    this.chances = 0;
    
    //this.sound = new Audio();
    //this.sound.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3";

    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.draw = function(){
      //this.y += 2;
      ctxT.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    this.drawScore = function(){
      this.score = Math.floor(frames/60);
      ctxT.font = "40px Arial";
      ctxT.fillStyle = "lime";
      ctxT.fillText(this.score, this.x + 3, this.y + this.height - 5);
      ctxT.font = "20px Arial";
      ctxT.fillStyle = "white";
      ctxT.fillText("Time", this.x + 10, this.y + 20);
    }

    this.drawMoves = function(moves){
      this.moves = moves;
      ctxT.font = "40px Arial";
      ctxT.fillStyle = "lime";
      ctxT.fillText(this.moves, this.x + 3, this.y + this.height - 5);
      ctxT.font = "20px Arial";
      ctxT.fillStyle = "white";
      ctxT.fillText("Steps", this.x + 10, this.y + 20);
    }

    this.drawChanges = function(chances){
      this.chances = chances;
      ctxT.font = "40px Arial";
      ctxT.fillStyle = "lime";
      ctxT.fillText(this.chances, this.x + 3, this.y + this.height - 5);
      ctxT.font = "20px Arial";
      ctxT.fillStyle = "white";
      ctxT.fillText("Quote", this.x + 10, this.y + 20);
    }
  }
  //declaraciones
  var board = new Board();
  var boardMap = new BoardMap(80,80,5,10);
  var boardTitle = new BoardMap(80,80,1,14)
  var mousy = new Mousy(0,320, "images/mousyUp.png",2);
  var boat = new Boat(160,400, "images/boatUp.png",1);
  var queso;
  var cuadricula = new  Cuadricula();
  var trapBridge;
  var intervalo;
  var frames = 0;
  var textures = [];
  var texturesTitle = [];
  var words = [];
  var edges = [];
  var stepCount =80;
  var traps = [];
  var program = [];
  var indexInstructions=0;
  var repeatInstructions=1;
  var changes = 0;

  //listeners
  var timeoutId;
  var timeoutFlip;
  var lastProgramming=0;

  addEventListener('keydown', function(e){
    if(e.keyCode === 32)
    {
      program.push("pause");
      $("#board_program").append("<div id='instruction"+indexInstructions+"' class='item-program'>"
        // +"<div style='position: absolute; z-index: 1; width: 39px; height:39px'>"
        //   +"<h2 style='margin:0'><span id='span"+indexInstructions+"' class='badge badge-info'><span class='glyphicon glyphicon-ok'></span></span></h2>"
        // +"</div>"
        +"<div><img src='images/pause.png' width='39' height='39'></div>"
      +"</div>");
      indexInstructions++;
    }
    if(e.keyCode === 37)
    { 
      program.push("left");
      $("#board_program").append("<div id='instruction"+indexInstructions+"' class='item-program'>"
        // +"<div style='position: absolute; z-index: 1; width: 39px; height:39px'>"
        //   +"<h2 style='margin:0'><span id='span"+indexInstructions+"' class='badge badge-info'><span class='glyphicon glyphicon-ok'></span></span></h2>"
        // +"</div>"
        +"<div><img src='images/left.png' width='39' height='39'></div>"
      +"</div>");
      indexInstructions++;
    }
    if(e.keyCode === 38)
    {
      program.push("fordward");
      $("#board_program").append("<div id='instruction"+indexInstructions+"' class='item-program'>"
        // +"<div style='position: absolute; z-index: 1; width: 39px; height:39px'>"
        //   +"<h2 style='margin:0'><span id='span"+indexInstructions+"' class='badge badge-info'><span class='glyphicon glyphicon-ok'></span></span></h2>"
        // +"</div>"
        +"<div><img src='images/up.png' width='39' height='39'></div>"
      +"</div>");
      indexInstructions++;
    }
    if(e.keyCode === 39)
    {
      // if(program.length>0)
      // {
      //   if(program[indexInstructions-1] === "right")
      //   {
      //     repeatInstructions++;
      //     var idSpan = "#span"+ String(indexInstructions-repeatInstructions+1);
      //     $(idSpan).html(repeatInstructions);
      //   }
      //   else
      //   {
      //     repeatInstructions=1;
      //   }
      // }
      //mousy.turnRight();
      program.push("right");
      $("#board_program").append("<div id='instruction"+indexInstructions+"' class='item-program'>"
        // +"<div style='position: absolute; z-index: 1; width: 39px; height:39px'>"
        //   +"<h2 style='margin:0'><span id='span"+indexInstructions+"' class='badge badge-info'><span class='glyphicon glyphicon-ok'></span></span></h2>"
        // +"</div>"
        +"<div><img src='images/right.png' width='39' height='39'></div>"
      +"</div>");
      indexInstructions++;
    }
    //quitar la ultima accion de progamacion
    if(e.keyCode === 8)
    {
      if(program.length > lastProgramming)
      {
        program.pop();
  
        var idInstruction = "#instruction"+ String(indexInstructions-1);
        $(idInstruction).remove();
        //lastProgramming = program.length;
     
        indexInstructions--;
      }
    }
    if(e.keyCode === 13)
    {
      //repeatInstructions=1;
      changes++;
      if(program.length > lastProgramming)
      {
        timeoutId = setTimeout(callbackFunction, 0);
      }
    }
  });

  var counter = 0;
  var seconds = 1000;

  var callbackFunction = function () {
    //console.log(counter);
    executeInstruction(program[counter]);

    //put badge
    var idInstruction = "#instruction"+ String(counter);
    $(idInstruction).prepend("<div style='position: absolute; z-index: 1; width: 39px; height:39px'>"
      +"<h2 style='margin:0'><span id='span"+counter+"'><i class='fas fa-check fa-xs' style='background:rgba(0, 255, 0,0.5)'></i></span></h2>"
    +"</div>");

    timeoutId = setTimeout(callbackFunction, seconds);

    counter += 1;
    //seconds += 1000;

    if (counter === program.length) {
      clearTimeout(timeoutId);
      lastProgramming = indexInstructions;
      //program = [];
      //counter = 0;
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
    board.soundGameOver.play();
    ctx.font = "100px courier";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;

    ctx.strokeText("Game Over",0,70);
  }

  function gameWin(){
    //alert("Game Over...");
    queso.img.src = "images/quesoMouse.png";
    mousy.img.src = "";

    var timeout = setTimeout(function (){
      stop();
      board.soundGameWin.play();
    },1000);

    ctx.font = "100px courier";
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 6;

    ctx.strokeText("WELL DONE!!!",0,70);
  }

  function stop(){
    clearInterval(intervalo);
    intervalo = 1;
    board.sound.pause();
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

  function checkColitionBridge(){
    var bridge = textures[5];
    
    if(boat.isTouching(bridge))
    {
      bridge.openBridge();
      trapBridge.showTexture(true);
    }
    else
    {
      bridge.closeBridge();
      trapBridge.showTexture(false);
    }
      
  }

  function checkColitionTraps(){
    traps.forEach(function(trap){
      if(mousy.isTouching(trap) && trap.show)
      {
        gameOver();
      }
    });
  }

  function checkColitionChese(){
    if(mousy.isTouching(queso))
    {
      gameWin();
    }
  }

  function checkColitionBridgeTraps(){
    if(mousy.isTouching(trapBridge) && trapBridge.show)
    {
      gameOver();
    }
  }

  function generateTextures(){
    var texture = "images/stone7.jpg"
    textures.push(new Texture(boardMap.coordinates[4][0],texture));
    //textures.push(new Texture(boardMap.coordinates[3][0],"images/water.jpg"));
    textures.push(new Texture(boardMap.coordinates[3][0],"images/bridge3V.png"));
    textures.push(new Texture(boardMap.coordinates[2][0],texture));
    textures.push(new Texture(boardMap.coordinates[2][1],texture));
    textures.push(new Texture(boardMap.coordinates[1][1],texture));
    //textures.push(new Texture(boardMap.coordinates[1][2],"images/water.jpg"));
    textures.push(new Texture(boardMap.coordinates[1][2],"images/bridge3H.png"));
    textures.push(new Texture(boardMap.coordinates[1][3],texture));
    textures.push(new Texture(boardMap.coordinates[0][3],texture));
    textures.push(new Texture(boardMap.coordinates[2][3],texture));
    textures.push(new Texture(boardMap.coordinates[3][3],texture));
    textures.push(new Texture(boardMap.coordinates[3][4],texture));
    textures.push(new Texture(boardMap.coordinates[0][4],texture));
    textures.push(new Texture(boardMap.coordinates[0][5],texture));
    textures.push(new Texture(boardMap.coordinates[4][4],texture));
    textures.push(new Texture(boardMap.coordinates[4][5],texture));
    textures.push(new Texture(boardMap.coordinates[1][5],texture));
    textures.push(new Texture(boardMap.coordinates[1][6],texture));
    textures.push(new Texture(boardMap.coordinates[4][6],texture));
    textures.push(new Texture(boardMap.coordinates[3][6],texture));
    textures.push(new Texture(boardMap.coordinates[3][7],texture));   
    textures.push(new Texture(boardMap.coordinates[1][7],texture));
    textures.push(new Texture(boardMap.coordinates[2][7],texture)); 
    textures.push(new Texture(boardMap.coordinates[2][8],texture));
    textures.push(new Texture(boardMap.coordinates[2][9],texture));  
    textures.push(new Texture(boardMap.coordinates[1][9],texture));
    textures.push(new Texture(boardMap.coordinates[0][9],texture));  
  }

  function generateTexturesTitle()
  {
    var texture = "images/stone7.jpg"
    // texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][0],"images/stone8.jpg"));
    // texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][0],"images/Go2.png"));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][0],texture));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][1],texture));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][2],texture));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][3],texture));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][4],texture));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][5],"images/stone8.jpg"));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][6],"images/stone8.jpg"));
    texturesTitle.push(new TextureTitle(boardTitle.coordinates[0][7],"images/stone8.jpg"));
  }

  function generateWordsTitle()
  {
    words.push(new TextureTitle(boardTitle.coordinates[0][0],"images/m.png"));
    words.push(new TextureTitle(boardTitle.coordinates[0][1],"images/mousyUp.png"));
    words.push(new TextureTitle(boardTitle.coordinates[0][2],"images/u.png"));
    words.push(new TextureTitle(boardTitle.coordinates[0][3],"images/s.png"));
    words.push(new TextureTitle(boardTitle.coordinates[0][4],"images/y.png"));
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
          edges.push(new Texture(boardMap.coordinates[row][column],"images/water.jpg"));

          // if((row===4 && column===2))
          // {
          //   edges.push(new Texture(boardMap.coordinates[row][column],"images/boatUp.png"));
          // }
        }
      }
    }
  }

  function drawTextures(){
    textures.forEach(function(texture){    
      texture.draw();
    });
  }

  function drawTexturesTitle(){
    //ctx.strokeStyle = "white";
    texturesTitle.forEach(function(texture){
      texture.draw();
      if(texture.x == boardTitle.coordinates[0][5].x)
      {
        texture.drawScore();
      }
      if(texture.x == boardTitle.coordinates[0][7].x)
      {
        texture.drawChanges(changes);
      }
      if(texture.x == boardTitle.coordinates[0][6].x)
      {
        texture.drawMoves(indexInstructions);
      }
    });
  }

  function drawWordsTitle(){
    words.forEach(function(texture){
      texture.draw();
    });
  }

  function drawEdges(){
    //ctx.strokeStyle = "white";
    edges.forEach(function(edge){
      edge.draw();
      //edge.drawGif();
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
    else{
      mousy.sound.pause();
    }
  }

  function goBoat()
  {
    boat.moveFordward();
  }

  function update(){
    frames++;
    console.log("frame: " + frames);
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    board.draw();
    ctxT.clearRect(0,0,canvasTitle.width, canvasTitle.height);
    drawTexturesTitle();
    drawWordsTitle();

    drawEdges();
    boat.draw();
    drawTextures();
    trapBridge.draw();
    drawTraps();

    mousy.draw();
    queso.draw();

    checkColitionEdges();
    checkColitionBridge();
    checkColitionTraps();
    checkColitionBridgeTraps();
    checkForWalk();
    goBoat();
    checkColitionChese();
  }

  function startGame(){
    //generatePipes();
    //drawPipes();
    boardMap.build();
    trapBridge = new Texture(boardMap.coordinates[1][2],"images/bridgeOpenConvertRight.png");
    queso = new Texture(boardMap.coordinates[0][9], "images/queso.png");
    boardTitle.build();
    generateTextures();
    generateTexturesTitle();
    generateWordsTitle();
    // drawTexturesTitle();
    generateEdges();
    generateTraps();
    cuadricula.draw();
    timeoutFlip = setTimeout(callbackFlip,0);

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