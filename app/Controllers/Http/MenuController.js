'use strict'
const I = require('../../Tools/Archivos/intelisis')
const {relacion, relacionRepo} = require('../../Tools/FileSystem/relacion')

class MenuController {
	async perfil ({ request }) {
		let version = request.params.version
		let perfil = request.params.perfil

		let name = 'MenuPrincipal.dlg'
		let res = I.absoluto(version, name)

		return res
	}
}

module.exports = MenuController
