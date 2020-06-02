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
