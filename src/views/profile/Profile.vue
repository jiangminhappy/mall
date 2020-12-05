<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">蒋蒋商城</div>
    </nav-bar>
    <scroll class="scroll-height">
      <login />
      <Money />
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import Login from './children/Login'
import Money from './children/Money'
export default {
  name: 'Profile',
  components: {
    NavBar,
    Scroll,
    Login,
    Money,
  }
}
</script>

<style scoped>
  .profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>