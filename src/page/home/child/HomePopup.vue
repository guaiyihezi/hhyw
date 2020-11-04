<template>
  <div v-if="popupVisible" class="home-popup-wrapper">
    <mt-popup v-model="popupVisible" position="center">
      <div class="content">
        <div class="title">
          <img src="../../../assets/image/hh-icon/plus-close.png" @click="close" />
        </div>
        <img :src="imgSrc" @click="goPage" />
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { homePopupImg } from '../../../api/home'
import { mapState, mapMutations } from 'vuex'
import { HOME_POPUP } from './const'

export default {
  name: 'HomePopup',
  data() {
    return {
      popupVisible: false,
      imgSrc: '',
      link: ''
    }
  },

  created() {
    // 如果本地开关打开，就用本地不用远程api的配置
    if (HOME_POPUP.switch) {
      this.checkPopupLocal()
      return
    }
    homePopupImg().then(res => {
      if (res.thumb) {
        this.imgSrc = res.thumb
        this.link = res.link
        this.checkPopup()
      }
    })
  },

  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user
    }),
    dayStart() {
      return new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    },
    dayEnd() {
      return this.dayStart + 24 * 60 * 60 * 1000 - 1
    },
    isNew() {
      return !this.isOnline || this.user.is_newbie ? true : false
    },
    currentDate() {
      return this.utils.formatToBJDate('YYYY-MM-DD', new Date().getTime())
    }
  },

  methods: {
    ...mapMutations({
      setIsTop: 'SET_IS_TOP'
    }),
    /**
     * 检测是否弹窗
     */
    checkPopup() {
      // IOS提审
      if (this.utils.forIOSCheck()) {
        return
      }

      let popup_storage = (window.localStorage.getItem('h_p_l') || '').split(',')

      // 当天没有弹过就弹出
      if (popup_storage.length > 0) {
        if (popup_storage[0] < this.dayStart || popup_storage[0] > this.dayEnd) {
          popup_storage = []
        }
      }

      // 弹过3次不再弹出
      if (popup_storage.length >= 3) {
        return
      }
      let now = new Date().getTime()
      let last = popup_storage[popup_storage.length - 1] || 0

      // 距离上次不足10分钟不弹出
      if (popup_storage.length > 0 && now - last <= 10 * 60 * 1000) {
        return
      }

      // 弹出并记录localStorage
      this.$nextTick(() => {
        this.popupVisible = true
        popup_storage.push(now)
        window.localStorage.setItem('h_p_l', popup_storage)
      })
    },
    checkPopupLocal() {
      this.imgSrc = HOME_POPUP['offline']['src']
      this.link = HOME_POPUP['offline']['url']

      this.$nextTick(() => {
        this.popupVisible = true
      })
    },
    close() {
      this.popupVisible = false
    },

    goPage() {
      if (!this.link) return
      this.setIsTop(false)
      this.popupVisible = false
      this.Jump(this.link)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-popup-wrapper {
  .mint-popup {
    background: transparent;
  }
  .content {
    position: relative;
  }
  .title {
    font-size: 0;
    position: absolute;
    right: -12px;
    top: -35px;

    img {
      width: 26px;
    }
  }
  img {
    width: 270px;
  }
  /deep/ .v-modal {
    opacity: 0.55;
  }
}
</style>
