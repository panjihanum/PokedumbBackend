'use strict'

/*
|--------------------------------------------------------------------------
| DummySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Category = use("App/Models/Category")
const Type = use("App/Models/Type")
const Pokemon = use("App/Models/Pokemon")
const User = use("App/Models/User")
const TypePokemon = use("App/Models/PokemonType")
class DummySeeder {
  async run () {

    const user1 = new User();
    user1.image_url = "luffy.png";
    user1.name = "Hanum";
    user1.username = "panji";
    user1.email = "pan.hanum@gmail.com";
    user1.password = "panji";
    // user1.confirm_password = "panji";
    user1.num_hp = "082113589617";
    user1.level = 2
    await user1.save()


    const user2 = new User();
    user2.image_url = "panjihanum.jpg"; 
    user2.name = "Panji";
    user2.username = "panjihanum";
    user2.email = "panhanum@gmail.com";
    user2.password = "panji";
    // user2.confirm_password = "panji";
    user2.num_hp = "082113589615";
    user2.level = 1
    await user2.save()



    const cat1 = new Category();
    cat1.name="Bug";
    await cat1.save();

    const cat2 = new Category();
    cat2.name="Dark";
    await cat2.save();

    const cat3 = new Category();
    cat3.name="Dragon";
    await cat3.save();

    const cat4 = new Category();
    cat4.name="Electric";
    await cat4.save();

    const cat5 = new Category();
    cat5.name="Fairy";
    await cat5.save();

    const cat6 = new Category();
    cat6.name="Fighting";
    await cat6.save();

    const cat7 = new Category();
    cat7.name="Fire";
    await cat7.save();

    const cat8 = new Category();
    cat8.name="Flying";
    await cat8.save();

    const cat9 = new Category();
    cat9.name="Ghost";
    await cat9.save();

    const cat10 = new Category();
    cat10.name="Water";
    await cat10.save();

    const cat11 = new Category();
    cat11.name="Dragon";
    await cat11.save();

    const cat12 = new Category();
    cat12.name="Ground";
    await cat12.save();

    const cat13 = new Category();
    cat13.name="Ice";
    await cat13.save();

    const type1 = new Type();
    type1.name="Bug";
    await type1.save();

    const type2 = new Type();
    type2.name="Dark";
    await type2.save();

    const type3 = new Type();
    type3.name="Dragon";
    await type3.save();

    const type4 = new Type();
    type4.name="Electric";
    await type4.save();

    const type5 = new Type();
    type5.name="Fairy";
    await type5.save();

    const type6 = new Type();
    type6.name="Fighting";
    await type6.save();

    const type7 = new Type();
    type7.name="Fire";
    await type7.save();

    const type8 = new Type();
    type8.name="Flying";
    await type8.save();

    const type9 = new Type();
    type9.name="Ghost";
    await type9.save();

    const type10 = new Type();
    type10.name="Water";
    await type10.save();

    const type11 = new Type();
    type11.name="Dragon";
    await type11.save();

    const type12 = new Type();
    type12.name="Ground";
    await type12.save();

    const type13 = new Type();
    type13.name="Ice";
    await type13.save();

    const type14 = new Type();
    type14.name="Normal";
    await type14.save();

    const type15 = new Type();
    type15.name="Poison";
    await type15.save();

    const type16 = new Type();
    type16.name="Psychic";
    await type16.save();

    const type17 = new Type();
    type17.name="Rock";
    await type17.save();

    const type18 = new Type();
    type18.name="Steel";
    await type18.save();

    const pok1 = new Pokemon();
    pok1.id = 300;
    pok1.user_id = 1;
    pok1.name = "charizard.png";
    pok1.image_url = "golduck.png";
    pok1.category_id = 3;
    pok1.latitude = "-6.2970891";
    pok1.longitude = "106.7294647";
    await pok1.save();

    const tp1 = new TypePokemon();
    tp1.pokemon_id = 300,
    tp1.type_id = 3

    await tp1.save();

    const tp2 = new TypePokemon();
    tp2.pokemon_id = 300,
    tp2.type_id = 5
    await tp2.save();

    const tp3 = new TypePokemon();
    tp3.pokemon_id = 300
    tp3.type_id = 13
    await tp3.save();



  }
}

module.exports = DummySeeder
