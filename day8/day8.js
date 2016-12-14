/*
The magnetic strip on the card you swiped encodes a series of instructions for the screen; 
these instructions are your puzzle input. The screen is 50 pixels wide and 6 pixels tall, all of which start off, 
and is capable of three somewhat peculiar operations:

rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A wide and B tall.
rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels. Pixels that would 
fall off the right end appear at the left end of the row.
rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels. 
Pixels that would fall off the bottom appear at the top of the column.
*/

const boardWidth = 50;
const boardHeight = 6;


//for constructing the final array of pixels
var xCoords = [];  // W
var yCoords = [0,1,2,3,4,5,6];  // H




for(var i=0; i < 50; i++){
	xCoords.push(i);
}

var demoInput = 'rect 3x2';
// W X H

// Create a rectangle
function makeRect(dims){
  // grab  X and Y coords from dim 
 	var coords = dims.split('rect ')[1].split('x');

  var x = parseInt(coords[0]);
  var y = parseInt(coords[1]);  // we get this from parsing dim	
  

console.log('x: ', x);
console.log('y: ', y);
  var rect = []; //inserting coords here

  //insert X values
  for(var i=0; i < y; i++){
  		//insert y values
    for(var j=0; j < x; j++){
      rect.push([j,i])
    }
  }

  console.log('RECT NOW', rect);
}


makeRect(demoInput);

