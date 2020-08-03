/*
function A() {
    console.log('A');
}
*/
var A = function() { //익명함수
    console.log('A');
} 
/* JavaScript에서는 함수는 값(value)이다! */


function slowfunc(callback) {
    callback();
}

slowfunc(A);
/* slowfunc(A): slowfunc에 인자로 A를 주어 함수 호출
    인자로 받은 A를 함수 내에서 수행 > A 출력
*/