export declare enum DatachannelReadyState {
    CONNECTING = "connecting",
    OPEN = "open",
    CLOSING = "closing",
    CLOSED = "closed"
}
export declare enum MessageEventType {
    OFFER = "offer",
    ANSWER = "answer",
    GET_OFFER = "getOffer",
    ICE_CANDIDATE = "icecandidate",
    JOIN = "join",
    LEAVE = "leave",
    CLOSE = "close",
    ERROR = "error",
    RECONNECT = "reconnect",
    RECONNECT_WORK = "reconnectWork",
    CHAT = "chat",
    FILE = "file",
    TEXT = "text"
}
export declare enum UserState {
    JOIN = "join",
    LEAVE = "leave"
}
export declare enum ErrorMessageType {
    REPEAT = "repeat"
}
export declare enum PeerConnectionEvent {
    TRACK = "track",
    ICE_CANDIDATE = "icecandidate",
    DATACHANNEL = "datachannel"
}
export declare enum DatachannelEvent {
    MESSAGE = "message"
}
export declare enum MediaStreamTrackEventEnum {
    ENDED = "ended"
}
export declare enum MittEventName {
    CONNECTOR_INFO_LIST_CHANGE = "connectorInfoListChange",
    DISPLAY_STREAM_CHANGE = "displayStreamChange",
    LOCAL_STREAM_CHANGE = "localStreamChange",
    MESSAGE = "message",
    ERROR = "error"
}
export declare enum StreamTypeEnum {
    USER = "user",
    DISPLAY = "display",
    REMOTE_DISPLAY = "remoteDisplay"
}
export declare enum TypeEnum {
    OFFER = "offer",
    ANSWER = "answer"
}
export declare enum KindEnum {
    AUDIO = "audio",
    VIDEO = "video",
    VIDEOINPUT = "videoinput",
    AUDIOINPUT = "audioinput"
}
export declare enum ControlEnum {
    ADD = "add",
    REMOVE = "remove"
}
