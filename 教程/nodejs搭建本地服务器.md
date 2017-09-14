### 用node.js来搭建本地服务器
1. 下载安装node.js
2. 用node.js搭建本地服务器,在cmd中输入
	
	`npm install anywhere -g`

3. 在cmd中转到你想要用服务器打开的文件夹,并在cmd中输入以下代码
	
	`anywhere 8860`

	这里的8860只是端口号 也可以改成其他的。如果不填，默认端口为8000

4. 如果要在手机端测试,那么在电脑上打开网页然后用ip地址加冒号端口，来替换localhost。把链接发给手机，手机就能测试电脑上自己写的网页了。如果发到微信端，就能在微信端测试网页。这是把电脑当做本地服务器来使用的一种方式(注意手机上测试,那么手机连接的局域网要保证和电脑连接的局域网是同一个)

与anywhere类似的,还有`live-server`

安装`npm install live-server -g`

启用`live-server`

默认端口号是8080

也可以更改端口号

`live-server --port=5656`

`live-server`比`anywhere`好的一点是不会被`adsafe`屏蔽,而且代码上有修改保存后,同步自动刷新页面
	