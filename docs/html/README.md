# html知识
## 标签
### a
- href属性
指向一个url地址，如果指向一个元素的id选择器可以将到该元素定位到页面顶部。以此实现快速定位页面内容的效果，并且会在地址栏添加哈希锚点，可以被计入浏览器历史记录。
### label
- for属性，该属性指向一个input元素id，点击该label可以是该属性执行的那个元素获得焦点。
### canvas
- 一个前端画布元素，通过操作画布上的像素画出任意效果。
- 需要一个id，具有宽度和高度属性，区别于css的样式宽高。
- 当浏览器不支持canvas时，会自动显示canvas元素内部的内容。
- 已经画好的像素点可以被新的图案覆盖。
- 连续画图时，一个图案画完需要将画笔抬起，否则canvas会将其视为一个图案化成连续路径。
- 坐标系为直角坐标系的反方向。
#### api
- getContext 获取画笔对象
```js
let cv = document.querySelector('canvas')
let ctx = cv.getContext("2d")
```
- arc 画一个圆，参数分别是圆心坐标x&y，半径，起始弧度，结束弧度，绘制方向的布尔值。
- arcTo 在起始点和传入的两个控制点连成的夹角中画一段与两边夹角相切的指定半径的圆孤。起始点可以是上一段路径的末端或移动到指定的点，函数的前四个参数为两个控制点的x，y坐标，最后一个参数为圆的半径。
- beginPath 开始一段路径的绘画，会默认结束上一个路径的绘画。
- bezierCurveTo 画一段贝塞尔曲线，起始点可以是上一段路径的末端或移动到指定的点，参数中分别传入两个控制点和一个结束点的x，y坐标。
- clearRect 清除指定矩形区域的内容，实际是将其选中区域内的像素点全部设置为透明。参数分别是起始点坐标和清除矩形的宽高。
- clip 剪切当前路径，路径外的像素点不显示，路径内的像素点显示。第一个参数可以是路径或判断像素点在路径内外的算法值，当第一个参数是路径时，第二个参数是像素点在路径内外的算法值，设置为剪切路径之前画的图案不会被剪切。
- closePath 结束一段路径的绘画。
- createConicGradient 画径向渐变
- createImageData 创建一个指定宽度的空白图片对象。参数是图片的宽高。
- createLinearGradient 创建一段线性渐变的线段，将其赋值给画笔的fillStyle或strokeStyle属性
```js
context.beginPath();
let gra = context.createLinearGradient(100, 0, 200, 0);
gra.addColorStop(0, 'red');
gra.addColorStop(0.5, 'yellow');
gra.addColorStop(1, 'blue');
context.fillStyle= gra;
context.fillRect(100,0,100,100);
```
- createRadialGradient 创建同心圆渐变样式，可以赋值给fillStyle，增加渐变颜色和线性渐变一样。
- createPattern 根据一个图片对象进行重复，将创建的模式赋值给fillStyle，可以用来填充路径。
- drawFocusIfNeeded 给当前路径或给定路径设置获取焦点样式
- drawImage 根据图像对象在canvas中画出图像。参数分别是图像对象、剪裁目标图像的起始点的x，y、剪裁目标图像的宽高、所画图像距画布的x，y、所画图像在画布上的宽高。
- ellipse 画一个椭圆，参数分别是，圆心的x，y坐标，长轴半径，短轴半径，椭圆的旋转弧度，开始弧度，结束弧度，顺逆时针方向布尔值。
- fill 填充当前画笔所画的路径图案
- fillRect 画一个填充了颜色的矩形
- fillText 画出给定文本，该方法直接画在画布上，不受fill和stroke影响。使用当前的 font、textAlign、textBaseline 和 direction 设置值对文本进行渲染。参数是需要画的文本，起始点的x，y。
- getContextAttributes 获取当前画笔的属性。
- getImageData 返回包含画布指定矩形内的像素数据的对象。像素数据数组中每四个值代表一个像素点，代表其rgba值
- getLineDash 获取当前划线的设置，一个包含两个值的数组，其实是对应虚线的实线线段长短和实线间隔。
- getTransform 获取当前的转换矩阵，如果有转换矩阵，画出的图像是经过转换矩阵进行变化后的图像。
- isContextLost 判断当前canvas是否可以继续工作。
- isPointInPath 判断当前路径是否包含传入的坐标。参数分别是路径、需要判断的坐标x，y。
- isPointInStroke 判断当前描边是否包含传入的坐标，参数与isPointInPath一致。
- lineTo 根据划线设置，从当前画笔所在位置和传入的目标位置划一条直线线段。
- measureText 返回传入的文本根据当前设置绘画后的属性。
- moveTo 抬起画笔并移动画笔到指定坐标位置，参数为x，y坐标值。
- putImageData 根据传入的像素数据对象将其数据画在画布上。参数为数据对象、画在画布中起始点的x，y、目标图像需要显示的起始x，y、目标图像需要显示的宽高。
- quadraticCurveTo 画一个二次贝塞尔曲线。参数分别是控制点的xy和终点的坐标xy。
- rect 画一个矩形，参数分别是起始的x，y坐标和宽高。
- reset 重置canvas为默认状态，所有属性回归默认，画布清空。
- resetTransform 重置变形矩阵。
- restore 将canvas的各种属性设置返回至上一次save的状态，不会改变canvas的画布内容。可以连续调用来返回多次。如果没有执行过save，那么不会执行任何操作。
- rotate 顺时针旋转坐标系，参数是旋转的弧度。
- roundRect 画一个圆角矩形，参数分别是起始坐标xy、矩形宽高、圆角半径(和css的border-radius一样)
- save 保存当前画笔的各种属性设置的快照。
- scale 缩放一个图案的尺寸(将图案原来的宽高按比例缩放，坐标系及画布宽高不会改变)。参数分别为x轴和y轴的缩放系数。
- scrollPathIntoView 将当前路径或指定路径滚动到用户可见，类似Element.scrollIntoView。
- setLineDash 设置虚线的配置，参数见getLineDash。
- setTransform 设置变换矩阵。
- stroke 显示当前所画图案的路径，相当于显示边框。
- strokeRect 画一个带边框的矩形。
- strokeText 绘制文本的边框，看起来像立体文字。
- transform 使之后画出来的图案发生一系列变换。参数分别是
- translate 使之后画的图案发生平移，参数为x轴和y轴的偏移量。

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
