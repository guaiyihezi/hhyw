<template>
  <div class="bid-wrapper" v-if="list.length > 0">
    <div class="title">出价记录</div>
    <div class="lists">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <img v-if="item.avatar" :src="item.avatar" alt="用户头像" />
        <img v-else src="../../../assets/image/hh-icon/mlm/mlm-buyer-avator@3x.png" alt="默认头像" />
        <span class="name">{{ item.nickname }}</span>
        <span class="time">{{ utils.formatDate('HH:mm:ss', item.created_at) }}</span>
        <span class="icon" v-if="index == 0"><span>领先</span></span>
        <span class="price">￥{{ utils.formatMoney(item.paipai_price) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAuctionBidList } from '../../../api/auction'
export default {
  name: '',
  data() {
    return {
      list: []
    }
  },

  created() {
    this.getList()
  },

  computed: {
    ...mapState({
      auctionInfo: state => state.auction.auctionInfo
    })
  },

  methods: {
    ...mapMutations({
      saveAuctionInfo: 'saveAuctionInfo'
    }),

    getList() {
      getAuctionBidList(this.auctionInfo.id).then(res => {
        const info = {
          ...this.auctionInfo,
          ...{
            current_price: res.current_price,
            money_line: res.money_line
          }
        }
        this.saveAuctionInfo(info)

        this.list = res.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bid-wrapper {
  background-color: #ffffff;
  margin-bottom: 14px;
  padding: 15px 15px 20px;
}
.title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(64, 64, 64, 1);
  line-height: 20px;
}
.lists {
  .list-item {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 26px;
      height: 26px;
      border-radius: 13px;
      overflow: hidden;
    }
    .name {
      margin-left: 15px;
      font-size: 14px;
      color: #666666;
    }
    .time {
      margin-left: 10px;
      font-size: 14px;
      color: #666666;
      flex: 1;
    }
    .icon {
      height: 13px;
      width: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ef7e2f;
      border-radius: 7px;
      span {
        display: inline-block;
        @include sc(10px, #ffffff);
      }
    }
    .price {
      color: #666666;
      font-size: 14px;
      margin-left: 3px;
    }
  }
}
</style>
