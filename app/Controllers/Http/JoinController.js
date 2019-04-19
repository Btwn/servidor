'use strict'

class JoinController {
	async index () {
		return {
			'Inv.frm': {
				'Inv.vis': [],
				'InvD.vis': [],
				'Cte.tbl': [],
				'InvD.tbl': [],
				'Art.tbl': [],
				'ArtConDisponible.frm': ['ArtConDisponible.vis','TERMINAL'],
				'ArtInfo.frm': ['LISTA'],
				'CteEnviarALista.frm': ['LISTA'],
				'ObservacionLista.frm': ['TERMINAL'],
				'Tarea.frm': ['TERMINAL']
			}
		}
	}

	async names ({ request }) {
		let name = request.params.name

		let rutas = lector(name)

		return 'rutas'
	}
}

module.exports = JoinController
