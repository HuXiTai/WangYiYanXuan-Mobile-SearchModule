<template>
  <div class="searchContainer">
    <!-- 搜索框 -->
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @input="debounce"
    />

    <!-- 搜索详情内容 -->
    <SearchContent />

    <!-- 搜索结果 -->
    <div
      class="searchResult"
      v-show="searchVal && !searchGoodsList.directlyList"
    >
      <van-cell
        v-for="realTimeKey of realTimeKeyList"
        :key="realTimeKey"
        :title="realTimeKey"
        @click="toGoods(realTimeKey)"
      />
    </div>

    <!-- 历史记录 -->
    <div
      class="records"
      v-show="records.length && !searchVal && !searchGoodsList.directlyList"
    >
      <van-divider dashed>历史记录</van-divider
      ><van-icon name="delete-o" @click="deleteRecords" />
      <van-tag
        v-for="item of records"
        :key="item"
        type="primary"
        closeable
        size="large"
        @click="recordsToGoods(item)"
        @close="close(item)"
        >{{ item }}</van-tag
      >
    </div>

    <!-- 热门搜索 -->
    <div class="hotSearch" v-show="!searchVal && !searchGoodsList.directlyList">
      <van-divider dashed>热门搜索</van-divider>
      <van-tag
        v-for="key of hotkey"
        :key="key.keyword"
        color="#ffe1e1"
        text-color="#ad0000"
        size="large"
        @click="hotToGoods(key.keyword)"
        >{{ key.keyword }}</van-tag
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import SearchContent from "./SearchContent/SearchContent.vue";
import debounce from "lodash/debounce";
export default {
  name: "Search",
  data() {
    return {
      searchVal: "",
      records: [],
      localStorageRecords: "",
    };
  },
  components: {
    SearchContent,
  },
  mounted() {
    this.getHotKey();

    //查看本地存储是否有记录
    if (!this.getStorage()) {
      //如果没有则添加本地存储
      this.setStorage({ records: [] });
    } else {
      this.records = this.getStorage();
    }
  },
  methods: {
    //搜索按下enter键时
    onSearch() {
      console.log("search");
    },
    //搜索取消时候
    onCancel() {
      console.log("cancel");
      // this.DELETE_GOODS();
      if (this.searchGoodsList.directlyList) {
        this.DELETE_GOODS();
      } else {
        this.$router.back();
      }
    },
    //关掉一项历史记录时
    close(value) {
      const re = this.getStorage();
      const re2 = re.filter((item) => item !== value);
      this.setStorage({ records: re2 });
      this.records = this.getStorage();
    },
    //获取热门搜索
    ...mapActions("search", ["getHotKey"]),
    ...mapActions("search", ["getRealTimeKeyList"]),
    ...mapActions("search", ["getSearchGoods"]),
    ...mapMutations("search", ["DELETE_GOODS"]),

    //点击搜索关键字时
    toGoods(realTimeKey) {
      //为本地历史记录添加数据
      const re = this.getStorage();
      this.searchVal = realTimeKey;

      this.getSearchGoods({
        keyword: realTimeKey,
        __timestamp: 1647597137401,
        sortType: 0,
        descSorted: false,
        categoryId: 0,
        matchType: 0,
        floorPrice: -1,
        upperPrice: -1,
        size: 40,
        itemId: 0,
        stillSearch: false,
        searchWordSource: 5,
        needPopWindow: true,
        _stat_search: history,
      });

      if (re.includes(realTimeKey)) return;
      re.push(realTimeKey);
      this.setStorage({ records: re });
      this.records = this.getStorage();
    },

    //点击删除历史纪录
    deleteRecords() {
      this.setStorage({ records: [] });
      this.records = this.getStorage();
    },

    //得到本地存储
    getStorage() {
      return (JSON.parse(localStorage.getItem("records_key")) || {}).records;
    },
    //设置本地存储
    setStorage(value) {
      return localStorage.setItem("records_key", JSON.stringify(value));
    },

    debounce: debounce(
      function () {
        this.getRealTimeKeyList({ keywordPrefix: this.searchVal });
      },
      200,
      { trailing: true }
    ),

    //点击历史记录跳转
    recordsToGoods(item) {
      this.getSearchGoods({
        keyword: item,
        __timestamp: 1647597137401,
        sortType: 0,
        descSorted: false,
        categoryId: 0,
        matchType: 0,
        floorPrice: -1,
        upperPrice: -1,
        size: 40,
        itemId: 0,
        stillSearch: false,
        searchWordSource: 5,
        needPopWindow: true,
        _stat_search: "history",
      });

      this.searchVal = item;
    },

    //点击热门搜索跳转
    hotToGoods(item) {
      const re = this.getStorage();
      this.searchVal = item;

      this.getSearchGoods({
        keyword: item,
        __timestamp: 1647597137401,
        sortType: 0,
        descSorted: false,
        categoryId: 0,
        matchType: 0,
        floorPrice: -1,
        upperPrice: -1,
        size: 40,
        itemId: 0,
        stillSearch: false,
        searchWordSource: 5,
        needPopWindow: true,
        _stat_search: "history",
      });

      this.searchVal = item;
      if (re.includes(item)) return;
      re.push(item);
      this.setStorage({ records: re });
      this.records = this.getStorage();
    },
  },
  computed: {
    ...mapState("search", ["hotkey"]),
    ...mapState("search", ["realTimeKeyList"]),
    ...mapState("search", ["searchGoodsList"]),
  },
  watch: {
    searchVal() {
      if (this.searchGoodsList) {
        this.DELETE_GOODS();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.searchContainer {
  padding: 0.4rem;
  .van-divider {
    margin-bottom: 0rem;
  }
  .van-search {
    padding: 0;
  }
  .van-tag {
    margin-right: 0.4rem;
  }
  .records {
    position: relative;
    .van-icon-delete-o {
      position: absolute;
      top: 0.02rem;
      right: 0;
      font-size: 0.5rem;
    }
  }
}
</style>
