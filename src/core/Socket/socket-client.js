import { io } from 'socket.io-client';
var SocketClient = /** @class */ (function () {
    function SocketClient(options) {
        var host = options.host, port = options.port;
        var url = host + (port ? ':' + port : '');
        this.socket = io(url);
        this.bind();
    }
    SocketClient.prototype.sendMessage = function (messageName, message) {
        this.socket.emit(messageName, message);
    };
    SocketClient.prototype.onMessage = function (messageName, callback) {
        this.socket.on(messageName, callback);
    };
    SocketClient.prototype.offMessage = function (messageName, callback) {
        this.socket.off(messageName, callback);
    };
    SocketClient.prototype.onConnect = function (callback) {
        this.connect = callback;
    };
    SocketClient.prototype.sendTextMessage = function (message) {
        this.socket.emit('text', message);
    };
    SocketClient.prototype.sendImageMessage = function (message) {
        this.socket.emit('image', message);
    };
    SocketClient.prototype.sendFileMessage = function (message) {
        this.socket.emit('file', message);
    };
    SocketClient.prototype.bind = function () {
        var _this = this;
        this.socket.on('connect', function () {
            console.log('connect', _this.socket.id);
            if (_this.connect) {
                _this.connect();
            }
        });
        this.socket.on('disconnect', function () {
            console.log('disconnect');
        });
    };
    SocketClient.prototype.close = function () {
        this.socket.close();
    };
    return SocketClient;
}());
export default SocketClient;
