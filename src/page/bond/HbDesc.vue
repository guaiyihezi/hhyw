<template>
  <div class="container">
    <mt-header class="header" title="权益说明">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <div class="introduce-wrapper">
      <div class="what-is-hd">
        <p class="title-wrapper">权益积分是什么？</p>
        <p>
          权益积分是换换商城依据商家的让利定制营销策略而通用的商城购物积分，用户可用于购物时抵消部分现金货款。
        </p>
      </div>
      <div class="how-to-get-hd">
        <p class="title-wrapper">权益积分适用范围？</p>
        <p>权益积分等同于现金，可以在换换商城购买商品，未来可与生日礼券、会员折扣、优惠券等同时使用。</p>
      </div>
      <div class="how-to-get-hd">
        <p class="title-wrapper">权益积分兑换比例？</p>
        <p>权益积分兑换，用户可将符合兑换条件的债权按照1:1的比例兑换成权益积分 。</p>
      </div>
      <div class="how-to-use-hd">
        <p class="title-wrapper">债权兑换成权益积分的条件？</p>
        <div class="use-content">
          <p>
            <span>1、</span>
            <span>可兑换权益积分的债权项目类型，有「省心计划」、「智选系列」两类；</span>
          </p>
          <p>
            <span>2、</span>
            <span>可兑换权益积分的债权项目状态，有「展期中」、「处置中」、「还款中」三种； </span>
          </p>
          <p>
            <span>3、</span>
            <span>债权的转让状态为「转让中」、「已转让」状态时，该笔债权不支持兑换权益积分；</span>
          </p>
          <p>
            <span>4、</span>
            <span
              >单笔债权余额不足100元的，或者单笔债权兑换权益积分后剩余余额不足100元的，在兑换权益积分时需一次性兑换该笔债权的全部金额。</span
            >
          </p>
        </div>
      </div>
      <div class="how-to-get-hd">
        <p class="title-wrapper">如何查询权益积分兑换记录？</p>
        <p>可以通过「我的」-「我的权益」-「收支明细」里面查询权益积分的兑换记录及支付记录。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BindHDRules',
  methods: {
    goBack() {
      this.$_goBack()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
.introduce-wrapper {
  height: 100%;
  padding: 15px;

  p {
    font-size: 13px;
    font-weight: 400;
    color: #666;
    margin-bottom: 10px;
    span:first-child {
      width: 25px;
    }
  }
  p.title-wrapper {
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #404040;
    line-height: 22px;
  }
  .use-content p {
    display: flex;
  }
  table {
    tr {
      th,
      td {
        padding: 6px 10px;
      }
      height: 27px;
      @include sc(11px, #75522f);
      th {
        text-align: left;
        font-size: 13px;
        background-color: #f2ebdf;
      }
      td:first-child {
        width: 98px;
      }
    }
    tbody {
      tr:nth-child(odd) {
        background-color: #fdf9f3;
      }
    }
  }
  .word-color {
    color: #999;
  }
}
</style>
