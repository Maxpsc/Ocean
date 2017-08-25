# Ocean
A web app for sharing blogs and knowledge

## 前言
这只是一个demo级别的blog网站，开发初衷是学习node的`express`框架，一开始网站的前端是用ejs模板渲染出来的，几乎没有前端的js代码，逻辑和功能也很简单。后来就想前后端分离，用`react`全家桶重新实现功能，后来逻辑越来越多，也按照产品的规格去实现。

一开始名字就是简单的Microblog，后来改名Ocean，寓意分享知识的海洋。准备功能再完善一些能在公网上线，顺便学习下服务器部署、运维那些事儿。

## 实现技术栈
- 后端：nodejs, express4.x  
- 数据库: mongodb, mongoose  
- 前端: react, react-router4.x, redux, es6+, material-ui  
- 构建: webpack, babel  

## 安装,启动
clone代码到本地并安装依赖：  
	`git clone https://github.com/Maxpsc/Ocean.git`  
	`cd Ocean && npm install`

需要自行安装mongodb, 详情见[MongoDB ](https://www.mongodb.com/download-center#atlas).  
数据库管理这里墙裂推荐[Studio 3T](https://studio3t.com/), 无需破解，有免费版且很实用。

安装完，启动数据库：  
`sudo mongod`  

启动后台服务(默认3000端口)：  
`npm run server`  

启动开发环境（默认9090端口）：  
`npm run dev`  

build代码：  
`npm run build`  

## 预览
#### 首页
![image](https://github.com/Maxpsc/Ocean/blob/master/docs/screenshot1.png)

#### markdown展示
![image](https://github.com/Maxpsc/Ocean/blob/master/blob/master/docs/screenshot2.png)

#### 修改个人信息
![image](https://github.com/Maxpsc/Ocean/blob/master/docs/screenshot3.png)

## 我想说的

## 待实现
