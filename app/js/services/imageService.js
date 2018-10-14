const configService = require('./configService');
const SUPPORTED_FILES = configService.getConfig().supportedFiles || [];

function loadImage(e) {
    return new Promise((resolve, reject) => {
        const files = Array.from(e.target.files);
        if(!files || !files.length) {
            return reject('No Files selected');
        }

        files.forEach((file) => {
           if(isFileTypeValid(file)) {
               readAsDataUrl(file)
                   .then(createImage)
                   .then((img) => {
                       resolve({img, fileName: file.name});
                   });
           } else {
               reject(`Not a valid file type: ${file.name}`);
           }
        });
    });
}

function createImage(dataUrl) {
    return new Promise((resolve ,reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = dataUrl;
    });
}

function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
}

function isFileTypeValid(file) {
    if(!file || !SUPPORTED_FILES.length) {
        return false;
    }

    return SUPPORTED_FILES.includes(file.type);
}


module.exports = {loadImage};


