<template>
  <div></div>
</template>

<script>
/**
 * 债权兑换积分 - 授权认证前置页，目前给app用
 * date:2020-02-10
 */
import { mapActions } from 'vuex'
import { goAuth } from '../profile/goAuth'

export default {
  name: 'AuthPrePage',
  created() {
    // 查询当前的授权认证状态
    this.fetchItzAuthCheck({ loading: true }).then(() => {
      let res = goAuth(true)
      !res &&
        setTimeout(() => {
          this.goBack()
        }, 2000)
    })
  },
  methods: {
    ...mapActions({
      fetchItzAuthCheck: 'fetchItzAuthCheck'
    }),
    goBack() {
      this.$_goBack()
    }
  }
}
</script>
<style lang="scss" scoped></style>
