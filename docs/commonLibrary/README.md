# 常用库
## pubsub-js
### 安装
```js
npm i pubsub-js
```
### 使用
```js
// 引入
import PubSub from "pubsub-js";
// 发布
PubSub.publish('count',count)
// 订阅
PubSub.subscribe('count',(_,data) => {
  setCount(data)
})
// 取消订阅
PubSub.unsubscribe('count')
```
## require.js
浏览器js引擎本身没有暴露模块化api，需要通过该库帮助我们生成操作浏览器js引擎进行模块化的api。
```js 

```

## browserify
与require.js一样的作用

## clean-mark
获取网络文章到本地并转为对应的格式
```js
// 安装
npm install clean-mark --global
// 使用
clean-mark "https://blog.csdn.net/yyy/article/details/xxx" // 生成的文件名是xxx.md，默认下载到当前路径
// 指定存放路径
clean-mark url -o / tmp / article
// 指定文件格式
clean-mark url -t html // 支持text，html，md
```
## ClipboardJS
一个用于使用js实现复制剪切功能的js库。

## echarts
一个可视化图标库
```js
import * as echarts from 'echarts';
import * as echarts from 'echarts';
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
// 当多次调用myChart.setOption时，两次的图形进行了合并，原因时echrts默认将两次的option进行了合并，两个方案，一个是清除当前实例的图形，一个是通过setOption的第二个参数进行控制
myChart.setOption({},true) // 当第二个参数为true时，不会合并option
myChart.clear() // 清除当前图像。
// vue将echarts实例赋值给ref对象时，不能进行深监测，否则会导致监测数据量太大导致报错。
```

## postCss
一个css转换器，可以将我们自定义写的css规则转换成浏览器能识别的css规则

## TailwindCSS
在vue中常用的一个css转换器。



