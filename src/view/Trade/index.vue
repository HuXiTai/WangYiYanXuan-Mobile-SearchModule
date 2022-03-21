<template>
  <div class="tradeContainer">
    <HeaderNav></HeaderNav>
    <van-notice-bar
      left-icon="volume-o"
      text="因疫情影响，部分地区无法配送公告"
    />
    <div class="icon"></div>
    <van-cell
      title="张三 13700110011"
      value=""
      label="默认"
      class="address"
      is-link
    />
    <van-coupon-cell class="coupons" title="暂无可用优惠券" />

    <van-cell clickable title="" @click="radio = '1'" is-link>
      <template #icon>
        <van-radio name="1" shape="square" disabled
          >礼品卡余额：¥0.00</van-radio
        >
      </template>
    </van-cell>
    <van-cell clickable @click="radio = '1'">
      <template #icon>
        <van-radio name="1" shape="square" disabled>余额：¥0.00</van-radio>
      </template>
    </van-cell>

    <van-cell-group class="group">
      <van-cell title="商品合计" value="¥65.80" />
      <van-cell title="邮费" value="¥8" />
      <van-cell title="活动优惠" value="-¥6.00" />
      <van-cell title="优惠券" value="¥00.00" />
      <!-- <van-cell clickable @click="radio = '1'" is-link title="">
        <template #icon>
          <van-radio name="1" shape="square">我要开发票</van-radio>
        </template>
      </van-cell> -->
    </van-cell-group>

    <van-cell-group class="group">
      <van-cell title="包裹1 15:30前支付, 预计3月22日送达" />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      />
    </van-cell-group>
    <van-radio-group v-model="radio" direction="horizontal" class="agreen">
      <van-radio name="1" class="checked" shape="square"
        >我同意 《网易严选服务协议》</van-radio
      >
    </van-radio-group>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      radio: 1,
    };
  },
  methods: {
    ...mapActions("detail", ["getTradeInfo", "getOrderNo"]),
    async onSubmit() {
      const tradeNo = this.tradeInfo.tradeNo;
      const orderInfo = {
        consignee: this.defalutAdd.consignee,
        consigneeTel: this.defalutAdd.phoneNum,
        deliveryAddress: this.defalutAdd.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.message,
        orderDetailList: this.tradeInfo.detailArrayList,
      };

      //提交了订单 得到了订单号
      try {
        const re = await this.getOrderNo({ tradeNo, orderInfo });
        this.orderNo = re;
      } catch (e) {
        alert(e.message);
        return;
      }
      this.$router.push({
        path: "/pay",
        query: {
          orderNo: this.orderNo,
        },
      });
    },
  },
  mounted() {
    this.getTradeInfo();
  },
  computed: {
    ...mapState("detail", ["tradeInfo", "tradeAddress"]),
    defalutAdd() {
      return (
        this.tradeAddress.find((item) => {
          return item.isDefault === "1";
        }) || {}
      );
    },
  },
};
</script>

<style lang="less">
.tradeContainer {
  .icon {
    border-top: 10px solid #f4f4f4;
    background: url(../../assets/address.webp) repeat-x;
    height: 4px;
  }
  .coupons {
    border-top: 10px solid #f4f4f4;
  }
  .group {
    border-top: 10px solid #f4f4f4;
  }
  .agreen {
    font-size: 14px;
    margin-top: 20px;

    .checked {
      margin-left: 10px;
    }
  }
}
</style>
