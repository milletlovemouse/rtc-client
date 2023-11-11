export var DatachannelReadyState;
(function (DatachannelReadyState) {
    DatachannelReadyState["CONNECTING"] = "connecting";
    DatachannelReadyState["OPEN"] = "open";
    DatachannelReadyState["CLOSING"] = "closing";
    DatachannelReadyState["CLOSED"] = "closed";
})(DatachannelReadyState || (DatachannelReadyState = {}));
export var MessageEventType;
(function (MessageEventType) {
    MessageEventType["OFFER"] = "offer";
    MessageEventType["ANSWER"] = "answer";
    MessageEventType["GET_OFFER"] = "getOffer";
    MessageEventType["ICE_CANDIDATE"] = "icecandidate";
    MessageEventType["JOIN"] = "join";
    MessageEventType["LEAVE"] = "leave";
    MessageEventType["CLOSE"] = "close";
    MessageEventType["ERROR"] = "error";
    MessageEventType["RECONNECT"] = "reconnect";
    MessageEventType["RECONNECT_WORK"] = "reconnectWork";
    MessageEventType["CHAT"] = "chat";
    MessageEventType["FILE"] = "file";
    MessageEventType["TEXT"] = "text";
})(MessageEventType || (MessageEventType = {}));
export var UserState;
(function (UserState) {
    UserState["JOIN"] = "join";
    UserState["LEAVE"] = "leave";
})(UserState || (UserState = {}));
export var ErrorMessageType;
(function (ErrorMessageType) {
    ErrorMessageType["REPEAT"] = "repeat";
})(ErrorMessageType || (ErrorMessageType = {}));
export var PeerConnectionEvent;
(function (PeerConnectionEvent) {
    PeerConnectionEvent["TRACK"] = "track";
    PeerConnectionEvent["ICE_CANDIDATE"] = "icecandidate";
    PeerConnectionEvent["DATACHANNEL"] = "datachannel";
})(PeerConnectionEvent || (PeerConnectionEvent = {}));
export var DatachannelEvent;
(function (DatachannelEvent) {
    DatachannelEvent["MESSAGE"] = "message";
})(DatachannelEvent || (DatachannelEvent = {}));
export var MediaStreamTrackEventEnum;
(function (MediaStreamTrackEventEnum) {
    MediaStreamTrackEventEnum["ENDED"] = "ended";
})(MediaStreamTrackEventEnum || (MediaStreamTrackEventEnum = {}));
export var MittEventName;
(function (MittEventName) {
    MittEventName["CONNECTOR_INFO_LIST_CHANGE"] = "connectorInfoListChange";
    MittEventName["DISPLAY_STREAM_CHANGE"] = "displayStreamChange";
    MittEventName["LOCAL_STREAM_CHANGE"] = "localStreamChange";
    MittEventName["MESSAGE"] = "message";
    MittEventName["ERROR"] = "error";
})(MittEventName || (MittEventName = {}));
export var StreamTypeEnum;
(function (StreamTypeEnum) {
    StreamTypeEnum["USER"] = "user";
    StreamTypeEnum["DISPLAY"] = "display";
    StreamTypeEnum["REMOTE_DISPLAY"] = "remoteDisplay";
})(StreamTypeEnum || (StreamTypeEnum = {}));
export var TypeEnum;
(function (TypeEnum) {
    TypeEnum["OFFER"] = "offer";
    TypeEnum["ANSWER"] = "answer";
})(TypeEnum || (TypeEnum = {}));
export var KindEnum;
(function (KindEnum) {
    KindEnum["AUDIO"] = "audio";
    KindEnum["VIDEO"] = "video";
    KindEnum["VIDEOINPUT"] = "videoinput";
    KindEnum["AUDIOINPUT"] = "audioinput";
})(KindEnum || (KindEnum = {}));
export var ControlEnum;
(function (ControlEnum) {
    ControlEnum["ADD"] = "add";
    ControlEnum["REMOVE"] = "remove";
})(ControlEnum || (ControlEnum = {}));
