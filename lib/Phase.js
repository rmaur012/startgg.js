'use strict';

let log = require('winston');
let format = require('util').format;
let moment = require('moment-timezone');
let request  = require('request-promise');
let Cache = require('./util/Cache').getInstance();
let EventEmitter = require('events');

class Phase extends EventEmitter{

    constructor(){
        
    }

    loadData(data){
        this.data = data;
    }
}

module.exports = Phase;