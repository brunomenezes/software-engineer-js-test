const configService = require('./configService');
const {cloneDeep} = require('lodash');
const Storage = window.localStorage;
const STORAGE_KEY = getKey();
let state = {};

function getKey() {
    const config = configService.getConfig();
    return (config.storage && config.storage.key) || 'canvasApp';
}

function setState(newState) {
    Object.assign(state, newState);
}

function getState() {
    return cloneDeep(state);
}

function saveState() {
    return new Promise((resolve, reject) => {
        try {
            Storage.setItem(STORAGE_KEY,JSON.stringify(state));
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

function loadLastState() {
    return new Promise((resolve, reject) => {
        let lastState = Storage.getItem(STORAGE_KEY);
        if(!lastState) {
            reject('No previous saved description available');
        } else {
            resolve(JSON.parse(lastState));
        }
    });
}


module.exports = {setState, getState, saveState, loadLastState}