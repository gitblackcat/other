### 关于better-scroll的下拉刷新和上拉加载
下拉刷新和上拉加载相关的`API`都是在`better-scroll`1.2版本以后出现的

如果不是1.2版本,那么可以通过事件`scrollEnd`来替代

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
    <title>Document</title>
    <script>
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) {
                    return;
                }
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                // 此处设置在320px宽的可视区下,1rem = 20px
            };
        if (!doc.addEventListener) {
            return;
        }
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    </script>
    <style>
    html,
    body,
    ul {
        padding: 0;
        margin: 0;
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        /* height: 10rem; */
        overflow: hidden;
    }

    ul {
        list-style: none;
    }

    li {
        height: 6rem;
        line-height: 6rem;
        font-size: 16px;
        color: red;
        background-color: #fff;
        border-bottom: 1px solid red;
        text-align: center;
    }

    li:last-child {
        border-bottom: none;
    }
    </style>
</head>

<body>
    <div class="wrap">
        <ul class="scroll">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
        </ul>
    </div>
    <script type="text/javascript" src="http://img.qfc.cn/static/jquery/3.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="bs.js"></script>
    <script>
    $(function() {
        var wrap = document.querySelector('.wrap'),
            s = new BScroll(wrap, {
                pullDownRefresh: { //下拉刷新
                    threshold: 20,
                    stop: 10
                },
                pullUpLoad: { //上拉加载
                    threshold: -20
                }
            }),
            down = true,
            up = true

        s.on('pullingDown', function() {
            if (down) {
                var str = ''
                for (var i = -9; i < 1; i++) {
                    str += `<li>${i}</li>`
                }
                console.log(str)
                $('.scroll').prepend(str)
                s.finishPullDown()
                s.refresh()
                down = false
            }
        })

        s.on('pullingUp', function() {
            if (up) {
                var str = ''
                for (var i = 11; i < 20; i++) {
                    str += `<li>${i}</li>`
                }
                $('.scroll').append(str)
                s.finishPullUp()
                s.refresh()
                up = false
            }
        })
    })
    </script>
</body>

</html>
```

#### 资源链接
[https://github.com/ustbhuangyi/better-scroll](https://github.com/ustbhuangyi/better-scroll)

[https://github.com/DDFE/DDFE-blog](https://github.com/DDFE/DDFE-blog)

#### better-scroll模拟横向滚动需要注意的地方

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>Document</title>
    <script>
    (function flexible(window, document) {
        var docEl = document.documentElement
        var dpr = window.devicePixelRatio || 1

        // adjust body font size
        function setBodyFontSize() {
            if (document.body) {
                document.body.style.fontSize = (12 * dpr) + 'px'
            } else {
                document.addEventListener('DOMContentLoaded', setBodyFontSize)
            }
        }
        setBodyFontSize();

        // set 1rem = viewWidth / 10
        function setRemUnit() {
            var rem = docEl.clientWidth / 7.5
            docEl.style.fontSize = rem + 'px'
        }

        setRemUnit()

        // reset rem unit on page resize
        window.addEventListener('resize', setRemUnit)
        window.addEventListener('pageshow', function(e) {
            if (e.persisted) {
                setRemUnit()
            }
        })

        // detect 0.5px supports
        if (dpr >= 2) {
            var fakeBody = document.createElement('body')
            var testElement = document.createElement('div')
            testElement.style.border = '.5px solid transparent'
            fakeBody.appendChild(testElement)
            docEl.appendChild(fakeBody)
            if (testElement.offsetHeight === 1) {
                docEl.classList.add('hairlines')
            }
            docEl.removeChild(fakeBody)
        }
    }(window, document))
    </script>
    <style>
    html,
    body,
    ul {
        padding: 0;
        margin: 0;
    }

    ul {
        list-style: none;
    }

    .wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 5rem;
        overflow: hidden;
    }

    li {
        float: left;
        width: 2.336rem;
        height: 5rem;
    }

    li div {
        width: 1.5rem;
        height: 5rem;
        background-color: #f00;
    }
    </style>
</head>

<body>
    <div class="wrap">
        <ul>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
        </ul>
    </div>
    <script type="text/javascript" src="bs.min.js"></script>
    <script>
    var lis = document.querySelectorAll('li'),
        w = 0
    for (var i = 0; i < lis.length; i++) {
        w += lis[i].getBoundingClientRect().width
    }

    document.querySelector('ul').style.width = w + 'px' 
    //注意这里必须是px为最后结算单位,不能用其他的

    var scroll = new BScroll(document.querySelector('.wrap'), {
        scrollX: true
    })
    </script>
</body>

</html>
```
