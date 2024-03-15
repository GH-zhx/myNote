# API
## window
### 属性

### 方法
1. eval-可以将传入的字符串当成js语句执行，如果不是字符串返回参数。
2. parseInt-将字符串转为数字，不会返回小数
3. parseFloat-将字符串转化为数字，支持小数。
4. isFinite-先调用number转化为数字后在进行判断
5. isNaN-先调用number转化为数字后在进行判断

## document对象
### 属性

### 方法
1. append 添加子元素，可接受dom对象和字符串，没有返回值。
2. appendChild 添加子元素，只接受dom对象，返回当前节点。

## event对象
### 属性
- relatedTarget 返回事件发生相关联的元素，譬如在focus事件中如果焦点是从上一个input变更到当前input，那么该属性就指向上一个input。
- currentTarget 返回事件绑定的元素
- target 返回触发该事件的元素。
## dom对象
### 属性  

### 方法
可以直接使用"."语法来获取或赋值相应的属性，自定义属性不行。
1. setAttribute(key, value)（可以用来设置元素节点的属性，可以设置自定义属性）
2. getAttribute(key)(可以得到元素节点的某个属性，自定义属性只能由此方法获取)
3. removeAttribute 删除属性
4. remove 删除调用该函数的节点。
## object对象
### 属性
1. __proto__-指向原型对象，并且该属性是继承自Object.prototype.__proto__的get和set方法,
```js
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});
```

### 方法
1. defineProperty和definePropertys
监测对象属性
```js
let number = 0
let person = {
  name:'张三',
  sex:'男',
}
Object.defineProperty(person,'age',{
  // value:18,
  // enumerable:true, //控制属性是否可以枚举，默认值是false
  // writable:true, //控制属性是否可以被修改，默认值是false
  // configurable:true //控制属性是否可以被删除，默认值是false
  //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get(){
    console.log('有人读取age属性了')
    return number
  },
  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value){
    console.log('有人修改了age属性，且值是',value)
    number = value
  }
})
// definePropertys可以同时设置多个属性的描述
Object.defineProperty(person,{age:{
  // value:18,
  // enumerable:true, //控制属性是否可以枚举，默认值是false
  // writable:true, //控制属性是否可以被修改，默认值是false
  // configurable:true //控制属性是否可以被删除，默认值是false
  //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get(){
    console.log('有人读取age属性了')
    return number
  },
  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value){
    console.log('有人修改了age属性，且值是',value)
    number = value
  }
}})
```
2. seal
密封一个对象，使对象属性不能被删除，不能新增对象属性，不能修改属性的默认配置(即getter，setter等)。但是可以修改已有属性的值，同样是浅层密封
```js
const obj = Object.seal({a:3})
// Object.isSeal方法可以判读一个对象是否是密封的
```

3. freeze
冻结某个对象，冻结之后，该对象不能修改，新增，删除属性。只能冻结该目录根目录下的属性，如果属性是一个对象，则对象内的属性不会被冻结。冻结之后不能解冻结该对象，只能根据元对象生成一个可操作的新对象。
内部调用了Object.defineProperty和Object.seal()。
```js
let obj = Object.freeze({a:32})
// Object.isFrozen方法可以判读一个对象是否是冻结的
```

4. is
判断两个值是否严格相等(即判断存储的二进制数据是否相等)，解决==和===会转换类型NaN等于NaN的缺点
```js
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
5. assign
向目标对象添加后面参数对象的属性，返回目标对象，无法拷贝get和set属性()，，是浅拷贝，只是拷贝了地址值
```js
// 只有第一个参数且为对象直接返回
const obj = {a: 1};
Object.assign(obj) === obj // true

typeof Object.assign(2) // "object"

// 第一个参数不能是null和undefined

const v1 = 'abc';
const v2 = true;
const v3 = 10;
// 会默认将参数转化为对象之后再进行合并，后面的属性会覆盖前面的属性，只能合并处理根目录的属性。
const obj = Object.assign({0：12}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// 可以处理数组，并且处理时当作一般对象，所以会将同索引的值进行覆盖。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
6. getOwnPropertyDescriptor和getOwnPropertyDescriptors
获取单个属性的描述对象或整个对象的描述对象,可以获取get和get属性，多用于结合definePropertys和create拷贝对象时能够拷贝其原型。
```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};
Object.getOwnPropertyDescriptor(obj,foo)
// { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true }
Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```
7. setPrototypeOf
设置对象的原型 
```js
// 返回的是第一个参数的地址，如果第一个参数不是对象(null和undefined会报错)会转化成对象，prototypeobj可以是任何值
const obj = Object.setPrototypeOf(target,prototypeobj)
```
8. getPrototypeOf
获取对象的原型
```js
// 返回的是第一个参数原型，如果第一个参数不是对象(null和undefined会报错)会转化成对象
const obj = Object.getPrototypeOf(target)
```
9. Object.keys，Object.values，Object.entries
分别获取对象的key、value，键值对后返回一个数组，共同特点是：都只返回自身可遍历属性且不包括Symbol属性，并且参数不是对象先转为对象，如果参数是字符串会当作类数组对象进行处理。

10. Object.fromEntries
Object.entries的逆操作，用于将键值对数组转化为对象。一般用来将map结构转化为对象。

11. Object.hasOwn(target,key),target.hasOwnProperty(key)
两者都可以判断对象本身是否具有指定的key，但是hasOwn可以判断原型为null的对象，而hasOwnProperty判断原型为null的对象会报错


## String对象
### 属性
- length 
### 方法
1. match-返回符合参数正则表达式的最大匹配项的数组，数组第一项为匹配到的字串。
2. slice-返回两个参数索引之间的字串，不包括结束字符，两个参数都支持负数。负数代表从反方向开始
3. concat-返回原字符串和传入的所有参数的拼接字符串。
4. replace-替换原字符串中符合第一个参数正则的第一个字串
5. String.formCharCode-传入unicode编码，返回对应的字符，不能返回大于0xFFFF的字符
6. chatAt-返回传入索引对应的字符
7. charCodeAt-返回传入索引对应字符的unicode码，默认返回第一个字符的编码，不能返回大于0xFFFF的字符编码
8. codePointAt-返回传入索引的unicode编码，能够返回大于0xFFFF的字符编码
9. indexOf-返回参数子串在原字符串中首次出现的位置，没找到返回-1
10. lastIndexOf-从最后开始搜索，返回结果和indexOf一样
11. search-返回首次和参数正则匹配的字串起始索引，没找到返回-1
12. split-返回和参数正则匹配之外的子串数组。
13. substring-返回两个参数索引之间的字符串，不包括结束字符，两个参数都不能为负数
14. substr()-返回以第一个参数索引开始，第二个参数对应个数的子串
15. toLowerCase-把字符串转换为小写。
16. toUpperCase-把字符串转为大写
17. trim-去除字符串两边的空白
es6新增
1. String.fromCodePoint-可以返回大于0xFFFF的字符，传入多个参数会合并对应的字符返回
2. String.raw-会将字符串中的所有\进行转义，一般用在标签函数中。
```js
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
```
3. includs、startsWith、endsWith-分别判断传入的字串是否在原字符串中、头部、尾部，返回布尔值，第二个参数都是搜索的起始索引
4. repeat(n)-将原字符串重复n次后，返回这个新字符串。
5. padStart & padEnd
在字符串头部或尾部以特定字符补全长度。
```js
// 如果不穿第二个参数默认以空格补全
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
6. trimStart、trimEnd-消除字符串头部或尾部的空格等不可见字符
7. matchAll-返回符合参数正则表达式在字符串中的所有匹配。
8. replaceAll-替换原字符串中所有符合第一个参数的字串
```js
// 第二个参数可以使用一些特殊字符表示对应的字符串内容
// $&：匹配的字符串。
// $` ：匹配结果前面的文本。
// $'：匹配结果后面的文本。
// $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
// $$：指代美元符号$
'abbc'.replaceAll('b', '$&')
// 'abbc'
// 第二个参数还可以是一个函数，函数的返回值将作为替换内容，这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;
function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}
str.replaceAll(regex, replacer)
// 123 - abc - 456
```

## Array对象
### 属性

### 方法
1. concat-连接多个数组
2. entries-返回数组的可迭代对象，索引为key，值为value
3. every-验证数组每个值是否符合某个条件，参数为函数，函数每次调用都返回true，结果才为true，否则返回false
4. fill-为数组元素填充某个值，第二三个参数为填充起始索引，默认填充所有元素
5. filter-返回符合参数函数条件的数组
6. find、findLast-正序、反序搜索返回第一个符合参数函数的值，没找到返回undefined，可以识别数组中的NaN
7. findIndex、，findLastIndex-正序、反序搜索返回第一个符合参数函数的索引，没找到返回-1，可以识别数组中的NaN
8. forEach-遍历调用参数函数
9. indexOf-返回参数在数组中的索引，没找到返回-1，不可以识别数组中的NaN(因为内部使用了===来判定，而NaN不等于NaN)
10. Array.isArray-判断是否是数组
11. join-将数组元素按照参数连接成字符串
12. lastIndexOf-反方向找参数坐在索引
13. map-返回遍历调用传入函数得到返回值数组
14. pop-删除最后一个元素并返回该元素
15. push-添加一个或多个元素并返回新长度
16. reduce-遍历执行传入的第一个参数函数，每次执行会得到上一次的返回值。参数函数的第一个参数是累计值
17. reduceRight-reduce的倒叙遍历
18. reverse-反转数组元素、
19. shift-删除并返回第一个元素
20. slice-返回参数指定索引之间的元素数组，不包括结束元素，参数都可为负值
21. splice-可删除，替换，增加原数组的元素，删除和替换时第二个参数是个数不是索引
22. some-验证数组是否有符合某个条件的元素，参数为函数，有一次函数返回true就整体返回true，全部不符合才返回false
23. sort-对数组进行排序，每次调用传入函数返回true时会交换两个元素的位置，默认按照字母升序
24. unshift-在开头添加一个元素，返回新长度。
25. flat-打平指定深度的数组，会移除空值
```js
//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
26. at-返回指定索引的元素，支持负数，很好的解决获取最后一个元素的问题。
27. flatMap-遍历调用传入的函数，传入的函数需要返回一个数组，所有返回的数组内的值组成一个新数组。
```js
let a = [5, 4, -3, 20, 17, -33, -4, 18]
a.flatMap( (n) =>  (n < 0) ?  [] : (n % 2 == 0) ? [n] :[n-1, 1])
// expected output: [4, 1, 4, 20, 16, 1, 18]
```

es6新增
1. copyWithin-将指定内容覆盖到指定位置的内容,三个参数可以为负值
```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 2, 4)
// [3, 4, 3, 4, 5]
```
2. from-将传入的数组或类数组(有length属性的对象)对象转为数组，而拓展运算符只能将具有Iterator接口的对象转为数组。第二个参数可以传入一个处理函数来对每一项进行处理并返回值
```js
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
// 在将字符串转为数组时可以得到真实的字符长度，因为from可以处理大于oxffff的字符
function countSymbols(string) {
  return Array.from(string).length;
}
```
3. includes-返回第一个参数是否在数组中的布尔值，第二个参数可以支持搜索的起始位置。
4. keys、entries、values-都返回一个遍历对象，可以使用for of进行遍历，遍历时每次拿到的值分别是对应的key，键值对、值
```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
5. of-把传入的参数依次放入数组并/返回该数组
6. toReversed、toSorted、toSpliced、with(对标splice的替换功能)-与其对应的数组方法更新后会改变元素组，而这几个方法和对应的方法效果一样，但是会返回新数组，不会改变原数组。
7. group，groupToMap-通过传入的函数对数组内的值进行分组。

## Number对象
### 属性
1. Number.EPSILON-js的最小精度，如果两个数字的差小于该精度则js会认为两个数字相等，即存入到磁盘的二进制数据是相等的，js对超过精度的二进制数据进行了丢弃。
2. Number.MAX_SAFE_INTEGER-js能表示的最大值
3. Number.MIN_SAFE_INTEGER-js能表示的最小值

### 方法
1. Number.isFinite-只有传入参数是数值且值等于Infinity才返回true，其它一切都返回false
2. Number.isInteger-判断数字是否是整数
3. Number.isNaN-只要传入的参数不是NaN都返回false
4. toExponential(x)-返回指数计数法
5. toFixed-返回保留参数位的字符串数字
6. toPrecision(x)-返回数字在磁盘中的二进制数据转换成十进制后的x位真实结果
7. Number.parseInt-只是从全局移到number上
8. Number.parseFloat-只是从全局移到number上
9. Number.isSafeInteger-判断一个数是否在MAX_SAFE_INTEGER和MIN_SAFE_INTEGER之间，在的话就是安全整数

## Math
### 属性
- E	返回算术常量 e，即自然对数的底数（约等于2.718）。
- LN2	返回 2 的自然对数（约等于0.693）。
- LN10	返回 10 的自然对数（约等于2.302）。
- LOG2E	返回以 2 为底的 e 的对数（约等于 1.4426950408889634）。
- LOG10E	返回以 10 为底的 e 的对数（约等于0.434）。
- PI	返回圆周率（约等于3.14159）。
- SQRT1_2	返回 2 的平方根的倒数（约等于 0.707）。
- SQRT2	返回 2 的平方根（约等于 1.414）。
### 方法
- abs(x)	返回 x 的绝对值。
- acos(x)	返回 x 的反余弦值。
- asin(x)	返回 x 的反正弦值。
- atan(x)	以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
- atan2(y,x)	返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
- ceil(x)	对数进行上舍入。
- cos(x)	返回数的余弦。
- exp(x)	返回 Ex 的指数。
- floor(x)	对 x 进行下舍入。
- log(x)	返回数的自然对数（底为e）。
- max(x,y,z,...,n)	返回 x,y,z,...,n 中的最高值。
- min(x,y,z,...,n)	返回 x,y,z,...,n中的最低值。
- pow(x,y)	返回 x 的 y 次幂。
- random()	返回 0 ~ 1 之间的随机数。
- round(x)	四舍五入。
- sin(x)	返回数的正弦。
- sqrt(x)	返回数的平方根。
- tan(x)	返回角的正切。
- tanh(x)	返回一个数的双曲正切函数值。
- trunc(x)	将数字的小数部分去掉，只保留整数部分。

## RegExp
### 属性
- constructor	返回一个函数，该函数是一个创建 RegExp 对象的原型。
- global	判断是否设置了 "g" 修饰符
- ignoreCase	判断是否设置了 "i" 修饰符
- lastIndex	用于规定下次匹配的起始位置
- multiline	判断是否设置了 "m" 修饰符
- source	返回正则表达式的匹配模式

### 方法
- exec	检索字符串中指定的值。返回找到的值，并确定其位置。
- test	检索字符串中指定的值。返回 true 或 false。
- toString	返回正则表达式的字符串。

## Date
### 属性

### 方法
- getDate()	从 Date 对象返回一个月中的某一天 (1 ~ 31)。
- getDay()	从 Date 对象返回一周中的某一天 (0 ~ 6)。
- getFullYear()	从 Date 对象以四位数字返回年份。
- getHours()	返回 Date 对象的小时 (0 ~ 23)。
- getMilliseconds()	返回 Date 对象的毫秒(0 ~ 999)。
- getMinutes()	返回 Date 对象的分钟 (0 ~ 59)。
- getMonth()	从 Date 对象返回月份 (0 ~ 11)。
- getSeconds()	返回 Date 对象的秒数 (0 ~ 59)。
- getTime()	返回 1970 年 1 月 1 日至今的毫秒数。
- getTimezoneOffset()	返回本地时间与格林威治标准时间 (GMT) 的分钟差。
- getUTCDate()	根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
- getUTCDay()	根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
- getUTCFullYear()	根据世界时从 Date 对象返回四位数的年份。
- getUTCHours()	根据世界时返回 Date 对象的小时 (0 ~ 23)。
- getUTCMilliseconds()	根据世界时返回 Date 对象的毫秒(0 ~ 999)。
- getUTCMinutes()	根据世界时返回 Date 对象的分钟 (0 ~ 59)。
- getUTCMonth()	根据世界时从 Date 对象返回月份 (0 ~ 11)。
- getUTCSeconds()	根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
- getYear()	已废弃。 请使用 getFullYear() 方法代替。
- parse()	返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
- setDate()	设置 Date 对象中月的某一天 (1 ~ 31)。
- setFullYear()	设置 Date 对象中的年份（四位数字）。
- setHours()	设置 Date 对象中的小时 (0 ~ 23)。
- setMilliseconds()	设置 Date 对象中的毫秒 (0 ~ 999)。
- setMinutes()	设置 Date 对象中的分钟 (0 ~ 59)。
- setMonth()	设置 Date 对象中月份 (0 ~ 11)。
- setSeconds()	设置 Date 对象中的秒钟 (0 ~ 59)。
- setTime()	setTime() 方法以毫秒设置 Date 对象。
- setUTCDate()	根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
- setUTCFullYear()	根据世界时设置 Date 对象中的年份（四位数字）。
- setUTCHours()	根据世界时设置 Date 对象中的小时 (0 ~ 23)。
- setUTCMilliseconds()	根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
- setUTCMinutes()	根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
- setUTCMonth()	根据世界时设置 Date 对象中的月份 (0 ~ 11)。
- setUTCSeconds()	setUTCSeconds() 方法用于根据世界时 (UTC) 设置指定时间的秒字段。
- setYear()	已废弃。请使用 setFullYear() 方法代替。
- toDateString()	把 Date 对象的日期部分转换为字符串。
- toGMTString()	已废弃。请使用 toUTCString() 方法代替。
- toISOString()	使用 ISO 标准返回字符串的日期格式。
- toJSON()	以 JSON 数据格式返回日期字符串。
- toLocaleDateString()	根据本地时间格式，把 Date 对象的日期部分转换为字符串。
- toLocaleTimeString()	根据本地时间格式，把 Date 对象的时间部分转换为字符串。
- toLocaleString()	根据本地时间格式，把 Date 对象转换为字符串。
- toString()	把 Date 对象转换为字符串。
- toTimeString()	把 Date 对象的时间部分转换为字符串。

## dom事件对象
1. 鼠标事件
- onclick	当用户点击某个对象时调用的事件句柄。	
- oncontextmenu	在用户点击鼠标右键打开上下文菜单时触发	
- ondblclick	当用户双击某个对象时调用的事件句柄。	
- onmousedown	鼠标按钮被按下。	
- onmouseenter	当鼠标指针移动到元素上时触发，不支持冒泡。
- onmouseleave	当鼠标指针移出元素时触发，不支持冒泡。
- onmousemove	鼠标被移动。	
- onmouseover	鼠标移到某元素之上。	
- onmouseout	鼠标从某元素移开。	
- onmouseup	鼠标按键被松开
2. 键盘事件
- onkeydown	某个键盘按键被按下。
- onkeypress	某个键盘按键被按下并松开。
- onkeyup	某个键盘按键被松开。
3. 对象事件
- onabort	图像的加载被中断。
- onbeforeunload	该事件在即将离开页面（刷新或关闭）时触发
- onerror	在加载文档或图像时发生错误。
- onhashchange	该事件在当前 URL 的锚部分发生修改时触发。	 
- onload	一张页面或一幅图像完成加载。
- onpageshow	该事件在用户访问页面时触发	
- onpagehide	该事件在用户离开当前网页跳转到另外一个页面时触发。
- onresize	窗口或框架被重新调整大小。
- onscroll	当文档被滚动时发生的事件。
- onunload	用户退出页面。
4. 表单事件
- onblur	元素失去焦点时触发
- onchange	该事件在表单元素的内容改变时触发
- onfocus	元素获取焦点时触发
- onfocusin	元素即将获取焦点时触发
- onfocusout	元素即将失去焦点时触发
- oninput	元素获取用户输入时触发
- onreset	表单重置时触发
- onsearch	用户向搜索域输入文本时触发
- onselect	用户选取文本时触发
- onsubmit	表单提交时触发
5. 拖拽事件
- ondrag	该事件在元素正在拖动时触发	 
- ondragend	该事件在用户完成元素的拖动时触发	 
- ondragenter	该事件在拖动的元素进入放置目标时触发	 
- ondragleave	该事件在拖动元素离开放置目标时触发	 
- ondragover	该事件在拖动元素在放置目标上时触发	 
- ondragstart	该事件在用户开始拖动元素时触发	 
- ondrop	该事件在拖动元素放置在目标区域时触发

6. 其它事件 
- onmessage	该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发	 
- onmousewheel	已废弃。 使用 onwheel 事件替代	 
- ononline	该事件在浏览器开始在线工作时触发。	 
- onoffline	该事件在浏览器开始离线工作时触发。	 
- onpopstate	该事件在窗口的浏览历史（history 对象）发生改变时触发。	 
- onshow	该事件当 menu 元素在上下文菜单显示时触发	 
- onstorage	该事件在 Web Storage(HTML 5 Web 存储)更新时触发	 
- ontoggle	该事件在用户打开或关闭 details 元素时触发	 
- onwheel	该事件在鼠标滚轮在元素上下滚动时触发。
- visibilitychange	该事件用于检测当前页面的可见性状态是否发生变化。`

## document
文档对象
### 属性
- document.activeElement	返回当前获取焦点元素
- document.applets	html5已弃用。
- document.cookie	设置或返回与当前文档有关的所有 cookie。
- document.createDocumentFragment()	创建空的 DocumentFragment 对象，并返回此对象。
- document.doctype	返回与文档相关的文档类型声明 (DTD)。
- document.implementation	返回处理该文档的 DOMImplementation 对象。
- document.lastModified	返回文档被最后修改的日期和时间。
- document.referrer	返回载入当前文档的文档的 URL。
- document.strictErrorChecking	设置或返回是否强制进行错误检查。
- document.URL	返回文档完整的URL
- document.anchors	返回对文档中所有 Anchor 对象的引用。
- document.baseURI	返回文档的绝对基础 URI
- document.body	返回文档的body元素
- document.documentElement	返回文档的根节点
- document.documentMode	返回用于通过浏览器渲染文档的模式
- document.documentURI	设置或返回文档的位置
- document.domain	返回当前文档的域名。
- document.domConfig	已废弃。返回 normalizeDocument() 被调用时所使用的配置。
- document.embeds	返回文档中所有嵌入的内容（embed）集合
- document.forms	返回对文档中所有 Form 对象引用。
- document.images	返回对文档中所有 Image 对象引用。
- document.inputEncoding	返回用于文档的编码方式（在解析时）。- document.links	返回对文档中所有 Area 和 Link 对象引用。
- document.readyState	返回文档状态 (载入中……)
- document.scripts	返回页面中所有脚本的集合。
- document.title	返回当前文档的标题。
### 方法
- document.addEventListener()	向文档添加句柄
- document.adoptNode(node)	从另外一个文档返回 adapded 节点到当前文档。
- document.close()	关闭用 document.open() 方法打开的输出流，并显示选定的数据。
- document.createAttribute()	创建一个属性节点
- document.createComment()	createComment() 方法可创建注释节点。
- document.createElement()	创建元素节点。
- document.createTextNode()	创建文本节点。
- document.execCommand() 用于对电脑剪切板的写入和读取，现已不推荐使用。
- document.getElementsByClassName()	返回文档中所有指定类名的元素集合，作为 NodeList 对象。
- document.getElementById()	返回对拥有指定 id 的第一个对象的引用。
- document.getElementsByName()	返回带有指定名称的对象集合。
- document.getElementsByTagName()	返回带有指定标签名的对象集合。
- document.importNode()	把一个节点从另一个文档复制到该文档以便应用。
- document.normalize()	删除空文本节点，并连接相邻节点
- document.normalizeDocument()	删除空文本节点，并连接相邻节点的
- document.open()	打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。
- document.querySelector()	返回文档中匹配指定的CSS选择器的第一元素
- document.querySelectorAll()	document.querySelectorAll() 是 HTML5中引入的新方法，返回文档中匹配的CSS选择器的所有元素节点列表
- document.removeEventListener()	移除文档中的事件句柄(由 addEventListener() 方法添加)
- document.renameNode()	重命名元素或者属性节点。
- document.write()	- 向文档写 HTML 表达式 或 JavaScript 代码。
- document.writeln()

## window对象
### 属性
- closed	返回窗口是否已被关闭。
- defaultStatus	设置或返回窗口状态栏中的默认文本。
- document	对 Document 对象的只读引用。(请参阅对象)
- frames	返回窗口中所有命名的框架。该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架。
- history	对 History 对象的只读引用。请参数 History 对象。
- innerHeight	返回窗口的文档显示区的高度。
- innerWidth	返回窗口的文档显示区的宽度。
- localStorage	在浏览器中存储 key/value 对。没有过期时间。
- length	设置或返回窗口中的框架数量。
- location	用于窗口或框架的 Location 对象。请参阅 Location 对象。
- name	设置或返回窗口的名称。
- navigator	对 Navigator 对象的只读引用。请参数 Navigator 对象。
- opener	返回对创建此窗口的窗口的引用。
- outerHeight	返回窗口的外部高度，包含工具条与滚动条。
- outerWidth	返回窗口的外部宽度，包含工具条与滚动条。
- pageXOffset	设置或返回当前页面相对于窗口显示区左上角的 X 位置。
- pageYOffset	设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
- parent	返回父窗口。
- screen	对 Screen 对象的只读引用。请参数 Screen 对象。
- screenLeft	返回相对于屏幕窗口的x坐标
- screenTop	返回相对于屏幕窗口的y坐标
- screenX	返回相对于屏幕窗口的x坐标
- sessionStorage	在浏览器中存储 key/value 对。 在关闭窗口或标签页之后将会删除这些数据。
- screenY	返回相对于屏幕窗口的y坐标
- self	返回对当前窗口的引用。等价于 Window 属性。
- status	设置窗口状态栏的文本。
- top	返回最顶层的父窗口。
### 方法
- alert()	显示带有一段消息和一个确认按钮的警告框。
- atob()	解码一个 base-64 编码的字符串。
- btoa()	创建一个 base-64 编码的字符串。
- blur()	把键盘焦点从顶层窗口移开。
- clearInterval()	取消由 setInterval() 设置的 timeout。
- clearTimeout()	取消由 setTimeout() 方法设置的 timeout。
- close()	关闭浏览器窗口。
- confirm()	显示带有一段消息以及确认按钮和取消按钮的对话框。
- createPopup()	创建一个 pop-up 窗口。
- focus()	把键盘焦点给予一个窗口。
- getSelection()	返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。
- getComputedStyle()	获取指定元素的 CSS 样式。
- matchMedia()	该方法用来检查 media query 语句，它返回一个 MediaQueryList对象。
- moveBy()	可相对窗口的当前坐标把它移动指定的像素。
- moveTo()	把窗口的左上角移动到一个指定的坐标。
- open()	打开一个新的浏览器窗口或查找一个已命名的窗口。
- print()	打印当前窗口的内容。
- prompt()	显示可提示用户输入的对话框。
- resizeBy()	按照指定的像素调整窗口的大小。
- resizeTo()	把窗口的大小调整到指定的宽度和高度。
- scroll()	已废弃。 该方法已经使用了 scrollTo() 方法来替代。
- scrollBy()	按照指定的像素值来滚动内容。
- scrollTo()	把内容滚动到指定的坐标。
- setInterval()	按照指定的周期（以毫秒计）来调用函数或计算表达式。
- setTimeout()	在指定的毫秒数后调用函数或计算表达式。
- stop()	停止页面载入。
- postMessage()	安全地实现跨源通信。

## Navigator
- appCodeName	返回浏览器的代码名
- appName	返回浏览器的名称
- appVersion	返回浏览器的平台和版本信息
- cookieEnabled	返回指明浏览器中是否启用 cookie 的布尔值
- platform	返回运行浏览器的操作系统平台
- userAgent	返回由客户机发送服务器的user-agent 头部的值
- geolocation	返回浏览器的地理位置信息
- language	返回浏览器使用的语言
- onLine	返回浏览器是否在线，在线返回-  ture，否则返回 false
- product	返回浏览器使用的引擎（产品）
- javaEnabled()	指定是否在浏览器中启用Java
- taintEnabled()	规定浏览器是否启用数据污点(data tainting)

## 鼠标位置属性
- clientX    以浏览器左上顶角为原点，定位鼠标 x 轴坐标
- clientY    以浏览器左上顶角为原点，定位鼠标ｙ轴坐标
- offsetX    以当前事件的目标对象左上角为原点，定位鼠标x轴坐标
- offsetY    以当前事件的目标对象左上角为原点，定位鼠标y轴坐标
- pageX    以Document 对象（即文本窗口）左上角为原点，定位鼠标x轴坐标
- pageY    以Document 对象（即文本窗口）左上角为原点，定位鼠标ｙ轴坐标
- screenX    计算机屏幕左上角为原点，定位鼠标x轴坐标
- screenY    计算机屏幕左上角为原点，定位鼠标ｙ轴坐标
- layerX    最近的绝对定位的父元素（如果没有，则为Document对象）左上角为原点，定位鼠标x轴坐标
- layerY    最近的绝对定位的父元素（如果没有，则为Document对象）左上角为原点，定位鼠标ｙ轴坐标

## 元素位置属性
- offsetHeight：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、水平滚动条的高度、上边框高度和下边框的高度。
- offsetWidth：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、垂直滚动条的宽度、左边框宽度和右边框宽度。
- offsetLeft：元素的左外边框至包含元素的左内边框之间的像素距离。
- offsetTop：元素的上外边框至包含元素的上内边框之间的像素距离。