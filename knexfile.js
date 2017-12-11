const knexSnakeCaseMappers = require("objection").knexSnakeCaseMappers;

// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost/postgres',
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    // Merge `postProcessResponse` and `wrapIdentifier` mappers.
    ...knexSnakeCaseMappers()
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    },
    // Merge `postProcessResponse` and `wrapIdentifier` mappers.
    ...knexSnakeCaseMappers()
  }

};
