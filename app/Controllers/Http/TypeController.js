'use strict'

const Type = use("App/Models/Type")
class TypeController {
    async index({request, response, view}){
        const type = await Type.query()
                            .with("pokemon")
                            .fetch()
        return response.json({
            type
        })
    }
}

module.exports = TypeController
