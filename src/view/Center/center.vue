<template>
  <div class="centerContainer">
    <!-- header -->
    <div class="header">
      <div class="left">
        <van-image
          class="leftImg"
          round
          width="71"
          height="71"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="text">
          <p>用户</p>
          <p>普通用户</p>
        </div>
      </div>
      <div class="right">
        <img src="~@/assets/login/center-01.jpg" alt="" class="righttopImg" />
        <div class="member">
          <van-image
            class="leftImg"
            round
            width="28"
            height="28"
            :src="require('../../assets/login/member.jpg')"
          />

          <div class="memberRight">
            <p class="text1">Pro会员</p>
            <p class="text2">立即开通</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的资产 -->
    <div class="myMoney">
      <div class="top">我的资产</div>
      <div class="bottom">
        <div class="content">
          <p>￥0</p>
          <p>余额</p>
        </div>
        <div class="content">
          <p>￥0</p>
          <p>红包</p>
        </div>
        <div class="content">
          <p>￥0</p>
          <p>优惠卷</p>
        </div>
        <div class="content">
          <p>￥0</p>
          <p>积分</p>
        </div>
        <div class="content">
          <p>￥0</p>
          <p>礼品卡</p>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <van-grid :gutter="10" column-num="3">
      <van-grid-item icon="balance-list-o" text="订单" />
      <van-grid-item icon="user-circle-o" text="账号管理" />
      <van-grid-item icon="phone-o" text="手机号" />
      <van-grid-item icon="photo-o" text="周六一起拼" />
      <van-grid-item icon="balance-list-o" text="订单" />
      <van-grid-item icon="user-circle-o" text="账号管理" />
      <van-grid-item icon="phone-o" text="手机号" />
      <van-grid-item icon="photo-o" text="周六一起拼" />
      <van-grid-item icon="balance-list-o" text="订单" />
      <van-grid-item icon="user-circle-o" text="账号管理" />
      <van-grid-item icon="phone-o" text="手机号" />
      <van-grid-item icon="photo-o" text="周六一起拼" />
      <van-grid-item icon="balance-list-o" text="订单" />
      <van-grid-item icon="user-circle-o" text="账号管理" />
    </van-grid>
    <van-button size="large" @click="logOut">退出登录</van-button>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Center",
  methods: {
    ...mapActions(["getLogOut", "clearToken"]),
    async logOut() {
      try {
        await this.getLogOut();
        this.clearToken();
        alert("退出成功");
        this.$router.push("/");
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="less">
.centerContainer {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 135px;
    background-color: #f8d48c;
    .left {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 240px;
      height: 135px;
      .leftImg {
        width: 71px;
        height: 71px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 150px;
        p {
          padding: 0;
          margin: 0;
          display: block;
          font-size: 16px;
          text-align: left;
          height: 20px;
          width: 100%;
        }
      }
    }
    .right {
      width: 120px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      .righttopImg {
        position: absolute;
        right: 0;
        width: 32px;
        height: 32px;
      }
      .member {
        position: absolute;
        width: 110px;
        right: -20px;
        bottom: -10px;
        height: 40px;
        border-radius: 20px;
        background-color: #4b433b;
        p {
          padding: 0;
          margin: 0;
          display: block;
          width: 60px;
          height: 20px;
          font-size: 10px;
          color: white;
        }
        .text1 {
          position: absolute;
          right: 10px;
          top: 0;
        }
        .text2 {
          position: absolute;
          right: 10px;
          bottom: 0;
        }
      }
    }
  }
  .myMoney {
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .top {
      width: 90%;
      height: 52px;
      font-size: 20px;
      line-height: 52px;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
    }
    .bottom {
      margin-left: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .content {
        width: 20%;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          padding: 0;
          margin: 0;
          font-size: 10px;
          text-align: center;
          line-height: 20px;
          height: 20px;
        }
      }
    }
  }
  .van-button--large {
    margin-bottom: 60px;
  }
}
</style>