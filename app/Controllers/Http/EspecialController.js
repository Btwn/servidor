'use strict'
const path = require('path')
const fs = require('fs')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua } = require('../../Tools/Codificacion/decode')
const { PathNombreToMavi, PathMaviToNombre } = require('../../Tools/Path/nomenclaturaMavi')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const rgx = require('../../Tools/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('../../Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('../../Tools/Codificacion/contenidoRecodificado')
const { equals } = require('../../Tools/OperadorObjetos/compararObjetos')
//const { lector } = require('../../Tools/OperadorObjetos/lector')
const {lector, amoldar} = require('../../Tools/Archivos/intelisis')
const I = require('../../Tools/Archivos/intelisis')
const ReadFileController = require('./ReadFileController')
const {relacion, relacionRepo} = require('../../Tools/FileSystem/relacion')

class EspecialController {
	async especial ({ request }) {
		let version = request.params.version
		var archivos = listarArchivos(Env.get(version+'_REPO'),'.esp').map(x => PathMaviToNombre(x))
		var result = {
			iguales: [],
			diferentes: []
		}
		archivos = archivos.filter(x => x !== 'EliminarConta.esp' && x !== 'FechaPolizaConciliado.esp')
		archivos.forEach(arh => {
			// if (arh === 'CteLD.tbl'){
			// 	let oo3 = amoldar(path.join(Env.get('3100_ORIG'),arh))
			// 	let oo5 = amoldar(path.join(Env.get('5000_ORIG'),arh))
			// 	console.log(equals(oo3, oo5))
			// 	archivos = {oo3,oo5}
			// }

			let o3 = amoldar(path.join(Env.get('3100_ORIG'),arh))
			let o5 = amoldar(path.join(Env.get('5000_ORIG'),arh))
			if(equals(o3, o5)){
				result.iguales.push(arh)
			} else {
				result.diferentes.push(arh)
			}
		})

		return result
		return archivos
	}
}

module.exports = EspecialController
