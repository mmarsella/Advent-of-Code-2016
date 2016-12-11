const fs = require('fs');
const lines = fs.readFileSync('day6.txt').toString().split("\n").map(function(el,index){
  var arr = el.split('');
  return arr;
}); //save input lines in an array

// var demoData = lines.map(function(el,index){
//   var arr = el.split('');
//   return arr;
// })
var password = '';

var cacher = {
  0: {},
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {}
  // 8: {}
};

console.log('lines: ', lines);
// console.log('demoData: ', demoData);

// access each big array
for(var i=0; i<lines.length;i++){
  var cache = {};
  //access each char in array
  for(var j=0; j<lines[i].length;j++){

    if(!cacher[j][lines[i][j]]){
      cacher[j][lines[i][j]] = 1;
    }else{
      cacher[j][lines[i][j]]++;
    }
  }
} //end big for

// console.log('cacher: ', cacher);

  console.log('CACHER: ', cacher);


  //find highest vals

  //array of values
  for(var obj in cacher){
   
    var arr = Object.keys( cacher[obj] ).map(function ( key ) { return key; });
   

    console.log('arr', arr);

    var highestVal = cacher[obj][arr[0]]; // part 2 solution
    // var highestVal = 0; // part 1 solution
    var highKey;


    //loop through every key and grab the highest value
    for(var m=0; m < arr.length; m++){
  
        if(cacher[obj][arr[m]] < highestVal){
          highestVal = cacher[obj][arr[m]];
          // index = m;
          highKey = arr[m];
        }
    } //end for loop

    password += highKey;

    console.log('PASS', password)
  }

