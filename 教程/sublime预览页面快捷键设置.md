###Window版
1. Preferences --- Key Bindings

2. 粘贴以下代码
```
[   
    // chrome
    { "keys": ["f2"], "command": "side_bar_files_open_with",
            "args": {
                "paths": [],
                "application": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
                "extensions":".*"
            }
    },

    // firefox
    { "keys": ["f3"], "command": "side_bar_files_open_with",
            "args": {
                "paths": [],
                "application": "D:/火狐/firefox.exe",
                "extensions":".*"
            }
    },

    // ie
    { "keys": ["f4"], "command": "side_bar_files_open_with",
            "args": {
                "paths": [],
                "application": "C:/Program Files/Internet Explorer/iexplore.exe",
                "extensions":".*"
            }
    }
]
```

####参考
[知乎](http://www.zhihu.com/question/27219231?sort=created)