<template>
  <div class="price-judge-container">
    <mt-header class="header" title="价格投诉说明">
      <header-item slot="left" :isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <div class="content">
      <p class="before-desc">
        为加强对换换商城的商品进行监督管理，给广大用户创造一个良好的购物环境，换换商城在商品详情页已开通价格投诉入口。若您在换换商城遇见价格不合理的商品，欢迎您在商品详情页进行价格投诉，平台将在3个工作日内进行核实，投诉成功后，系统自动给您发放奖励并对商家进行处罚。
      </p>

      <h2 class="item-title">1.换换商城商品定价规则：</h2>
      <div class="item-content">
        <p>
          换换商城的商品价格（现金+权益价）不得高于天猫旗舰店、京东自营、苏宁自营等主流电商平台商品的售价（标价）；
        </p>
        <p>
          上述定价规则不适用于分期商品、竞拍商品、秒杀商品、限时促销商品。
        </p>
      </div>
      <h2 class="item-title">2.用户投诉奖励机制：投诉成功即奖励用户10元无门槛现金优惠券。</h2>
      <h2 class="item-title">3.换换商城商家处罚内容：</h2>
      <div class="item-content">
        <p>
          投诉成功后，商品自动下架，商家整改审核通过后才能继续售卖；商家多次违规的，商城将会对其进行退店处理，并依据《商家入驻及经营协议》的相关条款向商家主张违约责任。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$_goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.price-judge-container {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.header {
  @include header;
}
.content {
  flex: 1 0 0;
  overflow-y: auto;
  padding: 16px 15px 30px;

  .before-desc {
    font-size: 14px;
    color: rgba(112, 112, 112, 1);
    line-height: 28px;
  }
  .item-title {
    margin-top: 24px;
    font-size: 14px;
    color: rgba(64, 64, 64, 1);
    line-height: 20px;
  }
  .item-content p {
    text-indent: 2em;
    font-size: 14px;
    color: rgba(64, 64, 64, 1);
    line-height: 28px;
    margin-top: 10px;
  }
}
</style>
