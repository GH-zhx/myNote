# 常用库
## pubsub-js
### 安装
```js
npm i pubsub-js
```
### 使用
```js
// 引入
import PubSub from "pubsub-js";
// 发布
PubSub.publish('count',count)
// 订阅
PubSub.subscribe('count',(_,data) => {
  setCount(data)
})
// 取消订阅
PubSub.unsubscribe('count')
```
## require.js
浏览器js引擎本身没有暴露模块化api，需要通过该库帮助我们生成操作浏览器js引擎进行模块化的api。
```js 

```

## browserify
与require.js一样的作用

## clean-mark
获取网络文章到本地并转为对应的格式
```js
// 安装
npm install clean-mark --global
// 使用
clean-mark "https://blog.csdn.net/yyy/article/details/xxx" // 生成的文件名是xxx.md，默认下载到当前路径
// 指定存放路径
clean-mark url -o / tmp / article
// 指定文件格式
clean-mark url -t html // 支持text，html，md
```
## 


