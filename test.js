

var n = 5
var z= 2
console.log(Number.isNaN(n))

Number.prototype.algo = function(p){
	return p + ' hola'
}

Number.prototype.pad = function(p){
	return p + ' hola'
}

Number.prototype.s = 'qwe'

console.log(n.algo('qwerty'))

console.log(n.s, z.s)