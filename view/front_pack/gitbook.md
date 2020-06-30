# gitbook

```bash
    npm install gitbook-cli -g
    gitbook init //初始化目录文件
    gitbook serve //生成静态网页并运行服务器
    gitbook build //生成静态网页
```

#### export PDF
> sudo -s ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin

#### Simple learn gitbook
> [gitbook](http://www.chengweiyang.cn/gitbook/index.html)

#### summry 折叠
- sunmary 同级目录增加 book.json文件
- book.json
    ```json
    {
        "plugins": ["toggle-chapters"]
    }
    ```
- npm install gitbook-plugin-toggle-chapters
- gitbook build
- gitbook serve

#### 语言显示
- book.json
```json
"language" : "zh-hans"
```

## 报错

- gitbook serve 报错
    + Q
    ```
    Error: Couldn't locate plugins "toggle-chapters, splitter, anchor-navigation-ex, prism, copy-code-button, alerts, theme-comscore", Run 'gitbook install' to install plugins from registry.

    Error: ENOENT: no such file or directory, stat 'D:\workspace\core-solution-docs\_book\gitbook\gitbook-plugin-fontsettings\fontsettings.js'

    Error: ENOENT: no such file or directory, stat 'D:\workspace\core-solution-docs\_book\gitbook\gitbook-plugin-livereload\plugin.js'

    Error: ENOENT: no such file or directory, stat 'D:\workspace\core-solution-docs\_book\gitbook\gitbook-plugin-alerts\plugin.js'

    Error: ENOENT: no such file or directory, stat 'D:\workspace\core-solution-docs\_book\gitbook\gitbook-plugin-livereload\plugin.js'

    Error: ENOENT: no such file or directory, stat 'D:\workspace\core-solution-docs\_book\gitbook\gitbook-plugin-search\lunr.min.js'
    ```
      * A
      > 修改.gitbook\versions\3.2.3\lib\output\website\copyPluginAssets.js 搜索关键字 'confirm' 将值改为false

      ```js
        return fs.copyDir(
            assetFolder,
            assetOutputFolder,
            {
                deleteFirst: false,
                overwrite: true,
                confirm: false
            }
        );
      ```

