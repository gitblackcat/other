;
(function(win, doc, designWidth, rem2px) {
    var docEl = doc.documentElement,
        metaEl = doc.querySelector('meta[name="viewport"]'),
        dpr = 0,
        scale = 0,
        tid,
        devicePixelRatio = win.devicePixelRatio, //devicePixelRatio这个属性是可以获取到设备的dpr
        isRegularDpr = devicePixelRatio.toString().match(/^[1-9]\d*$/g) //判断dpr是否为整数

    if (!dpr && !scale) {
        if (isRegularDpr) {
            // 对于是整数的dpr，对dpr进行操作
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2
            } else {
                dpr = 1
            }
        } else {
            // 对于其他的dpr，仍采用dpr为1的方案
            dpr = 1
        }
        scale = 1 / dpr
    }

    docEl.setAttribute('data-dpr', dpr)
    if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')

        docEl.firstElementChild.appendChild(metaEl)
    } else {
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
    }

    function refreshRem(designWidth, rem2px) {
        // 修改viewport后，对网页宽度的影响，会立刻反应到
        // document.documentElement.getBoundingClientRect().width
        // 而这个改变反应到 window.innerWidth ，需要等较长的时间
        var width = docEl.getBoundingClientRect().width,
            d = window.document.createElement('div')
        d.style.width = '1rem'
        d.style.display = "none"
        docEl.firstElementChild.appendChild(d)
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width')),
            portrait = "@media screen and (width: " + width + "px) {html{font-size:" + ((width / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}",
            dpStyleEl = doc.getElementById('dpAdapt')
        if (!dpStyleEl) {
            dpStyleEl = document.createElement('style')
            dpStyleEl.id = 'dpAdapt'
            dpStyleEl.innerHTML = portrait
            docEl.firstElementChild.appendChild(dpStyleEl)
        } else {
            dpStyleEl.innerHTML = portrait
        }
        // 由于 height 的响应速度比较慢，所以在加个延时处理横屏的情况。
        setTimeout(function() {
            var height = win.innerHeight,
                landscape = "@media screen and (width: " + height + "px) {html{font-size:" + ((height / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}",
                dlStyleEl = doc.getElementById('dlAdapt')
            if (!dlStyleEl) {
                dlStyleEl = document.createElement('style')
                dlStyleEl.id = 'dlAdapt'
                dlStyleEl.innerHTML = landscape
                docEl.firstElementChild.appendChild(dlStyleEl)
            } else {
                dlStyleEl.innerHTML = landscape
            }
        }, 500)
    }

    // 延时，让浏览器处理完viewport造成的影响，然后再计算root font-size。
    setTimeout(function() {
        refreshRem(designWidth, rem2px)
    }, 1)

})(window, document, 750, 100)
