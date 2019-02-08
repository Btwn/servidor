
const fs = require('fs')
const path = require('path')
const { listarArchivos } = require('./app/Tools/OperadoresArchivos/listarArchivos')
const { leerArchivo } = require('./app/Tools/OperadoresArchivos/procesadorArchivos')
const { recodificarArchivo } = require('./app/Tools/Codificacion/procesadorCodificacion')

var O5 = 'C:/cadiaz/mavi/intelisis/3100Capacitacion/Reportes MAVI'
// var files = listarArchivos(O5,['.dlg'])

// files.forEach(file => {
	let texto = leerArchivo(path.join(O5,'MenuHerrAsignacionAvales.dlg'))
	let tex = recodificarArchivo(path.join(O5,'MenuHerrAsignacionAvales.dlg'),'latin1')
	let extracto = tex.match(/TipoDialogo=Men.*$/gim)
	console.log(extracto)
// })

// console.log(files)
