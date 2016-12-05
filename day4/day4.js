/*
--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, 
in order, with ties broken by alphabetization. For example:

aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
not-a-real-room-404[oarel] is a real room.
totally-real-room-200[decoy] is not.
Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?
*/


var demo = "aaaaa-bbb-za-ya-x-123[abxyz]";
var demo2 = "a-b-c-d-e-f-g-h-987[abcde]";
var demo3 = "not-a-real-room-404[oarel]";

function checkSum(code){

  var cache = {};

  var newArr = code.split("-");

  var letterChunks = newArr.slice(0,newArr.length - 1);
  var numbers = parseInt(newArr[newArr.length -1].slice(0,3));
  var key = newArr[newArr.length -1].split(numbers)[1];


  // access each chunk
  for(var i=0; i<letterChunks.length;i++){
    //access each char in chunk
    for(var j=0; j<letterChunks[i].length;j++){
      if(!cache[letterChunks[i][j]]){
        cache[letterChunks[i][j]] = 1;
      }else{
        cache[letterChunks[i][j]]++;
      }
    }
  }

  console.log('newArr: ', newArr);
  console.log('numbers: ', numbers);
  console.log('key: ', key);
  console.log('letterChunks: ', letterChunks);

  console.log('cache: ', cache);

  makeResult(cache)
};

checkSum(demo3);

/*
A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, 
in order, with ties broken by alphabetization
*/

// creates a five, most common letter result of the code using the cache
function makeResult(cache){

  
  var highestValues = [];


  //array of values
  var arr = Object.keys( cache ).map(function ( key ) { return cache[key]; });

  //sorted from highest to lowest
  var sortedArr = arr.sort().reverse();

  //loop over object
  for(key in cache){
    //compare each key against all of the values
    for(var i=0; i < sortedArr.length; i++){
      if(cache[key] === sortedArr[i]){
        if(cache[key] === sortedArr[i - 1]){}
        highestValues.push(key);
        break;
      }

    }

  }

  var ties = [];
  //check for ties

  //iterate through each high value
  for(var t=0; t < highestValues.length; t++){
    console.log('****** NOW ON', highestValues[t]);
    //check each value against the rest of the array
    console.log('j:', j);
    console.log('t:', t);


    if(t === highestValues.length - 1){
      console.log('---- LAST ONE ----');
      if(cache[highestValues[t]] === cache[highestValues[t - 1]]){
        ties.push(highestValues[t]);
        break;
      }
    }


    for(var j=t+1; j < highestValues.length ; j++){
      console.log('this:',cache[highestValues[t]])
      // if there is a match, throw it in a ties array
      if(cache[highestValues[t]] === cache[highestValues[j]]){

        //make sure its not already in the ties array
        if(ties.indexOf(highestValues[j] > -1)){
          // console.log('indexOf', ties.indexOf(highestValues[j]));
          ties.push(highestValues[t]);
          break;
        }
      }    
    }
  }


  // sort the ties
  ties.sort();


 
  

  console.log('******************************************')
  console.log('before ties: highest values', highestValues.slice(0,5));
  console.log('before ties: ties', ties.slice(0,5));
  console.log('******************************************')

  if(ties.slice(0,5) == highestValues.slice(0,5)){
    console.log('$$$$$$$$$$$$$$$$')
  }


  var match = true;
  ties.forEach(function(el,index){
    if(el != highestValues[index]){
      match = false;
    }
  })

  console.log('match?', match);


  if(!match){
    insertTies(highestValues,ties);
  }else{
    highestValues = highestValues.slice(0,5);
  }







  //insert sorted ties back into array


  console.log('highest vals: ', highestValues);
  console.log('ties', ties);

}



  // need to think of a better way to handle this

  function insertTies(highestValues, ties){

     var length = ties.length;
    // HANDLE TIES
    for(var y=0; y < highestValues.length; y++){
      for(var g=0; g < ties.length; g++){
        console.log('TIES', ties);
        console.log('highestVals[g]', highestValues[y]);
        if(highestValues[y] === ties[g]){
          console.log('splicin', ties[g]);


          for(var h=0; h<length; h++){
            highestValues.splice(highestValues.indexOf(ties[g+h]),1,ties.shift());
          }
          break;
        }
      }
    }
  }
















