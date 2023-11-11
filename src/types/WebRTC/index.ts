import WebRTC from '../../core/WebRTC/WebRTC';
import { DatachannelReadyState } from '../../enum/WebRTC';

export type Message = {
  id: string;
  isSelf: boolean;
  username: string;
  HHmmss: string;
  type: 'file' | 'text';
  text?: string;
  fileInfo?: {
    name: string;
    size: string;
    type: string;
    url: string;
    FQ: number;
    file: File;
    chunks: string[];
  };
};

export type FileMessageData = {
  id: string;
  chunk: string;
  index: number;
};

export type Datachannel = {
  readyState: DatachannelReadyState;
  bufferedAmount: number;
  bufferedAmountLowThreshold: number;
  send(data: string): void;
  close(): void;
};

export type ConnectorInfoList = Pick<
  ConnectorInfo,
  'streamType' | 'connectorId' | 'remoteStream'
>[];
export type MittEventType = {
  connectorInfoListChange: ConnectorInfoList;
  displayStreamChange: MediaStream;
  localStreamChange: MediaStream;
  message: Message;
  error: ErrorMessage;
};

export type ErrorMessage = {
  type: string;
  message: string;
};

export type MessageDataType =
  | 'offer'
  | 'answer'
  | 'icecandidate'
  | 'getOffer'
  | 'leave'
  | 'close'
  | 'chat'
  | 'file';
export type ChannelMessageData = {
  type: MessageDataType;
  data?: {
    [x: string]: any;
  };
};

export type ReconnectMessageData = {
  type: MessageDataType;
  connectorId: string;
  memberId: string;
  data?: {
    [x: string]: any;
  };
};

export type MemberInfo = {
  memberId: string;
};
export type OfferMessageData = {
  remoteConnectorId: string;
  memberId: string;
  offer: RTCSessionDescriptionInit;
  streamType?: StreamType;
};

export type StreamType = 'user' | 'display' | 'remoteDisplay';

export type Type = 'offer' | 'answer';

export type Kind = 'audio' | 'video';

export type ControlType = 'add' | 'remove';

export type SendGetOfferMessageData = {
  kind?: Kind;
  type?: ControlType;
};

export type ConnectorInfo = {
  type: Type;
  streamType: StreamType;
  webrtc: WebRTC;
  connectorId: string;
  memberId: string;
  remoteConnectorId?: string;
  remoteStream?: MediaStream;
  channel?: RTCDataChannel;
  senders?: RTCRtpSender[];
  receivers?: RTCRtpReceiver[];
  transceivers?: RTCRtpTransceiver[];
  messageList: Record<string, Message>;
  chunks: Record<string, [string, number][]>;
};
export type ConnectorInfoMap = Map<string, ConnectorInfo>;

export type Options = {
  configuration: RTCConfiguration;
  constraints: MediaStreamConstraints;
  socketConfig: {
    host: string;
    port?: number | string;
  };
};

export type UserInfo = {
  id: string;
  username?: string;
  roomname?: string;
};
