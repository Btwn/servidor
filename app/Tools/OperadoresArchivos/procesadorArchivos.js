const fs = require('fs')
const path = require('path')
const { detectarCodificacion } = require('../Codificacion/procesadorCodificacion')

/*** 
 * Crea un archivo en caso de que no exista
 * de forma contrarea, agregara el contenido al final
 * del contenido original del archivo existente
 * ***/
exports.agregarArchivo = (archivo, texto) => {
    fs.appendFileSync(archivo, texto, {flag:'as'})
}

/*** Crea un arhivo de forma sincrona ***/
exports.crearArchivo = (archivo, texto) => {
    fs.writeFileSync(archivo, texto)
}

/*** Lee un archivo de forma sincrona */
exports.leerArchivo = (archivo) => {
    fileType = fs.statSync(path.join(archivo))
	let texto = ''
	let codificacion = detectarCodificacion(path.join(archivo))
	if(fileType.isFile()){
		texto = fs.readFileSync(path.join(archivo),{encoding:codificacion}) + '\n'
		texto = texto.replace(/^;.*/gm, '')
		texto = texto.replace(/^\n[\s\t]*/gm, '')
	}
	return texto
}

