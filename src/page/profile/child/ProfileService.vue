<template>
  <div class="profile-service">
    <div class="service-head">
      我的服务
    </div>
    <div class="service-wrapper">
      <div class="service-item" @click="goFavourite" v-stat="{ id: 'profile_collection' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service1.png" alt="" />
        <label>我的收藏</label>
      </div>
      <div class="service-item" @click="goAddress" v-stat="{ id: 'profile_address' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service2.png" alt="" />
        <label>管理地址</label>
      </div>
      <div class="service-item" @click="goHelp" v-stat="{ id: 'profile_help' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service4.png" alt="" />
        <label>帮助中心</label>
      </div>
      <!-- IOS044提审 -->
      <div class="service-item" @click="goMyAuction" v-if="!utils.forIOSCheck()" v-stat="{ id: 'profile_auction' }">
        <img src="../../../assets/image/hh-icon/f0-profile/my-c2b@3x.png" alt="" />
        <label>我的竞拍</label>
      </div>
      <div class="service-item" @click="goCooperation" v-stat="{ id: 'profile_cooperation' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service6.png" alt="" />
        <label>招商合作</label>
      </div>
      <!-- 权益中心 -->
      <div class="service-item" @click="goLegalRightCenter" v-if="showHbArea" v-stat="{ id: 'profile_debtarea' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service5.png" alt="" />
        <label>权益专区</label>
      </div>
      <!-- 价格投诉 -->
      <div class="service-item" @click="goJudgeRecord" v-stat="{ id: 'profile_priceJudge' }">
        <img src="../../../assets/image/hh-icon/f0-profile/icon-service-price-judge@2x.png" alt="" />
        <label>价格投诉</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'ProfileService',
  data() {
    return {}
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    }),
    showHbArea() {
      // 2019-08-08 24:00:00 关闭权益专区入口
      return this.getSysTime() < 1565280000000
    }
  },

  methods: {
    goFavourite() {
      if (this.isOnline) {
        this.$router.push('collection')
      } else {
        this.showLogin()
      }
    },
    goAddress() {
      if (this.isOnline) {
        this.$router.push({ name: 'addressManage' })
      } else {
        this.showLogin()
      }
    },
    goHelp() {
      this.$router.push({ name: 'help' })
    },
    goMyAuction() {
      this.$router.push({ name: 'myc2b', query: { nav: 0 } })
    },
    goCooperation() {
      window.location.href =
        'https://m.huanhuanyiwu.com/operation/index.php?url=https%3A%2F%2Fwww.itouzi.com%2Fe%2Fzhaoshang_wap'
    },
    // A类用户去往权益中心
    goLegalRightCenter() {
      this.$router.push({
        name: 'products',
        query: {
          sort_key: 6,
          from: 'ucenter'
        }
      })
    },
    // 价格投诉记录
    goJudgeRecord() {
      this.$router.push({ name: 'myPriceJudge' })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-service {
  background-color: #ffffff;
  .service-head {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    line-height: 25px;
    padding: 15px;
  }
  .service-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .service-item {
      width: 25%;
      // flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      padding: 5px 0 15px;
      img {
        width: 30px;
        height: 30px;
      }
      label {
        font-size: 12px;
        font-weight: 300;
        color: #404040;
        line-height: 17px;
        margin-top: 7px;
      }
    }
  }
}
</style>
