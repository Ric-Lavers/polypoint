// The purpose if this function is to return a string art SVG based upon the width & hieght (in viewpoints), the number of side and the number of steps (or intervals)
const roundTo = require('round-to');
Array.prototype.rotate = function(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
}



function angles(sides){ return ( 2*( Math.PI/sides ) )}

//creates side arrays with first entry
function createEndpoints(sides,lengthX,lengthY) {
  let d = angles(sides)
  let data = new Object()
  console.log(data);
  for (let i = 0; i < sides; i++) {
    console.log(i);
      data[`_${i}`]={
        x:[Math.round( lengthX*Math.cos(d*i)  )],
        y:[Math.round( lengthY*Math.sin(d*i)  )]
      }
    }
  console.log(data);
  return data
}

function findSteps(steps, endPoint, center) {
  let result = []
  let step = endPoint/steps
  console.log("____________");
  console.log(steps);
  console.log("____________");
  for (let j = 1; j < steps+1; j++) { // step down
    result[j-1]=roundTo(  (Number(endPoint) - (step*j)) ,2 )
    // if (endPoint > 0) {//if the values are negative they need to add visa versa
    //   result[j-1]=(Number(endPoint) - (step*j))
    //
    // }else if (Math.abs(endPoint) === 0){
    //   result[j-1]= (Number(endPoint))
    // }else if(endPoint < 0){
    //   result[j-1]= (Number(endPoint)+step*j)
    // }
  }
  return result
}

function reverseOdd(data) {
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (i%2 === 0) {
      data[`_${i}`].x.reverse();
      data[`_${i}`].y.reverse();
    }
  }
  return data
}

function arrangeNoLayers(data) {
  let result = ""

  for (let c = 0; c < data["_0"].x.length; c++) {//for each coordinate pair
    for (let key in data) {
      result += `${data[`${key}`].x[c]},${data[`${key}`].y[c]}  `
    }
    result += `${data[`_0`].x[c]},${data[`_0`].y[c]}  `
  }
  return `<polygon points="${result}"/>`
}

function arrangeLayers(data) {
  let result = []

  for (let c = 1; c < data["_0"].x.length-1; c++) {//for each coordinate pair
    let temp = ""
    for (let key in data) {
      temp+= `${data[`${key}`].x[c]},${data[`${key}`].y[c]}  `
    }
    result.push(`<polygon id="_${c}" points="${temp}"/>\n`)
  }
  return result
}



export default function polypoint(w, h, sides, steps, layers=true) {
  let centerX, centerY, lengthX, lengthY;
  let d, endpoint, stepX, stepY, data , endX, endY
  // find center point
  centerX = ( h/2 );
  centerY = ( w/2 );
  lengthX = (centerX-(h%steps) );
  lengthY = (centerY-(w%steps) );
  stepX = lengthX/steps
  stepY = lengthY/steps

  d = angles(sides)
  data = createEndpoints(sides,lengthX,lengthY)

  for (let i = 0; i < sides; i++) { //take each side

    endX = data[`_${i}`].x //store X endpoint
    endY = data[`_${i}`].y //store Y endpoint
//if layered steps needs to be plus one!
    data[`_${i}`].x = data[`_${i}`].x.concat(findSteps(steps, endX, centerX) )
    data[`_${i}`].y = data[`_${i}`].y.concat(findSteps(steps, endY, centerY) )
  }
  data = reverseOdd(data)
  let points = layers?(`${arrangeLayers(data)}`):(`${arrangeNoLayers(data)}`)
return(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}px" height="${h}" viewbox="-${w/2} -${h/2} ${w} ${h}">\n<g class="polypoint" id="_${sides}_${steps}">\n`
    +
    points
    +
    `\n</g>
    </svg>`);
}
