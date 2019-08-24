# 21Duck

A web forum based on react, antd and django-rest-framework

本次小学期为敏捷开发，大致方向是一个包含前后端的Web项目
敏捷开发意味着人人全栈，所以需要大家看一下前端和后端框架的相关知识和使用
技术栈
我目前考虑的解决方案，想法可以在群里提出来讨论
前端 react + react-router + redux全家桶 + react-antd
后端 django-rest-framework(drf) + mysql + redis(drf的cache backend)
通信 axios
部署 nginx + uwsgi + serve
以下斜体表示可以暂时跳过
前端
javascript基础
基础语法
这部分可以跳过，js的语法和java类似
ES6语法
npm的使用
（czr写的教程: https://blog.csdn.net/u011240877/article/details/76582670）
全局package和非全局package的安装和使用
cnpm淘宝镜像加速
了解一个nodejs项目的结构，特别是package.json
react：前端框架
create-react-app脚手架的使用
npx create-react-app <App>
官方快速入门文档
官方井字棋demo
react hook
react-router：react绑定路由组件
直接看↓demo里的实现
到时候直接魔改一下路径就可以用了
redux：全局状态管理容器
redux
redux核心思想
react-redux文档：react的绑定redux库
react-redux基于hook的api
官方TodoList的demo
redux-devtools-extension：浏览器redux调试工具
reselect：通过缓存机制提升selector性能
reselect文档
redux-sage
redux-saga官方文档：redux异步action
ES6生成器Generator
antd：react绑定UI库
官方文档 react-antd
ant motion：react绑定动画库
主要是文字动画、进出场动画和Banner动画
django-rest-framework：后端，主要进行数据库操作以及提供api
RESTful api
看下面↓demo/backend里的解释即可
简单讲就是一个动宾结构，动词是HTTP请求，宾语是api，返回一个JSON对象
django
django官方文档
其中First Step标题下是一个快速入门教程
特别是数据库操作那一部分
django-rest-framework(drf)
drf官方文档
相当于一个不关注前端，只提供RESTful api的django
drf-extensions文档
使用提供的cache机制和PartialUpdateSerializerMixin组件
异步请求库axios：前后端通信
官方文档
ES6异步编程Promise
TodoList Demo
完整地址https://github.com/Zx55/todo-list-demo
如果demo有任何问题，可以在钉钉相关的部门提出来或者直接在GitHub上提issue
frontend
参考react-redux的官方demo写了一个TodoList的demo
https://github.com/Zx55/todo-list-demo/tree/master/frontend
最终前端的代码基本按照这个结构来设计和编写的
建议大家都看一下，特别是redux的那部分
使用antd的ui组件
引入了reselect通过cache机制提升selector性能
使用react-router添加路由功能，加入了Click和About页面
http://114.115.204.217 => todo-list页面
http://114.115.204.217/todo => todo-list页面
http://114.115.204.217/click => click页面
http://114.115.204.217/about => about页面
重构state结构，将visibilityFilter从state中移除，在VisibilityFilter组件中维护状态
使用react hook重构了所有类组件为函数组件
使用React.Suspense对不同路由下的组件进行懒加载
目前等待加载的组件<Loading />仍然比较简陋
使用react-redux基于hook的api重构了组件代码，提高了可读性
注意memorized selector被用于多个组件且依赖于props，需要为每个组件实例都声称一个selector
加入redux-devtools-extension中间件用于开发环境的调试（安装chrome插件）
使用ant-motion添加进出场动画
使用typescript重构完成，原来js的代码放在了js分支上
master => typescript
js => javascript
backend
使用drf实现了简单的后端
https://github.com/Zx55/todo-list-demo/tree/master/backend
api的形式如下
GET http://114.115.204.217:8000/todo-list/todo -> 获取全部todo
GET http://114.115.204.217:8000/todo-list/todo/<int:pk> -> 获取id为pk的todo
POST http://114.115.204.217:8000/todo-list/todo + json -> 按照json内容添加新的todo
PUT http://114.115.204.217:8000/todo-list/todo/<int:pk> + json -> 按照json内容修改id为pk的todo
DELETE http://114.115.204.217:8000/todo-list/todo/<int:pk> -> 是删除id为pk的todo
引入django-cors-headers解决跨域(CORS)问题
使用PartialUpdateSerializerMixin部分序列化模型字段，提升性能
使用redis数据库作为drf-extensions中cache的backend，提升性能
目前从服务器得到的数据比较小，体现不出cache的优势
通信
使用axios实现了前端与后端通信
使用redux-saga监听异步action并请求服务器，得到数据后执行同步action更新store中的状态
异步action包括
addTodo，将Todo添加到服务器
toggleTodo，更新Todo状态
部署
前端：在华为云上构建+部署完毕
构建
步骤：Yarn构建 
工具版本：nodejs8.11.2
```sh
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
npm config set disturl https://mirrors.huaweicloud.com/nodejs/
yarn config set registry https://repo.huaweicloud.com/yarn/
npm config set prefix '~/.npm-global'
yarn install
yarn build
tar -cvzf build.tar.gz ./build
```
步骤：上传软件包到软件发布库
构建包路径：./build.tar.gz
部署
步骤：选择部署来源
源类型：构建任务
部署目录：/usr/local/front-server
步骤：解压build压缩包（shell）
```sh
cd /usr/local/front-server
tar -xvcf build.tar.gz
步骤：运行serve部署前端（shell）
cd /usr/local/front-server
ps aux | grep node | awk '{print $2}' | xargs kill -9
nohup serve -s build -l 80 &
```
后端
构建
步骤：打包代码（shell）
```sh
tar -cvzf back.tar.gz ./*
```
步骤：上传软件包到软件发布库
构建包路径：./back.tar.gz
部署
步骤：选择部署来源
源类型：构建任务
部署目录：/usr/local/back-server
步骤：解压压缩包（shell）
 ```sh
cd /usr/local/back-server
tar -xvzf back.tar.gz
```
生成static文件（shell）
```sh
cd /usr/local/back-server
/usr/local/miniconda3/bin/pip install -r requirements.txt
rm -rf static
/usr/local/miniconda3/bin/python manage.py collectstatic
```
生成部署配置文件（shell）
```sh
cd /usr/local/back-server
echo -e "[uwsgi]\nsocket=127.0.0.1:7777\nchdir=/usr/local/back-server\nmodule=backend.wsgi\nmaster=true\nprocesses=4\nvacuum=true\ndaemonize=/usr/local/back-server/uwsgi.log" > uwsgi.ini
echo -e "events { }\nuser root;\nworker_processes auto;\nhttp {\n\tinclude /etc/nginx/mime.types;\n\tserver {\n\t\tlisten 8000;\n\t\tserver_name 114.115.204.217;\n\t\terror_log /usr/local/back-server/nginx.log;\n\t\tcharset utf-8;\n\t\tlocation /static {\n\t\t\talias /usr/local/back-server/static;\n\t\t}\n\t\tlocation / {\n\t\t\tuwsgi_pass 127.0.0.1:7777;\n\t\t\tinclude /etc/nginx/uwsgi_params;\n\t\t}\n\t}\n}" > nginx.conf
```
使用nginx和uwsgi进行部署（shell）
```sh
ps aux | grep nginx | awk '{print $2}' | xargs kill -9
ps aux | grep uwsgi | awk '{print $2}' | xargs kill -9
  
nginx -c /usr/local/back-server/nginx.conf
/usr/local/miniconda3/bin/uwsgi --ini /usr/local/back-server/uwsgi.ini
```
Todo
做完啦！！！
约定
react部分(js/ts)的变量以及函数采用小驼峰写法
```js
const createStore = () => {
  // ...
}
```
组件采用大驼峰
```js
const TodoList({ todos }) => {
  // ...
}
```
django部分(python)的变量和函数采用小写下划线写法
```py
def create_store():
    pass
# 类对象采用大驼峰
class View:
    pass
```
className(css选择器)采用中划线命名
```js
// component.js
<Button className='loading-button' />
```
```css
// component.css
.loading-button {
  margin: auto;
}
```
python模块版本
python v3.7.3
django v2.2.1
django-rest-framework v3.10.2
django-cors-headers v3.0.2
drf-extensions v0.5
react使用最新的hook机制
即为使用带hook的函数组件替代类组件(推荐箭头函数)
redux更多的是提供我们管理数据的一种思想，切忌滥用redux
规定只有以下情况使用redux的api
异步action，如网络请求，通常是与数据库关联的数据
与其他组件共享的数据
如果共享数据的组件在整棵组件树中距离较近，直接将状态提升到共同的父组件
    其他情况下，完全可以使用组件内部state进行管理
如果state较为简单，使用useState管理状态即可
如果state较为复杂，使用useReducer和redux的思想来管理状态
