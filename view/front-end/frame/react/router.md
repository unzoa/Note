# React-Router
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