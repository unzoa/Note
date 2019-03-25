# element-ui

### menu
- 菜单高亮问题
    + 由PathA -menu点击-> PathB
        * 此时菜单的defaultActive没有更新
        * 此时需要配合着 el-menu 的events select获取index（路由的Path）赋值给activeIndex
    + 路由内点击跳转 this.$router.push({path: '/' + PathName})
        * 此时需要创建个Vue实例为bus.js存储状态
            - import Vue from 'vue'
            - export default new Vue()
        * 在执行跳转的页面引入bus.js
            - import Bus from '@/assets/js/bus'
            - this.$router.push({path: '/PatientList'})
            - Bus.$emit('activeIndex2','/PatientList')
        * 在el-menu 监听
            - var self = this
            - Bus.$on('activeIndex2',function(defaultActive) {
            -   self.defaultActive = defaultActive
            - })

- table
    + 自定义表头内容
        * 利用 Table-column Attributes 上 render-header 属性
        *   test (h, { column, $index }) {
              return h('span', {
                class: 'errorIcon',
                domProps: {
                  innerHTML: 'haha'
                },
                on: {
                  click: () => {
                    this.haha()
                  }
                }
              })
            },
            haha () {
              console.log(21321321)
            }
