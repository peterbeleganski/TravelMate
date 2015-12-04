var UsersController = require('../controllers/UsersController');
var UploadController = require('../controllers/UploadController');
var AdsController = require('../controllers/AdsController');

module.exports = {
    users: UsersController,
    upload:UploadController,
    ads:AdsController
};