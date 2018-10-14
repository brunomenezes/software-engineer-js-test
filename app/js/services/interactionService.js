const stateService = require('./stateService');
const mathService = require('./mathService');
const canvasService = require('./canvasService');

let state = {}, isMouseDown = false, photoOriginal;

function initialize(canvas) {
    canvas.addEventListener('mousedown', mouseDownHandler);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('mouseout', mouseUpHandler);
    canvas.addEventListener('mousewheel', mouseWheelHandler);
}


function mouseWheelHandler(evt) {
    let delta = evt.deltaY ? evt.deltaY : evt.originalEvent.deltaY;
    let zoomDelta = delta <= 0 ? 1.1 : 0.9;
    let photo = stateService.getState();
    photo.width *= zoomDelta;
    photo.height *= zoomDelta;

    canvasService.render(photo);
}

function mouseMoveHandler(e) {
    if(!isMouseDown) {
        return;
    }

    updateMouseCoordinates(e);
    let dx = (e.x - state.x)/50;
    let dy = (e.y - state.y)/50;

    const photo = stateService.getState();

    photo.x = photoOriginal.x + dx;
    photo.y = photoOriginal.y + dy;
    canvasService.render(photo);
}

function mouseUpHandler(e) {
    isMouseDown = false;
    photoOriginal = null;
}

function updateMouseCoordinates(e) {
    e.originalX = e.offsetX;
    e.originalY = e.offsetY;

    e.x = mathService.pixelsToInches(e.offsetX);
    e.y = mathService.pixelsToInches(e.offsetY);
}

function mouseDownHandler(e) {
    if(isMouseDown) {
        return;
    }
    isMouseDown = true;
    photoOriginal = stateService.getState();
    updateMouseCoordinates(e);
    setupState(e);
}

function setupState(e) {
    state.x = e.x;
    state.y = e.y;
}

module.exports = {initialize};