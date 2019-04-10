const path = require('path')
const Env = use('Env')
const I = require('../Archivos/intelisis')
const { leerArchivo } = require('../../Tools/FileSystem/procesadorArchivos')
const { decode,unifica,reformar,tipoArchivo,estructurar,continua } = require('../../Tools/Codificacion/decode')
const {desglozar} = require('../Desglouser/Utilerias/OperadorObjetos/desglozar')

const relacion = (version, name) => {
	Array.prototype.unique=function(){
		return this.filter((a,b,c) => c.indexOf(a,b+1)<0)
	}
	
	Array.prototype.flat=function(){
		return this.reduce((a,b) => a.concat(b), [])
	}

	let formaP = I.absoluto(version, name)
	//return formaP

	let carpetasCampos = formaP.Forma.ListaCarpetas
		.map(x => formaP[x].ListaEnCaptura)
		.flat()
		.unique()
		.sort()
		.filter(x => /\./gi.test(x))

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

		//return res.carpetasTablas
		//return carpetasCampos

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

	res.desglouser = desglozar(formaP, name)

	res.varDesgl = !res.desglouser["Relacion De Objs"].variables ? {} : res.desglouser["Relacion De Objs"].variables
		.split(',')
		.map(x => {
			if(variablesEsp[x] !== undefined)
				return variablesEsp[x].Forma
			else if(variables[x] !== undefined)
				return variables[x].Forma
			return undefined
		})
		.filter(Boolean)
		.map(x => x+'.frm')

	

	//return formaP
	return res//.varDesgl//.carpetasTablas
}

const relacionRepo = (version, name) => {
	Array.prototype.unique=function(){
		return this.filter((a,b,c) => c.indexOf(a,b+1)<0)
	}
	
	Array.prototype.flat=function(){
		return this.reduce((a,b) => a.concat(b), [])
	}

	let formaP = I.absoluto(version, name)
	//return formaP
	let res = {}

	res.formaPrevia = !formaP.Reporte.ConFormaPrevia === 'S' ? {} : formaP.Reporte.FormaPrevia 

	res.vistasNatural = formaP.Reporte.Vista
		// .map(x => formaP[x].Vista)
		// .unique()
		// .filter(x => x !== '(Variables)')
		// .map(x => x+'.vis')

	res.vistasEspecial = !(formaP.Reporte.VistaEspecial === 'S') ? {} : {ListaCampos:formaP.Vista.ListaCampos, SQL:formaP.Vista.SQL}
		// .map(x => formaP[x].Vista)
		// .unique()
		// .filter(x => x !== '(Variables)')
		// .map(x => x+'.vis')
	
	res.accionesFormas = formaP.Reporte.ListaAcciones
		.filter(x => formaP['Acciones.'+x].TipoAccion === 'Formas' && formaP['Acciones.'+x].Multiple !== 'S')
		// .map(x => formaP['Acciones.'+x].ClaveAccion + '.frm')
		// .flat()
		// .unique()

	res.accionesReportes = formaP.Reporte.ListaAcciones
		.filter(x => /^Reportes\s/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
		.map(x => formaP['Acciones.'+x].ClaveAccion + '.rep')
		.flat()
		.unique()

	res.accionesDialogos = formaP.Reporte.ListaAcciones
		.filter(x => /^Dialogos\s/gi.test(formaP['Acciones.'+x].TipoAccion) && formaP['Acciones.'+x].Multiple !== 'S')
		.map(x => formaP['Acciones.'+x].ClaveAccion + '.rep')
		.flat()
		.unique()
	
	res.accionesReportesMultiple = formaP.Reporte.ListaAcciones
		.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		.flat()
		.filter(x => /^Reportes\s/gi.test(x.TipoAccion))
		.map(x => x.ClaveAccion + '.rep')
		.flat()
		.unique()

	res.accionesFormasMultiple = formaP.Reporte.ListaAcciones
		.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		.flat()
		.filter(x => x.TipoAccion === 'Formas')
		.map(x => x.ClaveAccion + '.frm')
		.flat()
		.unique()

	res.accionesDialogosMultiple = formaP.Reporte.ListaAcciones
		.filter(x => formaP['Acciones.'+x].Multiple === 'S')
		.map(x => formaP['Acciones.'+x].ListaAccionesMultiples.map(y => formaP['Acciones.'+x+'.'+y]))
		.flat()
		.filter(x => x.TipoAccion === 'Dialogos')
		.map(x => x.ClaveAccion + '.dlg')
		.flat()
		.unique()


	// return res//.accionesDialogos
	return formaP
}

module.exports.relacion = relacion
module.exports.relacionRepo = relacionRepo
