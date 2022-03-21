<template>
  <div>
    <van-nav-bar title="支付成功" left-arrow @click-left="onClickLeft" />
    <van-steps :active="active">
      <van-step>提交订单</van-step>
      <van-step>待支付</van-step>
      <van-step>支付成功</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <div class="prompt">
      <span>支付成功</span>
      <span>确定收货后可得5积分</span>
      <span>预计3月23日送达</span>
    </div>

    <div class="bottom">
      <span @click="toHome">回到首页</span>
      <span @click="onSelect">分享订单</span>
    </div>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Paysuccess",
  data() {
    return {
      active: 3,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/center");
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = true;
    },
    toHome(){
      this.$router.push("/home");

    }
  },
};
</script>

<style lang="less" scoped>
.prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    color: tomato;
    font-size: .58rem;
    font-weight: bold;
  }
  span {
    font-size: 12px;
    margin: .13rem 0;
  }
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  span {
    width: 2.8rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    border: 2px solid #999999;
    border-radius: .13rem;
    margin: .53rem .5rem;
    color: #333;
    font-size: 15px;
    // font-weight: bold;
  }
}
</style>
