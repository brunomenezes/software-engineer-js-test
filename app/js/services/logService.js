const debugContainer = document.getElementById( "debugContainer" );

function log( msg ) {
    render(`<p>${msg}</p>`);
}

function info(msg) {
    render(`<p class="info">${msg}</p>`);
}

function error(msg) {
    render(`<p class="error">${msg}</p>`);
}

function render(html) {
    if(!html) return;
    debugContainer.innerHTML += html;
}

module.exports = {log, info, error};