#!/usr/bin/env node
const program = require('commander');
const path = require('path');

program
    .version(`${require('../package.json').version}`)
    .option('-c, --config [meyoConfigFile]', 'meyo config file adress', 'meyo.config.js')
    .option('-p, --proto [protoFile]', 'proto file adress')
    .parse(process.argv);

let options = require('./content-argv')(program);

if(!options){
    return;
} 

console.log(options);

console.log('meyo');