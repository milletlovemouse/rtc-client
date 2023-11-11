import CustomEventTarget from '../../utils/event';
export default class WebRTC {
    configuration: RTCConfiguration;
    peerConnection: RTCPeerConnection;
    dataChannel: RTCDataChannel;
    peerConnectionEventTaget: CustomEventTarget;
    dataChannelEventTarget: CustomEventTarget;
    constructor(configuration: RTCConfiguration);
    init(): void;
    createPeerConnection(): void;
    createDataChannel(label: string, option?: RTCDataChannelInit): RTCDataChannel;
    get signalingState(): RTCSignalingState;
    addTrack(track: MediaStreamTrack | MediaStreamTrack[], stream: MediaStream): RTCRtpSender[];
    removeTrack(sender?: RTCRtpSender | RTCRtpSender[]): void;
    addTransceiver(track: MediaStreamTrack | MediaStreamTrack[], stream: MediaStream): RTCRtpTransceiver[];
    createAnswer(options?: RTCAnswerOptions): Promise<RTCSessionDescriptionInit>;
    createOffer(options?: RTCAnswerOptions): Promise<RTCSessionDescriptionInit>;
    close(): void;
}
