# http协议
用于浏览器和服务器之间进行数据传输的一种数据解析规定。
## 协议内容
协议规定，客户端在发送请求之前，需要和服务器进行tcp三次握手，以确保链接生效。
- 第一次握手客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态，x 表示客户端的数据通信初始序号。
- 第二次握手服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN-RECEIVED 状态。
- 第三次握手当客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入ESTABLISHED 状态，服务端收到这个应答后也进入 ESTABLISHED 状态，此时连接建立成功。
在http1.1后，客户端和服务器建立的链接就是持久链接，只要请求头中Connection:Keep-Alive就可以直接发送请求了。
## http和https
- https相比http更加的安全，因为其是加密传输，在三次握手中添加了加密方式，解析更为复杂。
- HTTP端口默认为80，HTTPS端口默认为443
## 请求&响应的报文
一个http请求报文包括请求行，请求头，请求体。同样响应报文也有响应行，响应头，响应体。
- 请求行：包括请求方式，请求路径，协议版本
- 请求头：包括各种验证信息
- 请求体：向服务器发送的数据。
- 响应行：协议版本和响应状态码。
- 响应头：包括各种验证身份的标识信息。
- 响应体：服务器返回的数据。

## 请求方式
- get
- post
