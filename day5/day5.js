const md5 = require('md5-hex');

// Puzzle Input -- uqwqemis

var password = '';
var passwordObj = {};  //for part 2

// keep incrementing counter and md5 key + counter
// if md5(key+counter) has 5 0's at beginning, append to password
// when password length is 8, stop counting.

var counter = 0;
var temp;
var key;
var part2Counter = 0;
// run 8 times
while(part2Counter < 8){
  var found = false;

  while(!found){
    counter++;
    temp = 'uqwqemis' + counter;
    key = md5(temp);
    if(key.slice(0,5) === '00000'){
      found = !found;
      console.log('Found: ', key);

      //ignore invalid positions
      // non-integer, > 7, already filled

      if(!isNaN(key[5]) && key[5] <= 7 && !passwordObj[key[5]]){
        console.log('VALID!', key)

        console.log('passwordObj: ', passwordObj);
        passwordObj[key[5]] = key[6];
        part2Counter++;

        console.log('passwordObj after insert: ', passwordObj);
      }

      // part 1 solution
      // password += key[5]
    }
  }
}

for(var objKey in passwordObj){
  console.log('adding to pass: ', passwordObj[objKey]);
  password += passwordObj[objKey]
}


console.log('PASSWORD IS: ', password);

