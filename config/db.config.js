"use strict";
const env = process.env.NODE_ENV || 'local';
const config = require('./local');
const mySql = require('mysql');
const e = require('express');
const { mySqlDbConnection } = require('./local');

module.exports = {
  initialize: async () => {
    poolMySql = mySql.createPool(config.mySqlDbConnection);
    console.log({ message: 'DB Pool Created', data: {} });
  },

  close: async () => {
    await PoolConnection.release();
    console.log({ message: 'DB Pool Disconnected', data: {} });
  },

  executeQuery: async (query, bindValues, options, queryName, schema, header) => {
    console.log({ message: 'Excuting function:', data: { queryName, schema } });
    let conn;
    let timeTaken;
    try {
      console.log({ message: 'connect mySql database', data: { schema } });
      console.log({ message: 'mySql database connection done', data: {} });

      const startTime = Date.now();

      console.log({ message: 'Executing query', data: { queryName, query, bindValues, options, header } });

      const result = await new Promise((resolve, reject) => {
        poolMySql.getConnection(function (err, connection) {
          poolMySql.query(query, bindValues, function (err, res) {
            connection.release();
            if (res) {
              resolve(res);
            } else {
              reject(err);
              console.log(err);
            }
          })
        })
      })

      timeTaken = `${ Date.now() - startTime } ms`;
      console.log({ message: 'Executing query', data: { queryName, query, bindValues, options, timeTaken, header } });
      return result;
    } catch (err) {
      console.log({ message: 'Executing query', data: err.message, queryName, header });
      return err;
    } finally {
      if (poolMySql) {
        try {
          console.log({ message: 'Closing Connection', data: { queryName, header } });
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
}
