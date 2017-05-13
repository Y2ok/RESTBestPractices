module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://Valters:root@localhost/restbestpractices_test',
        migrations: {
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds/test`
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://Valters:root@localhost/restbestpractices',
        migrations: {
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds/development`
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds/production`
        }
    }
};