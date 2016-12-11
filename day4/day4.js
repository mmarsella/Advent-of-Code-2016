
// Mark Marsella & Sam Hastings

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

const fs = require('fs');
const lines = fs.readFileSync('day4.txt').toString().split("\n"); //save input lines in an array

// var alphabet = ['a', 'b', 'c', 'd', 'e']

const letters = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";

console.log('letters---------', letters.indexOf('t'))

console.log('lines', Array.isArray(lines));


var demo = "aaaaa-bbb-za-ya-x-123[abxyz]";
var demo2 = "a-b-c-d-e-f-g-h-987[abcde]";
var demo3 = "not-a-real-room-404[oarel]";
var demo4 = "totally-real-room-200[decoy]";

// to inc. real ids
var sum = 0;

//iterate over all puzzle data
for(var g=0; g < lines.length; g++){
  // part 1
  // sum += checkSum(lines[g]);

  //part 2
  checkSum(lines[g]);
  // part2Decrypt(lines[g]);
}


console.log('THE ANSWER: ', sum);

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

  // console.log('newArr: ', newArr);
  // console.log('numbers: ', numbers);
  // console.log('key: ', key);
  // console.log('letterChunks: ', letterChunks);
  // console.log('cache: ', cache);  //result of counting chars

  // this is where we analyze the data
  var result = makeResult(cache);

  // console.log(checkAnswer(result, key));

  if(checkAnswer(result, key)){
   
    // part 1
    // return parseInt(numbers);

     // part 2
    console.log('*******************')
    part2Decrypt(code);

  }
  return 0;
};

// creates a five, most common letter result of the code using the cache
function makeResult(cache){

  
  var highestValues = [];
  

  //array of values
  var arr = Object.keys( cache ).map(function ( key ) { return key; });

  //sorted from highest to lowest
  var sortedArr = arr.sort();

  while(highestValues.length < 5){
    var highestVal = 0;
    var index;
    var highKey;
    //loop through every key and grab the highest value
    for(var i=0; i < sortedArr.length; i++){
      if(cache[sortedArr[i]] > highestVal){
        highestVal = cache[sortedArr[i]];
        index = i;
        highKey = sortedArr[i];
      }
    } //end for loop

    highestValues.push(highKey); // add highVal to array
    sortedArr.splice(index, 1); //remove where the highestVal was from the sortedArr
  }


  return highestValues;

}

function checkAnswer(result, key){
  result.unshift('[');
  result.push(']');
  result = result.join("")

  return (result == key);
}



// decrpyt each code before checking sum
function part2Decrypt(code){
  var newArr = code.split("-");
  var letterChunks = newArr.slice(0,newArr.length - 1);
  var numbers = parseInt(newArr[newArr.length -1].slice(0,3));
  var key = newArr[newArr.length -1].split(numbers)[1];
  var modifyArr = [];

  // access each chunk
  for(var i=0; i<letterChunks.length;i++){
    //access each char in chunk
    var newChunk = "";
    for(var j=0; j<letterChunks[i].length;j++){
      // console.log('letChunk', letterChunks[i][j]) // a letter

      // Index of current char in alphabet and increment the sector id % alphabet's length
     newChunk += letters[letters.indexOf(letterChunks[i][j]) + (numbers % 26)]
    }
    modifyArr.push(newChunk);
  } 

  console.log('NEW ARR: ', modifyArr +  "--> " + numbers);

  return modifyArr;
}

// var newDemo = 'qzmt-zixmtkozy-ivhz-343';
// part2Decrypt(newDemo);








