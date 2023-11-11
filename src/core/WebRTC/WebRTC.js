var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import CustomEventTarget from '../../utils/event';
var WebRTC = /** @class */ (function () {
    function WebRTC(configuration) {
        this.configuration = configuration;
        this.init();
    }
    WebRTC.prototype.init = function () {
        this.createPeerConnection();
    };
    WebRTC.prototype.createPeerConnection = function () {
        // 创建 PeerConnection
        this.peerConnection = new RTCPeerConnection();
        this.peerConnectionEventTaget = new CustomEventTarget(this.peerConnection);
        this.peerConnection.setConfiguration(this.configuration);
    };
    WebRTC.prototype.createDataChannel = function (label, option) {
        this.dataChannel = this.peerConnection.createDataChannel(label, option);
        this.dataChannelEventTarget = new CustomEventTarget(this.dataChannel);
        return this.dataChannel;
    };
    Object.defineProperty(WebRTC.prototype, "signalingState", {
        get: function () {
            return this.peerConnection.signalingState;
        },
        enumerable: false,
        configurable: true
    });
    WebRTC.prototype.addTrack = function (track, stream) {
        var _this = this;
        // 将本地媒体流添加到 PeerConnection
        track = Array.isArray(track) ? track : [track];
        return track.map(function (track) { return _this.peerConnection.addTrack(track, stream); });
    };
    WebRTC.prototype.removeTrack = function (sender) {
        var _this = this;
        if (sender === void 0) { sender = []; }
        // 从 PeerConnection 中移除媒体流
        var senderList = Array.isArray(sender) ? sender : [sender];
        senderList.forEach(function (sender) { return _this.peerConnection.removeTrack(sender); });
    };
    WebRTC.prototype.addTransceiver = function (track, stream) {
        var _this = this;
        track = Array.isArray(track) ? track : [track];
        return track.map(function (track) { return _this.peerConnection.addTransceiver(track, { streams: [stream] }); });
    };
    WebRTC.prototype.createAnswer = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.peerConnection.createAnswer(options)];
            });
        });
    };
    WebRTC.prototype.createOffer = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.peerConnection.createOffer(options)];
            });
        });
    };
    WebRTC.prototype.close = function () {
        var _a, _b;
        this.peerConnectionEventTaget.close();
        (_a = this.dataChannelEventTarget) === null || _a === void 0 ? void 0 : _a.close();
        this.peerConnection.close();
        this.peerConnection = null;
        (_b = this.dataChannel) === null || _b === void 0 ? void 0 : _b.close();
        this.dataChannel = null;
    };
    return WebRTC;
}());
export default WebRTC;
