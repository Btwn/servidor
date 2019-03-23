'use strict'
const path = require('path')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua } = require('../../Tools/Codificacion/decode')
const { PathNombreToMavi } = require('../../Tools/Path/nomenclaturaMavi')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const rgx = require('../../Tools/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('../../Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('../../Tools/Codificacion/contenidoRecodificado')
const { equals } = require('../../Tools/OperadorObjetos/compararObjetos')

const lector = name => {
	let ext = path.extname(name)
	let nameExt = PathNombreToMavi(name)

	let rutas = {}
	rutas.orig5000 = listarArchivos(Env.get('5000_ORIG'),ext).filter(item => [name].indexOf(item) > -1).join('')
	rutas.repo5000 = listarArchivos(Env.get('5000_REPO'),ext).filter(item => [name].indexOf(item) > -1).join('')
	rutas.espe5000 = listarArchivos(Env.get('5000_REPO'),'.esp').filter(item => [nameExt].indexOf(item) > -1).join('')
	rutas.orig3100 = listarArchivos(Env.get('3100_ORIG'),ext).filter(item => [name].indexOf(item) > -1).join('')
	rutas.repo3100 = listarArchivos(Env.get('3100_REPO'),ext).filter(item => [name].indexOf(item) > -1).join('')
	rutas.espe3100 = listarArchivos(Env.get('3100_REPO'),'.esp').filter(item => [nameExt].indexOf(item) > -1).join('')

	rutas.orig5000 = rutas.orig5000.length > 0 ? path.join(Env.get('5000_ORIG'),name) : false
	rutas.repo5000 = rutas.repo5000.length > 0 ? path.join(Env.get('5000_REPO'),name) : false
	rutas.espe5000 = rutas.espe5000.length > 0 ? path.join(Env.get('5000_REPO'),nameExt) : false
	rutas.orig3100 = rutas.orig3100.length > 0 ? path.join(Env.get('3100_ORIG'),name) : false
	rutas.repo3100 = rutas.repo3100.length > 0 ? path.join(Env.get('3100_REPO'),name) : false
	rutas.espe3100 = rutas.espe3100.length > 0 ? path.join(Env.get('3100_REPO'),nameExt) : false

	if(rutas.orig5000) rutas.orig5000 = continua(decode(leerArchivo(rutas.orig5000)))
	if(rutas.repo5000) rutas.repo5000 = continua(decode(leerArchivo(rutas.repo5000)))
	if(rutas.espe5000) rutas.espe5000 = continua(decode(leerArchivo(rutas.espe5000)))
	if(rutas.orig3100) rutas.orig3100 = continua(decode(leerArchivo(rutas.orig3100)))
	if(rutas.repo3100) rutas.repo3100 = continua(decode(leerArchivo(rutas.repo3100)))
	if(rutas.espe3100) rutas.espe3100 = continua(decode(leerArchivo(rutas.espe3100)))

	let tipo = tipoArchivo(ext)
	// if(rutas.orig5000) rutas.orig5000 = estructurar(rutas.orig5000[tipo],rutas.orig5000,tipo)
	if(rutas.orig5000) rutas.orig5000 = estructurar(rutas.orig5000[tipo],rutas.orig5000,tipo)
	if(rutas.repo5000) rutas.repo5000 = estructurar(rutas.repo5000[tipo],rutas.repo5000,tipo)
	// if(rutas.espe5000) rutas.espe5000 = estructurar(rutas.espe5000[tipo],rutas.espe5000,tipo)
	if(rutas.orig3100) rutas.orig3100 = estructurar(rutas.orig3100[tipo],rutas.orig3100,tipo)
	if(rutas.repo3100) rutas.repo3100 = estructurar(rutas.repo3100[tipo],rutas.repo3100,tipo)
	// if(rutas.espe3100) rutas.espe3100 = estructurar(rutas.espe3100[tipo],rutas.espe3100,tipo)

	//return equals(rutas.orig5000, rutas.orig3100)
	return rutas
	
}

module.exports.lector     = lector
