<template>
  <div class="ui-detail" :class="{ 'is-fixed-detail': prodDetailIsFixed }">
    <mt-navbar v-model="selected" class="prod-detail-navbar">
      <template v-if="detailInfo.custom_specification.length > 0">
        <mt-tab-item id="1" class="prod-detail-tab-item">详情</mt-tab-item>
        <mt-tab-item id="2" class="prod-detail-tab-item">规格参数</mt-tab-item>
      </template>
    </mt-navbar>
    <mt-tab-container v-model="selected" :class="{ 'prod-detail-tab': detailInfo.custom_specification.length > 0 }">
      <mt-tab-container-item class="prod-detail-tab-cont" id="1">
        <desc-item :url="detailInfo.intro_url" :unqie="detail" v-if="detailInfo"></desc-item>
      </mt-tab-container-item>
      <template v-if="detailInfo.custom_specification.length > 0">
        <mt-tab-container-item class="prod-detail-tab-cont" id="2" style="padding: 0 15px;box-sizing: border-box;">
          <div class="spcfict-wrapper">
            <div class="item" v-for="(item, index) in detailInfo.custom_specification" :key="index">
              <div class="title">{{ item.name }}</div>
              <div class="name">{{ item.attr_value }}</div>
            </div>
          </div>
        </mt-tab-container-item>
      </template>
    </mt-tab-container>
    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DescItem from './DescItem'
export default {
  data() {
    return {
      selected: '1',
      detail: 'detail',
      isshowBacktop: false,
      scrollEle: null
    }
  },

  props: ['prodDetailIsFixed', 'prodDetailOfstHt'],

  mounted() {
    this.scrollEle = document.querySelector('.ui-detail-swiper')
  },

  components: {
    'desc-item': DescItem
  },

  computed: mapState({
    detailInfo: state => state.detail.detailInfo
  }),

  methods: {
    taggleTabs() {
      this.scrollEle.scrollTop = this.prodDetailOfstHt
    }
  },

  watch: {
    selected: function(value) {
      this.taggleTabs()
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-detail {
  position: relative;
  &.is-fixed-detail {
    .prod-detail-navbar {
      position: fixed;
      width: 100%;
      top: 50px;
      z-index: 1000;
    }
    .prod-detail-tab {
      padding-top: 36px;
    }
  }
  .prod-detail-navbar {
    @include thin-border();
    .prod-detail-tab-item {
      color: #666666;
      padding: 12px 0;
      font-size: 12px;
      position: relative;
      &.is-selected {
        color: $primaryColor;
        text-decoration: none;
        border-bottom: none;
        margin-bottom: 0;
        &:before {
          content: '';
          display: block;
          width: 35px;
          height: 2px;
          background-color: $primaryColor;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .prod-detail-tab-cont {
    background-color: #ffffff;
    .spcfict-wrapper {
      padding-bottom: 50px;
      .item {
        display: flex;
        align-items: flex-start;
        padding: 10px 5px 10px 0;
        @include thin-border(#d8d8d8, 0, 0, true);
        .title {
          width: 110px;
          box-sizing: border-box;
          padding-right: 10px;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
        }
        .name {
          flex: 1;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(64, 64, 64, 1);
          line-height: 18px;
        }
      }
    }
  }
}
</style>
