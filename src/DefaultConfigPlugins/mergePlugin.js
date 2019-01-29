const utils = require('../utils');

module.exports = function(defaultConfig, userConfig){
    return utils.mergeObject(defaultConfig, userConfig, true);
};