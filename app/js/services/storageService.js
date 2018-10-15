const configService = require('./configService');
const Storage = window.localStorage;
const STORAGE_KEY = getKey();

function getKey() {
    const config = configService.getConfig();
    return (config.storage && config.storage.key) || 'canvasApp';
}

function save(data) {
    return new Promise((resolve, reject) => {
        try {
            Storage.setItem(STORAGE_KEY,JSON.stringify(data));
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

function loadLast() {
    return new Promise((resolve, reject) => {
        let lastState = Storage.getItem(STORAGE_KEY);
        if(!lastState) {
            reject('No previous saved description available');
        } else {
            resolve(JSON.parse(lastState));
        }
    });
}

module.exports = {save, loadLast};