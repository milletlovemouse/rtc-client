export type Callback = (...args: any[]) => void;
export type EventMap = Map<string, Set<Callback>>;
export default class CustomEventTarget {
    target: EventTarget;
    eventMap: EventMap;
    constructor(target?: EventTarget);
    on(eventName: string, callback: (...args: any[]) => void): void;
    off(eventName: string, callback?: (...args: any[]) => void): void;
    offAll(): void;
    close(): void;
}
