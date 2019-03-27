const fs = require('fs')
const path = require('path')
const rgx = require('../RegEx/jsonRgx')
// const {buscarDuplicado} = require('./eliminarDuplicado')
const Factory = require('../../Models/Factory')
const R = require('rambda')

const decode = texto => {
	let objeto = {}
	if(!rgx.Expresiones.siTieneComponente.test(texto))
		return objeto
	let componentes = texto.match(rgx.Expresiones.inComponente)
	componentes.forEach(componente => {
		let componenteTitulo = componente.match(rgx.Expresiones.siTieneComponente)
			.join().replace('[','').replace(']','')
		if(/^(\w|\().*/gm.test(componente)) {
			objeto[componenteTitulo] = {}
			let lineas = componente.match(/^(\w|\().*/gm)
			lineas.forEach(linea => {
				let campo = linea.match(/^.*?=/gm)
				campo = campo ? campo.join('').replace(/=$/gm,'').replace(/'/gm,"''") : 'NULL'
				let valor = linea.match(/(?!\w)=.*/gm)
				valor = valor ? valor.join('').replace(/^=/gm,'').replace(/'/gm,"''") : 'NULL'
				if(objeto[componenteTitulo][campo] == undefined) {
					objeto[componenteTitulo][campo] = valor.trim()
				}
			})
		}
	})
	return objeto
}

Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

const continua = objeto => {
	Object.keys(objeto).forEach(com => {
		let del = []
		Object.keys(objeto[com]).forEach(item => {
			if(/\d{3}$/gi.test(item)){
				del.push(item)
			}
			if(/<CONTINUA>$/gi.test(objeto[com][item]) && !/\d{3}$/gi.test(item)){
				let actual = item
				let proximo = item.match(/^(\w|\().+(?<!\d)/gm).join('') + 
					(!/\d{3}$/gi.test(item) ? '002' : (parseInt(item.match(/\d{3}$/gi).join(''))+1).pad(3))
				while(/<CONTINUA>$/gi.test(objeto[com][actual]) && /^<CONTINUA>/gi.test(objeto[com][proximo])){
					objeto[com][item] = objeto[com][item].replace(/<CONTINUA>$/gi,'')
					objeto[com][proximo] = objeto[com][proximo].replace(/^<CONTINUA>/gi,'')
					objeto[com][item] = objeto[com][item] + objeto[com][proximo]
					actual = proximo
					proximo = actual.match(/^(\w|\().+(?<!\d)/gm).join('') + 
						(!/\d{3}$/gi.test(actual) ? '002' : (parseInt(actual.match(/\d{3}$/gi).join(''))+1).pad(3))
				}
				objeto[com][item] = objeto[com][item].replace(/<CONTINUA>$/gi,'')
			}
		})
		del.forEach(d => delete objeto[com][d])
	})
	return objeto
}

const tipoArchivo = ext => {
	if(ext === '.tbl') return 'Tabla'
	if(ext === '.vis') return 'Vista'
	if(ext === '.frm') return 'Forma'
	if(ext === '.rep') return 'Reporte'
	if(ext === '.dlg') return 'Dialogo'
	if(ext === '.esp') return 'Esp'
	return ''
}

const lista = [
	'Modulos',
	'ListaCampos',
	'SQL',
	'ListaTablas',
	'ListaEnCaptura',
	'ListaRelaciones',
	'ListaCarpetas',
	'ListaAcciones',
	'MenuPrincipal',
	'ListaCalculados',
	'ExpresionesAlMostrar',
	'Expresion',
	'ListaRefrescar',
	'ListaOpciones',
	'LlaveLocal',
	'LlaveRemota',
	'FiltroListaEstatus',
	'ListaOrden',
	'CamposBusquedaRapida',
	'ListaCamposAValidar',
	'AntesExpresiones',
	'ValidacionTablas',
	'ActivoCondicion',
	'Comentarios',
	'ListaAccionesMultiples'
].map(x => x.toLowerCase())

const ignore = [
	'PosicionInicialIzquierda',
	'PosicionInicialArriba',
	'PosicionInicialAltura',
	'PosicionInicialAncho',
	'Icono',
	'AccionesTamanoBoton',
	'PosicionInicialAlturaCliente',
	'0','1','2'
].map(x => x.toLowerCase())

const genera = [
	'ListaCampos',
	'ListaCarpetas',
	'ListaRelaciones',
	'ListaAcciones',
	'ListaAccionesMultiples'
].map(x => x.toLowerCase())

const estructurar = (objeto) => {
	var del = []
	Object.keys(objeto).forEach(com => {
		Object.keys(objeto[com]).forEach(item => {
			if(lista.includes(item.toLocaleLowerCase())){
				if(/\(Lista\)/i.test(objeto[com][item]) && objeto[com+'.'+item] !== undefined){
					objeto[com][item] = Object.values(objeto[com+'.'+item]).filter(x => x !== '(Fin)').map(x => x.trim())
					del.push(com+'.'+item)
				} else {
					objeto[com][item] = objeto[com][item].split('<BR>').map(x => x.trim())
				}
			}
			// if(ignore.includes(item.toLowerCase())){
			// 	objeto[com][item] = 'irrelevante'
			// }
		})
	})
	del.forEach(d => {
		delete objeto[d]
	})
	return objeto
}

const filtrar = objeto => {
	return objeto
}

const acomodar = objeto => {
	// return objeto
	let o = {}
	let tipo = Object.keys(objeto)[0]
	o[tipo] = {}
	Object.keys(objeto[tipo]).forEach(item => {
			o[tipo][item] = objeto[tipo][item]
		if(lista.includes(item.toLocaleLowerCase())){
			if(/\(Lista\)/i.test(objeto[tipo][item]) && objeto[tipo+'.'+item] !== undefined){
				o[tipo][item] = Object.values(objeto[tipo+'.'+item]).filter(x => x !== '(Fin)').map(x => x.trim())
			} else {
				o[tipo][item] = objeto[tipo][item].split('<BR>').map(x => x.trim())
			}
		}
	})
	
	let lis = []
	//lis.push(tipo)
	Object.keys(o[tipo]).forEach(item => {
		if(porBase(tipo)===item){
			lis = lis.concat(o[tipo][item])
		} else if(genera.includes(item.toLowerCase())){
			let prefijo = item.replace(/Lista/gi,'')
			let arr = o[tipo][item].map(x => prefijo + '.' + x)
			lis = lis.concat(arr)
		}
	})

	lis.forEach(item => {
		o[item] = objeto[item]
	})

	lis.forEach(comp => {
		Object.keys(o[comp]).forEach(item => {
			if(lista.includes(item.toLocaleLowerCase())){
				if(/\(Lista\)/i.test(objeto[comp][item]) && objeto[comp+'.'+item] !== undefined){
					o[comp][item] = Object.values(objeto[comp+'.'+item]).filter(x => x !== '(Fin)').map(x => x.trim())
				} else {
					o[comp][item] = objeto[comp][item].split('<BR>').map(x => x.trim())
				}
			}
		})
	})

	let lis2 = []

	lis.forEach(tipo => {
		Object.keys(o[tipo]).forEach(item => {
			if(genera.includes(item.toLowerCase()) && item.toLowerCase() === 'listaaccionesmultiples'){
				o[tipo][item].forEach(x => {
					lis2 = lis2.concat(tipo+'.'+x)
				})
			}
		})
	})

	lis2.forEach(item => {
		o[item] = objeto[item]
	})

	return o
}

const reacomodar = objeto => {
	Object.keys(objeto).forEach(comp => {
		Object.keys(objeto[comp]).forEach(item => {
			if(lista.includes(item.toLocaleLowerCase()) && !Array.isArray(objeto[comp][item])){
				if(/\(Lista\)/i.test(objeto[comp][item]) && objeto[comp+'.'+item] !== undefined){
					objeto[comp][item] = Object.values(objeto[comp+'.'+item]).filter(x => x !== '(Fin)').map(x => x.trim())
				} else {
						objeto[comp][item] = objeto[comp][item].split('<BR>').map(x => x.trim())
				}
			}
		})
	})
	return objeto
}

const reformar = (comp, objeto, tipo) => {
	const Tipo = new Factory(tipo)
	let result = {}
	Object.keys(comp).forEach(item => {
		try {
			if(Tipo[item].type === undefined){
				throw `No se puede identificar el item: ${item}`
			}
			if(Tipo[item].type === 'Number'){
				result[item] = /\d*/.test(objeto[tipo][item]) ? parseInt(objeto[tipo][item]) : NaN
			}
			if(Tipo[item].type === 'String'){
				result[item] = objeto[tipo][item] !== null ? objeto[tipo][item] : ''
			}
			if(Tipo[item].type === 'Array'){
				if(/\(Lista\)/i.test(objeto[tipo][item]) && objeto['Tabla.'+item] !== undefined){
					result[item] = Object.values(objeto[tipo+'.'+item]).filter(x => x !== '(Fin)')
				} else {
					result[item] = objeto[tipo][item].split('<BR>')
				}
			}
		} catch(err){
			throw `No se puede identificar el item: ${item}`
		}
	})
	// console.log(Object.keys(objeto[tipo]))
	return result
}

const unifica = function(original,especial,nombreArchivo){
	for(comp in especial){
		var compBase = comp.split('/')[1]
		if(original[compBase] == undefined) original[compBase] = {}
		for(lin in especial[comp]){
			// console.log(comp,lin)
			if(original[compBase][lin] == especial[comp][lin])
				fs.appendFileSync('log.txt',`Estetico: en el componete: ${compBase} el campo: ${lin} y valor ya esta igual en el objeto original\n`)
			if(original[compBase][lin] == undefined)
			original[compBase][lin] = {}
			original[compBase][lin] = especial[comp][lin]
		}
		var minimo = Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x))
		minimo.forEach(min => {
			var secuencia = 2
			var siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			var actual = min
			while(/<CONTINUA>$/gm.test(original[compBase][actual]) && /^<CONTINUA>/gm.test(original[compBase][siguiente])){
				// console.log(actual,siguiente,compBase,min,/<CONTINUA>$/gm.test(original[compBase][min]))
				// console.log(/^<CONTINUA>/gm.test(original[compBase][siguiente]),actual,siguiente,compBase)
				original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'') + original[compBase][siguiente].replace(/^<CONTINUA>/gm,'')
				secuencia++
				siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			}
			original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'')
			original[compBase][min] = original[compBase][min].replace(/<BR>$/gm,'')
			// if(/<BR>/gm.test(original[compBase][min])){
			// 	original[compBase][min] = original[compBase][min].split('<BR>')
			// }
			// console.log(compBase,min,original[compBase][min])
			// console.log(original[compBase][min])
		})
		var borrar = Object.keys(original[compBase]).filter(x => /\d{3}$/gm.test(x))
		borrar.forEach(borr => delete original[compBase][borr])//console.log(borr))//original[compBase][borr]) )
		// console.log(Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x)))
	}

	for(key in original){
		for(k in original[key]){
			if(/<BR>/gm.test(original[key][k])){
				original[key][k] = original[key][k].split('<BR>')
			}
		}
	}
	var extTipo = porTipo(nombreArchivo)
	if(original[extTipo]['ListaAcciones.Cambios'] != undefined){
		if(!Array.isArray(original[extTipo]['ListaAcciones.Cambios'])){
			original[extTipo]['ListaAcciones.Cambios'] = [original[extTipo]['ListaAcciones.Cambios']]
		}
		original[extTipo]['ListaAcciones.Cambios'].forEach(x => {
			original[extTipo]['ListaAcciones'].push(x.split('<TAB>')[1])
		})
		delete original[extTipo]['ListaAcciones.Cambios']
	}

	var listaDuplicados = buscarDuplicado(original[extTipo]['ListaAcciones'])
	if(listaDuplicados.length > 0){
		listaDuplicados.forEach((x,k) => {
			fs.appendFileSync('log.txt',`Funcional: en el archivo: ${nombreArchivo} en ListaAcciones esta duplicado: ${x}\n`)
			original[extTipo]['ListaAcciones'].splice(k,1)
		})
	}

	return original
}

var porTipo = function(archivo){
	var extTipo = ''
	switch (path.extname(archivo)) {
		case '.tbl':
			extTipo = 'Tabla'
			break
		case '.vis':
			extTipo = 'Vista'
			break
		case '.frm':
			extTipo = 'Forma'
			break
		case '.rep':
			extTipo = 'Reporte'
			break
		case '.dlg':
			extTipo = 'Dialogo'
			break
		default:
			break
	}
	return extTipo
}

var porBase = function(tipo){
	var extTipo = ''
	switch (tipo) {
		case 'Tabla':
			extTipo = 'ListaCampos'
			break
		case 'Vista':
			extTipo = 'ListaCampos'
			break
		case 'Forma':
			extTipo = 'ListaCarpetas'
			break
		default:
			break
	}
	return extTipo
}

var junta = function(o) {
	original = o.original
	especial = o.reporte
	nombre = o.nombre
	let arr = Object.keys(especial)
		.filter(comp => new RegExp(`${nombre}\\/`,`gi`).test(comp))

	arr.forEach(comp => {
		//console.log(comp,original[comp]);
		if (original[comp] === undefined)
			original[comp] = {}
		try {
			Object.keys(especial[comp]).forEach(item => {
				//console.log(comp, item);
				original[comp][item] = especial[comp][item]
			})
		} catch(err) {
			let a = nombre+'/'+comp
			console.log('err', comp, a, err)
		}
	})

	return original
}

module.exports.decode     = decode
module.exports.tipoArchivo= tipoArchivo
module.exports.reformar   = reformar
module.exports.unifica    = unifica
module.exports.estructurar= estructurar
module.exports.continua   = continua
module.exports.acomodar   = acomodar
module.exports.filtrar    = filtrar
module.exports.junta      = junta
module.exports.reacomodar = reacomodar
