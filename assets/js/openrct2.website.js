var openrct2 = {};

openrct2.Platform = Object.freeze({
    UNKNOWN: {},
    WINDOWS32: {
        name: 'Windows (32-bit)',
        link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.1.1/OpenRCT2-0.1.1-windows-portable-win32.zip',
        size: 6047161,
        version: '0.1.1'
    },
    WINDOWS64: {
        name: 'Windows (64-bit)',
        link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.1.1/OpenRCT2-0.1.1-windows-portable-x64.zip',
        size: 6823190,
        version: '0.1.1'
    },
    MACOS: {
        name: 'macOS',
        link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.1.1/OpenRCT2-0.1.1-macos.zip',
        size: 7624484,
        version: '0.1.1'
    },
    LINUX: {
        name: 'Linux',
        link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.1.1/OpenRCT2-0.1.1-linux-x86_64.tar.gz',
        size: 15949572,
        version: '0.1.1'
    }
});  // Object.freeze() prevents this from being futzed with

function getPlatform(){
    if (navigator.platform.indexOf('Win') >= 0){
        if (navigator.userAgent.indexOf("WOW64") === -1 && navigator.userAgent.indexOf("Win64") === -1 ){
            return openrct2.Platform.WINDOWS32;
        } else {
            return openrct2.Platform.WINDOWS64;  // 64-bit is the default as it is by far the most common these days
        }
    } else if (navigator.platform.indexOf('Linux') >= 0){
        return openrct2.Platform.LINUX;
    } else if (navigator.platform === 'MacIntel'){
        return openrct2.Platform.MACOS;
    } else {
        return openrct2.Platform.UNKNOWN;
    }
}

openrct2.currentPlatform = getPlatform();