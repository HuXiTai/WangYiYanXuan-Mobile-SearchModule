<template>
  <div class="shopcartContainer">
    <HeaderNav></HeaderNav>
    <van-cell title="购物车" value="编辑" class="header" />
    <van-cell title="自营仓商品，再购69.1元免邮" is-link class="headerAD" />
    <div class="hd" v-for="goods in cartInfoList" :key="goods.id">
      <div class="hdLeft">
        <van-checkbox
          v-model="goods.isChecked === 1"
          checked-color="#ee0a24"
          @click="changeIsCheck(goods)"
        ></van-checkbox>
      </div>

      <div>
        <van-card
          class="goodsCard"
          :num="goods.skuNum"
          :price="goods.cartPrice"
          :desc="goods.skuName"
          :title="goods.skuName"
          :thumb="goods.imgUrl"
        >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-stepper
              v-model="goods.skuNum"
              min="0"
              @change="deleted(goods)"
            />
          </template>
        </van-card>
      </div>

      <van-submit-bar
        :price="allMoney"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="isAllChecked"
          >全选已选({{ allSkuNum }})</van-checkbox
        >
        <template #tip>
          你的收货地址不支持同城送, <span>修改地址</span>
        </template>
      </van-submit-bar>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    ...mapActions("detail", [
      "getShopList",
      "getCheckedGoods",
      "getChangeAllChecked",
      "getDeleteGoods",
    ]),
    //改变单个
    async changeIsCheck(cartInfo) {
      try {
        await this.getCheckedGoods({
          skuID: cartInfo.skuId,
          isChecked: cartInfo.isChecked ? 0 : 1,
        });
        this.getShopList();
      } catch (e) {
        console.log("修改单个失败");
      }
    },
    //删除单个商品
    async deleted(goods) {
      console.log(111);
      if (goods.skuNum === 0) {
        try {
          await this.getDeleteGoods(goods.skuId);
          this.getShopList();
        } catch (error) {
          console.log("删除单个失败");
        }
      }
    },
    onSubmit() {
      this.$router.push({
        name: "trade",
      });
    },
  },
  mounted() {
    this.getShopList();
  },
  computed: {
    ...mapGetters("detail", ["shopCartListPre"]),
    //购物车列表
    cartInfoList() {
      return this.shopCartListPre.cartInfoList || [];
    },
    //计算已选择的价钱
    allMoney() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.cartPrice * item.skuNum * 100;
        }
        return prev;
      }, 0);
    },
    // 已选择的数量
    allSkuNum() {
      return this.cartInfoList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum : p;
      }, 0);
    },
    checkedNum() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.count;
        }
        return prev;
      }, 0);
    },
    //修改所有的选择状态
    isAllChecked: {
      get() {
        return (
          this.cartInfoList.every((item) => {
            return item.isChecked === 1;
          }) && this.cartInfoList.length
        );
      },
      async set(value) {
        try {
          await this.getChangeAllChecked({
            isChecked: value ? 1 : 0,
            skuIdList: this.cartInfoList.reduce((p, c) => {
              p.push(c.skuId);
              return p;
            }, []),
          });
          this.getShopList();
        } catch (e) {
          alert("修改全部失败");
        }
      },
    },
  },
};
</script>

<style lang="less">
.shopcartContainer {
  .header {
    font-size: 18px;
    border-bottom: 1px solid #000;
  }
  .headerAD {
    background-color: #fff8d8;
    color: #fbaf52;
  }
  .hd {
    display: flex;
    // justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-top: 10px solid #eeeeee;
    .goodsCard {
      // flex: 1;
      background-color: #fff;
      width: 350px;
    }
  }
}
</style>