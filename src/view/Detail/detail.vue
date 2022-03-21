<template>
  <div class="detailContainer">
    <HeaderNav></HeaderNav>
    <!-- 轮播图 -->
    <van-swipe class="detailSwiper" @change="onChange">
      <van-swipe-item
        class="swiperItem"
        v-for="goods in skuInfo.skuImageList"
        :key="goods.id"
      >
        <img class="itemImg" :src="goods.imgUrl" alt="" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
    <!-- 商品详情描述 -->
    <div class="detailPrice">
      <span class="head">首单全额返 最高可100%返还</span>
      <div class="price">
        <span class="rmb">￥</span>
        {{ price }}
        <div class="rePrice">
          <span>立返￥</span><span class="money">150</span>
        </div>
      </div>
    </div>
    <div class="baseInfo">
      <div class="goodsDetail">
        <div class="goodsIntroduce">{{ skuInfo.skuName }}</div>
        <div class="goodsEvaluate">
          <div class="left">
            <div class="preLogo"></div>
            <img class="logo" src="@/assets/wangyilogo.png" alt="" />
            <span class="title">网易严选</span>
            <van-stepper v-model="num" />
          </div>
        </div>
        <div class="desc">推荐理由</div>
      </div>
      <div class="comment">
        <div class="commentTitle">查看评论</div>
        <i>></i>
      </div>
    </div>
    <div class="recommed">
      <ul class="recommedBox">
        <li class="recommedItem">
          <div class="key">1</div>
          <div class="itemText">{{ skuInfo.skuDesc }}</div>
        </li>
        <li class="triangle"></li>
      </ul>
    </div>

    <!-- 商品选择 -->

    <div class="detailCheack">
      <div class="detailItem">
        <van-cell
          is-link
          title="邮费:满99包邮"
          @click="showPopup"
          class="cell"
        />
        <van-popup
          v-model="show"
          closeable
          class="popup"
          close-icon-position="top-right"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <div class="popupHeader">邮费</div>
          <div class="text">
            <div class="textTitle">
              <i></i>
              <span>满99元包邮</span>
            </div>
            <div class="textTitle2">
              本商品由严选自营仓发货，单笔订单金额（不含邮费）大陆地区满99元免邮费，不满99元收取8元邮费；港澳台地区满500元免邮费，不满500元收取30元邮费；海外地区以下单页提示运费为准。
            </div>
          </div>
        </van-popup>
      </div>
      <div class="detailItem">
        <van-cell
          is-link
          title="促销：买一送一"
          @click="showPopup"
          class="cell"
        />
        <van-popup
          v-model="show"
          closeable
          class="popup"
          close-icon-position="top-right"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <van-cell is-link title="打骨折" class="cell" />
          <van-cell is-link title="报我名字" class="cell" />
        </van-popup>
      </div>
      <div class="detailItem">
        <van-cell
          is-link
          title="购物返:最高返9积分"
          @click="showPopup"
          class="cell"
        />
        <van-popup
          v-model="show"
          closeable
          class="popup"
          close-icon-position="top-right"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <div class="popupHeader">什么是购物返</div>
          <div class="text">
            <div class="textTitle">
              <i></i>
              <span>关于购物返回馈金：</span>
            </div>
            <div class="textTitle2">
              1. 用户在严选主站购物，确认收货后按商品售价的10%返购物积分<br />
              2. 购物返积分数值精确到个位（小数点后全部舍弃，不进行四舍五入）<br />
              3. 拼团/众筹/砍价/虚拟商品和礼品卡支付商品订单不支持返积分<br />
              4.
              购买礼品卡订单不返积分，礼品卡消费时，按照实际消费额度进行积分返赠<br />
              5.
              如商品订单完成后退货，则在退货流程发起后24小时内对该笔订单发放的积分数进行扣除<br />
              6. 可在【帮助中心】-积分规则查看详细说明<br />
              7. 如有疑问，请联系严选在线客服
            </div>
          </div>
        </van-popup>
      </div>

      <div class="detailSku">
        <van-cell title="请选择规格数量" is-link @click="changeSku" />
        <van-sku
          v-model="isSku"
          :sku="sku"
          :goods="goods"
          :hide-stock="sku.hide_stock"
        />

        <van-cell title="限制：特价商品不可与优惠券叠加使用" />
      </div>
    </div>

    <div class="swiper2">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="itemSwiper"
          ><img class="itemImg" src="@/assets/banner1.webp" alt=""
        /></van-swipe-item>
        <van-swipe-item class="itemSwiper"
          ><img class="itemImg" src="@/assets/banner2.webp" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>

    <div class="user">
      <van-cell class="users" title="用户评价(520)" is-link value="查看全部" />
      <van-skeleton title avatar :row="3" class="userItem">
        <div>实际内容</div>
      </van-skeleton>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="service-o" text="客服" />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addShopCart"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      current: 0,
      total: 5,
      show: false,
      isSku: false,
      isChecked: true,
      num: 1,
      skuId: 1,
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                // imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                // previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "1",
                name: "蓝色",
                // imgUrl: "https://img01.yzcdn.cn/2.jpg",
                // previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            // largeImageMode: true, //  是否展示大图模式
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            k_s: "s2", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "5.5", // skuValueName：规格值名称
                // imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                // previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "1",
                name: "4.6",
                // imgUrl: "https://img01.yzcdn.cn/2.jpg",
                // previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            // largeImageMode: true, //  是否展示大图模式
          },
        ],

        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "100.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    showPopup() {
      this.show = true;
    },
    changeSku() {
      this.isSku = true;
    },
    ...mapActions("detail", ["getDetailData", "getAddToCart"]),
    //添加购物车
    async addShopCart() {
      try {
        const re = await this.getAddToCart({
          skuId: this.skuId,
          skuNum: this.num,
        });
        alert("加入购物车成功");
        this.$router.push({
          name: "shopcart",
          params: {
            skuNum: this.num,
          },
        });
        sessionStorage.setItem("skuInfo_key", JSON.stringify(this.detail));
        localStorage.setItem("goods_key", JSON.stringify(this.skuInfo));
      } catch (e) {
        alert("加入购物车失败");
      }
    },
  },
  computed: {
    ...mapState("detail", ["detail"]),
    ...mapGetters("detail", ["skuInfo", "price"]),
  },
  mounted() {
    this.getDetailData(this.skuId);
  },
};
</script>

<style lang="less">
.detailContainer {
  height: 100%;
  .detailSwiper {
    height: 100%;
    .custom-indicator {
      position: absolute;
      right: 20px;
      bottom: 20px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
    .swiperItem {
      height: 390px;
      .itemImg {
        width: 390px;
        height: 390px;
      }
    }
  }
  .detailPrice {
    height: 100%;
    background-color: rgb(250, 30, 50);
    padding-left: 15px;
    .head {
      font-size: 12px;
      color: white;
    }
    .price {
      display: flex;
      font-size: 32px;
      font-weight: 700;
      align-items: center;
      color: #fff;
      height: 60px;
      .rmb {
        font-size: 18px;
      }
      .rePrice {
        background-color: #fff;
        color: rgb(250, 30, 50);
        margin-left: 10px;
        padding: 1px 5px;
        border-radius: 20px;
        font-size: 12px;
        .money {
          font-size: 18px;
        }
      }
    }
  }
  .baseInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goodsDetail {
      padding: 13px 0 0px 15px;
      .goodsIntroduce {
        font-size: 16px;
        color: #333;
        line-height: 28px;
        font-weight: 700;
      }
      .goodsEvaluate {
        display: flex;
        height: 26px;
        margin: 3px;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          .preLogo {
            width: 32px;
            height: 16px;
            background-image: url(../../assets/wangyiziying.png);
            background-size: 100% 100%;
            margin-right: 4px;
          }
          .logo {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
          .title {
            font-size: 12px;
            line-height: 18px;
            margin-right: 100px;
          }
        }
        .right {
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .desc {
        font-size: 12px;
        color: #333;
        line-height: 18px;
        font-weight: lighter;
      }
    }
    .comment {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .commentTitle {
        font-size: 14px;
      }
      i {
        font-size: 14px;
      }
    }
  }
  .recommed {
    padding: 5px 0 18px 15px;
    .recommedBox {
      position: relative;
      font-size: 12px;
      background-color: #fafafa;
      border: 1px solid #e6e6e6;
      margin: 6px 0 0;
      width: 320px;
      padding: 7px 10px;
      .recommedItem {
        display: flex;
        align-items: center;
        line-height: 22px;

        .key {
          font-weight: 700;
          border: 1px solid red;
          width: 14x;
          height: 14px;
          color: red;
          border-radius: 50%;
          text-align: center;
          box-sizing: border-box;
          line-height: 12px;
        }
        .itemText {
          line-height: 18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; /** 多行文本溢出...*/
          overflow: hidden;
        }
      }
      .triangle {
        position: absolute;
        top: -20px;
        left: 20px;
        width: 0;
        height: 0;
        border: 10px solid #000;
        border-top-color: transparent;
        border-bottom-color: #fafafa;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    }
  }

  .detailCheack {
    border-top: 10px solid #f4f4f4;
    .detailItem {
      .popup {
        .popupHeader {
          font-size: 16px;
          text-align: center;
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #d9d9d9;
        }
        .text {
          padding: 20px;
          margin-top: 10px;
          .textTitle {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            i {
              width: 4px;
              height: 4px;
              background-color: red;
              border-radius: 50%;
              margin-right: 10px;
            }
            span {
              font-size: 14px;
            }
          }
          .textTitle2 {
            font-size: 14px;
            color: #7f7f7f;
            line-height: 21px;
          }
        }
      }
    }
  }
  .detailSku {
    border-top: 10px solid #f4f4f4;
  }
  .swiper2 {
    border-top: 10px solid #f4f4f4;
    border-bottom: 10px solid #f4f4f4;
    .my-swipe {
      .itemSwiper {
        .itemImg {
          height: 100px;
        }
      }
    }
  }
  .user {
    .userItem {
      margin-top: 10px;
      margin-bottom: 50px;
    }
  }
}
</style>
