import SocketClient from '../Socket/socket-client';
import MediaDevices from '../MediaDevices/mediaDevices';
import { Kind, Message, MittEventType, Options, UserInfo } from '../../types/WebRTC';
import { MittEventName } from '../../enum/WebRTC';
export default class RTCClient extends SocketClient {
    configuration: RTCConfiguration;
    streamConstraints: MediaStreamConstraints;
    mediaDevices: MediaDevices;
    userInfo: UserInfo;
    readonly messageQueueSize: number;
    private emitter;
    private connectorInfoMap;
    private audioState;
    private videoState;
    constructor(options: Options);
    /**
     * 共享屏幕状态
     */
    private _displayState;
    get displayState(): boolean;
    private init;
    /**
     * 创建客户端之间的连接
     * @param type
     * @param streamType
     * @returns
     */
    private createConnector;
    private createDataChannel;
    on<K extends keyof MittEventType, Args extends MittEventType[K]>(type: K, listener: (args: Args) => void): void;
    off(type: keyof MittEventType, listener?: (...args: any[]) => void): void;
    getDevicesInfoList(): Promise<MediaDeviceInfo[]>;
    getVideoDeviceInfo(): Promise<MediaDeviceInfo>;
    getAudioDeviceInfo(): Promise<MediaDeviceInfo>;
    private bindSocketEvent;
    private bindPeerConnectionEvent;
    private bindDataChannelEvent;
    private bindDisplayMediaStreamTrackEvent;
    /**
     * 添加本地媒体流
     * @param connectorInfo
     */
    private addLocalStream;
    /**
     * 添加共享屏幕媒体流
     * @param connectorInfo
     */
    private addDisplayStream;
    /**
     * 屏幕共享媒体流的视频轨道启用状态变化处理事件
     * @param event
     */
    private displayStreamTrackEnded;
    /**
     * 创建客户端之间的共享屏幕的连接
     * @param memberInfo
     */
    private createDisplayConnector;
    /**
     * 暴露共享屏幕接口
     */
    shareDisplayMedia(): Promise<MediaStream>;
    /**
     * 暴露取消屏幕共享接口
     */
    cancelShareDisplayMedia(): void;
    private closeDisplayConnector;
    /**
     * 加入房间状态
     */
    private _state;
    get state(): string;
    join(data: {
        username: string;
        roomname: string;
    }): void;
    leave(): void;
    /**
     * socket getOffer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    private getOfferMessage;
    /**
     * socket offer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    private offerMessage;
    /**
     * socket answer 消息处理事件，远程客户端发起请求，信令服务器通知
     * @param memberInfo
     */
    private answerMessage;
    /**
     * 接收信息通道
     * @param connectorInfo
     * @param event
     */
    private ondatachannel;
    /**
     * dataChannel信息通道消息处理事件
     * @param connectorInfo
     * @param event
     */
    private dataChannelMessage;
    /**
     * RTCDataChannel close事件 connector关闭通知事件
     * @param memberInfo
     */
    private closeMessage;
    /**
     * socket leave事件 成员退出通知事件
     * @param memberInfo
     */
    private leaveMessage;
    /**
     * RTCPeerConnection绑定事件 对等方有新的媒体轨道加入时通知
     * @param connectorInfo
     * @param event
     */
    private ontrack;
    private onremovetrack;
    /**
     * RTCPeerConnection绑定事件 第一次offer SDP、answer SDP交换完成连接成功后执行
     * @param connectorInfo
     * @param event
     */
    private onicecandidate;
    /**
     * socket 事件，远程客户端发起，信令服务器通知，ICE Candidate 交换
     * @param data
     * @returns
     */
    private icecandidateMessage;
    /**
     * 房间内断开重连
     * @returns
     */
    private reconnect;
    private reconnectMessage;
    private reconnectWork;
    private errorMessage;
    private sendIcecandidateMessage;
    private sendOfferMessage;
    private sendAnswerMessage;
    private channelSend;
    private sendJoinMessage;
    private sendleaveMessage;
    private sendCloseMessage;
    private sendReconnectMessage;
    channelSendMesage(data: Message): void;
    /**
     * 切换设备或设备状态后刷新连接，刷新依赖于RTCDataChannel信息通道
     * @param connectorInfo
     */
    private restartConnector;
    private addTrack;
    private removeTrack;
    /**
     * 切换设备媒体轨道
     * @param deviceId
     * @param kind
     */
    replaceTrack(deviceId: string, kind: Kind): Promise<void>;
    replaceVideoTrack(deviceId: string): Promise<void>;
    replaceAudioTrack(deviceId: string): Promise<void>;
    /**
     * 切换设备状态，本质还是改变媒体轨道
     * @param state
     * @param kind
     */
    deviceSwitch(state: boolean, kind: Kind): Promise<void>;
    disableAudio(): Promise<void>;
    enableAudio(): Promise<void>;
    disableVideo(): Promise<void>;
    enableVideo(): Promise<void>;
    getLocalStream(): Promise<MediaStream>;
    getDisplayStream(): Promise<MediaStream>;
    /**
     * 防抖通知
     */
    private [MittEventName.CONNECTOR_INFO_LIST_CHANGE];
    private closeConnectorById;
    private closeAllConnector;
    /**
     * 写这个函数的目的是解决当退出房间时直接emitter.all.clear()清除事件
     * 会导致MittEventName.CONNECTOR_INFO_LIST_CHANGE无法通知外界连接成员列表已改变
     */
    private clearEmitter;
    close(): void;
}
