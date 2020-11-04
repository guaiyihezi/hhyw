<template>
    <div class="container">
        <div v-if="isCoupon" class="coupon-pop" style='z-index: 999;'>
            <div class="pop-ups">
                <div class="title">
                    <img src="../../../assets/image/hh-icon/plus-close.png" @click="coupon_close"/>
                </div>
                <div class="coupon-btn">
                    <div v-if="couponText" class="btn" @click="getReceiveCoupon">一键领取</div>
                    <div v-else class="btn" @click="getLink">立即使用</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { getCoupon, receiveCoupon } from '../../../api/product'
  import { Toast } from 'mint-ui'
  import { REG_URL_HHYW_INNER } from '../../../const/regExp'
  export default {
    name: 'couponToast',
    data (){
      return {
        isCoupon: false, //双12弹窗
        couponText: true,
        couponList: []
      }
    },
    created() {

    },
    activated() {
      console.log('进入环境')
      this.postCoupon()
    },
    methods:{
      //获取1212优惠券
      postCoupon() {
        // this.isCoupon = true
        getCoupon({ name: '双12囤货节' }).then(res => {
          this.isCoupon = res.is_pop
          for (let i of res.list) {
            this.couponList.push(i.id)
          }
        })
      },
      //领取1212优惠券
      getReceiveCoupon() {
        if (this.isOnline) {
          receiveCoupon({ coupon_id: this.couponList }).then(res => {
            if (res) {
              this.couponText = false
              Toast(`领取成功`)
            }
          })
        } else {
          Toast(`您还没有登录，快去登陆吧！`)
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 3000)
        }
      },
      //关闭双十二弹窗
      coupon_close() {
        this.isCoupon = false
      },
      //跳转专题页
      getLink() {
        let link = 'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Ftunhuo_wap'
        if (link && link.length) {
          if (link.substr(0, 1) == '/') {
            // 识别 vue h5站内链接
            return this.$router.push({ path: link })
          } else if (REG_URL_HHYW_INNER.test(link)) {
            // 识别 vue h5站内链接
            return this.$router.push({ path: link.replace(REG_URL_HHYW_INNER, '/') })
          }

          // 外链
          this.Jump(link)
        }
        this.isCoupon = false
      }
    }
  }
</script>

<style lang='scss' scoped>
    .container {
        .pop-ups{
            width: 300px;
            height: 384px;
            // margin: 50% auto 0;
            background: url("../../../assets/image/1212/coupon-1212.png") no-repeat;
            background-size: contain;
            position: relative;
            .coupon-btn{
                position: absolute;
                bottom: 30px;
                left: 0;
                width: 100%;
                .btn{
                    width:128px;
                    height:38px;
                    line-height: 38px;
                    text-align: center;
                    margin: 0 auto;
                    background:linear-gradient(0deg,rgba(254,254,254,1),rgba(255,250,231,1),rgba(240,212,156,1));
                    box-shadow:0px 3px 7px 0px rgba(146,0,0,0.51);
                    border-radius:32px;
                    font-size:14px;
                    font-family:Alibaba PuHuiTi;
                    font-weight:400;
                    color:rgba(205,0,0,1);
                }
            }
        }
        .title {
            font-size: 0;
            text-align: right;
            img {
                width: 26px;
            }
        }
        .coupon-pop {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            max-height: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, .5);
        }
    }
</style>