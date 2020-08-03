//array, object
var f = function() {
    console.log(1+1);
    console.log(1+2);
}
console.log(f); //[Function: f]
f(); // 2 3

var a = [f];
a[0](); // 2 3  *배열의 원소로서 함수가 동작함

var o =  {
    func:f
}
o.func(); // 2 3 

/* if문, while문은 값이 될 수 없음 >> 오류
var i = if (true) {
    console.log(1);
}
var w = while(true) {
    console.log(1);
}

*/