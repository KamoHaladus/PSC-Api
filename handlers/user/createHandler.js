'use strict';
const User = require('../../schemas/user');
const Validator = require('../../validators/userValidator').userValidator;

function createHandler() {
    this.handle = async (request, h) => {
        const {
            firstName,
            lastName,
            email,
            imageUrl,
            locale
        } = request.payload;

        // protected from duplication
        await new Validator().duplicateExists(email); // should replace with native validators ???

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            imageUrl: imageUrl,
            locale: locale
        });

        await User.create(newUser);
        console.log(newUser);
        return newUser;
    }
}

module.exports = {
    createUserHandle: createHandler
}