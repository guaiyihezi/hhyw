<!-- promotions.vue -->

<template>
  <div
    class="ui-promotions-wrapper ui-detail-common"
    @click="openPopup"
    v-if="detailInfo.tags_info && detailInfo.tags_info.length > 0"
  >
    <div class="promotions-header">促销</div>
    <!-- 展示促销信息 -->
    <div class="promotions-body">
      <!--  -->
      <div class="body-list">
        <span class="promos-title" :style="promoStyle(detailInfo.tags_info[0])">{{
          detailInfo.tags_info[0].name
        }}</span>
        <!-- <img src="../../../assets/image/change-icon/c0_sale@2x.png" /> -->
        <span class="promos-desc">{{ detailInfo.tags_info[0].desc }}</span>
      </div>
      <!-- <template v-for="(item, index) in detailInfo.tags_info"></template> -->
    </div>
    <img src="../../../assets/image/change-icon/icon_more.png" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo
    })
  },

  methods: {
    ...mapMutations({
      savePromosPopupState: 'savePromosPopupState'
    }),

    /*
        openPopup:
      */
    openPopup() {
      this.savePromosPopupState(true)
    },

    promoStyle(item) {
      const o = {}
      o.borderColor = item.color
      o.backgroundColor = item.color
      return o
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-promotions-wrapper {
  height: auto;
  &.ui-detail-common {
    margin-top: 0;
    padding: 10px 15px;
    display: flex;
    align-items: baseline;
    @include thin-border(#dbdbdb, 15px, auto, true);
  }
  .promotions-header {
    text-align: left;
    line-height: 30px;
    font-size: 14px;
    color: #999999;
  }
  .promotions-body {
    background: #fff;
    flex: 1;
    overflow: hidden;
    .body-list {
      margin-left: 10px;
      line-height: 1.5;
      display: flex;
      flex-direction: row;
      letter-spacing: 0;
      img {
        width: 15px;
        height: 15px;
      }
      span {
        display: inline-block;
        letter-spacing: normal;
        @include sc(12px, #666666);
        &.promos-title {
          @include sc(11px, #ffffff, left top);
          white-space: nowrap;
          padding: 0 8px;
          background: #f90069;
          text-align: center;
          line-height: 18px;
          border-radius: 20px;
        }
        &.promos-desc {
          white-space: nowrap;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 16px;
        }
      }
    }
  }
  & > img {
    width: 19px;
    margin-left: 10px;
    transform: translateY(-100%);
  }
}
</style>
