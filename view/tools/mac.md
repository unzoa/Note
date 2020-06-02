# mac

- 清理图标 defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock



## MacOS上vue-cli项目发热严重，node占用cpu大！

### 1. 现象

在MacOS 上启动vue-cli的项目，电脑6，7位置过热（烫手）🥵
### 2. 分析
项目是从仓库中拖下来的，直接npm install，运行...
mac开始旋转小风扇微波加热什么东西...
▼
没啥特别的配置，它在干啥？
打开活动监视器，node占用cpu过高！嗯...那就是它了
▼
为什么node会占用高呢？查了一圈是fsevents的问题

#### fsevents
>Native access to MacOS FSEvents in Node.js
>The FSEvents API in MacOS **allows applications to register for notifications of changes to a given directory tree**. It is a very fast and lightweight alternative to kqueue.
>This is a low-level library. For a cross-platform file watching module that uses fsevents, check out Chokidar.

所以，我的fsevents出了啥问题？？？🧐
▼
难道是node_modules中的它...应该不是bug，那差不多就是版本问题了。
#### package-lock.json
> package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
### 3. 检测解决方案
删除package-lock.json
选择性的删除（我是直接删除了）node_modules

重新npm install
npm run dev
...
此时监视器中node依然很高😥
...
项目启动完成了，emm...
成功了😃

### 4. 结论
项目安装时候fsevents安装应该不符合我的电脑（版本），删除老版本的重新安装就可以了。