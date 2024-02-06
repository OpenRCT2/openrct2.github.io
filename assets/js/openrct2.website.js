var openrct2 = {};
openrct2.currentPlatform = {};

// GitHub repository information
const owner = 'openrct2';
const repo = 'openrct2';

// Platform-specific download links
const platformLinks = Object.freeze({
    UNKNOWN: {},
    WINDOWS_ARM64: {
        name: 'Windows (ARM64)',
        link: 'windows-installer-arm64.exe',
    },
    WINDOWS32: {
        name: 'Windows (32-bit)',
        link: 'windows-installer-win32.exe',
    },
    WINDOWS64: {
        name: 'Windows (64-bit)',
        link: 'windows-installer-x64.exe',
    },
    MACOS: {
        name: 'macOS',
        link: 'macos-universal.zip',
    },
    LINUX: {
        name: 'Linux',
        link: 'linux-x86_64.AppImage',
    }
});

// Function to get visitor's platform
function getPlatform(){
    if (navigator.platform.indexOf('Win') >= 0){
        if (navigator.userAgent.indexOf("ARM64") >= 0 ){
            return 'WINDOWS_ARM64';
        } else if (navigator.userAgent.indexOf("WOW64") === -1 && navigator.userAgent.indexOf("Win64") === -1 ){
            return 'WINDOWS32';
        } else {
            return 'WINDOWS64';
        }
    } else if (navigator.platform.indexOf('Linux') >= 0){
        return 'LINUX';
    } else if (navigator.platform === 'MacIntel'){
        return 'MACOS';
    } else {
        return 'UNKNOWN';
    }
}

openrct2.Platform = Object.freeze(platformLinks);

async function getLatestRelease() {
    // Fetch latest release from GitHub API
    await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
        .then(response => response.json())
        .then(data => {
            // Extract the tag name and assets
            const tagName = data.tag_name;
            const assets = data.assets;

            // Container to hold download links
            const downloadContainer = document.getElementById('download-container');

            // Get user's platform
            const userPlatform = getPlatform();

            // Get platform-specific download link and object size
            const platformDownload = platformLinks[userPlatform];

            if (platformDownload) {
                const downloadLink = assets.find(asset => asset.name.toLowerCase().includes(platformDownload.link.toLowerCase()));

                if (downloadLink) {
                    openrct2.currentPlatform = platformDownload;
                    openrct2.currentPlatform.version = tagName;
                    openrct2.currentPlatform.name = platformDownload.name;
                    openrct2.currentPlatform.link = downloadLink.browser_download_url;
                    openrct2.currentPlatform.size = downloadLink.size;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub release information:', error);
        });
}
