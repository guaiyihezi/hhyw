<!-- ProductVedio.vue -->
<template>
  <div class="container">
    <div class="ui-vedio-header">
      <img src="../../assets/image/change-icon/back@2x.png" v-on:click="goBack" />
    </div>
    <div class="content">
      <video :src="src" width="100%" height="100%" preload="auto" controls autoplay>
        您的浏览器不支持video标签，建议您更换一个浏览器试试哦~
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: this.$route.query.src
    }
  },

  mounted() {
    if (!this.src) {
      alert('视频地址不能为空！')
    }
    const video = document.querySelector('video')
    const promise = video.play()

    if (promise !== undefined) {
      promise
        .catch(error => {
          // here is important!!!
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
        })
        .then(() => {
          // Auto-play started
        })
    }
  },

  methods: {
    goBack() {
      this.$_goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;

  .ui-vedio-header {
    width: 100%;
    position: relative;
    flex-basis: 50px;
    display: flex;
    align-items: center;
    padding: 0 px;
    height: 50px;
    background: #fff;
    color: #55595f;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .content {
    flex: 1 0 0;
    overflow: hidden;
    position: relative;
  }
}
</style>
