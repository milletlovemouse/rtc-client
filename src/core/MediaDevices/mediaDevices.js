var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var MediaDevices = /** @class */ (function () {
    function MediaDevices(constraints) {
        this.locaStreamTrackEventTargets = [];
        this.displayStreamTrackEventTargets = [];
        this.constraints = constraints;
    }
    MediaDevices.prototype.getUserStream = function (constraints) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.localStream)
                            return [2 /*return*/, this.localStream];
                        _a = this;
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                    case 1:
                        _a.localStream = _b.sent();
                        this.locaStreamEventTaget = new CustomEventTarget(this.localStream);
                        return [2 /*return*/, this.localStream];
                }
            });
        });
    };
    MediaDevices.prototype.getUserMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUserStream(this.constraints)];
            });
        });
    };
    MediaDevices.prototype.getUserVideoMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUserStream(__assign(__assign({}, this.constraints), { audio: false }))];
            });
        });
    };
    MediaDevices.prototype.getUserAudioMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUserStream(__assign(__assign({}, this.constraints), { video: false }))];
            });
        });
    };
    MediaDevices.prototype.getDisplayMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.displayStream)
                            return [2 /*return*/, this.displayStream];
                        _a = this;
                        return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia(this.constraints)];
                    case 1:
                        _a.displayStream = _b.sent();
                        this.displayStreamEventTarget = new CustomEventTarget(this.displayStream);
                        return [2 /*return*/, this.displayStream];
                }
            });
        });
    };
    // 获取设备信息
    MediaDevices.enumerateDevices = function () {
        return navigator.mediaDevices.enumerateDevices();
    };
    MediaDevices.getSupportedConstraints = function () {
        return navigator.mediaDevices.getSupportedConstraints();
    };
    MediaDevices.prototype.getUserMediaStreamTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.getUserAudioTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserAudioMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getAudioTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.getUserVideoTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserVideoMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getVideoTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.getDisplayMediaStreamTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDisplayMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.getDisplayAudioTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDisplayMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getAudioTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.getDisplayVideoTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDisplayMedia()];
                    case 1: return [2 /*return*/, (_a.sent()).getVideoTracks()];
                }
            });
        });
    };
    MediaDevices.prototype.addTrack = function (track, stream) {
        // 将一个或多个新轨道添加到MediaStream流
        track = Array.isArray(track) ? track : [track];
        track.map(function (track) { return stream.addTrack(track); });
    };
    MediaDevices.prototype.removeTrack = function (track, stream) {
        // 从MediaStream流中删除一个或多个轨道
        track = Array.isArray(track) ? track : [track];
        track.map(function (track) { return stream.removeTrack(track); });
    };
    // 开启本地某个媒体轨道或开启所有媒体轨道
    MediaDevices.prototype.startUserMediaStreamTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, track;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.localStream)
                            return [2 /*return*/];
                        _i = 0;
                        return [4 /*yield*/, this.getUserMediaStreamTracks()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        track = _a[_i];
                        if (id && track.id !== id)
                            return [3 /*break*/, 3];
                        track.enabled = true;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 停止本地某个媒体轨道或停止所有媒体轨道
    MediaDevices.prototype.stopUserMediaStreamTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, track;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.localStream)
                            return [2 /*return*/];
                        _i = 0;
                        return [4 /*yield*/, this.getUserMediaStreamTracks()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        track = _a[_i];
                        if (id && track.id !== id)
                            return [3 /*break*/, 3];
                        track.stop();
                        track.enabled = false;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MediaDevices.prototype.startDisplayMediaStreamTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, track;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.displayStream)
                            return [2 /*return*/];
                        _i = 0;
                        return [4 /*yield*/, this.getDisplayMediaStreamTracks()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        track = _a[_i];
                        if (id && track.id !== id)
                            return [3 /*break*/, 3];
                        track.enabled = true;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MediaDevices.prototype.stopDisplayMediaStreamTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, track;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.displayStream)
                            return [2 /*return*/];
                        _i = 0;
                        return [4 /*yield*/, this.getDisplayMediaStreamTracks()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        track = _a[_i];
                        if (id && track.id !== id)
                            return [3 /*break*/, 3];
                        track.stop();
                        track.enabled = false;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MediaDevices.prototype.closeUserMediaStream = function () {
        var _a;
        this.stopUserMediaStreamTrack();
        (_a = this.locaStreamEventTaget) === null || _a === void 0 ? void 0 : _a.close();
        this.localStream = null;
        var trackEventTarget = null;
        while ((trackEventTarget = this.locaStreamTrackEventTargets.pop())) {
            trackEventTarget.close();
        }
    };
    MediaDevices.prototype.closeDisplayMediaStream = function () {
        var _a;
        this.stopDisplayMediaStreamTrack();
        (_a = this.displayStreamEventTarget) === null || _a === void 0 ? void 0 : _a.close();
        this.displayStream = null;
        var trackEventTarget = null;
        while ((trackEventTarget = this.displayStreamTrackEventTargets.pop())) {
            trackEventTarget.close();
        }
    };
    MediaDevices.prototype.close = function () {
        // 关闭MediaStream
        this.closeUserMediaStream();
        this.closeDisplayMediaStream();
    };
    return MediaDevices;
}());
export default MediaDevices;
