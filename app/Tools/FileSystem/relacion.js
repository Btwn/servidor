const path = require('path')
const Env = use('Env')
const I = require('../Archivos/intelisis')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua } = require('../../Tools/Codificacion/decode')

const relacion = (version, name) => {
	Array.prototype.unique=function(){
		return this.filter((a,b,c) => c.indexOf(a,b+1)<0)
	}
	
	Array.prototype.flat=function(){
		return this.reduce((a,b) => a.concat(b), [])
	}

	let formaP = I.absoluto(version, name)
	//return formaP
	let res = {}

	res.carpetasVistas = formaP.Forma.ListaCarpetas
		.map(x => formaP[x].Vista)
		.unique()
		.filter(x => x !== '(Variables)')
		.map(x => x+'.vis')

	res.carpetasTablas = res.carpetasVistas
		.map(x => {
			let archivo = I.absoluto(version, x)
			return archivo.Vista.ListaTablas
		})
		.filter(x => x !== undefined)
		.flat()
		.unique()
		.map(x => x+'.tbl')

	res.carpetasFormas = res.carpetasTablas
		.map(x => {
			let archivo = I.absoluto(version, x)
			let campos = archivo.Tabla.ListaCampos
			//return archivo
			return campos
				.filter(x => {
					return archivo[x].AyudaEnCaptura !== undefined && archivo[x].AyudaEnCaptura === 'Vista'
				})
				.map(x => archivo[x].AyudaForma+'.frm')
		})
		.flat()
		.unique()

	res.carpetasVistasIndependientes = res.carpetasVistas
		.filter(x => {
			let archivo = I.absoluto(version, x)
			return archivo.Vista.VistaIndependiente === 'S'
		})
		.map(x => {
			let archivo = I.absoluto(version, x)
			let campos = archivo.Vista.ListaCampos
			//return archivo
			return campos
				.filter(x => {
					return archivo[x].AyudaEnCaptura !== undefined && archivo[x].AyudaEnCaptura === 'Vista'
				})
				.map(x => archivo[x].AyudaForma+'.frm')
		})
		.flat()
		.unique()

	let rutVar = path.join(Env.get(version + '_ORIG'),'Variables.cfg')
	let variables = continua(decode(leerArchivo(rutVar)))

	let rutVarEsp = path.join(Env.get(version + '_ORIG'),'..','Variables.esp')
	let variablesEsp = continua(decode(leerArchivo(rutVarEsp)))

	res.carpetasVariables = formaP.Forma.ListaCarpetas
		.filter(x => formaP[x].Vista === '(Variables)')
		.map(x => formaP[x].ListaEnCaptura)
		.flat()
		.unique()
		.map(x => {
			if(variablesEsp[x] !== undefined)
				return variablesEsp[x].Forma
			else if(variables[x] !== undefined)
				return variables[x].Forma
			return undefined
		})
		.filter(x => x !== undefined)
		.flat()
		.unique()
		.map(x => x+'.frm')
	
	res.accionesFormas = formaP.Forma.ListaAcciones
		.filter(x => formaP['Acciones.'+x].TipoAccion === 'Formas' && formaP['Acciones.'+x].Multiple !== 'S')
		.map(x => formaP['Acciones.'+x].ClaveAccion + '.frm')
		.flat()
		.unique()

	res.accionesReportes = formaP.Forma.ListaAcciones
		.filter(x => /^Reportes\s/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
		.map(x => formaP['Acciones.'+x].ClaveAccion + '.frm')
		.flat()
		.unique()

	// res.accionesExpresion = formaP.Forma.ListaAcciones
	// 	.filter(x => /^Expresion/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
	// 	.map(x => formaP['Acciones.'+x].Expresion)//.join(''))
	// 	.filter(x => x!==undefined)
	// 	.map(x => x.join('\n'))
	// 	// .flat()
	// 	// .unique()
	
	res.accionesReportesMultiple = formaP.Forma.ListaAcciones
		.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		.flat()
		.filter(x => /^Reportes\s/gi.test(x.TipoAccion))
		.map(x => x.ClaveAccion + '.rep')
		.flat()
		.unique()

	res.accionesFormasMultiple = formaP.Forma.ListaAcciones
		.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		.flat()
		.filter(x => x.TipoAccion === 'Formas')
		.map(x => x.ClaveAccion + '.frm')
		.flat()
		.unique()

	res.desglouser = 'algo'

	//return formaP
	return res
}

module.exports.relacion = relacion
