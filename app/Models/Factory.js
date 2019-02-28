'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Model = use('Model')
const Tabla = require('./Tabla')
const Vista = require('./Vista')

class Factory {
	constructor(tipo) {
		if(/^Tabla$/i.test(tipo)) return new Tabla()
		if(/^\.tbl$/i.test(tipo)) return new Tabla()
		if(/^Vista$/i.test(tipo)) return new Vista()
		if(/^\.vis$/i.test(tipo)) return new Vista()
		return {}
	}
}

module.exports = Factory
