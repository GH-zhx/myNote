# web技术
## canvas
- 一个前端画布元素，通过操作画布上的像素画出任意效果。
- 需要一个id，具有宽度和高度属性，区别于css的样式宽高。
- 当浏览器不支持canvas时，会自动显示canvas元素内部的内容。
- 已经画好的像素点可以被新的图案覆盖。
- 连续画图时，一个图案画完需要将画笔抬起，否则canvas会将其视为一个图案化成连续路径。
- 坐标系为直角坐标系的反方向。
### canvas对象
- getContext 获取画笔对象
```js
let cv = document.querySelector('canvas')
let ctx = cv.getContext("2d")
```

### 画笔对象
1. 属性
- direction(实验) 设置文本排列方向，默认继承。参数为ltr时从左至右，参数为rtl时从右至左。
- fillStyle 填充的样式，有三种类型的值，分别是color、gradient(渐变)，pattern(可重复图像)
- filter(实验) 为图案提供模糊、灰度等效果。值为各种效果处理函数。
- font 设置文字的样式。
- fontKerning 对应css的font-kerning属性，使得字体间距分布更加统一。
- fontStretch 规定文字间距大小对标css的font-stretch
- fontVariantCaps 对标css的font-variant-caps
- globalAlpha 设置画出的图案透明度，取值0-1.
- globalCompositeOperation 设置同一像素的多层图案如何显示。
- imageSmoothingEnabled 设置图片边缘是否平滑处理。
- imageSmoothingQuality 设置图片平滑的程度。
- letterSpacing 设置文字字符间距。
- lineCap 设置画出线段的末端形状。默认是butt标识方形结束，而round和square会在两端增加一些长度。3
- lineDashOffset 设置虚线的偏移量，画出的线会有所偏移。值为偏移量，通过循环改变偏移量可以实现蚂蚁线。
```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var offset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```
- lineJoin 设置线段拐点的样式。
- lineWidth 划线的宽度
- miterLimit 当折线转折点的类型为miter时起始是延长两边线段的其中一边取其交点作为结束点，但是当折线夹角很小时会导致这个焦点离线段很远，所以通过miterLimit来限制这个焦点的最远距离。
- shadowBlur 设置图案模糊阴影的大小。
- shadowColor 设置图案模糊阴影的颜色。
- shadowOffsetX 设置图案模糊阴影的水平偏移量
- shadowOffsetY 设置图案模糊阴影的垂直偏移量
- strokeStyle 设置显示路径的样式，可选值和fillStyle一样。
- textAlign 设置文字相对于起始点x坐标的位置，当textAlign值为center时，起始点x坐标位于文本的中间。
- textBaseline 设置文字位于起始点x坐标水平线的位置。即起始点x坐标水平线是穿过文本、在文本下方等位置。
- textRendering 设置svg文本的渲染。
- wordSpacing 设置文本单词间距。

2. 方法
- arc 画一个圆，参数分别是圆心坐标x&y，半径，起始弧度，结束弧度，绘制方向的布尔值。
- arcTo 在起始点和传入的两个控制点连成的夹角中画一段与两边夹角相切的指定半径的圆孤。起始点可以是上一段路径的末端或移动到指定的点，函数的前四个参数为两个控制点的x，y坐标，最后一个参数为圆的半径。
- beginPath 开始一段路径的绘画，会默认结束上一个路径的绘画。
- bezierCurveTo 画一段贝塞尔曲线，起始点可以是上一段路径的末端或移动到指定的点，参数中分别传入两个控制点和一个结束点的x，y坐标。
- clearRect 清除指定矩形区域的内容，实际是将其选中区域内的像素点全部设置为透明。参数分别是起始点坐标和清除矩形的宽高。
- clip 剪切当前路径，路径外的像素点不显示，路径内的像素点显示。第一个参数可以是路径或判断像素点在路径内外的算法值，当第一个参数是路径时，第二个参数是像素点在路径内外的算法值，设置为剪切路径之前画的图案不会被剪切。
- closePath 结束一段路径的绘画。
- createConicGradient 画圆锥渐变。参数分辨是开始的弧度，和圆心的坐标xy。
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
- createRadialGradient 创建径向渐变样式，可以赋值给fillStyle，增加渐变颜色和线性渐变一样。
- createPattern 根据一个图片对象进行重复，将创建的模式赋值给fillStyle，可以用来填充路径。
- drawFocusIfNeeded 给当前路径或给定路径设置获取焦点样式
- drawImage 根据传入的对象在canvas中画出图像。参数分别是绘画对象(可以是图像对象，video对象，canvas对象,svg对象等)、剪裁目标图像的起始点的x，y、剪裁目标图像的宽高、所画图像距画布的x，y、所画图像在画布上的宽高。
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
- transform 使之后画出来的图案发生一系列变换。参数是变换矩阵中的变换值。参数顺序为x²，yx，xy，y²，xz，yz。平方代表缩放，yx和xy代表y轴和x轴的旋转量，xz和yz代表x轴和y轴的平移量。实际就是坐标系一点的xyz坐标矩阵和每个坐标轴在三个坐标轴上对应的变换量组成的矩阵相乘的结果。
- translate 使之后画的图案发生平移，参数为x轴和y轴的偏移量。

### Paht2D对象
使用Path2D构造函数创造一个路径对象，然后通过路径对象调用画图方法进行路径绘画，就可以将路径信息保存在路径对象中。
1. Path2D构造函数
- Path2D 函数本身的参数可以是一个路径对象或svg路径的字符串。当参数是路径对象时会返回传入路径对象的拷贝。
2. 实例方法
- addPath 为路径对象增加一条路径信息。第一个参数是路径对象，第二个参数是路径变化矩阵。

## image
图片对象，每加载一个img标签就会创建一个图片对象，同样可以使用Image构造函数创建图片对象。两者创建的图片对象是一样的。
### 属性
- align	设置或返回与内联内容的对齐方式。
- alt	设置或返回无法显示图像时的替代文本。
- border	设置或返回图像周围的边框。
- complete	返回浏览器是否已完成对图像的加载。
- height	设置或返回图像的高度。
- hspace	设置或返回图像左侧和右侧的空白。
- longDesc	设置或返回指向包含图像描述的文档的 URL。
- lowsrc	设置或返回指向图像的低分辨率版本的 URL。
- name	设置或返回图像的名称。
- src	设置或返回图像的 URL。
- useMap	设置或返回客户端图像映射的 usemap 属性的值。
- vspace	设置或返回图像的顶部和底部的空白。
- width	设置或返回图像的宽度。
### 事件
- onabort	当用户放弃图像的装载时调用的事件句柄。
- onerror	在装载图像的过程中发生错误时调用的事件句柄。
- onload	当图像装载完毕时调用的事件句柄。

## video对象


## clipboard
该对象在navigator对象上，并且所有方法都是异步的，调用之后返回的是promise对象。优点是不用提前写入内容，不会造成页面卡顿。缺点是允许任意读取有安全风险所以只有https协议才能使用该方法。
- Clipboard.readText()	复制剪贴板里的文本数据
- Clipboard.read()	复制剪贴板里的文本数据/二进制数据
- Clipboard.writeText()	将文本内容写入剪贴板
- Clipboard.write()	将文本数据/二进制数据写入剪贴板