'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArbvSchema extends Schema {
  up () {
    this.create('arbvs', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('arbvs')
  }
}

module.exports = ArbvSchema
