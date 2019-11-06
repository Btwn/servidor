const path = require('path')

/***
 * Función que crea una nomenclatura que se usara como nombre de archivo
 * Ejemplo: recive Archivo.frm y retorna en Archivo_FRM_MAVI.esp
 * @param {string} nombre Contiene los nombres que seran transformados
 * @return {string}
 ***/
PathNombreToMavi = nombre => {
	return nombre.split('.').map((x,k) => k==1 ? x.toUpperCase() : x).join('_') + '_COMER.esp'
}

/***
 * Función que toma la nomenclatura de nombrea de archivos y lo reconstruye al nombre original
 * Ejemplo: recive Archivo_FRM_MAVI.esp y retorna en Archivo.frm
 * @param {string} nombre Contiene los nombres que seran transformados
 * @return {string}
 ***/
PathMaviToNombre = nombre => {
	let cambio = nombre.split('_')
	cambio.pop()
	var ind = cambio.length - 1
	return cambio.length > 1 && (['frm','vis','tbl','rep','dlg'].indexOf(cambio[ind].toLowerCase()) > -1) ? cambio.map((x,k) => k == ind ? x.toLowerCase() : x).reduce((x,y,k) => k===ind ? x+'.'+y : x+'_'+y) : nombre
}


module.exports.PathNombreToMavi = PathNombreToMavi
module.exports.PathMaviToNombre = PathMaviToNombre