<template>
  <div class="container">
    <mt-header class="header" :title="title">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"> </header-item>
    </mt-header>
    <iframe id="iframe" class="content-wrapper" :style="getFrameStyle" :src="getUrl"></iframe>
  </div>
</template>

<script>
import { HeaderItem, Webview } from '../../components/common'
import { Header } from 'mint-ui'
export default {
  data() {
    return {
      frameHeight: 0,
      title: ''
    }
  },
  computed: {
    getUrl: function() {
      let url = this.$route.query.url
      return url
    },
    getFrameStyle: function() {
      return {
        height: this.frameHeight + 'px'
      }
    }
  },
  methods: {
    goBack() {
      this.$_goBack()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.frameHeight = document.body.scrollHeight - 44
      let iframe = document.getElementById('iframe')
      let title = this.$route.query.title
      if (title && title.length) {
        this.title = title
      } else {
        this.title = iframe.contentWindow.document.title
      }
      let imgUrl = require('../../assets/image/change-icon/app-icon.png')
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: $mainbgColor;
}
.header {
  @include header;
  border-bottom: 1px solid $lineColor;
}
.content-wrapper {
  border: none;
  width: 100%;
  height: 100%;
}
</style>
