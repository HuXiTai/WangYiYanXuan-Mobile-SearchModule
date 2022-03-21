<template>
  <div class="register">
    <van-form>
      <van-field
        v-model="phone"
        name="pattern"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="mini" @click="getVerifyCode">发送验证码</van-button>
        </template>
      </van-field>
      <van-field
        v-model="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
      />
      <van-field
        v-model="againPassword"
        name="againPassword"
        label="再次确认密码"
        placeholder="确认密码"
      />
      <van-field name="checkbox">
        <template #input>
          <van-checkbox v-model="checkbox" shape="square">我同意</van-checkbox>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="danger"
          native-type="submit"
          @click="regitser"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getVerify } from "@/api/login";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      phone: "13419565052",
      password: "",
      code: "",
      againPassword: "",
      checkbox: "",
    };
  },
  methods: {
    // 获取手机验证码
    async getVerifyCode() {
      try {
        const re = await getVerify(this.phone);
        this.code = re.data;
      } catch (e) {
        console.log(e.message);
      }
    },
    // 注册
    ...mapActions("register", ["getUserRegister"]),
    async regitser() {
      const { password, againPassword, code, phone, checkbox } = this;
      if (password && code && phone && checkbox && password === againPassword) {
        try {
          await this.getUserRegister({ password, code, phone });

          //注册成功后跳转到登录页
          this.$router.push("/login");
        } catch (e) {
          console.log(e.message);
        }
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>