<template>
  <div>
    <van-nav-bar title="网易严选" left-arrow fixed>
      <template #right>
        <van-icon name="search" size="32" color="#5d635c" @click="toSearch" />
        <van-icon
          name="shopping-cart-o"
          size="32"
          color="#5d635c"
          @click="tocart"
        />
      </template>
      <template #left>
        <van-icon name="wap-home-o" size="24" color="#5d635c" @click="toHome" />
      </template>
    </van-nav-bar>
  </div>
</template>


<script>
export default {
  methods: {
    toHome() {
      this.$router.push("/home");
    },
    toSearch() {
      this.$router.push("/search");
    },
    tocart() {
      this.$router.push("/shopcart");
    },
  },
};
</script>

<style lang="less">
.van-nav-bar {
  height: 44px !important;
  .van-nav-bar__content {
    height: 44px;
  }
}
</style>