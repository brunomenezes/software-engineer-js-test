const DPI = 96;

function inchesToPixels(inches) {
    return inches * DPI;
}

function pixelsToInches(pixels) {
    return pixels/DPI;
}

module.exports = {inchesToPixels, pixelsToInches};