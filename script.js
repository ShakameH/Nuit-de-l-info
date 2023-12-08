var circles = []
var circlesPerfect = []
var circlesEarly = []
var score = 0

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  checkCircle(circles, event.key.toLowerCase())
  /*
  switch (event.key.toLowerCase()) {
    case "r":
      // code for "down arrow" key press.
      checkCircle(circles, "r")
      break;
    case "f":
      // code for "down arrow" key press.
      checkCircle(circles[1])
      break;
    case "v":
      // code for "down arrow" key press.
      checkCircle(circles[2])
      break;
    case "t":
      // code for "down arrow" key press.
      checkCircle(circles[3])
      break;
    case "g":
      // code for "down arrow" key press.
      checkCircle(circles[4])
      break;
    case "b":
      // code for "down arrow" key press.
      checkCircle(circles[5])
      break;
    case "y":
      // code for "down arrow" key press.
      checkCircle(circles[6])
      break;
    case "h":
      // code for "down arrow" key press.
      checkCircle(circles[7])
      break;
    case "n":
      // code for "down arrow" key press.
      checkCircle(circles[8])
      break;    
    default:
      return; // Quit when this doesn't handle the key event.
  }*/

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

function checkCircle(circles, key)
{
   comment = document.getElementsByClassName("comment")

   let circle = circles[0]
   // Mauvaise touche
   if (circle.letter != key)
   {
    console.log("Mauvaise touche !")
    return;
   }

  // Trop tard
   if(circle.currentRadius < perfectRadius)
   {
    comment.innerHTML = "Trop tard"
    console.log("Trop tard")
    
   }

   //Parfait
   if(perfectRadius < circle.currentRadius && circle.currentRadius < earlyRadius)
   {
    comment.innerHTML = "PARFAIT"
    console.log("PARFAIT")
   }

   //Trop tôt
   if(earlyRadius < circle.currentRadius)
   {
    comment.innerHTML = "Trop tôt"
    ctx.fillText("Trop tôt", circle.x, circle.y + 65);
   }
   
   // Remove le cercle
   circles = circles.shift();
}

function drawShape(ctx, x, y, r, sides, rot) {
  rot = rot * Math.PI / 180
  // move the canvas to the center position
  ctx.translate(x, y);

  for (let i = 0; i < sides; i++) {
    // calculate the rotation
    const rotation = rot + ((Math.PI * 2)  / sides) * i;

    // for the first point move to
    if (i === 0) {
      ctx.moveTo(r * Math.cos(rotation), r * Math.sin(rotation));
    } else {
      // for the rest draw a line
      ctx.lineTo(r * Math.cos(rotation), r * Math.sin(rotation));
    }
  }
  ctx.closePath();
  ctx.stroke();

  ctx.resetTransform();
}

var minRadius = 10
var perfectRadius = 40
var earlyRadius = 45
var maxRadius = 100
var currentRadius = 100
var scaleBy = 1


function Circle(x, y, radius, letter) {
  this.x = x;
  this.y = y;
  this.currentRadius = radius;
  this.letter = letter;
}

Circle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
  ctx.strokeStyle = '#E1E1E1'
  ctx.lineWidth = 5
  ctx.stroke()
}

Circle.prototype.drawPerfect = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
  ctx.strokeStyle ='rgb(255,215,0,0.6)'
  ctx.lineWidth = 2
  ctx.stroke()
}

Circle.prototype.drawEarly = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
  ctx.strokeStyle ='rgb(255,215,0,0.6)'
  ctx.lineWidth = 2
  ctx.stroke()
}


function Square(x, y, style) {
  this.x = x;
  this.y = y;
  this.style = style;
}

Square.prototype.draw = function(ctx) {
  ctx.beginPath();
  size = 150;
  pad_size = 5;
  ctx.fillStyle = style
  fillRect(0 + (size+pad_size) * this.x, 0 + (size+pad_size) * this.y, size, size)
  //ctx.rect(this.x, this.y, currentRadius/2, currentRadius/2)
  ctx.strokeStyle = '#E1E1E1'
  ctx.lineWidth = 5
  ctx.stroke()
}

function drawPerfect(circlesPerfect, ctx) {
  for (var i = 0; i < circlesPerfect.length; i++) {
    circlesPerfect[i].drawPerfect(ctx);
  }
}


function drawEarly(circlesPerfect, ctx) {
  for (var i = 0; i < circlesPerfect.length; i++) {
    circlesPerfect[i].drawEarly(ctx);
  }
}

function draw(circles, ctx) {
  ctx.clearRect(0, 0, canvaCircles.width, canvaCircles.height)
  for (var i = 0; i < circles.length; i++) {
    circles[i].draw(ctx);
  }
}

// Resize

function renderCanvas() {
  var canvaBackground = document.getElementById("canvaBackground")
  var canvaCircles = document.getElementById("canvaCircles")
  

  const ctxBackground = canvaBackground.getContext("2d")
  const ctxCircles = canvaCircles.getContext("2d")

  
  for (let i = 0 ; i < 3 ; i++) {
    for (let j = 0 ; j < 3 ; j++) {
      //circles.push(new Circle(75+155*i, 72+155*j, 100-20*((i+j))))
      circlesPerfect.push(new Circle(75+155*i, 72+155*j, perfectRadius))
      circlesEarly.push(new Circle(75+155*i, 72+155*j, earlyRadius))
    }
  }
  

  createGrid(ctxBackground)
  console.log(circles)
  var timer = setInterval( function() {
    
    for (var i = 0; i < circles.length; i++)
    {
      if (circles[i].currentRadius > minRadius)
      {
        circles[i].currentRadius -= 1
      } 
    }
  
    draw(circles, ctxCircles)
  }, 25)

  NoteBlocks();
  drawPerfect(circlesPerfect, ctxBackground)
  drawEarly(circlesEarly, ctxBackground)
  draw(circles, ctxCircles)
}

function createGrid(ctx) {
  let colors = ["#11ff22", "#4455ee"]
  size = 150;
  pad_size = 5;
  for (let i = 0 ; i < 3 ; i++) {
    for (let j = 0 ; j < 3 ; j++) {
      //console.log("HSL("+(120 + i*30 + j*20).toString()+", 45%, 45%)")
    
      ctx.fillStyle = "HSL("+(0 + (i+3*j)*40).toString()+", 45%, 45%)"//hsvToRgb(10 + i*5 + j, 90, 90);
      ctx.fillRect(0 + (size+pad_size) * i, 0 + (size+pad_size) * j, size, size);
    }
  }
}

function NoteBlocks(){
  var timerCircle = setInterval( function(){
    x = Math.floor(Math.random()*2.9)
    y = Math.floor(Math.random()*2.9)
    letter = ["r", "f", "v", "t", "g", "b", "y", "h", "n"]
    i = Math.floor(Math.random()*(letter.length-0.1))
    circles.push(new Circle(75+155*x, 72+155*y, currentRadius, letter[i]))
    console.log(letter[i])
  }, 60000/138)

  var timerBass = setInterval( function(){
    doIt = Math.random()
    if (doIt < 0.5)
    {
      return;
    }
    x = Math.floor(Math.random()*2.9)
    y = Math.floor(Math.random()*2.9)
    letter = ["r", "f", "v", "t", "g", "b", "y", "h", "n"]
    i = Math.floor(Math.random()*(letter.length-0.1))
    circles.push(new Circle(75+155*x, 72+155*y, currentRadius, letter[i]))
    console.log(letter[i])
  }, 60000/138)

}
