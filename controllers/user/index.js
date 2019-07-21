'use strict';
const pkg = require('./package');
const CreateUserHandler = require('../../handlers/user/createHandler').createUserHandle;
const UpdateUserHandler = require('../../handlers/user/updateHandler').updateUserHandler;
const UserQueryHandler = require('../../handlers/user/queryHandler').userQueryHandler;
const Joi = require('joi');

const plugin = {
    register: (server, options) => {
        server.route({
            method: 'POST',
            path: '/users',
            config: {
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().min(1).max(255).required(),
                        lastName: Joi.string().min(1).max(255).required(),
                        email: Joi.string().min(1).max(255).email().required(),
                        imageUrl: Joi.string().min(1).max(255).required(),
                        locale: Joi.string().min(1).max(6)
                    }).options({
                        stripUnknown: true
                    }),
                    failAction: (request, h, err) => {
                        console.log(err);
                        return new Error(err);
                    }
                },

                handler: async (request, h) => await new CreateUserHandler().handle(request, h)
            }
        });

        server.route({
            method: 'PUT',
            path: '/users',
            config: {
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        firstName: Joi.string().min(1).max(255).required(),
                        lastName: Joi.string().min(1).max(255).required(),
                        email: Joi.string().min(1).max(255).email().required(),
                        imageUrl: Joi.string().min(1).max(255).required(),
                        locale: Joi.string().min(1).max(6)
                    }).options({
                        stripUnknown: true
                    }),
                    failAction: (request, h, err) => {
                        console.log(err);
                        return new Error(err);
                    }
                },
            },
            handler: async (request, h) => await new UpdateUserHandler().handle(request, h)
        });

        server.route({
            method: 'GET',
            path: '/users/{email}',
            config: {
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        email: Joi.string().min(1).max(255).email().required()
                    }).options({
                        stripUnknown: true
                    }),
                    failAction: (request, h, err) => {
                        console.log(err);
                        return new Error(err);
                    }
                }
            },
            handler: async (request, h) => await new UserQueryHandler().handle(request.params.email)
        });

    },
    name: pkg.name,
    version: pkg.version
};

module.exports = plugin;