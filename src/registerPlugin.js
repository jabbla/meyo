module.exports = function(plugins, meyo){
    console.log(`register ${plugins.length} plugins`);
    plugins.forEach(fn => {
        fn && fn(meyo);
    });
};