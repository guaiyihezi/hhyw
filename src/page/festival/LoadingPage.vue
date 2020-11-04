<template>
  <div></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user
    })
  },
  mounted() {
    // query{
    //  name: '活动名称',
    //  url: '活动页url'
    // }
    const event_name = this.$route.query.name || 'default'
    this.$matomo.trackEvent(`operation_event_${event_name}_page`, 'pv', null, null, null, res => {
      if (this.$route.query.url) {
        location.replace(this.$route.query.url)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  background-color: #fff;
}
</style>
