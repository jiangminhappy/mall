<template>
  <div class="bottom-bar">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"  />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="收藏" />
      <van-goods-action-button @click="addToCart" type="warning" text="加入购物车" />
      <van-goods-action-button @click="$router.push('/cart')" type="danger" text="立即购买" />
  </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
 .bottom-bar {
   position: fixed;
    z-index: 10;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
 }
 .van-goods-action {
    line-height: 50px;
    height: 50px;
    border-top: 1px solid #cccccc;
}
.van-goods-action-icon {
  height: auto;
}
</style>