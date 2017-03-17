###window系统下Sublime Text3搭建node.js环境步骤
1. 下载安装Node.js
2. 下载Node.js插件,

	[下载地址](https://github.com/tanepiper/SublimeText-Nodejs)
	
	下载后,解压出来的文件夹重命名为Nodejs

3. 打开Sublime Text3,点击菜单"Perferences" => "Browse Packages"自动会跳转到Packages文件夹里,把第二步中重命名为Nodejs的文件夹复制进来
4. 打开Nodejs中的文件"Nodejs.sublime-build",将代码"encoding":"cp1252"改为"encoding":"utf-8"，将代码"cmd":"["taskkill/F /IM node.exe & node","$file"]"改成"cmd":"["node","$file"]"，保存文件

5. 打开Nodejs文件夹下的文件“Nodejs.sublime-settings”，将代码"node_command":"false"改为"node_command":"F:\\nodejs\\node.exe",将代码"npm_command":"false"改为"npm_command":"F:\\nodejs\\npm.cmd"(这里我把第一步中的node.js下载后放置在了f盘的nodejs文件夹下)