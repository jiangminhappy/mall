import { ADD_COUNTER, ADD_TO_CART } from './types'

export default {
  setCateGoryData({state, commit}, data) {
    // 储存本地的数据
    let list = JSON.parse(localStorage.getItem("cartList")) || [];
    if(list) {
      state.cartList = list;
      let result = state.cartList.find(item => {
        return item.desc === data.desc
      })
  
      // 利用action分发多个commit事件
      if(result) {
        commit(ADD_COUNTER, result)
      } else {
        commit(ADD_TO_CART, data)
      }
    } else {
      commit(ADD_TO_CART, data);
    }
  }
}