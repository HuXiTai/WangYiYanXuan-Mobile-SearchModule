<template>
  <div>
    <div class="deserveContainer">
      <div class="NavBar">
        <van-nav-bar title="值得买">
          <template #left>
            <van-icon
              name="wap-home-o"
              size="0.7rem"
              color="#777"
              @click="toHome"
            />
          </template>
          <template #right>
            <van-icon
              name="search"
              size="0.7rem"
              color="#777"
              @click="toSearch"
            />
            <van-icon
              name="cart-o"
              size="0.7rem"
              color="#777"
              @click="toShopCart"
            />
          </template>
        </van-nav-bar>
      </div>
      <div class="swiperTab">
        <div class="tabTitle">
          <img
            class="tabLogo"
            src="http://yanxuan.nosdn.127.net/0b7676e645253f84be662aacfc051922.png"
            alt=""
          />
          <div class="tabText">严选好物&nbsp;用心生活</div>
          <img
            class="tabImg"
            src="http://yanxuan.nosdn.127.net/a93a392fb8006ba26dea38477979b7b4.jpg?imageView"
            alt=""
          />
        </div>
        <div class="swiper">
          <van-swipe
            :loop="false"
            height="290"
            width="91.6475"
            @change="onChange"
          >
            <van-swipe-item
              class="swiperItem"
              v-for="item in list"
              :key="item.id"
            >
              <div class="swiperBoxs">
                <div class="swiperTopBox" v-for="nav in item" :key="nav.id">
                  <img class="swiperImg" :src="nav.picUrl" alt="" />
                  <div class="swiperText">{{ nav.mainTitle }}</div>
                  <div class="swiperDiv">{{ nav.viceTitle }}</div>
                </div>
              </div>
              <template #indicator>
                <div class="custom-indicator"></div>
              </template>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <vue-waterfall-easy
        class="waterfall"
        srcKey="picUrl"
        height="600"
        :imgsArr="imgsArr"
        :mobileGap="10"
        @scrollReachBottom="requestWaterfall"
      >
        <div class="waterfallBox" slot-scope="props">
          <div class="waterfallSubtitle">{{ props.value.subTitle }}</div>
          <div class="waterfallBottom">
            <div class="waterfallBottomLeft">
              <img class="waterfallImg" :src="props.value.avatar" alt="" />
              <p class="waterfallName">{{ props.value.nickname }}</p>
            </div>
            <div class="waterfallBottomRight">
              <van-icon size="20" name="browsing-history-o" />
              <p class="waterfallReadCount">{{ props.value.readCount }}</p>
            </div>
          </div>
        </div>
      </vue-waterfall-easy>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import waterfall from "vue-waterfall2/waterfall.vue";
import vueWaterfallEasy from "vue-waterfall-easy";
import { mapState, mapActions } from "vuex";
export default {
  name: "Deserve",
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    waterfall,
    vueWaterfallEasy,
  },
  mounted() {
    this.requestSwiper();
    this.requestWaterfall();
    console.log(this, "this");
  },
  methods: {
    ...mapActions("deserve", ["requestSwiper", "requestWaterfall"]),

    onChange(index) {
      // console.log(index);
      this.currentIndex = index;
      if (index >= 3) {
        this.currentIndex = 3;
      }
    },
    toHome() {
      this.$router.push("/home");
    },
    toSearch() {
      this.$router.push("/search");
    },
    toShopCart() {
      this.$router.push("/shopcart");
    },
  },
  computed: {
    ...mapState("deserve", ["swiperList", "imgsArr"]),
    list() {
      console.log(this.swiperList);
      let index = 0;
      let list = [];
      while (index < this.swiperList.length) {
        let newArr = this.swiperList.slice(index, (index += 2));
        if (newArr.length < 2) {
          let len = 2 - newArr.length;
          for (let i = 0; i < len; i++) {
            newArr.push([]);
          }
        }
        list.push(newArr);
      }
      return list;
    },
  },
};
</script>

<style lang="less" scoped>
html,
body,
#app {
  height: 100%; // 父元素必须要有高度
  width: 100%; // 如果已经是block元素，则可以忽略
}
.deserveContainer {
  background: #eee;
  width: 375px;
  height: auto;
  .swiperTab {
    height: 390px;
    width: 375px;
    .tabTitle {
      position: relative;
      width: 375px;
      top: 0;
      .tabLogo {
        position: absolute;
        z-index: 1;
        width: 70px;
        height: auto;
        left: 10px;
        top: 30px;
      }
      .tabText {
        position: absolute;
        z-index: 1;
        font-size: 15px;
        color: #fff;
        top: 42px;
        left: 80px;
      }
      .tabImg {
        position: absolute;
        width: 375px;
        height: 300px;
      }
    }
    .swiper {
      width: 350px;
      height: 300px;
      background: #fff;
      position: absolute;
      z-index: 2;
      left: 12px;
      top: 120px;
      border-radius: 10px;
      .swiperItem {
        width: 87.5px;
        .swiperBoxs {
          width: 87.5px;
          height: 100%;
          display: flex;
          flex-direction: column;
          .swiperTopBox {
            margin-top: 20px;
            width: 87.5px;
            height: 42%;
            display: flex;
            align-items: center;
            flex-direction: column;
            .swiperImg {
              width: 50px;
              height: 50px;
            }
            .swiperText {
              font-size: 15px;
              font-weight: bold;
            }
            .swiperDiv {
              font-size: 5px;
            }
          }
        }
      }
    }
  }
  .waterfall {
    .waterfallBox {
      .waterfallSubtitle {
        font-size: 15px;
        margin: 10px;
      }
      .waterfallBottom {
        display: flex;
        margin: 0 10px;
        justify-content: space-between;
        .waterfallBottomLeft {
          display: flex;
          align-items: center;
          .waterfallImg {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          .waterfallName {
            font-size: 12px;
            color: #999;
            margin-left: 5px;
          }
        }
        .waterfallBottomRight {
          display: flex;
          align-items: center;
          .waterfallReadCount {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
