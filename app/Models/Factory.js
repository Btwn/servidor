'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Model = use('Model')
const Vista = require('./Vista')

class Factory {
	constructor(tipo) {
		if(/^Vista$/i.test(tipo)) return new Vista()
		return {}
	}
}

module.exports = Factory
