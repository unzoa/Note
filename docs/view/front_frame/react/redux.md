# Redux & React-Redux
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
    class aa extends React.Component {
      ...
      this.props.count
      this.props.dispatch(actionName(value))
      ...
    }
    ...
    ```
