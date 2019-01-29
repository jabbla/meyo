const fs = require('fs');
const Promise = require('bluebird');
const Path = require('path');
Promise.promisifyAll(fs);

const utils = {};

utils.mkdir = (function(){
    function mkdir(path, callback){
        var exists = fs.existsSync(path);
        if(exists){
            callback();
        }else{
            mkdir(Path.dirname(path), function(){
                fs.mkdirSync(path);
                callback();
            });
        }
    }
    return Promise.promisify(mkdir);
})();

utils.mustWriteFileAsync = function(path, str){
    
    return utils.mkdir(Path.dirname(path)).then(function(){
        return fs.writeFileAsync(path, str);
    });
};

utils.mergeObject = function (source1, source2, deep){
    let value = function(value1, value2){
        let val2Undefined = typeof value2 === 'undefined';
        let res = val2Undefined? value1 : value2;
        return res;
    };
    let deepAssign = (function(){
        var assignSingle = function(target, source){
            for(var key in source){
                if(typeof target[key] !== 'object' || typeof source[key] !== 'object'){
                    target[key] = value(target[key], source[key]);
                }else{
                    assignSingle(target[key], source[key]);
                }
            }
            return target;
        };
    
        return function(){
            var args = [].slice.call(arguments, 0);
            var result = args[0];
    
            args.slice(1).forEach(function(item){
                assignSingle(result, item);
            });
            return result;
        };
    })();

    return deep? deepAssign({}, source1, source2) : Object.assign({}, source1, source2);
};

module.exports = utils;