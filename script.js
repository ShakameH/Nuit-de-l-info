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

function renderCanvas() {
    var canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 1000;
    canvas.height = 1000;
    /*for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            drawShape(ctx, 50+100*i, 50+100*j, 50, 4, 45)
        }
    }*/
    ctx.fillStyle = hsl(50, 80%, 40%)
    ctx.fillRect(0, 0, 100, 100);
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            ctx.fillRect(0 + 105 * i, 0 + 105 * j, 100, 100);
        }
    }
    
    const cx = 200;
    const cy = 100;
}




