const colors = require('colors');

Array.prototype.rotate = function(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
}
function angles(sides){ return ( 2*( Math.PI/sides ) )}

// The purpose if this function is to return a string art SVG based upon the width & hieght (in viewpoints), the number of side and the number of steps (or intervals)
function polypoint(w, h, sides, steps) {

  let centerX, centerY, lengthX, lengthY;
  let d, endpoint

  // find center point
  centerX = ( h/2 );
  centerY = ( w/2 );
  lengthX = (centerX-(h%steps) );
  lengthY = (centerY-(w%steps) );
  stepX = lengthX/steps
  stepY = lengthY/steps
  //_______ find end points_______
  // d = (2*pi/side) => d = ( 2*(Math.PI/side) )
  // will return the angle for
  d = angles(sides)
  // find the coords for each one. and return them as a tuple array to 2 decimals
  endpoints= new Array(sides).fill([])
  data = new Object

  for (let i = 0; i < sides; i++) {

    data[`_${i}`]={
      x:[Math.round( (lengthX*Math.cos(d*i)) +centerX)],
      y:[Math.round( (lengthY*Math.sin(d*i)) +centerY)]
    }

    endpoints[i] = [
      Math.round( (lengthX*Math.cos(d*i)) +centerX),
      Math.round( (lengthY*Math.sin(d*i)) +centerY)
    ];
  }
  endpoints.reverse()
  console.log(`endpoints ${endpoints}`.red);
  console.log(`data`.red, data);
  console.log(`variables lengthX ${lengthX}, lengthY ${lengthY}`.blue);
  console.log(`variables centerX ${centerX}, centerY ${centerY}`.blue);

  // there are steps involving changing it to a SVG coord system

  // create the step arrays.
  // find step length
console.log("endpoints".blue,endpoints);
  for (let i = 0; i < endpoints.length; i++) {
    for (let j = 1; j < sides; j++) {
      if (centerX < endpoints[i][0]) {//

        endpoints[i].push(centerX,endpoints[i][1]-j*stepX)

      }else if (centerX > endpoints[i][0]) {//

        endpoints[i].push(centerX,endpoints[i][1]+j*stepX)

      }else if (centerX == endpoints[i][0] ) {

        endpoints[i].push(endpoints[i][0]+j*stepX,centerX)

      }else if (centerY < endpoints[i][1]) {

        endpoints[i].push(endpoints[i][1]-j*stepY,centerY)

      }
      else if (centerY > endpoints[i][1]) {

        endpoints[i].push(endpoints[i][1]+j*stepY,centerY)

      }else if (centerY == endpoints[i][1] ) {

        endpoints[i].push(endpoints[i][1]+j*stepY,centerY)

      }
    }
  }
  console.log("endpoints".green,endpoints);
  for (let i = 0; i < endpoints.length; i++) {
    if (i%2 == 0) {// reverse in pairs
      endpoints[i].reverse()
    }
  }
  console.log("endpoints".green,endpoints);
  /*

  console.log(`endpoints`.red,endpoints );
  console.log(`variables lengthX ${lengthX}, lengthY ${lengthY}`.blue);
  console.log(`variables centerX ${centerX}, centerY ${centerY}`.blue);

*/

/*
{
  _1:{ x:[1,2,4,5],y:[1,2,3,4] },
  _2:{ x:[1,2,4,5],y:[1,2,3,4] },
  _3:{ x:[1,2,4,5],y:[1,2,3,4] },
  _4:{ x:[1,2,4,5],y:[1,2,3,4] }
}
*/


  console.log(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}px" height="${h}" viewbox="0 0 ${w} ${h}">
    <g class="polypoint" id="_${sides}_${steps}">`.green
    +
    `<polygon points="${endpoints}" />`.green
    +
    `</g>
    </svg>`.green);
}







polypoint(200,200,4,4)
