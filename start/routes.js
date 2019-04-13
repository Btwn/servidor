'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
	Route.get('/', 'PathController.index')
	Route.get('orig5000', 'PathController.orig5000')
	Route.get('repo5000', 'PathController.repo5000')
	Route.get('orig3100', 'PathController.orig3100')
	Route.get('repo3100', 'PathController.repo3100')
}).prefix('api/path')

Route.group(() => {
	Route.get('/', 'ReadFileController.index')
	Route.get('/:name', 'ReadFileController.name')
}).prefix('api/file')

Route.group(() => {
	Route.get('/:ruta/:name', 'ReadFileController.leer')
}).prefix('api/leer')

Route.group(() => {
	Route.get('/:ruta/:name', 'ReadFileController.juntar')
}).prefix('api/join')

Route.group(() => {
	Route.get('/', 'FormaController.index')
	Route.get('/:version/:name', 'FormaController.name')
}).prefix('api/forma')

Route.group(() => {
	Route.get('/:version/:name', 'FormaController.repo')
}).prefix('api/repo')

Route.group(() => {
	Route.get('/:version/:perfil', 'MenuController.perfil')
}).prefix('api/menu')

Route.group(() => {
	Route.get('/:version', 'EspecialController.especial')
}).prefix('api/especial')

Route.group(() => {
	Route.get('/', 'SqlController.index'),
	Route.get('/diferiencia', 'SqlController.diferiencia')
	Route.get('/:name', 'SqlController.name')
}).prefix('api/sql')

/////////////////////////////////////////////////////
Route.group(() => {
	Route.get('/:version/:file', 'JsonReadController.file')
}).prefix('json/read')

Route.any('*', ({view}) =>  view.render('welcome'))
