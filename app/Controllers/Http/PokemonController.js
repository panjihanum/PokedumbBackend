'use strict'
const Pokemon = use("App/Models/Pokemon");
const PokemonType = use("App/Models/PokemonType")
const Type = use
const {validate} = use("Validator");
const helpers = use("Helpers")
class PokemonController {
    async index({request, response, view}) {
        let pagination = request.only(
            ["page", "limit", "name_like", "category"]
        );

        const name = `%${decodeURIComponent(pagination.name_like)}%`
        const name_like = pagination.name_like
            ? name
            : `%`;
        const limit = parseInt(pagination.limit, 10) || 10;
        const page = parseInt(pagination.page, 10) || 1;

        const query = Pokemon
            .query()
            .where('name', 'LIKE', name_like)
            .with("category") 
                if (pagination.category) {
                    query.where("category_id", pagination.category)
                }
            const { type_id } = request.qs
            if (type_id) {

                const a = JSON.parse(type_id)
                query.with("type").whereHas("type", builder => {
                        return builder.whereInPivot("type_id", a)
                    })
            } else {
                query.with("type") 
                }
            const result = await query.paginate(page, limit)

        return response
            .status(200)
            .json({data: result})

    }
    async store({request, response, auth}) {
        const user = await auth.getUser()
        const rules = {
            // user_id: "required|string",
            name: "required",
            // image_url: "required",
            type_id: "required",
            category_id: "required",
            latitude: "required",
            longitude: "required"
            // file: "required|string"
        }

        const validation = await validate(request.all(), rules);
        if (validation.fails()) {
            return response
                .status(400)
                .json({status: 0, message: validation.messages()})
        }

        const coverPic = request.file("cover", {type: ["image"]})

        if (coverPic === null) {
            return response
                .status(400)
                .json({status: 1, message: "Image is required"})
        }

        let fileName = `${ "a"}${new Date().getTime()}${ ".jpg"}`;
        await coverPic.move(helpers.publicPath('uploads'), {
            name: fileName,
            overwrite: true
        })

        let pok = []
        const pokemon = new Pokemon();
        pokemon.name = request.input("name");
        pokemon.image_url = fileName;
        pokemon.user_id = user.id;
        pokemon.category_id = request.input("category_id");
        pokemon.latitude = request.input("latitude");
        pokemon.longitude = request.input("longitude");
        await pokemon.save();
        await pokemon
            .type()
            .attach(request.input("type_id"));
        pokemon.type = await pokemon
            .type()
            .fetch();
            pokemon.category = await pokemon
            .category()
            .fetch();
        // let allFiles = coverPic.all() let movedAll = coverPic.movedAll() let
        // movedList = coverPic.movedList() return { allFiles, movedAll, movedList }

        return response
            .status(200)
            .json({status: 1, data: pokemon})
    }

    async show({params, response}) {
        const pokemon = await Pokemon
            .query()
            .where("id", params.id)
            .with ("type") .with ("category") .fetch()
return response
            .status(200)
            .json({
                ...pokemon,
                status: 1
            })

    }

    async update({params, request, response, auth}) {

        const user = await auth.getUser()

        const coverPic = request.file("cover", {type: ["image"]})

        let dataPokemon = await Pokemon.find(params.id)
        if (coverPic === null) {

            dataPokemon.name = request.input("name") || dataPokemon.name;
            dataPokemon.user_id = user.id || dataPokemon.user_id;
            dataPokemon.image_url = dataPokemon.image_url;
            dataPokemon.category_id = request.input("category_id") || dataPokemon.category_id;
            dataPokemon.latitude = request.input("latitude") || dataPokemon.latitude;
            dataPokemon.longitude = request.input("longitude") || dataPokemon.longitude;
            await dataPokemon.save();
        } else {
            let fileName = `${params
                .id}${new Date()
                .getTime()}${ ".jpg"}`;
            await coverPic.move(helpers.publicPath('uploads'), {
                name: fileName,
                overwrite: true
            })
            let dataPokemon = await Pokemon.find(params.id)
            dataPokemon.name = request.input("name") || dataPokemon.name;
            dataPokemon.user_id = user.id || dataPokemon.user_id;
            dataPokemon.image_url = fileName;
            dataPokemon.category_id = request.input("category_id") || dataPokemon.category_id;
            dataPokemon.latitude = request.input("latitude") || dataPokemon.latitude;
            dataPokemon.longitude = request.input("longitude") || dataPokemon.longitude;
            await dataPokemon.save();
        }

        await dataPokemon
            .type()
            .sync(request.input("type_id"));
        dataPokemon.type = await dataPokemon
            .type()
            .fetch();
            dataPokemon.category = await dataPokemon
            .category()
            .fetch();
        return response.json({status: 1, data: dataPokemon, user: user})
    }

    async destroy({params, request, response}) {
        const pokemon = await Pokemon.find(params.id)

        if (!pokemon) {
            return response
                .status(400)
                .json({message: "Data yang anda masukkan tidak ada"})
        }

        await pokemon.delete();
        

return response
            .json({message: "Data berhasil dihapus", pokemon})
    }
}

module.exports = PokemonController
