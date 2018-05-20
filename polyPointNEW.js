// This is a refactoring of polypoint into a useable class
require("babel-core").transform("code", options);


//helpers // perhaps not needed
const = roundTo;
const = rotate;

type length = {
  x: number,
  y: number
}

class PolyPoint {
  constructor(sides, steps, length){
    this.sides = sides;
    this.steps = steps;
    this.length = length;

    this.layeredPoints = [];
    this.singlePoints  = [];
  }


  // create side end points
  // find step distances and plot step points

  // reverse alternate sides
  
  // plot svg polypoint points for layered & joined
  // generate svg 

}