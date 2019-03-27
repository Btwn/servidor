// function flat(arr) {
// 	return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val), []);
// 	}

// Array.prototype.flat2 = function(arr) {
// 		return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat2(val)) : acc.concat(val), []);
// 		}
	


// var arr = [1,3,[2,4],[4,5]]
// console.log(
// flat(arr),
// arr.flat2()
// )


var arr = [
	"Art.tbl/Tabla.ListaCampos",
	"Tabla.SQL",
	"Art.tbl/EspaciosEspecificos",
	"Art.tbl/Espacios",
	"Art.tbl/Categoria",
	"Art.tbl/Capital",
	"Art.tbl/UltimoMov",
	"Art.tbl/FechaUltimoMov",
	"Art.tbl/NivelAcceso",
	"Art.tbl/Articulo",
	"Art.tbl/Grupo",
	"Art.tbl/Familia",
	"Art.tbl/Descripcion1",
	"Art.tbl/MarcaE",
	"Art.tbl/ModeloE",
	"Art.tbl/LineaE",
	"Art.tbl/NombreCorto",
	"Art.tbl/Linea",
	"Art.tbl/CtaCliente",
	"Art.tbl/TipoEntradaMavi",
	"Art.tbl/codigopadre",
	"Art.tbl/espadre",
	"Art.tbl/FechaLanzamiento",
	"Art.tbl/FechaVigencia"
	]
var name = 'Art.tbl'

const filtrar = (arr, name) => arr.filter(x =>{
	 console.log( RegExp(`^${name}\\/`,`gi`))
	 return new RegExp(`^${name}\\/`,`gi`).test(x)
})

console.log(

	filtrar(arr,name)
);