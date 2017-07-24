```javascript
;
(function(win, doc, designWidth, rem2px) {
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
        var width = docEl.getBoundingClientRect().width,
            height = docEl.getBoundingClientRect().height,
            d = doc.createElement('div')

        d.style.display = 'none'
        d.style.width = '1rem'
        docEl.firstElementChild.append(d)
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'))
        docEl.style.fontSize = width / (designWidth / rem2px) / defaultFontSize * 100 + '%'
            // 1rem = htmlFontSize * defaultFontSize
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
        window.location.reload()
    }, false)

    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300)
            window.location.reload()
        }
    }, false)

    refreshRem()

})(window, document, 750, 100)
```

```javascript
(function(e,j,f,d){var a=j.documentElement,h=j.querySelector('meta[name="viewport"]'),k=0,b=0,c;if(!k&&!b){var i=e.devicePixelRatio;var l=i.toString().match(/^[1-9]\d*$/g);if(l){if(i>=3&&(!k||k>=3)){k=3}else{if(i>=2&&(!k||k>=2)){k=2}else{k=1}}}else{k=1}b=1/k}a.setAttribute("data-dpr",k);if(!h){h=j.createElement("meta");h.setAttribute("name","viewport");h.setAttribute("content","initial-scale="+b+",maximum-scale="+b+",minimum-scale="+b+",user-scalable=no");a.firstElementChild.appendChild(h)}else{h.setAttribute("name","viewport");h.setAttribute("content","initial-scale="+b+",maximum-scale="+b+",minimum-scale="+b+",user-scalable=no")}function g(){var n=a.getBoundingClientRect().width,m=a.getBoundingClientRect().height,p=j.createElement("div");p.style.display="none";p.style.width="1rem";a.firstElementChild.append(p);var o=parseFloat(window.getComputedStyle(p,null).getPropertyValue("width"));a.style.fontSize=n/(f/d)/o*100+"%"}e.addEventListener("resize",function(){clearTimeout(c);c=setTimeout(g,300);window.location.reload()},false);e.addEventListener("pageshow",function(m){if(m.persisted){clearTimeout(c);c=setTimeout(g,300);window.location.reload()}},false);g()})(window,document,750,100);
```