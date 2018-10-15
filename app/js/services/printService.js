const storageService = require('./storageService');
const stateService = require('./stateService');
const canvasService = require('./canvasService');
const logService = require('./logService');
const {cloneDeep} = require('lodash');

let saveBtn, importBtn;

function initialize() {
    saveBtn = document.querySelector('#saveBtn');
    importBtn = document.querySelector('#importBtn');
    addClickEvent(saveBtn, saveClickHandler);
    addClickEvent(importBtn, importClickHandler);
}


function addClickEvent(el, cb) {
    el.addEventListener('click', cb);
}

function saveClickHandler(evt) {
    evt.stopPropagation();
    const currentState = stateService.getState();
    const canvasMeasures = canvasService.getCanvasMeasure();
    currentState.img = currentState.img.src;

    const canvas = {
        ...canvasMeasures,
        photo: {
            ...currentState
        }
    };

    let printDisplay = cloneDeep(canvas);
    delete printDisplay.photo.img;

    storageService
        .save({canvas})
        .then(
            () => logService.info(`Print Description generated: <br>${JSON.stringify({ canvas:printDisplay })}`),
            err => logService.error(err.message || err)
        );
}

function importClickHandler(evt) {
    evt.stopPropagation();
    storageService
        .loadLast()
        .then(
            data => {
                let { photo } = data.canvas;
                logService.info('Importing previous print description...');
                createImageElement(photo.img)
                    .then(image => {
                       photo.img = image;
                       canvasService.render(photo);
                       logService.info(`Image ${photo.id} rendered.`);
                    });
            },
            err => logService.error(err.message || err)
        );
}

function createImageElement(urlData) {
    logService.info('loading image...');
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = urlData;
    });
}


module.exports = {initialize};