<template>
  <div v-if="!!capsule.thumb">
    <ad-banner :img="capsule.thumb" :url="capsule.link" v-if="capsule.thumb"></ad-banner>
  </div>
</template>

<script>
import { homeCapsuleImg } from '../../../api/home'
import AdBanner from '../../../components/common/AdBanner'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CapsuleBanner',
  data() {
    return {
      showCapsule: false
    }
  },
  components: {
    AdBanner
  },

  created() {
    homeCapsuleImg().then(res => {
      this.saveCapsule(res)
    })
  },

  computed: {
    ...mapState({
      capsule: state => state.home.capsule
    }),
    currentDate() {
      return this.utils.formatToBJDate('YYYY-MM-DD', new Date().getTime())
    }
  },

  methods: {
    ...mapMutations({
      saveCapsule: 'saveCapsule'
    })
  }
}
</script>

<style lang="scss" scoped></style>
