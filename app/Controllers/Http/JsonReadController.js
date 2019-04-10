'use strict'

class JsonReadController {
	async file ({ request }) {
		let file = request.params.file
		return file
	}
}

module.exports = JsonReadController
