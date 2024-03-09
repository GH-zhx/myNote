# Class
类有两种定义方式，分别是类声明和类表达式。类其实就是构造函数的一个语法糖。
```js
// 类声明
class Person {}
// 类表达式
const Animal = class {}; 
```
类声明是不能进行变量提升的
```js
console.log(ClassExpression); // undefined
var ClassExpression = class {};
console.log(ClassExpression); // class {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // class ClassDeclaration {} 
```
函数受函数作用域限制，但是类受块作用域限制。
```js
{
 function FunctionDeclaration() {}
 class ClassDeclaration {}
}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```
## 类的构成
类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。
空的类定义照样有效。默认情况下，类定义中的代码都在严格模式下执行。
```js
// 空类定义，有效
Class Foo {}
// 有构造函数的类，有效
Class Bar {
 constructor() {}
}
// 有获取函数的类，有效
Class Baz {
 get myBaz() {}
}
// 有静态方法的类，有效
Class Qux {
 static myQux() {}
} 
```
类表达式的名称可以通过赋值的变量的name属性获取，但是不能通过类名称在外部获取。
```js
let Person = class PersonName {
 identify() {
 console.log(Person.name, PersonName.name);
 }
}
let p = new Person();
p.identify(); // PersonName PersonName
console.log(Person.name); // PersonName
console.log(PersonName); // ReferenceError: PersonName is not defined
```
## 类实例化
实例化过程如下:
(1) 在内存中创建一个新对象。
(2) 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。
(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
(4) 执行构造函数内部的代码（给新对象添加属性）。
(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
类实例化传入的参数会用作构造函数的参数。
```js
class Person {
 constructor(name) {
 console.log(arguments.length);
 this.name = name || null;
 }
}
let p1 = new Person; // 0
console.log(p1.name); // null
let p2 = new Person(); // 0
console.log(p2.name); // null
let p3 = new Person('Jake'); // 1
console.log(p3.name); // Jake
```
类的构造函数会默认返回this对象，但是，如果直接return一个普通对象，那么返回的对象不属于该类。
```js
class Person {
 constructor(override) {
 this.foo = 'foo';
 if (override) {
 return {
 bar: 'bar'
 };
 }
 }
}
let p1 = new Person(),
 p2 = new Person(true);
console.log(p1); // Person{ foo: 'foo' }
console.log(p1 instanceof Person); // true
console.log(p2); // { bar: 'bar' }
console.log(p2 instanceof Person); // false
```
普通的构造函数实例化可以直接执行不使用new，不用new默认使用window作为this。但是类实例化必须使用new，并且可以通过实例对象的constructor函数构建新的实例，但是也必须使用new。
```js
class Person {}
// 使用类创建一个新实例
let p1 = new Person();
p1.constructor();
// TypeError: Class constructor Person cannot be invoked without 'new'
// 使用对类构造函数的引用创建一个新实例
let p2 = new p1.constructor(); 
```
## 类是特殊函数
通过typeof操作符检测到类是函数，类本身在使用new时会被当成构造函数，但是类的constructor不会被当成构造函数，所以执行使用类的constructor方法作为普通的构造函数使用与类没有关系。
```js
class Person {}
let p1 = new Person();
console.log(p1.constructor === Person); // true
console.log(p1 instanceof Person); // true
console.log(p1 instanceof Person.constructor); // false
let p2 = new Person.constructor();
console.log(p2.constructor === Person); // false
console.log(p2 instanceof Person); // false
console.log(p2 instanceof Person.constructor); // true 
```
由于类其实是函数，具备函数的特点，可以被当作参数，也可以在任何地方被定义，同时拥有立即调用的能力。
```js
// 类可以像函数一样在任何地方定义，比如在数组中
let classList = [
 class {
 constructor(id) {
 this.id_ = id;
 console.log(`instance ${this.id_}`);
 }
 }
];
function createInstance(classDefinition, id) {
 return new classDefinition(id);
}
let foo = createInstance(classList[0], 3141); // instance 3141 

// 因为是一个类表达式，所以类名是可选的
let p = new class Foo { 
 constructor(x) {
 console.log(x);
 }
}('bar'); // bar
console.log(p); // Foo {} 
```
类的每一个实例都是唯一的，并且可以后面追加和修改属性。用new string()返回的的是一个字符对象。
```js
class Person {
 constructor() {
 // 这个例子先使用对象包装类型定义一个字符串
 // 为的是在下面测试两个对象的相等性
 this.name = new String('Jack');
 this.sayName = () => console.log(this.name);
 this.nicknames = ['Jake', 'J-Dog']
 }
}
let p1 = new Person(),
 p2 = new Person();
p1.sayName(); // Jack
p2.sayName(); // Jack
console.log(p1.name === p2.name); // false
console.log(p1.sayName === p2.sayName); // false
console.log(p1.nicknames === p2.nicknames); // false
p1.name = p1.nicknames[0];
p2.name = p2.nicknames[1];
p1.sayName(); // Jake
p2.sayName(); // J-Dog
```
## 原型方法和访问器
类中定义的所有方法，都将作为原型方法，因此可以在所有实例间共享。不能在类中定义原始值或对象。
```js
// 可以把方法定义在类构造函数中或者类块中，但不能在类块中给原型添加原始值或对象作为成员数据：
class Person {
 name: 'Jake'
}
// Uncaught SyntaxError: Unexpected token
// 类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键：
const symbolKey = Symbol('symbolKey');
class Person {
 stringKey() {
 console.log('invoked stringKey');
 }
 [symbolKey]() {
 console.log('invoked symbolKey');
 }
 ['computed' + 'Key']() {
 console.log('invoked computedKey');
 }
}
let p = new Person();
p.stringKey(); // invoked stringKey
p[symbolKey](); // invoked symbolKey
p.computedKey(); // invoked computedKey
// 类定义也支持获取和设置访问器(相当于getter和setter，监听属性的变化)。语法与行为跟普通对象一样：
class Person {
  // 这些访问器定义在了原型上
 set name(newName) {
 this.name_ = newName;
 }
 get name() {
 return this.name_;
 }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name); // Jake
```
## 静态类方法和属性
每个类只能有一个静态类方法(可有定义多个，暂时未找到解释-20231211)，并且存在于类本身，只有类自己能够调用，用于执行不特定于实例的操作，静态方法中的this代表类本身。
```js
class Person {
 constructor() {
 // 添加到 this 的所有内容都会存在于不同的实例上
 this.locate = () => console.log('instance', this);
 }
 // 定义在类的原型对象上
 locate() {
 console.log('prototype', this);
 }
 // 定义在类本身上
 static locate() {
 console.log('class', this);
 }
}
let p = new Person();
p.locate(); // instance, Person {}
Person.prototype.locate(); // prototype, {constructor: ... }
Person.locate(); // class, class Person {}
// 静态类方法非常适合作为实例工厂：
class Person {
 constructor(age) {
 this.age_ = age;
 }
 sayAge() {
 console.log(this.age_);
 }
 static create() {
 // 使用随机年龄创建并返回一个 Person 实例
 return new Person(Math.floor(Math.random()*100));
 }
}
console.log(Person.create()); // Person { age_: ... } 
```
## 非函数原型和类成员
虽然类定义并不显式支持在原型或类上添加成员数据，但在类定义外部，可以手动添加
```js
class Person {
 sayName() {
 console.log(`${Person.greeting} ${this.name}`);
 }
}
// 在类上定义数据成员
Person.greeting = 'My name is'; 
// 在原型上定义数据成员
Person.prototype.name = 'Jake';
let p = new Person();
p.sayName(); // My name is Jake 
// 目前没有规定类静态属性的定义形式，不过我们可以通过直接添加的方式设置静态属性
Person.foo = 'bar'
```
## 迭代器和生成器方法
```js
// 类定义语法支持在原型和类本身上定义生成器方法：
class Person {
 // 在原型上定义生成器方法
 *createNicknameIterator() {
 yield 'Jack';
 yield 'Jake';
 yield 'J-Dog';
 }
 // 在类上定义生成器方法
 static *createJobIterator() {
 yield 'Butcher';
 yield 'Baker';
 yield 'Candlestick maker';
 }
}
let jobIter = Person.createJobIterator();
console.log(jobIter.next().value); // Butcher
console.log(jobIter.next().value); // Baker
console.log(jobIter.next().value); // Candlestick maker
let p = new Person();
let nicknameIter = p.createNicknameIterator();
console.log(nicknameIter.next().value); // Jack
console.log(nicknameIter.next().value); // Jake
console.log(nicknameIter.next().value); // J-Dog
// 因为支持生成器方法，所以可以通过添加一个默认的迭代器，把类实例变成可迭代对象：
class Person {
 constructor() {
 this.nicknames = ['Jack', 'Jake', 'J-Dog'];
 }
 *[Symbol.iterator]() {
 yield *this.nicknames.entries();
 }
}
let p = new Person();
for (let [idx, nickname] of p) {
 console.log(nickname);
} 
// Jack
// Jake
// J-Dog
// 也可以只返回迭代器实例：
class Person {
 constructor() {
 this.nicknames = ['Jack', 'Jake', 'J-Dog'];
 }
 [Symbol.iterator]() {
 return this.nicknames.entries();
 }
}
let p = new Person();
for (let [idx, nickname] of p) {
 console.log(nickname);
}
// Jack
// Jake
// J-Dog 
```
## 类的继承。
- 使用extends关键字可以继承类或构造函数。能继承原生构造函数的原因是es5是先建立子构造函数的实例属性，然后才将父类的相关属性加载子类实例上，而父构造函数有些属性是不能在子构造函数中访问的，所以不能很好的继承。而es6是先执行父类的构造函数并继承父类的各种信息，然后才在实例上添加子类的属性，由此可以很好的对原生构造函数进行继承。
- 可以继承静态方法和静态属性，是通过将子类的隐式原型从Function的原型改成了父类达到的，子类访问这些静态方法是和静态属性时是通过原型链访问的。但是如果静态属性是原始值，那么会在子类上直接增加一个同名的属性。所以使用Object.getPrototypeOf()获取子类的隐式原型得到的是父类本身。
- 不能继承私有属性和私有方法。
- 子类继承父类后原型链是子类的原型是父类的实例
```js
class Vehicle {}
// 继承类
class Bus extends Vehicle {}
let b = new Bus();
console.log(b instanceof Bus); // true
console.log(b instanceof Vehicle); // true
function Person() {}
// 继承普通构造函数
class Engineer extends Person {}
let e = new Engineer();
console.log(e instanceof Engineer); // true
console.log(e instanceof Person); // true
// 派生类都会通过原型链访问到类和原型上定义的方法。this 的值会反映调用相应方法的实例或者类：
class Vehicle {
 identifyPrototype(id) {
 console.log(id, this);
 } 
static identifyClass(id) {
 console.log(id, this);
 }
}
class Bus extends Vehicle {}
let v = new Vehicle();
let b = new Bus();
b.identifyPrototype('bus'); // bus, Bus {}
v.identifyPrototype('vehicle'); // vehicle, Vehicle {}
Bus.identifyClass('bus'); // bus, class Bus {}
Vehicle.identifyClass('vehicle'); // vehicle, class Vehicle {} 
// extends 关键字也可以在类表达式中使用，因此 let Bar = class extends Foo {}
// 是有效的语法。
```
通过继承的派生类可以用super访问父类的构造函数、静态方法及原型对象。
- 当super作为函数使用时，代表父类的构造函数，且只能在子类的构造函数中调用
- 当super作为对象使用时，在构造函数中指向子类实例，在静态方法中指向父类且调用父类静态方法时this指向子类，在普通函数中指向父类原型。
- 通过super调用父类原型上的方法时，方法中的this为子类实例对象。
```js
class Vehicle {
 constructor() {
 this.hasEngine = true;
 }
}
class Bus extends Vehicle {
 constructor() {
 // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError
 super(); // 相当于 super.constructor()，思想是盗用构造函数的思想。
 console.log(this instanceof Vehicle); // true
 console.log(this); // Bus { hasEngine: true }
 }
} 
new Bus(); 
// 在静态方法中可以通过 super 调用继承的类上定义的静态方法：
class Vehicle {
 static identify() {
 console.log('vehicle');
 }
}
class Bus extends Vehicle {
 static identify() {
 super.identify();
 }
}
Bus.identify(); // vehicle
```
不能单独调用super，要么用来调用构造函数，要么用来调用静态方法。
```js
class Vehicle {}
class Bus extends Vehicle {
 constructor() {
 console.log(super);
 // SyntaxError: 'super' keyword unexpected here
 }
} 
```
调用 super()会调用父类构造函数，并将返回的实例赋值给 this。
```js
class Vehicle {}
class Bus extends Vehicle {
 constructor() {
 super();
 console.log(this instanceof Vehicle);
 }
}
new Bus(); // true
```
super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
```js
class Vehicle {
 constructor(licensePlate) {
 this.licensePlate = licensePlate;
 }
}
class Bus extends Vehicle {
 constructor(licensePlate) {
 super(licensePlate);
 }
}
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' } 
```
如果没有定义类构造函数，在实例化派生类时会调用 super()，而且会传入所有传给派生类的
参数。
```js
class Vehicle {
 constructor(licensePlate) {
 this.licensePlate = licensePlate;
 }
}
class Bus extends Vehicle {}
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' } 
```
如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回
一个对象。
```js
class Vehicle {}
class Car extends Vehicle {}
class Bus extends Vehicle {
 constructor() {
 super();
 }
}
class Van extends Vehicle {
 constructor() {
 return {};
 }
}
console.log(new Car()); // Car {}
console.log(new Bus()); // Bus {}
console.log(new Van()); // {} 
```
## 抽象基类
通过new.target只用于继承，不支持实例化，并可以对派生类做出约束。
```js
// 抽象基类
class Vehicle {
 constructor() {
 if (new.target === Vehicle) {
 throw new Error('Vehicle cannot be directly instantiated');
 }
 if (!this.foo) {
 throw new Error('Inheriting class must define foo()');
 }
 console.log('success!');
 }
} 
// 派生类
class Bus extends Vehicle {
 foo() {}
}
// 派生类
class Van extends Vehicle {}
new Vehicle(); //Error: Vehicle cannot be directly instantiated
new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```
## 继承内置类型
我们可以对j一些内置类进行继承，譬如Array
```js
class SuperArray extends Array {
 shuffle() {
 // 洗牌算法
 for (let i = this.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [this[i], this[j]] = [this[j], this[i]];
 }
 }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array); // true
console.log(a instanceof SuperArray); // true 
console.log(a); // [1, 2, 3, 4, 5]
a.shuffle();
console.log(a); // [3, 1, 4, 5, 2] 
// 有些内置类型的方法会返回一个实例，该实例与原始实例相同。
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a.filter(x => !!(x%2)) 
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // true
```
可以通过Symbol.species访问器重写返回原实例的行为
```js
class SuperArray extends Array {
 static get [Symbol.species]() {
 return Array;
 }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x%2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // false
```
## 新写法(ES2022)
```js
// 实例属性可以直接写在顶层
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```
## 私有属性、方法，访问器(ES2022)
实例的私有属性、方法，访问器只能在类的内部访问，在外部访问会报错
```js
class IncreasingCounter {
  // 定义私有属性
  #count = 0;
  // 可以将私有属性设置为静态的即为类本身设置私有属性
  static #_count = 0
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  // 定义私有犯法
  #unincrement(){

  }
  // 定义私有访问器
  get #count(){
    return this.#count
  }
  increment() {
    this.#unincrement()
    this.#count++;
  }
}
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
// 可以通过
```
### in操作符在私有属性的修改
由于私有属性不能访问，所以ES2022对in进行了修改，让其可以在类内部使用this判断私有属性。
```js
class C {
  #brand;
  static isC(obj) {
    if (#brand in obj) {
      // 私有属性 #brand 存在
      return true;
    } else {
      // 私有属性 #foo 不存在
      return false;
    }
  }
}
// 当使用Object.create()、Object.setPrototypeOf形成的原型链不能得到正确的结果
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}
const a = new A();
const o1 = Object.create(a);
A.test(o1) // false
A.test(o1.__proto__) // true

const o2 = {};
Object.setPrototypeOf(o2, a);
A.test(o2) // false
A.test(o2.__proto__) // true
```
## 静态块
类的某些静态属性需要进行初始化，但是初始化代码放在哪儿是一个问题，由此ES2022提供了一个静态块来实现这个功能，该静态块只在类生成时运行一次。
```js
class C {
  static x = ...;
  static y;
  static z;
  static {
    try {
      const obj = doSomethingWith(this.x);
      // this指代当前类
      this.y = obj.y;
      this.z = obj.z;
    }
    catch {
      this.y = ...;
      this.z = ...;
    }
  }
}
```
## this指向
当类定义的方法单独使用时，this指向运行时的环境
```js
class Logger {

  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
// 类默认采用严格模式，运行环境的this为undefined
printName(); // TypeError: Cannot read property 'print' of undefined
// 解决方案1：绑定this
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
}
// 解决办法2：使用箭头函数
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}
```
## Mixin模式
可以将多个类合并成一个类
```js
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
