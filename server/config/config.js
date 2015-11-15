var path = require('path');
var rootPath = path.normalize(__dirname + '/../..')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/TravelMate',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin2:123456789@ds063859.mongolab.com:63859/viware',
        port: process.env.PORT || 3030
    }
}