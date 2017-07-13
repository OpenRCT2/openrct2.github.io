// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes (bytes, decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000;
   var dm = decimals + 1 || 3;
   var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}

document.addEventListener('DOMContentLoaded', function () {
  var link = document.getElementsByClassName('link')[0];
  var size = document.getElementsByClassName('size')[0];
  var version = document.getElementsByClassName('version')[0];
  var platform = document.getElementsByClassName('platform')[0];

  if (openrct2.currentPlatform !== openrct2.Platform.UNKNOWN) {
    link.href = openrct2.currentPlatform.link;
    size.innerHTML = formatBytes(openrct2.currentPlatform.size, 1);
    platform.innerHTML = openrct2.currentPlatform.name;
    version.innerHTML = openrct2.currentPlatform.version;
  }

  platform.addEventListener('click', function (e) {
    e.preventDefault();
    
    var keys = Object.keys(openrct2.Platform);

    for (var i = 0; i <= keys.length; i++) {
      if (openrct2.Platform[keys[i]].name === platform.innerHTML) {
        if (i + 1 >= keys.length) {
          i = 1;
        } else {
          i = i + 1;
        }
        
        link.href = openrct2.Platform[keys[i]].link;
        size.innerHTML = formatBytes(openrct2.Platform[keys[i]].size, 1);
        platform.innerHTML = openrct2.Platform[keys[i]].name;
        version.innerHTML = openrct2.Platform[keys[i]].version;
        break;
      }
    }
  });
});