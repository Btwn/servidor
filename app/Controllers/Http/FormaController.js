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
const { lector } = require('../../Tools/OperadorObjetos/lector')
//const intelisis = require()


class FormaController {
	async index () {
		return 'index'
	}

	async name ({ request }) {
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

		Array.prototype.unique=function(a){
			return function(){
				return this.filter(a)
			}
		}(function(a,b,c){
			return c.indexOf(a,b+1)<0
		});

		Array.prototype.flat=function(a){
			return function(){
				return this.reduce(a, [])
			}
		}(function(a,b){
			return a.concat(b)
		})

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
