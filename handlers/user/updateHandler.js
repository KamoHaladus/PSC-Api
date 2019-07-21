'use strict';
const User = require('../../schemas/user');
const Validator = require('../../validators/userValidator').userValidator;

function updateHandler() {
    this.handle = async (request, h) => { // should get ride off framework constraint  <- should map it ot some other object
        const {
            firstName,
            lastName,
            email,
            imageUrl
        } = request.payload;
        console.log(request.payload);
        await new Validator().userExists(email); // should replace with native mongo validator ???

        return await User.findOneAndUpdate({
            email: email
        }, {
            $set: {
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl
            }
        }, (err, doc, res) => {
            console.log(doc, res);
        }); // must validate image url to match pattern
    }
}

module.exports = {
    updateUserHandler: updateHandler
}