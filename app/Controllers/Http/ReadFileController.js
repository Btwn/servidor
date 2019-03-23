'use strict'
const path = require('path')
const fs = require('fs')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua,acomodar,filtrar } = require('../../Tools/Codificacion/decode')
const { PathNombreToMavi } = require('../../Tools/Path/nomenclaturaMavi')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const rgx = require('../../Tools/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('../../Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('../../Tools/Codificacion/contenidoRecodificado')
const { equals } = require('../../Tools/OperadorObjetos/compararObjetos')

class ReadFileController {
	async index ({ request }) {
		let resultado = {}
		let archivo = request.body.nombre
		console.log('algo')
		if(request.body.orig5000){
			let texto = leerArchivo(path.join(Env.get('5000_ORIG'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_ORIG')))
			resultado.orig5000 = deco
			console.log('orig5000')
		}
		if(request.body.repo5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_REPO')))
			resultado.repo5000 = deco
			console.log('repo5000')
		}
		if(request.body.espe5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),PathNombreToMavi(archivo)))
			let deco = decode(texto,path.join(Env.get('5000_REPO')))
			resultado.espe5000 = deco
			console.log('espe5000')
		}
		if(request.body.orig3100){
			let texto = leerArchivo(path.join(Env.get('3100_ORIG'),archivo))
			texto = rgx.Expresiones.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(fileContent)).replace(/&/g, '') +'\n'
			let deco = decode(texto,path.join(Env.get('3100_ORIG')))
			resultado.orig3100 = deco
			console.log('orig3100')
		}
		if(request.body.repo3100){
			//let texto = leerArchivo(path.join(Env.get('3100_REPO'),archivo))
			let a = path.join(Env.get('3100_REPO'),archivo)
			console.log(a)
			let texto = rgx.Expresiones.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(path.join(Env.get('3100_REPO'),archivo))).replace(/&/g, '') +'\n'
			let deco = decode(texto,path.join(Env.get('3100_REPO')))
			let une = unifica()
			resultado.repo3100 = deco
			console.log('repo3100')
		}
		if(request.body.espe3100){
			let texto = leerArchivo(path.join(Env.get('3100_REPO'),PathNombreToMavi(archivo)))
			let deco = decode(texto,path.join(Env.get('3100_REPO')))
			resultado.espe3100 = deco
			console.log('espe3100')
		}
		return resultado
	}

	async leer ({ request }) {
		let name = request.params.name
		let ruta = path.join(Env.get(request.params.ruta.toUpperCase()), name)

		let objeto
		objeto = fs.existsSync(ruta) ? continua(decode(leerArchivo(ruta))) : {}

		return objeto
	}

	async juntar ({ request }) {
		let name = request.params.name
		let ruta = request.params.ruta.match(/^\d+/gi).join()
		let nameEsp = PathNombreToMavi(name)

		let orig = this.leer({request:{params: {name: name,ruta: ruta+'_orig'}}})
		let repo = this.leer({request:{params: {name: nameEsp,ruta: ruta+'_repo'}}})
		return repo
	}

	async name ({ request }) {
		let name = request.params.name
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

		// if(rutas.orig5000) rutas.orig5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.orig5000))).replace(/&/g, '') +'\n')
		// if(rutas.repo5000) rutas.repo5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.repo5000))).replace(/&/g, '') +'\n')
		// if(rutas.espe5000) rutas.espe5000 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.espe5000))).replace(/&/g, '') +'\n')
		// if(rutas.orig3100) rutas.orig3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.orig3100))).replace(/&/g, '') +'\n')
		// if(rutas.repo3100) rutas.repo3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.repo3100))).replace(/&/g, '') +'\n')
		// if(rutas.espe3100) rutas.espe3100 = decode(rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(extraerContenidoRecodificado(rutas.espe3100))).replace(/&/g, '') +'\n')

		let tipo = tipoArchivo(ext)
		// if(rutas.orig5000) rutas.orig5000 = reformar(rutas.orig5000[tipo],rutas.orig5000,tipo)
		// if(rutas.repo5000) rutas.repo5000 = reformar(rutas.repo5000[tipo],rutas.repo5000,tipo)
		//if(rutas.espe5000) rutas.espe5000 = reformar(rutas.espe5000[tipo],rutas.espe5000,tipo)
		// if(rutas.orig3100) rutas.orig3100 = reformar(rutas.orig3100[tipo],rutas.orig3100,tipo)
		// if(rutas.repo3100) rutas.repo3100 = reformar(rutas.repo3100[tipo],rutas.repo3100,tipo)
		//if(rutas.espe3100) rutas.espe3100 = reformar(rutas.espe3100[tipo],rutas.espe3100,tipo)


		// if(rutas.orig5000) rutas.orig5000 = estructurar(rutas.orig5000[tipo],rutas.orig5000,tipo)
		if(rutas.orig5000) rutas.orig5000 = estructurar(rutas.orig5000[tipo],rutas.orig5000,tipo)
		if(rutas.repo5000) rutas.repo5000 = estructurar(rutas.repo5000[tipo],rutas.repo5000,tipo)
		// if(rutas.espe5000) rutas.espe5000 = estructurar(rutas.espe5000[tipo],rutas.espe5000,tipo)
		if(rutas.orig3100) rutas.orig3100 = estructurar(rutas.orig3100[tipo],rutas.orig3100,tipo)
		if(rutas.repo3100) rutas.repo3100 = estructurar(rutas.repo3100[tipo],rutas.repo3100,tipo)
		// if(rutas.espe3100) rutas.espe3100 = estructurar(rutas.espe3100[tipo],rutas.espe3100,tipo)


		rutas.diffOriginal = equals(rutas.orig5000, rutas.orig3100)
		// let o = reformar(rutas.orig5000[tipo],rutas.orig5000,tipo)
		return rutas
		// return rutas.orig5000
	}
}

module.exports = ReadFileController
