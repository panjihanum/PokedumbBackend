'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pokemon extends Model {
    category(){
        return this.belongsTo("App/Models/Category")
    }
    type(){
        return this.belongsToMany("App/Models/Type").pivotTable("pokemon_types")
    }
    user(){
        return this.belongsTo("App/Models/User")
    }
}

module.exports = Pokemon
