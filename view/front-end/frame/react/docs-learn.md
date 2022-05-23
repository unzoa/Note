# DOCS LEARN

### 首先就～

start 报错： react-scripts start  sh: react-scripts: command not found

NODE_ENV=development node_modules/react-scripts/bin/react-scripts.js start

### 组件

- [函数组件](src/components/user-info)
- [class组件](src/components/tick)

#### class 组件

- state
  - constructor
    - super
  - 更新数据
    - 赋值 setState({key: new_val})
      - render() 重新执行
      - props state 属性合并赋值
        ```js
        this.setState((state, props) => ({
          counter: state.counter + props.increment
        }))
        ```
- 生命周期
  - componentDidMount
  - componentWillUnmount
  - componentDidUpdate


### css

- 行内样式
  ```html
  <p style={{fontSize: "12px", color: "#ddd"}}>
  ```

### 事件处理

- 调用方式
  ```html
  <button onClick={this.handleSubmit}>
  ```
- 阻止默认
  ```js
  function handleSubmit (e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }
  ```
  - e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。
  - React 事件与原生事件不完全相同。如果想了解更多，请查看 [SyntheticEvent](https://zh-hans.reactjs.org/docs/events.html) 参考指南
- 传参
  ```js
  - state.[class static functon].bind(this) 和 class public function
    - default e: React 的事件对象 e 会被作为第二个参数传递
    - more
      - name.bind(this, params)
        - name (params, e) {}
  - jsx[class static].bind(this, params)
    - name (params, e) {}
  - jsx[(e) => class static function (params, e)]
    - 此时 e 必须传
  ```

### conditional rendering

```js
{
  condition && <Component />

  condition
    ? ... <Component_A />
    : ... <Component_B />
}

function (props) {
  const cc = props.condition

  if (!cc) {
    return null
  }

  if (cc === 1) {
    return <A />
  } else {
    return <B />
  }
}
```

### lists and keys

```js
{
  Array.from({length: 3}).map((i, j) => j).filter((i, j) => {
    return i !== 1
  }).map((i, j) => {
    return <Item name={i} key={j}/>
  })
}
```

### forms

#### 受控组件

input, textarea, select 绑定value为state的字段，onChange中改变state。fileds

当页面input不接受上一个页面或刷新记录的传参时，可以不必绑定value；
需要绑定：
- 接收传参
- 输入校验

#### 非受控

input type file


### 状态提升

```js
- 父组件 {
  state: {}
  class static function
}
- 子组件{
  props: {
    father.state.field_a,
    father.static.fn_a
  }

  class static fn_a_a (e) {
    this.props.fn_a(e.target.value)
  }

  form.input{
    value:props.field_a
    onChange:fn_a_a
  }
}
```

```js
searchChange = e => {
  this.setState({ searchVal: e.target.value });

  // handleSearch 第一个参数不能用this.state.searchVal， 否则传给父组件的值会晚一次
  this.props.handleSearch(e.target.value, this.state.checkBoxVal)
}
```

### 组合 （插槽）

```js
- 父组件{
  <子组件 name={value}>
  ...<h1>more cntent</h1>
  </>
}
- 子组件 {
  props: {
    name
  }

  render {
    <div className={props.name}>
      {props.children} <!-- 此处即为插槽-->
    </div>
  }
}
```

#### 自定义插槽（react称之为 “洞”）

> 组件之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递。这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。

```js
- 父组件{
  <子组件
    name={value}
    left={<LeftComponent />} >
    ...<h1>more cntent</h1>
  </>
}
- 子组件 {
  props: {
    name,
    left
  }
  render {
    <div>
      <header>{props.name}</header>
      <aside>{props.left}</aside>
      <main></main>
    </div>
  }
}
```

### 代码分割

应用：
- React.lazy(() => import(..组件))
- Suspense 组件中渲染 lazy 组件

注意:
React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很棒的服务端渲染打包指南。

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。


```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

#### 路由代码分割

应用：
- React.lazy
- Suspense
- react-router-dom

```js
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home/Home'))
const About = lazy(() => import('./About/About'))

function RouterComponent (params) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default RouterComponent
```

### Context

应用：
- 统一组件树，数据需要层层向下传递
  - 例如：爷爷传theme-》父亲-》子
- API
  - React.createContext
  ```js
  const MyContext = React.createContext(defaultValue);
  ```
  - Context.Provider
  ```html
  <MyContext.Provider value={/* 某个值 */}>
  ```
  - Context.consumer
  ```js
  // 挂载在 class 上的 contextType 属性可以赋值为由 React.createContext() 创建的 Context 对象。
  // 此属性可以让你使用 this.context 来获取最近 Context 上的值
  static contextType = MyContext
  ...
  return <p>{this.context}</p>
  // or
  const value = useContext(MyContext);
  ```

使用：

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

### 错误边界

应用：
- 组件发生错误

使用：
- 生命周期
  - static getDerivedStateFromError (error) { // 渲染UI }
  - componentDidCatch (error, errorInfo) { // 打印错误信息 }

```js
// ErrorBoundary

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }

// BuggyCounter
...
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
...

<ErrorBoundary><BuggyCounter /></ErrorBoundary>
```

### Refs

应用：
- 父组件：
  - React.createRef 创建了一个 React ref
  - 向下传递给 <FancyButton ref={ref}>

- 子组件：
  - 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数
  - 向下转发该 ref 参数到 <button ref={ref}>

- 父组件
  - 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点

使用：

父组件

```js
import FancyButton from './FancyButton';

const ref = React.createRef();

// 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
// 尽管渲染结果将是一样的，
// 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
// 这意味着我们不能调用例如 ref.current.focus() 这样的方法
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
```

FancyButton

HOC 高阶组件

```js
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```
