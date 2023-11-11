var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import mitt from 'mitt';
import deepcopy from 'deepcopy';
import SocketClient from '../Socket/socket-client';
import WebRTC from './WebRTC';
import MediaDevices from '../MediaDevices/mediaDevices';
import CustomEventTarget from '../../utils/event';
import { debounce, isObject, isBoolean } from '../../utils/util';
import { sliceBase64ToFile } from '../../utils/fileUtils';
import { ControlEnum, DatachannelEvent, DatachannelReadyState, ErrorMessageType, KindEnum, MediaStreamTrackEventEnum, MessageEventType, MittEventName, PeerConnectionEvent, StreamTypeEnum, TypeEnum, UserState, } from '../../enum/WebRTC';
var timerTime = 100;
var RTCClient = /** @class */ (function (_super) {
    __extends(RTCClient, _super);
    function RTCClient(options) {
        var _this = _super.call(this, options.socketConfig) || this;
        _this.userInfo = {
            id: crypto.randomUUID(),
        };
        _this.messageQueueSize = 1024 * 1024 * 15;
        _this.emitter = mitt();
        _this.connectorInfoMap = new Map();
        _this.audioState = true;
        _this.videoState = true;
        /**
         * 共享屏幕状态
         */
        _this._displayState = false;
        /**
         * 加入房间状态
         */
        _this._state = '';
        /**
         * 防抖通知
         */
        _this[_a] = debounce(function () {
            _this.emitter.emit(MittEventName.CONNECTOR_INFO_LIST_CHANGE, Array.from(_this.connectorInfoMap.values())
                .map(function (connectorInfo) {
                var streamType = connectorInfo.streamType, connectorId = connectorInfo.connectorId, remoteStream = connectorInfo.remoteStream;
                return {
                    streamType: streamType,
                    connectorId: connectorId,
                    remoteStream: remoteStream,
                };
            })
                .filter(function (connectorInfo) { return connectorInfo.streamType !== StreamTypeEnum.DISPLAY; }));
        }, timerTime);
        /**
         * 写这个函数的目的是解决当退出房间时直接emitter.all.clear()清除事件
         * 会导致MittEventName.CONNECTOR_INFO_LIST_CHANGE无法通知外界连接成员列表已改变
         */
        _this.clearEmitter = debounce(function () {
            _this.emitter.all.clear();
        }, timerTime);
        _this.streamConstraints = options.constraints;
        _this.configuration = options.configuration;
        _this.mediaDevices = new MediaDevices(_this.streamConstraints);
        _this.init();
        return _this;
    }
    Object.defineProperty(RTCClient.prototype, "displayState", {
        get: function () {
            return this._displayState;
        },
        enumerable: false,
        configurable: true
    });
    RTCClient.prototype.init = function () {
        this.audioState = !!this.streamConstraints.audio;
        this.videoState = !!this.streamConstraints.video;
        this.bindSocketEvent();
    };
    /**
     * 创建客户端之间的连接
     * @param type
     * @param streamType
     * @returns
     */
    RTCClient.prototype.createConnector = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var type, streamType, memberId, webrtc, connectorId, connectorInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = data.type, streamType = data.streamType, memberId = data.memberId;
                        webrtc = new WebRTC(this.configuration);
                        connectorId = crypto.randomUUID();
                        connectorInfo = {
                            type: type,
                            streamType: streamType,
                            connectorId: connectorId,
                            webrtc: webrtc,
                            memberId: memberId,
                            messageList: {},
                            chunks: {},
                        };
                        if (!(streamType === StreamTypeEnum.USER)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addLocalStream(connectorInfo)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(streamType === StreamTypeEnum.DISPLAY)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.addDisplayStream(connectorInfo)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (type === TypeEnum.OFFER) {
                            // 创建信息通道
                            this.createDataChannel(webrtc);
                            this.bindDataChannelEvent(connectorInfo);
                        }
                        else if (type === TypeEnum.ANSWER) {
                            // 绑定监听远端创建信息通道事件
                            this.bindPeerConnectionEvent(connectorInfo, PeerConnectionEvent.DATACHANNEL);
                        }
                        this.bindPeerConnectionEvent(connectorInfo);
                        this.connectorInfoMap.set(connectorId, connectorInfo);
                        return [2 /*return*/, connectorId];
                }
            });
        });
    };
    RTCClient.prototype.createDataChannel = function (webrtc) {
        webrtc.createDataChannel('chat');
    };
    RTCClient.prototype.on = function (type, listener) {
        this.emitter.on(type, listener);
    };
    RTCClient.prototype.off = function (type, listener) {
        this.emitter.off(type, listener);
    };
    RTCClient.prototype.getDevicesInfoList = function () {
        return MediaDevices.enumerateDevices();
    };
    RTCClient.prototype.getVideoDeviceInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var videoTracks, _b, error_1, videoTrack, deviceInfoList, videoDeviceInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.mediaDevices.getUserMediaStreamTracks()];
                    case 1:
                        videoTracks = _c.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        _b = _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.mediaDevices.getUserVideoTracks()];
                    case 4:
                        videoTracks = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        reject(error_1);
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        videoTrack = videoTracks.find(function (track) { return track.kind === 'video'; });
                        if (!videoTrack) {
                            reject(new Error('video device not found'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getDevicesInfoList()];
                    case 8:
                        deviceInfoList = _c.sent();
                        videoDeviceInfo = deviceInfoList.find(function (item) { return item.label === videoTrack.label && item.kind === KindEnum.VIDEOINPUT; });
                        resolve(videoDeviceInfo);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RTCClient.prototype.getAudioDeviceInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var audioTracks, _b, error_2, audioTrack, deviceInfoList, audioDeviceInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.mediaDevices.getUserMediaStreamTracks()];
                    case 1:
                        audioTracks = _c.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        _b = _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.mediaDevices.getUserAudioTracks()];
                    case 4:
                        audioTracks = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _c.sent();
                        reject(error_2);
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        audioTrack = audioTracks.find(function (track) { return track.kind === 'video'; });
                        if (!audioTrack) {
                            reject(new Error('video device not found'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getDevicesInfoList()];
                    case 8:
                        deviceInfoList = _c.sent();
                        audioDeviceInfo = deviceInfoList.find(function (item) { return item.label === audioTracks[0].label && item.kind === KindEnum.AUDIOINPUT; });
                        resolve(audioDeviceInfo);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RTCClient.prototype.bindSocketEvent = function () {
        this.onMessage(MessageEventType.OFFER, this.offerMessage.bind(this));
        this.onMessage(MessageEventType.ANSWER, this.answerMessage.bind(this));
        this.onMessage(MessageEventType.GET_OFFER, this.getOfferMessage.bind(this));
        this.onMessage(MessageEventType.ICE_CANDIDATE, this.icecandidateMessage.bind(this));
        this.onMessage(MessageEventType.LEAVE, this.leaveMessage.bind(this));
        this.onMessage(MessageEventType.ERROR, this.errorMessage.bind(this));
        this.onMessage(MessageEventType.RECONNECT, this.reconnectMessage.bind(this));
        this.onConnect(this.reconnect.bind(this));
    };
    RTCClient.prototype.bindPeerConnectionEvent = function (connectorInfo, eventName) {
        var webrtc = connectorInfo.webrtc;
        if (eventName) {
            webrtc.peerConnectionEventTaget.on(eventName, this.ondatachannel.bind(this, connectorInfo));
        }
        webrtc.peerConnectionEventTaget.on(PeerConnectionEvent.ICE_CANDIDATE, this.onicecandidate.bind(this, connectorInfo));
        webrtc.peerConnectionEventTaget.on(PeerConnectionEvent.TRACK, this.ontrack.bind(this, connectorInfo));
    };
    RTCClient.prototype.bindDataChannelEvent = function (connectorInfo) {
        var webrtc = connectorInfo.webrtc;
        webrtc.dataChannelEventTarget.on(DatachannelEvent.MESSAGE, this.dataChannelMessage.bind(this, connectorInfo));
    };
    RTCClient.prototype.bindDisplayMediaStreamTrackEvent = function () {
        var track = this.mediaDevices.displayStream.getVideoTracks()[0];
        var trackEventTarget = new CustomEventTarget(track);
        trackEventTarget.on(MediaStreamTrackEventEnum.ENDED, this.displayStreamTrackEnded.bind(this));
        this.mediaDevices.displayStreamTrackEventTargets.push(trackEventTarget);
    };
    /**
     * 添加本地媒体流
     * @param connectorInfo
     */
    RTCClient.prototype.addLocalStream = function (connectorInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var webrtc, localStream, _b, error_3, error_4, audioTracks, videoTracks;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        webrtc = connectorInfo.webrtc;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 11]);
                        return [4 /*yield*/, this.mediaDevices.getUserMedia()];
                    case 2:
                        localStream = _c.sent();
                        return [3 /*break*/, 11];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.mediaDevices.getUserVideoMedia()];
                    case 5:
                        localStream = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _c.sent();
                        console.error(error_3.message, error_3.name, KindEnum.VIDEO);
                        return [3 /*break*/, 7];
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.mediaDevices.getUserAudioMedia()];
                    case 8:
                        localStream = _c.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_4 = _c.sent();
                        console.error(error_4.message, error_4.name, KindEnum.VIDEO);
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 11];
                    case 11:
                        if (localStream) {
                            audioTracks = localStream.getAudioTracks();
                            videoTracks = localStream.getVideoTracks();
                            connectorInfo.senders = webrtc.addTrack(__spreadArray(__spreadArray([], videoTracks, true), audioTracks, true), localStream);
                            if (connectorInfo.type === TypeEnum.OFFER) {
                                if (!videoTracks.length) {
                                    webrtc.peerConnection.addTransceiver(KindEnum.VIDEO);
                                }
                                if (!audioTracks.length) {
                                    webrtc.peerConnection.addTransceiver(KindEnum.AUDIO);
                                }
                            }
                            if (!this.audioState) {
                                this.removeTrack(connectorInfo, KindEnum.AUDIO);
                            }
                            if (!this.videoState) {
                                this.removeTrack(connectorInfo, KindEnum.VIDEO);
                            }
                        }
                        else {
                            if (connectorInfo.type === TypeEnum.OFFER) {
                                webrtc.peerConnection.addTransceiver(KindEnum.VIDEO);
                                webrtc.peerConnection.addTransceiver(KindEnum.AUDIO);
                            }
                            connectorInfo.senders = [];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 添加共享屏幕媒体流
     * @param connectorInfo
     */
    RTCClient.prototype.addDisplayStream = function (connectorInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var webrtc, localDisplayStream, audioTracks, videoTracks, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        webrtc = connectorInfo.webrtc;
                        return [4 /*yield*/, this.mediaDevices.getDisplayMedia()];
                    case 1:
                        localDisplayStream = _b.sent();
                        audioTracks = localDisplayStream.getAudioTracks();
                        videoTracks = localDisplayStream.getVideoTracks();
                        webrtc.addTrack(__spreadArray(__spreadArray([], videoTracks, true), audioTracks, true), localDisplayStream);
                        resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        console.error(error_5.message, error_5.name);
                        reject(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 屏幕共享媒体流的视频轨道启用状态变化处理事件
     * @param event
     */
    RTCClient.prototype.displayStreamTrackEnded = function (event) {
        this.cancelShareDisplayMedia();
    };
    /**
     * 创建客户端之间的共享屏幕的连接
     * @param memberInfo
     */
    RTCClient.prototype.createDisplayConnector = function (memberInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var memberId, streamType, connectorId, connectorInfo, offer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        memberId = memberInfo.memberId;
                        streamType = StreamTypeEnum.DISPLAY;
                        return [4 /*yield*/, this.createConnector({ type: TypeEnum.OFFER, streamType: streamType, memberId: memberId })];
                    case 1:
                        connectorId = _b.sent();
                        connectorInfo = this.connectorInfoMap.get(connectorId);
                        return [4 /*yield*/, connectorInfo.webrtc.peerConnection.createOffer()];
                    case 2:
                        offer = _b.sent();
                        return [4 /*yield*/, connectorInfo.webrtc.peerConnection.setLocalDescription(offer)];
                    case 3:
                        _b.sent();
                        this.sendOfferMessage({ connectorId: connectorId, memberId: memberId, offer: offer, streamType: streamType });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 暴露共享屏幕接口
     */
    RTCClient.prototype.shareDisplayMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var webrtcList, isRemoteDisplay, _i, _b, connectorInfo, memberId, stream, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        webrtcList = Array.from(this.connectorInfoMap.values());
                        isRemoteDisplay = webrtcList.some(function (item) { return item.streamType === StreamTypeEnum.REMOTE_DISPLAY; });
                        if (this._displayState) {
                            return [2 /*return*/, Promise.reject(new Error('你正在屏幕共享'))];
                        }
                        if (isRemoteDisplay) {
                            return [2 /*return*/, Promise.reject(new Error('存在远程共享屏幕'))];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        _i = 0, _b = webrtcList.filter(function (item) {
                            return item.streamType !== StreamTypeEnum.DISPLAY &&
                                item.streamType !== StreamTypeEnum.REMOTE_DISPLAY;
                        });
                        _c.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        connectorInfo = _b[_i];
                        memberId = connectorInfo.memberId;
                        return [4 /*yield*/, this.createDisplayConnector({ memberId: memberId })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.getDisplayStream()];
                    case 6:
                        stream = _c.sent();
                        this.bindDisplayMediaStreamTrackEvent();
                        this._displayState = true;
                        this.emitter.emit(MittEventName.DISPLAY_STREAM_CHANGE, stream);
                        return [2 /*return*/, stream];
                    case 7:
                        error_6 = _c.sent();
                        this._displayState = false;
                        return [2 /*return*/, Promise.reject(error_6)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 暴露取消屏幕共享接口
     */
    RTCClient.prototype.cancelShareDisplayMedia = function () {
        var _this = this;
        if (!this._displayState)
            return;
        this.connectorInfoMap.forEach(function (connectorInfo) {
            if (connectorInfo.streamType === StreamTypeEnum.DISPLAY) {
                var remoteConnectorId = connectorInfo.remoteConnectorId;
                _this.sendCloseMessage(connectorInfo, { connectorId: remoteConnectorId });
            }
        });
        this.closeDisplayConnector();
    };
    RTCClient.prototype.closeDisplayConnector = function () {
        var _this = this;
        this.mediaDevices.closeDisplayMediaStream();
        this._displayState = false;
        this.connectorInfoMap.forEach(function (connectorInfo) {
            if (connectorInfo.streamType === StreamTypeEnum.DISPLAY) {
                var connectorId = connectorInfo.connectorId;
                _this.closeConnectorById(connectorId);
            }
        });
        this.emitter.emit(MittEventName.DISPLAY_STREAM_CHANGE, null);
    };
    Object.defineProperty(RTCClient.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    RTCClient.prototype.join = function (data) {
        this.userInfo = __assign(__assign({}, this.userInfo), data);
        this.sendJoinMessage(__assign({ id: this.userInfo.id }, data));
        this._state = UserState.JOIN;
    };
    RTCClient.prototype.leave = function () {
        var data = Array.from(this.connectorInfoMap.values()).map(function (connectorInfo) {
            var remoteConnectorId = connectorInfo.remoteConnectorId, memberId = connectorInfo.memberId;
            return {
                remoteConnectorId: remoteConnectorId,
                memberId: memberId,
            };
        });
        this.sendleaveMessage(data);
        this.closeDisplayConnector();
        this.closeAllConnector();
        this._state = UserState.LEAVE;
    };
    /**
     * socket getOffer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    RTCClient.prototype.getOfferMessage = function (memberInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var memberId, streamType, connectorId, connectorInfo, webrtc, offer, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        memberId = memberInfo.memberId;
                        if (this._displayState) {
                            this.createDisplayConnector(memberInfo);
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        streamType = StreamTypeEnum.USER;
                        return [4 /*yield*/, this.createConnector({
                                type: TypeEnum.OFFER,
                                streamType: streamType,
                                memberId: memberId,
                            })];
                    case 2:
                        connectorId = _b.sent();
                        connectorInfo = this.connectorInfoMap.get(connectorId);
                        webrtc = connectorInfo.webrtc;
                        return [4 /*yield*/, webrtc.peerConnection.createOffer()];
                    case 3:
                        offer = _b.sent();
                        return [4 /*yield*/, webrtc.peerConnection.setLocalDescription(offer)];
                    case 4:
                        _b.sent();
                        this.sendOfferMessage({ connectorId: connectorId, memberId: memberId, offer: offer, streamType: streamType });
                        return [3 /*break*/, 6];
                    case 5:
                        error_7 = _b.sent();
                        console.error(error_7.message, error_7.name);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * socket offer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    RTCClient.prototype.offerMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var memberId, remoteConnectorId, streamType, createType, offer, connectorId, connectorInfo, webrtc, answer, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        memberId = data.memberId, remoteConnectorId = data.remoteConnectorId, streamType = data.streamType;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        createType = streamType === StreamTypeEnum.USER ? StreamTypeEnum.USER : StreamTypeEnum.REMOTE_DISPLAY;
                        offer = new RTCSessionDescription(data.offer);
                        return [4 /*yield*/, this.createConnector({
                                type: TypeEnum.ANSWER,
                                streamType: createType,
                                memberId: memberId,
                            })];
                    case 2:
                        connectorId = _b.sent();
                        connectorInfo = this.connectorInfoMap.get(connectorId);
                        connectorInfo.memberId = memberId; // 记录对方的id
                        connectorInfo.remoteConnectorId = remoteConnectorId; // 记录对方的connectorId
                        webrtc = connectorInfo.webrtc;
                        return [4 /*yield*/, webrtc.peerConnection.setRemoteDescription(offer)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, webrtc.peerConnection.createAnswer()];
                    case 4:
                        answer = _b.sent();
                        return [4 /*yield*/, webrtc.peerConnection.setLocalDescription(answer)];
                    case 5:
                        _b.sent();
                        this.sendAnswerMessage({
                            remoteConnectorId: remoteConnectorId,
                            connectorId: connectorId,
                            memberId: memberId,
                            answer: answer,
                            streamType: createType,
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_8 = _b.sent();
                        console.error(error_8.message, error_8.name);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * socket answer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    RTCClient.prototype.answerMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var connectorId, remoteConnectorId, memberId, answer, connectorInfo, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectorId = data.connectorId, remoteConnectorId = data.remoteConnectorId, memberId = data.memberId;
                        answer = new RTCSessionDescription(data.answer);
                        connectorInfo = this.connectorInfoMap.get(connectorId);
                        if (!connectorInfo) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        connectorInfo.memberId = memberId; // 记录对方的id
                        connectorInfo.remoteConnectorId = remoteConnectorId; // 记录对方的connectorId
                        return [4 /*yield*/, connectorInfo.webrtc.peerConnection.setRemoteDescription(answer)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _b.sent();
                        console.error(error_9.message, error_9.name);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 接收信息通道
     * @param connectorInfo
     * @param event
     */
    RTCClient.prototype.ondatachannel = function (connectorInfo, event) {
        var channel = event.channel;
        channel.onmessage = this.dataChannelMessage.bind(this, connectorInfo);
        connectorInfo.channel = channel;
    };
    /**
     * dataChannel信息通道消息处理事件
     * @param connectorInfo
     * @param event
     */
    RTCClient.prototype.dataChannelMessage = function (connectorInfo, event) {
        return __awaiter(this, void 0, void 0, function () {
            var message, type, data, chunksMerge, _b, id, type_1, _c, id, chunk, index, chunks;
            var _this = this;
            return __generator(this, function (_d) {
                message = JSON.parse(event.data);
                type = message.type, data = message.data;
                chunksMerge = function (id) {
                    var chunks = connectorInfo.chunks[id];
                    var message = connectorInfo.messageList[id];
                    if (message && chunks && chunks.length === message.fileInfo.FQ) {
                        var name_1 = message.fileInfo.name;
                        delete connectorInfo.messageList[id];
                        delete connectorInfo.chunks[id];
                        var flieChunks = chunks.sort(function (a, b) { return a[1] - b[1]; }).map(function (_b) {
                            var chunk = _b[0];
                            return chunk;
                        });
                        message.fileInfo.file = sliceBase64ToFile(flieChunks, name_1);
                        _this.emitter.emit(MittEventName.MESSAGE, message);
                    }
                };
                if (type === MessageEventType.CLOSE) {
                    this.closeMessage(data);
                }
                else if (type === MessageEventType.CHAT) {
                    _b = data, id = _b.id, type_1 = _b.type;
                    if (type_1 === MessageEventType.TEXT) {
                        this.emitter.emit(MittEventName.MESSAGE, data);
                        return [2 /*return*/];
                    }
                    connectorInfo.messageList[id] = data;
                    chunksMerge(id);
                }
                else if (type === MessageEventType.FILE) {
                    _c = data, id = _c.id, chunk = _c.chunk, index = _c.index;
                    chunks = (connectorInfo.chunks[id] = connectorInfo.chunks[id] || []);
                    chunks.push([chunk, index]);
                    chunksMerge(id);
                }
                else if (type === MessageEventType.GET_OFFER ||
                    type === MessageEventType.OFFER ||
                    type === MessageEventType.ANSWER) {
                    this.reconnectWork(connectorInfo, message, this.channelSend);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * RTCDataChannel close事件 connector关闭通知事件
     * @param memberInfo
     */
    RTCClient.prototype.closeMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.closeConnectorById(data.connectorId);
                return [2 /*return*/];
            });
        });
    };
    /**
     * socket leave事件 成员退出通知事件
     * @param memberInfo
     */
    RTCClient.prototype.leaveMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.closeConnectorById(data.connectorId);
                return [2 /*return*/];
            });
        });
    };
    /**
     * RTCPeerConnection绑定事件 对等方有新的媒体轨道加入时通知
     * @param connectorInfo
     * @param event
     */
    RTCClient.prototype.ontrack = function (connectorInfo, event) {
        return __awaiter(this, void 0, void 0, function () {
            var streams, remoteStream;
            return __generator(this, function (_b) {
                streams = event.streams;
                remoteStream = streams[0];
                if (!remoteStream)
                    return [2 /*return*/];
                connectorInfo.remoteStream = remoteStream;
                remoteStream.onremovetrack = this.onremovetrack.bind(this);
                this[MittEventName.CONNECTOR_INFO_LIST_CHANGE]();
                return [2 /*return*/];
            });
        });
    };
    RTCClient.prototype.onremovetrack = function () {
        this[MittEventName.CONNECTOR_INFO_LIST_CHANGE]();
    };
    /**
     * RTCPeerConnection绑定事件 第一次offer SDP、answer SDP交换完成连接成功后执行
     * @param connectorInfo
     * @param event
     */
    RTCClient.prototype.onicecandidate = function (connectorInfo, event) {
        var remoteConnectorId = connectorInfo.remoteConnectorId, memberId = connectorInfo.memberId;
        var candidate = event.candidate;
        if (remoteConnectorId && memberId && candidate) {
            this.sendIcecandidateMessage({
                remoteConnectorId: remoteConnectorId,
                memberId: memberId,
                candidate: candidate,
            });
            this[MittEventName.CONNECTOR_INFO_LIST_CHANGE]();
        }
    };
    /**
     * socket 事件，远程客户端发起，信令服务器通知，ICE Candidate 交换
     * @param data
     * @returns
     */
    RTCClient.prototype.icecandidateMessage = function (data) {
        var connectorId = data.connectorId;
        var connectorInfo = this.connectorInfoMap.get(connectorId);
        var candidate = new RTCIceCandidate(data.candidate);
        if (!connectorInfo) {
            return;
        }
        connectorInfo.webrtc.peerConnection.addIceCandidate(candidate);
        this[MittEventName.CONNECTOR_INFO_LIST_CHANGE]();
    };
    /**
     * 房间内断开重连
     * @returns
     */
    RTCClient.prototype.reconnect = function () {
        if (!(this._state === UserState.JOIN)) {
            return;
        }
        this.sendReconnectMessage(this.userInfo);
    };
    RTCClient.prototype.reconnectMessage = function (message) {
        var type = message.type;
        if (type === UserState.LEAVE) {
            var memberId_1 = message.memberId;
            if (memberId_1) {
                var connectorInfo = Array.from(this.connectorInfoMap.values()).find(function (item) { return item.memberId === memberId_1; });
                this.closeConnectorById(connectorInfo.connectorId);
                if (connectorInfo.streamType === StreamTypeEnum.DISPLAY) {
                    this.closeDisplayConnector();
                }
                return;
            }
            this.closeDisplayConnector();
            this.closeAllConnector();
        }
        else if (type === MessageEventType.GET_OFFER ||
            type === MessageEventType.OFFER ||
            type === MessageEventType.ANSWER) {
            var connectorId = message.connectorId;
            var connectorInfo = this.connectorInfoMap.get(connectorId);
            this.reconnectWork(connectorInfo, message, this.sendMessage);
        }
    };
    RTCClient.prototype.reconnectWork = function (connectorInfo, message, send) {
        return __awaiter(this, void 0, void 0, function () {
            var type, data, pc, sendMessage, kind, type_2, offer, offer, answer, answer;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = message.type, data = message.data;
                        pc = connectorInfo.webrtc.peerConnection;
                        sendMessage = function (sendMessage) {
                            if (send === _this.channelSend) {
                                _this.channelSend(connectorInfo, sendMessage);
                            }
                            else if (send === _this.sendMessage) {
                                _this.sendMessage(MessageEventType.RECONNECT_WORK, __assign(__assign({}, sendMessage), { connectorId: connectorInfo.connectorId, memberId: message.memberId }));
                            }
                        };
                        if (!(type === MessageEventType.GET_OFFER)) return [3 /*break*/, 3];
                        if (data) {
                            kind = data.kind, type_2 = data.type;
                            if (type_2 === ControlEnum.ADD) {
                                pc.addTransceiver(kind);
                            }
                        }
                        return [4 /*yield*/, pc.createOffer()];
                    case 1:
                        offer = _b.sent();
                        return [4 /*yield*/, pc.setLocalDescription(offer)];
                    case 2:
                        _b.sent();
                        sendMessage({
                            type: MessageEventType.OFFER,
                            data: { offer: offer },
                        });
                        return [3 /*break*/, 8];
                    case 3:
                        if (!(type === MessageEventType.OFFER)) return [3 /*break*/, 6];
                        offer = new RTCSessionDescription(data.offer);
                        return [4 /*yield*/, pc.setRemoteDescription(offer)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, pc.createAnswer()];
                    case 5:
                        answer = _b.sent();
                        pc.setLocalDescription(answer);
                        sendMessage({
                            type: MessageEventType.ANSWER,
                            data: { answer: answer },
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(type === MessageEventType.ANSWER)) return [3 /*break*/, 8];
                        answer = new RTCSessionDescription(data.answer);
                        return [4 /*yield*/, pc.setRemoteDescription(answer)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.errorMessage = function (error) {
        if (error.type === ErrorMessageType.REPEAT) {
            this._state = '';
        }
        this.emitter.emit(MittEventName.ERROR, error);
        console.error(error.message);
    };
    RTCClient.prototype.sendIcecandidateMessage = function (data) {
        this.sendMessage(MessageEventType.ICE_CANDIDATE, data);
    };
    RTCClient.prototype.sendOfferMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.sendMessage(MessageEventType.OFFER, data);
                return [2 /*return*/];
            });
        });
    };
    RTCClient.prototype.sendAnswerMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.sendMessage(MessageEventType.ANSWER, data);
                return [2 /*return*/];
            });
        });
    };
    RTCClient.prototype.channelSend = function (connectorInfo, data) {
        var _this = this;
        var _b;
        var type = connectorInfo.type, channel = connectorInfo.channel, webrtc = connectorInfo.webrtc;
        var maxMessageSize = webrtc.peerConnection.sctp.maxMessageSize;
        var bufferedAmount = (_b = channel === null || channel === void 0 ? void 0 : channel.bufferedAmount) !== null && _b !== void 0 ? _b : webrtc.dataChannel.bufferedAmount;
        if (bufferedAmount + maxMessageSize > this.messageQueueSize) {
            setTimeout(function () { return _this.channelSend(connectorInfo, data); }, 10);
            return;
        }
        if (type === TypeEnum.OFFER) {
            if (webrtc.dataChannel.readyState !== DatachannelReadyState.OPEN) {
                this.channelSend(connectorInfo, data);
                return;
            }
            webrtc.dataChannel.send(JSON.stringify(data));
        }
        else if (type === TypeEnum.ANSWER) {
            if (channel.readyState !== DatachannelReadyState.OPEN) {
                this.channelSend(connectorInfo, data);
                return;
            }
            channel.send(JSON.stringify(data));
        }
    };
    RTCClient.prototype.sendJoinMessage = function (data) {
        this.sendMessage(MessageEventType.JOIN, data);
    };
    RTCClient.prototype.sendleaveMessage = function (data) {
        this.sendMessage(MessageEventType.LEAVE, data);
    };
    RTCClient.prototype.sendCloseMessage = function (connectorInfo, data) {
        this.channelSend(connectorInfo, {
            type: MessageEventType.CLOSE,
            data: data,
        });
    };
    RTCClient.prototype.sendReconnectMessage = function (data) {
        this.sendMessage(MessageEventType.RECONNECT, data);
    };
    RTCClient.prototype.channelSendMesage = function (data) {
        var _this = this;
        data = deepcopy(data);
        var chunks = [];
        if (data.type === MessageEventType.FILE) {
            chunks = data.fileInfo.chunks;
            delete data.fileInfo.chunks;
        }
        this.connectorInfoMap.forEach(function (connectorInfo) {
            if (connectorInfo.streamType !== StreamTypeEnum.USER)
                return;
            _this.channelSend(connectorInfo, {
                type: MessageEventType.CHAT,
                data: data,
            });
            chunks.forEach(function (chunk, index) {
                _this.channelSend(connectorInfo, {
                    type: MessageEventType.FILE,
                    data: {
                        id: data.id,
                        index: index,
                        chunk: chunk,
                    },
                });
            });
        });
    };
    /**
     * 切换设备或设备状态后刷新连接，刷新依赖于RTCDataChannel信息通道
     * @param connectorInfo
     */
    RTCClient.prototype.restartConnector = function (connectorInfo, sendGetOfferMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var type, pc, data, offer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = connectorInfo.type, pc = connectorInfo.webrtc.peerConnection;
                        if (!(type === TypeEnum.OFFER)) return [3 /*break*/, 3];
                        return [4 /*yield*/, pc.createOffer()];
                    case 1:
                        offer = _b.sent();
                        return [4 /*yield*/, pc.setLocalDescription(offer)];
                    case 2:
                        _b.sent();
                        data = {
                            type: MessageEventType.OFFER,
                            data: {
                                offer: offer,
                            },
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        if (type === TypeEnum.ANSWER) {
                            data = {
                                type: MessageEventType.GET_OFFER,
                                data: sendGetOfferMessage,
                            };
                        }
                        _b.label = 4;
                    case 4:
                        this.channelSend(connectorInfo, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.addTrack = function (connectorInfo, track) {
        return __awaiter(this, void 0, void 0, function () {
            var localStream, senders;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        localStream = this.mediaDevices.localStream;
                        if (!!localStream) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mediaDevices.getUserMedia()];
                    case 1:
                        localStream = _c.sent();
                        _c.label = 2;
                    case 2:
                        senders = connectorInfo.webrtc.addTrack(track, localStream);
                        (_b = connectorInfo.senders).push.apply(_b, senders);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.removeTrack = function (connectorInfo, kind) {
        var senders = connectorInfo.senders.filter(function (s) { var _b; return ((_b = s.track) === null || _b === void 0 ? void 0 : _b.kind) === kind; });
        connectorInfo.senders = connectorInfo.senders.filter(function (s) { var _b; return ((_b = s.track) === null || _b === void 0 ? void 0 : _b.kind) !== kind; });
        connectorInfo.webrtc.removeTrack(senders);
    };
    /**
     * 切换设备媒体轨道
     * @param deviceId
     * @param kind
     */
    RTCClient.prototype.replaceTrack = function (deviceId, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var constraint, stream, track, localStream, localTrack, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        constraint = this.streamConstraints[kind];
                        if (isBoolean(constraint)) {
                            this.streamConstraints[kind] = {
                                deviceId: deviceId,
                            };
                        }
                        else if (isObject(constraint)) {
                            this.streamConstraints[kind].deviceId = deviceId;
                        }
                        else {
                            this.streamConstraints[kind] = { deviceId: deviceId };
                        }
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(this.streamConstraints)];
                    case 1:
                        stream = _e.sent();
                        track = (kind === KindEnum.AUDIO ? stream.getAudioTracks() : stream.getVideoTracks())[0];
                        localStream = this.mediaDevices.localStream;
                        if (localStream) {
                            localTrack = (kind === KindEnum.AUDIO ? localStream.getAudioTracks() : localStream.getVideoTracks())[0];
                            localStream.removeTrack(localTrack);
                            localStream.addTrack(track);
                        }
                        this.connectorInfoMap.forEach(function (connectorInfo) { return __awaiter(_this, void 0, void 0, function () {
                            var streamType;
                            return __generator(this, function (_b) {
                                streamType = connectorInfo.streamType;
                                if (streamType === StreamTypeEnum.DISPLAY || streamType === StreamTypeEnum.REMOTE_DISPLAY) {
                                    return [2 /*return*/];
                                }
                                // sender.replaceTrack(track)
                                this.removeTrack(connectorInfo, kind);
                                this.addTrack(connectorInfo, track);
                                this.restartConnector(connectorInfo, {
                                    kind: kind,
                                    type: ControlEnum.ADD,
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        _c = (_b = this.emitter).emit;
                        _d = [MittEventName.LOCAL_STREAM_CHANGE];
                        return [4 /*yield*/, this.getLocalStream()];
                    case 2:
                        _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.replaceVideoTrack = function (deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.replaceTrack(deviceId, KindEnum.VIDEO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.replaceAudioTrack = function (deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.replaceTrack(deviceId, KindEnum.AUDIO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 切换设备状态，本质还是改变媒体轨道
     * @param state
     * @param kind
     */
    RTCClient.prototype.deviceSwitch = function (state, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var stream, track, localStream, localTrack, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (kind === KindEnum.AUDIO) {
                            this.audioState = state;
                        }
                        else if (kind === KindEnum.VIDEO) {
                            this.videoState = state;
                        }
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(this.streamConstraints)];
                    case 1:
                        stream = _e.sent();
                        track = (kind === KindEnum.AUDIO ? stream.getAudioTracks() : stream.getVideoTracks())[0];
                        localStream = this.mediaDevices.localStream;
                        if (localStream) {
                            if (state) {
                                localStream.addTrack(track);
                            }
                            else {
                                localTrack = (kind === KindEnum.AUDIO ? localStream.getAudioTracks() : localStream.getVideoTracks())[0];
                                localStream.removeTrack(localTrack);
                            }
                        }
                        this.connectorInfoMap.forEach(function (connectorInfo) { return __awaiter(_this, void 0, void 0, function () {
                            var streamType;
                            return __generator(this, function (_b) {
                                streamType = connectorInfo.streamType;
                                if (streamType === StreamTypeEnum.DISPLAY || streamType === StreamTypeEnum.REMOTE_DISPLAY) {
                                    return [2 /*return*/];
                                }
                                if (state) {
                                    this.addTrack(connectorInfo, track);
                                }
                                else {
                                    this.removeTrack(connectorInfo, kind);
                                }
                                this.restartConnector(connectorInfo, {
                                    kind: kind,
                                    type: state ? ControlEnum.ADD : ControlEnum.REMOVE,
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        _c = (_b = this.emitter).emit;
                        _d = [MittEventName.LOCAL_STREAM_CHANGE];
                        return [4 /*yield*/, this.getLocalStream()];
                    case 2:
                        _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.disableAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.deviceSwitch(false, KindEnum.AUDIO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.enableAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.deviceSwitch(true, KindEnum.AUDIO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.disableVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.deviceSwitch(false, KindEnum.VIDEO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.enableVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.deviceSwitch(true, KindEnum.VIDEO)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.getLocalStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localStream, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // 获取本地媒体流
                        if (!this.videoState && !this.audioState)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia(__assign(__assign({}, this.streamConstraints), { video: this.videoState, audio: this.audioState }))];
                    case 1:
                        localStream = _b.sent();
                        return [2 /*return*/, localStream];
                    case 2:
                        error_10 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_10)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.getDisplayStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var displayStream, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.mediaDevices.getDisplayMedia()];
                    case 1:
                        displayStream = _b.sent();
                        return [2 /*return*/, displayStream];
                    case 2:
                        error_11 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_11)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RTCClient.prototype.closeConnectorById = function (connectorId) {
        var connectorInfo = this.connectorInfoMap.get(connectorId);
        if (connectorInfo) {
            connectorInfo.webrtc.close();
            this.connectorInfoMap.delete(connectorId);
        }
        this[MittEventName.CONNECTOR_INFO_LIST_CHANGE]();
    };
    RTCClient.prototype.closeAllConnector = function () {
        var _this = this;
        Array.from(this.connectorInfoMap.keys()).forEach(function (connectorId) {
            _this.closeConnectorById(connectorId);
        });
    };
    RTCClient.prototype.close = function () {
        this.closeAllConnector();
        this.mediaDevices.close();
        this.socket.close();
        this.clearEmitter;
    };
    return RTCClient;
}(SocketClient));
_a = MittEventName.CONNECTOR_INFO_LIST_CHANGE;
export default RTCClient;
