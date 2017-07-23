;
(function(win, doc) {
    var docEl = doc.documentElement,
        metaEl = doc.querySelector('meta[name="viewport"]'),
        dpr = 0,
        scale = 0,
        tid

    if (!dpr && !scale) {
        //devicePixelRatio这个属性是可以获取到设备的dpr
        var devicePixelRatio = win.devicePixelRatio;
        //判断dpr是否为整数
        var isRegularDpr = devicePixelRatio.toString().match(/^[1-9]\d*$/g)
        if (isRegularDpr) {
            // 对于是整数的dpr，对dpr进行操作
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 对于其他的dpr，仍采用dpr为1的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr)
    if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
        docEl.firstElementChild.appendChild(metaEl)
    } else {
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width
        var rem = width / 10
        docEl.style.fontSize = rem + 'px'
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
    }, false)

    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300)
        }
    }, false)

    refreshRem()

})(window, document)
