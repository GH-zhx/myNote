# 异步编程
## Promise
同步即顺序执行，当前代码执行完后，马上执行下一个代码命令，而异步则是不知何时会被执行，类似系统中断。
解决回调地狱，传入异步操作函数，执行传入的有操作函数时会传入改变promise状态的两个方法，调用这两个方法可以改变promise的状态。
```js
let p1 = new Promise((resolve, reject) => resolve());
setTimeout(console.log, 0, p1); // Promise <resolved>
let p2 = new Promise((resolve, reject) => reject());
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught error (in promise) 
// 可以将resolve和reject保存起来改变promise状态，不过该操作应该不可取，违背promise隔离异步操作的思想。
let p3
let p4 = new Promise((resolve, reject) => {p3 = resolve})
p3()
setTimeout((console.log,0,p4)) // Promise <resolved>
// promise初始化时如果抛出错误会直接返回一个拒绝的promise
const data = new Promise((res,rej) => {
  throw new Error(2)
})
console.log(data) // Promise <rejected> Error 2
// 解决或拒绝的结果通过resolved和rejected方法的参数返回。
const data = new Promise((res,rej) => {
  res(2)
})
console.log(data) // Promise <resolved> 2
```
### Promise的属性
- Promise.PromiseState 保存Promise的当前状态
- Promise.PromiseResult 保存Promise的当前结果值
### Promise.resolve
通过Promise.resolve()可以实例化一个解决的Promise，并且指向传入的第一个参数，因此可以将任何值转换为一个Promise。
```js
setTimeout(console.log, 0, Promise.resolve());
// Promise <resolved>: undefined
setTimeout(console.log, 0, Promise.resolve(3));
// Promise <resolved>: 3 
```
该方法多余的参数会被忽略，
```js
setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
// Promise <resolved>: 4 
```
如果传入的参数本身就是一个Promise，那么该值不会有任何变化，包括状态。
```js
let p = Promise.resolve(7);
setTimeout(console.log, 0, p === Promise.resolve(p));
// true
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p)));
// true
let p = new Promise(() => {});
setTimeout(console.log, 0, p); // Promise <pending>
setTimeout(console.log, 0, Promise.resolve(p)); // Promise <pending>
setTimeout(console.log, 0, p === Promise.resolve(p)); // true
```
### Promise.reject()
与Promise.resolve()不同点在于，如果传入的是一个Promise，那么返回的实例状态也是reject。
```js
setTimeout(console.log, 0, Promise.reject(Promise.resolve()));
// Promise <rejected>: Promise <resolved> 
```
###  同步/异步执行的二元性
Promise.reject执行会抛出错误，但是该错误不会被同步代码捕获，即使用try-catch无法捕获该错误。
```js
try {
 throw new Error('foo');
} catch(e) {
 console.log(e); // Error: foo
}
try {
 Promise.reject(new Error('bar'));
} catch(e) {
 console.log(e);
}
// Uncaught (in promise) Error: bar 
```
### Promise.then()
该方法接受两个函数作为参数，分别是onResolved和onRejected，异步操作返回的值会作为这两个函数的实参。传入其它类型的参数会被默认忽略。
```js
function onResolved(id) {
 setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
 setTimeout(console.log, 0, id, 'rejected');
}
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));
// 非函数处理程序会被静默忽略，不推荐
p1.then('gobbeltygook');
// 不传 onResolved 处理程序的规范写法，防止创建
p2.then(null, () => onRejected('p2'));
// p2 rejected（3 秒后）
Promise.prototype.then()方法返回一个以处理函数的返回值为参数的Promise.resolve()实例：
let p3 = p1.then(() => 'foo');
let p4 = p1.then(() => {});
let p5 = p1.then(() => Promise.resolve());
let p6 = p1.then(() => Promise.reject());
setTimeout(console.log, 0, p3); // Promise <resolved>: 'foo'
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined
setTimeout(console.log, 0, p6); // Promise <rejected>: undefined
// 抛出异常会返回拒绝的Promise
let p10 = p1.then(() => { throw 'baz'; });
// Uncaught (in promise) baz
setTimeout(console.log, 0, p10); // Promise <rejected> baz 
//注意，返回错误值和onRejected处理程序不会触发上面的拒绝行为，而会把错误对象包装在一个解决的期约中,
let p11 = p1.then(() => Error('qux'));
setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux 
let p3 = p1.then(null, () => undefined);
let p4 = p1.then(null, () => {});
let p5 = p1.then(null, () => Promise.resolve());
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined
// 可以多次执行then回调函数，且每次调用then时传入的回调都会被执行。
p1.then(() => console.log(1))
pl.then(() => console.log(2))
// 1
// 2
```
### Promise.prototype.catch()
Promise.prototype.catch()和Promise.then(null,onRejected)的处理是一样的，相当于then拒绝程序的一个语法糖。
```js
let p = Promise.reject();
let onRejected = function(e) {
 setTimeout(console.log, 0, 'rejected');
};
// 这两种添加拒绝处理程序的方式是一样的：
p.then(null, onRejected); // rejected
p.catch(onRejected); // rejected
Promise.prototype.catch()返回一个新的期约实例：
let p1 = new Promise(() => {});
let p2 = p1.catch();
setTimeout(console.log, 0, p1); // Promise <pending>
setTimeout(console.log, 0, p2); // Promise <pending>
```
#### 异常穿透
在Promise.then的链式调用中可以通过catch来统一捕获异常,只要前面有一个Promise拒绝都会直接走到catch
```js
fetch(`/api1/search/users2?q=${keyWord}`).then(
  response => {
    console.log('联系服务器成功了');
    return response.json()
  }
).then(
  response => { console.log('获取数据成功了', response); }
).catch(
  error => console.log('获取数据失败了', error)
) 
```
### Promise.prototype.finally()
在Promise状态转为拒绝和解决之后执行，该方法无法获取Promise的状态，对于已解决状态和拒绝状态的Promise返回原Promise。
```js
let p1 = Promise.resolve('foo');
// 这里都会原样后传
let p2 = p1.finally();
let p3 = p1.finally(() => undefined);
let p4 = p1.finally(() => {});
let p5 = p1.finally(() => Promise.resolve());
let p6 = p1.finally(() => 'bar');
let p7 = p1.finally(() => Promise.resolve('bar'));
let p8 = p1.finally(() => Error('qux'));
setTimeout(console.log, 0, p2); // Promise <resolved>: foo
setTimeout(console.log, 0, p3); // Promise <resolved>: foo
setTimeout(console.log, 0, p4); // Promise <resolved>: foo
setTimeout(console.log, 0, p5); // Promise <resolved>: foo
setTimeout(console.log, 0, p6); // Promise <resolved>: foo
setTimeout(console.log, 0, p7); // Promise <resolved>: foo
setTimeout(console.log, 0, p8); // Promise <resolved>: foo 
```
对于返回一个待定的Promise或onfinally()处理时抛出错误，会返回相应的待定或拒绝的Promise
```js
let p9 = p1.finally(() => new Promise(() => {}));
let p10 = p1.finally(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p9); // Promise <pending>
setTimeout(console.log, 0, p10); // Promise <rejected>: undefined
let p11 = p1.finally(() => { throw 'baz'; });
// Uncaught (in promise) baz
setTimeout(console.log, 0, p11); // Promise <rejected>: baz 
```
### 非重入期约方法
即Promise的then，catch，finally方法，都是异步执行。为微任务。
### Promise.all()
通过数组传入多个Promise，当所有Promise都解决后，就会进入onResolved，而只要有一个Promise拒绝，则返回拒绝，且只有第一个被拒绝的返回值会进入.all()的onRejected，只要有一个Promise处于待定，那么.all()都会待定。
```js
// 永远待定
let p1 = Promise.all([new Promise(() => {})]);
setTimeout(console.log, 0, p1); // Promise <pending>
// 一次拒绝会导致最终期约拒绝
let p2 = Promise.all([
 Promise.resolve(),
 Promise.reject(),
 Promise.resolve()
]);
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught (in promise) undefined 
//如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序：
let p = Promise.all([
 Promise.resolve(3),
 Promise.resolve(),
 Promise.resolve(4)
]);
p.then((values) => setTimeout(console.log, 0, values)); // [3, undefined, 4]
/*如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期
约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。合成的期约会静默
处理所有包含期约的拒绝操作，如下所示：*/
// 虽然只有第一个期约的拒绝理由会进入
// 拒绝处理程序，第二个期约的拒绝也
// 会被静默处理，不会有错误跑掉
let p = Promise.all([
 Promise.reject(3),
 new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3
// 没有未处理的错误
```
### Promise.race()
与Promise.all()类似，不过返回的是第一个拒绝或解决的Promise。
```js
// 空的可迭代对象等价于 new Promise(() => {})
let p3 = Promise.race([]);
// 无效的语法
let p4 = Promise.race();
// TypeError: cannot read Symbol.iterator of undefined 
// 解决先发生，超时后的拒绝被忽略
let p1 = Promise.race([
 Promise.resolve(3),
 new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
setTimeout(console.log, 0, p1); // Promise <resolved>: 3
// 拒绝先发生，超时后的解决被忽略
let p2 = Promise.race([
 Promise.reject(4),
 new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
setTimeout(console.log, 0, p2); // Promise <rejected>: 4
// 迭代顺序决定了落定顺序
let p3 = Promise.race([
 Promise.resolve(5),
 Promise.resolve(6),
 Promise.resolve(7)
]);
setTimeout(console.log, 0, p3); // Promise <resolved>: 5 
```

### Promise.any
和Promise.race相反，只要由一个promise变为成功就返回成功，只有全部都变为拒绝才会返回拒绝。
```js
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

### Promise.try
可以在传入的参数函数执行后返回一个promise。有时我们希望在调用某些函数之后，能够使用promise的方式来处理做一些事。
```js
const f = () => console.log('now');
Promise.try(f).then((v)=> console.log(v));
console.log('next');
// now
// next
// undefined
// 这个效果可以使用async关键字将函数变成异步函数，或new一个promise实例来实现。try只是提供了一个语法糖。目前是提案，但是已经由相应的库了
```
### Promise.allSettled
和Promise.all()的用法类似，不过是等待传入的所有promise都改变状态后才会改变返回的Promise状态，且返回的promise的状态只会是成功。每个promise的返回的结果是一个对象。
```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1)
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

### 串行Promise的应用
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
### Promise取消
promise实例执行后，在未结束之前，中止promise的状态更新
```js
class CancelToken {
  constructor(cancelFn) {
    this.promise = new Promise((resolve, reject) => {
      cancelFn(() => {
        setTimeout(console.log, 0, "delay cancelled");
        resolve();
      });
    });
  }
}
const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');
function cancellableDelayedResolve(delay) {
  setTimeout(console.log, 0, "set delay");
  return new Promise((resolve, reject) => {
    const id = setTimeout((() => {
      setTimeout(console.log, 0, "delayed resolve");
      resolve();
    }), delay);
    const cancelToken = new CancelToken((cancelCallback) =>
      cancelButton.addEventListener("click", cancelCallback));
    cancelToken.promise.then(() => clearTimeout(id));
  });
}
startButton.addEventListener("click", () => cancellableDelayedResolve(1000));
```
### async&await
async关键字可以将函数具有异步函数的特征，将异步函数的返回值通过Promise.resolve()包装后返回。await可以暂停异步函数的代码执行，能够暂停任何操作，等待Promise执行。
```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then((x) => console.log(x)); // 3
// 使用 async/await 可以写成这样：
async function foo() {
 let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
 console.log(await p);
}
foo();
// 3 
```
await关键字会创建一个微任务，如果await等待的是一个Promise，那么执行还会靠后。且await必须写在async函数中。await如果等待的是一个嵌套promise，则会等所有的promise都执行完then后才会返回值，对应Generator函数中的逻辑就是，只有当前的promise结果值不再是promise，才会调用Generator函数的next方法。
```js
async function foo() {
 console.log(2);
 console.log(await Promise.resolve(8));
 console.log(9);
}
async function bar() { 
 console.log(4);
 console.log(await 6);
 console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9 
```
await等待的promise如果变为解决，则会得到解决后的返回值，如果等待的promise的状态变为拒绝。则会抛出错误，可以通过trycatch捕获错误。
```js
var fn = async () => {
  const data = await new Promise((res,rej) => {
    res(2)
  })
  console.log(data) // 2
  try{
    const data1 = await new Promise((res,rej) => {
      rej(2)
    })
  }catch(err){
    console.log(err) // 2
  }
}
```
### 实现 sleep()
可以让同步代码实现暂停效果，不必将代码写入定时器中。
```js
async function sleep(delay) {
 return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
 const t0 = Date.now();
 await sleep(1500); // 暂停约 1500 毫秒
 console.log(Date.now() - t0);
}
foo(); 
```
### 利用平行执行
```js
async function randomDelay(id) {
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000;
 return new Promise((resolve) => setTimeout(() => {
 console.log(`${id} finished`);
 resolve();
 }, delay));
}
async function foo() {
 const t0 = Date.now();
 await randomDelay(0);
 await randomDelay(1);
 await randomDelay(2);
 await randomDelay(3);
 await randomDelay(4);
 console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 877ms elapsed

async function foo() {
 const t0 = Date.now();
 const p0 = randomDelay(0);
 const p1 = randomDelay(1);
 const p2 = randomDelay(2);
 const p3 = randomDelay(3);
 const p4 = randomDelay(4);
 await p0;
 await p1;
 await p2;
 await p3;
 await p4;
 setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
}
foo();
// 1 finished
// 4 finished
// 3 finished
// 0 finished
// 2 finished
// 877ms elapsed 
// 前一个例子是一个Promise完成之后在执行后面的Promise，后一个例子是所有Promise依次执行后，依次等待每个变量被赋值，赋值的过程是按顺序的。
```
### 串行执行期约
```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
async function addTen(x) {
 for (const fn of [addTwo, addThree, addFive]) {
 x = await fn(x);
 }
 return x;
}
addTen(9).then(console.log); // 19 
```
在串行执行过程中，如果需要停止执行，则需要返回一个pending状态的Promise。
```js
const pro = new Promise((res) => res(2))
pro.then((v) => {
  console.log(v + 1)
  return new Promise(() => {})
}).then((v) => {
  console.log(1)
})
// 3
```
### 栈追踪与内存管理
在同步函数中，嵌套调用Promise时，由于Promise会尽可能保留完整的调用栈，但是，有些嵌套调用函数已经返回了，出现在抛出错误的调用栈会增加内存消耗，此时利用async将函数转为异步函数会节省内存。
```js
function fooPromiseExecutor(resolve, reject) {
 setTimeout(reject, 1000, 'bar');
}
function foo() {
 await new Promise(fooPromiseExecutor);
}
foo();
// Uncaught (in promise) bar
// setTimeout
// setTimeout (async)
// fooPromiseExecutor
// foo 

async function foo() {
 await new Promise(fooPromiseExecutor);
}
foo();
// Uncaught (in promise) bar
// foo
// async function (async)
// foo 
```

### 自定义promise
```js
class MyPromise {
  constructor(init = () => { }) {
    // promise状态
    this.promiseState = 'pending'
    // promise结果
    this.promiseResult = null
    // 保存异步回调
    this.callback = []
    // 保存this
    const _this = this
    // 保存then方法返回的promise的状态函数。
    this.nextPromse = {}
    // 解决函数
    function resolved(data) {
      // 只允许修改一次状态
      if (_this.promiseState !== 'pending') return;
      // 修改状态
      _this.promiseState = 'resolved'
      // 保持结果
      _this.promiseResult = data
      // 处理异步回调
      if (_this.callback.length) {
        _this.callback.forEach((e) => {
          if (e.onResolve && typeof e.onResolve === 'function') {
            setTimeout(() => {
              e.onResolve(data)
            });
          }
        })
      }
    }
    // 拒绝函数
    function rejected(data) {
      // 只允许修改一次状态
      if (_this.promiseState !== 'pending') return;
      // 修改状态
      _this.promiseState = 'rejected'
      // 保持结果
      _this.promiseResult = data
      // 处理异步回调
      if (_this.callback.length) {
        _this.callback.forEach((e) => {
          if (e.onRejected && typeof e.onRejected === 'function') {
            setTimeout(() => {
              e.onRejected(data)
            });
          }
        })
      }
    }
    try {
      init(resolved, rejected)
    } catch (error) {
      // 报错直接返回失败的Promise
      rejected(error)
    }
  }

  then(onResolve, onRejected) {
    // 根据结果处理函数更新返回的promise的状态。
    const _this = this
    function refreshState(onSolve, res, rej, data) {
      try {
        let value = onSolve(data)
        if (value instanceof MyPromise) {
          value.then(
            (e) => res(e),
            (e) => rej(e)
          )
        } else {
          res(value)
        }
      } catch (error) {
        rej(error)
      }
    }
    // 给与默认值，将结果向下传递
    if (typeof onResolve !== 'function') {
      onResolve = res => res
    }
    // 默认抛出异常，将失败的结果向下传递。
    if (typeof onRejected !== 'function') {
      onRejected = res => { throw res }
    }
    return new MyPromise((res, rej) => {
      if (this.promiseState === 'pending') {
        this.callback.push({
          onResolve: function (data) {
            refreshState(onResolve, res, rej, data)
          },
          onRejected: function (data) {
            refreshState(onRejected, res, rej, data)
          },
        })
      }
      if (this.promiseState === 'resolved') {
        // 模拟异步执行。
        setTimeout(() => {
          refreshState(onResolve, res, rej, _this.promiseResult)
        });
      }
      if (this.promiseState === 'rejected') {
        setTimeout(() => {
          refreshState(onRejected, res, rej, _this.promiseResult)
        });
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(data) {
    return new MyPromise((res, rej) => {
      if (data instanceof MyPromise) {
        data.then(
          v => res(v),
          v => rej(v)
        )
      } else {
        res(data)
      }
    })
  }

  static reject(data) {
    return new MyPromise((res, rej) => {
      rej(data)
    })
  }

  static race(promises) {
    return new MyPromise((res, rej) => {
      for (let index = 0; index < promises.length; index++) {
        promises[i].then(
          (v) => res(v),
          (v) => rej(v)
        )
      }
    })
  }

  static all(promises) {
    return new MyPromise((res, rej) => {
      let count = 0;
      let arr = [];
      for (let index = 0; index < promises.length; index++) {
        promises[i].then(
          (v) => {
            count++;
            arr[i] = v
            if (count === promises.length) {
              res(arr)
            }
          },
          (v) => rej(v)
        )
      }
    })
  }
}
```