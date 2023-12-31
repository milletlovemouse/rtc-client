export declare function sliceBase64ToFile(base64Str: string | string[], filename: string): File;
export declare function base64ToBlob(base64Str: string): Blob;
export declare function sliceFileAndBlobToBase64(
  file: FileOrBlob,
  chunkSize?: number,
): Promise<string[]>;
export declare function sliceFileAndBlobToArrayBuffer(
  file: FileOrBlob,
  chunkSize?: number,
): Promise<ArrayBuffer[]>;
export declare function sliceFileOrBlob(file: FileOrBlob, chunkSize?: number): Blob[];
export declare function base64ToFile(base64Str: string, filename: string): File;
type FileOrBlob = File | Blob;
export declare function fileAndBlobToBase64(file: FileOrBlob): Promise<string>;
export declare function fileAndBlobToArrayBuffer(file: FileOrBlob): Promise<ArrayBuffer>;
export declare function arrayBufferToBase64(buffer: ArrayBuffer): string;
export declare function base64ToArrayBuffer(base64Str: string): ArrayBuffer;
export declare function fileToBlob(file: File, type?: string): Promise<Blob>;
export declare function blobToFile(blob: Blob, fileName: string): File;
export declare function saveFile(file: File): void;
export declare function saveFileByUrl(url: string, name: string): void;
export {};
