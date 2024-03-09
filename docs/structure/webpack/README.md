# 知识点
## 基础使用
### 依赖安装
- 初始化package.json
```js
npm init -y // 可以在当前目录生成基础package.json文件
npm i webpack webpack-cli -D // 安装webpack打包工具至开发环境，-D代表开发环境，-P代表生产环境。
```
### 启用webpack
```js
npx webpack ./src/main.js --mode=development // --mode代表打包方式，如果为-modee=production则是生产环境打包。./src/main.js 代表当前啊package.json文件目录的对应的相对目录的打包入口文件。
```
默认会将打包后的文件放在根目录的dist文件下。
## 基本配置
 ### 5 大核心概念

1. entry（入口）

指示 Webpack 从哪个文件开始打包

2. output（输出）

指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）

扩展 Webpack 的功能

5. mode（模式）

主要由两种模式：

- 开发模式：development
- 生产模式：production

### 编写Webpack 配置文件
在项目根目录下新建文件：`webpack.config.js`
Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
```js
// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
```

配置完成后的运行指令

```:no-line-numbers
npx webpack
```
## 处理样式资源
### 下载对应预处理器的loader
例如sass
```:no-line-numbers
npm i sass-loader sass -D
```
相应配置如下
```js{21-24}
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
```
## 处理图片资源
由于webpack5已经将图片处理资源的file-loader 和 url-loader合入了webpack内部，所以对于webpack5来说已经不用下载对应的loader了，这里学习一下webpack对于图片的优化，由于bese64转码会将图片体积变大，对于比较小的图片，我们使用webpack将其转化成base64的形式进行展示，减少请求数量。
```js
    test:/\.png|jpe?g|gif|webp|svg/,
    type:"asset",
    parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024 // 10kb
        }
    }
```
## 打包目录修改
每个模块规则对应的filename字段可以规定打包后的路径。
```js
 module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/main.js', // 最后的文件名为入口文件的名字
        clean:true,
    },
    module:{
        rules:[        
            {
                test:/\.png|jpe?g|gif|webp|svg/,
                type:"asset",
                generator:{
                    filename:'images/[hash:5][ext][query]'
                }
            }
        ]   
    },
}
```
## 处理字体图标、视频等资源。
 其中type的值为“asset”时，会对一些小的资源进行base64转码，type值为“asset/resource”时只会将文件转化为可识别的文件。
```js 
{
        test: /\.(ttf|woff2?mp4|avi)$/,
        type: "asset/resource", 
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
```
## eslint使用
下载依赖
```:no-line-numbers
npm i eslint-webpack-plugin eslint -D
```
配置webpack.config.js
```js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

```
配置.eslintrc.js
```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
## 编译es6代码
下载依赖
```:no-line-numbers
npm i babel-loader @babel/core @babel/preset-env -D
```
babel.config.js的配置
```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```
## 处理html资源
可以通过html-webpack-plugin为入口html文件引入入口文件。
插件下载：
```:no-line-numbers
npm i html-webpack-plugin -D
```
webpack.config.js配置
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
```
## 开启自动编译模式
通过webpack-dev-server开启本地端口服务器，可以实现热启动，并且在dev模式下，不会输出dist目录。
下载依赖
```:no-line-numbers
npm i webpack-dev-server -D
```
配置
```js
module.exports = { 
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
};
```
运行指令
```:no-line-numbers
npx webpack serve
```
## 生产模式
生产模式会将只需要将webpack的module配置改编成production
## css提取成单独文件。
需要通过一个css插件实现
下载依赖
```:no-line-numbers
npm i mini-css-extract-plugin -D
```
配置
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = { 
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/main.css",
    }),
  ],
};
// 同时需要将style-loader换成MiniCssExtractPlugin.loader
```
## 处理css兼容性问题
有些浏览器的样式有差异，需要对css代码进行兼容性处理。
```:no-line-numbers
npm i postcss-loader postcss postcss-preset-env -D
```
webpack.config.js配置
```js
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env", // 能解决大多数样式兼容性问题
                                ],
                            },
                        },
                    },
               	],
            },
        ]
    },
```
package.json配置
```js
{
  // 其他省略
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```
## css单独打包成一个文件
## css压缩
## SourceMap
生成map文件，提高报错定位准确性
## 提升项目构建速度
### HotModuleReplacement
开发模式下使用热启动，只重新构建更改的模块，未更改的模块使用缓存。
### oneof
通过配置oneof可以使文件只被匹配到的loader或plugin处理。
### Include/Exclude
可以为每个规则配置其中一种，排除某些文件或只处理某些文件。
### Cache
需要eslint和babel编译的文件，在第二次之后的编译可以只编译改变的文件，未改变的文件使用缓存。
### Thead
对js的babel，eslint等编插件开启多线程打包，提升代码编译速度。 
## 减少代码体积
### Treeshaking
默认开启了，只会对将三方库中被引入的对象打包进编译后的代码中。
### babel
使用@babel/plugin-transform-runtime让babel在编译时，从@babel/plugin-transform-runtime里取辅助代码而不是向每一个文件增加辅助代码。
### Image Minimizer
压缩图片。

## 优化代码性能
### CodeSplit
如果将大文件分割成多个文件，避免首屏加载慢，提取重复代码，将动态加载的文件单独打包等
### preload和prefetch
这两者能够在页面请求空闲时加载文件，可以解决一些大文件在被动态加载时出现等待的情况。
### network cache
为浏览器的文件做缓存，下一次加载该文件用缓存文件。加快网页加载速度，但是由于编译前后文件的名称未改变，导致浏览器不能到何时不用缓存文件， 为文件提供hash值保存文件可以解决问题，而为了避免引用该文件的文件被重新编译，需要将引用关系单独编译成一个文件。
### core-js
低版本浏览器对于Promise等es6的语法不支持，core-js对这些语法进行了es5的实现，提高兼容性。
有问题待解决，eslint不能识别promise
### PWA(progressive web application)
让web资源缓存在cache storage，使得在离线状态下依然可以访问一些基本功能。
serve包可以部署指定目录的项目。

## webpack搭建React项目

## loader
- 用于处理指定后缀的文件。
- 分为内联loader和配置loader，内联loader通过引入时添加后缀实现，而配置loader通过配置文件进行实现，当打包时依次按照loader配置项对文件信息进行处理。
- loader执行顺序 pre(前置) - normal - inline(内联) - post(后置)，同级的loader从右到左执行。
### 内联loader
用法：`import Styles from 'style-loader!css-loader?modules!./styles.css';`

含义：

- 使用 `css-loader` 和 `style-loader` 处理 `styles.css` 文件
- 通过 `!` 将资源中的 loader 分开
- `?` 代表为前一个loader传递参数。

`inline loader` 可以通过添加不同前缀，跳过其他类型 loader。

- `!` 跳过 normal loader。

`import Styles from '!style-loader!css-loader?modules!./styles.css';`

- `-!` 跳过 pre 和 normal loader。

`import Styles from '-!style-loader!css-loader?modules!./styles.css';`

- `!!` 跳过 pre、 normal 和 post loader。

`import Styles from '!!style-loader!css-loader?modules!./styles.css';`

### 配置loader
配置文件中的写法
```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: "./loaders/loader1.js",
    },
  ],
},
```
loader文件中的同步写法
```js
// loaders/loader1.js
/**
 * @content 文件内容
 * @map SourceMap数据
 * @meta 传进来的参数。
*/
module.exports = function loader1(content，map, mata) {
  console.log("hello loader");
  return content;
};
// 可以通过另一种方式定义，以此传递参数和维持map数据。
module.exports = function loader1(content，map, mata) {
  // 第一个参数是报错信息。
  this.callback(null, content, map, meta); // 相当于使用renturn content
  // 如果在同步loader中this.callback没有被同步调用，那么向下一个loader传递的文件信息文undefined。
};
```
loader文件中的异步写法
```js
module.exports = function loader1(content，map, mata) {
  // 当执行了this.async()时，该loader会被标记为异步loader，可以进行异步操作，webpack会等待该loader的异步任务结束在执行下一个loader。
    const callback = this.async();
  // 进行异步操作
  setTimeout(() => {
    callback(null, result, map, meta);
  }, 1000);
};
```
loader中的raw写法
```js
// 这种loader接收到的是Buffer二进制数据，当我们在处理字体图标或图片时会用到。
module.exports = function loader1(content，map, mata) {
  console.log("hello loader");
  return content;
};
module.exports.raw  = true
```
loader中得pitch写法，webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。
在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 。
```js
module.exports = function (content) {
  return content;
};
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("do somethings");
  // 如果有返回值，则会终止之后的loader链。
};
```

### 自定义loader
1. clean-log-loader
```js
// loaders/clean-log-loader.js
module.exports = function cleanLogLoader(content) {
  // 将console.log替换为空
  return content.replace(/console\.log\(.*\);?/g, "");
};
```
2. banner-loader
```js
const schema = require("./schema.json");
module.exports = function (content) {
  // 获取loader的options，同时对options内容进行校验
  // schema是options的校验规则（符合 JSON schema 规则）
  const options = this.getOptions(schema);

  const prefix = `
    /*
    * Author: ${options.author}
    */
  `;

  return `${prefix} \n ${content}`;
};

//  loaders/banner-loader/schema.json
// 定义banner-loader传入option的规则
{
  "type": "object",
  "properties": {
    "author": {
      "type": "string"
    }
  },
  "additionalProperties": false // 表示不允许增加新属性
}

// 在配置文件中使用
{
  test: /\.js$/,
  use: [
      {
          loader: './loaders/loader1.js',
          options: {
              author: 'zhuhuaxing'
          }
      },
  ]
},
```

## plugins
通过配置文件注册相应的钩子函数，让webpack在构建过程中执行我们定义好的插件方法。
1. 配置文件中的写法
```js
// 引入定义的插件构造函数，交给配置对象一个实例，构建时会自动帮我们调用实例上的apply方法。
const TestPlugin = require('./TestPlugin/index.js')

// 使用plugin
plugins:[
  new TestPlugin()
]
```
2. 插件的写法
```js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor()");
  }
  // 1. webpack读取配置时，new TestPlugin() ，会执行插件 constructor 方法
  // 2. webpack创建 compiler 对象
  // 3. 遍历所有插件，调用插件的 apply 方法
  apply(compiler) {
    console.log("TestPlugin apply()");

    // 从文档可知, compile hook 是 SyncHook, 也就是同步钩子, 只能用tap注册
    compiler.hooks.compile.tap("TestPlugin", (compilationParams) => {
      console.log("compiler.compile()");
    });

    // 从文档可知, make 是 AsyncParallelHook, 也就是异步并行钩子, 特点就是异步任务同时执行
    // 可以使用 tap、tapAsync、tapPromise 注册。
    // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
    compiler.hooks.make.tap("TestPlugin", (compilation) => {
      setTimeout(() => {
        console.log("compiler.make() 111");
      }, 2000);
    });

    // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.make() 222");
        // 必须调用
        callback();
      }, 1000);
    });

    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      console.log("compiler.make() 333");
      // 必须返回promise
      return new Promise((resolve) => {
        resolve();
      });
    });

    // 从文档可知, emit 是 AsyncSeriesHook, 也就是异步串行钩子，特点就是异步任务顺序执行
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 111");
        callback();
      }, 3000);
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 222");
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 333");
        callback();
      }, 1000);
    });
  }
}

module.exports = TestPlugin;
```




 


