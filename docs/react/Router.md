# react-router
## 路由的解释
一对映射关系，key为浏览器的部分url，value可以为function或component
## 路由原理
通过监听bom下的history对象变化，加载对应的组件或函数。
history的历史纪录的存放方式为栈存储。对应的方法有
- back() 返回上一个记录
- forward() 前进一个记录
- replace() 替换当前记录
- push() 向记录栈压入一个历史记录。
## react-router区分
react-router有三种实现，分别对应web，native，any
- react-router-dom 针对web实现的库。
- react-native-router-flux 针对native实现的库。
- react-router-anywhere 都能用的库。
## 路由组件
被注册的路由组件在被调用的时候，会接收到三个props参数，
1. history
- go 跳跃几条历史记录，正负值代表前进和后退
- goBack 回退历史记录
- goForward 前进历史记录
- push push(path,state) 添加历史记录
- replace replace(path,state) 替换当前历史记录 
2. location
- pathname
- search 接收到的search参数
- state 接收到的state参数
3. match
- params 接收到的params参数
- path 
- url
## react-router-dom v5
### browserRouter和hashRouter
两个路由容器组件，提供路由管理。哈希路由与浏览器路由的区别是哈希路由会有#，而#后的信息不会向服务器发送。
browserRouter比较常用，是使用了h5提出的history对象。并且页面刷新的时候会保存state参数，但是hashRouter不会保存state参数
```js
import { Link,Route ,BrowserRouter,HashRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('react_root')).render(
  // 一般将路由器组件放在整个应用最外层。
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```
### Route、Link
注册路由表，将路径与对应展示的组件进行注册
```js
const About = () => {
  return (
    <p>about</p>
  )
}
const Home = () => {
  return (
    <p>Home</p>
  )
}
export default function App() {
  return (
    <div>
      <Link to={'/about'} style={{ marginRight: '15px' }}>about</Link>
      <Link to={'/home'}>home</Link>
        <Route path="/about" Component={About}></Route>
        <Route path="/home" Component={Home}></Route>
    </div>
  );
}
```
### NavLink
默认提供一个动态的activeClassName，点击时添加该类名，默认是‘active’
### Switch
确保同一个路由路径只会匹配一个组件。
```js 
<Switch>
  <Route path="/about" Component={About}></Route>
  <Route path="/home" Component={Home}></Route>
  <Route path="/home" Component={Test}></Route>
</Switch>
// 路径为/home时，只显示home，不显示Test
```
### Redirect
重定向路由，作为作为未匹配上是的默认展示
```js
  <Route path="/home" Component={Home}></Route>
  <Redirect path="/home" Component={Home} />
```
### 路由的严格匹配和模糊匹配
模糊匹配：link的对应的路径包含注册路由的path时，可以呈现效果，反之如果时精准匹配则不行。
```js
// 在模糊匹配的情况下，下面的写法也可以实现路由切换的效果，精准匹配则并不能。
<Link to={'/home/ab'}>home</Link>
  <Route path="/home" Component={Home}></Route>
```
开启精准匹配设置exact属性为true
```js
<Route path="/home" exact={true} Component={Home}></Route>
```
### 多级路由的匹配
当多级路由在变更时，会使用当前路径从一级路由开始重新匹配，所以当多级路由在更新时，如果中途出现了严格路由匹配，那么会导致匹配错误的情况。因此多级路由下的link组件的路径应该包含完整路由
```js
<Link to="/home/message/detail"></Link>
```
### 路由组件传递参数
借助路由路径传递params参数。传递的此参数会在组件的match属性中组合成一个params参数对象。不私秘的参数一般用该方法进行传递
```js
const Home = ({match}) => {
  const {id,title} = match.params
  return (
    <p>Home</p>
  )
}
<NavLink to={'/home/id/title'}>home</NavLink>
  <Route path="/home/:id/:title" Component={Home}></Route>
```
通过路径传递search参数，传递形式和get请求一致,此参数直接储存在location对象的search属性里。
```js
const Home = ({location}) => {
  // 借助querystring库将search参数转化为对象。
  const {id,title} = qs.parse(location.search.slice(1)) 
  return (
    <p>Home</p>
  )
}
<NavLink to={'/home/?id=0&title=dgf'}>home</NavLink>
<Route path="/home" Component={Home}></Route>
```
也可以传state参数，通过link标签传递。该参数不会再地址栏进行显示，用于传递一些私密的参数。
```js
const Home = ({location}) => {
  const {id,title} = location.state 
  return (
    <p>Home</p>
  )
}
<NavLink to={{
  pathname:'/home',
  state:{id:0,title:'t'}
}}>home</NavLink>
  <Route path="/home" Component={Home}></Route>
```
### querystring
该库可以将urlencoded编码的字符串转化成对象，也可以将对象转化成urlencoded编码字符串。
```js
import qs from 'querystring'
const {id ,title } = qs.parse('id=0&title=t')
// 0,t
const str = qs.stringfy({id:0,title:'t'})
// 'id=0&title=t'
```
### 历史记录的模式
默认为push模式，及点击一个链接，将会新增一个历史记录。而replace模式会把上一个链接替换，不会再历史记录中新增一个链接。
```js
// 当replace为true时，开启replace模式。
<NavLink replace to={'/home/?id=0&title=dgf'}>home</NavLink>
```
### 编程式路由导航
借助路由组件传递过来的history对象上的几个api，可以手动操作历史记录和路由组件的切换。

### withRouter
是一个函数，接受一个一般组件作为参数，将一般组件绑定上路由组件的固定参数后返回新组件，以支持一般组件操作历史记录。
## react-router-dom v6
### Routes
和之前的switch一样，确保只匹配一个路由组件，不同的是路由注册必须被该组件包裹。
```js
<reactRouter.Routes>
  <reactRouter.Route path="/about" element={<About></About>}></reactRouter.Route>
  <reactRouter.Route path="/home" element={<Home p={'dg'}></Home>}></reactRouter.Route>
</reactRouter.Routes>
```
### caseSensitive
route组件上的一个属性，控制路径匹配时是否区分大小写，为true时区分大小写。
```js
<reactRouter.Route caseSensitive path="/about" element={<About></About>}></reactRouter.Route>
```
### Navigate
与之前的Redirect对应，规定默认显示。
```js
 <reactRouter.Route path={'/'} element={<reactRouter.Navigate to={'/home'}></reactRouter.Navigate>}></reactRouter.Route>
```
并且该组件只要渲染，就必定跳转到指定的路由页面
### NavLink
自定义动态类名修改为函数返回值
```js
const classFc = ({isActive}) => isActive ? 'act' : 'activ'
<reactRouter.NavLink className={classFc} to='/home'>home</reactRouter.NavLink>
```
使用end属性将祖先路由的active类名取消
```js
<reactRouter.NavLink end to='/home'>home</reactRouter.NavLink>
```
在多级路由时，to的写法有三种
- /home/news 提供全部的路由信息
- news 只提供当前路由的路径名称
- ./news 表示当前路劲下添加news路径
不可以写成/news，如此会将路径直接更改成根目录下的news路径。
### useRoutes
可以通过配置生成对应的路由注册信息
```js
const classFc = ({isActive}) => isActive ? 'act' : 'activ'
export default function App() {
  const element = reactRouter.useRoutes([
    {
      path:'/about',
      element:<About></About>
    },
    {
      path:'/home',
      element:<Home></Home>
    },
    {
      path:'/',
      element:<reactRouter.Navigate to={'/about'}></reactRouter.Navigate>
    }
  ])
  return (
    <div>
      <reactRouter.NavLink className={classFc} to={'/about'} style={{ marginRight: '15px' }}>about</reactRouter.NavLink>
      <reactRouter.NavLink className={classFc} to='/home'>home</reactRouter.NavLink>
      {element}
    </div>
  ); 
}
```
### Olutlet
当我们通过路由注册表来生成组件时，多级路由需要用该组件来进行占位，告诉react组件应该渲染在什么位置。
### 传递参数
1. params参数
```js
// navlink和route与之前一样通过路径携带和获取
<NavLink to={'/home/message/0/t'}>home</NavLink>
<Route path="/home/message/:id/:title" element={<Home />}></Route>
// 在注册表中写为
{
  path:'message/:id/:title',
  element:<routerComponents.Message></routerComponents.Message>
},
// 接受params参数的方法通过useParams的hook实现
const {id,title} = useParams()
// 还可以通过useMatch的hook获取
const {id,title} = reactRouter.useMatch('/home/message/:id/:title').params
```
2. search参数
```js
// 传参与之前一致，以urlencoded方式进行传递。
<NavLink to={'/home/?id=0&title=dgf'}>home</NavLink>
// 接受参数通过useSearchParam的hook获取
const [search,setSearch] = reactRouter.useSearchParams()
const id = search.get('id')
const title = search.get('title')
// setSearch可以更新search参数
setSearch('id=10&title=df')
// 同时也可以通过useLocation的hook进行获取
const location = useLocation()
console.log(location.searcch) // "?id=10&title=df"
```
3. state参数
```js
// 传递方式有所改变
<reactRouter.NavLink
  className={'ac'}
  to='message'
  state={{
    id:30,
    title:'dsgs'
  }}
>message</reactRouter.NavLink>
// 使用useLocation的hook获取
const location = useLocation()
console.log(location.state) // {id：30,title:'dsgs'}
```
### 编程式路由导航
使用useNavigate进行路由跳转
```js
const navigate = useNavigate()
// 跳转指定路由,同样可以通过路径传递params和search参数。
navigate('/home/message')
// 传递state参数需要通过第二个参数进行
navigate('/home/message',{
  replace:false,
  state:{id:2,title:'te'}
})
```
### useInRouterContext
检查当前组件是否处于一个router中，如果处于返回true。
```js
const navigate = reactRouter.useInRouterContext()
```
### useNavigationType
判断当前组件时通过什么方式渲染的。一共有三种方式，POP，PUSH，REPLACE。
```JS
const type = reactRouter.useNavigationType()
```
### useOutlet
获取当前组件的下级路由组件对象。若组件还未挂载，则返回null。
### useResolvedPath
可以解析一个url的信息，返回对应的信息对象。
```js
const obj = useResolvedPath('/home/?id=34&title=tewe#fdsg')
console.log(obj) 
/* {
    "pathname": "/home/",
    "search": "?id=34&title=tewe",
    "hash": "#fdsg"
}
*/
```
### 路由守卫
解决更换路径后，根据权限或登录信息判断是否展示该路由组件，以及登录失效重定向路由的效果。
```js
const AppRouter = () => {
  const location = useLocation();
  const { pathname } = location;
  const routes = [
    {
      path: '/',
      auth: false,
      component: <Navigate to='/index' />,
    },
    {
      path: '/index',
      auth: false,
      component: <Index />,
      child: [
        {
          path: '/index/myspace',
          auth: true,
          component: <MySpace /> 
        },
        {
          path: '/index/h5template',
          auth: false,
          component: <H5Template /> 
        }
      ]
    },
    {
      path: '/login',
      auth: false,
      component: <Login /> 
    },
    {
      path: '/register',
      auth: false,
      component: <Register /> 
    },
    {
      path: '/errPage',
      auth: false,
      component: <ErrPage />
    },
    {
      path: '/*',
      auth: false,
      component: <Navigate to='/errPage' replace={true}></Navigate>
    }
  ] 
  const isLogin = false;
  //请求页面路径需要验证 && 没有登录 -> 跳转登录页 ， 后续考虑登录后是否自动跳转被拦截路径 
  const RouteNav = (param: any) => {
    return (
      param.map((item: {path: string,auth: boolean,component: ReactNode, child?: any}) => {
        return (
          <Route path={item.path} element={item.path === pathname && item.auth && !isLogin ? <Navigate to='/login' replace={true}></Navigate> : item.component} key={item.path}>
            {
              item?.child && RouteNav(item.child)
            }
          </Route>
        )
      })
    )
  }
  return (
    <Routes>
      {
        RouteNav(routes)
      }
    </Routes>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
```


