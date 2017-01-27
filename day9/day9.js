
var fs = require('fs');
var demo1 = 'ADVENT';
var demo2 = 'A(1x5)BC';
var demo3 = '(3x3)XYZ';
var demo4 = '(6x1)(1x3)AMNM<MNMS'; //(1x3)A
var demo5 = 'X(8x2)(3x3)ABCY';

var lines = fs.readFileSync('day9.txt').toString(); //save input lines in an array

console.log('lines', lines);

var process = function(input){
  var finalStr = '';
	var length = input.length;
	var tempCmd = '';
	var startCmd = false;

	
	for(var i=0; i < length; i++){

		if(input[i] === '('){
			startCmd = true;
		}

    if(startCmd){
      tempCmd += input[i];
    }else{
      finalStr += input[i]; // If not recording cmd, store the char
    }
    // Stop storing cmd and decompress
    if(input[i] === ')'){
      startCmd = false;
      var temp = tempCmd.split('');
      temp.pop();
      temp.shift();
      temp = temp.join('');
      temp = temp.split('x');


      finalStr += decompress(temp,input,i);
      tempCmd = '';
      console.log('i b4', i);
      i += (parseInt(temp[0]))
      console.log('input', input);
      console.log('i now', i);

    }
  }

  return finalStr.length;
}
var answer = process(lines);

console.log('ANSWER------------->',answer);



// only decompresses.  Takes a cmd and index
function decompress(cmd,input,index){

  var output = '';

  console.log('DECOMPRESSING************');
  console.log('cmd', cmd);
  console.log('input', input);
  console.log('index', index);

  var decompStr = input.slice(index+1,index+1+parseInt(cmd[0]))
  for(var j=0; j < parseInt(cmd[1]); j++){
    output += decompStr;
  }

  // console.log('output', output);
  return output
}
