
const Promise = require('bluebird');
const fs = require('fs');
const Path = require('path');
const compiler = require('./compiler');
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

function renderTemplateWithData(templateStr, data){
    let res = templateStr;

    for(let key in data){
        let pattern = new RegExp(`##{{${key}}}##`, 'g');
        res = res.replace(pattern, data[key]);
    }

    return res;
}

function getPageFtl({ftlTemplatePath, proto}){
    let ftlStr = fs.readFileSync(ftlTemplatePath, {encoding: 'utf-8'});
    ftlStr = renderTemplateWithData(ftlStr, proto.config);
    return ftlStr;
}

module.exports = function(pluginConfig){
    let { input: { ftlTemplatePath, entryJsTemplatePath, pageConfigTemplatePath }, output } = pluginConfig;
     
    return function(meyo){
        const { walker } = meyo;
        let outputPageRootPath;

        meyo.hooks.walkerRun.tap('PageFtlPlugin', (walker) => {
            walker.hooks['enter-pageProto'].tap('PageFtlPlugin', (proto) => {
                // generate page-ftl file
                let ftlStr = getPageFtl({ftlTemplatePath, proto});
                let outputPath = renderTemplateWithData(output.ftlPath, proto.config);

                utils.mustWriteFileAsync(outputPath, ftlStr);

                // generate page-entry file
                let entryJsStr = fs.readFileSync(entryJsTemplatePath, {encoding: 'utf-8'});
                let outputEntryPath = renderTemplateWithData(output.entryJsPath, proto.config);

                utils.mustWriteFileAsync(outputEntryPath, entryJsStr);

                //generate page-style file
                outputPageRootPath = renderTemplateWithData(output.pageRoot, proto.config);
                utils.mustWriteFileAsync(Path.resolve(outputPageRootPath, './index.mcss'));

                // generate page-config file
                let pageConfigStr = fs.readFileSync(pageConfigTemplatePath, {encoding: 'utf-8'});
                let outputConfigPath = renderTemplateWithData(output.pageConfigPath, proto.config);
                utils.mustWriteFileAsync(outputConfigPath, pageConfigStr);

            });
            
            walker.hooks['leave-pageProto'].tap('PageFtlPlugin', (proto) => {
                console.log(proto);
            });
            
            walker.hooks['enter-pageRoot-elementProto'].tap('PageRootPlugin', (proto) => {
                let complation = new compiler(proto);
                // generate 
                let { template } = complation.run();

                utils.mustWriteFileAsync(Path.resolve(outputPageRootPath, './app/app.html'), template);
                console.log();
                // generate page-root-component dri
            });
        });
    }
};