module.exports = () => {
  return `
var loadUrls = (function() {
  var timer = null;
  var headNode = document.head || document.querySelector('head');
  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function loadCSS(url, done) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.onload = onload;
    link.setAttribute('data-ice-style-loaded', 'true');

    var timer = setTimeout(function() {
      console.warn('加载 css 超时!');
      done && done(new Error('timeout for 5s'));
    }, 5 * 1000); // 超时时间 5s
    function onload() {
      clearTimeout(timer);
      done && done(null, link);
    }
    headNode.appendChild(link);
  }

  function load(url, done) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;

    clearTimer();
    timer = setTimeout(function() {
      clearTimer();
      done('请求超时');
    }, 60 * 1000);

    function onerror(evt) {
      script.onerror = null;
      script = null;
      clearTimer();
      done('JS Can not load: ' + url);
    }

    function onload() {
      var readyState = script.readyState;
      if (!readyState ||
        readyState === 'loaded' ||
        readyState === 'complete') {
        script.onreadystatechange = script.onload = null;
        script = undefined;
        clearTimer();
        done(null);
      }
    }

    if ('onload' in script) {
      script.onload = onload;
      script.onerror = onerror;
    } else {
      script.onreadystatechange = onload;
    }

    script.onreadystatechange = script.onload = onload;
    script.src = url;

    headNode.insertBefore(script, headNode.firstChild);
  }

  return function(urlList, callback) {
    if (!headNode) {
      throw new Error('页面中必须存在 head 元素');
    }
    var loadList = urlList.map(function(url) {
      var fileExtension = url.split('.').pop().toLowerCase();
      if (/.css$/.test(url)) {
        return { type: 'css', url: url };
      } else if (/.js$/.test(url)) {
        return { type: 'js', url: url };
      } else {
        console.warn('未知脚本', url);
        return null;
      }
    }).filter(function(value){
      return !!value;
    });
    var counter = loadList.length;

    (function run(counter){
      if (counter === 0) {
        return callback();
      }

      var current = loadList.shift();

      var loadFn = current.type === 'css' ? loadCSS : load;
      loadFn(current.url, function(err) {
        if (err) {
          console.error(err);
          return;
        }
        run(loadList.length);
      });
    })(counter);
  };
})();
  `;
};
