var demo1 = 'ADVENT';
var demo2 = 'A(1x5)BC';
var demo3 = '(3x3)XYZ';

var demo4 = '(6x1)(1x3)AMNM<MNMS'; //(1x3)A



var demo5 = 'X(8x2)(3x3)ABCY';

// var transform = code.match(/\(.*?\)/g);

//Check for a ( and ).  Store instructions in a temp.
// Then ren decompress after ')'.  Keep track of index


function process(input){
	var length = input.length;
	var tempCmd = '';
	var startCmd = false;
	
	for(var i=0; i < length; i++){
		console.log(input[i]);

		if(input[i] === '('){
			startCmd = true;
		}

		if(startCmd){
			tempCmd += input[i];
		}

		if(input[i] === ')'){
			startCmd = false;
		}




	}
}

process(demo4);

// only decompresses.  Takes a cmd and index
function decompress(cmd,ind){


}