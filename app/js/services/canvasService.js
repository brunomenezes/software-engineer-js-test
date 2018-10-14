const configService = require('./configService');
const stateService = require('./stateService');
const mathService = require('./mathService');
let canvas = document.querySelector('#canvasEl');
let CANVAS_W_INCHES, CANVAS_H_INCHES, SCALE, ctx;

function initialize() {
    setupMeasures();
    ctx = canvas.getContext('2d');
    canvas.setAttribute('width', mathService.inchesToPixels(applyScale(CANVAS_W_INCHES, SCALE)));
    canvas.setAttribute('height', mathService.inchesToPixels(applyScale(CANVAS_H_INCHES, SCALE)));
    return Promise.resolve(canvas);
}

function applyScale(size, scale) {
    return size * scale;
}

function setupMeasures() {
    const canvasConfig = configService.getConfig().canvas;
    CANVAS_W_INCHES = (canvasConfig && canvasConfig.width) || 15;
    CANVAS_H_INCHES = (canvasConfig && canvasConfig.height) || 10;
    SCALE = (canvasConfig && canvasConfig.scale) || 0.4;
}

function clearCanvas() {
    ctx.clearRect(0, 0, mathService.inchesToPixels(canvas.width), mathService.inchesToPixels(canvas.height));
}

function render(photo) {
    stateService.setState(photo);
    let updatedProperties = coverWholeCanvas(photo);
    const scaledProps = scaleProperties(updatedProperties, SCALE);
    clearCanvas();

    ctx.drawImage(photo.img,
        mathService.inchesToPixels(scaledProps.x),
        mathService.inchesToPixels(scaledProps.y),
        mathService.inchesToPixels(scaledProps.width),
        mathService.inchesToPixels(scaledProps.height)
    );

    stateService.setState(updatedProperties);
}

function scaleProperties(properties, scale) {
    return {
        x: applyScale(properties.x, scale),
        y: applyScale(properties.y, scale),
        width: applyScale(properties.width, scale),
        height: applyScale(properties.height, scale)
    };
}

function coverWholeCanvas({x, y, width, height}) {
    const aspectRatio = width / height;

    if (width < CANVAS_W_INCHES) {
        width = CANVAS_W_INCHES;
        height = width / aspectRatio;
    }

    if (height < CANVAS_H_INCHES) {
        height = CANVAS_H_INCHES;
        width = height * aspectRatio;
    }

    if (x > 0) x = 0;
    if (y > 0) y = 0;

    if (width - CANVAS_W_INCHES < -x) x = CANVAS_W_INCHES - width;
    if (height - CANVAS_H_INCHES < -y) y = CANVAS_H_INCHES - height;

    return { x, y, width, height };
}

function getCanvasMeasure() {
    return {
        width: CANVAS_W_INCHES,
        height: CANVAS_H_INCHES,
        scale: SCALE
    };
}

function getCanvas() {
    return canvas;
}

module.exports = {initialize, render, getCanvasMeasure, getCanvas};