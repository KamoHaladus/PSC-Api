'use strict';

const User = require('../schemas/user');

function userValidator() {
    this.duplicateExists = async (email) => {
        const duplicate = await User.findOne({
            email: email
        });

        if (duplicate) {
            throw new Error('użytkownik o podanym adresie email już istnieje'); // should have some file with static messaging
        }

        return false;
    }

    this.userExists = async (email) => {
        const user = await User.findOne({
            email: email
        });

        if (user) {
            return true;
        }

        throw new Error('użytkownik o podanym adresie email nie istnieje'); // should have some file with static messaging
    }
}

module.exports = {
    userValidator: userValidator
}