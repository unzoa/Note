# CRA Learn-List

### 1.React-Router
> npm install react-router-dom
- 简单实用
  + basic
    ```
    import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link
    } from 'react-router-dom'

    <Router>
      <Link to="/pathName">menuName</Link>

      <Switch>
        <Route path="/pathName">
          <CompName />
        </Route>
      </Switch>
    </Router>
    ```
  + nest
    ```
    import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link,
      useRouteMatch,
      useParams
    } from 'react-router-dom'

    <Router>
      <Link to="/pathName">menuName</Link>

      <Switch>
        <Route path="/pathName">
          <NestCompName />
        </Route>
      </Switch>
    </Router>

    function CompNestName () {
      let match = useRouteMatch()

      <Link to="/pathName">MenuName</Link>

      <Switch>
        <Route path={`${match.path}/:id`}>
          <NestChild />
        </Route>
        <Route path={match.path}></Route>
      </Switch>
    }

    function NestChild () {
      let {id} = useParams()
      return <div>{id}</div>
    }
    ```
    - useRouteMatch(): get path,url,isExact,params
    - useParams(): get Route path paramsKey value of link tag to paramsValue
- 实战
  + routers
    > 引入路由，导出路由数组
    > path为'/'需要放在Switch下最后一个Route？？

  + container
    > 采用nest模式
    ```
      <Router>
        <Switch>
          <login />
          <license />
          <layout />
            <head />
            <side /> [NavLink]
              {routerArr}
            <main /> [Switch Route Redirect]
              <Switch>
                { routerArr}
                <Redirect component="NotFound" />
              </Switch>
          <Redirect from="/" to="/Login">
        </Switch>
      </Router>
    ```

  + login & auth
    > 首次container只加载了跟下相应的路由，登陆跳转到nest下时候利用初始化initialization（constructor）来加载路由，并在componentWillUnmount删除路由

  + keepAlive
    > 第三方组件 [react-keep-alive](https://github.com/StructureBuilder/react-keep-alive/blob/master/README.zh-CN.md)

  + 路由传递数据
    - 单纯跳转
      ```js
        from: this.props.history.push(path, {key: val})
        to: this.props.location.state.key
      ```
    - 父子
      ```
        父组件：
          changeState = (e) => {
            this.setState({
              message: e
            })
          }
          <Child message="haha" callback={this.changeState}/>
        子组件：
          this.props.message
          this.props.callback(message)
      ```
    - 兄弟
      ```
        子组件：
          this.props.message
          this.props.callback(message)
      ```
    - 监听props变化
      > 目标：数据变化后执行某些事件
      ```
        componentDidUpdate (preProps, preState, snapShot) {
          consoloe.log(preProps, preState, this.props.message)
        }
      ```

### 2.Redux & React-Redux
> npm install react-redux
> npm install redux

- actions
> 关于store的命令声明
```js
  export const SET_COUNT = 'SET_COUNT'

  // action 创建函数
  export function setCount (count) {
    return {
      type: SET_COUNT,
      count
    }
  }
```

- reducers
> 接受命令进行操作，并将数据发送到store
```js
import {SET_COUNT} from './actions'
const initialState = {
  count: 1
}

function setCount (count = 1, action) {
  switch (action.type) {
    case SET_COUNT:
      return action.count
    default:
      return count
  }
}

export default function reducers (state = initialState, action) {
  return {
    count: setCount(state.count, action)
  }
}
```

- 应用
  + App.js
    ```js
      import {Provider} from 'react-redux'
      import {createStore} from 'redux'
      import Reducers from './store/reducers'
      ...
      let store = createStore(Reducers)

      <Provider store={store}>
        <Container />
      </Provider>
    ```
  + Count
    /index.js
    ```js
      import { setCount } from '../../store/actions'
      import CountComponent from './Count.js'
      import { connect } from 'react-redux'

      const mapStateToProps = state => {
        return {
          count: state.count
        }
      }

      const mapDispatchToProps = dispatch => {
        return {
          setCount (count) {
            dispatch(setCount(count))
          }
        }
      }
      // connect 传递对象
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(CountComponent)
    ```
    /Count.js
    ```js
      // 接收容器传递过来的参数
      const CountComponent = ({count, setCount}) => {
        return (
          <div className="Count-con">
            <h2>Count: {count}</h2>
            <button onClick={
              e => {
                e.preventDefault()
                setCount(++count)
              }
            }>increase</button>

            <button onClick={
              e => {
                e.preventDefault()
                setCount(--count)
              }
            }>decrease</button>
          </div>
        )
      }
    ```

  + @connect
  > 引用装饰器，减少容器文件
  ```js
  import {connect} from 'react-redux'

  @connect(state => state) // dispatch 可以直接继承，但是state需要手动写入？
  class aa extends React.Component {...}
  ...
  ```

### 3.CRA Config
> npm install react-app-rewired customize-cra --save-dev

- 修改package.json
```json
  // origin
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }

  // changes
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```
- 根目录下创建config-overrides.js
```js
  const {
    override,
    addWebpackAlias,
    addDecoratorsLegacy // 关于装饰器的
  } = require('customize-cra')

  const path = require('path')

  function resolve (dir) {
    return path.join(__dirname, '.', dir)
  }

  module.exports = override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '_s': path.resolve(__dirname, 'src/store'),
      '_c': path.resolve(__dirname, 'src/components')
    }),

    addDecoratorsLegacy()
  )
```

### 4.Proxy
- PlanA: edit package.json
```json
  "proxy": "protocol://domain:port/",
```
- PlanB: 根目录下创建setupProxy.js
> npm install http-proxy-middleware
```js
  const { createProxyMiddleware } = require('http-proxy-middleware')

  module.exports = function (app) {
    app.use(createProxyMiddleware(
      '/user', {
        target: 'http://192.168.1.99/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    ))

    app.use(createProxyMiddleware(
      '/api', {
        target: 'http://192.168.1.99/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    ))
  }
```
+ 应用
```js
  ajax.post('/user/login/', {})
  ajax.get('/api/home_data/', {})
```

### 5.Sass & 行内样式
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
    <img style={styleObj} />
    <img style={{color: 'red'}}>
  ```

### 6.Code Splitting
> npm install @loadable/component
- 应用
  ```js
    // router.js
    import React from 'react'
    const aa = loadable(() => import('aa.js'), {falback: <Loading />})
  ```

