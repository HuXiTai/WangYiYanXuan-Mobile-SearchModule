<template>
  <div class="homeContainer">
    <div class="header">
      <img class="headerImg" src="@/assets/images/xiaowanzi.jpg" alt="" />
      <van-search
        class="searchInp"
        placeholder="请输入搜索关键词"
        input-align="center"
        @focus="toSearch"
      />
      <span class="search" @click="toSearch">搜索</span>
    </div>
    <div class="navContainer">
      <van-tabs @click="goryList" v-model="navId">
        <van-tab title="首页">
          <!-- 首页轮播图内容 -->
          <div class="containerSwipe">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
            >
              <van-swipe-item v-for="(item, index) in focus" :key="item.id">
                <img class="swiperImg" :src="item.picUrl" alt="" />
              </van-swipe-item>
            </van-swipe>
          </div>

          <div class="homeContainerList">
            <div class="wyselfSupport">
              <div class="selfSupport">
                <span class="iconfont icon-wangyi"></span>
                <span class="selfSupportText">网易自营品牌</span>
              </div>
              <div class="selfSupport">
                <span class="iconfont icon-yduidunpaishixin"></span>
                <span class="selfSupportText">三十天无忧退货</span>
              </div>
              <div class="selfSupport">
                <span class="iconfont icon-renminbi"></span>
                <span class="selfSupportText">48小时快速退款</span>
              </div>
            </div>
            <div class="containerList">
              <div class="containerListItem" v-for="(item, index) in container">
                <img class="containerListItemImg" :src="item.picUrl" alt="" />
                <span class="containerListItemtext">新品首发</span>
              </div>
            </div>
            <div class="containerDiscount">
              <div class="containerDiscountGif">
                <img
                  class="containerDiscountGifImg"
                  src="https://yanxuan.nosdn.127.net/static-union/1641365158e735c0.gif?imageView&quality=75"
                  alt=""
                />
                <img
                  class="containerDiscountGifImg"
                  src="https://yanxuan.nosdn.127.net/static-union/164661969744b516.gif?imageView&quality=75"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="containerExclusiveNewcomers">
            <span class="exclusiveTitle">—— 新人专享礼 ——</span>
            <div class="containerExclusiveTitle">
              <div class="containerExclusiveLeft">
                <span class="containerExclusiveLeftTitle">新人专享礼包</span>
                <img
                  class="containerExclusiveLeftImg"
                  src="https://yanxuan.nosdn.127.net/352b0ea9b2d058094956efde167ef852.png"
                  alt=""
                />
                <span class="iconfonts">
                  <p class="iconfont icon-chevronsrightshuangyoujiantou"></p>
                </span>
              </div>
              <div class="containerExclusiveRight">
                <img
                  class="containerExclusiveRightTop"
                  src="@/assets/images/fulishe.png"
                  alt=""
                />
                <img
                  class="containerExclusiveRightBottom"
                  src="@/assets/images/xinrenpintuan.png"
                  alt=""
                />
              </div>
            </div>
            <div class="containerHotsale">
              <div><span class="containerHotsaleTitle">类目热销榜</span></div>
              <div class="containerHotsaleList">
                <div class="containerHotsaleListTop">
                  <span class="containerHotsaleListText">服饰鞋包榜</span>
                  <img
                    class="containerHotsaleListImg"
                    src="https://yanxuan-item.nosdn.127.net/8463dd44e860663b62c0ee78da07d1ee.png?quality=75&type=webp&imageView&thumbnail=200x200"
                    alt=""
                  />
                </div>
                <div
                  class="containerHotsaleListTop"
                  style="background-color: #ebeff6"
                >
                  <span class="containerHotsaleListText">美食酒水榜</span>
                  <img
                    class="containerHotsaleListImg"
                    src="https://yanxuan-item.nosdn.127.net/238eee02ce11fffc3fc58f54b5b101c6.png?quality=75&type=webp&imageView&thumbnail=200x200"
                    alt=""
                  />
                </div>
              </div>
              <div class="containerHotsaleListBoottom">
                <div
                  class="containerHotsaleListBoottomList"
                  v-for="item in category"
                >
                  <span class="containerHotsaleListBoottomText">{{
                    item.categoryName
                  }}</span>
                  <img
                    class="containerHotsaleListBoottomImg"
                    :src="item.picUrl"
                  />
                </div>
              </div>
              <div class="hotsale">
                <div class="popular">
                  <span class="popularText">王牌爆款</span>
                  <span class="popularText2">买到就赚到</span>
                  <img
                    class="popularImg"
                    src="https://yanxuan-item.nosdn.127.net/efd2cdbcfa8bc48ff66a238695066fa5.png?quality=75&type=webp&imageView&thumbnail=150x150"
                    alt=""
                  />
                  <img
                    class="popularImg2"
                    src="https://yanxuan-item.nosdn.127.net/d09067126612d4b73230cf043a439853.png?quality=75&type=webp&imageView&thumbnail=150x150"
                    alt=""
                  />
                </div>
                <div class="crowdFunding">
                  <span class="crowdFundingText">众筹好物</span>
                  <span class="crowdFundingText2">探索美与用</span>
                  <img
                    class="crowdFundingImg"
                    src="https://yanxuan-item.nosdn.127.net/d398ebb1be7fd30f1e3c2a41b30c4ba9.png?quality=75&type=webp&imageView&thumbnail=150x150"
                    alt=""
                  />
                  <img
                    class="crowdFundingImg2"
                    src="https://yanxuan-item.nosdn.127.net/e9f01fb9a3d9e18f7a42dd9231390beb.png?quality=75&type=webp&imageView&thumbnail=150x150"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottomTop">
              <div class="bottomApp">下载APP</div>
              <div class="bottomPc">电脑版</div>
            </div>

            <span class="bottomText">网易公司版权所有 © 1997- 2022</span>
            <span class="bottomText2">食品经营许可证：JY13301080111719</span>
          </div>
        </van-tab>
        <van-tab
          v-for="item in category"
          :key="item.categoryId"
          :title="item.extra.operationResource.categoryName"
          :name="item.extra.operationResource.categoryId"
        >
          <!-- 居家生活轮播图内容 -->
          <div class="containerSwipe">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
            >
              <van-swipe-item v-for="(item, index) in content" :key="item.id">
                <img class="swiperImg" :src="item.picUrl" alt="" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <!-- 居家生活内容 -->
          <div class="container">
            <div
              class="containerTitle"
              v-for="(c1, index) in contentList.categoryItemList"
              :key="index"
            >
              <span class="containerBigTitle">{{ c1.category.name }}</span>
              <span class="containerSmallTitle">{{
                c1.category.frontName
              }}</span>

              <div class="containerList">
                <div
                  class="containerContent"
                  v-for="(c2, index) in c1.itemList"
                  :key="index"
                  @click="toDetail"
                >
                  <img class="contentImg" :src="c2.listPicUrl" alt="" />
                  <span class="contentText">{{ c2.name }}</span>
                  <div class="price">
                    <span class="contentSkillPrice"
                      >￥{{ c2.retailPrice }}</span
                    >
                    <span class="contentPrice">￥{{ c2.sortOriginPrice }}</span>
                  </div>
                  <div class="contentTastefresh">
                    <span class="contentTastefreshPrice"> 新品尝鲜 </span>
                    <span class="contentActivity"> 仅剩38件 距离结束5天 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <Nav :category="category"></Nav> -->
    <TabBar></TabBar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      navId: "0",
    };
  },
  comments: {},
  mounted() {
    this.getBannerList();
    console.log(this);
  },
  methods: {
    ...mapActions("home", ["getBannerList", "getContentList"]),
    goryList() {
      let navId = this.navId;
      if (navId === 0) {
        return;
      }
      this.getContentList(navId);
    },
    toDetail() {
      this.$router.push("/detail");
    },
    toSearch() {
      this.$router.push("/search");
    },
  },
  computed: {
    ...mapState("home", ["homeBanner", "contentList"]),
    focus() {
      return (this.homeBanner || {}).focusList;
    },
    container() {
      return ((this.homeBanner || {}).kingKongModule || {}).kingKongList;
    },
    category() {
      return ((this.homeBanner || {}).categoryHotSellModule || {}).categoryList;
    },
    content() {
      return ((this.contentList || {}).currentCategory || {}).bannerList;
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/iconfont/iconfont.css";
.homeContainer {
  .my-swipe .van-swipe-item {
    // color: #fff;
    // font-size: 20px;
    // line-height: 150px;
    // text-align: center;
    // background-color: #39a9ed;
    width: 100%;
    height: 148px;
    .swiperImg {
      width: 100%;
      height: 148px;
    }
  }
  .header {
    display: flex;
    height: 100%;
    .headerImg {
      flex: 1;
      height: 30px;
      width: 70px;
      margin: 10px;
    }
    .search {
      flex: 1;
      margin: 15px;
      height: 20px;
      width: 40px;
      border: 1px solid #cc0000;
      text-align: center;
      font-size: 15px;
      color: #cc0000;
      border-radius: 5px;
      line-height: 20px;
    }
  }
  .homeContainerList {
    height: 100%;
    .wyselfSupport {
      height: 39.37px;
      width: 100%;
      // background-color: #eee;
      display: flex;
      flex-direction: column;
      .selfSupport {
        height: 39.37px;
        flex: 1;
        margin-left: 10px;
        // justify-content: center;
        .selfSupportText {
          font-size: 10px;
        }
      }
    }
    .containerList {
      margin-top: 10px;
      justify-content: center;
      display: flex;
      height: 192.2px;
      width: 100%;
      flex-wrap: wrap;
      .containerListItem {
        width: 60.72px;
        height: 86.11px;
        margin: 5px;
        .containerListItemImg {
          width: 60.72px;
          height: 60.72px;
        }
        .containerListItemtext {
          font-size: 10px;
          display: block;
          text-align: center;
          width: 60.72px;
          height: 19.86px;
        }
      }
    }
    .containerDiscountGif {
      width: 100%;
      height: 295.13px;
      .containerDiscountGifImg {
        width: 100%;
      }
    }
  }
  .containerExclusiveNewcomers {
    // display: flex;
    width: 100%;
    .exclusiveTitle {
      font-size: 15px;
      font-weight: 800;
      width: 100%;
      height: 49.67px;
      line-height: 49.67px;
      display: block;
      text-align: center;
    }
    .containerExclusiveTitle {
      display: flex;
      width: 100%;
      height: 250px;
      justify-content: center;
      .containerExclusiveLeft {
        width: 171.5px;
        height: 222px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: antiquewhite;
        .containerExclusiveLeftTitle {
          display: block;
          font-size: 16px;
          width: 171.5px;
          height: 40px;
          line-height: 40px;
          margin-left: 10px;
        }
        .containerExclusiveLeftImg {
          height: 129px;
          width: 128.5px;
          margin: 0 auto;
          margin-top: 20px;
        }
        .iconfonts {
          position: absolute;
          left: 102px;
          top: 151px;
        }
      }
      .containerExclusiveRight {
        height: 219px;
        width: 171.5px;
        .containerExclusiveRightTop {
          height: 107.5px;
        }
        .containerExclusiveRightBottom {
          height: 107.5px;
        }
      }
    }
    .containerHotsale {
      width: 100%;
      .containerHotsaleTitle {
        height: 50px;
        font-size: 20px;
        display: block;
        line-height: 50px;
        margin-left: 20px;
      }
      .containerHotsaleList {
        display: flex;
        // height: 305px;
        width: 373.13px;
        .containerHotsaleListTop {
          height: 100px;
          width: 165px;
          display: flex;
          flex: 1;
          margin: 5px;
          background-color: antiquewhite;
          .containerHotsaleListText {
            font-size: 14px;
            display: block;
            height: 100px;
            width: 70px;
            line-height: 100px;
            margin-left: 5px;
          }
          .containerHotsaleListImg {
            height: 100px;
            height: 100px;
          }
        }
      }
      .containerHotsaleListBoottom {
        // width: 100%;
        height: 208px;
        display: flex;
        flex-wrap: wrap;
        .containerHotsaleListBoottomList {
          height: 90px;
          width: 82.5px;
          background-color: #f5f5f5;
          margin: 5px;
          border-radius: 3px;
          .containerHotsaleListBoottomText {
            font-size: 10px;
            display: block;
            text-align: center;
            margin-top: 5px;
          }
          .containerHotsaleListBoottomImg {
            height: 60px;
            width: 60px;
            margin: 5px 10px;
          }
        }
      }
      .hotsale {
        width: 100%;
        height: 140px;
        // background-color: #ccc;
        display: flex;
        // margin: 5px;

        .popular {
          width: 175px;
          height: 132px;
          background-color: #f5f5f5;
          margin-left: 5px;
          .popularText {
            font-size: 10px;
            display: block;
            margin-left: 20px;
          }
          .popularText2 {
            font-size: 10px;
            color: #a682d1;
            display: block;
            margin-left: 20px;
          }
          .popularImg {
            width: 75px;
            height: 75px;
          }
          .popularImg2 {
            width: 75px;
            height: 75px;
          }
        }
        .crowdFunding {
          width: 175px;
          height: 132px;
          background-color: #f5f5f5;
          margin-left: 10px;
          .crowdFundingText {
            display: block;
            font-size: 10px;
            margin-left: 20px;
          }
          .crowdFundingText2 {
            font-size: 10px;
            color: orange;
            display: block;
            margin-left: 20px;
          }
          .crowdFundingImg {
            width: 75px;
            height: 75px;
          }
          .crowdFundingImg2 {
            width: 75px;
            height: 75px;
          }
        }
      }
    }
  }
  .bottom {
    height: 121px;
    width: 100%;
    background-color: #414141;
    .bottomTop {
      justify-content: center;
      display: flex;
      width: 100%;
      height: 40px;
      .bottomApp {
        font-size: 15px;
        border: 1px solid #fff;
        display: block;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ccc;
        margin: 10px 10px;
        border-radius: 5px;
      }
      .bottomPc {
        color: #ccc;
        font-size: 15px;
        border: 1px solid #fff;
        display: block;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 10px 10px;
        border-radius: 5px;
      }
    }
    .bottomText {
      color: #ccc;
      text-align: center;
      font-size: 15px;
      display: block;
      margin-top: 20px;
    }
    .bottomText2 {
      color: #ccc;
      text-align: center;
      font-size: 15px;
      display: block;
      margin-top: 10px;
    }
  }
  .my-swipe .van-swipe-item {
    // color: #fff;
    // font-size: 20px;
    // line-height: 150px;
    // text-align: center;
    // background-color: #39a9ed;
  }
  // 主页内容
  .container {
    height: 100%;
    .containerTitle {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .containerBigTitle {
        height: 26px;
        font-size: 20px;
        display: flex;
        justify-content: center;
      }
      .containerSmallTitle {
        display: flex;
        justify-content: center;
        height: 17px;
        font-size: 15px;
      }
      .containerList {
        display: flex;
        // flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        .containerContent {
          flex: 1;
          margin: 10px 0px 5px 8px;
          height: 316.95px;
          width: 170.45px;
          .contentImg {
            height: 190.45px;
            width: 170.45px;
          }
          .contentText {
            width: 170.44px;
            display: block;
            height: 49.66px;
            font-size: 15px;
          }
          .price {
            display: flex;
            height: 170.44;
            height: 33.1px;
            .contentSkillPrice {
              line-height: 33.1px;
              font-size: 18px;
              color: #cc0000;
              font-weight: 800;
              height: 33.1px;
            }
            .contentPrice {
              line-height: 33.1px;
              font-size: 15px;
              color: #999;
              text-decoration: line-through;
            }
          }

          .contentTastefresh {
            display: flex;
            width: 170.44px;
            height: 25.39px;
            background-color: #ffccff;
            border-radius: 10px;
            .contentTastefreshPrice {
              background-color: #fa1e32;
              border-radius: 10px;
              flex: 1;
              font-size: 10px;
              display: block;
              line-height: 25.39px;
            }
            .contentActivity {
              display: block;
              line-height: 25.39px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>