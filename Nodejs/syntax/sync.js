var fs = require('fs');

/* 동기 처리: 순차적 처리*/
// console.log('A');
// var result = fs.readFileSync('practices/sample.txt','utf8');
// console.log('result');
// console.log('C');

/* 비동기 처리: 별개의 가지를 친다고 생각  */
console.log('A');
fs.readFile('practices/sample.txt','utf8', function(err, result) {
    console.log(result);
});
console.log('C');