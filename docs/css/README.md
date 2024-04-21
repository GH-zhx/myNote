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

## css变量(自定义属性)
将属性名设置成```--```开头的属性为自定义属性，其值可以使用var()方法进行获取,获取变量时会由此从自身-祖先元素-全局变量中寻找对应的变量
```css
/* 定义全局变量 */
:root{
  --bg-color: #fff
}
/* 使用全局变量 */
div{
  /* 定义局部变量 */
  --div-color:blue;
  /*使用全局变量 第二个参数为获取不到时的默认值,但如果没有获取到且没有设置默认值得到继承值 */
  background-color:var(--bg-color,red);f..
  /* 使用局部变量 */
  color:var(--div-color,red)
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

## 包含块
根元素是初始包含块。通常一个元素的包含块是最近的祖先块元素，但是当元素的position属性取值不一样时，有不同的情况
1. 当position值为static/relative/sticky时，包含块就是离自己最近的祖先块元素。
2. 当position值为fixed时，如果有祖先块元素符合以下一种情况则该祖先元素便是其包含块，否则就是包含块就是根元素。
- transform 或 perspective 的值不是 none
- will-change 的值是 transform 或 perspective
- filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效).
- contain 的值是 paint (例如:contain: paint;)
3. 当position值为absolute时，如果有祖先块元素符合以下一种情况则该祖先元素便是其包含块，否则就是包含块就是根元素。
- position值不为static。
- transform 或 perspective 的值不是 none
- will-change 的值是 transform 或 perspective
- filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效).
- contain 的值是 paint (例如:contain: paint;)

## BFC
BFC全称是Block Formatting Context，意思就是块级格式化上下文，即块元素的一种渲染规则。
1. 特征
- BFC是一个块级元素，块级元素在垂直方向上依次排列。
- BFC是一个独立的容器，内部元素不会影响容器外部的元素。
- 属于同一个BFC的两个盒子，外边距margin会发生重叠，并且取最大外边距。
- 计算BFC高度时，浮动元素也要参与计算。
2. 开启条件
- overflow: hidden;
- display: flex;
- display: inline-flex;
- display: inline-block;
- position: absolute;
- position: fixed;
3. 作用
- 解决由于浮动带来的父元素高度塌陷问题。
- 解决相邻的父子元素marginTop重叠问题。

## 多项目垂直对齐。

## 语法
### background
1. background-attachment，规定背景图片如何滚动。
- scroll 背景所在元素滚动不会滚动背景，元素外的滚动条滚动会带动内容和背景一起滚动。
- fixed 任意滚动条滚动都不会使背景图片滚动。
- local 任意滚动条滚动都会滚动背景。
2. background-clip，规定背景图片填充的区域
- border-box
- padding-box
- content-box
- text 背景将只显示在文字的下方，如果此时将字体的颜色设置为透明，则字体颜色就是背景图片。
3. background-image，设置背景图片，可以设置多个图片，并且可以设置渐变。设置图片使用url，设置渐变使用linear-gradient，渐变是一张图片
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
4. background-origin，和background-clip一样的效果，没有text值。

5. background-position，规定背景图片在元素中经过background-size缩放后的的渲染位置
```css
/* 一个关键值时表示图片在元素靠近该关键字摆放，另一个方向默认将图片的中心点放在其中心。 */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;
/* 当值为百分比时，将图片的中心点放置在元素对应百分比的位置，如果background-size的设置导致图片的宽或高需要撑满元素的一个方向，那这个方向的百分比无效。 */
background-position: 25% 75%;
/* 将图片按照其它设置放置好后，偏移量为传入的值*/
background-position: 20px 30px;
/* 以下形式是是图片摆放在以其对应边界偏移量的平行线构成的直角内 */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```
6. background-repeat，规定背景图片的重复方式
- repeat-x 水平方向重复
- repeat-y 垂直方向重复
- no-repeat 不重复
- space 在四个角重复
- round 缩放图片后重复

7. background-size，规定背景图片的大小
- contain 保持图片宽高比缩放以保证图片刚好完全放入背景区
- cover 保持图片宽高比缩放以刚好完全覆盖背景区
- auto 保持原图片的高宽。
- 百分比 保持图片宽高比缩放图片以刚好填充背景区的百分比区域，当值为100%时相当于cover
- 具体值：background-size: 200px 100px 图片按指定宽高缩放，如果值为auto，则保持原图片对应的宽高。

8. background
是背景的简写形式，可以同时配置多种属性，如果该属性写在最后会覆盖之前写的单独属性。
- currentColor 背景跟随当前元素内容的颜色

### filter
元素像素处理属性，可以对元素的的图案进行模糊，颜色变换等效果，值为各种处理函数。

### mix-blend-mode
描述元素内容与元素背景如何混合，可以借此实现文字颜色的反色效果
```css
.title{
mix-blend-mode: difference;
/* 颜色设置成白色效果最明显 */
color: #fff; 
}
```
### 粘连定位
该元素会固定在拥有滚动机制(overflow为hidden、scroll、auto 或 overlay)的祖先元素上，且会保留其在文档流中的原来位置，偏移量相对于原来的位置。

### fit-content
可以用来设置高宽，代表大小由内容撑开，内容多大，高宽就多大。

### overflow
- visible 内容不能被裁剪，溢出父元素显示
- hidden 内容被裁剪显示
- scroll x，y轴滚动条都出现
- auto x，y轴滚动条根据内容是否超出来出现
- overlay 机制于auto相同，但滚动条绘制在内容上，而不是单独占据空间。

### text-overflow
规定文字超出父元素后的显示样式。

### white-space & word-break & word-wrap
1. white-space 用于空白符的处理和规定文本是否换行
- normal 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。
- nowrap 和 normal 一样合并空白符，但阻止源码中的文本换行。
- pre 连续的空白符会被保留。仅在遇到换行符或 br元素时才会换行。
- pre-wrap 连续的空白符会被保留。在遇到换行符或br元素时，或者根据填充行框盒子的需要换行。
- pre-line 连续的空白符会被合并。在遇到换行符或br元素时，或者根据填充行框盒子的需要换行

2. word-break 表示单词是否可以被截断
- break-all 对于 non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
- keep-all CJK 文本不断行。Non-CJK 文本表现同 normal

3. word-wrap 和white-space一样可以控制文本换行
- break-word 文本换行
- normal 默认不会让文本换行

### 动画
1. 定义动画
```css
@keyframes move {
    /* 开始状态 */
    0% {
        transform: translateX(0px);
    }
    /* 结束状态 */
    100% {
        transform: translateX(1000px);
    }
}
```
2. 使用动画
```css
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* 2.调用动画 */
    /* 动画名称 */
    animation-name: move;
    
    /* 持续时间 */
    animation-duration: 2s;
}
```






