'use strict'
const path = require('path')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/OperadoresArchivos/procesadorArchivos')
const { decode } = require('../../Tools/Codificacion/decode')

class ReadFileController {
	async index ({ request }) {
		let resultado = {}
		let archivo = request.body.nombre
		console.log(request.body)
		if(request.body.orig5000){
			let texto = leerArchivo(path.join(Env.get('5000_ORIG'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_ORIG'),archivo))
			resultado.orig5000 = deco
			console.log('orig5000')
		}
		if(request.body.repo5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_REPO'),archivo))
			resultado.repo5000 = deco
			console.log('repo5000')
		}
		if(request.body.espe5000){
			let texto = leerArchivo(path.join(Env.get('5000_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('5000_REPO'),archivo))
			resultado.espe5000 = deco
			console.log('espe5000')
		}
		if(request.body.orig3100){
			let texto = leerArchivo(path.join(Env.get('3100_ORIG'),archivo))
			let deco = decode(texto,path.join(Env.get('3100_ORIG'),archivo))
			resultado.orig3100 = deco
			console.log('orig3100')
		}
		if(request.body.repo3100){
			let texto = leerArchivo(path.join(Env.get('3100_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('3100_REPO'),archivo))
			resultado.repo3100 = deco
			console.log('repo3100')
		}
		if(request.body.espe3100){
			let texto = leerArchivo(path.join(Env.get('3100_REPO'),archivo))
			let deco = decode(texto,path.join(Env.get('3100_REPO'),archivo))
			resultado.espe3100 = deco
			console.log('espe3100')
		}

		// let rutaRepo3100 = Env.get('3100_REPO')
		// let archivo = 'RM0847MaviCredRelPedXClienteRep.rep'//	windows-1252
		// let archivo = 'MenuHerrAsignacionAvales.dlg'// UTF-8
		//ISO-8859-2|PropiedadesListaMAVI.vis
		//ISO-8859-9|RM0042MesFiltroVis.vis
		//ISO-8859-1|ActivoFArt_FRM_MAVI.esp
		// let texto = leerArchivo(path.join(rutaRepo3100,archivo))
		// let deco = decode(texto,path.join(rutaRepo3100,archivo))
		// var O5 = Env.get('5000_ORIG')
		// var files = listarArchivos(O5,['.tbl','.vis','.frm','.dlg','.rep','.esp'])
		return resultado
	}
}

module.exports = ReadFileController
