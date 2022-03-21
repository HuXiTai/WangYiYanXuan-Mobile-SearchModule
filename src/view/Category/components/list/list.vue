<template>
  <div class="contaier">
    <!-- 导航栏 -->

    <HeaderNav></HeaderNav>
    <!-- <van-sticky :offset-top="50"> -->
    <van-tabs
      sticky
      :offset-top="40"
      animated
      v-model="navIndex"
      @click="changeNav"
    >
      <van-tab
        v-for="(nav, index) in navList"
        :key="nav.id"
        :title="nav.name"
        :name="index"
      >
        <!-- 内容 -->
        <div class="header">{{ showIndex.name }}</div>
        <div class="content">
          <div class="item" v-for="item in itemList" :key="item.id" @click="toDetail">
            <img class="itemImg" v-lazy="item.listPicUrl" />
            <van-tag
              v-show="item.promDesc"
              class="promdesc"
              plain
              round
              color="tomato"
              type="primary"
              >{{ item.promDesc }}</van-tag
            >
            <div class="text">
              <span class="title">{{ item.name }}</span>
              <span>
                <span class="priceText"
                  >到手价￥
                  <span class="price">{{ item.retailPrice }}</span>
                </span>
                <span class="origin">￥{{ item.sortOriginPrice }}</span>
              </span>
              <van-tag
                v-if="
                  (item.finalPriceInfoVO.banner || {}).title &&
                  (item.finalPriceInfoVO.banner || {}).content
                "
                class="tag"
                round
                type="primary"
                text-color="#fa1e32"
                color="#ffe9eb"
                ><van-tag round type="primary" color="#fa1e32">{{
                  (item.finalPriceInfoVO.banner || {}).title
                }}</van-tag
                >{{ (item.finalPriceInfoVO.banner || {}).content }}</van-tag
              >
              <van-tag
                v-else-if="(item.finalPriceInfoVO.banner || {}).content"
                class="tag1"
                round
                type="primary"
                color="#fa1e32"
                >{{ (item.finalPriceInfoVO.banner || {}).content }}</van-tag
              >
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- bottom -->
    <div class="bottom">
      <span>更多内容，敬请期待</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Notify } from "vant";
export default {
  name: "List",
  data() {
    return {
      obj: {},
      navIndex: 0,
      navList: [],
    };
  },
  methods: {
    ...mapActions("category", ["getIntoCategorList"]),
    // 请求内容区的数据
    async getCategoryListContent() {
      try {
        await this.getIntoCategorList(this.obj);
        this.categoryNavList();
      } catch (error) {
        Notify({ type: "danger", message: "获取分类列表数据失败" });
      }
    },
    // Nav导航的数据
    categoryNavList() {
      let index = this.categoryL2List.findIndex((item) => {
        return this.showIndex.id === item.id;
      });
      this.navList = this.categoryL2List.slice(index);
      console.log(this.showIndex.id, index, "navIndex");
    },
    // 切换Nav某一项时，请求内容数据
    async changeNav(name) {
      this.obj = {
        categoryId: this.navList[name].superCategoryId,
        subCategoryId: this.navList[name].id,
      };
      localStorage.setItem("category_nav", JSON.stringify(this.obj));
      try {
        await this.getCategoryListContent(this.obj);
      } catch (error) {
        Notify({ type: "danger", message: "切换分类列表失败" });
      }
    },

    toDetail(){
      this.$router.push("/detail")
    }
  },
  computed: {
    ...mapGetters("category", ["showIndex", "categoryL2List", "itemList"]),
  },
  beforeMount() {
    // 获取请求需要的ID
    this.obj = JSON.parse(localStorage.getItem("category_nav"));
  },
  mounted() {
    this.getCategoryListContent();
    // this.categoryNavList();
  },
};
</script>

<style lang="less" scoped>
.contaier {
  background-color: #eeeeee;
  .header {
    width: 100%;
    text-align: center;
    color: #333;
    font-size: 14px;
    margin-top: 1.3rem;
    padding-top: 0.3rem;
    background-color: #fff;
  }
  .content {
    padding: 0.1rem;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    .item {
      display: flex;
      flex-direction: column;
      width: 46%;
      padding-left: 10px;
      margin: 0.5rem 0;
      position: relative;
      .itemImg {
        width: 100%;
        height: 4.5rem;
        border-radius: 8px;
      }
      .promdesc {
        width: 1.33rem;
        height: 0.53rem;
        margin-left: 20rpx;
        position: absolute;
        left: 0.53rem;
        top: 3.6rem;
      }
      .text {
        display: flex;
        flex-direction: column;
        .title {
          color: #12161c;
          font-size: 15px;
          margin-top: 5px;
        }
        .priceText {
          color: #fa1e32;
          font-size: 12px;
        }
        .price {
          color: #fa1e32;
          font-size: 20px;
        }
        .origin {
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }
        .tag {
          height: 0.61rem;
          margin: 5px 0 0 -5px;
          word-wrap: none;
        }
        .tag1 {
          width: 1.96rem;
          height: 0.61rem;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    text-align: center;
  }
}
</style>
