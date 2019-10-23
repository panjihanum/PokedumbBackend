
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonSchema extends Schema {
  up () {
    this.create('pokemons', (table) => {
      table.increments()
      table.string("name").notNullable();
      table.string("image_url").notNullable();
      table.integer("category_id").unsigned().references("id").inTable("categories").onUpdate("CASCADE").onDelete("CASCADE")
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE")
      table.double("latitude").notNullable();
      table.double("longitude").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemons')
  }
}

module.exports = PokemonSchema

