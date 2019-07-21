'use strict';
const User = require('../../schemas/user');
const Validator = require('../../validators/userValidator').userValidator;

function queryHandler() {
    this.handle = async (email) => {
        await new Validator().userExists(email);

        return User.findOne({email: email});
    }
}

module.exports = {
    userQueryHandler: queryHandler
}