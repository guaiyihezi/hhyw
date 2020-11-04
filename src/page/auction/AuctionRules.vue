<template>
  <div class="rules-contianer">
    <mt-header class="header" title="竞拍规则">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"> </header-item>
    </mt-header>
    <div class="rules-content">
      <div>
        <div class="rules-list" v-for="(rule, index) in rules" :key="`rules${index}`">
          <div class="title">{{ rule.title }}</div>
          <ol>
            <li v-for="(list, i) in rule.list" :key="`rule${i}`">{{ list }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const rules = [
  {
    title: '报名规则',
    list: [
      '买家需要报名（支付保证金）方可参与竞拍',
      '保证金只能用现金支付，不参与权益抵扣',
      '竞拍未开始/进行中，买家均可以进行报名',
      '支付保证金的额度，每个竞拍商品有不同的设置'
    ]
  },
  {
    title: '出价规则',
    list: [
      '竞拍开始后，已报名（支付保证金）的买家可以进行出价操作',
      '加价幅度有两个维度：现金加价幅度和权益加价幅度，每次出价都必须同时满足最小现金加价幅度和最小权益加价幅度（可以是最小加价幅度的整数倍）',
      '最小加价幅度，每个竞拍商品有不同的设置',
      '在买家出价已领先的情况下，不能连续出价',
      '当有买家在竞拍结束前3分钟内出价时，竞拍结束时间延迟3分钟'
    ]
  },
  {
    title: '竞拍结果',
    list: [
      '竞拍结束后，出价最高者竞拍成功',
      '竞拍成功则系统将会产生一个待支付的订单，竞拍者需要在24小时内支付订单款项',
      '订单款项中权益部分可用权益积分进行抵扣，如果权益积分不够，可用现金支付'
    ]
  },
  {
    title: '保证金说明',
    list: [
      '报名的保证金，如果买家未竞拍成功，则保证金会在竞拍结束后的3个工作日内释放，退回原支付渠道',
      '如果买家竞拍成功，则保证金会在买家支付完订单后的3个工作日内释放，退回原支付渠道',
      '如果买家竞拍成功，但未按约定时间完成竞拍订单的支付，则保证金将会被扣除'
    ]
  }
]
export default {
  name: 'auctionRules',
  data() {
    return {
      rules
    }
  },

  methods: {
    goBack() {
      this.$_goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.rules-contianer {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 0;
  @include thin-border();
}
.rules-content {
  padding: 0 20px 20px;
  background-color: #fff;
  flex-grow: 1;
  overflow: auto;
  color: #404040;
  .title {
    margin-top: 20px;
    font-size: 15px;
  }
  ol {
    padding-left: 1em;
    li {
      font-size: 14px;
      margin-top: 10px;
      line-height: 20px;
      font-weight: 300;
    }
  }
}
</style>
