/*
The format compresses a sequence of characters. Whitespace is ignored.
To indicate that some sequence should be repeated, a marker is added to the file, 
like (10x2). To decompress this marker, take the subsequent 10 characters and repeat 
them 2 times. Then, continue reading the file after the repeated data.
 The marker itself is not included in the decompressed output.

If parentheses or other characters appear within the data referenced by a marker, 
that's okay - treat it like normal data, not a marker, and then resume looking 
for markers after the decompressed section.


For example:

ADVENT contains no markers and decompresses to itself with no changes, resulting in
 a decompressed length of 6.
A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed 
length of 7.
(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed 
length of 11.
(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's 
within a data section of another marker, it is not treated any differently from the
 A that comes after it. It has a decompressed length of 6.
X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18),
 because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped
  and not processed further.
*/


var demo1 = 'ADVENT';
var demo2 = 'A(1x5)BC';
var demo3 = 'A(2x2)BCD(2x4)EFG';

function decompress(str){
  var stretch = str.match(/\(.*?\)/g)[0];  //gives first (coords)
  var coords = stretch.slice(1,-1).split('x');  // (1x2) --> [1,2]
  // [0] is how many chars to copy
  // [1] is how many times

  console.log('String: ', str)

  var start = str.indexOf(stretch);
  var end = (stretch.length + start) - 1;

  // Start the copying after the coords
  var startStretch = (end + 1);  //index to begin stretch
  console.log('startStretch', startStretch);

  // Grab everything up to where we will begin appending copies to
  var temp = str.slice(startStretch, startStretch + parseInt(coords[0]));
  console.log('temp', temp);

  var copy = str.slice(startStretch - 1, startStretch + coords[0]);
  console.log('copy', copy);

  var newStuff = '';
  // append copy to temp to the amt specified
  for(var i=0; i < coords[1]; i++){
    newStuff += temp;
  }

  console.log('temp now', temp);

};


decompress(demo2);


