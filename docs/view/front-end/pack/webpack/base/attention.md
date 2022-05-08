# 注意
> [webpack 中那些最易混淆的 5 个知识点](https://juejin.im/post/5cede821f265da1bbd4b5630#heading-4)

1. module, chunk, bundle的区别

其实就是同一份逻辑代码在不同转换场景下的三个名字：
- 直接写出来的是module
- webpack处理时候的是chunk
- 最后在浏览器生成的是bundle

2. filename, chunkFilename

- filename 是在entry中的，打包后输出的文件的名称
- chunkFilename 是未在entry，却需要被打包的文件的名称
