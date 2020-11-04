<template>
  <div class="index-container">
    <mt-header class="header" title="爱心捐赠">
      <header-item slot="left" :isBack="true" v-on:onclick="$_goBack"></header-item>
      <div slot="right" @click="shareImg" v-stat="{ id: 'donate_share_index' }" class="icon-share">
        <img src="../../assets/image/donate/share@2x.png" />
      </div>
    </mt-header>
    <div class="index-content">
      <div class="banner">
        <img class="b-img" src="../../assets/image/donate/index-banner@2x.png" />
        <div class="bar">
          <div class="desc">
            <img class="ds-logo" src="../../assets/image/donate/hh-logo@2x.png" />
            <p class="ds-p">1月23日开始至疫情结束，用户每下一笔订单，换换商城将向湖北慈善及医疗机构捐款1元。</p>
          </div>
        </div>
      </div>
      <div class="desc-content">
        <p class="title1">
          新冠肺炎牵动着所有人的心，为支持疫情防控，换换商城将参与到这场疫情防控战役之中，贡献我们的力量！
        </p>
        <p class="title2">换换商城特此声明：</p>
        <p class="item">1. 自1月23日起至疫情结束，换换商城每成交一笔订单，换换商城将向湖北慈善及医疗机构捐款1元；</p>
        <p class="item">2. 换换商城将按照每周一次的方式定时捐款；</p>
        <p class="item">3. 每次捐款后，换换商城会在平台公示：捐赠凭证及涉及的爱心订单。</p>
        <p class="item-foot">乐善有恒，大爱无疆，湖北加油！中国加油！</p>
      </div>
      <div class="data-content data-love-order-content">
        <img class="title" src="../../assets/image/donate/index-title-zong-dingdan.png" />
        <p class="update-time">数据每分钟更新一次</p>
        <num-split-block :value="order_number" unit="笔" class="num-count"></num-split-block>
        <list-love-order :list="list_love_order" class="list l-order"></list-love-order>
        <list-love-people :list="list_love_people" class="list l-people"></list-love-people>
      </div>
      <div class="data-content data-juanzeng-records">
        <img class="title" src="../../assets/image/donate/index-title-leiji-juanzeng.png" />
        <p class="update-time">数据每周更新一次</p>
        <num-split-block :value="juanzeng_money" unit="元" class="num-count"></num-split-block>
        <list-juanzeng-records :list="list_juanzeng" class="list list-juanzeng"></list-juanzeng-records>
      </div>

      <div class="footer">
        <p>— 活动最终解释权归换换商城所有 —</p>
      </div>
    </div>
    <!--分享海报-->
    <popup-image-share v-model="showSharePop"></popup-image-share>
  </div>
</template>

<script>
import ListLoveOrder from './child/ListLoveOrder'
import ListLovePeople from './child/ListLovePeople'
import ListJuanzengRecords from './child/ListJuanzengRecords'
import NumSplitBlock from './child/NumSplitBlock'
// 分享爱心捐赠海报
import { PopupImageShare } from '../../../../components/common'

import { getDonateOrderData, getDonateJuanzengList } from '../../api/donate'

// Mock
// import { Mock_Data_Orders, Mock_Data_Top10, Mock_Data_Juanzeng } from './Mock'

export default {
  name: 'DonateIndex',
  data() {
    return {
      list_love_order: [],
      list_love_people: [],
      list_juanzeng: [],
      order_number: 0,
      juanzeng_money: 0,
      showSharePop: false,
      timeInterval: null
    }
  },
  created() {
    // Mock
    // this.$indicator.open()
    // setTimeout(() => {
    //   this.$indicator.close()

    //   this.order_number = 100
    //   this.juanzeng_money = 8000

    //   this.list_love_order = Mock_Data_Orders
    //   this.list_love_people = Mock_Data_Top10
    //   this.list_juanzeng = Mock_Data_Juanzeng

    //   setTimeout(() => {
    //     this.list_love_order = this.list_love_order.map(item => {
    //       item.mask_phone = 'xxxxxxxxxx'
    //       return item
    //     })
    //   }, 10 * 1000)
    // }, 2000)

    this.getOrderData()
    this.getJuanzengData()
  },
  mounted() {
    // 1分钟(60*1000)更新一次订单数据
    this.timeInterval = setInterval(() => {
      this.getOrderData()
    }, 61000)
  },
  methods: {
    getOrderData() {
      this.$indicator.open()
      getDonateOrderData()
        .then(res => {
          this.order_number = res.total_num
          this.list_love_order = res.order_list
          this.list_love_people = res.top_list
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    getJuanzengData() {
      this.$indicator.open()
      getDonateJuanzengList()
        .then(res => {
          this.juanzeng_money = Number(res.total_money)
          this.list_juanzeng = res.list
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    shareImg() {
      console.log('share')
      this.showSharePop = true
    }
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  components: {
    NumSplitBlock,
    ListLoveOrder,
    ListLovePeople,
    ListJuanzengRecords,
    PopupImageShare
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-item: stretch;
  background: rgba(255, 238, 238, 1);
}

.index-content {
  flex: 1 0 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.banner {
  position: relative;
  width: 100%;
  height: 256px;

  img {
    display: block;
    width: 100%;
  }
  .bar {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 8px;

    .desc {
      height: 66px;
      background: linear-gradient(90deg, rgba(252, 68, 59, 1) 0%, rgba(255, 44, 44, 1) 100%);
      box-shadow: 0px 2px 6px 0px rgba(243, 37, 35, 0.26);
      border-radius: 33px;
      border: 1px solid rgba(255, 99, 99, 1);
      display: flex;
      align-items: center;
      padding: 0 15px;
    }
    .ds-logo {
      width: 42px;
      marign-left: 19px;
    }
    .ds-p {
      margin-left: 8px;
      font-size: 13px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
    }
  }
}
.desc-content {
  margin: 15px auto;
  padding: 20px 21px;
  width: 345px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 11px 0px rgba(255, 166, 166, 0.4);
  border-radius: 11px;

  .title1 {
    font-size: 14px;
    font-weight: bold;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
    text-indent: 2em;
  }
  .title2 {
    font-size: 14px;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .item {
    font-size: 14px;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
    margin-top: 8px;
  }
  .item-foot {
    font-size: 14px;
    font-weight: bold;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
    margin-top: 10px;
  }
}
.data-content {
  width: 345px;
  margin: 15px auto;
  padding: 30px 0 26px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 11px 0px rgba(255, 166, 166, 0.4);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    height: 22px;
  }
  .update-time {
    margin-top: 3px;
    font-size: 11px;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
  .num-count {
    margin-top: 30px;
  }

  .list {
    width: 315px;

    &.l-order {
      margin-top: 40px;
    }
    &.l-people {
      margin-top: 20px;
    }
    &.list-juanzeng {
      margin-top: 25px;
    }
  }
}

.footer {
  padding: 24px 68px 21px;

  p {
    border-radius: 23px;
    border: 1px solid rgba(220, 169, 169, 1);
    height: 27px;
    line-height: 25px;

    font-size: 10px;
    color: rgba(206, 148, 148, 1);
    letter-spacing: 1px;
    text-align: center;
  }
}
.icon-share {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 17px;
  }
}
</style>
