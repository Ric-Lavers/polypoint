const colors = require('colors');
const clear = require('clear');

Array.prototype.rotate = function(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
}
function findSteps(sides,steps, stepLength, endPoint, center) {
  result = []

  for (let j = 1; j < steps+1; j++) { // step down

    if (endPoint > 0) {//if the values are negative they need to add visa versa
      result[j-1]=(Number(endPoint) - stepLength*j)

    }else if (Math.abs(endPoint) == 0){
      result[j-1]= (Number(endPoint))

    }else if(endPoint < 0){
      result[j-1]= (Number(endPoint)+(stepLength*j))
    }
  }
  // for (let j = 1; j < steps; j++) { // step down
  //   if (endPoint > center) {//if the values are negative they need to add visa versa
  //     result[j-1]=(Number(endPoint) - stepLength*j)
  //
  //   }else if (Math.abs(endPoint) == center){
  //     result[j-1]= (Number(endPoint))
  //
  //   }else if(endPoint < center){
  //     result[j-1]= (Number(endPoint)+(stepLength*j))
  //   }
  // }
  return result
}

function reverseOdd() {
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (i%2 == 0) {
      data[`_${i}`].x.reverse();
      data[`_${i}`].y.reverse();
    }
  }
  return data
}

function arrangeNoLayers(data) {
  result = ""

  for (let c = 0; c < data["_0"].x.length; c++) {//for each coordinate pair
    for (let key in data) {
      result += `${data[`${key}`].x[c]},${data[`${key}`].y[c]}  `
    }
    result += `${data[`_0`].x[c]},${data[`_0`].y[c]}  `
  }
  return `<polygon points="${result}"/>`
}

function arrangeLayers(data) {
  result = []

  for (let c = 0; c < data["_0"].x.length; c++) {//for each coordinate pair
    temp = ""
    for (let key in data) {
      temp+= `${data[`${key}`].x[c]},${data[`${key}`].y[c]}  `
    }
    result.push(`<polygon points="${temp}"/>\n`)
  }
  return result
}

function angles(sides){ return ( 2*( Math.PI/sides ) )}

// The purpose if this function is to return a string art SVG based upon the width & hieght (in viewpoints), the number of side and the number of steps (or intervals)
function polypoint(w, h, sides, steps) {
  clear()
  let centerX, centerY, lengthX, lengthY;
  let d, endpoint

  // find center point
  centerX = ( h/2 );
  centerY = ( w/2 );
  lengthX = (centerX-(h%steps) );
  lengthY = (centerY-(w%steps) );
  stepX = lengthX/steps
  stepY = lengthY/steps

  d = angles(sides)
  data = new Object
  for (let i = 0; i < sides; i++) {
      data[`_${i}`]={
        x:[Math.round( (lengthX*Math.cos(d*i)) /*+centerX*/)],
        y:[Math.round( (lengthY*Math.sin(d*i)) /*+centerY*/)]
      }
    }

  console.log("___________".yellow);
  console.log(data);
  console.log("___________".yellow);

  for (let i = 0; i < sides; i++) { //take each side

    endX = data[`_${i}`].x //store X endpoint
    endY = data[`_${i}`].y //store Y endpoint
//if layered steps needs to be plus one!
    data[`_${i}`].x = data[`_${i}`].x.concat(findSteps(sides,steps,stepX, endX, centerX) )
    data[`_${i}`].y = data[`_${i}`].y.concat(findSteps(sides,steps,stepY, endY, centerY) )
  }
  console.log("___________".yellow);
  console.log(data);
  console.log("___________".yellow);
  console.log(centerX,centerY);

  // reverse alternating sides
  data = reverseOdd(data)
  console.log(data);
  console.log("___________".yellow);
  console.log(arrangeLayers(data));

  console.log(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}px" height="${h}" viewbox="-${w/2} -${h/2} ${w} ${h}">\n<g class="polypoint" id="_${sides}_${steps}">\n`.green
    +
    `${arrangeNoLayers(data)}`.green
    +
    `\n</g>
    </svg>`.green);
}
polypoint(200,200,3,8)
