<!-- GoodsSwipe.vue -->
<template>
  <div class="swipe-wrapper ui-common-swiper" v-if="detailInfo">
    <!-- 轮播图 -->
    <mt-swipe
      :auto="0"
      class="ui-common-swiper"
      :show-indicators="false"
      :prevent="false"
      :stop-propagation="true"
      @change="handleChange"
    >
      <template v-if="detailInfo.photos && detailInfo.photos.length > 0">
        <mt-swipe-item v-for="(item, index) in detailInfo.photos" v-bind:key="index" ref="media">
          <div class="play" @click="playVidio(item.video)" v-if="item.video"></div>
          <img :src="item.large" @click="setPopupVisible()" />
        </mt-swipe-item>
      </template>
      <mt-swipe-item v-if="!detailInfo.photos || detailInfo.photos.length <= 0">
        <img src="../../../assets/image/change-icon/default_image_02@3x.png" class="product-img" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- indicators -->
    <div class="mint-swipe-indicators-diy" v-if="detailInfo.photos && detailInfo.photos.length > 0">
      <span>{{ index + 1 }}</span>
      <span class="line">/</span>
      {{ detailInfo.photos.length }}
    </div>
    <!-- <activity-icon-on-product
      v-if="detailInfo.act_616_type"
      size="big"
      :offset="false"
      :typeCode="detailInfo.act_616_type"
    ></activity-icon-on-product> -->

    <div class="cat-fq-banner" v-if="instalment && instalment.isFq">
      <span>原价:￥{{ priceShowForFq }}*{{ instalment.fqLength }}期</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      popupVisible: false,
      index: 0,
      videoSrc: ''
    }
  },

  created() {
    this.$on('hide-priview-picture', value => {
      this.popupVisible = value
      this.setisPreviewPicture(value)
    })
  },

  mounted() {
    let _this = this
    window.receiveNetType = function(NetType) {
      const vueObj = _this
      _this.showWarningPop(NetType)
    }
  },

  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo,
      instalment: state => state.detail.instalment
    }),
    priceShowForFq() {
      let val = 0
      if (this.instalment.isFq) {
        val = Math.round(this.detailInfo.market_price / this.instalment.fqLength)
      }
      return val
    }
  },

  methods: {
    ...mapMutations({
      setisPreviewPicture: 'setisPreviewPicture',
      setSwiperId: 'setSwiperId'
    }),

    /*
     * setPopupVisible: 点击图片进入到查看大图popup
     */
    setPopupVisible() {
      let _this = this
      if (!this.$refs.media[this.index].$el.style.cssText) {
        this.popupVisible = true
        this.setisPreviewPicture(true)
      }
    },

    /*
     * 播放视频
     */
    playVidio(videoSrc) {
      this.videoSrc = videoSrc
      const platform = this.utils.getOpenBrowser()
      if (this.isHHApp) {
        if (platform == 1) {
          // IOS不能返回网络状态，需要在 receiveNetType 方法里面操作
          this.hhApp.getNetType()
        } else {
          this.showWarningPop(this.hhApp.getNetType())
        }
      } else {
        this.$messagebox.confirm('商品介绍视频将帮助您更清晰了解商品，但也将消耗更多流量，建议在WIFI环境下查看').then(
          action => {
            this.$router.push({ name: 'video', query: { src: this.videoSrc } })
          },
          action => {
            console.log(action)
          }
        )
      }
      // console.log('play video')
    },

    showWarningPop(netType) {
      if (netType == 2) {
        this.$router.push({ name: 'video', query: { src: this.videoSrc } })
      } else {
        if (this.hhApp.getData('video_play_netflow') == 1) {
          this.$toast('当前非Wi-Fi下播放，请注意流量消耗')
          this.$router.push({ name: 'video', query: { src: this.videoSrc } })
        } else {
          this.$messagebox({
            message: '当前为非wifi环境，是否播放并设置为默认可在非wifi下播放?',
            showCancelButton: true,
            confirmButtonText: '继续播放',
            cancelButtonText: '取消播放'
          }).then(action => {
            if (action == 'confirm') {
              this.hhApp.setData('video_play_netflow', 1)
              window.video_play_netflow = 1
              this.$router.push({ name: 'video', query: { src: this.videoSrc } })
            }
          })
        }
      }
    },

    /*
     * handleChange: 轮播图改变时设置是否阻止事件冒泡
     * @params: index 当前滑动的index
     */
    handleChange(index) {
      this.index = index
      this.setSwiperId(index)
    }
  }
}
</script>

<style lang="scss">
.ui-common-swiper {
  background-color: #ffffff;
  width: 100%;
  height: 270px !important;
  position: relative;
  .mint-swipe-items-wrap {
    .mint-swipe-item {
      text-align: center;
      overflow: hidden;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
  .mint-swipe-indicators {
    div.mint-swipe-indicator {
      background: #efeff4;
      opacity: 1;
      &.is-active {
        background: $primaryColor;
      }
    }
  }
  .mint-swipe-indicators-diy {
    box-sizing: border-box;
    position: absolute;
    bottom: 15px;
    right: 15px;
    border: 1px solid #d9d8d8;
    border-radius: 1px;
    background-color: #ffffff;
    line-height: 20px;
    height: 20px;
    padding: 0 5px;
    @include sc(12px, #b7b7b7);
    span {
      @include sc(12px, $primaryColor);
      &.line {
        margin: 0 2px;
        color: #b7b7b7;
      }
    }
  }
}
.play {
  width: 60px;
  height: 60px;
  background: url('../../../assets/image/hh-icon/icon-play.svg') no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.cat-fq-banner {
  box-sizing: border-box;
  width: 210px;
  height: 35px;
  line-height: 35px;
  padding-left: 22px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: url('../../../assets/image/hh-icon/detail/car-fq@2x.png') no-repeat 0 100%;
  background-size: contain;

  span {
    font-size: 17px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
