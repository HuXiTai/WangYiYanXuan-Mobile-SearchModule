<template>
  <div class="loginContainer">
    <HeaderNav></HeaderNav>

    <div class="title">
      <img src="@/assets/login/login-02.png" alt="" />
    </div>
    <!-- 选择登录方式 -->
    <div class="loginMethods" v-show="!isShowPhone && !isShowEmail">
      <van-button
        type="danger"
        size="large"
        block
        @click="toPhoneLogin"
        icon="phone-o"
        >手机号快捷登录</van-button
      >
      <van-button
        size="large"
        block
        @click="toEmailLogin"
        icon="envelop-o
"
        >邮箱验证登录</van-button
      >
    </div>
    <!-- 验证码或则密码登录 -->
    <div v-show="isShowPhone" class="Login">
      <van-form>
        <van-field
          v-model="phone"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="verify"
          v-show="useVerify"
          name="verify"
          center
          clearable
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="mini">发送验证码</van-button>
          </template>
        </van-field>

        <van-field
          v-show="usePassword"
          v-model="password"
          type="password"
          name="password"
          center
          clearable
          placeholder="请输入密码"
        >
        </van-field>

        <div class="text">
          <a class="left" href="javascript:;" @click="toRegister">注册</a>
          <a class="right" @click="toPassword" v-show="useVerify">
            使用验证码登录
          </a>
          <a @click="toverify" v-show="usePassword">使用密码登录</a>
        </div>
        <div style="margin: 16px" class="sub">
          <van-button type="danger" size="large" block @click="passwordLogin"
            >登录</van-button
          >
        </div>

        <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checkbox" shape="square"
              >我同意</van-checkbox
            >
          </template>
        </van-field>
      </van-form>

      <div class="others" @click="toLoginMothods">其他登录方式></div>
    </div>
    <!-- 邮箱登录 -->
    <!-- <div v-show="isShowEmail" class="Login">
      <van-form>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="邮箱账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          name="password"
          center
          clearable
          placeholder="密码"
          type="password"
        >
          <template #button>
            <van-button size="mini">发送验证码</van-button>
          </template>
        </van-field>
        <div class="text">
          <a class="left">注册账号</a>
          <a class="right">忘记密码</a>
        </div>
        <div style="margin: 16px" class="sub">
          <van-button type="danger" size="large" block 
            >登录</van-button
          >
        </div>

        <van-field name="checkbox">
          <template #input>
            <van-checkbox v-model="checkbox" shape="square"
              >我同意</van-checkbox
            >
          </template>
        </van-field>
      </van-form>

      <div class="others" @click="toLoginMothods">其他登录方式></div>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      checkbox: false,
      password: "238816",
      phone: "15874649652",
      verify: "",
      isShowPhone: false,
      isShowEmail: false,
      usePassword: false,
      useVerify: true,
    };
  },
  mounted() {
    console.dir(this);
  },
  methods: {
    ...mapActions("user", ["getUserLogin"]),
    toPhoneLogin() {
      this.isShowPhone = true;
    },
    toEmailLogin() {
      this.isShowEmail = true;
    },
    toLoginMothods() {
      this.isShowPhone = false;
      this.isShowEmail = false;
    },
    // 使用密码登录
    toPassword() {
      this.useVerify = false;
      this.usePassword = true;
      this.verify = "";
      this.username = "";
    },
    toverify() {
      this.usePassword = false;
      this.useVerify = true;
      this.password = "";
      this.username = "";
    },
    // 去注册
    toRegister() {
      this.$router.push("/register");
    },
    // 登录
    async passwordLogin() {
      const { phone, password } = this;
      if (phone && password) {
        try {
          await this.getUserLogin({ phone, password });
          alert("登录成功");
          this.$router.push("/center");
        } catch (e) {
          alert(e.message);
        }
      } else {
        alert("不能有空的啊");
      }
    },
  },
};
</script>

<style lang="less">
.loginContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px auto;
  }
  .loginMethods {
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 60rpx;
    .van-button--block {
      width: 90%;
    }
  }
  .Login {
    width: 90%;
    height: 300px;
    .van-form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .sub {
        width: 90%;
      }
      .text {
        height: 22px;
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        width: 90%;
        a {
          height: 22px;
          font-size: 10px;
        }
      }
    }
    .others {
      margin: 50px 0;
      height: 30px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>