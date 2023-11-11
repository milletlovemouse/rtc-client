import { Socket } from 'socket.io-client';
import { Options, ConnectFunc } from '../../types/Socket';
export default class SocketClient {
  readonly socket: Socket;
  private connect;
  constructor(options: Options);
  sendMessage(messageName: string, message?: any): void;
  onMessage(messageName: string, callback: <T>(message: T) => void): void;
  offMessage(messageName: string, callback: <T>(message: T) => void): void;
  onConnect(callback: ConnectFunc): void;
  sendTextMessage(message: string): void;
  sendImageMessage(message: File | Blob | string): void;
  sendFileMessage(message: File | Blob | string): void;
  bind(): void;
  close(): void;
}
