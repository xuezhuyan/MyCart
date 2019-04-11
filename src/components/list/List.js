import BeeHead from '../commont/Beehead.vue'
import BeeFooter from '../commont/BeeFooter.vue'
import ProductOperate from '../prodOp/prodOperate.vue'
export default {
  components: {
    BeeHead,
    BeeFooter,
    ProductOperate
  },
  data () {
    return {
      // 总数据
      listLeft: [{ name: '热销' }],
      // 右侧商品数据
      products: [],
      selectedProductions: [],
      // 用来记录高亮菜单的索引号
      selectedIndex: 0
    }
  },
  created () {
    this.loadListLfet()
  },
  methods: {
    // 获取全部数据
    async loadListLfet () {
      let res = await this.$axios.jsonp('http://localhost:3008/list')
      console.log(res)
      const { categories, products } = res.data
      // 作用: 用来显示已选择商品的数量
      const id2Data = this.$store.getters.id2Data
      // console.log(id2Data)

      // 左侧商品赋值
      this.listLeft = categories
      // 右侧商品列表上数据
      this.products = products

      // 这一步获取右侧商品(热销榜)数据  this.selectedProductions = products[categories[0].id]
      // products[categories[0].id]这一步拿到右侧商品具体的值
      // 把右侧商品数据复制  存到data中  下一个函数用①
      this.selectedProductions = products[categories[0].id].map(item => {
        return {
          ...item,
          // 当前商品已选择的数量
          // count 在 prodOperate组件中 与v-model='item.count' 双向绑定
          // id2Data[item.id]确认商品在不在购物车中  在拿数量
          count: (id2Data[item.id] && id2Data[item.id].count) || 0
        }
      })
    },
    // 切换左侧菜单①
    // 传进来当前点击的左侧下标   和右侧商品的id
    selectMenu (index, id) {
      const id2Data = this.$store.getters.id2Data
      // console.log(id2Data)
      console.log(index, id)

      // 用来记录高亮菜单的索引号
      // this.selectedIndex = index
      // 把右侧商品id赋值给selectedProductions  传到data中 重新渲染
      this.selectedProductions = this.products[id].map(item => {
        return {
          // 把item对象展开  在把count写进去   总的重新返回
          ...item,
          count: (id2Data[item.id] && id2Data[item.id].count) || 0
        }
      })
    },
    // 添加或减少商品
    selectGoods (id) {
      // count 表示当前商品已选择的数量
      // count 在 prodOperate组件中 与v-model='item.count' 双向绑定
      // item.id === id 匹配到当前点击的商品
      const count = this.selectedProductions.find(item => item.id === id).count
      this.$store.commit('addCart', {
        // 把当前商品的id和数量传给 addCart
        count,
        id
      })
    },
    // 跳转到详情页
    goInfo (id) {
      this.$router.push(`/goodsinfo/${id}`)
    }
  }
}
