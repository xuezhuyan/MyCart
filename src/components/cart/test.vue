<template>
  <div>哈哈哈哈</div>
</template>

<script>
/* eslint-disable */
import BeeHead from "../commont/Beehead.vue";
import BeeFooter from "../commont/BeeFooter.vue";
import ProductOperate from "../prodOp/prodOperate.vue";
export default {
  async created() {
    const { ids } = this.$store.getters;
    let res = await this.$axios.get(
      `/api/home?_r=0.10487448529559651&cart_pids=${encodeURIComponent(
        "2435,2436,10645"
      )}&location=121.5721941391567%2C31.21168025925351`
    );
    console.log(res);
  }
};
</script>

<style>
</style>
