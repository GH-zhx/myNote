# 知识点
## 绝对定位
开启该属性后，元素相对视口定位 当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，包含块由视口改为该祖先

## 引入文件
```css
@import url('demo.css')
```

## 单位
### px
像素单位，1px代表一个像素。
### em
字体大小的相对单位，相对于父元素的font-size大小，1em等于父元素的font-size。em有嵌套效果，如果父元素的font-size为2em，那么当子元素设置成2em时，子元素的实际值为4em
### rem
字体大小的相对单位，相对于根元素的font-size大小，1rem等于html元素的font-size。不会有嵌套效果。
### vw&vh
代表浏览器窗口的宽高百分比。
### vmax&vmin
代表浏览器窗口宽高中数值大的百分比。

## calc
可以动态计算height，width，padding，margin，font-size等属性,运算符左右必须有空格，参与计算的有百分比、px、em、rem等单位
```css
div{
  height: calc(100vh - 100px); 
}
```

## css module
为了防止命名冲突，将css中的类名通过文件路径和类名生成哈希类名。只需要在webpack中配置css-loader即可。
1. 配置文件中的写法
```js
// 如果是使用less语法，需要将css文件和less文件的中的css-loader都写成如下配置。
{
  loader:'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
  }
}
```
2. css module语法
```css
/* 默认是局部类名，会默认为我们添加一个最外层的类名，也可以显示的设置 */
:local(.normal) {
  color: green; 
}
/* 如果类名是全局类名，不需要变成哈希类名可以使用global */
:golbal(.title){
  color: red;
}
:golbal{
  .title{
    color:red;
  }
}
/* 可以使用组合,类名可以来自自身或引入的文件 */
.className {
  background-color: blue;
}
.title {
  composes: className;
  color: red;
}
.title {
  composes: className from './another.css'; 
  color: red;
}
/* 配合 PostCSS 和 postcss-modules-values可以定义变量方便使用 */
/* ./colors.css */
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;

/* 应用变量 */
@value colors: "./colors.css";
@value blue, red, green from colors;
.title {
  color: red;
  background-color: blue;
}
```

## background
### background-attachment
规定背景图片如何滚动。
- scroll 背景所在元素滚动不会滚动背景，元素外的滚动条滚动会带动内容和背景一起滚动。
- fixed 任意滚动条滚动都不会使背景图片滚动。
- local 任意滚动条滚动都会滚动背景。
### background-clip
规定背景图片填充的区域
- border-box
- padding-box
- content-box
- text 背景将只显示在文字的下方，如果此时将字体的颜色设置为透明，则字体颜色就是背景图片。
### background-image
设置背景图片，可以设置多个图片，并且可以设置渐变。设置图片使用url，设置渐变使用linear-gradient，渐变是一张图片
```css
  background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),url("./media/examples/lizard.png");
```
linear-gradient的用法
```css
/* 第一个参数可以设置渐变方向，可以使角度或方向 */
background:linear-gradient(to right,red,yellow);
background:linear-gradient(45deg,red,yellow,green);
/* 每个颜色可以设置渐变位置，可以设置百分比，像素等 */
background:linear-gradient(red 0%,yellow 50%,green 100%)  
background:linear-gradient(red 0,yellow 75px,green 150px);
```
### background-origin
和background-clip一样的效果，没有text值。

### background-position
规定背景图片的渲染位置
```css
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;
background-position: 25% 75%;
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```
### background-repeat
规定背景图片的重复方式
- repeat-x 水平方向重复
- repeat-y 垂直方向重复
- no-repeat 不重复
- space 在四个角重复
- round 缩放图片后重复

### background-size
规定背景图片的大小
- contain 保持图片宽高比缩放以保证图片刚好完全放入背景区
- cover 保持图片宽高比缩放以刚好完全覆盖背景区
- auto 保持原图片的高宽。
- 百分比 保持图片宽高比缩放图片以刚好填充背景区的百分比区域，当值为100%时相当于cover
- 具体值：background-size: 200px 100px 图片按指定宽高缩放，如果值为auto，则保持原图片对应的宽高。





