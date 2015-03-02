for (var i = 1; i <= 3; i++) {
setTimeout(function(){ console.log(i); }, 0);
};

var start = new Date;
setTimeout(function(){
var end = new Date;
console.log('Time elapsed:', end - start, 'ms');
}, 500);
