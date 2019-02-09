'use strict'

const { test, trait } = use('Test/Suite')('Path')
const { PathNombreToMavi, PathMaviToNombre } = require('../../../../app/Tools/Path/nomenclaturaMavi')

trait('Test/ApiClient')

test('cambio del nombre a la nomenclatura mavi', async ({ assert }) => {
  assert.equal(PathNombreToMavi('ABC.frm'),'ABC_FRM_MAVI.esp')
  assert.equal(PathNombreToMavi('Abc.vis'),'Abc_VIS_MAVI.esp')
  assert.equal(PathNombreToMavi('Abc.tbl'),'Abc_TBL_MAVI.esp')
})

test('cambio de la nomenclatura mavi al nombre normal', async ({ assert }) => {
  assert.equal(PathMaviToNombre('ABC_FRM_MAVI.esp'),'ABC.frm')
  assert.equal(PathMaviToNombre('Abc_VIS_MAVI.esp'),'Abc.vis')
  assert.equal(PathMaviToNombre('Abc_TBL_MAVI.esp'),'Abc.tbl')
  assert.equal(PathMaviToNombre('Abc.esp'),'Abc.esp')
  assert.equal(PathMaviToNombre('Abc_MAVI.esp'),'Abc_MAVI.esp')
})

// test('get list of posts', async ({ client }) => {
//   await Post.create({
//     title: 'Adonis 101',
//     body: 'Blog post content'
//   })

//   const response = await client.get('/posts').end()

//   response.assertStatus(200)
//   response.assertJSONSubset([{
//     title: 'Adonis 101',
//     body: 'Blog post content'
//   }])
// })
