/**
 * Created by aresn on 16/5/11.
 */

var env = require('./env');

var config = {
};

if (env == 'development') {
    // DB
    config.db = {
        name: 'sequelizeDemo',
        host: 'localhost',
        user: 'root',
        passwd: '123456',
        port: 3306
    };
} else if (env == 'production') {

    config.db = {
        name: 'sequelizeDemo',
        host: 'localhost',
        user: 'root',
        passwd: '123456',
        port: 3306
    };
}

module.exports = config;
