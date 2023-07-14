const env = process.env.NODE_ENV || 'local';
const config = require('./local');
const mySql = require('mysql');
const e = require('express');
const { mySqlDbConnection } = require('./local');

var poolMySql;
module.exports = {

    initialize: async () => {
        poolMySql = mySql.createPool(config.mySqlDbConnection);
    },

    close: async () => {
        await PoolConnection.release();
    },

    executeQuery: async (query, bindValues, options, queryName, schema, header) => {
        let conn;
        let timeTaken;
        try {

            const startTime = Date.now();

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

            timeTaken = ` ${Date.now() - startTime} ms`;
            return result;
        } catch (err) {
            return err;
        } finally {
            if (poolMySql) {
                try {
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}
