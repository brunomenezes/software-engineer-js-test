const config = require('../../config');
const {cloneDeep} = require('lodash');

function getConfig() {
    return config ? cloneDeep(config) : {};
}

module.exports = {getConfig};