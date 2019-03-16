const R = require('ramda')

var valor = 2

function addOne(value){
	return typeof(value) === "number" ? value + 1 : parseInt(value) + 1
}

console.log(addOne(valor))
console.log(addOne('2'))
console.log(addOne([5,2]))

var result = addOne(valor)
console.log(result)
result += addOne('2')
console.log(result)
result += addOne('a')
console.log(result)
result += addOne(2)
console.log(result)

var Functor = function(value) {
	this._value = value
}

Functor.of = function(value) {
	return new Functor(value)
}

Functor.prototype.map = function(fn) {
	return Functor.of( fn(this._value) )
}

Functor.of(2).map(addOne).map(addOne).map(console.log)

// Functor.of('Los functores son geniales')
// 	.map(R.replace('geniales','copados'))
// 	.map(R.toUpper)
// 	.map(R.split(' '))
// 	.map(R.last)
// 	.map(console.log)