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

## 文字跟随背景
1. 使用文字描边在文字周围形成一圈轮廓,然后将文字颜色设置成透明，但是文字描边兼容行不好。文字阴影实现不了。
```css
h1{
  color: transparent;
  -webkit-text-stroke: 1px white;
}

```


