export function sliceBase64ToFile(base64Str, filename) {
    var blobs = Array.isArray(base64Str)
        ? base64Str.map(function (str) { return base64ToBlob(str); })
        : [base64ToBlob(base64Str)];
    var type = blobs[0].type;
    var blob = new Blob(blobs, { type: type });
    return new File([blob], filename, { type: blob.type });
}
export function base64ToBlob(base64Str) {
    var array = base64Str.split(',');
    var type = base64Str.split(',')[0].match(/:(.*?);/)[1];
    var bStr = atob(array[1]);
    var n = bStr.length;
    var uint8Array = new Uint8Array(n);
    while (n--) {
        uint8Array[n] = bStr.charCodeAt(n);
    }
    return new Blob([uint8Array], { type: type });
}
export function sliceFileAndBlobToBase64(file, chunkSize) {
    if (chunkSize === void 0) { chunkSize = 1024 * 1024; }
    return Promise.all(sliceFileOrBlob(file, chunkSize).map(function (blob) { return fileAndBlobToBase64(blob); }));
}
export function sliceFileAndBlobToArrayBuffer(file, chunkSize) {
    if (chunkSize === void 0) { chunkSize = 1024 * 1024; }
    return Promise.all(sliceFileOrBlob(file, chunkSize).map(function (blob) { return fileAndBlobToArrayBuffer(blob); }));
}
export function sliceFileOrBlob(file, chunkSize) {
    if (chunkSize === void 0) { chunkSize = 1024 * 1024; }
    var chunks = [];
    for (var offset = 0; offset < file.size; offset += chunkSize) {
        var slice = file.slice(offset, offset + chunkSize);
        var chunk = new Blob([slice], { type: file.type });
        chunks.push(chunk);
    }
    return chunks;
}
export function base64ToFile(base64Str, filename) {
    var array = base64Str.split(',');
    var mime = array[0].match(/:(.*?);/)[1];
    var bStr = atob(array[1]);
    var n = bStr.length;
    var u8Array = new Uint8Array(n);
    while (n--) {
        u8Array[n] = bStr.charCodeAt(n);
    }
    return new File([u8Array], filename, { type: mime });
}
export function fileAndBlobToBase64(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var base64Str;
        reader.onload = function () {
            base64Str = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            var base64String = base64Str.split(',')[1];
            base64Str = "data:".concat(file.type, ";base64,").concat(base64String);
            resolve(base64Str);
        };
        reader.readAsDataURL(file);
    });
}
export function fileAndBlobToArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var arraybuffer;
        reader.onload = function () {
            arraybuffer = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(arraybuffer);
        };
        reader.readAsArrayBuffer(file);
    });
}
export function arrayBufferToBase64(buffer) {
    return window.btoa(new Uint8Array(buffer).reduce(function (a, b) { return a + String.fromCharCode(b); }, ''));
}
export function base64ToArrayBuffer(base64Str) {
    var binaryString = window.atob(base64Str);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
export function fileToBlob(file, type) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var buffer;
        reader.onload = function () {
            buffer = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(new Blob([buffer], { type: type || file.type }));
        };
        reader.readAsArrayBuffer(file);
    });
}
export function blobToFile(blob, fileName) {
    return new File([blob], fileName, { type: blob.type });
}
export function saveFile(file) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(a.href);
}
export function saveFileByUrl(url, name) {
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
}
