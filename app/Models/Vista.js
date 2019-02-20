'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Model = use('Model')

class Vista {
	constructor() {
		this.Icono = Number
		this.Clave = String
		this.Nombre = String
		this.Modulos = Array
		this.Singular = String
		this.VistaIndependiente = String
		this.TipoTabla = String
		this.ListaCampos = Array
		this.LlavePrimaria = String
		this.SQL = Array
	}
}

module.exports = Vista
