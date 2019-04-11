<template>
  <div class="cart">
    <BeeHead></BeeHead>
    <div class="scroll">
      <div class="block">
        <table class="addr-table">
          <tbody>
            <tr>
              <th width="28%">
                收
                <span class="ui-hidden">a</span>货
                <span class="ui-hidden">a</span>人
              </th>
              <td>刘玺&nbsp;先生</td>
              <td width="17%" rowspan="3" class="more">修改</td>
            </tr>
            <tr>
              <th>
                电
                <span class="ui-hidden">中中</span>话
              </th>
              <td>153********</td>
            </tr>
            <tr>
              <th>收货地址</th>
              <td style="font-weight: 700">上海市浦东新区航头镇航都路18号-黑马程序员</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="main-container">
        <div class="fast_cart">
          <span class="fast-super">闪送超市</span>
          <span class="addBtn">凑单专区</span>
        </div>
        <p class="group-proptext theme-border">￥0起送，22点后满￥69运费5元起，不满￥69运10元起</p>
        <p class="group-receive theme-border">
          收货时间&nbsp;&nbsp;
          <span class="ugroup-receive-ext">&nbsp;可预定</span>
          <span class="theme-redfont">08:00-09:00</span>
        </p>
        <div class="group-comment theme-border">
          收货备注&nbsp;&nbsp;
          <div class="comment-wrapper">
            <input type="text" maxlength="100" value placeholder="可输入100字以内特殊要求内容">
          </div>
        </div>
        <table class="group-list theme-border" width="100%" style="table-layout:fixed;">
          <tbody>
            <!-- <tr style="height:0;">
            <td style="width:5rem"></td>
            <td style="width:5rem"></td>
            <td></td>
            </tr>-->
            <tr class="bor" v-for="item in list" :key="item.id">
              <td
                style="width:5rem"
                class="group-item-checkbox"
                :class="{ active: item.isSelected }"
                @click="toggle(item.id)"
              ></td>
              <td style="width:5rem">
                <div class="group-item-img-wrap">
                  <div class="group-item-img">
                    <img :src="item.img" alt width="100%">
                  </div>
                  <div class="maskText"></div>
                </div>
              </td>
              <td>
                <div class="group-item-name ui-ellipsis">{{ item.name }}</div>
                <div class="group-item-price" width="50px">￥{{ item.price }}</div>

                <ProductOperate v-model="item.count"></ProductOperate>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="settlement">
          <span
            class="selectAll selectAll-false"
            :class="{ 'selectAll-true': $store.getters.isSelectAll }"
            @click="toggleAll"
          >全选</span>
          共:
          <span class="theme-redfont">￥{{totalPrice}}</span>
          <div class="chooseOk">选好了</div>
        </div>
      </div>
    </div>
    <BeeFooter></BeeFooter>
  </div>
</template>
<script>
/* eslint-disable */
import BeeHead from "../commont/Beehead.vue";
import BeeFooter from "../commont/BeeFooter.vue";
import ProductOperate from "../prodOp/prodOperate.vue";

export default {
  created() {
    const { ids, id2Data } = this.$store.getters;
    console.log(ids);
    this.$axios
      .get(
        `/api/home?_r=${Math.random()}&cart_pids=${encodeURIComponent(
          ids
        )}&location=121.5721941391567%2C31.21168025925351`
      )
      // .get(`http://m.beequick.cn/data/home?_r=0.10487448529559651&cart_pids=${encodeURIComponent(ids)}&location=121.5721941391567%2C31.21168025925351`)
      .then(res => {
        console.log(res);
        this.list = res.data.data.cart_ids.map(item => {
          return {
            // 遍历item  分别添加当前商品的数量  选中状态
            ...item,
            count: id2Data[item.id].count,
            isSelected: id2Data[item.id].isSelected
          };
        });

        // console.log(this.$store.getters.id2Data)
      });
  },
  watch: {
    // 深度监听商品的变化 当list发生变化时执行handler
    list: {
      //curList 新添加或减少的商品
      handler(curList) {
        curList.some((item, index) => {
          if (item.count <= 0) {
            curList.splice(index, 1);
            return true;
          }
        });

        const cartList = curList.map(item => {
          return {
            id: item.id,
            count: item.count,
            isSelected: item.isSelected
          };
        });
        // console.log(cartList); 新加的商品信息
        // 1.触发vuex里面updateCart函数   把cartList传进去
        this.$store.commit("updateCart", cartList);
      },
      deep: true
    }
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    // 计算总价格
    totalPrice() {
      return this.list.reduce((price, item) => {
        if (item.isSelected) {
          price += item.count * item.price;
        }
        return price;
      }, 0);
    }
  },
  methods: {
    // 单选状态
    toggle(id) {
      console.log(11);

      const curGoods = this.list.find(item => item.id === id);
      // console.log(curGoods); 当前商品的信息

      curGoods.isSelected = !curGoods.isSelected;
    },
    toggleAll() {
      console.log(1);

      this.list.forEach(item => {
        item.isSelected = !this.$store.getters.isSelectAll;
        console.log(item.isSelected);
      });
    }
  },
  components: {
    BeeHead,
    BeeFooter,
    ProductOperate
  }
};
</script>

<style lang="less" scoped>
.cart {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.pub-header {
  position: relative;
  height: 4.5rem;
  line-height: 4.5rem;
  background-color: #f9fafd;
  z-index: 2;

  .header-content {
    position: absolute;
    font-size: 1.4rem;
    top: 0;
    bottom: 0;
    left: 6rem;
    right: 6rem;
    text-align: center;
    font-weight: 700;
  }
}

.block {
  background-color: #fff;
  margin: 1rem 0;
  display: block;
  background-image: url("../../assets/images/place.png");
  background-repeat: repeat;
  background-position: left top, left bottom;
  background-size: auto 0.3rem;
  padding: 3px 0;

  table {
    width: 100%;
    line-height: 1.4rem;
    background-color: white;
    border-collapse: collapse;
    border-spacing: 0;

    th {
      padding: 0.7rem 1rem 0.7rem 1.5rem;
      font-weight: 400;
      text-align: left;
      vertical-align: baseline;
    }

    td {
      padding: 0.7rem 0;
    }

    .more {
      background-image: url("../../assets/images/more.png");
      padding-right: 2.5rem;
      background-position: right center;
      background-repeat: no-repeat;
      background-size: auto 1rem;
    }
  }
}

.ui-hidden {
  visibility: hidden;
}

.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 5rem;
  background-color: #efefef;

  &.scroll::-webkit-scrollbar {
    width: 0px;
  }
}

.main-container {
  padding: 0.5rem 0 0 0;
  background-color: white;
  position: relative;

  .fast-super {
    display: inline-block;
    height: 3rem;
    color: #999;
    font-size: 12px;
    padding-left: 1.4rem;
    background: 1.6rem top no-repeat;
    background-size: 2rem;
    line-height: 3rem;

    &:before {
      background-color: #ffd600;
      content: "";
      display: inline-block;
      width: 0.3rem;
      height: 1.2rem;
      vertical-align: -0.1rem;
      border-radius: 0.2rem;
      margin-right: 0.5rem;
    }
  }

  .addBtn {
    color: #e64f1a;
    position: absolute;
    right: 1.4rem;
    top: 0.5rem;
    font-size: 12px;
    width: 5rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 1.2rem;
    border-width: 1px;
    border-style: solid;
    text-align: center;
  }

  .group-proptext {
    color: #999;
    font-size: 14px;
    line-height: 3rem;
    padding-left: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .group-receive {
    position: relative;
    padding-left: 1.4rem;
    height: 4rem;
    line-height: 4rem;
    padding-right: 2.5rem;
    background-image: url("../../assets/images/more.png");
    background-position: right center;
    background-repeat: no-repeat;
    background-size: auto 1rem;

    .ugroup-receive-ext {
      float: right;
    }
  }

  .group-comment {
    position: relative;
    padding-left: 1.4rem;
    height: 4rem;
    line-height: 4rem;

    .comment-wrapper {
      position: absolute;
      left: 7rem;
      top: 0;
      bottom: 0;
      right: 2.2rem;

      input {
        width: 100%;
        height: 2.3rem;
        border: solid 1px #cecece;
        text-indent: 0.5rem;
        border-radius: 0.5rem;
        -webkit-appearance: none;
      }
    }
  }

  .group-list {
    table-layout: fixed;
    line-height: 4rem;

    .group-item-checkbox {
      background-image: url("../../assets/images/check.png");
      background-size: 1.8rem 1.8rem;
      background-repeat: no-repeat;
      background-position: center center;
      width: 5rem;
    }

    .active {
      background-image: url("../../assets/images/checked.png");
      background-size: 1.8rem 1.8rem;
      background-repeat: no-repeat;
      background-position: center;
    }

    tr {
      td {
        position: relative;

        .cartcontrol {
          background-color: transparent;
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: pointer;
          padding: 3px;
          height: 38px;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

          .cart-count {
            display: inline-block;
            line-height: 30px;
            vertical-align: middle;
          }

          .cart-add {
            display: inline-block;
            line-height: 30px;
            vertical-align: middle;
            background: #ff4300 url("../../assets/images/pro.png") no-repeat
              right center;
            background-origin: border-box;
            background-size: 200% 100%;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #ffbe89;
          }

          .ball-container {
            display: inline-block;
            transition: all 0.5s;

            .ball {
              position: fixed;
              right: 25%;
              bottom: 4.5rem;
              z-index: 1000;
              transition: all 0.5s cubic-bezier(0.9, 0, 0.745, 0.715); /* 贝塞尔曲线 */

              .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #ff4300;
                transition: all 0.5s linear;
              }
            }
          }

          .cart-minus {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #ff4300 url("../../assets/images/pro.png") no-repeat
              left center;
            background-origin: border-box;
            background-size: 200% 100%;
            border: 1px solid #ffbe89;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
            transition: all 0.4s linear;

            &.move-transition {
              opacity: 1;
              transform: translate3D(0, 0, 0);
            }

            &.move-enter,
            &.move-leave {
              opacity: 0;
              transform: translate3D(24px, 0, 0);
            }
          }
        }
      }
    }
  }

  .group-item-img-wrap {
    background-size: 100% 100%;
    width: 5rem;
    height: 5rem;
    position: relative;

    .group-item-img {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
    }
  }

  .group-item-name {
    line-height: 2.6rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.settlement {
  padding-left: 1.8rem;
  line-height: 4.5rem;
  font-size: 16px;

  .checked {
    height: 4.5rem;
    display: inline-block;
    min-width: 3rem;
    padding-left: 2.5rem;
    background-image: url("../../assets/images/check.png");
    background-size: 1.8rem 1.8rem;
    background-repeat: no-repeat;
    background-position: left center;
  }

  .chooseOk {
    float: right;
    width: 8rem;
    text-align: center;
    background-color: #ffd600;
  }
}

.theme-border {
  border-bottom: 1px solid #e0e0e0 !important;
}

.theme-redfont {
  color: #e64f1a;
}
</style>
<style>
.selectAll {
  display: inline-block;
  min-width: 5rem;
  padding-left: 2.5rem;
  background-size: 1.8rem 1.8rem;
  background-repeat: no-repeat;
  background-position: left center;
}
.selectAll-false {
  background-image: url(../../assets/images/check.png);
}
.selectAll-true {
  background-image: url(../../assets/images/checked.png);
}
</style>
