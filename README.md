# Ocean
A web app for sharing blogs and knowledge

## 介绍

这只是一个demo级别的blog网站，开发初衷是学习node的express框架，一开始网站的前端是用ejs模板渲染出来的，几乎没有前端的js代码，逻辑和功能也很简单。后来就想前后端分离，用react全家桶重新实现功能，后来逻辑越来越多，也按照产品的规格去实现。

一开始名字就是简单的Microblog，后来改名Ocean，寓意分享知识的海洋。准备功能再完善一些能在公网上线，顺便学习下服务器部署、运维那些事儿。

## 实现技术栈

	- 后端：nodejs, express4.x  
	- 数据库: mongodb, mongoose  
	- 前端: react, react-router4.x, redux, es6+, material-ui  
	- 构建: webpack, babel  
	
## 安装,启动

	clone代码到本地并安装依赖：  
	`git clone `  
	`cd Ocean && npm install`  
  需要自行安装mongodb,详情见。。。  
  安装完，启动数据库：  
  `sudo mongod`  
  启动后台服务(默认3000端口)：  
  `npm run server`  
  启动开发环境（默认9090端口）：  
  `npm run dev`  
  
  build代码：  
  `npm run build`  
	
## 网站截图
	
## 我想说的

## 待实现
