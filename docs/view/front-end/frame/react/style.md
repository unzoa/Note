# Sass & 行内样式
> npm install node-sass --save-dev

- 应用
  + 创建sass
    文件名字.module.scss
  + 引用
    import Style from name.module.scss
    ```
      <span className={Style.haha}>haha~</span>
    ```
- 行内样式
  ```js
    const styleObj = {color: 'red'}
    <img style={styleObj} />
  ```
