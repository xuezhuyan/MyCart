<template>
  <div class="product-operates">
    <span :class="{selected:!isSelected}">
      <span class="product-operates-item del">
        <span class="inner" @click="del"></span>
      </span>
      <span class="product-operates-item amount">{{slectedCount}}</span>
    </span>

    <span class="product-operates-item add">
      <span class="inner" @click="add"></span>
    </span>
  </div>
</template>

<script>
export default {
  // 这个value值 与prodOperate组件中 与v-model='item.count' 双向绑定值一致
  // 父传子
  props: ['value'],
  data () {
    return {
      // this.value 与 prodOperate组件中 与v-model='item.count' 双向绑定
      slectedCount: this.value
    }
  },
  methods: {
    del () {
      this.slectedCount--
    },
    add () {
      this.slectedCount++
    }
  },
  watch: {
    // 将子组件中的数据改变,同步到父组件中
    slectedCount (curCount) {
      this.$emit('input', curCount)
      // 调用vuex中的addCart方法 将商品添加到购物车中
      this.$emit('selectGoods')
    }
  },
  // 计算属性 判断是否显示
  computed: {
    isSelected () {
      return this.slectedCount > 0
    }
  }
}
</script>

<style scoped>
.selected {
  display: none;
}
.product-operates {
  position: absolute;
  width: 6rem;
  height: 5rem;
  line-height: 5rem;
  right: 10px;
  bottom: 0;
  text-align: center;
  border-radius: 1.3rem;
  color: #f40;
}

.product-operates .del {
  left: 0;
  width: 2rem;
  z-index: 2;
}

.product-operates-item {
  box-sizing: border-box;
  position: absolute;
  z-index: 0;
  height: 100%;
  line-height: 5rem;
  top: 0;
}

.product-operates .amount {
  padding: 0 0.3rem;
  background-color: #fff;
  line-height: 3rem;
  width: 6rem;
  height: 3rem;
  left: 50%;
  top: 50%;
  border-radius: 2.5rem;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #333;
}
.product-operates .add {
  right: 0;
  width: 2rem;
  z-index: 2;
}
.product-operates-item .inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  background: #ff4300 url(../../assets/images/product_operate.png) no-repeat
    left center;
  background-origin: border-box;
  background-size: 200% 100%;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: #ffbe89;
}

.product-operates-item.add .inner {
  background-position: right center;
}
</style>
