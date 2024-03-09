# es6
## let&const&var
### var
- 会进行变量提升，可以在定义之前使用该变量
- 同一作用域内可以重复定义同一变量，新定义的为最终值
- 函数的父子作用域内可以拥有同一变量名，且保存不一样的数据。
### let
1. 作用域为块级作用域，在块级作用域链之外无法访问。
2. 存在暂时性死区，在未定义之前不能访问，不会进行变量提升。
3. 同一作用域内不能重复定义同一变量名
4. 块级作用域中函数声明会默认调用let进行定义。
5. 函数的父子作用域内不能拥有同一变量名
### const
除了保存的值不能更改外，其它与let一致。
## 解构赋值
解构赋值的本质是，只要是据有Iterator接口的数据就可以进行解构，否则会报错。解构出来的变量如果有同名会覆盖。
### 数组
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

// 默认值为undefined，可以设置默认值，并可以互相引用。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
### 对象
默认值也是undefined，也可以设置默认值，并且可以通过：更改变量名，并且能够解构到原型上的属性
```js
let obj = {c:1}
let { foo:f, bar = 'dg',b , p , p:{a} , p: obj.c , ...c} = {p:{a:'3dg'} foo: 'aaa', ,d:2};
f // "aaa"
bar // "dg"
b // undefined
p // {a:'3dg'}
a //'3dg'
obj.c // {a:'3dg'}
c // {d :2}

let x = 12
// 必须加括号，否则左边会被认为代码块
({x} = {x:1})
x // 1

// 由于数组也是对象形式，所以可以进行对象解构
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```
### 字符串
字符串是一个特殊的数组，因此可以进行数组和对象解构
```js
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
```
### 数值和布尔值
解构时会将数值和布尔值转化成对应的数值或布尔值对象，由此可以进行对象解构
```js
// 由于可以解构原型上的属性，并且会转化为对象后再解构，可以写成如下形式。
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
```
### 函数参数
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

## 字符串的拓展
### 字符的 Unicode 表示法
```js
// 允许使用如下形式进行字符表示，只能表示\u0000~\uFFFF之间的字符
"\u0061"
// "a"
```
### 字符串的遍历器接口
为字符串增加了Iterator接口，能够被for of遍历

### 模板字符串
- 会保留换行和空格。可以使用trim方法去除空格和换行
- 可以嵌套使用
```js
// 如果count是个对象将会默认调用其toString方法
let str = `df${count}`
```
#### 标签函数
当模板字符串作为摸个函数的参数时，可以提取其中的js表达式作为参数
```js
tag`Hello ${ a + b } world ${ a * b}`; // 等价于tag(['Hello ', ' world ', ''], 15, 50)
```

## 数值的拓展
### 分隔符
es6支持在定义数字时使用_来做分隔符(125_241)，紧挨分隔符的左右必须有数字且只能是数字，用分隔符定义的数字字符串不能通过Number()、parseInt()、parseFloat()成功转化。
### BigInt
js对于大于Infinity的数没有办法表示，所以提供了第八种数据类型，用来表示超过Infinity的整数，没有位数限制，所有数的表示都要加上n(1n),应该是存入BigInt数值时在存入的二进制数据后增加了一个n字节数据作为标识符。BigInt本身是一个函数，不是构造函数不能new。所有计算都和正常数值一样。
```js
42n === 42 // false
typeof 123n // 'bigint'
-42n // 正确
+42n // 报错，因为加会默认转为Number类型
1n + 1.3 // 报错，不能与一般数值进行计算
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"，会丢失n
```

## 函数的拓展
### 默认值
函数支持参数默认值，直接写在参数后，由此可以和解构赋值一起使用，提高代码可读性。只有传入的参数是undefined或不传时才会使用默认值
```js
// 当使用默认值后，函数的参数内会形成一个单独的作用域，所以可以接受该作用域内和其它作用域之间拥有相同的变量名
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}
foo() // 2
x // 1
// 利用默认值抛出错误
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()
// Error: Missing parameter
```
### rest参数
利用拓展运算符(...)可以将多余的参数进行合并成一个数组，不在需要使用arguments对象来访问了
```js
const sortNumbers = (...numbers) => numbers.sort();
```

### 严格模式
在函数是用了默认值、解构赋值、或者扩展运算符时，函数提内部不能使用严格模式，可以在全局使用严格模式，或将函数体包含在一个立即实行函数里返回，从而在立即执行函数中进行严格限制。

### name属性
使用name属性来保存函数的名称

### 箭头函数
- 不能使用new关键字即不能当作构造函数
- this永远指向声明语句所在函数执行时的this
- 不能使用arguments对象
- 不能使用yield命令，因此箭头函数不能用作 Generator 函数。

### 尾调用
当一个函数的return是另一个函数的执行时，就是尾调用
#### 尾调用优化
当出现尾调用且内部函数不会使用外部函数变量时，每次执行只会保留当前执行函数的调用帧，大大节省内存，这在尾调用是递归调用时是很大的提升。这种优化只能存在于严格模式中，因为在正常模式下有可能会使用arguments和caller(调用该函数的语句所在的函数)变量，而尾调用时会删除调用帧，导致变量失效。但在严格模式下这两个变量是不允许使用的。

### 函数参数的尾逗号
允许函数参数在最后一个参数后面存在一个逗号，这样在增加参数时可以不需要在之前的最后一个参数后边加逗号，导致代码更新对比时出现多行变更，利于版本管理。

### toString
以前函数调用toString时会将注释和空格删除，现在会保留所有。

### catch参数
es2019之后可以省略catch的参数
```js
try{

}catch{

}
```

## 数组的拓展
### 拓展运算符
- 可以将一个数组在另一个数组中展开。
- 将函数参数合并成一个rest数组
- 将数组的内容当作参数进行传参
- 浅拷贝数组，合并数组
- 解构赋值中生成新数组
- 将字符串拓展为真正的数组
- 任意有Iterator接口的对象都能利用拓展运算符转化成数组
```js
function push(array, ...items) {
  // 由于可以将数组中的值依次当作参数传入，此前借助apply进行多参数传递可以直接用拓展运算符替代。
  array.push(...items);
}
let str = 'dg'
let arr = [...str] // ["d","g"]
```
### 数组空位
之前数组会跳过空位，或保留空位，es6之后固定将空位转为undefined

## 对象的拓展
### 对象的简写
如果属性名和变量相同，可以触发对象的属性或方法简写
```js
const foo = 'bar';
const baz = {foo};
const o = {
  method() {
    return "Hello!";
  }
};
```
### 属性名表达式
使用[]来进行属性的获取和设置，内部可以支持js表达式
```js
obj['a' + 'bc'] = 123;
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
  ['h' + 'ello']() {
    return 'hi';
  }
};
```

### 属性的可枚举性和遍历。
#### 属性可枚举
对象的属性有一个描述对象，可以通过Object.getOwnPropertyDescriptor进行访问，如果得到的对象中enumerable属性为false，那么for...in循环、Object.keys()、JSON.stringify()、Object.assign()对对象的遍历会忽略该属性。其实引入enumerable主要是防止for...in访问到toString和数组的length属性，遍历对象尽量使用keys。
```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```
#### 属性遍历
能对对象属性进行遍历的有
- for...in-遍历自身和继承的不含Symbol的可枚举属性
- Object.keys(obj)-遍历自身不包含Symbol属性的可枚举属性数组。
- Object.getOwnPropertyNames(obj)-获取对象的不包含Symbo属性的所有属性名数组
- Object.getOwnPropertySymbols(obj)-获取对象的所有Symbol键名数组。
- Reflect.ownKeys(obj)-返回自身所有键名的数组
所有遍历对象的顺序为
- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

### super 关键字
执行对象的原型，并且只能用在对象简写方法中
```js
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};
const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}
Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

### 拓展运算符
- 在解构赋值中使用只能写在最后，并且是浅拷贝，不能拷贝原型上的属性
- 浅拷贝对象的所有可遍历属性，方法不会被拷贝。实际上和Object.assign方法一致。
```js
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
// 如果拓展运算符后是除字符串的原始值会生成对象对象 等同于 {...Object(1)}
{...1} // {}
// 字符串本上可以看作一个类数组对象，所以可以对字符串进行拓展
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
// 运算符后可以跟表达式
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```

### AggregateError 错误对象
本身是一个构造函数，用来同时抛出多个错误。
```js
const error = new AggregateError([
  new Error('ERROR_11112'),
  new TypeError('First name must be a string'),
  new RangeError('Transaction value must be at least 1'),
  new URIError('User profile link must be https'),
], 'Transaction cannot be processed')
//  error有三个属性
// name：错误名称，默认为“AggregateError”。
// message：错误的提示信息。
// errors：数组，每个成员都是一个错误对象。
```
### Error 对象的 cause 属性
对error进行描述，可以为任何值
```js
const actual = new Error('an error!', { cause: 'Error cause' || { });
actual.cause; // 'Error cause'
```
## 运算符的拓展
### 指数运算符-**
指数运算可以使用 **，且该运算符是右结合，即当多个##运算符一起运算时，先计算右边的值
```js
2 ** 3 // 8
2 ** 2  ** 3 // 256
let a =2 
a **= 3 // 8
```
### 链式判断运算符-?.
当链式调用时，使用?.来规避左侧变量是undefined或null的情况
```js
a?.b // 等同于 a ? a.b : undefined
a.b?.() // 等同于 a.b ? a.b() : undefined
a?.[x] // 等同于 a ? a[x] : undefined
```
### Null 判断运算符 ??
当进行 或 运算时，左侧只在null和undefined情况下才返回右侧的值，通常和?.进行搭配给初始值
```js
let x = a?.b ?? 3
// 当与其它逻辑运算符运算时需要加上括号，不然会报错
(lhs && middle) ?? rhs;
```
### 逻辑赋值运算符(||=、&&=、??=)
一般用于给变量赋初始值
```js
// 或赋值运算符
x ||= y // 等同于x || (x = y)
// 与赋值运算符
x &&= y // 等同于 x && (x = y)
// Null 赋值运算符 
x ??= y // 等同于 x ?? (x = y)
``` 
### #!
在js文件第一行编写，指定脚本执行器
```js
#!/usr/bin/env node // 这样就会默认使用node解析代码。
```

## Symbol
一种新的原始数据类型，用来表示一个独一无二的值，每次返回的值都是不一样的。
```js
// 参数会变成描述，使用toString时易于区分
let sy = Symbol(2)
sy.toString() // 'Symbol(2)'
// symbol不能和其它值进行计算，会报错
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
// 能转为字符串和布尔值及对象，不能转为数字
Boolean(Symbol()) // true
String(Symbol(1)) // 'Symbol(1)'
Object(Symbol(2)) // 会转化为Symbol队形
```
### description 
用于显示返回Symbol值的描述

### 属性应用
当用作对象属性名时，读取和设置只能使用[],并且不会被for...in、for...of、Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()获取

### Symbol.for、Symbol.keyFor
Symbol.for(key)返回一个具有key标识的Symbol值，如果没有就返回一个以key为标识的新的Symbol(全局的变量，包括iframe和service worker都能访问)，相当于在存储Symbol时在其二进制数据中添加一个标识二进制
Symbol.keyFor(x)返回Symbol.for定义的Symbol的key

### 内置Symbol
- Symbol.hasInstance-instanceof运算符就是调用了对象上该属性对应的方法。
- Symbol.isConcatSpreadable-判断数组在使用concat方法时，传入的数组是否展开，默认支持展开且值为undefined。
```js
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined,设置为true也是一样的效果

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// 不过当concat传入的参数是一个类数组时，默认是不展开的，设为true时才展开
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
```
- Symbol.species-内置构造函数的一个属性，指向一个构造函数。当一个构造函数的实例对象调用继承方法时希望返回指定构造函数的实例，主要用于内置对象。
```js
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true
```
- Symbol.match-指向正则对象的match方法，在字符串使用match方法时，如果传入的正则对象有该属性，则会返回该属性方法的返回值。
```js
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```
- Symbol.replace-作用与Symbol.match相同
- Symbol.search-作用与Symbol.match相同
- Symbol.split-作用与Symbol.match相同
- Symbol.iterator-指向对象的遍历器方法
- Symbol.toPrimitive-指向对象转换为原始值的方法，可以通过该属性重写该方法。
- Symbol.toStringTag-对象的toString方法返回值的标识，如果该值存在，对象在调用toString方法时会加上该属性
```js
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"
```
- Symbol.unscopables-指向被with语句排除的属性对象，该对象中拥有的属性，在with环境中不会被访问到

## Set
用来表示没有相同值的数组结构，可以用来去除数组中相同的值，Set判断其结构内的值是否相同的算法与全等符的运算相似，但是会把NaN看作一个值。
```js
const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1,2,3,4]
[...new Set(array)] // 数组去重
Array.from(new Set(array)) // 数组去重
[...new Set('ababbc')].join('') // 字符串去重
```
### Set的实例属性和方法
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。
### Set的遍历方法
- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员
由于Set的键值和键名是一个值，所以前三个方法都是一样的遍历效果
```js
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
```
目前没有办法对更改Set结构，但是通过(...)拓展运算符和数组的方法进行更改
```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6
// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```
## WeakSet
与Set一样的结构，但只能存储对象和Symbol值，并且是弱引用(当垃圾回收机制执行时，不考虑该变量是否能被WeakSet访问。)。一般用来存储dom结构，不能遍历。
```js
const ws = new WeakSet();
ws.add(Symbol()) // 不报错
```
### 方法
- WeakSet.prototype.add(value)：添加某个值，返回 WeakSet 结构本身。
- WeakSet.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- WeakSet.prototype.has(value)：返回一个布尔值，表示该值是否为WeakSet的成员。

## Map
一个键名接受任何值类型的对象数据结构。
### Map的方法
```js
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
m.clear() // 清楚所有的键。
```
map方法可以接受数组,采用的算法其实是遍历参数数组进行set操作。
```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```
可以通过Set转换成Map
```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1
```
如果多次赋值，那么后面的回覆盖前面的值。
```js
const map = new Map();
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"
```
如果读取未定义的键返回undefined
由于可以将对象作为键，不同对象的引用时不一样的键。
```js
const map = new Map();
const k1 = ['a'];
const k2 = ['a'];
map
.set(k1, 111)
.set(k2, 222);
map.get(k1) // 111
map.get(k2) // 222
```
Map将NaN视为相等的键。
### Map的遍历方法。
- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。
Map的顺序等于插入的顺序
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"
for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
由于Map[Symbol.interator] === Map.entries，所以默认对map循环其实调用entries
利用拓展运算符将map转为数组,并通过数组的方法对map进行重置。
```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]
// [1, 2, 3]
[...map.values()]
// ['one', 'two', 'three']
[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```
map的forEach方法可以接受第二个参数进行this绑定
```js
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```
### Map的数据转换
map转换为对象可以通过对map进行遍历，但是需要保证map的键全为字符串。
```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```
通过Object.entries方法可以将对象结构转为map,也可以参考上面的方法进行遍历转换。
```js
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```
Map与JSON转换需要转换为对应的数组或对象后再转换。

## WeakMap
和WeakSet一样的限制，不过限制的是键名，键值不受限制，一般用来储存dom的相关信息。
```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};
wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```
### 方法
只有四个方法get()、set()、has()、delete()

## WeakRef
能够创建对象的弱引用，垃圾回收不会考虑该引用。一般用作缓存。
```js
// deref函数返回当WeakRef对应的值，如果已经被销毁则返回undefined。
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }
    const fresh = f(key);
    // 只存储弱引用，在当前事件循环(event Loop)中不会失效，当下一次垃圾回收机制执行时，fresh会被销毁
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}
const getImageCached = makeWeakCached(getImage);
```

## FinalizationRegistry
清理注册表功能，能够监测一个对象的存在，在对象被销毁时调用注册的函数。
```js
// 新建一个注册实例
const registry = new FinalizationRegistry(heldValue => {
  // ....
});
// 注册需要观测的目标对象,第二个参数是执行注册实例回调函数传入的参数，第三个参数用于标识注册实例，必须传入一个对象，一般使用监测对象。
registry.register(theObject, "some value",theObject);
// 利用标识对象取消注册实例回调。
registry.unregister(theObject);
// 升级之前的缓存图片资源函数
function makeWeakCached(f) {
  const cache = new Map();
  // 当fresh被销毁后，清除对应的key
  const cleanup = new FinalizationRegistry(key => {
    const ref = cache.get(key);
    if (ref && !ref.deref()) cache.delete(key);
  });

  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    cleanup.register(fresh, key);
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```

## proxy
一个构造函数,返回一个代理对象,该代理对象可以代理目标对象(包括数组)的属性,在构建该代理对象时,可以为代理对象的属性设置get,set,delte等拦截方法.通过这些方法实现对象属性操作的监听，只能监听根目录的属性。由于拦截了对象的诸多操作，所以每一次拦截后返回的值必须符合目标对象本来操作应该返回的值。
### 方法
1. get(target, propKey, receiver)：拦截对象属性的读取，同时可以被继承。如果目标对象的属性是不可配置且不可写则通过代理访问会报错。
```js
// 拦截读取属性值，这个拦截方法可以看作深层拦截，因为深层数据访问必然是从根目录属性开始访问的，即访问深层属性也会拦截成功
// 无法
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});
let obj = Object.create(proto);
obj.foo // "GET foo"
```
2. set(target, propKey, value, receiver)：拦截对象属性的设置，返回一个布尔值。

3. has(target, propKey)：拦截HasProperty的操作，返回一个布尔值，不过for...in操作不会被拦截。如果目标对象不可拓展，则拦截会报错。
```js
// in操作符就是使用HasProperty方法进行判断的
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```
4. deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值，抛出错误或返回false都无法正常删除。目标对象不可配置同样不可拦截。
5. ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for…in循环，返回一个数组,该数组只能由Symbol和字符串组成。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
6. getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
7. defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
8. preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
9. getPrototypeOf(target)：拦截访问对象原型，必须返回一个对象或null。
```js
// 主要是拦截Object.prototype.__proto__、Object.prototype.isPrototypeOf()、Object.getPrototypeOf()、Reflect.getPrototypeOf()、instanceof这几种操作
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```
10. isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值，返回其它的值会转化为布尔值，且必须与目标对象的isExtensible值一致否则会报错。
11. setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
12. apply(target, object, args)：拦截 Proxy 实例作为函数调用(包括call和apply)的操作。
```js
var twice = {
  // 三个参数分别是目标函数，调用时的this，传入的参数
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```
13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(…args)。
```js
const p = new Proxy(function () {}, {
  construct: function(target, args) {
    // 此处的this指向传入的handler配置对象
    console.log('called: ' + args.join(', '));
    // 必须返回一个对象
    return { value: args[0] * 10 };
  }
});
(new p(1)).value
// "called: 1"
// 10
```
### Proxy.revocable
返回一个可取消的Proxy，可以应用在一次访问后即取消当前Proxy，达到限制访问的目的。
```js
let target = {};
let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```
### this问题
- 当通过代理对象访问目标对象的方法时，方法内的this指向的是代理对象。由此我们需要在get拦截函数中返回方法时绑定this
```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```
- 所有代理对象的拦截函数的this都指向初始化实例时的handler

## Reflect
这个全局对象上部署了很多操作对象数据的方法，目的是将属于语言内部的方法统一存放在该对象上，而不是一律通过Object进行访问。并且将一些命令是写法变成函数是写法,譬如in、delete等操作符，目前为了配套Proxy，该对象上的方法和Proxy能够拦截的操作方法一一对应。

## Iterator
在js中的集合类型有很多,包括对象，数组，Map，Set。这些数据集合通常都需要遍历操作，而Iterator接口可以更好的遍历这些集合，且是为了提供给新增的for...of循环命令使用的。
### Iterator遍历器
Iterator接口通过遍历器对象遍历数据。遍历器对象如下：
```js
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        // 必须
        next() {
          return { done: false };
        },
        // 可选，主要在遍历提前退出时触发，有可能执行出错，或遇到break语句。
        return() {
          file.close();
          return { done: true };
        },
        // 可选
        throw() {

        }
      };
    },
  };
}
```

### Symbol.iterator
当for...of遍历数据结构时，会自动寻找数据对象的Symbol.iterator属性(继承的也可以)对应的函数来生成遍历器进行遍历数据。
```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
```
### 遍历过程
- 首先创建一个指针对象，指向需要遍历的集合
- 然后调用指针对象的next方法，将指针指向当前集合的第一个成员，并返回一个对象，包含成员的值(value)和是否遍历结束(done)的信息
- 然后再一次调用next方法，将指针指向下一个成员，直到遍历完成。
### 内置遍历器的对象
- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象
自定义类数组时，可以直接将数组的Symbol.iterator赋给定义的类数组。
### iterator的调用场景
1. 解构赋值
2. 拓展运算符
3. 接受数组作为参数的方法：Array.from、Promise.all等。

## Generator(生成器)
本质上是一个函数，内部保存了一些状态值，会返回一个指针对象(称为迭代器)，调用这个遍历器的next方法，就可以获取一个其保存的一个状态值，得到的状态值来自当前yield命令后的js表达式。Generator本身也有Symbol.iterator属性，不过该属性指向自己
```js
// *的位置只要在函数关键字和函数名称之间就行。函数中第一个yield命令之前的代码会在第一次调用遍历器的next之后才执行。
function* helloWorldGenerator() {
  console.log(1)
  yield 'hello';
  yield 'world';
  // 如果没写return，也会有一个默认的return undefined
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next() // 1 {value:"hello",done:false}
```
## 和Symbol.iterator区别
对象的Symbol.iterator是一个初始的生成器函数，可以自定义迭代器对象的next方法的返回值，而Generator函数是一个封装了迭代器的生成器函数，规定了自身迭代器每次的返回值。

### yield命令
- yied标识暂停执行，只能出现在Generator函数中。
- 只要Generator函数执行时遇到yield就会停止执行代码，当调用遍历器的next方法后，才会继续执行当前yield之后的代码，直到遇到下一个yield或return命令再一次停止。
- yield命令本身也是一个表达式，而这个表达式的返回值需要等待下一次调用next后才能得到，所以包含yield的表达式会在下一次调用next后才能执行完。
```js
// 出现在另一个表达式中需要加括号，
function* demo() {
  console.log('Hello' + (yield));
  console.log('Hello' + (yield 123));
}
// 作为参数时不用加括号
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```
### next的参数
传入的参数会作为上一次执行yield表达式的返回值。所以，第一次调用next时传入的参数会被忽略。
```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```
### Generator.prototype.throw
- 可以抛出一个错误，并被Generator函数体内的catch语句捕获
- 必须要执行一次迭代器的next，Generator函数体内的catch语句才能够捕获该方法抛出的错误
- 如果Generator函数体内没有catch语句，则错误会被外部代码的catch语句捕获。
- Generator函数体内的catch语句一旦捕获到错误会附带执行一次next。
- Generator函数内部一旦抛出错误，并会停止执行，并且调用next后返回遍历结束
```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

var gen = function* gen(){
  try {
    yield 1;
  } catch (e) {
    yield 2;
  }
  yield 3;
}

var g = gen();
g.next() // { value:1, done:false }
g.throw() // { value:2, done:false }
g.next() // { value:3, done:false }
g.next() // { value:undefined, done:true }
```

### Generator.prototype.return
传入的参数当作最后一次的返回值得value，如果没传参数则返回的value值为undefined，并且终止Generator函数，在调用next函数也会返回遍历结束。
```js
// 如果函数内有finally代码块，调用return后会直接进入finally，并可以通过next继续执行finally内的代码。
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

### yield*
后面跟一个遍历器对象，可以帮我们自动循环调用遍历器对象的next方法，相当于for...of循环在Generator函数内的简写形式。
```js
function* inner() {
  yield 'hello!';
  return 'foo'
}
function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}
var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'

  var x = yield* inner()
  // x会得到inner函数的返回值
  console.log(x)
  // 由于数组等原生含有遍历器对象，所以会自动调用其遍历器对象
  yield* ['a','b']
  return 'f'
}
var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next() // 'foo' {value:'a'}
gen.next().value // "b"
var gen1 = outer2()
// Generator函数中return语句的返回值不会被for...of和拓展运算符遍历
var arr = [...gen1] // ['open','hello','a','b']

// yield* 表达式可以很好的将数组扁平化
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
const tr = [...iterTree(tree)] // ['a','b','c','d','e']
```
### 作为属性的Generator函数
```js
let obj = {
  // 简写形式
  * myGenerator(){

  }
}
```
### Generator的this
Generator本身时一个构造函数，但是返回的是遍历器对象，所以不能使用new关键字。并且返回的遍历器对象也是Generator函数的实例。所以我们如果想要给遍历器对象设置属性需要使用原型。
```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```
### Generator与上下文
Generator函数在遇到yield命令时会将自身的执行上下文(调用帧)退出调用栈并冻结变量，当我们再次执行next后就会重新将上下文加入到堆栈，并恢复执行。

## Generator函数的异步应用
主要是利用异步任务回调来调用Generator的遍历器的next实现同步写法
1. 使用js的thunk函数来接受next方法实现递归调用
```js
function* main(parmas) {
  var result1 = yield request("http://some.url",parmas);
  // 由于result是yield的返回值，所以在下一次调用next之前下面的代码都会等待执行。
  var resp = JSON.parse(result);
  var result2 = yield request("http://some.url",result1);
    console.log(resp.value);
}

// 将异步调用使用thunk函数来实现
function request(url,parmas) {
  return function (next) {
    makeAjaxCall(url,parmas, function(response){
      next(response);
    });
  }
}
function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}
run(main);
```
2. 使用promise来递归调用next
```js
function* main(parmas) {
  var result1 = yield request("http://some.url",parmas);
  // 由于result是yield的返回值，所以在下一次调用next之前下面的代码都会等待执行。
  var resp = JSON.parse(result);
  var result2 = yield request("http://some.url",result1);
    console.log(resp.value);
}

// 将异步调用使用thunk函数来实现
function request(url,parmas) {
  return makeAjaxCall(url,parmas, function(response){
      next(response);
    });
}
function run(fn) {
  var gen = fn();
  function next(data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value.then((data) => {
      next(data)
    });
  }
  next();
}
run(main);
```
### Thunkify
自动生成一个thunk函数
### co 模块
帮我们自动执行定义的Generator函数，相当于上面的run(执行器)

## async
就是Generator的一个语法糖，自带了Generator函数的执行器，且执行器使用promise对象实现的异步执行next，await相当于yield。
### async函数返回值的状态
只有当函数内抛出错误或await后的promise变为拒绝时才会变为拒绝，其余情况都是成功。
### 错误处理
async可以捕获的错误处理有
- async函数中抛出的错误可以在返回的promise对象的catch方法中被捕获
- 任何一个await后的promise状态变为拒绝都会中止async函数的运行，并将错误结果返回给async函数返回的promise对象。
### 栈追踪
在同步函数中如果出现一个异步任务，当异步任务执行时可能同步函数已经执行完成，导致当异步回调执行时无法获取同步函数的调用帧，如果出错则错误信息不会包括同步函数，如果将同步函数改为异步函数就可以了。
```js
const a = () => {
  b().then(() => c());
};
// 改为异步函数
const a = async () => {
  await b();
  c();
};
```
### 实现原理
```js
async function fun(){

}

// 等同于

function fun(args){
  return spawn(function* (){})
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```
### 顶层await(ES2022，只支持es6模块化)
有时一个模块的输出结果是一个异步结果，当其它模块引入该模块时可能还未得到正确结果，如果立马使用该值会得到错误的结果。之前是让具有异步值的模块同时导出一个promise，让引入的模块能够在promise任务完成后才使用引入的值。由此设计让模块能够直接使用await，这样在其它模块使用异步值时会自动等待结果完成后才继续执行代码。
```js
// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");
// X1
// Y
// X2
// Z
```
## 模块化
node使用的commonJS是运行时加载，即只有引入模块代码运行后模块内才能得到引入的数据。而es6则使用了编译时加载的模式，在编译阶段就能拿到对应的引入变量，编译时加载能够更好的做静态优化。但同时也限制了其不能实现动态加载模块。
### 严格模式
es6的模块化默认开启严格模式。
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象，默认指向undefined
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）
### export
export向外部暴露的是接口，包括函数，类，关键字(var,let,const)定义的变量
一共有三种暴露方式：
1. 分别暴露
```js
export var firstName = 'Michael';
export function f(){};
export var year = 1958;
export year // 报错，不是接口
```
2. 统一暴露
```js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export { firstName, lastName, year };
```
3. 默认暴露
默认暴露其实只是默认暴露了default变量，而且在使用该default变量的模块内可以任意给default变量命名。
```js
// name.js
var firstName = 'Michael';
export default firstName;

import fn from 'name.js'
// 等同于
import {default as fn} from 'name.js'
```
### import
- import引入的变量是不能修改的，但如果变量是一个对象则可以修改其属性(不推荐)。
- import命令具有提升效果，会自动将模块内的import提到头部执行
- import命令会默认执行加载的模块代码
- 对一个模块的多个import引入，模块只会执行一次。
- import语句不能有表达式或写在if语句中
### export&import共用 
使用下面语法不能直接使用暴露的变量，因为只是做了一个转发。
```js
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 具名改默认
export { es6 as default } from './someModule';

// 默认改具名
export { default as es6 } from './someModule';

export * as ns from "mod"; // 不包括default
// 等同于
import * as ns from "mod";
export {ns};
```
### 重命名
export和import都可以对变量进行重新命名，通过as实现
```js
// name.js
var name = 2
export {name as myName}
export default function(){}

import {myName as name} from './name.js'
import * as names from './name.js'
names.name // 2
```
### import()
由于import命令不能实现动态加载，所以es2020加入了import()方法，能够冬天加载一个模块。该方法返回一个promise对象，由此可以写在async函数中。
```js
import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
    // 通过module.default访问默认暴露
  })
  .catch(err => {
    main.textContent = err.message;
  });
```
### import.meta
可以通过import命令的meta属性获取当前模块的信息，只能在模块内部使用。
- import.meta.url返回当前模块的 URL 路径
- import.meta.scriptElement是浏览器特有的元属性，返回加载模块的那个script元素，相当于document.currentScript属性
### es6模块化和commonJS的差异
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');
console.log(mod.counter);  // 3
mod.incCounter();
// 如果是es6模块的话，mod.counter的值会是4.
console.log(mod.counter); // 3
```
### node加载es6模块化
从node的v13.2开始，node就可以解析es6的模块化语法了，不过需要将文件后缀写成.mjs。或者将package.json中的type设置成module也可以让node自动将模块当成es6模块，不过此时如果要将模块当成commonJS模块的话需要将文件写成.cjs的后缀。有一些注意事项是：
- requre命令不能加载.mjs文件
- .cjs文件里不能写通过import关键字引入
- .cjs文件可以使用import()
- .mjs可以写require命令。
- import命令可以加载.cjs文件但只能整体输出 
```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```

### package.json的mian&exports字段
两者都可以指定模块入口文件，一般情况下都使用main作为入口文件，但是exports字段优先级高于main字段且只有支持es6的弄得版本才支持。
```js
// 使用exports字段可以支持模块别名
// ./node_modules/es-module-package/package.json
{
  "exports": {
    // 入口为指定js
    "./submodule": "./src/submodule.js",
    // 入口为子目录别名
    "./features/": "./src/features/"
  }
}
// 默认别名为‘.’，也可以直接写成exports的值
{
  "exports": {
    ".":"./main.js",
  }
  // 或者直接写成
  "exports":"./main.js"
}

// 引入时可以使用如下写法
import submodule from 'es-module-package/submodule';
import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/submodule.js
```
可以同时使用exports字段和main字段来实现兼容不同版本node项目的入口。
```js
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}
```
exports还支持不同的入口
```js
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": {
      // 代表加载commonJS模块
      "require":"./main.cjs",
      // 代表加载es模块。
      "default":"./main.js"
    }
  }
}
```
### 加载路径
import加载模块时可以指定路径参数，如果路径参数更改会生成全新的缓存。node中的import只支持加载本地模块，不能请求远程模块。且加载路径只支持相对路径。
```js
import './foo.mjs?query=1'; // 加载 ./foo 传入参数 ?query=1
```
### 循环加载
- commonJS在出现循环加载时是通过暂停执行实现的，当a中引入b时，会停止执行a去执行b，当b中引入a时，会直接获取当前a已经执行的代码。不会再去执行a，等待b执行完后，在将a剩下的代码执行完毕。
```js
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
// b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true

// 由此commonJS模块中在引入模块时，如果在引入时就取值可能会取不到正确的值
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法
```
- es的方法时通过函数的声明提升来解决的，函数声明会在import语句执行前，这时a中引入b就会优先去执行b，当b中引入a时，由于函数已经声明了，此时是能够得到值的，当b执行完后，a在执行未完成的代码，如果b中引入a中的内容未做声明提升，那么是会报错的。
```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```
总之两者都利用了模块加载一次后就不会重新执行模块代码了，而是直接取值，而在循环加载中commonJS是直接获取模块的半成品结果，而es6则是通过function关键字的提升效果从未加载完的模块中得到想要的数据。

## 异步遍历器
Generator函数生成的遍历器对象调用next后返回的是一个promise，返回值存在promise对象上，该异步遍历器生成函数的内置属性名是Symbol.asyncIterator。以下是一些使用方法。
```js
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
asyncIterator
.next()
.then(iterResult1 => {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
})
.then(iterResult2 => {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
})
.then(iterResult3 => {
  console.log(iterResult3); // { value: undefined, done: true }
});

async function f() {
  const asyncIterable = createAsyncIterable(['a', 'b']);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  console.log(await asyncIterator.next());
  // { value: 'a', done: false }
  console.log(await asyncIterator.next());
  // { value: 'b', done: false }
  console.log(await asyncIterator.next());
  // { value: undefined, done: true }
}
// 新增了for await...of来遍历异步遍历器，for await...of还可以遍历同步遍历器
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b
```
## ArrayBuffer
一个用于存储二进制数据的数组对象，可以通过下标直接操作内存数据，从而和显卡进行即使通信，增加浏览器和显卡的通信速度，而浏览器于显卡的通信接口称为webGL





