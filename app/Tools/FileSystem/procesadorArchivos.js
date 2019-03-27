const fs = require('fs')
const path = require('path')
const { detectarCodificacion } = require('../Codificacion/procesadorCodificacion')
const Env = use('Env')
const { PathNombreToMavi } = require('../Path/nomenclaturaMavi')
const { continua, decode } = require('../Codificacion/decode')
//const I = require('../Archivos/intelisis')

/*** 
 * Crea un archivo en caso de que no exista
 * de forma contrarea, agregara el contenido al final
 * del contenido original del archivo existente
 * ***/
const agregarArchivo = (archivo, texto) => {
    fs.appendFileSync(archivo, texto, {flag:'as'})
}

/*** Crea un arhivo de forma sincrona ***/
const crearArchivo = (archivo, texto) => {
    fs.writeFileSync(archivo, texto)
}

/*** Lee un archivo de forma sincrona */
const leerArchivo = ruta => {
	ruta = path.normalize(ruta)
	fileType = fs.statSync(ruta)
	let texto = ''
	if(fileType.isFile()){
		let codificacion = detectarCodificacion(ruta)
		texto = fs.readFileSync(ruta,{encoding:codificacion}) + '\n'
		texto = texto.replace(/^;.*/gm, '')
		texto = texto.replace(/^\n[\s\t]*/gm, '')
	}
	return texto
}

const localizar = (version, nombre) => {
	let ruta = path.join(Env.get(version + '_REPO'), nombre)
	if(fs.existsSync(ruta)){
		return {
			reporte: {},
			original: continua(decode(leerArchivo(ruta))),
			nombre: nombre
		}
	} else {
		ruta = path.join(Env.get(version + '_ORIG'), nombre)
		let = nombreMavi = PathNombreToMavi(nombre)
		let rutaMavi = path.join(Env.get(version + '_REPO'), nombreMavi)
		return {
			original: continua(decode(leerArchivo(ruta))),
			reporte: fs.existsSync(rutaMavi) ? continua(decode(leerArchivo(rutaMavi))) : {},
			nombre: nombre
		}
	}
}


const leer = o => {
	return {
		nombre: o.nombre,
		codigoOriginal: 'lector(o.rutaOriginal)',
		codigoReporte: 'lector(o.rutaReporte)'
	}
}

module.exports.agregarArchivo	= agregarArchivo
module.exports.crearArchivo		= crearArchivo
module.exports.leerArchivo		= leerArchivo
module.exports.localizar		= localizar
module.exports.leer				= leer
