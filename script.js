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

  
  function hslToRgb(h, s, l) {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1/3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1/3);
      console.log("r: ", r.toString(16))
      console.log("g: ", g)
      console.log("b: ", b)
    }
  
    var color = "#"
    color += (Math.round(r * 255)).toString(16)
    color += (Math.round(g * 255)).toString(16)
    color += (Math.round(b * 255)).toString(16)
    console.log(color)
    return color;
  }

  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  function hsvToRgb(h, s, v) {
    var r, g, b;
  
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    var color = "rgb("
    color += r.toString() +", "
    color += g.toString() +", "
    color += b.toString() + ")"
    console.log(color)
    return color;
  }
    
  function renderCanvas() {
    var canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 1000;
    canvas.height = 1000;

    let colors = ["#11ff22", "#4455ee"]
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
          //console.log("HSL("+(120 + i*30 + j*20).toString()+", 45%, 45%)")
          
          ctx.fillStyle = "HSL("+(0 + (i+3*j)*40).toString()+", 45%, 45%)"//hsvToRgb(10 + i*5 + j, 90, 90);
          ctx.fillRect(0 + 105 * i, 0 + 105 * j, 100, 100);
        }
    }
}




