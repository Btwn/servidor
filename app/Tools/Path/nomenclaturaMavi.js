const path = require('path')

/***
 * Función que crea una nomenclatura que se usara como nombre de archivo
 * Ejemplo: recive Archivo.frm y retorna en Archivo_FRM_MAVI.esp
 * @arreglo Contiene los nombres que seran transformados
 ***/
PathNombreToMavi = nombre => {
	return nombre.split('.').map((x,k) => k==1 ? x.toUpperCase() : x).join('_') + '_MAVI.esp'
}

PathMaviToNombre = nombre => {
	let cambio = nombre.split('_')
	cambio.pop()
	return cambio.length == 2 ? cambio.map((x,k) => k == 1 ? x.toLowerCase() : x).join('.') : nombre
}


module.exports.PathNombreToMavi = PathNombreToMavi
module.exports.PathMaviToNombre = PathMaviToNombre