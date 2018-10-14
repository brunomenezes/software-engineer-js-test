const configService = require('./configService');
const mathService = require('./mathService');
let canvas = document.querySelector('#canvasEl');
let CANVAS_W_INCHES, CANVAS_H_INCHES, SCALE, ctx;

function initialize() {
    setupMeasures();
    ctx = canvas.getContext('2d');
    canvas.setAttribute('width', mathService.inchesToPixels(applyScale(CANVAS_W_INCHES, SCALE)));
    canvas.setAttribute('height', mathService.inchesToPixels(applyScale(CANVAS_H_INCHES, SCALE)));
}

function applyScale(size, scale) {
    return size * scale;
}

function setupMeasures() {
    const canvasConfig = configService.getConfig().canvas;
    CANVAS_W_INCHES = (canvasConfig && canvasConfig.width) || 15;
    CANVAS_H_INCHES = (canvasConfig && canvasConfig.height) || 10;
    SCALE = (canvasConfig && canvasConfig.scale) || 0.33;
}

function clearCanvas() {
    ctx.clearRect(0, 0, mathService.inchesToPixels(canvas.width), mathService.inchesToPixels(canvas.height));
}

function render(state) {
    const photo = state.photo;
    clearCanvas();
    ctx.drawImage(photo.img,
        mathService.inchesToPixels(photo.x),
        mathService.inchesToPixels(photo.y),
        mathService.inchesToPixels(photo.width),
        mathService.inchesToPixels(photo.height)
    );
}

function getCanvasMeasure() {
    return {
        width: CANVAS_W_INCHES,
        height: CANVAS_H_INCHES,
        scale: SCALE
    };
}


module.exports = {initialize, render, getCanvasMeasure};