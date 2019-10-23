'use strict'

const User = use("App/Models/User")
const { validate } = use("Validator")
const helpers = use("Helpers")
class AuthUserController {
    async login({ request, auth, response}) {

        const rules = {
            username: "required|string",
            password: "required",
        }


        const validation = await validate(request.all(), rules);
        if(validation.fails()) {
            return response
            .json({status: 0, message: validation.message});
        }


        const username = request.input("username")
        const password = request.input("password")

        if(await auth.attempt(username, password)){
            let user = await User.findBy("username", username)
            let accessToken = await auth.withRefreshToken().generate(user);
            return response.json({ status: 1, user: user, access_token: accessToken})
        }
        
    }

    async register({ request, auth, response}) {
        const rules = {
            username: "required",
            name: "required",
            email: "required",
            password: "required",
            confirm_password: "required",
            num_hp: "required"
        }

        const validation = await validate(request.all(), rules);
        if(validation.fails()) {
            return response
            .json({status: 0, message: "Validasi Gagal"});
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

        const username = request.input("username");
        const name = request.input("name");
        const email = request.input("email");
        const password = request.input("password");
        const confirm_password = request.input("confirm_password")
        const num_hp = request.input("num_hp")

        if( password !== confirm_password){
            return response
                .json({ status: 0, message: 1})
        }

        let user = new User();
        user.image_url = fileName;
        user.username = username;
        user.name= name;
        user.email = email;
        user.password = password;
        user.num_hp = num_hp;
        user.level = 1;
        await user.save();
        
        let accessToken = await auth.withRefreshToken().generate(user);
        return response.json({
            user: user,
            access_token: accessToken
        })
    }

    
    async generateRefreshToken({ request, auth, response}) {
        const rules = {
            refresh_token: "required|string"
        }
        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response
                .status(400)
                .json({ status: 0, message: validation.message() });
        }

        const refreshToken = request.input("refresh_token");
        const access_token = await auth
            .newRefreshToken()
            .generateRefreshToken(refreshToken);
        return response.send({ status: 1, access_token})
    }

    async getProfile({response, auth}) {
        return response.send({status: 1, user: auth.user})
    }
}

module.exports = AuthUserController
