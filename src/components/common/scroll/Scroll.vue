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
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动到的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })

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
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
  }
}
</script>

<style scoped>

</style>