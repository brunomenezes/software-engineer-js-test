const imageService = require('./services/imageService');
const logService = require('./services/logService');

var fileSelector = document.getElementById("fileSelector");
var imageContainer = document.getElementById("imageContainer");
var debugContainer = document.getElementById("debugContainer");
var generateButton = document.getElementById("generateButton");

fileSelector.onchange = (e) => {
    // imageService.onLoad(e)
    imageService
        .loadImage(e)
        .then(
            img => {
                while (imageContainer.childNodes.length > 0)
                    imageContainer.removeChild(imageContainer.childNodes[0]);
                // add image to container
                imageContainer.appendChild(img);
                let imageData = {
                    "width": img.naturalWidth,
                    "height": img.naturalHeight
                };
                logService.info("Loaded Image w/dimensions " + imageData.width + " x " + imageData.height);
                logService.info(`In inches: ${pixelToInch(imageData.width)} x ${pixelToInch(imageData.height)}`);
            },
            err => logService.error(err.message || err)
        );
};

function pixelToInch(pixels) {
    return pixels / 96;
}

generateButton.onclick = function (e) {
    log("GENERATE BUTTON CLICKED!! Should this do something else?");
};

logService.log("Test application ready");
