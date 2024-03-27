# 面试题
## js
### 连续赋值
```js
let a = {a:1}
let b = a 
a.x = a = {a:2}
console.log(a,b)
```

## 网络
### 从输入url到页面显示发生了什么。
- 根据请求信息判断是否有缓存，如果有直接取缓存进行展示，如果没有缓存，则向服务器请求数据。
- 如果输入的是域名，则先通过域名解析获取域名对应的ip，获取步骤是先看缓存中，再看根域名，再看com服务器，最后向浏览器厂商服务器获取。如果直接输入ip则可以直接向目标服务器发送请求。
- 确定ip后，先和服务器进行三次握手建立http连接，然后发送请求报文，服务器返回响应html，
- 浏览器拿到响应html后开始解析，解析后生成render树，最后调用渲染进程将页面渲染出来。

## 变量提升
```js
var b = 3
(function(){
  b = 1 // 由于var变量提升，直接是对该作用域内的b进行了赋值。
  var b = 2
})()
console.log(b) // 3

let data = {a:3}
fun(data)
console.log(data)
// 具名函数会进行变量提升，匿名函数不会做提升，且函数提升在var提升之前。
function fun(d){
  d['b'] = 8
}
```

## 作用域
```js
for (var index = 0; index < 3; index++) {
  setTimeout(() => {
    console.log('var',index)
  }, 0);
}
//  2 2 2 

for (let index = 0; index < 3; index++) {
  setTimeout(() => {
    console.log('let',index)
  }, 0);
}
//  0 1 2 
```

## 异步执行
```js
const f1 = async () => {
  return 1
}
const f2 = async () => {
  const n = await f1()
  console.log(n)
  return 2
}
const f3 = async () => {
  const n =  f2()
  console.log(n)
  return 3
}
f3().then((v) => console.log(v))
f3()
console.log(4)
// promise<pending>
// promise<pending>
// 4
// 1
// 3
// 1
```