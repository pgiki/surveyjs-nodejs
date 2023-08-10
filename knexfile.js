module.exports = {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './example.db',
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys = ON', cb);
        },
      },
      migrations: {
        directory: './src/migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'surveyjs',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './src/migrations'
      }
    },
  };