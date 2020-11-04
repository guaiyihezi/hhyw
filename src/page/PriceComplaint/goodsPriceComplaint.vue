<template>
  <div class="container">
    <div class="header-container">
      <mt-header class="header" title="价格投诉">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
        <span slot="right" class="h-right" @click="toJudgeDesc">投诉说明</span>
      </mt-header>
    </div>
    <div class="container-wrapper">
      <div class="title">
        换换商城的商品价格（现金+权益价）不得高于天猫旗舰店、京东自营、苏宁自营等主流电商平台商品的售价（标价）；投诉成功后，平台会对商家进行相应处罚，同时会给予用户奖励10元无门槛现金优惠券，详情请查看页面右上角的投诉说明。
      </div>
      <div class="box">
        <div class="box-title">
          <div class="goods-img">
            <img :src="productInfo.thumb" alt="" />
          </div>
          <div class="goods-info">
            <h4>{{ productInfo.name }}</h4>
            <div class="goods-info-m">
              <span class="m-y">￥</span>
              <span class="m-m" v-if="isPromotion">{{ utils.formatFloat(productInfo.MONEY_SHOW) }}</span>
              <span class="m-m" v-else>{{ utils.formatFloat(productInfo.MONEY_SHOW) }}</span>
              <div class="hb-price">
                <label v-if="isPromotion">{{ `权益抵扣￥${utils.formatFloat(productInfo.money_line)}` }}</label>
                <label v-else>{{ `权益抵扣￥${utils.formatFloat(productInfo.HB_SHOW)}` }}</label>
              </div>
            </div>
            <p class="goods-info-y">
              <span class="y-y">原价￥</span
              ><span class="y-m">{{ utils.formatFloat(productInfo.market_price || productInfo.current_price) }}</span>
            </p>
          </div>
        </div>
        <plat-form class="line-wrapper" @child-event="mesage"></plat-form>
        <div class="box-link line-wrapper">
          <label><span>*</span>请添加商品链接</label>
          <input type="text" placeholder="请复制链接" v-model="params.targetGoodsUrl" />
        </div>
        <div class="box-coupon line-wrapper">
          <div class="box-coupon-text"><span>*</span>请填写商品的价格</div>
          <div class="box-coupon-input">
            <input type="number" placeholder="请填写商品价" v-model="params.targetNormalPrice" />
            <input type="number" placeholder="请填写优惠价" v-model="params.targetDiscountPrice" />
          </div>
        </div>
        <un-load-image ref="aliUpload"></un-load-image>
        <div class="box-btn">
          <div class="btn q-btn" @click="cancel">取消</div>
          <div class="btn t-btn" @click="sentMessage">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UnLoadImage from './child/upLoadImage'
import PlatForm from './child/platform'
import { Toast, MessageBox } from 'mint-ui'
import { postComplaint } from '../../api/PriceComplaint'
export default {
  name: 'goodsPriceComplaint',
  components: { UnLoadImage, PlatForm },
  data() {
    return {
      name: { a: '', b: '', c: '' },
      params: {
        goodsId: '', //投诉商品ID
        totalPrice: '', //我方商城该商品总定价
        cashPrice: '', //商城现金部分价
        rightPrice: '', //商城权益部分价
        targetPlatform: '', //对比目标平台ID
        targetGoodsUrl: '', //对比目标平台商品URL
        targetNormalPrice: '', //对比目标平台商品正常报价
        targetDiscountPrice: '', //对比平台商品优惠报价
        targetGoodsPics: '' //上传图片地址.逗号分隔
      }
    }
  },
  created() {
    this.params.goodsId = this.$route.query.id
    this.getInro()
  },
  computed: {
    ...mapState({
      couponObj: state => state.coupon.couponObj,
      isOnline: state => state.auth.isOnline,
      productInfo: state => state.priceJudge.productInfo
    })
  },
  methods: {
    goBack() {
      this.$_goBack()
    },
    getInro() {
      this.$api.get('/userInfo', null, r => {
        // console.log(r)
        if (r.code == 1) {
          var n3 = r.data.indexOf('$z6d')
          var n4 = r.data.indexOf('!d2f')
          var n5 = r.data.indexOf('?#d5')
          var n6 = r.data.indexOf('!w$d')
          var n7 = r.data.indexOf('$d2g')
          var n8 = r.data.indexOf('#vhf')
          this.name.a = r.data.slice(n3 + 4, n4)
          this.name.b = r.data.slice(n5 + 4, n6)
          this.name.c = r.data.slice(n7 + 4, n8)
        } else {
          this.$toast(r.msg)
        }
      })
    },
    //获取平台ID
    mesage(n) {
      // console.log(n,`的地方`)
      this.params.targetPlatform = n
    },
    isPromotion() {
      return this.$route.name === 'promotionDetail'
    },
    sentMessage() {
      // console.log(this.productInfo)
      let url = this.$refs.aliUpload.ImgUrl
      let file = this.$refs.aliUpload.files
      this.params.targetGoodsPics = url.join(',')
      this.params.totalPrice = this.productInfo.market_price
        ? this.productInfo.market_price
        : this.productInfo.current_price //我方商城该商品总定价
      this.params.cashPrice = this.productInfo.MONEY_SHOW //商城现金部分价
      this.params.rightPrice = this.productInfo.money_line ? this.productInfo.money_line : this.productInfo.HB_SHOW //商城权益部分价
      if (!this.params.targetPlatform) {
        Toast('请选择平台')
        return false
      }
      if(!this.params.targetGoodsUrl){
        Toast('请填写商品链接')
        return false
      }else {
        if(!this.params.targetGoodsUrl.startsWith('http')){
          Toast('请填写正确的商品链接')
          return false
        }
      }
      if (this.params.targetNormalPrice) {
        // console.log(`${this.params.totalPrice}我的, ${this.params.targetNormalPrice}你的`)
        if (Number(this.params.totalPrice) < Number(this.params.targetNormalPrice)) {
          Toast('您填写的商品价格不能高于换换商城商品价')
          return false
        }
      } else {
        Toast('请填写比价平台商品价格')
        return false
      }
      if (!this.params.targetGoodsPics) {
        Toast('请添加比价平台商品图片。')
        return false
      }
      if (url.length == file.length) {
        postComplaint(this.params).then(res => {
          console.log(res)
          // 1 该商品有投诉未处理   0：商品已下架      100：投诉成功
          if (res.ret == 0) {
            Toast('商品已下架')
            this.$router.go(-1)
          } else if (res.ret == 1) {
            MessageBox({
              title: '提示',
              message: `感谢您对换换商城的商品进行价格监督。<span style='font-weight: bold;'>已有其他用户</span>赶在您之前进行投诉啦。我们在确认该商品的问题后，将会对商品进行下架整改.再次感谢您的参与。`
            }).then(action => {
              this.$router.go(-1)
            })
          } else if (res.ret == 100) {
            MessageBox({
              title: '提示',
              message: `您的价格投诉已提交给平台运营管理部门，平台将在3个工作日内进行核实，投诉成功后，将下架商品进行整改，同时给您发放奖励并系统通知您，感谢您对换换商城的关注与支持。`
            }).then(action => {
              this.$router.go(-1)
            })
          }
        })
      } else {
        Toast('图片上传中')
      }
    },
    cancel() {
      this.$router.go(-1)
    },
    toJudgeDesc() {
      this.$router.push({ name: 'priceJudgeDesc' })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .header {
    @include header;
    flex-basis: 44px;
    position: relative !important;
    border-bottom: 1px solid #e8eaed;

    .h-right {
      font-size: 16px;
      font-weight: 400;
      color: rgba(85, 46, 32, 1);
      line-height: 20px;
    }
  }
  .container-wrapper {
    flex: 1 0 0;
    overflow-y: auto;

    .title {
      height: 110px;
      font-size: 14px;
      font-weight: 300;
      color: rgba(64, 64, 64, 1);
      line-height: 22px;
      padding: 15px;
      border-bottom: 4px solid transparent;
      background: linear-gradient(white, white) padding-box,
        repeating-linear-gradient(
            -45deg,
            rgba(119, 37, 8, 1) 0,
            rgba(119, 37, 8, 1) 20%,
            transparent 0,
            transparent 25%,
            rgba(201, 181, 148, 1) 0,
            rgba(201, 181, 148, 1) 44%,
            transparent 0,
            transparent 50%
          )
          0/40px 40px;
    }
    .box {
      margin-top: 10px;
      padding: 10px 15px 0;
      background-color: #fff;
      .box-title {
        display: flex;
        flex-direction: row;
        align-items: center;

        .goods-img {
          width: 85px;
          height: 85px;
          img {
            width: 85px;
            height: 85px;
          }
        }
        .goods-info {
          margin-left: 12px;
          h4 {
            height: 35px;
            font-size: 13px;
            font-weight: 300;
            color: rgba(64, 64, 64, 1);
            line-height: 18px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .goods-info-m {
            display: flex;
            align-items: baseline;
            .m-y {
              font-size: 12px;
              font-weight: bold;
              color: rgba(119, 37, 8, 1);
            }
            .m-m {
              font-size: 20px;
              font-weight: bold;
              color: rgba(119, 37, 8, 1);
            }
            .hb-price {
              margin-left: 8px;
              padding: 0 8px;
              background-color: #ffdfae;
              border-radius: 10px 10px 10px 0px;
              &.discount {
                border-radius: 10px;
                label {
                  color: #fff;
                }
              }
              label {
                display: inline-block;
                @include sc(11px, #533c16);
              }
            }
          }
          .goods-info-y {
            text-decoration: line-through;
            color: rgba(151, 151, 151, 1);
            .y-y {
              font-size: 10px;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
            }
            .y-m {
              font-size: 15px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }

      .box-link {
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
          font-size: 13px;
          font-weight: 300;
          color: rgba(64, 64, 64, 1);
          span{
            font-size: 13px;
            font-weight: 500;
            color: rgba(236, 28, 25, 1);
            margin-right: 2px;
          }
        }
        input {
          text-align: right;
        }
      }
      .box-coupon {
        .box-coupon-text {
          font-size: 13px;
          font-weight: 300;
          color: rgba(64, 64, 64, 1);
          margin-bottom: 15px;
          span {
            font-size: 13px;
            font-weight: 500;
            color: rgba(236, 28, 25, 1);
            margin-right: 2px;
          }
        }
        .box-coupon-input {
          display: flex;
          align-items: center;
          justify-content: space-around;

          input {
            flex: 1 0 0;
            overflow: hidden;
            text-align: left;
            text-indent: 8px;
          }
          input::-webkit-input-placeholder {
            font-size: 14px;
            font-weight: 300;
            color: rgba(187, 187, 187, 1);
            text-align: left;
          }
        }
      }
      .box-btn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-bottom: 30px;
        .btn {
          width: 140px;
          height: 36px;
          line-height: 36px;
          border: 1px solid rgba(119, 37, 8, 1);
          border-radius: 2px;
          color: rgba(119, 37, 8, 1);
          background-color: #fff;
          text-align: center;
        }
        .q-btn {
        }
        .t-btn {
          background: rgba(119, 37, 8, 1);
          color: #fff;
        }
      }
    }
  }
}
input {
  background: none;
  outline: none;
  border: none;
  font-size: 14px;
  height: 18px;
  line-height: 20px;
}
.line-wrapper {
  padding-bottom: 12px;
  padding-top: 20px;
  border-bottom: 1px solid #f4f4f4;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-weight: 300;
  color: rgba(187, 187, 187, 1);
  /* placeholder位置  */
  text-align: right;
}
</style>
