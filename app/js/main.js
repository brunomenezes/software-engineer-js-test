const imageService = require('./services/imageService');
const logService = require('./services/logService');
const canvasService = require('./services/canvasService');
const mathService = require('./services/mathService');
const interactionService = require('./services/interactionService');

const fileSelector = document.getElementById("fileSelector");
const generateButton = document.getElementById("generateButton");

canvasService
    .initialize()
    .then(interactionService.initialize);

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

generateButton.onclick = function (e) {
    log("GENERATE BUTTON CLICKED!! Should this do something else?");
};

logService.log("Test application ready");
