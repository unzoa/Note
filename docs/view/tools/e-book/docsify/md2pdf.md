# Docsify 导出PDf

> **暂时失败**

1. 将整篇文档整合成一个md文件

```bash
yarn add docsify-pdf-converter # 会报错，🥚不用管

node full_content_md.js

# 输出了/static/main.md
```


2. 将1中md转pdf

```bash
npm i markdown-pdf

node convert_md_pdf.js
```
