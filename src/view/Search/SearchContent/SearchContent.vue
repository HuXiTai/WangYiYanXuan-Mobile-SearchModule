<template>
  <div class="SearchContent" v-show="searchGoodsList.directlyList">
    <!-- 商品选择区 -->
    <div class="title">
      <van-dropdown-menu>
        <van-dropdown-item title="综合" disabled />
        <van-dropdown-item title="价格">
          <van-divider>筛选</van-divider>
          <van-divider>筛选:{{ min }}元~{{ max }}元</van-divider>
          <van-slider v-model="value" range @change="onChange" />

          <van-divider>排序</van-divider>

          <van-radio-group v-model="checked">
            <van-cell-group inset>
              <van-cell title="从低到高" clickable @click="checked = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="从高到底" clickable @click="checked = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-dropdown-item>
        <van-dropdown-item title="分类">
          <van-tag
            v-for="category of searchGoodsList.categoryL1List"
            :key="category.id"
            type="primary"
            size="large"
            >{{ category.name }}</van-tag
          >
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- 商品展示区 -->
    <div class="goodsContent">
      <div
        class="goodsItem"
        v-for="goods of searchGoodsList.directlyList"
        :key="goods.id"
        @click="toDetail(goods.id)"
      >
        <img
          :src="goods.listPicUrl"
          class="goodsImg"
          v-lazy="goods.listPicUrl"
        />
        

        <span class="goodsText">{{ goods.name }}</span>
        <div class="goodsPrice">
          <span class="now"
            >到手价￥<span class="nowNum">{{ goods.retailPrice }} </span></span
          >
          <span class="old">￥{{ goods.counterPrice }}</span>
        </div>
        <div>
          <span
            class="discount"
            v-if="(goods.finalPriceInfoVO.banner || {}).content"
            >{{ (goods.finalPriceInfoVO.banner || {}).content }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      checked: "",
      value: [10, 50],
      min: 100,
      max: 500,
      lastData: {},
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
      this.min = value[0] * 10;
      this.max = value[1] * 10;
      Toast("筛选：" + value[0] * 10 + "元" + "~" + value[1] * 10 + "元");
      this.searchGoodsList.directlyList = this.directlyList;

      this.searchGoodsList.directlyList =
        this.searchGoodsList.directlyList.filter((item) => {
          return item.retailPrice > this.min && item.retailPrice < this.max;
        });
    },
    toDetail(id) {
      this.$router.push(`/detail?id=${id}`);
    },
  },
  computed: {
    ...mapState("search", ["searchGoodsList", "directlyList"]),
  },
  mounted() {
    console.log(this);
  },
  watch: {
    checked() {
      console.log(this.checked);
      if (this.checked === "1") {
        this.searchGoodsList.directlyList.sort((a, b) => {
          return a.retailPrice - b.retailPrice;
        });
      } else {
        this.searchGoodsList.directlyList.sort((a, b) => {
          return b.retailPrice - a.retailPrice;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.SearchContent {
  .title {
    position: sticky;
    top: 0rem;
  }
  .van-slider {
    height: 0.2rem;
    margin-bottom: 1rem;
  }

  .van-divider {
    margin: 0.2rem;
  }

  .van-tag {
    margin: 0.4rem;
  }

  .goodsContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goodsItem {
      width: 48%;
      display: flex;
      flex-direction: column;
      font-size: 0.38rem;
      box-sizing: border-box;
      margin-bottom: 0.5rem;
      .goodsImg {
        border-radius: 0.3rem;
        width: 100%;
        height: 4.6rem;
      }

      .goodsText {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 0.6rem;
      }

      .goodsPrice {
        font-size: 0.2rem;
        margin: 0.2rem 0;
        .now {
          color: red;
          .nowNum {
            font-size: 0.5rem;
            font-weight: bolder;
          }
        }

        .old {
          font-size: 0.2rem;
        }
      }

      .discount {
        font-size: 0.2rem;
        background: red;
        color: #fff;
        display: inline;
        // width: 1.7rem;
        padding: 0.05rem 0.2rem;

        text-align: center;
        border-radius: 0.3rem;
      }
    }
  }
}
</style>
