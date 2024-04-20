# 常用库
## pubsub-js
### 安装
```js
npm i pubsub-js
```
### 使用
```js
// 引入
import PubSub from "pubsub-js";
// 发布
PubSub.publish('count',count)
// 订阅
PubSub.subscribe('count',(_,data) => {
  setCount(data)
})
// 取消订阅
PubSub.unsubscribe('count')
```
## require.js
浏览器js引擎本身没有暴露模块化api，需要通过该库帮助我们生成操作浏览器js引擎进行模块化的api。
```js 

```

## browserify
与require.js一样的作用

## clean-mark
获取网络文章到本地并转为对应的格式
```js
// 安装
npm install clean-mark --global
// 使用
clean-mark "https://blog.csdn.net/yyy/article/details/xxx" // 生成的文件名是xxx.md，默认下载到当前路径
// 指定存放路径
clean-mark url -o / tmp / article
// 指定文件格式
clean-mark url -t html // 支持text，html，md
```
## ClipboardJS
一个用于使用js实现复制剪切功能的js库。

## echarts
一个可视化图标库
```js
import * as echarts from 'echarts';
import * as echarts from 'echarts';
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
// 当多次调用myChart.setOption时，两次的图形进行了合并，原因时echrts默认将两次的option进行了合并，两个方案，一个是清除当前实例的图形，一个是通过setOption的第二个参数进行控制
myChart.setOption({},true) // 当第二个参数为true时，不会合并option
myChart.clear() // 清除当前图像。
// vue将echarts实例赋值给ref对象时，不能进行深监测，否则会导致监测数据量太大导致报错。
```

## postCss
一个css转换器，可以将我们自定义写的css规则转换成浏览器能识别的css规则

## TailwindCSS
在vue中常用的一个css转换器。

## git
1. 


2. 命令
```js
// 在当前目录新建一个仓库
git init

// 在一个目录下新建本地仓库
git init [project-name]

// 克隆一个远程仓库
git clone [url]

// 查看配置
git config [--local][--global][--system] --list

// 查看当前git环境详细配置
git config -l 

// 查看系统config
git config --system --list

// 查看当前用户配置
git config --global --list

// 查看当前仓库配置信息
git config --local --list

// 查看全局账号
git config --global user.name

// 查看全局邮箱
git config --global user.email

// 修改配置
git config [--local][--global][--system] section.key value

// 设置当前项目的用户名
git config --local user.name [用户名]

// 配置当前用户的编码项，可以解决中文编码问题
git config --global core.quotepath false 

// 配置当前项目不忽略文件大小写，git默认忽略文件名的大小写，这点值得注意
git config --local core.ignorecase false 

// 查看远程仓库地址命令
git remote -v

// 删除远程仓库地址
git remote remove origin

// 添加远程仓库地址 
git remote add origin [url] 

// 查看remote 地址，远程分支，还有本地分支与之相对应关系等信息
git remote show origin

// 删除那些远程仓库已经不存在的分支
git remote prune origin

// 建好 develop 分支的跟踪中央仓库分支
git checkout -b develop origin/develop

// 创建分支
git branch [branch-name] 

// 查看当前分支
git branch 

// 查看本地和远程的所有分支
git branch -a 

// 查看远程所有分支
git branch -r 

// 查看本地分支与远程分支的映射关系
git branch -vv

// 切换分支
git checkout [branch-name] 

创建dev分支，然后切换到dev分支 
// git checkout命令加上 -b 参数表示创建并切换，相当于以上两条命令
git checkout -b [branch-name] 

// 删除一个分支
git branch -d [branch-name] 

// 强制删除一个没有合并的分支
git branch -D [branch-name] 

// 删除远程分支dev
git push origin :[branch-name] 

// 更新分支列表信息
// -p 表示删除不存在的远程跟踪分支
git fetch -p

// 清理无效的远程追踪分支
git remote prune origin

// 从工作区添加指定文件到暂存区
git add [file-name1] [file-name2]

// 将工作区的被修改的文件和新增的文件提交到暂存区，不包括被删除的文件
git add . 

// u指update，将工作区的被修改的文件和被删除的文件提交到暂存区，不包括新增的文件
git add -u . 

// A指all，将工作区被修改、被删除、新增的文件都提交到暂存区
git add -A . 

// 将暂存区所有文件添加到本地仓库
git commit -m "[massage]" 

// 将暂存区指定文件添加到本地仓库
git commit [file-name-1] [file-name-2] -m "[massage]" 

// 将工作区的内容直接加入本地仓库
git commit -am "[massage]" 

// 快速将当前文件修改合并到最新的commit，不会产生新的commit。
// 在提交commit后发现还有部分文件修改忘记提交了可以是用该命令
git commit --amend 

// 从远程仓库拉取代码到工作空间
git pull 

// 从远程仓库拉取指定分支代码
git pull origin [branch-name]

// 将文件添加到远程仓库
git push 

// 将代码推送到指定的远程分支
git push origin [branch-name]

// 强制将代码推送到指定的远程分支
git push --force origin [分支名称]

// 强制提交，当我们本地reset到旧的版本时，然后普通push会被拦截，因为此是本地HEAD指向比远程库还要旧
git push -f 

// 推送当前本地分支到指定远程分支
git push origin [branch-name] 

// 退到/进到 指定的commit【sha码】，然后强制推送到远程
git reset --hard [commit_id]
git push origin HEAD --force

// 删除远程分支
git push origin --delete [分支名称]

// 查看分支历史
git log

// 简化查看分之历史
// 没有pretty的是，只有commit id 前7位，加pretty的是全部的id
git log --oneline
git log --pretty=oneline

// 图形式展示分支历史
git log --graph

// 简化版图形式展示分支历史
git log --graph --oneline

// 简化版图形式展示分支历史附带展示已经修改的文件
git log --graph --oneline --name-only

// 查看分支合并情况
git log --graph --pretty=oneline --abbrev-commit 

// 使用git reset --hard命令改变了HEAD指向某个版本后后，还可以用git log --reflog查看所有版本。
git log --reflog

// 查看最新3条commit日志数据
git log -3 

// 查看某个文件的修改记录
git log -p [filename]

// 显示操作本地版本库的命令，包括commit和reset等，
// 在回退版本以后又后悔找不到commit id了可以使用此命令查看历史
git reflog

// 工作区与暂存区比较
git diff

// 工作区与 HEAD ( 当前工作分支) 比较
git diff HEAD

// 工作区比较上次的提交
git diff HEAD^

// 工作区比较上两次提交，于是有了，git diff HEAD~n 是比较上n次提交与现在工作区间的关系
git diff HEAD~2

// 查看add的文件修改内容
git diff HEAD [filename]

// 工作区与暂存区文件比较（查看未add的文件修改内容）
git diff [filename]

// 工作区比较特定提交
git diff [commitId]

// 工作区与特定提交文件进行比较
git diff [commitId] [filepath] 

// 暂存区与 HEAD 比较
git diff --cached

// 暂存区比较 HEAD 的某个文件差异
git diff --cached _posts/blog/2019-02-16-git.md

// 当前分支与 branchName 分支进行比较
git diff [branchName]

// 当前分支的文件与branchName 分支的文件进行比较
git diff [branchName] [filepath]

// 查看某两个版本之间的差异
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9 b8e7b00c02b95b320f14b625663fdecf2d63e74c

// 查看某两个版本的某个文件之间的差异
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9:filename b8e7b00c02b95b320f14b625663fdecf2d63e74c:filename

// 用于合并指定分支到当前分支
git merge [branch-name] 

// 退出当前分支合并，当合并后冲突很多，要撤回合并分支就可以用这个命令
git merge --quit

// 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward 
// 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并
// 而fast forward合并就看不出来曾经做过合并。
git merge --no-ff -m [massage] [branch-name]

// 切换分支
git checkout [branch] 

// 最好加--，没有的话就把它当作切换分支看待，切换到另一个分支了，如果没有这个分支也会把它当作文件执行。
// 用暂存区的文件覆盖掉工作区的文件
// 如果暂存区没有可更新的就会用commit的文件更新工作区的文件
git checkout -- [file-name]

// 创建并切换分支
git checkout -b [new-branch-name] 

// 从远程仓库里拉取一条本地不存在的分支
git checkout -b [本地分支名] origin/[远程分支名]
git fetch
git checkout -b [本地分支名] origin/[远程分支名]

// 隐藏当前工作的修改
// 如果不隐藏自己修改的半成品代码，就会发生切换到别的分支后，将然后自己的半成品代码带入其他分支，这样就发生很多不必要的麻烦。
git stash 

// 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。
git stash save message 

// 查看隐藏的工作信息列表
git stash list 

// 删除隐藏的工作信息
git stash drop 

// 恢复隐藏的工作信息，同时删除隐藏的工作信息
git stash pop 

// 恢复指定的隐藏工作信息，但是不会删除隐藏的工作信息
git stash apply [stash@{0}] 

// 这个是复制一次commit提交，然后在当前分支上重新提交一遍；也就是将指定commit的合并到当前分支；
git cherry-pick [commit-id] 

// 将某个分支的多次commit合并到当前分支
git cherry-pick [commitHashA] [commitHashA]

// 将某个分支的commitA到commitB的所有commit合并到当前分支
git cherry-pick [commitHashA]..[commitHashA]

// 使用该命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法。
git cherry-pick [commitHashA]^..[commitHashA]

// 合并多次提交
// 非关键性的提交太多会让版本历史很难看、冗余，所以合并多次提交也是挺有必要的。
// 同样是使用以上的变基命令，不同的是变基命令打开的文本编辑器里的内容的修改。
// 将pick修改为squash，可以是多行修改，然后保存退出。
// 这个操作会将标记为squash的所有提交，都合并到最近的一个祖先提交上。
// 注意：不能对的第一行commit进行修改，至少保证第一行是接受合并的祖先提交。
// -i参数表示进入交互模式。
git rebase -i <commit range>

// 合并前两个历史提交，
// 会弹出vim修改信息，修改第二行的pick为s，或者为squash，squash为合并的意识，
// 然后保存退出编辑，会打开第二个vim编辑，合并并修改commit内容，
// 保存退出会产生一个新的commit id，这样就合并了两个commit
git rebase -i head~2

```




