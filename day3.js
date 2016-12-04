/*
--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.

Or are they?

The design document gives the side lengths of each triangle it describes, 
but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.

In a valid triangle, the sum of any two sides must be larger than the remaining side. 
For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?


*/

const fs = require('fs');
const lines = fs.readFileSync('day3.txt').toString().split("\n"); //save input lines in an array

var newArr = [];
var i,j,temparray,chunk = 1;
for (i=0,j=lines.length; i<j; i+=chunk) {
    temparray = lines.slice(i,i+chunk);
    temparray = temparray[0].trim().split(" ");
    temparray = temparray.filter(function(el){
      if(el === ""){
        return false;
      }
      return true;
    })
    temparray = temparray.map(function(el){
      return parseInt(el);
    })

    newArr.push(temparray);    
}

var demo = [5,10,25];


// [5,5,7]


function testTriangles(arr){
  var counter = 0;
  for(var i=0; i<arr.length; i++){
    if(valid(arr[i])){
      console.log('valid', arr[i]);
      counter++;
    }
  }
  return counter;
}
// valid(demo);
// console.log('arr.length', newArr.length);


// valid triangle?

function valid(tri){
  // console.log('in!', tri);

  if((tri[0] + tri[1]) > tri[2] && (tri[1] + tri[2]) > tri[0] && (tri[0] + tri[2]) > tri[1]){
    // console.log('TRUE');
    return true;
  }

  // console.log('FALSE');
  return false;
}

// console.log('newArr', newArr);

/*
--- Part Two ---

Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.

For example, given the following specification, numbers with the same hundreds digit would be part of the same triangle:


[203, 403, 603]
In your puzzle input, and instead reading by columns, how many of the listed triangles are possible?
*/

// will produce 3 arrays of the initial array, by column

var newDemo = [
[101, 301, 501],
[102, 302, 502],
[103, 303, 503],
[201, 401, 601],
[202, 402, 602],
[203, 403, 603]
]

function columnArrays(arr){
  // console.log('arr', arr);
  var bigArr = [];
  var temp1 = [];
  var temp2 = [];
  var temp3 = [];
  var counter = 0;
  for(var i=0; i < arr.length;i++){
    // console.log('arr[i]', arr.length);

    if(temp1.length > 2){
      bigArr.push(temp1);
      bigArr.push(temp2);
      bigArr.push(temp3);
      temp1 = [];
      temp2 = [];
      temp3 = [];
    }
    temp1.push(arr[i][0]);
    temp2.push(arr[i][1]);
    temp3.push(arr[i][2]);
    // console.log('TEMP 1', temp1);
    // console.log('arr after push', arr[i]);
    // counter++;
  }

    if(temp1.length > 2){
      bigArr.push(temp1);
      bigArr.push(temp2);
      bigArr.push(temp3);
    }



  return bigArr;
}

console.log(columnArrays(newArr));
var step2 = columnArrays(newArr);
console.log(testTriangles(step2));


// console.log('here:', columnArrays(newDemo));





