# 编程技巧
## 操作和待操作数互换。
一个数需要进行多次操作，可以利用一下方法，将每一步操作编程待循环的对象。
```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen(x) {
 return Promise.resolve(x)
 .then(addTwo)
 .then(addThree)
 .then(addFive);
}
addTen(8).then(console.log); // 18
使用 Array.prototype.reduce()可以写成更简洁的形式：
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen(x) {
 return [addTwo, addThree, addFive]
 .reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}
addTen(8).then(console.log); // 18
这种模式可以提炼出一个通用函数，可以把任意多个函数作为处理程序合成一个连续传值的期约连
锁。这个通用的合成函数可以这样实现：
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function compose(...fns) {
 return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}
let addTen = compose(addTwo, addThree, addFive);
addTen(8).then(console.log); // 18 
```
## 提升后代组件实现信息共享(React)
有时一个后代组件需要和祖先组件共享数据，但是逐层传递数据显得冗余，可以将后代组件在父组件中定义，然后将其传下去，减少Props传递。
```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}
// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```
## 表单数据管理
1. 总数据由最外层组件管理，表单子组件接受更改总数据的方法。且该数据更新时会刷新页面效果。
2. 总数据由最外层组件管理，表单子组件接受更改上一层组件数组的方法。但该数据更新时不会刷新组件。由每一层子组件数据更新完后调用上一层组件的数据更新方法来更新总数据。
如果某个子组件需要更改另一个子组件的数据，可以使用消息订阅与发布等方式进行组件间通信实现。

## 动画
css动画会调用GPU进行加速，比靠js改变元素位置来使页面重排的性能好很多。

## 变量交换
```js
// 利用解构表达式
let x =3
let y = 5
[x,y] = [y,x]
```

## 递归
1. 从第一个递归函数开始完成当前任务，然后通过参数将当前任务结果传递给下一个递归函数，最后一个递归函数计算完之后将结果的地址依次传递回第一个函数。
```js
// 阶乘递归
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
```
2. 每个递归函数通过return保存当前任务，等待最后一个递归函数任务执行完后，向上一个函数返回结果，然后上一个函数开始执行自己的任务并返回当前函数结果，直到第一个函数任务执行完成并返回最终结果。
```js
function tailFactorial(n) {
  if (n === 1) return n;
  return n*tailFactorial(n - 1);
}
```
3. 使用循环实现递归，每次执行后返回一个函数，这样每个函数都会立即执行完，不会导致调用栈溢出。
```js
// 蹦床函数
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
trampoline(sum(1, 100000))
// 100001
```
蹦床函数实现尾递归优化
```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    // 只开启一个循环，每次递归只是更新计算值并更新while循环的条件
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

// 返回递归函数，并将递归函数的函数体通过参数保存起来
var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
```

## 异步任务按顺序输出
```js
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
// async写法
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```
## 函数的公共变量
有时函数需要使用公共变量来存储数据，此时我们可以利用闭包的特点用一个函数包裹我们需要执行的函数实现公共变量的定义。
```js
const fun = () => {}

const runFun = (f){
  let x = ''
  return (y) => {
    f(x,y)
  }
}
```

## 异步函数同步写法
```js
const request = () => fetch(`https://api.github.com/search/users?q=zh`)

const main = () => {
  let x = 's'
  let y = request()
  let y1 = request()
  console.log(y,y1)
}

const run = (f) => {
  let i = 0
  let resultArr = []
  let orignFetch = window.fetch
  window.fetch = (...args) => {
    if (resultArr[i] && resultArr[i].status === 'fulfilled') {
      return resultArr[i++].data
    }
    const result = {
      status: 'pending',
      data: null
    }
    resultArr[i] = result
    const response = orignFetch(...args).then((res) => res.json()).then((v) => v).catch((e) => e)
    throw response
  }
  const repeatF = () => {
    try {
      f()
    } catch (err) {
      console.log(1)
      if (err instanceof Promise) {
        err.then((v) => {
          resultArr[i].data = v
          resultArr[i].status = 'fulfilled'
          i = 0
          repeatF()
        }).catch((v) => {
          resultArr[i].data = v
          resultArr[i].status = 'fulfilled'
          i = 0
          repeatF()
        })
      }
    }
  }
  repeatF()
}
run(main)
```
## 防抖
多次触发以结束时触发为准。
```js
 function debounce(func, delay){
    var timer = null;
    return function(){
      var that = this;
      var args = arguments
      //每次触发事件 都把定时器清掉重新计时
      clearTimeout(timer)
      timer = setTimeout(function(){
        //执行事件处理程序
        func.call(that, args)
      }, delay)
    }
 }

```

## 节流
规定时间内只有第一次触发有效。
```js
// 使用定时器
 function debounce(func, delay){
    var timer = null;
    return function(){
      var that = this;
      var args = arguments
      //每次触发事件 都把定时器清掉重新计时
      if(!timer){
        timer = setTimeout(function(){
          //执行事件处理程序
          func.call(that, args)
          timer = null
        }, delay)
      }
    }
 }
```