'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonTypeSchema extends Schema {
  up () {
    this.create('pokemon_types', (table) => {
      table.increments()
      table.integer("pokemon_id").unsigned().references("id").inTable("pokemons").onUpdate("CASCADE").onDelete("CASCADE")
      table.integer("type_id").unsigned().references("id").inTable("types").onUpdate("CASCADE").onDelete("CASCADE")
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemon_types')
  }
}

module.exports = PokemonTypeSchema
