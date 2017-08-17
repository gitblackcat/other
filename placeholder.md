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