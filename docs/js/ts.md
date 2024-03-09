# TypeScript
## 原始数据类型
### 空值
```ts
function alertName(): void {
    alert('My name is Tom');
}
// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null（只在 --strictNullChecks 未指定时）
let unusable: void = undefined;
```
### Null和undefined
与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
```ts
// 这样不会报错，但在ts的严格模式下会报错，
let u : undefined;
let num: number = u;
```
而 void 类型的变量不能赋值给 number 类型的变量
```ts
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```
## 任意值
(any)类型的值可以被改变类型，返回的也是任意值，适用于参数不确定类型时使用。未申明的变量未任意值。
## 类型推论
当一个变量定义时初始化了值，那么ts会根据这个值判断该变量的值，如果后续变量的类型发生改变会报错。
```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
## 联合类型
当一个变量会有多个类型时，可以使用联合类型定义。
```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 赋值联合类型以外的类型会报错。
myFavoriteNumber = true;
// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```
## 对象的类型-接口
可以对对象进行限制，规定对象的属性及属性类型。
```ts
interface Person {
    name: string;
    age?: number;// 表示可选
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```
任意类型
```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}
let tom: Person = {
    name: 'Tom',
    gender: 'male',
};
// 使用任意类型后，所有属性必须是任意类型的子集
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
// 一个接口只能由一个任意类型。
```
如果希望属性只能在对象初始化时赋值，可以设置属性只读。
```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
tom.id = 9527;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
## 数组的类型
数组有多种类型定义方式
```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
类数组，实际不是数组，是一个对象
```ts
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```
## 函数的类型
函数声明时的类型定义
```ts
function sum(x: number, y: number): number {
    return x + y;
}
```
函数表达式
```ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
用接口定义函数的类型
```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```
参数默认值和可选参数。
```ts
// 默认值参数会将参数当成可选参数，不受可选参数必须在必需参数的后面限制。
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```
es6利用剩余参数来代替arguments
```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```
函数重载
```ts
// 可以对函数进行多次定义。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
## 类型断言
as可以欺骗编辑器，将某个变量断言成想要的类型，解决报错问题。
```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```
如果A被B包含，则A和B之间可以相互断言，并且可以将B类型的值赋给A类型的值。
```ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}
// 或写成继承
interface Cat extends Animal {
    run(): void;
}

function testAnimal(animal: Animal) {
    return (animal as Cat);
}
function testCat(cat: Cat) {
    return (cat as Animal);
}

let tom: Cat = {
    name: 'Tom',
    run: () => { console.log('run') }
};
let animal: Animal = tom;
```
双重断言，任意类型可以被断言成any，any也可以被断言成任意类型。
```ts
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}
function testCat(cat: Cat) {
    return (cat as any as Fish);
}
```
## 声明文件
声明文件用于定义全局类型，声明三方库或未被ts定义的类型，声明文件必须以.d.ts为后缀。
```ts
declare var jQuery: (selector: string) => any; //将jQuery声明，获得代码提示，防止编辑器报错。
jQuery('#foo');
// 相应的还有 declare let 和declare const
```
声明文件在不同的情况下的编写方式不一样，以下是不同情况下的声明文件写法。
### 全局变量
通过script标签引入第三方库，注入全局变量该模式下一般将声明文件放在src目录下，需要配置对应的tsconfig.json的files、include 和 exclude配置项，保证这些配置项包含了增加的声明文件路径。全局声明文件语法主要包含：

declare var/ declare let /declare const
```ts
declare var jQuery: (selector: string) => any;
declare let jQuery: (selector: string) => any; 
declare const jQuery: (selector: string) => any; // 不可修改。
```
declare function
```ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any; // 支持函数重载
```
declare class
```ts
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```
declare enum
```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```
declare namespace
```ts
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
    namespace fn {
        function extend(object: any): void;
    }
}
// 若第一层命名空间只有一个属性可以简写
declare namespace jQuery.fn {
    function extend(object: any): void;
}
```
interface(仅限描述对象类型) 和 type(可以描述多种所有类型)
```ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
```
全局类型需要防止命名冲突，建议放在一个命名空间下。

### npm包
安装时在node_modules包里没有相应的声明文件，可以尝试执行npm install @types/foo --save-dev命令看是否新增声明文件。如果没有则需要手动添加。手动添加在node_modules里面，不需要配置，但是不会被git记录，还可以通过创建types目录文件，然后修改tsconfig.json的配置，修改的tsconfig.json如下：
```ts
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```
npm包的声明文文件同样只能声明类型不能声明具体实现，且使用declare定义的类型是局部变量，只有利用export暴露并被引用时才被使用。
```ts
export const name: string;
export function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}
export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}
// 我们也可以使用declare定义多个变量后一起导出。
declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };
```
function、class、interface支持默认导出，其他类型的默认导出需要先定义变量  
```ts
export default function foo(): string;
export default  class Animal {
  constructor(name: string);
  sayHi(): string;
}
export default interface Options {
    data: any;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
export default Directions;
```
export= 语法在CommonJs规范中会被用到。
在CommonJs中导出模块
```ts
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```
而ts对于CommonJs的导出模块有三种导入方式
```ts
// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;

// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';

// 整体导入
import foo = require('foo');
// 单个导入
import bar = require('foo').bar;
```
而为CommonJs规范的库写声明文件，需要用的export=，使用export=之后就不能使用export导出单个类型了，现在已经不推荐使用export=了，使用export default 或export都可以。
```ts
export = foo;
declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```

### UMD 库
既可以通过 script标签引入，又可以通过 import 导入的库。
如果需要UMD库声明好的变量改为全局变量需要用到export as namespace语法
```ts
export as namespace foo;
export default foo;
declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```
有时三方库拓展了一个全局变量，有三种方式声明该类型。
```ts
// 在定义全局变量的声明文件里直接声明
interface String {
    prependHello(): string;
}
// 在node_modules的库声明文件里利用声明合并。
declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}
// 在为三方库写的声明文件里进行声明，此方法为一个单独文的声明文件。
declare global {
    interface String {
        prependHello(): string;
    }
}
export {}; 
```
### 模块插件
当引用一个插件库对另一个已有的库有修改时，插件库修改的部分没有类型声明，我们需要为这部分修改增加类型申明。
```ts
import * as moment from 'moment';
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
// 一个文件中可以声明多个模块的类型拓展。
declare module 'bar' {
    export function bar(): string;
}
```
### 三斜线指令
在全局变量声明文件中，如果出现了export和import，那么该声明文件就不再是全局变量的声明文件了，所以在全局变量声明文件中我们需要用到三斜线指令导入依赖。
```ts
// 三斜线指令前只能出现注释(必须出现在文件最顶端)。
/// <reference types="jquery" />
declare function foo(options: JQuery.AjaxSettings): string;
// 当依赖一个库时，用types，如果依赖一个全局变量文件，用path
/// <reference path="JQuery.d.ts" />
```
### 自动生成声明文件。
如果库本身就是ts写的，那么在编译成js的时候只需要配置一下tsconfig.json文件就可以自动编译出声明文件了，下面是一些配置项。
```ts
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib", // 表示ts编译为js后的目录
        "declaration": true, // 表示将ts编译后自动编译出声明文件。
        "declarationDir ":"lib", // 设置生成.d.ts的目录。
        "declarationMap":"true", // 对每个.d.ts文件都生成.d.ts.map文件
        "emitDeclarationOnly":"true", // 仅生成.d.ts文件，不生成.js文件。
    }
}
```
## 内置对象
ts对ECMscript、DOM、BOM的内置对象进行了类型定义。我们可以直接使用。
```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```
## 类型别名
利用type关键字可以为类型定义一个别名，一般用于联合类型。
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
## 基础数据类型字面量类型
可以利用type定义具体的基础类型值为一个类型。
```ts
type str = '123' | 123
let x :str = 123
```
## 元组
```ts
let tom: [string, number]; // 设置一个变量数组为固定的类型
tom = ['tom',23]
tom[0] = 'jonin'
// 当赋值越界的元素，会被赋予联合类型
tom.push('male');
tom.push(23);
tom.push(true); // Argument of type 'true' is not assignable to parameter of type 'string | number'.
```
## 枚举
枚举成员会被从0到1进行赋值，每次递增1
```ts
const enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"]); // 0
console.log(Days["Mon"]); // 1
console.log(Days["Tue"]); // 2
console.log(Days["Sat"]); // 3
```
我们可以为枚举成员手动赋值，如果赋值的类型不是数字，那么该枚举成员必须在未赋值或赋值未数字的枚举成员后面。
```ts
const enum Directions {
  Up,
  Down =36,
  Right,
  Left = "fdg",
}
console.log(Directions .Up); // 0
console.log(Directions .Down); // 36
console.log(Directions .Right); // 37
console.log(Directions .Left); // "fdg"
```
枚举成员有两种类型，常数项和计算所得项，常数项枚举即通过const关键字定义的枚举。
```ts
enum Color {Red, Green, Blue = "blue".length}; 
// 这为计算所得项，不用const定义,计算所得项必须在常数项后面，因为如果出现在前面，会导致后面的成员无法获得初始值。
```
利用const关键字定义的枚举是常数枚举，常数枚举不能出现计算所得项成员，一般在代码实现得ts文件中，外部枚举是通过declare定义的，一般用在声明文件中。declare和const可以同时使用。
```ts
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
## 类
在es7的提案里，对类有两项改进
```ts
// 允许在类里面定义属性，并支持定义一个静态属性。
class Animal {
  name = 'Jack';
  static age = 12; 
  constructor() {
    // ...
  }
}
let a = new Animal();
console.log(a.name); // Jack
```
public private 和 protected
```ts
 // public关键字对应的方法和属性可以被子类访问和继承。
 class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}
let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
// private关键字对应的方法和属性不能被子类继承和访问
// protected关键字对应的属性只能在子类的内部被使用。
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```
 当构造函数被设为private时，该类不允许被实例化和继承，当构造函数被修饰为protected时，该类只允许被继承。
```ts
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
```
readonly修饰的属性只能出现在属性声明或构造函数中，readonly与其它修饰语一起使用时，需要写在最后。
```ts
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```
abstract用于修饰抽象类和抽象方法。
```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi(); // 抽象方法必须被子类实现。
}
let ani = new Animal('') // Cannot create an instance of the abstract class 'Animal'.
class Cat extends Animal {
public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}
let cat = new Cat('Tom');
```
类的类型
```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}
let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```
## 类与接口
类实现接口
```ts
interface Alarm {
    alert(): void;
}
interface Light {
    lightOn(): void;
    lightOff(): void;
}
class Car implements Alarm, Light { // 可以实现多个接口
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```
接口继承类
```ts
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
interface PointInstanceType {
    x: number;
    y: number;
}
// 等价于 interface Point3d extends PointInstanceType
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```
## 泛型
当一个函数、类、接口的参数类型不确定时，可以用泛型进行定义，在使用的时候才给定具体类型。
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x'); // ['x', 'x', 'x']
```
可以定义多个泛型参数，泛型之间可以相互继承。
```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]

function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]; // 将source断言成T
    }
    return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
```
### 泛型接口
可以编写泛型接口提供给函数使用。
```ts
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```
### 泛型类
```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
### 泛型默认类型
```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```
## 声明合并
对于函数、接口和类，如果出现多个声明，那么声明会被合并
```ts
// 函数的合并
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// 接口的属性合并必须是唯一的，如果合并时类型不一样会报错，接口中的函数属性可以不一样。
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    price: number;
    alert(s: string, n: number): string;
    weight: number;
}
interface Alarm {
    price: string; 
    // Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
// 
```
## 代码检查
使用typescript-eslint检查ts代码错误。
## 编译选项(待补充)
allowJ-允许js文件被tsc编译，即在编译ts文件时相同目录下的js文件也会被编译到ts的目录下。
![在这发里插入图片描述](https://img-blog.csdnimg.cn/5e85297309fa4cd99472df3825ad3639.png)
allowSyntheticDefaultImports-允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。
诸如commonJs规范的模块化语法export = foo，其导入的语法为import foo = require('foo')，或者 import * as foo from 'foo'，但是我们习惯利用import foo from 'foo'，如此会导致我们在导入模块时会报错。如果我们在tsc编译时设置了allowSyntheticDefaultImports，那么将会被允许使用import foo from 'foo'



