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
const {relacion} = require('../../Tools/FileSystem/relacion')


class FormaController {
	async index () {
		return lector('C:\\cadiaz\\mavi\\intelisis\\3100Capacitacion\\Reportes MAVI\\AnexoContaSAT.vis')
	}

	async name ({ request }) {
		let name = request.params.name
		let version = request.params.version

		let res = relacion(version,name)
		
		return res.desglouser
		// Array.prototype.unique=function(){
		// 	return this.filter((a,b,c) => c.indexOf(a,b+1)<0)
		// }
		
		// Array.prototype.flat=function(){
		// 	return this.reduce((a,b) => a.concat(b), [])
		// }

		// let formaP = I.absoluto(version, name)
		// //return formaP
		// let res = {}

		// res.carpetasVistas = formaP.Forma.ListaCarpetas
		// 	.map(x => formaP[x].Vista)
		// 	.unique()
		// 	.filter(x => x !== '(Variables)')
		// 	.map(x => x+'.vis')

		// res.carpetasTablas = res.carpetasVistas
		// 	.map(x => {
		// 		let archivo = I.absoluto(version, x)
		// 		return archivo.Vista.ListaTablas
		// 	})
		// 	.filter(x => x !== undefined)
		// 	.flat()
		// 	.unique()
		// 	.map(x => x+'.tbl')

		// res.carpetasFormas = res.carpetasTablas
		// 	.map(x => {
		// 		let archivo = I.absoluto(version, x)
		// 		let campos = archivo.Tabla.ListaCampos
		// 		//return archivo
		// 		return campos
		// 			.filter(x => {
		// 				return archivo[x].AyudaEnCaptura !== undefined && archivo[x].AyudaEnCaptura === 'Vista'
		// 			})
		// 			.map(x => archivo[x].AyudaForma+'.frm')
		// 	})
		// 	.flat()
		// 	.unique()

		// res.carpetasVistasIndependientes = res.carpetasVistas
		// 	.filter(x => {
		// 		let archivo = I.absoluto(version, x)
		// 		return archivo.Vista.VistaIndependiente === 'S'
		// 	})
		// 	.map(x => {
		// 		let archivo = I.absoluto(version, x)
		// 		let campos = archivo.Vista.ListaCampos
		// 		//return archivo
		// 		return campos
		// 			.filter(x => {
		// 				return archivo[x].AyudaEnCaptura !== undefined && archivo[x].AyudaEnCaptura === 'Vista'
		// 			})
		// 			.map(x => archivo[x].AyudaForma+'.frm')
		// 	})
		// 	.flat()
		// 	.unique()

		// let rutVar = path.join(Env.get(version + '_ORIG'),'Variables.cfg')
		// let variables = continua(decode(leerArchivo(rutVar)))

		// let rutVarEsp = path.join(Env.get(version + '_ORIG'),'..','Variables.esp')
		// let variablesEsp = continua(decode(leerArchivo(rutVarEsp)))

		// res.carpetasVariables = formaP.Forma.ListaCarpetas
		// 	.filter(x => formaP[x].Vista === '(Variables)')
		// 	.map(x => formaP[x].ListaEnCaptura)
		// 	.flat()
		// 	.unique()
		// 	.map(x => {
		// 		if(variablesEsp[x] !== undefined)
		// 			return variablesEsp[x].Forma
		// 		else if(variables[x] !== undefined)
		// 			return variables[x].Forma
		// 		return undefined
		// 	})
		// 	.filter(x => x !== undefined)
		// 	.flat()
		// 	.unique()
		// 	.map(x => x+'.frm')
		
		// res.accionesFormas = formaP.Forma.ListaAcciones
		// 	.filter(x => formaP['Acciones.'+x].TipoAccion === 'Formas' && formaP['Acciones.'+x].Multiple !== 'S')
		// 	.map(x => formaP['Acciones.'+x].ClaveAccion + '.frm')
		// 	.flat()
		// 	.unique()

		// res.accionesReportes = formaP.Forma.ListaAcciones
		// 	.filter(x => /^Reportes\s/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
		// 	.map(x => formaP['Acciones.'+x].ClaveAccion + '.frm')
		// 	.flat()
		// 	.unique()

		// // res.accionesExpresion = formaP.Forma.ListaAcciones
		// // 	.filter(x => /^Expresion/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
		// // 	.map(x => formaP['Acciones.'+x].Expresion)//.join(''))
		// // 	.filter(x => x!==undefined)
		// // 	.map(x => x.join('\n'))
		// // 	// .flat()
		// // 	// .unique()
		
		// res.accionesReportesMultiple = formaP.Forma.ListaAcciones
		// 	.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		// 	.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		// 	.flat()
		// 	.filter(x => /^Reportes\s/gi.test(x.TipoAccion))
		// 	.map(x => x.ClaveAccion + '.rep')
		// 	.flat()
		// 	.unique()

		// res.accionesFormasMultiple = formaP.Forma.ListaAcciones
		// 	.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		// 	.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		// 	.flat()
		// 	.filter(x => x.TipoAccion === 'Formas')
		// 	.map(x => x.ClaveAccion + '.frm')
		// 	.flat()
		// 	.unique()

		// //return formaP
		// return res.carpetasVariables
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
