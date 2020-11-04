<template>
  <div
    class="l-i-p-wrapper"
    ref="wrapper"
    :class="[
      {
        'ab-length': !isDone,
        mini: isBreak
      },
      classType
    ]"
  >
    <div class="price-item" ref="body">
      <!-- <label>896,537,809.69</label> -->

      <div class="img"></div>
      <label>{{ utils.formatFloat(surplus, true) }}</label>
      <!-- <label>380665489</label> -->
      <template>
        <span class="add-unit">+</span>
        <span class="price-unit">￥</span>
        <label>{{ utils.formatFloat(cash, true) }}</label>
      </template>
      <!-- 展示首期的lable -->
      <span class="fq-label" v-if="this.classType==='price-style-car'">首期</span>
      <!-- 秒杀展示几折的lable -->
      <div class="discount-1" v-if="this.classType==='price-style-miaosha' && this.discountJson.discountFlag">
        <div class="discount-1-wrap">
          <span>{{this.discountJson.discount}}折</span>
        </div>
      </div>
      <div
        class="cuxiao-wrap"
        :style="{ backgroundColor: this.cuxiaoDiscount.bg }"
        v-if="this.cuxiaoDiscount.isShow"
      >
        <span class="cuxiao-lable">{{ this.cuxiaoDiscount.discount }}折</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDone: false,
      isBreak: false
    }
  },
  props: {
    cash: {
      type: [Number, String],
      default: 0
    },
    surplus: {
      type: [Number, String],
      default: 0
    },
    classType: {
      type: [String],
      default: ''
    },
    // 秒杀
    discountJson:{
      type:[Object],
      default:function(){
        return {
          discountFlag:false,
          discount:0
        }
      }
    },
    // 促销
    cuxiaoDiscount:{
      type:[Object],
      default:function(){
        return {
          bg: '#E0360A',
          isShow:false,
          discount:0
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculate()
    })
  },
  methods: {
    calculate() {
      // console.log(this.$refs.wrapper.getBoundingClientRect().width , this.$refs.body.getBoundingClientRect().width,"----")
      if (this.$refs.wrapper.getBoundingClientRect().width < this.$refs.body.getBoundingClientRect().width) {
        this.isBreak = true
      }
      this.isDone = true
    }
  }
}
</script>

<style lang="scss" scoped>
$priceColor: #772508; // 价格颜色
.l-i-p-wrapper {
  width: 100%;
  &.ab-length {
    overflow: visible;
    position: relative;
    .price-item {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &.mini .price-item {
    font-size: 12px;
    transform-origin: left center;
    -webkit-transform-origin: left center;
    transform: scale(floor(10 / 0.12) / 100);
    -webkit-transform: scale(floor(10 / 0.12) / 100);
    margin-top:-2px;
  }
}
.mini{
  // height:13px;
}
.price-item {
  font-size: 0;
  white-space: nowrap;
  label {
    display: inline-block;
    color: $priceColor;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    font-family: DINAlternate-Bold, DINAlternate;
  }
  .price-unit {
    @include sc(8px, $priceColor,left 10px);
    // font-weight: 400 !important;
    line-height: 8px;
    line-height: 1 !important;
    letter-spacing: 0;
    display: inline-block;
    margin-right: -4px;
    // @include sc(8px, $priceColor, left 10px);
    font-weight:600;
    // line-height: 1;
  }
  .add-unit {
    display: inline-block;
    @include sc(9px, $priceColor);
    font-weight: bold !important;
    line-height: 1 !important;
    margin: 0 1px;
    margin-bottom: 1px;
  }
  .img {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url('../../assets/image/hh-icon/lable-ji.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 2px;
    margin-bottom: -1px;
  }
  .fq-label {
    display: inline-block;
    background: #634903;
    font-size: 11px;
    color: #fff;
    border-radius: 7px;
    font-weight: 500;
    line-height: 14px;
    padding: 0 6px;
    margin-left: 5px;
    vertical-align: 1px;
  }
  .discount-1 {
    margin-left: 5px;
    display: inline-block;
    vertical-align: 3px;
    .discount-1-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 62px;
      height: 18px;
      background: linear-gradient(90deg, rgba(247, 61, 231, 1) 0%, rgba(165, 66, 240, 1) 100%);
      border-radius: 9px;
      span {
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        line-height: 1;
      }
    }
  }
  .cuxiao-wrap {
      margin: 0 3px;
      padding: 0 8px;
      background-color: #ffdfae;
      border-radius: 2.667vw;
      display: inline-block;
      vertical-align: 6px;
      &.discount {
        border-radius: 10px;
        .cuxiao-lable {
          color: #fff;
        }
      }
      span {
        display: inline-block;
        @include sc(11px, #533c16);
        line-height: 19px;
        color: #fff;
      }
    }
}
.price-style-one {
  .price-item {
    .img {
      width: 14px;
      height: 14px;
    }
    label {
      font-size: 18px;
    }
    .add-unit {
      font-size: 17px;
    }
    .price-unit {
       @include sc(17px, $priceColor);
      transform-origin: left 14px;
      font-weight:bold;
      margin-right: -5px;
    }
  }
}
.price-style-two {
  .price-item {
    .img {
      width: 22px;
      height: 22px;
    }
    label {
      font-size: 29px;
    }
    .add-unit {
      font-size: 22px;
    }
    .price-unit {
       @include sc(26px, $priceColor);
      // font-size:20px ;
      transform-origin: left 23px;
      font-weight:bold;
      margin-right: -9px;
    }
  }
}
.price-style-three {
  .price-item {
    .img {
      width: 12px;
      height: 12px;
    }
    label {
      font-size: 14px;
    }
    .add-unit {
      font-size: 15px;
    }
  }
}
.price-style-car {
  .price-item {
    .img {
      width: 12px;
      height: 12px;
    }
    label {
      font-size: 14px;
    }
    .add-unit {
      font-size: 15px;
    }
  }
}
.price-style-miaosha {
  .price-item {
    .img {
      width: 18px;
      height: 18px;
    }
    label {
      font-size: 22px;
    }
    .add-unit {
      font-size: 22px;
    }
    .price-unit {
       @include sc(20px, $priceColor);
      // font-size:20px ;
      transform-origin: left 17px;
      font-weight:bold;
      margin-right: -7px;
    }
  }
}
.price-style-cuxiao {
  .price-item {
    .img {
      width: 22px;
      height: 22px;
    }
    label {
      font-size: 29px;
    }
    .add-unit {
      font-size: 22px;
    }
    .price-unit {
       @include sc(26px, $priceColor);
      // font-size:20px ;
      transform-origin: left 23px;
      font-weight:bold;
      margin-right: -9px;
    }
  }
}
</style>