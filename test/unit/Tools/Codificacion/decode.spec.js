'use strict'

const { test, trait } = use('Test/Suite')('Reformar')
const { reformar } = require('../../../../app/Tools/Codificacion/decode.js')
const ex = require('./examples')
// const germ= require('./examples/germ/objectAbcSujeridoCat.vis.js')
// const spec = require('./examples/germ/objectAbcSujeridoCat.vis.js')

// console.log(ex)
trait('Test/ApiClient')
// console.log(reformar(examples.germ['objectAbcSujeridoCat.vis']))
test('asegurarse que la reforma del objeto es correcto', async ({ assert }) => {
	// assert.deepStrictEqual(reformar(ex.Agerm),ex.Aspec)
	// assert.deepStrictEqual(reformar(ex.Bgerm),ex.Bspec)
})
