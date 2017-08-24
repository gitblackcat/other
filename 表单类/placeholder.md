### 改变输入框placeholder的样式

```html
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #f00;
    font-size: 20px;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
    color: #f00;
    font-size: 20px;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
    color: #f00;
    font-size: 20px;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: #f00;
    font-size: 20px;
}
```

**_注意,不能全部连在一起写,如下是不行的_**

```html
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder,
input:-moz-placeholder,
textarea:-moz-placeholder,
input::-moz-placeholder,
textarea::-moz-placeholder,
input:-ms-input-placeholder,
textarea:-ms-input-placeholder
    color: #f00;
    font-size: 20px;
```