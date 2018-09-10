const chalk = require('chalk');
const log = console.log;

module.exports = {
    error(text){
        console.log(chalk.red(text));
    },
    info(text){
        log(chalk.green(text))
    }
};