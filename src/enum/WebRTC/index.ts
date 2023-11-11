export enum DatachannelReadyState {
  CONNECTING = 'connecting',
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

export enum MessageEventType {
  OFFER = 'offer',
  ANSWER = 'answer',
  GET_OFFER = 'getOffer',
  ICE_CANDIDATE = 'icecandidate',
  JOIN = 'join',
  LEAVE = 'leave',
  CLOSE = 'close',
  ERROR = 'error',
  RECONNECT = 'reconnect',
  RECONNECT_WORK = 'reconnectWork',
  CHAT = 'chat',
  FILE = 'file',
  TEXT = 'text',
}

export enum UserState {
  JOIN = 'join',
  LEAVE = 'leave',
}

export enum ErrorMessageType {
  REPEAT = 'repeat',
}

export enum PeerConnectionEvent {
  TRACK = 'track',
  ICE_CANDIDATE = 'icecandidate',
  DATACHANNEL = 'datachannel',
}

export enum DatachannelEvent {
  MESSAGE = 'message',
}

export enum MediaStreamTrackEventEnum {
  ENDED = 'ended',
}

export enum MittEventName {
  CONNECTOR_INFO_LIST_CHANGE = 'connectorInfoListChange',
  DISPLAY_STREAM_CHANGE = 'displayStreamChange',
  LOCAL_STREAM_CHANGE = 'localStreamChange',
  MESSAGE = 'message',
  ERROR = 'error',
}

export enum StreamTypeEnum {
  USER = 'user',
  DISPLAY = 'display',
  REMOTE_DISPLAY = 'remoteDisplay',
}

export enum TypeEnum {
  OFFER = 'offer',
  ANSWER = 'answer',
}

export enum KindEnum {
  AUDIO = 'audio',
  VIDEO = 'video',
  VIDEOINPUT = 'videoinput',
  AUDIOINPUT = 'audioinput',
}

export enum ControlEnum {
  ADD = 'add',
  REMOVE = 'remove',
}
