<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
       // 开启点击事件,默认是false
      click: true,
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
      probeType: this.probeType,
       // 是否开启监听滚动到底部事件
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动到的位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })

    }
    // 上拉加载更多
    this.scroll.on('pullingUp', () => {
      // console.log('ascasc')
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
     this.scroll && this.scroll.scrollTo(x, y, time);
    },
     // 加载完成的封装
    finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
    // 解决滚动加载卡顿的问题
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 获取滚动的纵向的距离
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },
    // 滚动到指定的位置
    scrollToElement(el, time) {
      this.scroll.scrollToElement(el, time);
    }
  }
}
</script>

<style scoped>

</style>