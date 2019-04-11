import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    beeCart: JSON.parse(localStorage.getItem('beeCart')) || []
  },
  mutations: {
    // 1. 添加或减少商品方法
    addCart (state, goods) {
      // console.log(state.beeCart)  本地缓存的  加入购物车的商品

      // goods 是 List.js页面addCart传进来的 count 和 id
      // 从缓存中找购物车中是否有这一项curGoods
      const curGoods = state.beeCart.find(item => item.id === goods.id)
      // console.log(curGoods)   count: 1  isSelected: true

      // 判断购物车中是否有这个商品
      if (!curGoods) {
        // 第一次添加该商品 并且是选中状态
        state.beeCart.push({ ...goods, isSelected: true })
      } else {
        // 把再次选中的数量  从新赋值给 购物车
        curGoods.count = goods.count
      }
      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    },
    // 2. 更新商品方法
    updateCart (state, curList) {
      // console.log(state, curList)  curList改变后新的商品信息
      state.beeCart = curList.map(item => ({ ...item }))
      // console.log(state.beeCart)
      localStorage.setItem('beeCart', JSON.stringify(state.beeCart))
    }
  },
  // 计算属性
  getters: {
    // 与文档中  要获取id字符串形式  所以在这里编译
    // 在购物车页面 发送axios地址栏中进行拼接
    // 1. 购物车页面获取商品根据id(12,34,45)这种形式获取 方法
    ids (state) {
      // console.log(state)
      return state.beeCart.map(item => item.id).join(',')
    },
    // 2.total是加入购物车数据的总量
    // reduce 遍历state.beeCart  进行累加返回总数
    total (state) {
      return state.beeCart.reduce((count, item) => {
        count += item.count
        return count
      }, 0)
    },
    // 3. 加入购物车的商品信息 方法
    id2Data (state) {
      /*
        获取到这样的对象
        {
          id1: { count: 3, isSelected: true },
          id2: { count: 1, isSelected: true },
        }
      */
      return state.beeCart.reduce((data, item) => {
        data[item.id] = {
          count: item.count,
          isSelected: item.isSelected
        }
        // console.log(data)

        return data
      }, {})
    },
    // 4. 全选按钮方法
    isSelectAll (state) {
      return state.beeCart.every(item => item.isSelected)
    }
  }
})
