<template>
  <div>
    <div class="header">
      <van-nav-bar title="支付订单" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 订单进度 -->
    <van-steps :active="active">
      <van-step>提交订单</van-step>
      <van-step>待支付</van-step>
      <van-step>支付成功</van-step>
      <van-step>交易完成</van-step>
    </van-steps>

    <!-- 倒计时 -->
    <div class="countdown">
      <div style="margin: 5px 0">订单编号:5424<br />支付剩余时间</div>
      <van-count-down :time="time">
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <!-- 商品信息 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <!-- 支付方式 -->
    <van-cell title="推荐支付方式" />
    <van-radio-group v-model="radio" checked-color="tomato">
      <van-cell-group>
        <van-cell
          title-class="payTitle"
          icon="alipay-o"
          clickable
          @click="radio = '1'"
        >
          <template #title>
            <van-icon name="alipay" color="#5a9ef7" size="30" />
            <span class="custom-title"> &nbsp 使用支付宝支付</span>
          </template>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title-class="payTitle" clickable @click="radio = '2'">
          <template #title>
            <van-icon name="wechat" color="#28c445" size="30" />
            <span class="custom-title"> &nbsp 使用微信支付</span>
          </template>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title-class="payTitle" clickable @click="radio = '3'">
          <template #title>
            <van-icon name="card" color="#0367fd" size="30" />
            <span class="custom-title"> &nbsp 使用银联支付</span>
          </template>
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 支付按钮 -->
    <van-button
      @click="toPay"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      type="primary"
      size="large"
      >支付</van-button
    >

    <!-- 支付弹窗 -->
    <van-dialog
      v-model="showPay"
      confirm-button-text="我已支付"
      cancel-button-text="遇到问题"
      title="请使用微信扫码支付"
      show-cancel-button
      :before-close="close"
      @confirm="confirm"
      @cancel="cancel"
    >
      <img :src="payImg" class="payQrCode" />
    </van-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { reqOrderInfo, requestOrderStatus } from "@/api/pay.js";
import { Notify, Toast } from "vant";

export default {
  name: "Pay",
  data() {
    return {
      active: 1,
      activeNames: ["1"],
      radio: "1",
      time: 900000,

      showPay: false,
      skuInfo: {},
      orderId: 5765,
      payDetail: {},
      payImg: "",
      payCode: "",
      timer: null,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/shopcart");
    },

    // 请求支付的二维码
    async getorderInfo() {
      try {
        const result = await reqOrderInfo(this.orderId);
        if (result.code === 200) {
          this.payDetail = result.data;
        } else {
          Notify({ type: "danger", message: "获取支付信息失败" });
        }
      } catch (error) {
        Notify({ type: "danger", message: "请求支付信息失败" });
      }
    },

    // 支付
    async toPay() {
      this.showPay = true;
      //生成支付二维码
      this.payImg = await QRCode.toDataURL(this.payDetail.codeUrl);

      //轮询检测支付状态
      if (!this.timer) {
        this.timer = setInterval(async () => {
          try {
            const re = await requestOrderStatus(this.orderId);
            //先保存支付状态
            this.payCode = re.code;
            //如果已经支付 则跳转到支付成功页面
            if (re.code === 200) {
              Notify({ type: "success", message: "支付成功" });
              this.active = 2;
              clearInterval(this.timer);
              this.timer = null;
              this.payCode = 0;
              this.$router.push("/paysuccess");
            }
          } catch (error) {
            Notify({ type: "danger", message: "检测支付信息失败" });
          }
        }, 1000);
      }
    },
    // 点击确定
    confirm() {
      if (this.payCode === 200) {
        Notify({ type: "success", message: "支付成功" });
        clearInterval(this.timer);
        this.active = 2;
        this.timer = null;
        this.payCode = 0;
        this.$router.push("/paysuccess");
      } else {
        close();
        Toast.fail("滚蛋，赶紧付钱");
      }
    },
    // 点击取消
    cancel() {
      Toast.fail("取消支付");
      // 清除定时器
      clearInterval(this.timer);
      this.timer = null;
      this.showPay = false;
    },
    // 判断是否关闭弹窗
    close(action, done) {
      done(false);
    },
  },
  mounted() {
    this.orderId = this.$route.query.orderNo;
    this.skuInfo = JSON.parse(localStorage.getItem("goods_key"));
    this.getorderInfo();
  },
};
</script>

<style lang="less" scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.countdown {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.payTitle {
  font-size: 16px;
  line-height: 20px;
}
.payQrCode {
  text-align: center;
  margin: 0 80px;
}

::v-deep .van-button {
  margin-top: 1rem;
}

::v-deep .van-cell {
  line-height: 33px;
}
</style>
