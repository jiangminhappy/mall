<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar></slide-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import SlideBar from './children/SlideBar'
// import { getCategory } from 'network/category'
export default {
  name: 'Category',
  components: {
    NavBar,
    SlideBar,
  },
  mounted: {  
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100px;
    background: brown;
  }
</style>