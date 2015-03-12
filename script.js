var check = function(letter){
    console.log(arguments[0]);
    var strippedLetter = letter.replace(/\s/g,"").toLowerCase(),
        reversed = strippedLetter.split("").reverse().join("");
    console.log("Checking "+strippedLetter);
    console.log("against "+ reversed);
    if (reversed == strippedLetter)
        console.log("true")
    else
        console.log("false")
}

check("A nut for a jar of tuna");
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
function foo1()
{
    return {
        bar: "hello"
    };
}

function foo2()
{
    return
    {
        bar: "hello"
    };
}
console.log(foo1());
console.log(foo2());