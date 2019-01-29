const Meyo = require('./Meyo');
const pageEntryPlugin = require('./PageEntryPlugin');

module.exports = {
    meyo(options, config){
        let meyo = new Meyo({options, config});
        meyo.run();
    },
    pageEntryPlugin
};
