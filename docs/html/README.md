# html知识
## 标签
### a
- href属性
指向一个url地址，如果指向一个元素的id选择器可以将到该元素定位到页面顶部。以此实现快速定位页面内容的效果，并且会在地址栏添加哈希锚点，可以被计入浏览器历史记录。
### label
- for属性，该属性指向一个input元素id，点击该label可以是该属性执行的那个元素获得焦点。

## video
- 原理是在页面上提供了一个渲染区域，通过src属性获取视频数据存在在GPU缓存区，然后调用GPU将视频内容渲染来。
- 为了防止爬虫，网站上的视频会使用blob对视频地址进行加密，将video标签的src写成blob+url的形式，真正的url需要将返回的二进制数据进行URL.createObjectUR处理才能获得真正的路径。


## dom属性
### tabindex
tabindex 全局属性 指示其元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航
- tabindex=负值 (通常是 tabindex=“-1”)，表示元素是可聚焦的，但是不能通过键盘导航来访问到该元素，用 JS 做页面小组件内部键盘导航的时候非常有用。
- tabindex="0" ，表示元素是可聚焦的，并且可以通过键盘导航来聚焦到该元素，它的相对顺序是当前处于的 DOM 结构来决定的。
- tabindex=正值，表示元素是可聚焦的，并且可以通过键盘导航来访问到该元素；它的相对顺序按照tabindex 的数值递增而滞后获焦。如果多个元素拥有相同的 tabindex，它们的相对顺序按照他们在当前 DOM 中的先后顺序决定。
### scrollLeft&scrollTop
元素滚动条滚动的距离


## dom方法
### scrollTo
使元素滚动条跳转至指定位置

## dom事件
1. 鼠标事件
- onclick	当用户点击某个对象时调用的事件句柄。	
- oncontextmenu	在用户点击鼠标右键打开上下文菜单时触发	
- ondblclick	当用户双击某个对象时调用的事件句柄。	
- onmousedown	鼠标按钮被按下。	
- onmouseenter	当鼠标指针移动到元素上时触发，不支持冒泡。
- onmouseleave	当鼠标指针移出元素时触发，不支持冒泡。
- onmousemove	鼠标被移动。	
- onmouseover	鼠标移到某元素之上。	
- onmouseout	鼠标从某元素移开。	
- onmouseup	鼠标按键被松开
2. 键盘事件
- onkeydown	某个键盘按键被按下。
- onkeypress	某个键盘按键被按下并松开。
- onkeyup	某个键盘按键被松开。
3. 对象事件
- onabort	图像的加载被中断。
- onbeforeunload	该事件在即将离开页面（刷新或关闭）时触发
- onerror	在加载文档或图像时发生错误。
- onhashchange	该事件在当前 URL 的锚部分发生修改时触发。	 
- onload	一张页面或一幅图像完成加载。
- onpageshow	该事件在用户访问页面时触发	
- onpagehide	该事件在用户离开当前网页跳转到另外一个页面时触发。
- onresize	窗口或框架被重新调整大小。
- onscroll	当文档被滚动时发生的事件。
- onunload	用户退出页面。
4. 表单事件
- onblur	元素失去焦点时触发
- onchange	该事件在表单元素的内容改变时触发
- onfocus	元素获取焦点时触发
- onfocusin	元素即将获取焦点时触发
- onfocusout	元素即将失去焦点时触发
- oninput	元素获取用户输入时触发
- onreset	表单重置时触发
- onsearch	用户向搜索域输入文本时触发
- onselect	用户选取文本时触发
- onsubmit	表单提交时触发
5. 拖拽事件
- ondrag	该事件在元素正在拖动时触发	 
- ondragend	该事件在用户完成元素的拖动时触发	 
- ondragenter	该事件在拖动的元素进入放置目标时触发	 
- ondragleave	该事件在拖动元素离开放置目标时触发	 
- ondragover	该事件在拖动元素在放置目标上时触发	 
- ondragstart	该事件在用户开始拖动元素时触发	 
- ondrop	该事件在拖动元素放置在目标区域时触发

6. 其它事件 
- onmessage	该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发	 
- onmousewheel	已废弃。 使用 onwheel 事件替代	 
- ononline	该事件在浏览器开始在线工作时触发。	 
- onoffline	该事件在浏览器开始离线工作时触发。	 
- onpopstate	该事件在窗口的浏览历史（history 对象）发生改变时触发。	 
- onshow	该事件当 menu 元素在上下文菜单显示时触发	 
- onstorage	该事件在 Web Storage(HTML 5 Web 存储)更新时触发
- ontoggle	该事件在用户打开或关闭 details 元素时触发	 
- onwheel	该事件在鼠标滚轮在元素上下滚动时触发。
- visibilitychange	该事件用于检测当前页面的可见性状态是否发生变化。

7. 自定义dom事件
dom自带的事件触发逻辑是我们的外设在某个dom上操作时，会生成一个对应操作的事件对象，该对象包括了当前操作的各种信息，之后在帮我们调用发生事件的dom对象上绑定的对应回调。
而dom.dispatchEvent(e)可以模拟触发一个事件，而参数e就是我们模拟的事件对象。譬如我们创造一个点击事件对象并将该对象的鼠标位置信息修改成0，那么调用dom.dispatchEvent(e)后，dom的点击回调就会执行，并且回调中拿到的事件对象的位置信息就是0。而且当我们使用一般的事件进行阻止冒泡时等操作时，也是使对应事件对象的属性发生改变而已。
- dom.createEvent实现。
传入参数生成对应参数类型的事件对象并进行初始化，该方法被W3C标准抛弃了，但是浏览器还是支持。
```js
// 传入'HTMLEvent'时生成自定义事件对象，通过initEvent方法来初始化事件对象
var ev = dom.createEvent('HTMLEvent')
ev.initEvent(eventName, canBubble, preventDefault)

// 传入'UIEvents'时生成UI事件对象，通过initUIEvent方法来初始化事件对象
var ev = dom.createEvent('UIEvents')
ev.initEvent(eventName, canBubble, preventDefault,view, detail)

// 传入'MouseEvents'时生成鼠标事件对象，通过initMouseEvents方法来初始化事件对象
var ev = dom.createEvent('MouseEvents')
ev.initMouseEvent(eventName, canBubble, preventDefault,view,detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey,button, relatedTarget)

// 定义好事件后，我们就可以通过dispatchEvent来触发对应dom上的dui应事件对象类型的回调。
var dom = document.createElement('div')
dom.addEventListener('myEvent',()=>console.log('myEvent'))
dom.dispatchEvent(ev)
```
- Event(eventName,eventInit)实现
创建一个新事件对象，为元素绑定对应的事件后就可以触发对应事件了
```js
var ev = new Event('myEvent',{canBubble:false})
var dom = document.createElement('div')
dom.addEventListener('myEvent',()=>console.log('myEvent'))
dom.dispatchEvent(ev)
```
- CustomEvent(eventName,eventInit)
该构造函数基于Event构造函数，提供了传递参数的能力。
```js
var ev = new CustomEvent('myEvent',{detail:{canBubble:false,bubbles:false}})
var dom = document.createElement('div')
dom.addEventListener('myEvent',()=>console.log('myEvent'))
dom.dispatchEvent(ev)
```
8. 事件捕获和事件冒泡
事件捕获是当事件在某个元素上触发后，我们不能直接拿到发生事件的这个dom(猜测)，需要从dom树的根节点开始寻找该元素，所以事件执行需要先捕获该元素。所以导致事件的回调有两个执行方案，一个就是在寻找该元素时每经过一个祖先元素就执行对应的事件，直到找到对应的元素并执行其相应回调函数；另一个就是先找到对应的元素然后先执行该元素的回调，之后在逐级执行祖先元素的回调，这称之为事件冒泡。而在事件回调捕获执行或冒泡执行过程中，在某一个事件回调内，我们可以调整其对应事件对象的属性，使其不在捕获或冒泡，这称之为阻止事件传播。