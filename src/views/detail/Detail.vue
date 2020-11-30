<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleItemClick="titleItemClick" ref="DetailNavBar" />
    <scroll :probe-type="3" @scroll="detailScrolls" class="content" ref="scroll">
      <detail-swiper :top-images="topImages" class="detail-set-scroll" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" /> 
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" class="detail-set-scroll" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backTop" v-show=" corPosition >= 1500" />
  </div>
</template>

<script>

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail';
import Scroll from 'components/common/scroll/Scroll.vue';
import { backTopMixin } from 'common/mixin'

import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailBottomBar from './childComps/DetailBottomBar';
import BackTop from 'components/content/backTop/BackTop';


export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      detailClassList: [],
      detailIndex: 0
    }
  },
    components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
    BackTop,
  },
  mixins: [ backTopMixin ],
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品的详细的信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 创建商品的详细数据
      this.shop = new Shop(data.shopInfo);

      // 获取详情页的数据
      this.detailInfo = data.detailInfo

      
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })

  },
  methods: {
    imageLoad() {
      console.log('cascac')
        this.$refs.scroll.refresh();
        // 图片加载完成获取classList
         this.getClassList();
      },
    // 监听详情页的滚动的事件
    detailScroll(){},
    titleItemClick(index) {
      this.$nextTick(() => {
        let el = document.getElementsByClassName("detail-set-scroll")
        this.$refs.scroll.scrollToElement(el[index], 300)
      })
    },
    // 获取classList的长度
    getClassList() {
      this.detailClassList = [];
      this.detailClassList = Array.from(document.getElementsByClassName("detail-set-scroll"))
      console.log('scsdvds'+this.detailClassList);
      let maxValue = 1000000;
      this.detailClassList.push({ offsetTop: maxValue });
      // console.log(this.detailClassList);
    },
    // 监听页面滚动事件，并动态的设置navBar的index
    detailScrolls(position) {
      console.log(position);
      console.log(this.detailClassList.length)
      let detailPosition = position ? -position.y : 0;
      this.corPosition = detailPosition;

      for(let i = 0; i< this.detailClassList.length - 1; i++) {
        if(
          detailPosition >= this.detailClassList[i].offsetTop &&
          detailPosition < this.detailClassList[i+1].offsetTop
        ) {
          if(this.detailIndex !== i) {
            this.detailIndex = i;
            this.$refs.DetailNavBar.currentIndex = this.detailIndex;
          }
        }
      }
    },

    // 购物车添加商品
    addToCart() {
      console.log(this.goods)
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.oldPrice,
        id: this.detailId
      }
      this.$store.dispatch('setCateGoryData', obj);
    }
  }
      
}
</script>

<style  scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>>
