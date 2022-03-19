<template>
  <div class="homeContainer">
    <div class="box">wwww</div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="warning">警告按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="less">
.homeContainer {
  .box {
    width: 10rem;
    height: 100px;
    background: red;
  }
}
</style>