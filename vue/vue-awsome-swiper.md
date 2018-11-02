# Swiper的使用

    # npm install vue-awesome-swiper —-save-dev
    
    # 引入vue-awesome-swiper
    main.js.  
    import VueAwesomeSwiper from ‘vue-awesome-swiper'  
    Vue.use(VueAwesomeSwiper)
    
    # template
    <swiper :options="swiperOption" ref=“mySwiper">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    
    # script
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    data(){}
    swiperOption: {}
    components: {swiper, swiperSlide}
    computed: {swiper() { return this.$refs.mySwiper.swiper } }

    # slidesPerView控制多个slide同框宽度为body宽度平均