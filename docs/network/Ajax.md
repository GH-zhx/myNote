# Ajax
ajax只是浏览器为了在不刷新页面的情况下与服务器建立联系，制定了Ajax请求,Ajax请求独立于页面，不会影响页面加载，并为Ajax请求设置了回调函数，能够在
请求成功后手动更改页面效果。
而对于服务器来说，ajax请求与正常的http请求没有区别，只是浏览器的呈现形式不一样罢了。
而http请求依托于http协议，http协议是与服务器进行交流的一种规定。
而浏览器对应的http请求包括表单元素提交，浏览器地址栏(默认get请求)等
## xhr
使用方法
```js
var xhr = new XMLHttpRequest
xhr.open('get',url)
xhr.responseType = 'json'
xhr.onload = () => {
  xhr.response
}
xhr.send()
```
### api
- readyState xhr的状态码 4 响应体接收完毕
- status 获取服务器返回的状态码
- responseText 获取响应体，文本格式
- responseXML 获取响应体，xml格式
- onreadtstatechange 事件，当xhr.readyState属性发生改变触发
- onload 事件，响应接收完毕
- open(method, url, async) 设置请求的方式，请求的路径，同步/异步
- send(requestBody) 发送请求体
- setRequestHeader(key, value) 设置请求头
- getResponseHeader(key) 获取响应头
## fetch
特点是不用下载第三方库，存在于window上，便于使用，采用了关注分离(将动作细化)思想。
使用方法如下：
```js
search = async()=>{
  //发送网络请求---使用fetch发送（未优化）
  fetch(`/api1/search/users2?q=${keyWord}`,{
    
  }).then(
    response => {
      console.log('联系服务器成功了');
      return response.json()
    },
    error => {
      console.log('联系服务器失败了',error);
      return new Promise(()=>{})
    }
  ).then(
    response => {console.log('获取数据成功了',response);},
    error => {console.log('获取数据失败了',error);}
  )

  //发送网络请求---使用fetch发送（优化错误处理方式）
		fetch(`/api1/search/users2?q=${keyWord}`).then(
			response => {
				console.log('联系服务器成功了');
				return response.json()
			}
		).then(
			response => { console.log('获取数据成功了', response); }
		).catch(
			error => console.log('获取数据失败了', error)
		)
  //发送网络请求---使用fetch发送（优化编码方式）该情况也可用在一般的ajax请求，极大的减少回调函数的使用，提高代码可读性
  try {
    const response= await fetch(`/api1/search/users2?q=${keyWord}`)
    const data = await response.json()
  } catch (error) {
    console.log('请求出错',error);
  }
}
// 默认采用get请求，其它请求配置通过第二个参数进行配置
fetch(url,{
  method:'GET'| 'POST' // 等
  body:{ a:1 }, //请求参数
	headers:{ //请求头
  content-type:'application/json',
  },
  credentials:'include' | 'same-origin' | 'omit', 
  //是否携带cookies凭证,带上 | 同源带上 | 不带上
})
```
### 注意事项
请求状态为401或500时，不会进入catch，会进入then
## axios
底层依然使用了xhr
## jquery
底层依然使用了xhr