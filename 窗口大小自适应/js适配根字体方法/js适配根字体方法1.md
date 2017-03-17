```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<!-- user-scalable=no的意思就是禁止用户缩放浏览器 -->
<!-- 这里的user-scalable=no相当于maximum-scale=1.0, minimum-scale=1.0  -->
<!-- 所以也可以这样写,如下 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
<!-- maximum-scale=1.0, minimum-scale=1.0这两个的意思是最大最小缩放比例是1,相当于不能缩放 -->
```

```javascript
(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth){
            return;
        }
        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        // 此处设置在320px宽的可视区下,1rem = 20px
    };
    if (!doc.addEventListener){
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false); 
})(document, window);
```

- `orientationchange`: 当在移动设备垂直或者水平翻转时为orientationchange事件

- `resize`: 当在浏览器窗口发生大小改变时候为resize事件

- `DOMContentLoaded`: 页面文档完全加载并解析完毕之后,会触发DOMContentLoaded事件，HTML文档不会等待样式文件,图片文件,子框架页面的加载 在jquery中相当于`$(document).ready(function(){})`

###注意
- **_1rem与px最小的比例就是浏览器最小能显示的字体大小,如chrome最小比例是1rem=12px,而在firefox中最小比例是1rem=10px_**

- **_对于字体的大小,最好还是用px来设置固定大小,rem设置字体大小后,会在不同屏幕大小的情况下,导致不精确_**

###参考链接
- [orientationchange](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)

- [resize](https://developer.mozilla.org/en-US/docs/Web/Events/resize)

- [DOMContentLoaded链接一](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)

- [DOMContentLoaded链接二](http://www.jianshu.com/p/d851db5f2f30)
