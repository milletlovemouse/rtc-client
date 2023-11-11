export declare function debounce<T>(
  fn: (...args: any[]) => T,
  delay: number,
  immediate?: boolean,
): {
  (...args: any[]): Promise<T>;
  cancel(): void;
};
export declare function throttle<T>(
  fn: (...args: any[]) => T,
  interval: number,
  options?: {
    leading: boolean;
    trailing: boolean;
  },
): {
  (...args: any[]): Promise<T>;
  cancel(): void;
};
export declare const isBoolean: (data: any) => boolean;
export declare const isNumber: (data: any) => boolean;
export declare const isString: (data: any) => boolean;
export declare const isFunction: (data: any) => boolean;
export declare const isArray: (data: any) => boolean;
export declare const isType: (data: any, type: string) => boolean;
export declare const isObject: (data: any) => boolean;
