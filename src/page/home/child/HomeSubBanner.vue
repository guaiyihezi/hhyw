<template>
  <div class="banner-icon">
    <div class="b-i-wrapper">
      <template v-for="(item, index) in iconConfig">
        <div :key="index" class="b-i-item" @click="itemClick(item)" v-stat="{ id: `index_special_${index}` }">
          <div v-if="item.icon" class="sub-icon" :class="`sub-icon-${item.icon}`"></div>
          <div class="icon" :style="{ backgroundImage: `url(${item.bg})` }"></div>
          <div class="title">{{ item.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { activity_tabar } from '../../../config/activity'
import { BANNER_ICON_CONFIG } from './const'
export default {
  data() {
    return {
      activity_tabar,
      BANNER_ICON_CONFIG
    }
  },
  computed: {
    ...mapState({
      isTesMode: state => state.test.isTesMode
    }),
    iconConfig() {
      let arr = []
      const time = new Date().getTime()
      const startTime = this.activity_tabar.startTime
      const endTime = this.activity_tabar.endTime
      if (time >= startTime && time < endTime) {
        arr = [...this.activity_tabar.BANNER_ICON_CONFIG]
      } else {
        arr = [...this.BANNER_ICON_CONFIG]
      }

      // IOS044提审
      if (this.utils.forIOSCheck()) {
        return arr.filter(item => {
          return item.type != 'auction'
        })
      }
      return arr
    }
  },
  methods: {
    itemClick(item) {
      if (item.url) {
        this.Jump(item.url)
      } else if (item.router) {
        this.$router.push(item.router)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-icon {
  padding: 15px 25px;
  background-color: #ffffff;
  .b-i-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .b-i-item {
    position: relative;
  }
  .icon {
    width: 48px;
    height: 48px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;

    &.icon-watch {
      background-image: url('../../../assets/image/hh-icon/b0-home/subbanner-watch.png');
    }
    &.icon-food {
      background-image: url('../../../assets/image/hh-icon/b0-home/subbanner-food.png');
    }
    &.icon-beautyMakeup {
      background-image: url('../../../assets/image/hh-icon/b0-home/subbanner-beautyMakeup.png');
    }
    &.icon-tangka {
      background-image: url('../../../assets/image/hh-icon/b0-home/subbanner-tangka.png');
    }
  }
  .sub-icon {
    position: absolute;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    &.sub-icon-gift {
      width: 30px;
      height: 13px;
      top: -6.5px;
      right: -15px;
      background-image: url('../../../assets/image/hh-icon/b0-home/icon-gift.png');
    }
    &.sub-icon-car {
      width: 38px;
      height: 13px;
      top: -6.5px;
      right: -19px;
      background-image: url('../../../assets/image/hh-icon/b0-home/icon-car.png');
      animation: scaleDraw 1.8s ease-in-out infinite;
      transform-origin: 0 100% 0;
    }
  }
  .title {
    text-align: center;
    margin-top: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(64, 64, 64, 1);
    line-height: 17px;
  }
}
@keyframes scaleDraw {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1);
  }
}
</style>
