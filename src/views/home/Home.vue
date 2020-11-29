<template>
  <div id="home">
    <!-- 导航条---为封装的组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3"
      @scroll="scrollPosition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" />
      <!-- 推荐 -->
      <recommend-view :recommend="recommend" />
      <!-- 特色的区域 -->
      <feature-view />
      <!-- 分类的区域 -->
      <tab-control 
        :title="['流行', '新款', '精选']" 
        @tabClick="tabClick" 
        ref="tabControl"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不能监听事件，所以需要加上.native修饰符 -->
    <back-top  @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import { debounce } from 'common/untils'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        'pop': { page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': { page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 请求轮播图的数据
    this.getHomeMultidata();
    // 请求详情的数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
   const refresh =  debounce(this.$refs.scroll.refresh, 50)
     // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh();
      refresh();

    })
  },
  methods: {
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    //根据不同的类型，请求不同的列表 
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    // 事件监听
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    // 点击回到首页
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    scrollPosition(position) {
      // position.y
      this.isShow = (-position.y) > 1000 
    },
    // 上拉加载更多
    loadMore() {
       this.getHomeGoods(this.currentType);
    },

  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: #ff8198;
    color: #FFF;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>