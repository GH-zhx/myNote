# redux
## store
### 基本写法
新版的api
```js
import countReducer from './countRenducer'
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore ({
  reducer:countReducer
})
export default store
```
旧版的api
```js
import countReducer from './countRenducer'
import { legacy_createStore as createStore } from 'redux'
const store = createStore(countReducer)
export default store
```
### api
####  getState
获取当前仓库数据
```js
import store from "./redux/store";
store.getState()
```
####  dispatch
触发更改
```js
store.dispatch({type:'increment',data:value*1})
```
####  subscribe
监听仓库变化
```js
store.subscribe(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
})
```
## Reducers
### 基本写法
```js
const initState = 0
const countReducer = function(preState=initState,action){
  const {type,data} = action
  switch (type) {
    case 'increment':
      return preState + data
    case 'decrement':
      return preState - data
    default:
      return preState
  }
}
export default countReducer
// 我们返回的perState变量值如果两次没有变化，redux会忽略此次更新，且进行的是浅比较。所以，当我们的preState是对象数据类型时，我们需要返回一个新的地址值，避免无法更新。
```
### 合并Reducers
当需要储存多种数据时，我们需要合并Reducers
```js
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import {configureStore,combineReducers} from '@reduxjs/toolkit'
const store = configureStore ({
  reducer:combineReducers({
    count:countReducer,
    persons:personReducer
  }),
  
})
export default store
```
## constant
用于定义常量，避免写错且便于修改。
```js
export const INCREMENT  = 'increment'
export const DECREMENT  = 'decrement'
```
## action
### 基本写法
定义返回action对象的函数。
```js
import {INCREMENT,DECREMENT} from './constant'
export const createInAction = (data) => ({type:INCREMENT,data})
export const createDeAction = (data) => ({type:DECREMENT,data})
```
### 异步action
当action是一个函数时，称为异步action。
```js
export const createInAsyncAction = (data,time) => (dispatch) => {
  setTimeout(() => {
    dispatch(createInAction(data))
  },time)
}
// @reduxjs/toolkit包已经集合了redux-thunk，可以直接使用异步action。如果是原生的redux，需要自己下载redux-thunk进行手动支持异步action。
import {createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
const store = createStore(countReducer,applyMiddleware(thunk))
```
## react-redux
结合react和redux的插件，便于react使用redux。
思想是，通过react-redux创建一个容器组件，该容器组件包裹ui组件，关于store的一切操作在容器组件进行。并且自动帮我们实现更改store后刷新组件的效果。
容器组件编写如下：
```js
import { connect } from "react-redux";
import Home from "./Home";
import { createInAction,createDeAction,createInAsyncAction } from "../../redux/count_action";
// 生成Home组件的状态props，执行时会将stroe的当前值传入
const mapStateToProps = state => ({
  count:state
})
// 生成Home组件的方法props，执行时会将dispatch传入。
const mapDispatchToProps = dispatch => ({
  increment:(n) => dispatch(createInAction(n)),
  decrement:(n) => dispatch(createDeAction(n)),
  odd_increment:(n) => dispatch(createInAction(n)),
  promise_increment:(n) => dispatch(createInAsyncAction(n))
})
// 如果想传给home组件的方法只进行仓库数据的更新，可以采用简写形式。react-redux自定帮我们生成接受新值的函数。
const mapDispatchToProps = {
  increment:createInAction
  decrement:createDeAction
  odd_increment:createInAction
  promise_increment:createInAsyncAction
}

// 暴露Home的redux父组件，并将mapStateToProps和mapDispatchToProps函数的返回值对象作为Home组件的props。 
export default connect(mapStateToProps,mapDispatchToProps)(Home)
// 容器组件的store通过容器组件的props传递。
<HomeContainer store={store}/>
// 或者可以通过react-redux暴露的Provider组件进行传递。使用该组件后，其包裹的组件内只要使用了容器组件，自动就可以获取store。
import { Provider } from "react-redux";
  <Provider store={store}>
    <App />
  </Provider>
```
## redux开发者工具
下载了之后需要对store进行一些配置
```js
// 老版的使用方法
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { legacy_createStore as createStore ,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(
  combineReducers({
    count: countReducer,
    persons: personReducer
  }),composeWithDevTools(applyMiddleware(thunk)))
// 新版的使用方法
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
const store = configureStore({
  reducer: combineReducers({
    count: countReducer,
    persons: personReducer
  }),
  devTools:composeWithDevTools()
})
```



