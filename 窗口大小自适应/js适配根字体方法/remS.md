```javascript
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
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')

        docEl.firstElementChild.appendChild(metaEl)
    } else {
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no')
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
```

```javascript
(function(e,j,f,d){var a=j.documentElement,h=j.querySelector('meta[name="viewport"]'),k=0,b=0,c,i=e.devicePixelRatio,l=i.toString().match(/^[1-9]\d*$/g);if(!k&&!b){if(l){if(i>=3&&(!k||k>=3)){k=3}else{if(i>=2&&(!k||k>=2)){k=2}else{k=1}}}else{k=1}b=1/k}a.setAttribute("data-dpr",k);if(!h){h=j.createElement("meta");h.setAttribute("name","viewport");h.setAttribute("content","initial-scale="+b+", maximum-scale="+b+",minimum-scale="+b+",user-scalable=no");a.firstElementChild.appendChild(h)}else{h.setAttribute("name","viewport");h.setAttribute("content","initial-scale="+b+",maximum-scale="+b+",minimum-scale="+b+",user-scalable=no")}function g(q,n){var o=a.getBoundingClientRect().width,r=window.document.createElement("div");r.style.width="1rem";r.style.display="none";a.firstElementChild.appendChild(r);var p=parseFloat(window.getComputedStyle(r,null).getPropertyValue("width")),s="@media screen and (width: "+o+"px) {html{font-size:"+((o/(q/n)/p)*100)+"%;}}",m=j.getElementById("dpAdapt");if(!m){m=document.createElement("style");m.id="dpAdapt";m.innerHTML=s;a.firstElementChild.appendChild(m)}else{m.innerHTML=s}setTimeout(function(){var t=e.innerHeight,v="@media screen and (width: "+t+"px) {html{font-size:"+((t/(q/n)/p)*100)+"%;}}",u=j.getElementById("dlAdapt");if(!u){u=document.createElement("style");u.id="dlAdapt";u.innerHTML=v;a.firstElementChild.appendChild(u)}else{u.innerHTML=v}},500)}setTimeout(function(){g(f,d)},1)})(window,document,750,100);
```