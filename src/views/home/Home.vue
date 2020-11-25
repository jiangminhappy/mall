<template>
  <div id="home">
    <!-- 导航条---为封装的组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners" />
    <!-- 推荐 -->
    <recommend-view :recommend="recommend" />
    <!-- 特色的区域 -->
    <feature-view />
    <!-- 分类的区域 -->
    <tab-control 
      class="tab-control" 
      :title="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
    />
    <goods-list :goods="showGoods" />
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
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
      currentType: 'pop'
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
  methods: {
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    },
    // 事件监听
    tabClick(index) {
      // console.log(index)
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
    }
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
    padding-top: 44px;
  }

  .tab-control {
    position: sticky;
    top: 44px
  }
</style>