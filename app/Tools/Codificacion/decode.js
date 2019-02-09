const fs = require('fs')
const {Expresiones} = require('../RegEx/jsonRgx')
// const {buscarDuplicado} = require('./eliminarDuplicado')

exports.decode = (texto,ruta) => {
	let objeto = {}
	if(Expresiones.siTieneComponente.test(texto)) {

		let componentes = texto.match(Expresiones.inComponente)

		componentes.forEach(componente => {

			let componenteTitulo = componente.match(
				Expresiones.siTieneComponente
				).join().replace('[','').replace(']','')

			if(/^(\w|\().*/gm.test(componente)) {

				if(objeto[componenteTitulo] != undefined) {
				
					fs.appendFileSync('log.txt',`Funcional:
						el componente: ${componenteTitulo}
						esta repetido en al archivo: ${ruta}\n`
					)
				}

				objeto[componenteTitulo] = {}

				let lineas = componente.match(/^(\w|\().*/gm)

				lineas.forEach(linea => {

					let campo = linea.match(/^.*?=/gm)

					campo = campo ? campo.join('').replace(
						/=$/gm,'').replace(/'/gm,"''") : 'NULL'

					let valor = linea.match(/(?!\w)=.*/gm)

					valor = valor ? valor.join('').replace(
						/^=/gm,'').replace(/'/gm,"''") : 'NULL'

					if(objeto[componenteTitulo][campo] == undefined) {

						objeto[componenteTitulo][campo] = valor.trim()
					} else {
						fs.appendFileSync('log.txt',`Funcional: el campo: 
							${campo} esta repetido en el componete 
							${componenteTitulo} del archivo: ${ruta}\n`
						)
					}
					// si se repite un campo en un mismmo comonente debe de tomar el primero
				})
			} else {
				fs.appendFileSync('log.txt',`Funcional: el componente:
					${componenteTitulo} esta vacio en al archivo: ${ruta}\n`
				)
				// Si el componete esta vasio, intelisis lo ignora
			}
		})
	} else {
		fs.appendFileSync('log.txt',`Funcional: el archivo: ${ruta} no tiene componentes\n`)
		// archivo vacio
	}

	return objeto
}