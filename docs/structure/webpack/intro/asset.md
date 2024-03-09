# 学习资料

- 打开 [哔哩哔哩](http://www.bilibili.com/) 视频网站，搜索尚硅谷。
## 元素渲染
```js
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
// 或者如下的方式
ReactDOM.render(<App />,document.getElementById('react_root'))
```
## 组件和Props
### 类组件
类组件通过生命周期函数编写逻辑，和es6的class一样，如果派生类显示拥有构造函数，那么需要使用super进行调用父类的构造函数。
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```
### this.setState的使用
当参数为对象时，更改state对应属性的值。
```js
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
当参数是函数时，函数的参数是上一次的state和此次更新的props
```js
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
在类组件中处理事件时，需要绑定this，有两种方法，一种是在构造函数中进行this绑定，一种是使用箭头函数this不变的特性。
```js
class LoggingButton extends React.Component {
 constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // 第一种，进行this绑定
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    // 第二种利用箭头函数。
    return (
      // <button onClick={() => this.handleClick()}>
      //   Click me
      // </button>
      <></>
    );
  }
}
```
### 函数组件
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
## 列表和key
react支持使用map函数来生成多个相同的组件，但是需要给每个组件传递key属性，这个key属性只存在react内部，不会被组件传递。
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
## 表单
当表单组件的value值与react的state值绑定时，称该组件为受控组件。
## 状态提升
两个组件如果有公共数据源，那么应该将该数据定义在两者的父级作用域。
## 组合
对一些容器型组件来说，不确定将渲染什么内容，那么在设计该组件时，可以在使用该组件时通过props传递，默认会有children属性。在组件内部直接渲染children或相关props。
```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
## Fragments
react只允许组件拥有一个根节点，所以当我们有多个元素确不想增加一个多余的根节点时，我们可以使用Fragments组件，它代表一个空节点。
```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
如果不需要给Fragment传参，那么可以使用简写形式：<></>
## forwardRef
用此函数生成的组件可以显示的接收prop传递的ref属性。
```js
const Child = forwardRef((props: any, ref: any) => {
  return (
    <div>
      <button ref={ref}>点我</button>
    </div>
  );
});
function App() {
  const child = useRef<any>();
  useEffect(() => {
    setTimeout(() => {
      console.log(child);
    }, 2000);
  }, []);
  return (
    <div styleName="container">
      <Child ref={child} />
    </div>
  );
}
```
### 封装场景组件即高阶组件(HOC)的应用
当一个公共基础组件时，不想其所有方法都可以被父组件调用时，可以通过再封装，将需要用到的方法封装再新组件中
```js
import React, { useImperativeHandle, useRef } from 'react';
function buttonDecorator(Component: any) {
  const WrappedComponent: React.FC<any> = (props) => {
    const childRef = useRef<any>();
    const { parentRef, ...rest } = props;
    // 封装供外部主动调用的接口
    useImperativeHandle(parentRef, () => ({
      toggleStatus: () => {
        childRef.current.onToggleStatus();
      },
      getStatus: () => {
        return childRef?.current?.state?.status;
      },
    }));
    return <Component {...rest} ref={childRef} />;
  };
  return React.forwardRef<any, any>((props, ref) => {
    return <WrappedComponent {...props} parentRef={ref} />;
  });
}
export default buttonDecorator;
```
## React.lazy
可以懒加载组件，当组件第一次被加载时才会引入该组件的包，提高首屏加载效率等。
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
lazy现在只支持默认导出，及组件必须是被默认导出的，如果有多个模块的应该，需要定义一个默认导出的中间模块。
## React.Context
可以让其包裹的组件实现数据共享。
```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```
### React.createContext
创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
```js
const MyContext = React.createContext(defaultValue);
```
### Context.Provider
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 .contextType 和 useContext）的传播不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。

通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。
### Class.contextType
挂载在 class 上的 contextType 属性可以赋值为由 React.createContext() 创建的 Context 对象。此属性可以让你使用 this.context 来获取最近 Context 上的值。你可以在任何生命周期中访问到它，包括 render 函数中。
```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
// 或者在接下的的手动对这个属性赋值。
MyClass.contextType = MyContext
```
### Context.Consumer
一个 React 组件可以订阅 context 的变更，此组件可以让你在函数式组件中可以订阅 context。

这种方法需要一个函数作为子元素（function as a child）。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 value 值等价于组件树上方离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```
### Context.displayName
context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

示例，下述组件在 DevTools 中将显示为 MyDisplayName：
```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```
### 消费多个Context
```js
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');
// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});
class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}
// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```
### 避免无用的渲染
因为 context 会根据引用标识来决定何时进行渲染（本质上是 value 属性值的浅比较），所以这里可能存在一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。
```js
class App extends React.Component {
  render() {
    return (
    // 一下的value值每次渲染的时候value会得到新的引用地址 ，所以导致其包裹的consumers组件被被渲染。避免这样写。
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```
## 错误边界(Error Boundaries)
错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。错误边界可以捕获发生在整个子组件树的渲染期间、生命周期方法以及构造函数中的错误。

如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

只有class组件才能成为错误边界组件。
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

错误边界无法捕获如下错误
- 事件处理（了解更多）
- 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件
## 高阶组件(HOC)
当不同的组件拥有一样的行为时，我们应该将该行为抽象成函数，通过该函数返回一个新的组件，并确保不修改原有组件。
```js
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }
    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```
HOC应该透传与HOC无关的props，并不透传hoc相关的props。
```js
render() {
  // 过滤掉非此 HOC 额外的 props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;
  // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;
  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```
不在render中使用hoc，因为这样每次render会生成新组件，那么之前组件的一些状态无法被保留，如果需要动态调用hoc，应该将其放入生命周期函数。
如果被包裹组件有静态方法，那么我们需要手动将这些方法进行复制，否则新组件无法获取这些方法
```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // 必须准确知道应该拷贝哪些方法 :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  // 或则通过hoist-non-react-statics自动拷贝所有非React静态方法。
  // hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
```
## 与第三方库协同
有时，我们需要用到其它库来实现效果，我们可以将这些三方库与react进行集成，react只负责挂载，将dom交给三方库，又三方库进行管理。例如实现jQuery的Chosen插件。
```js
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    
    this.$el.chosen({...this.props});
    this.handleChange = this.handleChange.bind(this);
    // 确保每次绑定的函数是一样的。
    this.$el.on('change', this.handleChange);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger("chosen:updated");
    }
  }
  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.chosen('destroy');
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```
## JSX
jsx只是React.createElement方法的一个语法糖，最终调用的都是createElement方法，所以在每一个模块内都需要引入react进行编译。必须使用大写字母开头。
```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
// 会编译为
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
jsx支持使用属性来表示,当组件数量过多时很有用
```js
import React from 'react';
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}
function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
jsx不能是一个表达式
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';
const components = {
  photo: PhotoStory,
  video: VideoStory
};
function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
  // 错误！JSX 类型不能是一个表达式。
  // return <components[props.storyType] story={props.story} />;
}
```
jsx中的props可以接受一个js表达式，由于if和for循环不是一个表达式，所以不能作为props
```js
<MyComponent foo={1 + 2 + 3 + 4} />
```
jsx的props默认为true，并不建议不给props初始值，容易和es6对象简写混淆，这个功能只是为了保持与html标签一致。
```js
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
// 这两个写法的效果式一致的。
```
jsx可以使用书信展开
```js
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};
```
jsx子元素会以children属性向下传递。可以返回数组中的元素，这也是能使用map生成多个子项的原因。
```js
render() {
  // 不需要用额外的元素包裹列表元素！
  return [
    // 不要忘记设置 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
// 也可以使用函数作为子元素// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
布尔类型、Null 以及 Undefined 将会被jsx的子元素忽略，以下渲染的结果一致。如果想要渲染这些值，需要将其转化为字符串。
```js
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```
注意数字0等会被渲染,一下代码在length等于0时，会渲染处‘0’
```js
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```
## fdsg


