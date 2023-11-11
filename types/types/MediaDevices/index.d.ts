import { Merge } from '../';
export type DeviceInfo = MediaDeviceInfo | InputDeviceInfo;
export type Constraints = Merge<MediaStreamConstraints, {}>;
