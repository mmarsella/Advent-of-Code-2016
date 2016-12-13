/*
An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. 
An ABBA is any four-character sequence which consists of a pair of two different characters 
followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have 
an ABBA within any hypernet sequences, which are contained by square brackets.
*/
const fs = require('fs');
const lines = fs.readFileSync('day7.txt').toString().split("\n"); //save input lines in an array

// Part 1 Demos
var realDemo = 'abba[mnop]qrst';  //supported
var realDemo2 = 'ioxxoj[asdfgh]zxcvbn'; //supported
var fakeDemo = 'abcd[bddb]xyyx';  // not supported
var hardDemo = 'wysextplwqpvipxdv[srzvtwbfzqtspxnethm]syqbzgtboxxzpwr[kljvjjkjyojzrstfgrw]obdhcczonzvbfby[svotajtpttohxsh]cooktbyumlpxostt';

// Part 2 Demos
var part2Demo = 'aba[bab]xyz'; //supported
var part2DemoFake = 'xyx[xyx]xyx';  //not supported
var pt2Demo = 'aaa[kek]eke'; //supported
var pt2Demo2 = 'zazbz[bzb]cdb'; //supported

//241 is too low
//359 too high


var sum = 0;
var arr = [realDemo,realDemo2,fakeDemo];
var otherSum = 0;

// crackCodePart2(part2Demo);


// var hyperNetMatches = 0;

// Run crackcode on each line
for(var k=0; k<lines.length;k++){
  console.log('\n\n')
  console.log('CODE: ', lines[k])
  sum += crackCodePart2(lines[k]);
}

console.log('SUM IS: ', sum);
console.log('otherSum: ', otherSum);
// console.log('hyperNet Matches: ', hyperNetMatches);
console.log('length ', lines.length);


/****** PART 1 SOLUTION **********/
// function crackCode(code){

//   console.log('********* CODE *************')
//   console.log(code);
//   console.log('****************************')
//   var hyperNet = code.match(/\[.*?\]/g);  //hyperNet sequences
//   var chunks = code.split(/\[.*?\]/g);  // chunks 

//   console.log('hyperNet: ', hyperNet);
//   console.log('chunks: ', chunks);

//   for(var j=0; j<hyperNet.length; j++){
//     if(checkSequence(hyperNet[j])){
//       hyperNetMatches++;
//       console.log('HYPERNET WAS A MATCH --> NOT VALID');
//       return 0;
//     }    
//   }
//   console.log('^^^^^^^^^^^^FINISH HYPERNET TESTS ^^^^^^^^^^^^^^^^^^^^')

//   // iterate over each chunk, if there is a match return true
//   for(var i=0; i < chunks.length; i++){
//     if(checkSequence(chunks[i])){
//       console.log('WORKED!');
//       otherSum++;
//       return 1;
//     }
//   }

//   console.log('NOTHINNNN');
//   return 0; 
// }

function checkSequence(chunk,arr){
  //check if there are 2 sequential chars
  // if YES:  check if the char before the pair === char after the pair
  // console.log('CHUNK IN CHECK', chunk);
  // console.log('\n\n');
  var temp = chunk[0];  //set to first char
  var prevCharIndex;
  var matchSequence = '';

  //start loop from 2nd char
  for(var i=1; i<chunk.length; i++){
      // console.log('i inside', i);

    // console.log('temp', temp);
    // console.log('chunk[i]', chunk[i]);
    
    //if there is a match
    if(temp === chunk[i+1]  && temp !== chunk[i]){     //   B  A  B 
      console.log('A MATCH!', temp + chunk[i] + chunk[i + 1]);
      

        matchSequence = temp + chunk[i] + chunk[i + 1];
        arr.push(matchSequence);
      
    }else{
      temp = chunk[i];
      // prevCharIndex = i - 1;
    }
  } //end for

  console.log('*** NO MATCH **')
  return false
}

var hyperNetMatches;
var chunkMatches;

function crackCodePart2(code){

  console.log('********* CODE *************')
  console.log(code);
  console.log('****************************')
  var hyperNet = code.match(/\[.*?\]/g);  //hyperNet sequences
  var chunks = code.split(/\[.*?\]/g);  // chunks 
  hyperNetMatches = [];
  chunkMatches = [];
  var result; 

  console.log('hyperNet: ', hyperNet);
  console.log('chunks: ', chunks);



  // Store all VALID hyperNet codes into an array
  for(var j=0; j<hyperNet.length; j++){ 
    checkSequence(hyperNet[j], hyperNetMatches);
    // if(result){
    //   // hyperNetMatches.push(result);
    //   console.log('HYPERNET WAS A MATCH: ', result);
    // }    
  }

  // Store all VALID chunks into an array
  for(var i=0; i < chunks.length; i++){
    result = checkSequence(chunks[i], chunkMatches);
    // if(result){
    //   chunkMatches.push(result);
    // }
  }

  //Check if any VALID INVERSE chunks are in the hyperNetMatches Array
  // If so --> return 1
  // If no matched --> return 0;

  console.log('NOW CHUNKMATCHES: ', chunkMatches)
  console.log('NOW hyperNetMatches: ', hyperNetMatches)

  // For each entry in hyperNetMatches 
  for(var m=0; m < hyperNetMatches.length; m++){
    //Check each entry in chunkMatches against current hyperNet match
    for(var x=0; x < chunkMatches.length; x++){
      console.log('chunkMatches[x][0]', chunkMatches[x][0])
      console.log('hyperNetMatches[m][1]', hyperNetMatches[m][1])

      console.log('chunkMatches[x][0]', chunkMatches[x][0]);
      console.log('hyperNetMatches[m][1]', hyperNetMatches[m][1]);

      if(chunkMatches[x][0] === hyperNetMatches[m][1] && chunkMatches[x][1] === hyperNetMatches[m][0]){
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log('FOUND ------------------------> ' + chunkMatches[x] + ' ' + hyperNetMatches[m]);
        return 1
      }
    }
  }
  console.log('NOTHINNNN');
  return 0; 
}



// function part2Checker(chunk){
//   var temp = chunk[0];  //set to first char
//   var prevCharIndex;
//   var matchSequence = '';

//   //start loop from 2nd char
//   for(var i=1; i<chunk.length; i++){
    
//     //if there is a match
//     if(temp === chunk[i]){
//       console.log('A MATCH!', temp + ' & ' + chunk[i]);
      
//       //now check if prev and post chars of match equal and are NOT the same char as the inner match
//       if(chunk[prevCharIndex] === chunk[i + 1] && chunk[i + 1] !== chunk[i]){
//         // console.log('Prev and Post MATCH', chunk[prevCharIndex], chunk[i + 1])
//         matchSequence = (chunk[prevCharIndex] + (temp + chunk[i]) + chunk[i+1]);
//         console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
//         console.log('MATCH: ', matchSequence);
//         console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

//         // return matchSequence;
//         return true;
//       }else{
//         temp = chunk[i];
//         prevCharIndex = i - 1;
//       }
//     }else{
//       temp = chunk[i];
//       prevCharIndex = i - 1;
//     }
//   } //end for

//   console.log('*** NO MATCH **')
//   return false
// }

