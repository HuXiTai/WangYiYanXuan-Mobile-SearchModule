<template>
  <div>
    <van-tabbar route fixed>
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/deserve" icon="bag-o"
        >值得买</van-tabbar-item
      >
      <van-tabbar-item replace to="/shopcart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/center" icon="contact"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
</style>