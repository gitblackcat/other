```javascript
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

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem()

})(window, document)
```

```javascript
(function(d,g){var a=g.documentElement,f=g.querySelector('meta[name="viewport"]'),h=0,b=0,c;if(!h&&!b){var i=d.devicePixelRatio;var j=i.toString().match(/^[1-9]\d*$/g);if(j){if(i>=3&&(!h||h>=3)){h=3}else{if(i>=2&&(!h||h>=2)){h=2}else{h=1}}}else{h=1}b=1/h}a.setAttribute("data-dpr",h);if(!f){f=g.createElement("meta");f.setAttribute("name","viewport");f.setAttribute("content","initial-scale="+b+",maximum-scale="+b+",minimum-scale="+b+",user-scalable=no");a.firstElementChild.appendChild(f)}else{f.setAttribute("name","viewport");f.setAttribute("content","initial-scale="+b+",maximum-scale="+b+",minimum-scale="+b+",user-scalable=no")}function e(){var k=a.getBoundingClientRect().width;var l=k/10;a.style.fontSize=l+"px"}d.addEventListener("resize",function(){clearTimeout(c);c=setTimeout(e,300)},false);d.addEventListener("pageshow",function(k){if(k.persisted){clearTimeout(c);c=setTimeout(e,300)}},false);if(g.readyState==="complete"){g.body.style.fontSize=12*h+"px"}else{g.addEventListener("DOMContentLoaded",function(k){g.body.style.fontSize=12*h+"px"},false)}e()})(window,document);
```