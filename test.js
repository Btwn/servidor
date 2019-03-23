const { toType, equals } = require('./app/Tools/OperadorObjetos/compararObjetos')


// $ErrorActionPreference= 'silentlycontinue'
// V:
// cd V:\Versiones\5000Capacitacion
// C:\Agente\externals\git\cmd\git pull http://$(user):$(contrasena)@mavivstf01:8080/tfs/MaviNet/_git/Intelisis5000 develop 
// $error.clear()
// echo terminado
// bppbkm7uzkm5xnsuvxim52fvy5obduznnnkj6hndhzlicsy44d6a

// $ErrorActionPreference= 'silentlycontinue'
// V:
// cd V:\Versiones\Intelisis5000
// C:\agent\externals\git\cmd\git pull http://$(user):$(contrasena)@mavivstf01:8080/tfs/MaviNet/_git/Intelisis5000 test
// $error.clear()
// echo terminado

// console.log( toType( [ 1, 2 ] ) ); // array
// console.log( toType( { foo: '1' } ) ); // object
// console.log( toType( undefined ) ); // undefined
// console.log( toType( NaN ) ); // nan
// console.log( toType( / \s+/ ) ); // regexp
// console.log( toType( 2 ) ); // regexp
// console.log( toType( 'ewr' ) ); // regexp
// console.log( toType( false ) ); // regexp

// console.log( equals( {a:'2s'}, {a:'2'} ) )
// console.log( {a:'2'} == {a:'2'} )

const fs = require('fs')
const path = require('path')
const { detectarCodificacion, recodificarArchivo } = require('./app/Tools/Codificacion/procesadorCodificacion')
const { listarArchivos } = require('./app/Tools/Path/listarArchivos')

var ruta = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Reportes MAVI/'
//var ruta = '\\\\172.16.202.39\\Versiones\\5000Capacitacion\\Reportes MAVI\\'
var files = listarArchivos(ruta)
var arr = []


//let cod = detectarCodificacion(ruta + 'RM0062FinHistorAsigUnidFrm.frm')

//console.log(cod)


files.forEach(file => {
	let cod = detectarCodificacion(ruta + file)
	//console.log(cod, file)
	if(cod !== 'Latin1'){
		console.log(cod, file)
		// let cont = fs.readFileSync(ruta + file, cod)
		// fs.writeFileSync(ruta + file, cont, {encoding:'latin1'})
		// arr.push(file)
	}

})
fs.appendFileSync('test.txt', arr)

