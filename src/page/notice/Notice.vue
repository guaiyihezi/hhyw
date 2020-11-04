<template>
  <div class="notice-container">
    <mt-header class="header" title="商城公告">
      <header-item slot="left" :isBack="true" @onclick="$_goBack"></header-item>
    </mt-header>
    <div class="content">
      <img src="../../assets/image/gonggao/gonggao-quanyi-to-jifen-banner.png" />
      <div class="txt-wrapper">
        <h2>致：尊敬的广大用户</h2>
        <p class="title">一、“浣币替换为权益积分”事宜说明</p>
        <p class="item">
          用户在换换商城使用的<span class="bold">浣币</span
          >是第三方保理公司委托换换商城发行的购物抵现券；同时，第三方保理公司基于自身及合作方（包括但不限于：爱投资债务企业等）的自有商品交换爱投资出借人用户的债权，并与用户于换换商城线上签订《债权转让协议》。
        </p>
        <p class="item">
          由于第三方保理公司与换换商城的浣币发行合作业务的终止，为了继续向广大用户提供债权权益消费服务，现由换换商城为主体向用户提供权益服务。<span
            class="bold"
            >权益积分</span
          >是换换商城依据商家的让利定制营销策略而通用的商城购物积分，用户可用于购物时抵消部分现金货款。
        </p>
        <p class="item">
          鉴于换换商城基础业务及上游业务模式的变更与调整，致使用户线上签订的协议需要更新。故换换商城特向广大用户公示、解释协议更新事宜，希望广大用户能积极配合换换商城完成新协议的签订。更新协议为：<a
            class="protocol"
            href="https://huanhuanoss.oss-cn-beijing.aliyuncs.com/202025/protocol-shouquan.pdf"
            >《授权书》</a
          ><a
            class="protocol"
            href="https://huanhuanoss.oss-cn-beijing.aliyuncs.com/202025/protocol-duihuanfuwu-v1.0.pdf"
            >《权益积分兑换协议》</a
          ><a class="protocol" href="https://huanhuanoss.oss-cn-beijing.aliyuncs.com/202025/protocol-zhuanrang-v1.1.pdf"
            >《债权转让协议》</a
          >
        </p>

        <p class="title">二、公告时间披露</p>
        <p class="item no-indent">
          1、公示期为<span class="bold">2020年2月6日至2020年2月9日，共计4天。</span
          >在公示期内，如果您想对公告事宜进行详细了解，您可以联系换换商城的客服人员，换换商城将在【48】小时内向您解答问题。
        </p>
        <p class="item no-indent">
          2、换换商城将于<span class="bold">2020年2月10日00:00</span
          >上线新协议及权益积分业务，同时关闭浣币业务服务功能。请您根据换换商城操作指引完成线上新协议签订；如若您拒绝签订新协议，您可使用全额现金进行购物消费。
        </p>
        <p class="item no-indent">
          3、换换商城将于<span class="bold">2020年2月12日00:00至2020年2月14日24:00</span
          >完成商城历史浣币的梳理、变更及账户划转，届时您的浣币将转为等值的权益积分，请您随时关注换换商城的公告或通知。
        </p>

        <p class="title">三、换换商城承诺</p>
        <p class="item">
          用户兑换的权益积分性质为购物现金抵扣积分，其<span class="bold"
            >使用方法、范围、权限和法律效果未发生变动和限制；</span
          >换换商城在本次升级中将为用户提供更全面、完善的权益消费服务；同时，商城将提供更优惠、高质量的商品以供您浏览、购买。
        </p>
        <p class="item no-indent">1、权益积分兑换比例—— 债权:权益积分 = <span class="bold">【1:1】</span></p>
        <p class="item no-indent">2、现金货款抵扣比例—— 权益积分:现金 = <span class="bold">【1:1】</span></p>

        <div class="foot">
          <p>公告人：换东换西（北京）信息技术有限公司</p>
          <p>公告日期：2020年2月6日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.notice-container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 0 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .txt-wrapper {
    padding: 0 15px;
  }
}
h2 {
  font-size: 14px;
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 20px;
  letter-spacing: 1px;
  margin-top: 15px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  letter-spacing: 1px;
  margin-top: 15px;
}
.item {
  font-size: 14px;
  color: rgba(64, 64, 64, 1);
  line-height: 22px;
  letter-spacing: 1px;
  text-indent: 2em;
  margin-top: 8px;

  &.no-indent {
    text-indent: 0;
  }
}
.bold {
  font-weight: bold;
}
.protocol {
  color: #2647bb;
  text-decoration: none;
}
img {
  display: block;
  width: 100%;
  height: 155px;
}
.foot {
  padding: 30px 0 37px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 20px;
  letter-spacing: 1px;
  text-align: right;

  p {
    margin-bottom: 8px;
  }
}
</style>
