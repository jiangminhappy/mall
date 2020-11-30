<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车(<span>{{cartLength}}</span>)</div>
    </nav-bar>

    <!-- 购物车的列表 -->
    <cart-list />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList'
import { mapGetters } from 'vuex';
export default {
  name: 'Cart',
  components: { 
    NavBar,
    CartList 
  },
  computed: {
    ...mapGetters({
      cartLength: "cartListLength",
    })
  }
}
</script>

<style lang="stylus">

</style>