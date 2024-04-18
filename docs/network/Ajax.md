# Ajax

ajax 只是浏览器为了在不刷新页面的情况下与服务器建立联系，制定了 Ajax 请求,Ajax 请求独立于页面，不会影响页面加载，并为 Ajax 请求设置了回调函数，能够在
请求成功后手动更改页面效果。
而对于服务器来说，ajax 请求与正常的 http 请求没有区别，只是浏览器的呈现形式不一样罢了。
而 http 请求依托于 http 协议，http 协议是与服务器进行交流的一种规定。
而浏览器对应的 http 请求包括表单元素提交，浏览器地址栏(默认 get 请求)等

## xhr

使用方法

```js
var xhr = new XMLHttpRequest();
xhr.open("get", url);
xhr.responseType = "json";
xhr.onload = () => {
  xhr.response;
};
xhr.send();
```

### api

- readyState xhr 的状态码 4 响应体接收完毕
- status 获取服务器返回的状态码
- responseText 获取响应体，文本格式
- responseXML 获取响应体，xml 格式
- onreadtstatechange 事件，当 xhr.readyState 属性发生改变触发
- onload 事件，响应接收完毕
- open(method, url, async) 设置请求的方式，请求的路径，同步/异步
- send(requestBody) 发送请求体
- setRequestHeader(key, value) 设置请求头
- getResponseHeader(key) 获取响应头

## fetch

特点是不用下载第三方库，存在于 window 上，便于使用，采用了关注分离(将动作细化)思想。
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

请求状态为 401 或 500 时，不会进入 catch，会进入 then

## axios

底层依然使用了 xhr

### 取消请求

```js
let send_btn = document.getElementById("send_btn"); //发送请求按钮
let cancel_btn = document.getElementById("cancel_btn"); //取消请求按钮
let cancel = null;
send_btn.onclick = function () {
  if (cancel != null) {
    cancel(); //如果上一次的请求还在继续，则取消
  }
  axios({
    method: "get",
    url: "http://localhost:3000/test.php",
    cancelToken: new axios.CancelToken(function (c) {
      cancel = c;
    }),
  })
    .then((response) => {
      //处理响应数据
      cancel = null;
    })
    .catch((reason) => {
      //错误处理
    });
};

cancel_btn.onclick = function () {
  //取消请求
  cancel();
};
```

## jquery

底层依然使用了 xhr

```js
// 发送请求
let r = $.ajax(url, {
  method: "GET" | "POST",
  data: {},
  success: () => {},
  error: () => {},
});
// 取消请求
r.abort();
```
