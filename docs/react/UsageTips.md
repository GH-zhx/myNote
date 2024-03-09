# 应用技巧
## 函数组件获取上一次的state或props
```js
function Counter() {
  const [count, setCount] = useState(0);
  
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;
  return <h1>Now: {count}, before: {prevCount}</h1>;
}
// 也可抽离成一个自定义hook使用
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```
## 函数组件实现getDerivedStateFromProps
即退出当前渲染，重新开始新的渲染。
## 实时获取当前dom信息。
```js
function MeasureExample() {
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```
## 函数组件实现shouldComponentUpdate
可以使用React.memo来实现，React.memo相当于PureComponent，对应的Hook是useMemo,useMemo是在渲染阶段进行执行的，所以不要在useMemo中编写Hook。
```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```
## effect中使用定时器。
```js
// 使用useState的值通过回调函数获取最新的state
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不使用组件作用域中的任何变量
  return <h1>{count}</h1>;
}
// 如果需要使用props的值，那么可以采用useRef
function Example(props) {
  // 把最新的 props 保存在一个 ref 中
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });
  useEffect(() => {
    function tick() {
      // 在任何时候读取最新的 props
      console.log(latestProps.current);
    }
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // 这个 effect 从不会重新执行
}
```
## 减少useState初始化函数的的执行。
当我们的useState初始值需要经过计算获得，那么我们希望只在第一次渲染的时候调用，此时我们可以将usestate的参数用函数代替。
```js
function Table(props) {
  // ⚠️ createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
function Table(props) {
  // ✅ createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```
## 从useCallback中读取变化的值
```js
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();
  useEffect(() => {
    textRef.current = text; // 把它写入 ref
  });
  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 读取它
    alert(currentText);
  }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```




