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

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var fs = require('fs');
var lines = fs.readFileSync('day8.txt').toString().split("\n"); //save input lines in an array


// console.log('lines', lines);
var maxWidth = 50;
var maxHeight = 6;


//for constructing the final array of pixels
var xCoords = [];  // W
var yCoords = [0,1,2,3,4,5,6];  // H

var masterGrid = [];


for(var i=0; i < 50; i++){
    xCoords.push(i);
}

// var demoInput = 'rect 3x2';
// W X H

// Create a rectangle
function makeRect(dims){
  // grab  X and Y coords from dim 
     var coords = dims.split('rect ')[1].split('x');
     var newCoord;
  var x = parseInt(coords[0]);
  var y = parseInt(coords[1]);  // we get this from parsing dim    
  
    // console.log('x: ', x);
    // console.log('y: ', y);
  var rect = []; //inserting coords here
  // var newArr = [];

  //insert X values
  for(var i=0; i < y; i++){
          //insert y values
    for(var j=0; j < x; j++){
            // console.log('pushing!');
            newCoord = [j,i].toString();
            // check if the coord is not in the master grid
            // if it isn't --> lets add it
            if(masterGrid.indexOf(newCoord) === -1){
              masterGrid.push(newCoord);        
            }
    }
  }
  // console.log('RECT NOW', rect);
  return masterGrid;
}

/*
rect 1x2   --------> everytime we add a rect, we overlap lights
rotate row y=1 by 5  
rotate row y=0 by 3
rect 1x2
rotate column x=30 by 1
rotate column x=25 by 1
rotate column x=10 by 1
rotate row y=1 by 5
rotate row y=0 by 2
*/

// var cmd = 'rotate column x=30 by 1';
// var cmd2 = 'rect 1x1';
// var cmd3 = 'rotate row y=0 by 3';




// loop through the masterGrid 
// extract all the points that have x = x_cmd
// increase all fo the Y values by the second CMD

// rotates a row RIGHT
function shiftRow(cmd){
    var y = cmd.split(' ')[2].split('=')[1];
    var amt = parseInt(cmd.split(' ')[4]);
    var arr;
    
    for(var i=0; i<masterGrid.length;i++){
        arr = masterGrid[i].split(',');
        if(arr[1] === y){
            arr[0] = (parseInt(arr[0]) + amt) % maxWidth;
            arr[0] = arr[0].toString();
        }
        masterGrid[i] = arr.join(",")
    }
}

// rotates a column DOWN
function shiftColumn(cmd){
    var x = cmd.split(' ')[2].split('=')[1];
    var amt = parseInt(cmd.split(' ')[4]);
    var arr;
    
    for(var i=0; i<masterGrid.length;i++){
        arr = masterGrid[i].split(',');
        if(arr[0] === x){
            arr[1] = (parseInt(arr[1]) + amt) % maxWidth;
            arr[1] = arr[1].toString();
        }
        masterGrid[i] = arr.join(",")
    }
}


// runs throughh all test case
function part1(cmd){
    //check line for rect/rotate
    if(cmd.split(' ')[0] === 'rect'){
        makeRect(cmd);
    }
    else if(cmd.split(' ')[1] === 'column'){
        shiftColumn(cmd);
        }
    else{
        shiftRow(cmd);
        }        
} //end part1

for(var i=0; i<lines.length;i++){
    part1(lines[i]);
 }
 console.log('$$$$$$$$$');
 console.log('MASTERGRID LENGTH IS', masterGrid.length);
 // console.log('MASTERGRID IS', masterGrid);
// Part 1 Answer -->  106

// PART 2
var part2Answer = '';


// CONVERT STRING GRID TO ARRAYS

var newArr = [];  
for(var i=0; i < masterGrid.length; i++){
  var temp = [];
  temp.push(parseInt(masterGrid[i].split(',')[1]));
  temp.push(parseInt(masterGrid[i].split(',')[0]));
  newArr.push(temp);
}

newArr.sort();

console.log('newArr', newArr);
// console.log('y', y);
// console.log('x', x);





for(var y=0; y < 9; y++){
  // var line = '**************************************************';
  var line = '                                                  ';

  // console.log('y', y);
  // loop over x axis
  // star anything that falls within first 5
  for(var x=0; x<masterGrid.length; x++){
      // loop over y axis and start within 6

      // console.log('newArr[x]', newArr[x])
      // console.log('newArr[x][0]', newArr[x][0])
      if(newArr[x][0] === y){
        // console.log('MATCH', newArr[x][1])
        // console.log('x', x)
        // console.log('y', y)
        line = line.replaceAt(newArr[x][1],'*')
      }
      // console.log('*');
  }  
	console.log(line);
}

// INCORRECT GUESS --->   CFLELOYFOS


/*
                 
 **  **** *    **** *     **  *   * ***  **   ***      
*  * *    *    *         *  * *   **       * *    
*    ***  *    ***  *       *  * * ***  *    *    
*    *    *    *    *    *  *   *  *          **  
*  * *    *    *    *    *  *   *  *    *  *    * 
 **  *    **** **** ****  **    *  *     **  ***  

*/



// console.log(part2Answer);


// console.log('Master: ', masterGrid)
