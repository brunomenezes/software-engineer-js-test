const debugContainer = document.getElementById( "debugContainer" );
const clearBtn = document.getElementById( "clearLogs" );

clearBtn.onclick = clear;

function log( msg ) {
    render(createParentheses(msg));
}

function info(msg) {
    render(createParentheses(msg, 'info'));
}

function error(msg) {
    render(createParentheses(msg, 'error'));
}

function render(node) {
    if(!node) return;
    debugContainer.insertBefore(node, debugContainer.firstChild);
}

function createParentheses(message, clazz) {
    const date = new Date();
    const node = document.createElement('p');
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    node.textContent = `${date.getHours()}:${date.getMinutes()}:${seconds} - ${message}`;
    node.className = clazz;
    return node;
}

function clear() {
    while(debugContainer.firstChild) {
        debugContainer.removeChild(debugContainer.firstChild);
    }
}

module.exports = {log, info, error};