# 常见样式
## 动画
## 文字省略号显示
```css
.container{
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
```
## flex最后一行对齐问题
当flex容器中项目的数量不能保证最后一行的数量和之前的数量相同时，会导致最后一行的项目排列和之前的项目排列出现错位，此时我们可以为容器增加一些span、i等空标签来使每行的项目数量达到一致。


