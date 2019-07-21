'use strict';
const Glue = require('glue');
const Mongoose = require('mongoose');
const config = require('./app');
const Package = require('./package')

const PORT = process.env.PORT || 5000;

Mongoose
    .set('useCreateIndex', true)
    .set('useFindAndModify', false)
    .connect(config.MongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const manifest = {
    server: {
        port: PORT,
        host: 'localhost',
    },
    register: {
        plugins: [{
                plugin: './controllers/user'
            },
            {
                plugin: require('inert')
            },
            {
                plugin: require('vision')
            },
            {
                plugin: require('hapi-swagger'),
                options: {
                    info: {
                        title: 'Test API Documentation',
                        version: Package.version
                    }
                }
            }
        ]
    }
};
const options = {
    relativeTo: `${__dirname}`
};

const startServer = async () => {
    try {
        const server = await Glue.compose(manifest, options);

        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

startServer();