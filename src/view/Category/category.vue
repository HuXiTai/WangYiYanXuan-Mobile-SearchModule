<template>
  <div class="container">
    <van-search placeholder="请输入搜索关键词" input-align="center" />
    <div class="category">
      <!-- 左侧导航条 -->

      <ul class="nav">
        <li
          @click="changeIndex(index)"
          class="navItem"
          :class="index === currentIndex && 'active'"
          v-for="(nav, index) in navList"
          :key="index"
        >
          {{ nav.name }}
        </li>
      </ul>
      <!--  <van-sidebar v-model="activeKey" @change="changeIndex">
        <van-sidebar-item :title="nav.name" v-for="(nav, index) in navList"/>
      </van-sidebar> -->
      <!-- 右侧内容区 -->
      <div class="content">
        <van-image width="100%" height="2.5rem" :src="contentImg" lazy-load />
        <div v-for="(GroupList, index) in contentList" :key="index">
          <h5 class="title">{{ GroupList.name }}</h5>
          <van-grid :border="false" :column-num="3" icon-size="1.95rem">
            <van-grid-item
              v-for="item in GroupList.categoryList"
              :key="item.id"
              :icon="item.wapBannerUrl"
              :text="item.name"
              @click="toCateList(item)"
              :to="{
                name: 'categoryList',
              }"
            />
          </van-grid>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Notify, Toast } from "vant";
export default {
  name: "Category",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    ...mapActions("category", ["getCategoryList", "getCategoryContentList"]),
    // 改变选中样式 获取id发送切换列表的请求
    async changeIndex(index) {
      this.currentIndex = index;
      let id = this.navList[index].id;
      // 根据分类ID获取分类的列表
      try {
        await this.getCategoryContentList(id);
      } catch (error) {
        Notify({ type: "danger", message: "获取分类内容失败" });
      }
    },
    // 跳转分类列表页面 参数使用本地存储保存
    toCateList(item) {
      let obj = {
        categoryId: item.superCategoryId,
        subCategoryId: item.id,
      };
      localStorage.setItem("category_nav", JSON.stringify(obj));
    },
  },
  computed: {
    ...mapGetters("category", ["navList", "contentImg", "contentList"]),
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>

<style lang="less" scoped>
.container {
  .category {
    width: 100%;
    height: 100%;
    display: flex;
    border-top: 1px solid #d9d9d9;

    .nav {
      display: flex;
      flex-direction: column;
      width: 1.62rem;
      height: 100%;
      padding: 0.4rem 0.1rem;
      margin-right: 0.3rem;
      .navItem {
        width: 2rem;
        height: 0.6rem;
        color: #333;
        font-size: 0.4rem;
        line-height: 0.6rem;
        text-align: center;
        margin: 0.2rem 0;
        &.active {
          color: #ab2b2b;
          border-left: 3px solid #ab2b2b;
        }
      }
    }

    .content {
      height: calc(100vh - 2rem);
      overflow: auto;
      flex-shrink: 1;
      padding: 0.3rem 0.3rem 0.21rem;
      border-left: 1px solid #d9d9d9;
      .title {
        columns: #333;
        padding: 0.2rem 0rem;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
