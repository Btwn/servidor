'use strict'
const fs = require('fs')
const path = require('path')

class ApiController {
	async index ({ request, response }) {
		var files = fs.readdirSync('C:/cadiaz/mavi/intelisis/5000Capacitacion/Codigo Original').filter(x => ['.tbl','.vis','.frm','.dlg','.rep','.esp'].indexOf(path.extname(x)) > -1)
		
		// var files = await fs.readdirSync('C:/cadiaz/mavi/intelisis/5000Capacitacion/Codigo Original').filter(x => ['.tbl','.vis','.frm','.dlg','.rep','.esp'].indexOf(path.extname(x)) > -1)
		return files
	}
}

module.exports = ApiController
