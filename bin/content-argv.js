const path = require('path');
const log = require('./log.js');
const fs = require("fs");
fs.existsSync = fs.existsSync || path.existsSync;

module.exports = function(program){
    //validate argv
    if(!program.proto){
        log.error('you must write -p/--proto option to show the proto path');
        return;
    }

    let configFilePath = path.resolve(process.cwd(), program.config);
    let protoFilePath = path.resolve(process.cwd(), program.proto);

    let protoExt = path.extname(program.proto);
    if(protoExt !== '.json'){
        log.error('proto file should be json file');
        return;
    }

    if(!fs.existsSync(protoFilePath)){
        log.error('cannot find json file');
        return;
    }

    return {
        config: require(configFilePath),
        proto: JSON.parse(fs.readFileSync(protoFilePath, 'utf-8'))
    };
};