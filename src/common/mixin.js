export const backTopMixin = {
  data() {
    return {
      // 当前滚动的位置
      corPosition: 0
    }
  },
  methods: {
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}