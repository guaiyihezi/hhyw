<template>
  <div class="container">
    <div class="header-container">
      <mt-header class="header" fixed title="价格投诉详情">
        <header-item slot="right" title="完成" v-on:onclick="goBack" titleColor="#552E20"></header-item>
      </mt-header>
    </div>
    <div class="container-wrapper">
      <div class="result">
        <template v-if="info.status == 1">
          <img src="../../assets/image/hh-icon/price-complant/ico-unc.png" alt="待确认图标" />
          <label class="pay-result-title">待处理</label>
          <p>平台客服正在处理中 请耐心等待</p>
        </template>
        <template v-else-if="info.status == 2">
          <img class="result-icon" src="../../assets/image/hh-icon/b10-pay/pay-success@3x.png" />
          <label class="pay-result-title">投诉成功</label>
        </template>
        <template v-else>
          <img class="result-icon" src="../../assets/image/hh-icon/price-complant/ico-fail.png" alt="失败图标" />
          <label class="pay-result-title">投诉失败</label>
        </template>
      </div>
      <div class="complaintCom">
        <div class="linebox">
          <label>投诉商品</label>
          <p>{{ info.goodsName }}</p>
        </div>
        <div class="linebox">
          <label>提交投诉时间</label>
          <p>{{ utils.formatDate('YYYY-MM-DD HH:mm:ss', info.createTime) }}</p>
        </div>
        <div class="linebox">
          <label>比价平台</label>
          <p>{{ info.nameCn }}</p>
        </div>
        <div class="linebox">
          <label>商品链接</label>
          <p>{{ info.targetGoodsUrl }}</p>
        </div>
        <div class="linebox">
          <label>商品价格</label>
          <p>{{ price(info.targetNormalPrice) }} 元</p>
        </div>
        <div class="linebox" v-if="info.targetDiscountPrice">
          <label>优惠价格</label>
          <p>{{ price(info.targetDiscountPrice) }} 元</p>
        </div>
        <div class="linebox">
          <label>图片</label>
          <div class="imgthumbnail">
            <span v-for="(imgItem, imgItemIndex) in PicArr" :key="imgItemIndex">
              <img :src="substring(imgItem)" alt="反馈图片" />
            </span>
          </div>
        </div>
      </div>
      <div class="PTresult" v-show="info.status != 1">
        <div class="linebox">
          <label>平台处理时间</label>
          <p>{{ utils.formatDate('YYYY-MM-DD HH:mm:ss', info.updatedTime) }}</p>
        </div>
        <template v-if="info.status == 2">
          <div class="linebox">
            <label>投票结果</label>
            <p>投诉成功</p>
          </div>
          <div class="linebox">
            <label>商家处罚</label>
            <p>{{ info.punishResult }}</p>
          </div>
          <div class="linebox">
            <label>用户奖励</label>
            <p>{{ info.result }}</p>
          </div>
        </template>
        <template v-else>
          <div class="linebox">
            <label>投票结果</label>
            <p>投诉失败</p>
          </div>
          <div class="linebox">
            <label>原因</label>
            <p>{{ Reson(info.failReason) }}</p>
          </div>
          <div class="linebox">
            <label>备注</label>
            <p>{{ info.remarks }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { priceDetail } from '../../api/PriceComplaint.js'
export default {
  name: 'goodsPriceComplaintDetail',
  data() {
    return {
      id: this.$route.params.id ? this.$route.params.id : '',
      info: { status: 3, failReason: 1 },
      PicArr: []
    }
  },
  created() {
    if (!this.isOnline) {
      // this.goBack()
    }
    this.getPriceDetail()
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    })
  },
  methods: {
    goBack() {
      this.$_goBack()
    },
    getPriceDetail() {
      priceDetail(this.id).then(res => {
        console.log(res)
        this.info = res
        this.PicArr = res.targetGoodsPics.split(',')
      })
    },
    price(val) {
      return val ? val : 0
    },
    substring(str) {
      if (str.indexOf('uploadId') != -1) {
        str = str.match(/(\S*)uploadId/)[1]
      }
      return str
    },
    Reson(val) {
      // '商品价格合理','链接商品已下架','平台商品已下架'
      let opt = [
        { id: 1, name: '商品价格合理' },
        { id: 2, name: '链接商品已下架' },
        { id: 3, name: '平台商品已下架' }
      ]
      let find = opt.find(item => {
        if (item.id == val) {
          return item
        }
      })
      return find ? find.name : ''
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
  font-family: PingFangSC-Light, PingFang SC;
  .header {
    @include header;
    flex-basis: 44px;
    position: relative !important;
  }
  .container-wrapper {
    flex: 1;
    background: #fff;
    overflow: auto;
    .result {
      text-align: center;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 20px;
      img {
        width: 60px;
        height: 60px;
        display: block;
        margin: 50px auto 20px;
      }
      color: #404040;
      font-size: 24px;
      p {
        font-size: 14px;
        color: #b5b6b6;
        padding-top: 20px;
      }
    }
    .complaintCom,
    .PTresult {
      color: #404040;
      padding: 20px;
    }
    .complaintCom {
      border-bottom: 1px solid #f4f4f4;
    }
    .linebox {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 20px;
      &:last-child {
        padding: 0;
      }
      label {
        color: #707070;
        flex: 1;
        min-width: 100px;
      }
      p {
        word-break: break-all;
      }

      .imgthumbnail {
        display: flex;
        flex-direction: row;
        span {
          display: inline-block;
          margin-left: 2%;
          img {
            width: 80px;
            height: 80px;
            background: #f3f0ff;
            border: 1px solid rgba(85, 46, 32, 0.1);
            line-height: 80px;
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
