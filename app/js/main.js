const imageService = require('./services/imageService');
const logService = require('./services/logService');
const canvasService = require('./services/canvasService');
const mathService = require('./services/mathService');
const interactionService = require('./services/interactionService');
const printService = require('./services/printService');

const fileSelector = document.getElementById("fileSelector");

function initialize() {
    canvasService
        .initialize()
        .then(interactionService.initialize);

    printService.initialize();

    fileSelector.onchange = (e) => {
        imageService
            .loadImage(e)
            .then(
                ({img, fileName}) => {
                    let imageData = {
                        id: fileName,
                        width: mathService.pixelsToInches(img.naturalWidth),
                        height: mathService.pixelsToInches(img.naturalHeight),
                        img,
                        x:0,
                        y:0
                    };
                    canvasService.render(imageData);
                    logService.info("Loaded Image w/dimensions " + imageData.width + " x " + imageData.height);
                },
                err => logService.error(err.message || err)
            );
    };

    logService.info('Click and Drag the image to position as desired.');
    logService.info('Scroll to scale up and down.');
}

initialize();
