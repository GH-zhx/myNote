# Vue2
## 创建实例对象
```html
<!-- 创建根节点以作为容器，并实例化一个Vue实例，将该实例挂载到创建的根节点上，实现渲染。 -->
<body>
  <div id="demo">
    <!-- 可以直接读取当前vue实例上的值，值更改的时候可以自动刷新页面，在{{}}中编写js表达式 -->
    <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
  </div>
  <script type="text/javascript" >
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
    //创建Vue实例
    new Vue({
      el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
      data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
        name:'atguigu',
        address:'北京'
      }
    })
    // 对比上面，el的第二种写法，先创建vue实例，创建之后在将实例挂载到对应的容器上
    const root = new Vue({
      data:{
        name:'atguigu',
        address:'北京'
      }
    })
    root.$mount('#root')
    // 对比上面，data的第二种写法，函数式。并且vue上的函数不能写成箭头函数，因为模板读取数据需要使用this。
      new Vue({
        el:'#demo',
        data(){
          return {
            name:'atguigu',
            address:'北京'
          } 
        }
      })
  </script>
</body>
```
## 模板语法
## 插值语法
作用在标签体内，可以写js表达式 ,可以读取vue实例上的数据。
```html
<div id="demo">
  <!-- 可以直接读取当前vue实例上的值，值更改的时候可以自动刷新页面，在{{}}中编写js表达式 -->
  <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>
```
## 指令语法
作用在标签上，用于与vue实例建立关系，例如绑定vue实例数据，绑定事件等,内容同样可以写js表达式。
```js
<a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
```
## 数据绑定
## 单向数据绑定
使用v-bind，将数据绑定后，该标签属性的值来自vue实例，实例的值改变则标签的值也改变。
```js
<a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
// 简写如下 
<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
// 可以绑定一个变量,当属性使用变量时，如果是给原生dom模板绑定，则变量名不能有大写字母，因为最后识别时会全部转为小写。如果时定义的组件没有关系。
<a :[urlname]="school.url" x="hello">点我去{{school.name}}学习2</a>

```
## 双向数据绑定
使用v-model，绑定后，标签的属性和实例数据可以相互改变，任一一方更新后，另一方的数据也随之改变。一般作用于表单元素。
```html
<input type="text" v-model:value="name"><br/>
<!-- 简写 -->
<input type="text" v-model="name"><br/>
```
### 重置v-model的双向绑定
```js
// v-model相当于如下的写法，先绑定value，然后绑定input事件将输入的值赋给响应式数据searchText,其原理也是如此。
<input v-bind:value="searchText" v-on:input="searchText = $event.target.value" />
// 根据原理将v-model迁移到自定义input组件上
Vue.component('base-checkbox', {
  model: {
// 规定v-model绑定的key
    prop: 'checked',
    // 规定v-model绑定的事件
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >`
})
<base-checkbox v-model="lovingVue"></base-checkbox>
```

## MVVM模型
1. M：模型(Model) ：data中的数据
2. V：视图(View) ：模板代码
3. VM：视图模型(ViewModel)：Vue实例
## vue的数据代理
将页面所需数据对象上的属性通过Object.defineProperty方法代理在vue实例上，将页面数据的数据读取变成对vue实例对象的数据读取。数据代理是为了便于读取和修改数据。而实现页面更新是因为数据劫持。
```js
let data = {
    name:'atguigu',
    address:'北京'
  }
const vm = new Vue({
  el:'#demo',
  data
})
//vm实例对象会将data对象保存在vm上，取名为_data，该对象就等于data中定义的对象。并为data中的属性添加getter和setter方法。
vm._data === data // trur
```
## 事件处理
## 绑定事件
需要用v-on命令
```html
<button v-on:click="showInfo">点我提示信息</button>
<button @click="showInfo1">点我提示信息1（不传参）</button>
<button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
<!-- 对应的方法需要写在methods属性上 -->
<script>
const vm = new Vue({
  el:'#root',
  data:{
    name:'尚硅谷',
  },
  methods:{
    showInfo1(event){
      // 此处的this是vue实例对象，由此methods中的函数不能写成箭头函数。
      alert('同学你好！')
    },
    showInfo2(event,number){
      console.log(event,number)
      alert('同学你好！！')
    }
  }
})
</script>
```
## 事件修饰符
可以对事件进行特殊处理。
1. prevent：阻止默认事件（常用）；
2. stop：阻止事件冒泡（常用）；
3. once：事件只触发一次（常用）；
4. capture：使事件在捕获阶段触发回调；
5. self：只有event.target是当前操作的元素时才触发事件；
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕；譬如在鼠标滚轮事件中，鼠标滚动会有滚动元素滚动条的默认行为，设置这个修饰符后，我们可以先执行鼠标滚轮的默认行为，即先将元素滚动条滚动，然后再执行回调函数。
```html
<!-- 事件修饰符可以连续使用 -->
<button @click.once.stop="showInfo2($event,66)">点我提示信息2（传参）</button>
```
## 键盘事件
可以通过键盘按键的编码和名称定义某个按键的键盘事件。
```js
// 不加别名修饰符表示只要有按键触发就会触发回调。
<button @keyup="showInfo2($event,66)">点我提示信息2（传参）</button>
// 添加按键名称后，就只有对应的按键被按下后才会执行回调。
<button @keyup.enter="showInfo2($event,66)">点我提示信息2（传参）</button>
// vue 对一些按键取了别名：
// 回车 => enter
// 删除 => delete (捕获“删除”和“退格”键)
// 退出 => esc
// 空格 => space
// 换行 => tab (特殊，必须配合keydown去使用,因为tab在按键抬起时焦点已经被切走了，无法触发当前焦点元素的抬起事件)
// 上 => up
// 下 => down
// 左 => left
// 右 => right
// 对于未提供别名的按键需要用其真实的名称，如果是大驼峰命令法，需要转换成kebab-case，譬如大写按键CapsLock
<button @keyup.caps-lock="showInfo2($event,66)">点我提示信息2（传参）</button>
// 可以根据按键编码在vue上自定义按键别名，不过不推荐使用，因为每个浏览器的按键编码不一致。
Vue.config.keyCodes.huiche = 13 // 如此定义后可以用huice代替作为Enter的别名
<button @keyup.huice="showInfo2($event,66)">点我提示信息2（传参）</button>
```
### 系统修饰符
ctrl、alt、shift、meta
1. 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
2. 配合keydown使用：正常触发事件。
```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">
<!-- Alt + C  -->
<input v-on:kedown.shift="clear">
<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
<!-- exact修饰符确保系统系统修饰符必须先被按下即有且只有ctrl在按下状态点击该按钮才能执行add -->
<button v-on:click.ctrl.exact="add" >12</button>
```
## 计算属性
将某些属性由已有属性计算得来，在多次访问时为了减少计算量，为该属性设置缓存，只要依赖的数据没有变化时，我们可以直接读取缓存的数据，当依赖数据变化时，重新计算属性值。
```js
const vm = new Vue({
  el:'#root',
  data:{
    name:'尚硅谷',
    age:18
  },
  computed:{
    // 完整写法，
    fullname:{
      // 在第一次渲染以及name和age任一改变的时候，会调用，并将新的值缓存起来。
      get(){
        return this.name + '-' + this.age
      },
      // 当修改该属性是调用，如果set中没有修改name和age属性，那么修改不生效。
      set(value){
        const arr = value.split('-')
        this.name = arr[0]
        this.age = arr[1]
      }
    },
    // 简写,只要get方法。
    fullname(){
      return this.name + this.age
    }
  }
})
// 该配置项的属性也会被放在vm实例上，在模板中可以直接读取。
<p>{{fullname}}</p>
```
## 监视属性
有些属性在变化的时候，需要进行相应的处理，而监视属性能够实现这种效果，当监视属性变化的时候，能够执行我们配置的函数。
```js
// 第一种写法是通过watch配置项配置
const vm = new Vue({
  el:'#root',
  data:{
    name:'尚硅谷',
    age:18,
    obj:{
      a:2,
      b:3
    }
  },
  watch:{
    // 完整写法
    name:{
      // immediate:true, //初始化时让handler调用一下
      //handler什么时候调用？当isHot发生改变时。
      // deep:true,//深度监视，当多层数据发生改变时也能感知到。
      handler(newValue,oldValue){
      }
    },
    // 简写方式
    name(newValue,oldValue){
      // 此处settimeout中的函数需要写成箭头函数，否则函数中的this不是vue实例。
      setTimeout(()=>{
        this.fullName = val + '-' + this.lastName
      },1000);
    }
    // 同时可以监听对象的某个属性或整个对象
    "obj.a":{}
    obj:{}
  }
})
// 第二种写法可以通过vm实例上的$watch方法进行监测
vm.$watch(name,{
  // immediate:true, //初始化时让handler调用一下
  //handler什么时候调用？当isHot发生改变时。
  // deep:true,//深度监视,当多层数据发生改变时也能感知到。
  handler(newValue,oldValue){
  }
})
// 第二种方法也可以简写成
vm.$watch(name,(newValue,oldValue)=>{})
```
## 绑定样式
1. class样式 写法:class="xxx" xxx可以是字符串、对象、数组。
- 字符串写法适用于：类名不确定，要动态获取。
- 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。:class="{active:'isActive'}" 
- 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。:class="[{active:'isActive'}]" 
- 固定的类名直接用class="类名"就可以了
2. style样式
- :style="{fontSize: xxx}"其中xxx是动态值。
- :style="{fontSize:'12px'}"
- :style="[a,b]"其中a、b是样式对象。
- ：style="{display:['-webkit-box', '-ms-flexbox', 'flex']}",这种写法生效的是flex

## 条件渲染
1. v-if 
- v-if="表达式" 
- v-else-if="表达式"
- v-else="表达式" 
适用于：切换频率较低的场景。特点：不展示的DOM元素直接不会被渲染。注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
```html
<!-- 使用v-if做条件渲染 -->
<h2 v-if="false">欢迎来到{{name}}</h2>
<h2 v-if="1 === 1">欢迎来到{{name}}</h2>
<!-- v-else和v-else-if -->
<div v-if="n === 1">Angular</div>
<div v-else-if="n === 2">React</div>
<div v-else-if="n === 3">Vue</div>
<div v-else>哈哈</div>
```
2. v-show
写法：v-show="表达式",适用于：切换频率较高的场景。特点：不展示的DOM元素未被移除，仅仅是使用display:none隐藏掉
```html
<h2 v-show="false">欢迎来到{{name}}</h2>
<h2 v-show="1 === 1">欢迎来到{{name}}</h2>
```
## 列表渲染
通过v-for指令进行遍历，遍历对象有多种
- 语法：v-for="(item, index) in xxx" :key="yyy"
- 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
```html
<!-- 用of或in来进行循环都行 -->
<ul>
  <li v-for="(p,index) of persons" :key="index">
    {{p.name}}-{{p.age}}
  </li>
</ul>
<!-- 遍历对象 -->
<h2>汽车信息（遍历对象）</h2>
<ul>
  <li v-for="(value,k) of car" :key="k">
    {{k}}-{{value}}
  </li>
</ul>
<!-- 遍历字符串 -->
<h2>测试遍历字符串（用得少）</h2>
<ul>
  <li v-for="(char,index) of str" :key="index">
    {{char}}-{{index}}
  </li>
</ul>
<!-- 遍历指定次数 -->
<h2>测试遍历指定次数（用得少）</h2>
<ul>
  <li v-for="(number,index) of 5" :key="index">
    {{index}}-{{number}}
  </li>
</ul>
<script>
new Vue({
  el:'#root',
  data:{
    persons:[
      {id:'001',name:'张三',age:18},
      {id:'002',name:'李四',age:19},
      {id:'003',name:'王五',age:20}
    ],
    car:{
      name:'奥迪A8',
      price:'70万',
      color:'黑色'
    },
    str:'hello'
  }
})
</script>
```
## vue的数据监测
1. vue会监视data中所有层次的数据。
2. 如何监测对象中的数据？
vue实例对象对传入的data属性进行监听，监听原理是将data中的值在vue实例上保存一份，并通过object.defineProperty方法为vm上的每个来自data的属性添加getter和setter方法，一旦vm中的代码改变了，就在setter方法里重新更新视图模型。只要是对象形式的数据，即使将整个对象替换，vue都能监测到。
有两点需要注意：
- 对象中后追加的属性，Vue默认不做响应式处理
- 如需给后添加的属性做响应式，请使用Vue.set(target，propertyName/index，value)或vm.$set(target，propertyName/index，value)
```js
Vue.set(this.student,'sex','男')
this.$set(this.student,'sex','男')
this.$set(this.arr,0,{name:'fad',age:13})
```

3. 如何更新数组中的数据？
- 调用原生对应的方法对数组进行更新，这些方法包括push()、pop()、shift()、unshift()、splice()、sort()、reverse()，这些方法被重写过，调用之后会保证修改后的数据具有getter和setter方法，以实现响应式数据的效果。但是对数组本身是可以直接替换成另一个新数组的。
- 使用Vue.set() 或 vm.$set()
4. Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象添加属性。
### 数据更新的顺序
vue的数据更新是同步更新，即数据被跟新之后，组件内再次访问的数据会得到新数据。
各种回调执行顺序是，自定义方法引起数据变化-> 监视属性回调被执行-> 计算属性回调被执行 -> 进入生命周期回调。
### 防止数据更新
可以通过Object.freeze方法来冻结某些不变的响应式数据，提高性能
## 收集表单数据
- 文本输入框，则v-model收集的是value值，用户输入的就是value值。
- 单选框，则v-model收集的是value值，且要给标签配置value值。
- 多选框
1. 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
2. 配置input的value属性:
(1) v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
(2) v-model的初始值是数组，那么收集的的就是value组成的数组
## v-model的三个修饰符
- lazy：失去焦点再收集数据
- number：输入字符串转为有效的数字
- trim：输入首尾空格过滤
## 过滤器
对要显示的数据进行特定格式化后再显示，譬如时间戳。
### 注册过滤器
```js
// 这样注册为全局注册，下层组件也可以使用该过滤器
Vue.filter(name,callback)
// 这样注册为局部注册，下层组件不能使用该过滤器
new Vue{filters:{
  // 第一个参数是需要格式化的值，第二个参数开始是过滤器调用时传入的值
  timeFormater(value,str){
    return value
  }
}}
```
### 使用过滤器
```js
// {{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
<h3>现在是：{{time | timeFormater}}</h3>
<h3 :x="time | timeFormater">尚硅谷</h3>
// 过滤器也可以接收额外参数、
<h3>现在是：{{time | timeFormater('YYYY-MM-DD hh:mm:ss')}}</h3>
// 多个过滤器也可以串联,下一个过滤器接受上一个过滤器的返回值作为第一个参数
<h3>现在是：{{time | timeFormater | myslice}}</h3>
```
## 其它内置指令
```html
<!-- v-text 将指定节点的内容替换成指令对应的内容 -->
<div v-text="name">你好，{{name}}</div> 
<!-- v-html 将指定节点的内容替换成指令对应的内容，可以解析html标签内容 -->
<div v-html="name">你好，{{name}}</div> 
<!-- v-cloak 在vue实例没有创建完毕时， 该指令会一致存在，一旦vue实例创建完毕就会删除v-cloak，结合css在v-cloak还存在时将元素的样式设置为不可见，解决出现{{}}-->
<h2 v-cloak>{{name}}</h2>
<style>
  [v-cloak]{
    display:none;
  }
</style>
<!-- v-once 初次渲染完后，即使数据变化后也不会再更新该dom -->
<h2 v-once>初始化的n值是:{{n}}</h2>
<!-- v-pre 跳过该节点的编译，应用于没有指令语法和插值语法的dom结构，优化性能 -->
<h2 v-pre>初始化的n值是:{{n}}</h2>
<script>
new Vue({
  el:'#root',
  data:{
    name:'尚硅谷',
    str:'<h3>你好啊！</h3>'
  }
})
</script>
```
### 指令动态参数
执行绑定属性时，属性可以是一个变量
```js
// eventName是一个变量
<a v-on:[eventName]="doSomething"> ... </a>
```
## 自定义指令
### 定义指令
局部指令
```js
new Vue({
  // 配置对象写法
  directives:{
    fbind:{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element,binding){
        element.focus()
      },
      //指令所在的模板被重新解析时
      update(element,binding){
        element.value = binding.value
      }
    },
  // 回调函数写法
  big(element,binding){
    console.log('big',this) //注意此处的this是window
    // console.log('big')
    element.innerText = binding.value * 10
  },
  }
})
```
全局指令使用Vue.directive方法
```js
Vue.directive(指令名,配置对象|回调函数)
```
### 使用
```html
<!-- 当指令由多个单词时，使用是用"-"分割，定义时可以写小驼峰 -->
<h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
<h2>放大10倍后的n值是：<span v-big-find="n"></span> </h2>
```
## 生命周期
### 生命周期流程图
<img src="../.vuepress/public/imgs/vue/vue_life_cycle.png" alt="生命周期图">

### 生命周期函数
```js
new Vue({
  el:'#root',
  data:{
    n:1
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
})
```
### 父子元素生命周期执行顺序
父子组件的挂载，更新，销毁，都是从父元素开始进行准备，然后执行完子元素的所有过程后，父元素在执行对应的挂载、更新、销毁
### 生命周期事件
组件的所有生命周期也有对应事件，当组件生命周期函数执行时会触发相应的事件。
```js
// 第一种写法监听生命周期事件
this.$once('hook:beforeDestroy', function () {
  // 取消定时器或取消订阅等,这种写法可以让开启定时器和取消定时器的代码放在同一处，并且不会通过组件对象来存值。
})
// 第二种写法监听生命周期事件
<school @hook:beforeDestroy=""></school>
```
## $destroy()
vue实例上的方法，可以销毁一个实例，并销毁它与其它实例之间的关系，解绑全部指令和事件监听。
## vm.$el
保存vue实例对象上的容器真实dom
## 非单文件组件
通过Vue函数对象上的extend方法创建的组件实例对象叫做单文件组件。vue组件对象寄生式继承了vue原型对象的原型方法。每一个组件对象都是一个新的组件构造函数。
```js
// 创建组件构造函数
const shcool = Vue.extend({
  // 表示组件的模板内容。
  template:`
    <div>	
      <h2>你好啊！{{name}}</h2>
    </div>
  `,
  // data对象必须写成函数。因为在组件复用时，如果是同一个对象，则会发生数据污染的问题。
  data(){
    return {
      name:'erzhong'
    }
  }
})
// 创建组件构造函数
const hello = Vue.extend({
  // 表示组件的模板内容。
  template:`
    <div>	
      <h2>你好啊！{{name}}</h2>
       <shcool></shcool>
    </div>
  `,
  // data对象必须写成函数。
  data(){
    return {
      name:'Tom'
    }
  },
  // 组件实例对象也可以继续注册组件。
    // 注册组件（局部注册）
  components:{
    school
  }
})
// 全局注册组件，如果第二个参数是一般对象，先调用extend函数创建组件构造函数，然后再进行注册。
Vue.component('hello',hello)
//创建vm
new Vue({
  el:'#root',
  data:{
    msg:'你好啊！'
  },
  // 注册组件（局部注册）
  components:{
    hello
  }
})
// 当组件注册之后，就可以在模板中进行标签式使用。
<div id="root">
  <hello></hello>
  <hr>
  <h1>{{msg}}</h1>
  <hr>
  {/* <!-- 第三步：编写组件标签 --> */}
  <school></school>
  <hr>
  {/* <!-- 第三步：编写组件标签 --> */}
  <student></student>
</div>
```
## 组件命名规则
1. 一个单词组成：首字母可大写可小写
2. 多个单词组成：
- 第一种写法(kebab-case命名)：my-school
- 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
3. 备注：
- 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
- 可以使用name配置项指定组件在开发者工具中呈现的名字。
4. 一个简写方式：const school = Vue.extend(options) 可简写为：const school = options
## 单文件组件
直接通过.vue文件来创建组件实例对象。单文件包括如下部分
```html
<div>
  haode
</div>
<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>
```
## 动态组件
利用vue内置的component组件搭配is属性，可以接受一个组件实例对象来渲染。
```js
// com只要是一个组件实例对象就行了
<component :is="com"></component>
// 搭配keep-alive组件可以实现组件缓存，在tab页切换时很有用。
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```
## 异步组件。
在注册组件时，赋值一个工厂函数代替生成的组件构造函数，该工厂函数内部实现引入组件的代码，可以实现组件异步加载的效果。
```js
  // 第一种写法，使用函数调用时传入的更新promise状态的状态函数。
const AsyncComponent = function (resolve, reject) {
  // 直接向 `resolve` 回调传递组件定义
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
  // 使用require来向resolve传递配置信息
  require(['./my-async-component'], resolve)
}
// 第二种写法，返回一个结果值为组件实例对象的promise。
const AsyncComponent = () => import('./my-async-component')
// 第三种写法，返回一个包含组件异步promise的对象。
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
// 全局注册
Vue.component('async-example', AsyncComponent)
// 局部注册
new Vue({
  components: {
    'my-component': AsyncComponent
  }
})
```
## 内联模板
当组件使用了inline-template属性是，组件内部定义的模板会替换成组件使用时包含的模板
```js
// 最终ToolList组件会渲染一个一级标题，并且h1标签只能访问到ToolList组件内部的数据。
<ToolList inline-template><h1>12</h1></ToolList>
```

## 脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
    1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
    2. 获取：```this.$refs.xxx```
    3. 和v-for一起使用时，ref的值是列表dom或组件实例对象的数组。

## props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

    1. 第一种方式（只接收）：```props:['name'] ```

    2. 第二种方式（限制类型）：```props:{name:String}```

    3. 第三种方式（限制类型、限制必要性、指定默认值）：

        ```js
        props:{
        	name:{
        	type:String, //类型
        	required:true, //必要性
        	default:'老王' //默认值
        	}
        }
        ```

    > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据，或者通过v-bind将传入的属性设置为当前组件的一个数据，由此可以通过改变上一层组件的数据来改变传入的值。如果需要传数据的话，需要通过v-bind命令来传入，原理是会把属性后的值当作表达式。当props的属性key和data配置项的属性key冲突时，会引用props的值
### 非prop值
如果我们传递给组件的props在内部没有被接收，这些属性会被传递给组件的最外层元素，如果不想默认传递这些非props，可以给组件加上inheritAttrs: false
## 依赖注入
当一个组件的很多子组件都需要使用该组件内的方法时，我们可以配置provide，子组件可以通过inject配置项获取对应的方法。
```js
// 父组件
provide: function () {
  return {
    getMap: this.getMap
  }
}
// 子组件
inject: ['getMap']
```

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

    第一步定义混合：

    ```js
    {
        data(){....},
        methods:{....}
        ....
    }
    ```

    第二步使用混入：

    ​	全局混入：```js.mixin(xxx)```，所有的组件都会得到该混合配置
    ​	局部混入：```mixins:['xxx']	```
    当混合和自身的配置项冲突时，除生命周期配置项会一起被执行外，其它配置项都已自身定义的为主。

## 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

    ```js
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)
    
        // 2. 添加全局指令
        Vue.directive(....)
    
        // 3. 配置全局混入(合)
        Vue.mixin(....)
    
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
    ```

4. 使用插件：```js.use()```

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```
可以安装less-loader，sass-loader等预处理器语言并通过为style标签添加lang='less'来编写less。
如果安装不能成功原因是webpack版本不支持最新的less版本
npm i less-loader@x，通过指定x的值可以安装特定版本的less，默认安装x对应的最新版，npm view xxx versions 可以通过改变xxx的名字来查看当前的某个技术的当前版本。

## 总结TodoList案例

1. 组件化编码流程：

    ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​			1).一个组件在用：放在组件自身即可。

    ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​	(3).实现交互：从绑定事件开始。

2. props适用于：

    ​	(1).父组件 ==> 子组件 通信

    ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

    1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

    2. 第二种方式，在父组件中：

        ```js
        <Demo ref="demo"/>
        ......
        mounted(){
           this.$refs.xxx.$on('atguigu',this.test)
        }
        ```

    3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。原理是使用了native修饰符之后，会将该事件绑定到组件根元素上，然后事件冒泡上来或本来就需要监听根元素的事件。


7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！
8. .sync修饰符
为组件的属性添加该修饰符后，会自动为组件绑定一个名为"update:属性名"的事件，在子组件就可以通过该事件来更新这个prop属性的值了
```js
<ToolList :title.sync="title" />
// ToolList内部使用this.$.emit('update:title',newTitle)来更新这个title属性
```

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```第二个参数才会提供数据，第一个参数是事件名，不用可以在穿的时候将其写成一个下划线
   

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
	
## nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行，譬如新增一个dom之后默认聚焦。

## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />

3. 写法：
  
  1. 准备好样式：

    - 元素进入的样式类名：
      1. v-enter：进入的起点
      2. v-enter-active：进入过程中
      3. v-enter-to：进入的终点
    - 元素离开的类名：
      1. v-leave：离开的起点
      2. v-leave-active：离开过程中
      3. v-leave-to：离开的终点

  2. 使用```<transition>```包裹要过度的元素，并配置name属性。如果配置了name属性，则样式名称要写成name对应的字符，譬如hello-leave
    ```js
    <transition name="hello">
      <h1 v-show="isShow">你好啊！</h1>
    </transition>
    ```
4. 自定义类名
这些状态下的类名我们可以自定义，通过如下属性进行定义。比如Animate.css动画库就使用了这个。
- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)
```js
<!-- 使用了这些类名后，dom在更改时添加的就是这些类名 -->
 <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight"></transition>
```
5. 显性的过渡持续时间
可以控制每一段动画的时间
```js
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```
6. js钩子
vue为transtion组件设置了dom变更节点的钩子函数。
```js
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
methods: {
  enter: function (el, done) {
    // 在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
    done()
  }
  leave: function (el, done) {
    // ...
    done()
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```
7. 初始化渲染
如果需要打开网页时自动执行一次，可以为该标签设置appear属性值为true，并且appear也拥有对应的钩子事件和自定义类名
```js
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```
8. 多个元素过渡
当transition标签内只显示一个元素，但是有很多元素会进行切换显示，此时vue默认会使得上一个元素离开的动画和下一个元素进入的动画一起执行，有时这样的效果不好，我们希望两个元素在切换时不要同时进行动画。
我们可以通过两个指令来改变这一默认行为
- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。
```js
<!-- 当key写成动态变量时，可以借此代替v-if和v-else达到切换的目的 -->
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
<!-- 如果需要切换组件，那么需要使用component组件以及is属性 -->
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```
9. 列表的过度
包括列表排序，插入,删除等。
```html
<transition-group name="list" tag="p">
  <span v-for="item in items" v-bind:key="item" class="list-item">
    {{ item }}
  </span>
</transition-group>
  <!-- 执行插入和删除，类名添加给变更的那个item -->
<style>
  .list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
    <!-- 执行排序，类名添加给所有位置变动的item -->
<style>
  .flip-list-move {
  transition: transform 1s;
}
</style>
```
transition-group同样有进入和离开等事件，绑定这些事件之后，当列表内的元素发生变化时，就会调用这些事件
```js
<transition-group
    name="staggered-fade"
    tag="ul"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
  >
</transition-group>
```
10. 状态动画
通过watch监听某个响应式number的变化，然后不断计算处新的数值，达到数字逐步变化到目标值的效果。

## vue脚手架配置代理

### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：
   1. 默认插槽：
```js
// 父组件中
<Category>
    <div>html结构1</div>
</Category>
// 子组件中
<template>
    <div>
        {/* 定义插槽 没有写name时默认name值为default */}
        <slot>插槽默认内容...</slot>
    </div>
</template>
```
2. 具名插槽：
```js
// 父组件中：
<Category>
    <template slot="center">
      <div>html结构1</div>
    </template>
    {/*  v-slot只能写在template标签内或组件只有默认插槽时写在组件上 */}
    <template v-slot:footer>
        <div>html结构2</div>
    </template>
    {/*  插槽名称可以写成一个变量 */}
    <template v-slot:[dynamicSlotName]>
        <div>html结构2</div>
    </template>
     {/* v-slot可以简写成# */}
    <template #footer>
        <div>html结构2</div>
    </template>
</Category>
// 子组件中：
<template>
    <div>
         定义插槽
        <slot name="center">插槽默认内容...</slot>
        <slot name="footer">插槽默认内容...</slot>
    </div>
</template>
```

3. 作用域插槽：
<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
```js
<!-- 父组件中： -->
  <Category>
    <template scope="scopeData">
        生成的是ul列表
      <ul>
        <li v-for="g in scopeData.games" :key="g">{{g}}</li>
      </ul>
    </template>
  </Category>
  <Category>
    <template slot-scope="scopeData">
        生成的是h4标题
      <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
    </template>
  </Category>
<!-- 子组件中： -->
<template>
    <div>
        <slot :games="games"></slot>
    </div>
</template>
<script>
    export default {
        name:'Category',
        props:['title'],
        //数据在子组件自身
        data() {
            return {
                games:['红色警戒','穿越火线','劲舞团','超级玛丽']
            }
        },
    }
</script>
```

4. 如果组件内部的内容

## Vuex

## 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

## 2.何时使用？

​		多个组件需要共享数据时

## 3.搭建vuex环境
vue2下载vux3，vue3下载vuex4

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex) js文件在解析时会将引入的文件按顺序提到最前方执行，不管你将文件引入写在多下方。
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

##    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

## 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

## 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

## 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

## 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```
3. 应用插件：```js.use(VueRouter)```
```js
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router:router
})
```


4. 实现切换（active-class可配置高亮样式）

   ```js
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```js
   <router-view></router-view>
   ```

## 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

## 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```js
   <router-link to="/home/news">News</router-link>
   ```

## 4.路由的query参数

1. 传递参数

   ```js
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

## 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```js
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

## 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```js
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

## 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

## 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

## 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

## 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```js
   <!-- include中写的是组件名表示只对news组件进行缓存,如果不想写就直接缓存下层所有的组件-->
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

## 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态,这两个生命周期钩子实在路由组件开启了缓存路由组件时才会生效。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

## 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行,写在定义路由器实例对象的roter文件里
   // to,form包含了路由的基本信息,有路径参数等,其中meta属性是让我们在定义路由表时自己设置需要的数据.
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:
写在路由配置数组的具体一项路由里
   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：
 
   ```js
   //进入守卫：通过路由规则，进入该组件时被调用,写在组件配置项里
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

## 13.路由器的两种工作模式
1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
## 渲染函数&jsx
vue允许我们在编写组件配置项时添加render配置项， 当配置了render配置项后，我们可以拿到createElement函数，该函数可以生成一个虚拟dom(Vnode)，将这个虚拟dom作为render函数的返回值，那么该组件最后渲染的内容就是我们返回的这个虚拟dom转化为的真实dom。所以.vue文件生成的虚拟dom其实最终就是帮我们调用了createElement函数。虚拟dom只是组件构造函数对象一个属性。
```js
// 生成组件构造函数并注册。
Vue.component('anchored-heading', {
  // 调用render生成虚拟dom时，组件构造函数的实例对象通过第二个参数传入进来,由此可以配置组件实例对象的相关配置项。
  render: function (createElement,context) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```
### createElement
返回一个虚拟dom，接受三个参数
```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div'| App | () =>  ,

  // {Object}
  // 一个与模板中 attribute 对应的数据对象,即使用该组件时绑定的属性都写在该对象里，可以不传，在不需要绑定属性时可以将第三个参数写在这儿。
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
},

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    }),
    'work',
  ]

```
## 组件更新
一个组件只会在模板中用到的响应式数据变化时才会更新。

## 对比其他框架
### 执行逻辑
1. vue
调用Vue函数或createApp函数后的执行逻辑为
- 根据传入的根组件信息对象生成对应的构造函数并保存
- 之后利用根组件的构造函数生成根组件实例对象(虚拟dom)
- 在根组件的构造函数中会根据传入的根组件信息对象调用渲染函数
- 在根组件渲染函数内部就会将根组件上注册的组件信息生成子组件的构造函数并保存
- 然后调用子组件的构造函数生成对应的子节点虚拟dom并赋予根组件的子节点属性
- 而在子组件的构造函数内部会重复根组件构造函数的过程，最终生成一颗完整的虚拟dom树。
- 然后根据生成的虚拟dom树生成真实dom树。
2. react
调用render函数后的执行逻辑为
- 创建一个根虚拟dom对象
- 调用传入的根组件函数得到的子组件虚拟dom对象值赋值给根组件对象的子节点属性
- 根组件函数内会生成子组件组件虚拟dom对象，然后继续重复第二步，如此生成一个完整的虚拟dom树。
- 最后根据得到的虚拟dom树生成真实dom树并挂载到调用该render函数的节点上。
总结就是vue通过属性得到下层组件的信息，而react通过模块化引入使组件函数执行时能够得到子组件的函数。
### 更新
1. vue
通过监听值变化，变化之后主动帮我们调用访问过该属性的函数，这些函数就可以将会组件更新。
2. react
通过返回跟新函数，我们需要手动调用更新函数更新组件，并且为了实现下层组件也自动更新，所以上层组件一旦更新会使所有下层节点全部更新。
### 数据处理
1. vue
为对象每一个属性都绑定了相应的更新机制，当一个属性更新时不用更新整个对象。并且子组件转化父组件的props为响应式数据后也是公用同一个数据源，更加便于更新。
2. react
当对象某个属性跟新时，只能更新整个对象才会触发组件更新。子组件转化父组件的props为响应式数据后一旦更新子组件的数据则会形成两个数据源，不会更新父组件。
