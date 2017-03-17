```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<!-- user-scalable=no的意思就是禁止用户缩放浏览器 -->
<!-- 这里的user-scalable=no相当于maximum-scale=1.0, minimum-scale=1.0  -->
<!-- 所以也可以这样写,如下 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
<!-- maximum-scale=1.0, minimum-scale=1.0这两个的意思是最大最小缩放比例是1,相当于不能缩放 -->
```

```javascript
!function(win, option) {
    var count = 0, 
        designWidth = option.designWidth, 
        designHeight = option.designHeight || 0, 
        designFontSize = option.designFontSize || 20, 
        callback = option.callback || null,
        root = document.documentElement,
        body = document.body,
        rootWidth, newSize, t, self;
    root.style.width = '100%';
  //返回root元素字体计算结果
    function _getNewFontSize() {
        var scale = designHeight !== 0 ? Math.min(win.innerWidth / designWidth, win.innerHeight / designHeight) : win.innerWidth / designWidth;
        return parseInt( scale * 10000 * designFontSize ) / 10000;
    }
    !function () {
        rootWidth = root.getBoundingClientRect().width;
        self = self ? self : arguments.callee;
        //如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
        if( rootWidth !== win.innerWidth &&  count < 20 ) {
            win.setTimeout(function () {
                count++;
                self();
            }, 0);
        } else {
            newSize = _getNewFontSize();
            //如果css已经兼容当前分辨率就不管了
            if( newSize + 'px' !== getComputedStyle(root)['font-size'] ) {
                root.style.fontSize = newSize + "px";
                return callback && callback(newSize);
            };
        };
    }();
    //横竖屏切换的时候改变fontSize，根据需要选择使用
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        clearTimeout(t);
        t = setTimeout(function () {
          self();
        }, 300);
    }, false);
}(window, {
    designWidth: 640, 
    // designHeight: 1136,
    designFontSize: 40,
    callback: function (argument) {
        console.timeEnd("test")
    }
});
```

- `getBoundingClientRect`: 该方法获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置.如果是`obj.getBoundingClientRect().width`那么就是得到自身元素的宽,包括边框

- `arguments.callee`callee 是 arguments 对象的属性。在该函数的函数体内，它可以指向当前正在执行的函数.表示函数自身

###注意
- **_不建议在初始传参的时候,就把高度设定进去,会更改比例_**

- **_1rem与px最小的比例就是浏览器最小能显示的字体大小,如chrome最小比例是1rem=12px,而在firefox中最小比例是1rem=10px_**

- **_对于字体的大小,最好还是用px来设置固定大小,rem设置字体大小后,会在不同屏幕大小的情况下,导致不精确_**

###参考链接
- [getBoundingClientRect](http://blog.csdn.net/ly115176236/article/details/6852851)

- [arguments.callee](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee)

