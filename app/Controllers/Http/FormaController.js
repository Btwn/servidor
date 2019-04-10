'use strict'
const path = require('path')
const fs = require('fs')
const Env = use('Env')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua } = require('../../Tools/Codificacion/decode')
const { PathNombreToMavi } = require('../../Tools/Path/nomenclaturaMavi')
const { listarArchivos } = require('../../Tools/Path/listarArchivos')
const rgx = require('../../Tools/RegEx/jsonRgx')
const { unirCamposConsecutivosComponente } = require('../../Tools/OperarCadenas/unirConsecutivoPorComponente')
const { extraerContenidoRecodificado } = require('../../Tools/Codificacion/contenidoRecodificado')
const { equals } = require('../../Tools/OperadorObjetos/compararObjetos')
//const { lector } = require('../../Tools/OperadorObjetos/lector')
const {lector} = require('../../Tools/Archivos/intelisis')
const I = require('../../Tools/Archivos/intelisis')
const ReadFileController = require('./ReadFileController')
const {relacion, relacionRepo} = require('../../Tools/FileSystem/relacion')


class FormaController {
	async index () {
		return lector('C:\\cadiaz\\mavi\\intelisis\\3100Capacitacion\\Reportes MAVI\\AnexoContaSAT.vis')
	}

	async name ({ request }) {
		let name = request.params.name
		let version = request.params.version

		let res = relacion(version,name)
		
		return res
	}

	async repo ({ request }) {
		let name = request.params.name
		let version = request.params.version

		let res = relacionRepo(version,name)
		
		return res
	}

	async names ({ request }) {
		let name = request.params.name
		//let ext = path.extname(name)
		//let nameExt = PathNombreToMavi(name)

		let rutas = lector(name)
		

		//return equals(rutas.orig5000, rutas.orig3100)
		let res = []
		rutas.orig3100.Forma.ListaCarpetas.forEach(item => {
			res.push({
				carpeta: item,
				vista: rutas.orig3100[item].Vista,
				campos: rutas.orig3100[item].ListaEnCaptura
			})
		})

		Array.prototype.unique=function(){
			return this.filter((a,b,c) => c.indexOf(a,b+1)<0)
		}
		
		Array.prototype.flat=function(){
			return this.reduce((a,b) => a.concat(b), [])
		}

		let vistas = res
			.map(x => x.vista)
			.unique()
			.map(x => lector(x+'.vis').orig3100.Vista.ListaTablas)
			.flat()
			.map(x => {
				let arc = lector(x+'.tbl').orig3100//.Tabla.ListaCampos
				//return arc.Tabla.ListaCampos.map(y => arc[y].AyudaVista+'.vis').filter(y => y !== 'undefined.frm')
				return arc.Tabla.ListaCampos.map(y => arc[y].AyudaForma+'.frm').filter(y => y !== 'undefined.frm')
			//	return arc
			})//.Tabla.ListaCampos)
			.flat()
			.unique()
		//return res.map(x => x.campos).flat().unique()
		return vistas
	}
}

module.exports = FormaController
