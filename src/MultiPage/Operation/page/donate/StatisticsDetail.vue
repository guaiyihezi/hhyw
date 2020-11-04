<template>
  <div class="stat-container">
    <mt-header class="header" title="捐赠详情">
      <header-item slot="left" :isBack="true" v-on:onclick="$_goBack"></header-item>
    </mt-header>
    <div class="content">
      <div class="data-pannel">
        <div class="sub-wrapper">
          <div class="done">
            <p class="num">{{ info.money | formatMoney }}</p>
            <span class="txt">本次捐赠金额(元)</span>
          </div>
          <div class="rest">
            <p class="num">{{ info.order_num | formatMoney }}</p>
            <span class="txt">爱心订单数(笔)</span>
          </div>
        </div>
        <p class="font" v-show="!(info.order_num >= 1000)">爱心订单不足1000笔，平台补足至1000元进行捐赠。</p>
      </div>
      <div class="certificate">
        <p class="title">捐赠凭证</p>
        <div class="pic-wrapper">
          <img :src="info.img_url" />
        </div>
      </div>
      <div class="certificate">
        <p class="title">
          爱心订单明细（{{ utils.formatDate('M.D', info.order_start_time) }} -
          {{ utils.formatDate('M.D', info.order_end_time) }} 期间订单）
        </p>
        <div class="list-header">
          <ul>
            <li>
              <span class="who">下单用户</span>
              <span class="when">下单时间</span>
              <span class="money">订单号</span>
            </li>
          </ul>
        </div>
        <div class="list-body">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <span class="who">{{ item.mask_phone }}</span>
              <span class="when">{{ item.add_time | convertTime }}</span>
              <span class="money">{{ item.order_sn }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-bottom" v-if="list.length <= 0 && !isMore">
        <p>列表为空</p>
      </div>
      <div class="list-bottom" v-if="list.length > 0 && !isMore">
        <p>没有更多了</p>
      </div>
      <div class="list-bottom" v-if="isMore">
        <p @click="getMore">查看更多 ></p>
      </div>
    </div>
    <!-- <popup-image-share ref="photoSharePopup" v-model="photoShareFlag"></popup-image-share> -->
  </div>
</template>

<script>
// import { PopupImageShare } from '../../../../components/common'
import { getDonateStatDetail, getDonateStatList } from '../../api/donate'
export default {
  name: 'DonateStat',
  data() {
    return {
      log_id: this.$route.params.log_id ? this.$route.params.log_id : '',
      params: { page: 1, size: 10 },
      info: {
        // log_id: 1,
        // money: '100.00', //捐赠金额
        // donate_time: 1509992998, //捐赠时间
        // order_start_time: 1580486400, //涉及订单开始时间
        // order_end_time: 1589817600, //涉及订单截止时间
        // img_url: 'https://www.ddfadfds.img', //捐赠图片地址
        // order_num: 8 //爱心订单数
      },
      list: [],
      isMore: true
      // 分享
      // photoShareFlag: true
    }
  },
  created() {
    this.$indicator.open()
    getDonateStatDetail(this.log_id)
      .then(res => {
        console.log(res)
        this.info = res
      })
      .finally(() => {
        this.$indicator.close()
      })
    this.getList()
  },
  methods: {
    // 获取订单列表
    getList() {
      this.$indicator.open()
      this.params.log_id = this.log_id
      getDonateStatList(this.params)
        .then(res => {
          this.list = [...this.list, ...res.list]
          this.isMore = res.paged.more == 1 ? true : false
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    //  加载更多数据
    getMore() {
      this.params.page++
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.stat-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.content {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px 15px;
  background-color: #fff;
  box-sizing: border-box;
  .data-pannel {
    text-align: center;
    border-radius: 10px;
    padding: 14px 12px;
    background: linear-gradient(135deg, rgba(255, 85, 78, 1) 0%, rgba(248, 53, 44, 1) 100%);
    .font {
      font-size: 13px;
      border-top: 1px dashed rgba(255, 147, 147, 0.5);
      color: rgba(255, 255, 255, 0.6);
      padding-top: 10px;
    }
    .num {
      line-height: 1.4;
      font-size: 30px;
      color: rgba(255, 255, 255, 1);
    }
    .txt {
      line-height: 1.4;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
    }
    .sub-wrapper {
      display: flex;
      padding: 0 20px 20px;
      justify-content: space-between;
    }
  }
  .certificate {
    margin-top: 20px;

    .title {
      font-size: 15px;
      padding-bottom: 10px;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
    }
    .pic-wrapper {
      img {
        width: 100%;
        background: url(../../assets/image/donate/img_bg.png) no-repeat;
        background-size: 100%;
        min-height: 110px;
        border: none;
      }
    }
  }
  ul li {
    width: 100%;
    font-size: 12px;
    text-align: center;
    display: flex;
    .who {
      width: 22%;
      padding-left: 10px;
    }
    .when {
      width: 40%;
    }
    .money {
      flex: 1 0 0;
      padding-right: 10px;
    }
  }
  .list-header {
    li {
      height: 30px;
      line-height: 30px;
      background: #fff5f5;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
    }
  }
  .list-body {
    li {
      height: 45px;
      line-height: 45px;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      @include thin-border(rgba(242, 242, 242, 1));
    }
  }
  .list-bottom {
    padding: 20px 0 16px;
    text-align: center;

    p {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 14px;
      background: rgba(253, 242, 242, 1);
      border-radius: 10px;
      font-size: 12px;
      color: rgba(188, 150, 150, 1);
    }
  }
}
</style>
