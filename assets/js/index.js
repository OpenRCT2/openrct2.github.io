// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes (bytes, decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = decimals + 1 || 3;
   var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}

var platforms = {
  windows: {
    name: 'Windows',
    link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.0.3.1/OpenRCT2-0.0.3.1-windows.zip',
    size: 12283910, //bytes
    version: '0.0.3.1'
  },
  linux: {
    name: 'Linux',
    link: 'https://github.com/OpenRCT2/OpenRCT2/releases/download/v0.0.3.1/OpenRCT2-0.0.3.1-linux.tar.xz',
    size: 6288140, //bytes
    version: '0.0.3.1'
  },
//  osx: {
//    name: 'OS X',
//    link: '',
//    size: 0,
//    version: ''
//  }
}

var current;

document.addEventListener('DOMContentLoaded', function () {
  var link = document.getElementsByClassName('link')[0];
  var size = document.getElementsByClassName('size')[0];
  var version = document.getElementsByClassName('version')[0];
  var platform = document.getElementsByClassName('platform')[0];

  if (navigator.platform.indexOf('Win') >= 0){
    current = platforms.windows;
  }

  if (navigator.platform.indexOf('Linux') >= 0){
    current = platforms.linux;
  }

//  if (navigator.platform === 'MacIntel'){
//    current = platforms.osx;
//  }

  if (current) {
    link.href = current.link;
    size.innerHTML = formatBytes(current.size, 1);
    platform.innerHTML = current.name;
    version.innerHTML = current.version;
  }

  platform.addEventListener('click', function (e) {
    e.preventDefault();

    var keys = Object.keys(platforms);

    for (var i = 0; i <= keys.length; i++) {
      if (platforms[keys[i]].name === platform.innerHTML) {
        if (i + 1 >= keys.length) {
          i = 0;
        } else {
          i = i + 1;
        }

        link.href = platforms[keys[i]].link;
        size.innerHTML = formatBytes(platforms[keys[i]].size, 1);
        platform.innerHTML = platforms[keys[i]].name;
        version.innerHTML = platforms[keys[i]].version;
        break;
      }
    }
  });
});