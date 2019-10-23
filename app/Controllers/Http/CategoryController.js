'use strict'

const Category = use("App/Models/Category")
class CategoryController {
    async index({request, response, view}){
        const category = await Category.query()
                                .with("pokemon")
                                .fetch()
        return response.json({
            category
        })
    }
}

module.exports = CategoryController
