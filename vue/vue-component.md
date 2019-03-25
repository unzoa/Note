# 组件

## 传递到组件中的数据，最好是组件真好能应用的

##### simple use
    import Com from '@/components/Com'
    export default {
        components: {
            Com
        }
    }
    
    # use it
    <modalClass class="modalClass" v-if=“modalClassShow”></modalClass>
    
    # control it
    this.modalClassShow = !this.modalClassShow
    
    # 父组件静止，子组件内scroll
    :class="{homefixed:ishomefixed}"
    .homefixed{position:fiexed;top;0}

##### 子组件传递=> 命令 => 父组件
    - 子组件：this.$emit('eventName', {'para1': 'para1'}, id);
    - 在父组件使用子组件的地方添加 @eventName = 'fatherMethod'
    export default {
        methods: {
            fatherMethod (res, id) {
                console.log(res.para1, id)
            }
        }
    }

##### 父组件 => 数据
    - 在父组件使用子组件的地方  
    v-bind:resName='fatherData' === :resName='fatherData'

    - 子组件
    props:['resName'],
    create:function(){
        console.log( this.resName )
    }

##### 绑定动态class,style
    :class="{class-name: Boolean}" OR  :class="[{},{}]"
    :style="{option: data-option}"

##### 动态组件
    # 组件名称和要绑定的数据放在数组里面
    export deafult {
        data () {
            comps: [
                {'componentName': 'com1', res: res1}
            ]
        }
    }
    
    # 在template中
    <component :is="i.componentName" v-for="(i,j) in comps"></component>

##### 组件跳转
    # click event
    @click="" === v-on:click
    
    # router jump 
    this.$router.push({path:'/component-name'})
    
    # router query
    this.$router.push({path:'/knowledge',query:{para1:'para1-val'}})
    this.$route.query.para1
    
    # router params
    this.$router.push({name:'knowledge',params:{para1:'para2-val'}})
    this.$route.params.para2
    
    # 解决组件跳转时从下向上移动卡顿效果
    给组件加position：absolute；top：0；

##### 组件切换效果
    - 在<router-view>的组件里监听组件离开事件
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            next();
            this.$emit('toapp','1');
        }
    
    - 在<router-view @toapp=“toapp”>组件下
        methods:{
            toapp(e){
                //通过e值改变<transition :name=“data-sth”>的name而改变动画 
            }   
        }
    
    .slide-enter-active {animation: slideInRight 0.5s; }
    .slide-leave-active {animation: slideOutLeft 0.5s; }
    @keyframes slideInRight {
        from {transform: translate3d(100%, 0, 0); visibility: visible; }
        to {transform: translate3d(0, 0, 0); }
    }
    @keyframes slideOutLeft {
        from {transform: translate3d(0, 0, 0); } 
        to{visibility: hidden; transform: translate3d(-100%, 0, 0); }
    }

    .oslide-enter-active{animation: slideInLeft 0.5s}
    .oslide-leave-active{animation: slideOutRight 0.5s}
    @keyframes slideInLeft{
        from{transform: translate3d(-100%, 0, 0); visibility: visible; }
        to{transform: translate3d(0, 0, 0); }
    }
    @keyframes slideOutRight{
        from{transform: translate3d(0, 0, 0); }
        to{visibility: hidden; transform: translate3d(100%,0,0); }
    }

    # 多个组件平行滑动
    ?
