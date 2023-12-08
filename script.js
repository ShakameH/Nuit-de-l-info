var circles = []
var circlesPerfect = []
var circlesEarly = []
var score = 0
var gameOver = false
var timerCircle = null
var timerBass = null

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  if(event.key == "Escape")
  {
    CloseFenetre()
  }

  checkCircle(circles, event.key.toLowerCase())
  event.preventDefault();
}, true);

function CloseFenetre()
{
  // Quitter : Redirection
  this.close()
}

function checkCircle(circles, key)
{
   comment = document.getElementById("comment")
   scoreText = document.getElementById("score")

   if (circles.length === 0)
   {
    return;
   }

   let circle = circles[0]
   // Mauvaise touche
   if (circle.letter != key)
   {
    comment.innerHTML = "Mauvaise touche !"
    score -= 15
    console.log("Mauvaise touche !")
    scoreText.innerHTML = "SCORE: " + score 
    // Remove le cercle
    circles.shift()
    return;
   }

  // Trop tard
   if(circle.currentRadius < perfectRadius)
   {
    comment.innerHTML = "Trop tard !"
    console.log("Trop tard")
    score += 50
   }

   //Parfait
   if(perfectRadius < circle.currentRadius && circle.currentRadius < earlyRadius)
   {
    comment.innerHTML = "PARFAIT !"
    console.log("PARFAIT")
    score += 400
   }

   //Trop tôt
   if(earlyRadius < circle.currentRadius)
   {
    comment.innerHTML = "Trop tôt !"
    console.log("Trop tôt")
    score += 150
   }
   scoreText.innerHTML = "SCORE: " + score 
   circles.shift()
}

function drawShape(ctx, x, y, r, sides, rot) {
  rot = rot * Math.PI / 180
  ctx.translate(x, y);

  for (let i = 0; i < sides; i++) {
    const rotation = rot + ((Math.PI * 2)  / sides) * i;

    if (i === 0) {
      ctx.moveTo(r * Math.cos(rotation), r * Math.sin(rotation));
    } else {
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
var audio = new Audio('enchanted-chimes-177906.mp3')


function Circle(x, y, radius, letter) {
  this.x = x;
  this.y = y;
  this.currentRadius = radius;
  this.letter = letter;
  this.timeBeforeRemove = 40;
  this.color = '#E1E1E1'
}

Circle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
  ctx.strokeStyle = this.color
  ctx.lineWidth = 5
  ctx.stroke()
}

Circle.prototype.drawPerfect = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText(this.letter, this.x - 10, this.y + 10);
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
function startGame()
{
  const beats = [
    100, 525, 980, 1950, 2500, 2850, 3480, 5200, 5650,
    6100, 6300, 6800, 7200, 7500, 7900, 
    8350, 8724, 9200, 15700, 17735, 18250, 22400,
    22500, 22800, 22950, 23000, 23200, 
    23700, 23900, 26500, 26700, 26900, 29800,
    30200, 31100, 31400, 31550, 32200, 32900,
    33150, 34000, 34770, 34950, 35720, 36300, 36500, 36750,
    37150,37350,37600,38000,38200,39150,39750,40850,40950,
    41520,41860,42670,42980,43150,43250,43400,44100,44350,44600,45300,
    46100,46950,47600,47950,48500,48650,49350,49550,49900,50000,50150,
    50400,50600,51100,51300,51880,52750,53000,53650, 53850, 54500,
54700, 55150, 55600, 56220, 56480, 56780, 56830, 56880, 57000, 57250,
57850, 57940, 58300, 58450, 59150, 63970, 63250, 66410, 66550, 66700,
66880, 67000, 67230, 67420, 67530, 67640, 67960, 70120, 70400, 71310
]

for (var i = 4; i < beats.length; i += 3)
{
  setTimeout(()=>{
    NoteBlocks();
  }, beats[i]-2500)
}
  var timerEndGame = setInterval(() => {
    endGame();
  }, audio.duration * 1000);
}

function endGame(){
  gameOver = true
  audio.pause();
  audio.currentTime = 0;
  clearInterval(timerBass)
  clearInterval(timerCircle)
  
  comment = document.getElementById("comment")
  comment.innerHTML = "GAME OVER !"
}

function renderCanvas() {
  var canvaBackground = document.getElementById("canvaBackground")
  var canvaCircles = document.getElementById("canvaCircles")
  audio.play()
  console.log(audio.duration)

  if(gameOver == true)
  {
    return;
  }

  startGame()

  const ctxBackground = canvaBackground.getContext("2d")
  const ctxCircles = canvaCircles.getContext("2d")

  letter = ["R", "T", "Y", "F", "G", "H", "V", "B", "N"]
  for (let i = 0 ; i < 3 ; i++) {
    for (let j = 0 ; j < 3 ; j++) {
      //circles.push(new Circle(75+155*i, 72+155*j, 100-20*((i+j))))
      circlesPerfect.push(new Circle(75+155*i, 72+155*j, perfectRadius, letter[i+3*j]))
      circlesEarly.push(new Circle(75+155*i, 72+155*j, earlyRadius))
    }
  }
  createGrid(ctxBackground)
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

  var timerCheckLateCircles = setInterval( function()
  {
    for (var i = 0; i < circles.length; i++)
    {

      if (circles[i].currentRadius == minRadius && circles[i].timeBeforeRemove > 0)
      {
        circles[i].timeBeforeRemove -= 1
        circles[i].color = "red"
      }
    }

    if(circles.length > 0 && circles[0].timeBeforeRemove <= 0)
    {
      document.getElementById("comment").innerHTML = "Raté !"
      scoreText = document.getElementById("score")
      score -= 10
      scoreText.innerHTML = "SCORE: " + score
      circles.shift();
    }    

  }, 1)

  NoteBlocks()
  drawPerfect(circlesPerfect, ctxBackground)
  drawEarly(circlesEarly, ctxBackground)
  draw(circles, ctxCircles)
}

function createGrid(ctx) {
  size = 150;
  pad_size = 5;
  for (let i = 0 ; i < 3 ; i++) {
    for (let j = 0 ; j < 3 ; j++) {
      ctx.fillStyle = "HSL("+(0 + (i+3*j)*40).toString()+", 45%, 45%)"
      ctx.fillRect(0 + (size+pad_size) * i, 0 + (size+pad_size) * j, size, size);
    }
  }
}

function NoteBlocks(){

  letter = ["r", "t", "y", "f", "g", "h", "v", "b", "n"]
    i = Math.floor(Math.random()*(letter.length-0.1))
    x = i%3
    y = Math.floor(i/3)
    circles.push(new Circle(75+155*x, 72+155*y, currentRadius, letter[i]))
    console.log(letter[i])

}
