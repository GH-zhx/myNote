# 布局
## 布局技术
### 普通流布局

### 弹性布局(flex布局)
垂直水平居中
```css
.shuipinjuzhong{
display:flex;
justify-content:center;
algin-items:center
}
```
### 网格布局
- display: grid : 设置container容器为网格布局
- grid-template-columns与grid-template-rows:分别设置网格的列宽与行高，取值有多种形式例如：
或者是这样像我们的例子中使用repeat()函数进行赋值，该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。我们的例子中grid-template-columns: repeat(4,1fr); 出现了一个新的单位fr，fr代表网格容器中可用空间的一等份，类似于flex的flex-grow。如果这样取值grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。
- grid-auto-rows 与 grid-auto-columns: 表示超出我们没有定义网络的宽度跟高度取值。例如上面的例子grid-template-columns: repeat(4,1fr); 我们只是显示的指定了列的个数，以及宽度，并没有指定行高，那么grid会取grid-auto-rows: minmax(100px,auto);的值来作为行高。minmax()函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中，它接受两个参数，分别为最小值和最大值。
- grid-gap: 表示网格间的间隙大小，也可以单独这行跟列的间隙：grid-row-gap 属性、grid-column-gap.
- grid-row和 grid-column: 表示单个项目的四个边框的起始网格线跟结束网格线，从而确定单个网格的大小跟位置。我们将项目化分为四行四列的网格，那么横向网格线为从1-5，纵向网格线也为从1-5，这里item0的取值grid-row: 1/2;grid-column: 1/5;表示：行高从第一根网格线到第二根网格线，列宽度：从第一根网格线到第五根网格线。

## 常见的布局方式
### 双栏目布局
左侧固定宽度，右侧充满剩余宽度。
```html
**<style>
* {
    margin:  0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    background-color: white;
}
.left {
    float: left;
    width: 200px;
    height: 200px;
    background-color: rosybrown;
}
.right {
    margin-left: 210px;
    height: 100px;
    background-color: saddlebrown;
}
.last {
    height: 30px;
    background-color: red;
}
</style>**
```

### 三栏布局
两侧固定宽度，中间填满剩余宽度。
1. position+margin实现
左右侧使用绝对定位并给定宽度，中间给对应宽度的左右margin
2. 圣杯布局
- 中间元素占据第一位置优先渲染，设置该元素 width 为 100%
- 左中右三个元素分别左浮动,并且进行清除浮动带来的影响
- 左元素设置左边距为-100%以使得左元素上升一行并且处于最左位置，右元素设置左边距为自身宽度的负值使得右元素上升一行 处于最右位置。
- 设置父元素的左右 padding 为左右两个元素留出空间，以展示中间元素内容。
- 设置左右元素为相对定位，左元素的 left 和右元素的 right 为内边距的宽度的负值。
3. 双飞翼布局
- 中间采用嵌套子元素方法,宽度自适应
- 左中右三个元素分别左浮动,并且进行清除浮动带来的影响
- 左元素设置左边距为-100%以使得左元素上升一行并且处于最左位置，右元素设置左边距为自身宽度的负值使得右元素上升一行处于最右位置。
- 设置中间元素的子元素左右边距为左右元素留空位，以展示中间元素内容。
4. flex实现
使用flex容器，直接固定两边子项的宽度即可。

由于圣杯布局 设置了父元素的padding，所以左右元素在移动时，其实位置已经改变了，所以需要再通过相对定位来进行调节。
### 响应式布局
在不同的页面分辨率下，呈现不一样的布局方式。
1. css媒体查询
- mediatype: 媒体类型, 例如：screen:计算机屏幕（默认值），tv:电视类型设备 等
- and|not|only :逻辑操作符
- and:用来把多个媒体属性组合起来，合并到同一条媒体查询中
- not:用来对一条媒体查询的结果进行取反
- only:表示仅在媒体查询匹配成功时应用指定样式
- media feature: 多数媒体属性，带有“min-”和“max-”前缀，用于表达“大于等于”和“小于等于”。例如width | min-width | max-width,height | min-height | max-height,aspect-ratio | min-aspect-ratio | max-aspect-ratio等
```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
/* 当屏幕尺寸大于等于1025 样式 */
    @media only screen and (min-width: 1025px) {
      body {
        background-color: wheat;
      }

      .item {
        float: left;
        border: 1px solid skyblue;
        width: 300px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 10px 30px;
      }
    }

    /** iPad 屏幕尺寸大于等于768 小于等于1024 竖屏**/
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      body {
        background-color: rosybrown;
      }

      .item {
        float: left;
        border: 1px solid skyblue;
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 5px 20px;
      }
    }

    /** iPhone 屏幕尺寸小于等于767 竖屏样式**/
    @media only screen and (max-width: 767px) {
      body {
        background-color: royalblue;
      }

      .item {
        float: left;
        border: 1px solid skyblue;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 5px 10px;
      }
```
当浏览器时IE9时，需要添加一下代码
```html
  <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
```
2. grid实现响应式布局

3. 利用bootstrap和elementUI做响应式布局。
## 布局场景
### 两列布局，左侧不固定宽度，右侧自动取父元素剩余宽度。
利用flex的限制，是右侧自动取剩余宽度
```css
.parent{
  display: flex;
  align-items: center;
  .left{
  }
  .width{
    width: 100%;
  }
}
```
### 文字环绕图片
文字环绕原理是浮动后子元素脱离文档流使得父元素内的文字可以从父元素的起始位置进行排列又因为浮动只脱离了半层导致文字被浮动元素的下层阻挡了
```html
  <div class="container" style="width: 100px;height: 100px;">
    <div class="middle1" style="float:left;width:50px;height: 50px;">中间</div>
    <span style="word-wrap: break-word;">your content</span>
  </div>
```
### 水平居中的方式
1. marin：auto
需要自身宽度确定且为块元素。父元素宽度不能由子元素宽度撑开。
```html
<div>
  <div style="margin:auto"></div>
</div>
```