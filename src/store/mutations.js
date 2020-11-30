import { ADD_COUNTER, ADD_TO_CART, SET_CART_LIST, CLEATR_CART_LIST } from './types'
import { Toast } from 'vant'

export default {
  // 购物车数量的叠加,当id相同的时候
  [ADD_COUNTER](state, result) {
    result.count++;
    Toast({
      type: 'success',
      message: `当前商品数量为${result.count}`,
      // 弹框的时候禁止点击
      forbidClick: true,
      duration: 1500
    })
    // 将数据缓存起来
    localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },

  // 往购物车里面添加数据
  [ADD_TO_CART](state, data) {
    data.count = 1;
    data.checked = false;
    state.cartList.push(data);
    Toast({
      type: 'success',
      message: `添加购物车成功`
    })
     // 将数据缓存起来
     localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },

  // 清空购物车的数据
  [CLEATR_CART_LIST](state) {
    // 将选中的数据清除掉
    // 选出没有选中的数据
    let result = state.cartList.filter(item => item.checked !== true)
    if(result.length === 0) {
      // 如果全都选中，则移除数据的存储，将cartList设置为新的数组
      localStorage.removeItem("cartList");
      state.cartList = [];
    } else {
      // 否则就改变缓存里面的数据
      state.cartList = result;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }
  },

  // 将购物车的数据储存在本地
  [SET_CART_LIST](state, data) {
    state.cartList = data;
  }
}