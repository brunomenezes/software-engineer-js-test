const {cloneDeep} = require('lodash');
let state = {};

function setState(newState) {
    Object.assign(state, newState);
}

function getState() {
    return cloneDeep(state);
}

module.exports = {setState, getState};