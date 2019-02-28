const fs = require('fs')
const rgx = require('../RegEx/jsonRgx')
// const {buscarDuplicado} = require('./eliminarDuplicado')
const Factory = require('../../Models/Factory')

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

const tipoArchivo = ext => {
	console.log('tipo: ', ext)
	if(ext === '.tbl') return 'Tabla'
	if(ext === '.vis') return 'Vista'
	if(ext === '.frm') return 'Forma'
	if(ext === '.rep') return 'Reporte'
	if(ext === '.dlg') return 'Dialogo'
	if(ext === '.esp') return 'Esp'
	return ''
}

const estructurar = (comp, objeto, tipo) => {
	var lista = [
		'Modulos',
		'ListaCampos',
		'SQL',
		'ListaTablas',
		'ListaEnCaptura',
		'ListaRelaciones',
		'ListaCarpetas',
		'ListaAcciones'
	]
	lista = lista.map(x => x.toLowerCase())
	console.log(tipo, comp)
	Object.keys(comp).forEach(item => {
		if(lista.includes(item.toLocaleLowerCase())){
			if(/\(Lista\)/i.test(objeto[tipo][item]) && objeto[tipo+'.'+item] !== undefined){
				// console.log(item, objeto[tipo][item])
				objeto[tipo][item] = Object.values(objeto[tipo+'.'+item]).filter(x => x !== '(Fin)')
				delete objeto[tipo+'.'+item]
			} else {
				// console.log(2, item, objeto[tipo][item])
				objeto[tipo][item] = objeto[tipo][item].split('<BR>')
			}
		}
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

module.exports.decode     = decode
module.exports.tipoArchivo= tipoArchivo
module.exports.reformar   = reformar
module.exports.unifica    = unifica
module.exports.estructurar= estructurar
