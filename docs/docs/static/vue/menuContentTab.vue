<template>
  <div class="main-container">
    <aside>
      <ul>
        <li
          v-for="(i, j) in menu"
          :key="j"
          @click="addTab(i)"
          :class="{
            'hightlight': i.hightlight
          }">{{i.cn}}</li>
      </ul>
    </aside>

    <aside>
      <ul>
        <li
          v-for="(i, j) in content"
          :key="j"
          @click="addTab(i)"
          :class="{
            'hightlight': i.hightlight
          }">{{i.cn}}</li>
      </ul>
    </aside>

    <main>
      <div class="tabs-container">
        <button class="btn-tab prev" @click="tabPageMove('prev')">《</button>

        <div class="tab-outter">
          <div class="tabs-inner">
            <span
              v-for="(i, j) in tabsData"
              :key="j"
              :class="i.path.replace(/\//, '') + i.params">
                <span
                  @click="tabChange(i.path, i.params)"
                  :class="{
                    'hightlight': i.hightlight
                  }">{{i.cn}}</span>

                <i
                  @click="closetab(j)"
                  v-show="j > 0">x</i>
              </span>
          </div>
        </div>

        <button class="btn-tab next" @click="tabPageMove('next')">》</button>
      </div>

      <router-view />
    </main>
  </div>
</template>

<script>
// 第一个tab不能删除，并且文字剧中
// tab上一页，下一页，使tabcontainer 左右移动一半的距离
export default {
  name: 'MainPage',

  data () {
    return {
      menu: [{
        path: '/menu1',
        cn: 'm1',
        hightlight: true,
        params: ''
      }, {
        path: '/menu2',
        cn: 'm2',
        hightlight: false,
        params: ''
      }],

      content: [],

      tabsData: [{
        path: '/menu1',
        cn: 'm1',
        params: '',
        hightlight: true
      }]
    }
  },

  methods: {
    addTab ({path, cn, params}) {
      // 判断tab存在
      let hasTab = this.tabsData.filter(i => {
        return i.path === path && i.params === params
      }).length

      // 动态增加tab
      if (!hasTab) {
        this.tabsData.push({
          path,
          cn,
          params,
          hightlight: true
        })
      }

      // tab点击切换路由
      this.tabChange(path, params)
    },

    tabChange (path = '/menu1', params = '') {
      // 禁止定向自己
      if (this.$route.path === (path + '/' + params)) { return false }

      // 检查高亮
      ['tabsData', 'menu', 'content'].forEach(i => {
        this[i].forEach((x, y) => {
          if (x.path === path && x.params === params) {
            x.hightlight = true
          } else {
            x.hightlight = false
          }
        })
      })

      this.$router.push({
        path: path + '/' + params
      })

      // 使得选中tab出现在视野
      this.$nextTick(() => {
        let targetTab = document.querySelector('.' + path.replace(/\//, '') + params)
        this.scrollTab(targetTab.getBoundingClientRect())
      })
    },

    animateEvent (moveDistance) {
      let tabOutter = document.querySelector('.tab-outter')
      let timer = ''
      let fullTime = 100
      let interval = 10

      timer = setInterval(() => {
        tabOutter.scrollLeft += moveDistance * interval / fullTime
      }, interval)
      setTimeout(() => {
        clearInterval(timer)
      }, fullTime)
    },

    scrollTab ({left, width}) {
      let tabOutter = document.querySelector('.tab-outter')
      let { animateEvent } = this

      let {
        left: tctl,
        right: tctr,
        width: tctw
      } = tabOutter.getBoundingClientRect()

      switch (true) {
        // 完全在视野中
        case left >= tctl && (left + width) < tctr: return false

        // 点击的tab超出视野左侧 或 横跨左边缘
        case left < tctl: animateEvent(left - tctl - width); break

        // 横跨右侧边缘上
        case (tctr - left) < width: animateEvent(width * 1.5 - (tctr - left)); break

        // 超出右侧边缘
        case left > tctr: animateEvent(left - tctr + width); break
      }
    },

    tabPageMove (val) {
      let tabOutterWidth = document.querySelector('.tab-outter').offsetWidth

      switch (val) {
        case 'prev':
          this.animateEvent(-(tabOutterWidth / 2))
          break

        case 'next':
          this.animateEvent(tabOutterWidth / 2)
          break
      }
    },

    // 关闭tab
    closetab (index) {
      // 当tabsdata只剩一个，就不做任何操作。
      if (this.tabsData.length === 1) { return false }

      // 1.删除当前点击tab
      let isActive = this.tabsData[index].hightlight
      this.tabsData.splice(index, 1)

      // 2.判断是否属于高亮状态
      if (!isActive) { return false }

      // 3.路由优先跳转到下一个tab，没有下一个跳转上一个
      if (this.tabsData[index]) {
        this.tabChange(this.tabsData[index].path, this.tabsData[index].params)
      } else {
        this.tabChange(this.tabsData[index - 1].path, this.tabsData[index - 1].params)
      }
    }
  },

  mounted () {
    // 默认跳转到第一个菜单
    this.content = Array.from({length: 100}).map((i, j) => ({
      path: '/content',
      cn: 'content' + j,
      hightlight: false,
      params: j
    }))
    this.tabChange()
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    position: relative;
    height: calc(100% - 78px);
    overflow: hidden;
    .hightlight {
      background: teal;
      color: #ddd;
    }

    aside {
      float: left;
      height: 100%;
      ul {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          cursor: pointer;
          color: #ddd;
          text-align: left;
          box-sizing: border-box;
          padding: 10px;
        }
      }
    }

    aside:nth-child(1) {
      width: 40px;
      background: #333;
    }
    aside:nth-child(2) {
      width: 200px;
      background: #000;
      overflow-y: auto;
    }

    main {
      float: left;
      height: 100%;
      width: calc(100% - 240px);

      .tabs-container {
        position:relative;
        height: 32px;
        overflow: hidden;

        .tab-outter {
          position: relative;
          left: 32px;
          width: calc(100% - 64px);
          overflow-x: auto;
          padding-bottom: 20px;
          z-index: 1;

          .tabs-inner {
            width: fit-content;
            white-space: nowrap;

            > span {
              position: relative;
              display: inline-block;
              border: 1px solid #333;
              border-top: none;
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
              cursor: pointer;

              span {
                display: inline-block;
                box-sizing: border-box;
                padding: 5px 30px 5px 15px;
                box-sizing: border-box;
                z-index: 1;
              }

              i {
                position: absolute;
                top: 4px;
                right: 3px;
                display: inline-block;
                line-height: 15px;
                width: 15px;
                height: 15px;
                text-align: center;
                border: 1px solid #ddd;
                border-radius: 50%;
                color: #ddd;
                z-index: 2;
              }
            }
            > span:first-child {
              span {
                padding-right: 15px;
              }
            }
            span + span {
              margin-left: 10px;
            }
          }
        }

        .btn-tab {
          z-index: 3;
          position: absolute;
          top: 0;
          height: 32px;
          width: 32px;

          background: #333;
          color: #ddd;
          border: none;
          outline: none;
          cursor: pointer;
        }
        .btn-tab.prev {
          left: 0;
        }
        .btn-tab.next {
          right: 0;
        }
      }
    }
  }
</style>
