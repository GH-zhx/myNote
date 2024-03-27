# node
## api模块
### 文件模块
```js
const fs = require('fs')
fs.stat(path,callback) // 传入第一个参数( 目录或文件)的相关信息(包括文件大小，创建修改时间等)
fs.stat( 'a.js ', function( err, stats) {console.log( stats )}); // 异步写法
try{
  const info = fs.statSync('a.js') // 同步写法，以下方法的同步写法与此类似
}catch(e){
  console.log(e)
}

fs.readdir(path, (error,files) => {}) // 获取当前路径下的目录和文件名，返回一个数组。

fs.readFile(path, 'utf-8' ,(context)=>{}) // 返回当前文件的数据。如果没传第二个参数会返回二进制数据(Buffer)。

fs.writeFile(path, context , 'utf-8') // 将第二个参数的内容以第三个参数的格式写入第一个参数路径对应的文件中
```

### process模块
```js
const process = require('process')
process.cwd() // 返回当前node进程执行目录 /Users/xiaolian/Code/node-api-test
process.argv // 获取当前node执行的命令参数，返回一个数组，数组第一项为node的路径，第二项为执行的js文件路径，第三个开始就是传递的参数。一般使用process.argv.slice(2)获取对应参数。
process.env // 返回当前node环境的表示变量对象，譬如process.env的NODE_ENV属性区分是开发还是生产环境。
process.platform // 返回当前系统的信息。
```


### path模块
```js
const path = require('path')
path.join(...paths) // 将传入的多个路径合并成一个路径
const dPath = path.join( 'template', 'aaa', 'bbb' , 'ccc ', 'd.js '); // 'template/aaa/bbb/ccc/d.js'
const pkgPath = path.join(process.cwd(), './ package.json '); //输出:/Users/xiaolian/ code/node-api-test/package.json

path.resolve(...paths) // 将传入的路径合并之后在和当前路径进行拼接
const dPath = path.resolve( 'aaa', 'bbb ' , 'ccc', 'd.js ');//输出:/Users/xiaolian/Code/node-api-test/aaa/bbb/ccc/d.js

path.basename(path[, ext]) // 返回第一个参数传入的对应路径的最后一个路径名，第二个参数传入文件拓展名
console.log(path.basename( ' scripts/index.js ')); // index.js
console.log(path.basename( 'scripts/index.js '， '.js '));//匹配到 .js，返回index
console.log(path.basename( ' scripts/index.js '， '.json'));//没匹配到，返回 index.js

path.dirname(path)  // 返回最后一个路径名前面的路径
console.log(path.basename( 'scripts/index.js ')); // scripts
console.log(path.basename( 'scripts/hook/index.js ')); // scripts/hook

path.extname(path) // 返回最后一个路径名的文件扩展名（含小数点)
console.log(path.extname('scripts/index.js'))  // .js
console.log(path.extname('README.md')); // .md 
```

## 包管理工具
### npm&yarn
都是包管理工具，但是yarn对比npm有更多的优势。两者设置的淘宝镜像是淘宝团队在中国提供的js库的一个同步数据库。
1. npm的特点
- npm install 下载速度慢，即使是重新 install 时速度依旧慢
- 同一个项目，安装的无法保持一致性。原因是因为 package.json 文件中版本号的特点导致在安装的时候代表不同的含义。
- 使用 npm 安装多个 js 包时，包会在同一时间下载和安装。安装过程中，其中一个包抛出了一个异常，但 npm 会继续安装其他包，所以错误信息就会在一大堆提示信息中丢失掉，以至于直到执行前，都不会发现实际发生的错误。
2. yarn和npm的区别。
- 并行安装：yarn安装包会同时执行多个任务，npm 需等待上一个任务安装完成才能运行下一个任务
- 离线模式：如果你已经安装过一个包，用 yarn 再次安装会从缓存中获取，而 npm 会从网络下载
- 版本锁定：yarn 默认有一个 yarn.lock 文件锁定版本，保证环境统一，而 npm 默认从网络下载最新的最稳定的，版本锁定可以解决包之间版本不兼容问题，npm 也可以通过命令实现版本锁定
- 更简洁的输出：yarn 安装包时输出的信息较少，npm 输出信息冗余
3. 下载命令
- npm
```js
// 设置全局的npm淘宝镜像
// npm config set registry https://registry.npm.taobao.org   该淘宝镜像地址于2022.6.30下线
// npm config set registry https://registry.npmmirror.com   该淘宝镜像地址为最新
// 也可以切换回默认全局镜像
// npm config set registry https://registry.npmjs.org

// -g： 为 --global 的缩写，表示安装到全局目录里
// -S： 为 --save 的缩写，表示安装的包将写入package.json里面的dependencies
// -D： 为 --save-dev 的缩写，表示将安装的包将写入packege.json里面的devDependencies
// i： 为install的缩写，表示安装

// npm init   npm 初始化当前目录
// npm i   安装所有依赖
// npm i express   安装模块到默认dependencies
// npm i express -g   会安装到配置的全局目录下
// npm i express -S   安装包信息将加入到dependencies生产依赖
// npm i express -D   安装包信息将加入到devDependencies开发依赖
// npm i jquery@1.8.3   安装jquery指定的1.8.3版本

// npm update jquery   更新最新版本的jquery
// npm update jquery@2.1.0   更新到指定版本号的jquery
// npm install jquery@latest   可以直接更新到最后一个新版本

// npm root   查看项目中模块所在的目录
// npm root -g   查看全局安装的模块所在目录
// npm list 或者 npm ls   查看本地已安装模块的清单列表
// npm view jquery dependencies   查看某个包对于各种包的依赖关系
// npm view jquery version   查看jquery最新的版本号
// npm view jquery versions   查看所有jquery历史版本号（很实用）
// npm view jquery   查看最新的jquery版本的信息
// npm info jquery   查看jquery的详细信息，等同于上面的npm view jquery
// npm list jquery 或 npm ls jquery   查看本地已安装的jquery的详细信息
// npm view jquery repository.url   查看jquery包的来源地址

// npm cache clean   清除npm的缓存
// npm prune   清除项目中没有被使用的包
// npm outdated   检查模块是否已经过时
// npm repo jquery   会打开默认浏览器跳转到github中jquery的页面
// npm docs jquery   会打开默认浏览器跳转到github中jquery的README.MD文件信息
// npm home jquery   会打开默认浏览器跳转到github中jquery的主页
```
- yarn
```js
// yarn -v   查看yarn 版本
// yarn config list   查看yarn配置
// yarn config get registry   查看当前yarn源
 
// 修改yarn源（此处为淘宝的源）
// yarn config set registry https://registry.npm.taobao.org   该淘宝镜像地址于2022.6.30下线
// yarn config set registry https://registry.npmmirror.com   该淘宝镜像地址为最新
// 也可以切换回默认全局镜像
// yarn config set registry https://registry.yarnpkg.com
 
//  yarn安装依赖
// yarn add 包名           局部安装
// yarn global add 包名    全局安装
 
//  yarn 卸载依赖
// yarn remove 包名          局部卸载
// yarn global remove 包名   全局卸载（如果安装时安到了全局，那么卸载就要对应卸载全局的）
 
//  yarn 查看全局安装过的包
// yarn global list
 
// yarn init  同npm init，执行输入信息后，会生成package.json文件

// yarn install         安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
// yarn install --flat  安装一个包的单一版本
// yarn install --force         强制重新下载所有包
// yarn install --production    只安装dependencies里的包
// yarn install --no-lockfile   不读取或生成yarn.lock
// yarn install --pure-lockfile 不生成yarn.lock
 
// yarn add [package]  在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
// yarn add [package]@[version]  安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
// yarn add [package]@[tag]  安装某个tag（比如beta,next或者latest）
 
// 不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型：
// yarn add --save/-S  加到 dependencies
// yarn add --save--dev  加到 dependencies和devDependencies
// yarn add --dev/-D  加到 devDependencies
// yarn add --peer/-P  加到 peerDependencies
// yarn add --optional/-O  加到 optionalDependencies
 
// 默认安装包的主要版本里的最新版本，下面两个命令可以指定版本：
// yarn add --exact/-E  安装包的精确版本。例如yarn add foo@1.2.3会接受1.9.1版，但是yarn add foo@1.2.3 --exact只会接受1.2.3版
// yarn add --tilde/-T  安装包的次要版本里的最新版。例如yarn add foo@1.2.3 --tilde会接受1.2.9，但不接受1.3.0
 
// yarn publish  发布包
// yarn remove <packageName>   移除一个包，会自动更新package.json和yarn.lock
// yarn upgrade  更新一个依赖: 用于更新包到基于规范范围的最新版本
// yarn run    运行脚本: 用来执行在 package.json 中 scripts 属性下定义的脚本
// yarn info <packageName> 可以用来查看某个模块的最新版本信息
 
// yarn cache 
// yarn cache list 列出已缓存的每个包 
// yarn cache dir 返回 全局缓存位置 
// yarn cache clean 清除缓存
```
### cnpm
国内开发的淘宝镜像包管理工具，默认下载从国内的淘宝同步站(```http://npmmirror.com```)上获取资源。命令和npm一样，除了publish不能实现。
```js
// npm install -g cnpm --registry=https://registry.npmmirror.com
```


