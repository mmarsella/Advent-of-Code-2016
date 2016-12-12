/*
An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. 
An ABBA is any four-character sequence which consists of a pair of two different characters 
followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have 
an ABBA within any hypernet sequences, which are contained by square brackets.
*/
const fs = require('fs');
const lines = fs.readFileSync('day7.txt').toString().split("\n"); //save input lines in an array

// console.log('LINES :', lines);

var realDemo = 'abba[mnop]qrst';  //supported
var realDemo2 = 'ioxxoj[asdfgh]zxcvbn'; //supported
var fakeDemo = 'abcd[bddb]xyyx';  // not supported
var hardDemo = 'wysextplwqpvipxdv[srzvtwbfzqtspxnethm]syqbzgtboxxzpwr[kljvjjkjyojzrstfgrw]obdhcczonzvbfby[svotajtpttohxsh]cooktbyumlpxostt';

// [ 'wysextplwqpvipxdv[srzvtwbfzqtspxnethm]syqbzgtboxxzpwr[kljvjjkjyojzrstfgrw]obdhcczonzvbfby[svotajtpttohxsh]cooktbyumlpxostt',
//   'emzopymywhhxulxuctj[dwwvkzhoigmbmnf]nxgbgfwqvrypqxppyq[qozsihnhpztcrpbdc]rnhnakmrdcowatw[rhvchmzmyfxlolwe]uysecbspabtauvmixa',
//   'bqooxxweoytjghrqn[hkwwukixothfyglw]kpasnmikmbzcbfi[vlnyszifsaaicagxtqf]ucdyxasusefuuxlx',
//   'rxpusykufgqujfe[rypwoorxdemxffui]cvvcufcqmxoxcphp[witynplrfvquduiot]vcysdcsowcxhphp[gctucefriclxaonpwe]jdprpdvpeumrhokrcjt',
//   'iungssgfnnjlgdferc[xfffplonmzjmxkinhl]dehxdielvncdawomqk[teizynepguvtgofr]fjazkxesmlwryphifh[ppjfvfefqhmuqtdp]luopramrehtriilwlou']


//grab the brack content
// check if it has the ABBA sequence, if so, return false
// else ---> check chunks for the se-quence


//122 was too high.....

var sum = 0;
var arr = [realDemo,realDemo2,fakeDemo];

var otherSum = 0;

var hyperNetMatches = 0;

// console.log('length', lines.length);
// lines.forEach(function(el){
//   console.log('\n\n')
//   console.log('CODE: ', el)
//   sum += crackCode(el);
// })

for(var k=0; k<lines.length;k++){
  console.log('\n\n')
  console.log('CODE: ', lines[k])
  sum += crackCode(lines[k]);
}

console.log('SUM IS: ', sum);
console.log('otherSum: ', otherSum);
console.log('hyperNet Matches: ', hyperNetMatches);
console.log('length ', lines.length);

function crackCode(code){
  // var i = code.indexOf('[');
  // var j = code.indexOf(']');


  console.log('********* CODE *************')
  console.log(code);
  console.log('****************************')
  var hyperNet = code.match(/\[.*?\]/g);
  var chunks = code.split(/\[.*?\]/g);

  console.log('hyperNet: ', hyperNet);
  console.log('chunks: ', chunks);

  // console.log('^^^^^^^^^ HYPERNET TESTING ^^^^^^^^^^^^^^')
  for(var j=0; j<hyperNet.length; j++){
    if(checkSequence(hyperNet[j])){
      hyperNetMatches++;
      console.log('HYPERNET WAS A MATCH --> NOT VALID');
      return 0;
    }    
  }
  console.log('^^^^^^^^^^^^FINISH HYPERNET TESTS ^^^^^^^^^^^^^^^^^^^^')


  // iterate over each chunk, if there is a match return true
  for(var i=0; i < chunks.length; i++){
    if(checkSequence(chunks[i])){
      console.log('WORKED!');
      otherSum++;
      return 1;
    }
  }

  console.log('NOTHINNNN');
  return 0; 
}


// crackCode(hardDemo);

function checkSequence(chunk){
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
    if(temp === chunk[i]){
      console.log('A MATCH!', temp + ' & ' + chunk[i]);
      
      //now check if prev and post chars of match equal and are NOT the same char as the inner match
      if(chunk[prevCharIndex] === chunk[i + 1] && chunk[i + 1] !== chunk[i]){
        // console.log('Prev and Post MATCH', chunk[prevCharIndex], chunk[i + 1])
        matchSequence = (chunk[prevCharIndex] + (temp + chunk[i]) + chunk[i+1]);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        console.log('MATCH: ', matchSequence);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

        // return matchSequence;
        return true;
      }else{
        temp = chunk[i];
        prevCharIndex = i - 1;
      }
    }else{
      temp = chunk[i];
      prevCharIndex = i - 1;
    }
  } //end for

  console.log('*** NO MATCH **')
  return false

}

