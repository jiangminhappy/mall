<template>
  <div class="tab-control" >
    <div v-for="(item, index) in title" 
         :key="item.title" 
         class="item"
        :class="{active : index === curIndex}"
        @click="handleClick(index)"
        >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    title: Array
  },
  data() {
    return {
      curIndex: 0
    }
  },
  methods: {
    handleClick(index) {
      this.curIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin-bottom: 10px;
    z-index: 10;
  }

  .item {
    flex: 1;
  }

  .active {
    color: #ff5777;
    border-bottom: 3px solid #ff5777;

  }

</style>