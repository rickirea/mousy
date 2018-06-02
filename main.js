window.onload = function(){
  var mousy = new Mousy();

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;

    this.draw = function(){
      ctx.fillStyle = 'rgb(61, 60, 60)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  function Pipe(x1, y1, x2, y2, lineType){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineType = lineType;

    this.draw = function(){
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  function Mousy(){
    this.x = 1;
    this.y = 361;
    this.width = 38;
    this.height = 38;
    this.img = new Image();
    this.img.src = "images/mousyUp.png";
    this.isGoingUP = true;
    this.isGoingDown = false;
    this.isGoingLeft = false;
    this.isGoingRight = false;
    
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
        this.dontGoUp(0,0);
        //gameOver();
      }
      if(this.y >= canvas.height - this.height)
      {
        this.dontGoDown(canvas.width, canvas.height);
      }

      if(this.x <= 0)
      {
        this.dontGoLeft(0,0);
        //gameOver();
      }
      if(this.x >= canvas.width - this.width)
      {
        this.dontGoRight(canvas.width , canvas.height);
      }
    }

    this.dontGoUp = function(pipeX, pipeY){
      this.y = pipeY + 1;
    }

    this.dontGoDown = function(pipeX, pipeY){
      this.y = pipeY - this.height -1;
    }

    this.dontGoLeft = function(pipeX, pipeY){
      this.x = pipeX + 1;
    }

    this.dontGoRight = function(pipeX, pipeY){
      this.x = pipeX - this.width - 1;
    }

    this.moveUp = function(){
      this.img.src = "images/mousyUp.png";
      this.y -= 1;
      
      this.isGoingUP = true;
      this.isGoingDown = false;
      this.isGoingLeft = false;
      this.isGoingRight = false;

      //this.sound.pause();
      //this.sound.play();
    }

    this.moveDown = function(){
      this.img.src = "images/mousyDown.png";
      this.y += 1;

      this.isGoingUP = false;
      this.isGoingDown = true;
      this.isGoingLeft = false;
      this.isGoingRight = false;
      //this.sound.pause();
      //this.sound.play();
    }

    this.moveLeft = function(){
      this.img.src = "images/mousyLeft.png";
      this.x -= 1;

      this.isGoingUP = false;
      this.isGoingDown = false;
      this.isGoingLeft = true;
      this.isGoingRight = false;
      //this.sound.pause();
      //this.sound.play();
    }

    this.moveRight = function(){
      this.img.src = "images/mousyRight.png";
      this.x += 1;

      this.isGoingUP = false;
      this.isGoingDown = false;
      this.isGoingLeft = false;
      this.isGoingRight = true;
      //this.sound.pause();
      //this.sound.play();
    }

    this.isTouching = function(pipe){
      // return (this.x < pipe.x + pipe.width) 
      //     && (this.x + this.width > pipe.x)
      //     && (this.y < pipe.y + pipe.height)
      //     && (this.y + this.height > pipe.y);
      if(pipe.lineType==="horizontal")
      {
        if(this.isGoingUP)
        {
          return(pipe.y1 >= this.y && pipe.y1 <= this.y + this.height)
          &&((this.x + this.width >= pipe.x1 && this.x + this.width <= pipe.x2)
          ||(this.x >= pipe.x1 && this.x <= pipe.x2));
        }

        if(this.isGoingDown)
        {
          return(pipe.y1 >= this.y && pipe.y1 <= this.y + this.height)
              &&(this.x + this.width >= pipe.x1 && this.x <= pipe.x2);
        }   

        if(this.isGoingLeft)
        {
          return(pipe.y1 >= this.y && pipe.y1 <= this.y + this.height)
              &&(this.x <= pipe.x2 && this.x >= pipe.x1); 
        }  

        if(this.isGoingRight)
        {
          return(pipe.y1 >= this.y && pipe.y1 <= this.y + this.height)
              &&(this.x + this.width >= pipe.x1 && this.x + this.width <= pipe.x2); 
        }  
      }

      if(pipe.lineType==="vertical")
      {
        // if(this.isGoingUP)
        // {
        //   return(this.y >= pipe.y1 && this.y <= pipe.y2)
        //       &&(this.x <= pipe.x1 && this.x + this.width >= pipe.x1);
        // }

        if(this.isGoingRight)
        {////
          return(pipe.x1 >= this.x && pipe.x1 <= this.x + this.width)
              &&(this.y + this.height >= pipe.y1 && this.y <= pipe.y2);
        }

        if(this.isGoingLeft)
        {
          return(pipe.x1 >= this.x && pipe.x1 <= this.x + this.width)
              &&(this.y + this.height >= pipe.y1 && this.y <= pipe.y2);
        }   
      }
         
          //&& (this.x + this.width > pipe.x)
          //&& (this.y < pipe.y + pipe.height)
          //&& (this.y + this.height > pipe.y);
    }
  }

  function Queso(){
    this.x = 361;
    this.y = 1;
    this.width = 38;
    this.height = 38;
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

  //declaraciones
  var board = new Board();
  var mousy = new Mousy();
  var queso = new Queso();
  var intervalo;
  var frames = 0;
  var pipes = [];

  //listeners
  //listener
  addEventListener('keydown', function(e){
    if(e.keyCode === 37)
    {
      mousy.moveLeft();
    }
    if(e.keyCode === 38)
    {
      mousy.moveUp();
    }
    if(e.keyCode === 39)
    {
      mousy.moveRight();
    }
    if(e.keyCode === 40)
    {
      mousy.moveDown();
    }
  });

  //aux
  function gameOver(){
    alert("Game Over...");

    stop();
    ctx.font = "60px courier";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeText("Game Over",30, 250);
  }

  function stop(){
    clearInterval(intervalo);
    intervalo = 0;
    //board.sound.pause();
    //board.soundGameOver.play();
  }

  function checkColition(){
    pipes.forEach(function(pipe){
      if(mousy.isTouching(pipe))
      {
        if(mousy.isGoingUP)
        {
          // if(pipe.lineType === "vertical")
          // {
          //   mousy.dontGoUp(pipe.x1,pipe.y2);
          // }
          // else
          // {
            mousy.dontGoUp(pipe.x1,pipe.y1);
          // }
        }
        if(mousy.isGoingDown)
        {
          mousy.dontGoDown(pipe.x1,pipe.y1);
        }
        if(mousy.isGoingLeft)
        {
          if(pipe.lineType === "horizontal")
          {
            mousy.dontGoLeft(pipe.x2,pipe.y1);
          }
          else
          {
            mousy.dontGoLeft(pipe.x1,pipe.y1);
          }
        }
        if(mousy.isGoingRight)
        {
          if(pipe.lineType === "horizontal")
          {
            mousy.dontGoRight(pipe.x1,pipe.y1);
          }
          else
          {
            mousy.dontGoRight(pipe.x1,pipe.y1);
          }
        }
        //gameOver();
      }
    });
  }

  function generatePipes(){
    pipes.push(new Pipe(80,80,80,120,"vertical"));
    pipes.push(new Pipe(40,320,40,400,"vertical"));
    pipes.push(new Pipe(80,320,80,360,"vertical"));
    pipes.push(new Pipe(80,240,80,280,"vertical"));
    pipes.push(new Pipe(40,120,40,160,"vertical"));
    pipes.push(new Pipe(200,200,200,280,"vertical"));
    pipes.push(new Pipe(280,120,280,360,"vertical"));
    pipes.push(new Pipe(160,200,160,320,"vertical"));
    pipes.push(new Pipe(120,160,120,320,"vertical"));
    pipes.push(new Pipe(320,280,320,320,"vertical"));
    pipes.push(new Pipe(240,280,240,400,"vertical"));
    pipes.push(new Pipe(160,360,160,400,"vertical"));
    pipes.push(new Pipe(200,320,200,360,"vertical"));
    pipes.push(new Pipe(320,360,320,400,"vertical"));
    pipes.push(new Pipe(360,320,360,360,"vertical"));
    pipes.push(new Pipe(120,0,120,80,"vertical"));
    pipes.push(new Pipe(160,40,160,120,"vertical"));
    pipes.push(new Pipe(240,160,240,200,"vertical"));
    pipes.push(new Pipe(200,0,200,40,"vertical"));
    pipes.push(new Pipe(240,40,240,120,"vertical"));
    pipes.push(new Pipe(200,120,200,160,"vertical"));
    pipes.push(new Pipe(280,40,280,80,"vertical"));
    pipes.push(new Pipe(320,0,320,40,"vertical"));
    pipes.push(new Pipe(360,40,360,80,"vertical"));
    pipes.push(new Pipe(320,120,320,160,"vertical"));
    pipes.push(new Pipe(360,120,360,200,"vertical"));
    pipes.push(new Pipe(360,240,360,280,"vertical"));
    pipes.push(new Pipe(320,200,320,240,"vertical"));
    pipes.push(new Pipe(80,360,120,360,"horizontal"));
    pipes.push(new Pipe(40,320,80,320,"horizontal"));
    pipes.push(new Pipe(0,280,80,280,"horizontal"));
    pipes.push(new Pipe(40,240,80,240,"horizontal"));
    pipes.push(new Pipe(0,200,80,200,"horizontal"));  
    pipes.push(new Pipe(0,80,40,80,"horizontal"));
    pipes.push(new Pipe(0,40,80,40,"horizontal"));
    pipes.push(new Pipe(40,120,80,120,"horizontal"));
    pipes.push(new Pipe(40,160,160,160,"horizontal"));
    pipes.push(new Pipe(120,320,160,320,"horizontal"));
    pipes.push(new Pipe(160,200,200,200,"horizontal"));
    pipes.push(new Pipe(200,240,280,240,"horizontal"));
    pipes.push(new Pipe(280,320,320,320,"horizontal"));
    pipes.push(new Pipe(160,360,200,360,"horizontal"));
    pipes.push(new Pipe(320,360,360,360,"horizontal"));
    pipes.push(new Pipe(120,120,200,120,"horizontal"));
    pipes.push(new Pipe(200,160,240,160,"horizontal"));
    pipes.push(new Pipe(200,80,240,80,"horizontal"));
    pipes.push(new Pipe(240,120,280,120,"horizontal"));
    pipes.push(new Pipe(240,40,280,40,"horizontal"));
    pipes.push(new Pipe(280,80,360,80,"horizontal"));
    pipes.push(new Pipe(360,40,400,40,"horizontal"));
    pipes.push(new Pipe(320,120,360,120,"horizontal"));
    pipes.push(new Pipe(400,200,360,200,"horizontal"));
    pipes.push(new Pipe(320,240,360,240,"horizontal"));
    pipes.push(new Pipe(280,200,320,200,"horizontal"));
  }

  function drawPipes(){
    ctx.strokeStyle = "white";
    pipes.forEach(function(pipe){
      pipe.draw();
    });
  }

  function update(){
    frames++;
    console.log("frame: " + frames);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    board.draw();
    drawPipes();
    mousy.draw();
    console.log(mousy.x+","+mousy.y);
    queso.draw();

    checkColition();
  }

  function startGame(){
    generatePipes();

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