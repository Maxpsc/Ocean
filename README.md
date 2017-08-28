# ![image](https://github.com/Maxpsc/Ocean/blob/master/docs/ocean.png)
A web app for sharing blogs and knowledge

## 前言
这只是一个demo级别的blog网站，开发初衷是学习node的`express`框架，一开始网站的前端是用ejs模板渲染出来的，几乎没有前端的js代码，逻辑和功能也很简单。后来就想前后端分离，用`react`全家桶重新实现功能，后来逻辑越来越多，也按照产品的规格去实现。

一开始名字就是简单的Microblog，后来改名Ocean，寓意分享知识的海洋。准备功能再完善一些能在公网上线，顺便学习下服务器部署、运维那些事儿。

## 实现技术栈
- 后端：nodejs, express4.x  
- 数据库: mongodb, mongoose  
- 前端: react, react-router4.x, redux, es6+, material-ui  
- 构建: webpack, babel  

## 特点
- 支持用户注册、登录、登出，区分管理员和注册用户的权限
- 注册用户可编辑发表文章，支持markdown格式
- 用户可修改个人信息，上传头像，查看已发表文章
- 管理员可管理所有用户和已发表的文章
- 可全局修切换样式（明暗）

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
![image](https://github.com/Maxpsc/Ocean/blob/master/docs/screenshot2.png)

#### 修改个人信息
![image](https://github.com/Maxpsc/Ocean/blob/master/docs/screenshot3.png)

## 开发心得

## 待实现
- 列表项分页
- 优化样式
	- 首页文章简要信息
	- 表格管理文章行高限制
	- 多端适配
	- 。。。其它
- 上传图片添加文件大小限制，裁剪功能
- 优化代码结构，优化性能
