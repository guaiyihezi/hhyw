<template>
  <div class="container">
    <mt-header class="header" title="浣豆使用说明">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <div class="introduce-wrapper">
      <div class="what-is-hd">
        <p class="title-wrapper">浣豆是什么</p>
        <p>浣豆是用户在换换商城签到、分享、评论产生的权益积分，在换换商城消费可使用浣豆享受折扣优惠。</p>
      </div>
      <div class="how-to-get-hd">
        <p class="title-wrapper">浣豆如何获取</p>
        <p>浣豆可通过注册、登陆、完善个人信息、签到、抽奖、购物、评价、晒单、拉新等方式获得。</p>
        <!-- <table>
					<thead>
						<tr class="table-head">
							<th>浣豆获得</th>
							<th>数额</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>注册</td>
							<td>注册送50浣豆</td>
						</tr>
						<tr>
							<td>登录</td>
							<td>登陆赠送0.1浣豆</td>
						</tr>
						<tr>
							<td>首次填写性别</td>
							<td>送5浣豆</td>
						</tr>
						<tr>
							<td>首次填写生日</td>
							<td>送5浣豆</td>
						</tr>
						<tr>
							<td>首次上传头像</td>
							<td>送5浣豆</td>
						</tr>
						<tr>
							<td>签到</td>
							<td>每连续签到3日，送2浣豆；</td>
						</tr>
						<tr>
							<td>抽奖</td>
							<td>每次消耗10浣豆（奖品额度为50、100、200,中奖概率为3%/1%/0.5%;其他奖品为实物）</td>
						</tr>
						<tr>
							<td>购物</td>
							<td>购物1/100返浣豆（以实付金额为准，不包括余额、优惠券、打折卡、满减卡等减免金额）</td>
						</tr>
						<tr>
							<td>文字评价</td>
							<td>文字好评送5浣豆</td>
						</tr>
						<tr>
							<td>晒单评价</td>
							<td>文字+图片晒单送10浣豆</td>
						</tr>
						<tr>
							<td>邀新奖励</td>
							<td>升级成为尊享会员，赠送200浣豆</td>
						</tr>
						<tr>
							<td>升级奖励</td>
							<td>升级成为尊享会员，赠送200浣豆</td>
						</tr>
					</tbody>
				</table> -->
      </div>
      <div class="how-to-use-hd">
        <p class="title-wrapper">浣豆如何使用</p>
        <div class="use-content">
          <p>
            <span>1、</span>
            <span>用户购物时在支付页面选择使用浣豆抵扣，并根据支付 订单详情确定浣豆可使用的数量；</span>
          </p>
          <p>
            <span>2、</span>
            <span
              >用户在支付页面根据订单详情和自己的支付情况可请求 他人代为支付浣豆。用户在订单支付页面可选取代支付
              账号，在用户点击支付时完成浣豆代支付；
            </span>
          </p>
          <p>
            <span>3、</span>
            <span>用户使用浣豆抵扣额度与人民币比例为1:1；</span>
          </p>
          <p>
            <span>4、</span>
            <span>用户账户内的浣豆仅支持当前账户支付使用以及代替他 人支付，不支持转赠他人、交易流通；</span>
          </p>
          <p><span>5、</span><span>订单中浣豆优惠折扣支付部分不开具发票。</span></p>
        </div>
      </div>
      <div class="hd-use-range">
        <p class="title-wrapper">浣豆适用范围</p>
        <div class="use-content">
          <p>
            <span>1、</span>
            <span>浣豆可用与于换换商城第三方【所有商品】及自营商 品；具体使用范围以实际可支付订单为准；</span>
          </p>
          <p>
            <span>2、</span>
            <span>浣豆抵扣使用上限为商品支付价格的99%；</span>
          </p>
          <p>
            <span>3、</span>
            <span>换换商城会定期推出浣豆换购、抽奖、拼团、夺宝等 活动，用户在可使用自己账户里的浣豆参与任意活动。</span>
          </p>
        </div>
      </div>
      <div class="hd-surplus">
        <p class="title-wrapper">浣豆有效期</p>
        <p>浣豆属于换换商城高级通用权益积分，浣豆有效期限规则如下：</p>
        <div class="use-content">
          <p>
            <span>1、</span>
            <span>用户通过第二条规定(浣豆如何获取)的方式获得的浣豆 有效期：</span>
          </p>
          <p>
            <span></span>
            <span class="word-color"
              >浣豆有效期最长为1年，从获得浣豆开始至次年末，逾 期自动清零；后续浣豆以自然年清零；</span
            >
          </p>
          <p>
            <span>2、</span>
            <span>用户通过其它方式获得的浣豆有效期：</span>
          </p>
          <p>
            <span></span>
            <span class="word-color">浣豆无有效期。即从浣豆获得开始一直有效，直至用户 将浣豆支付消耗完毕。</span>
          </p>
        </div>
      </div>
      <div class="hd-expires">
        <p class="title-wrapper">浣豆余额及明细查询</p>
        <div>
          <p>
            用户账户里的浣豆余额、收支明细可以通过换换商城App或h5页面查询。
          </p>
          <p>
            查询具体路径：换换商城 - 我的 - 我的浣豆 - 查询余额 - 查看明细。
          </p>
        </div>
      </div>
      <div class="hd-use-persons">
        <p class="title-wrapper">浣豆使用人群</p>
        <div class="use-content">
          <p>
            <span>1、</span>
            <span>浣豆只限换换商城的实名手机号注册用户使用；</span>
          </p>
          <p>
            <span>2、</span>
            <span>若未验证手机号用户，首次获得浣豆需要验收注册用户手机号；</span>
          </p>
          <p>
            <span>3、</span>
            <span>合作平台用户，需要在换换商城验证身份后，方可使用。</span>
          </p>
        </div>
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
.introduce-wrapper {
  height: 100%;
  padding: 15px;
  background-color: #fff;
  p {
    font-size: 13px;
    font-weight: 400;
    color: #666666;
    margin-bottom: 10px;
    span:first-child {
      // display: inline-flex;
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
