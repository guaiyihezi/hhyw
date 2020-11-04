<template>
  <div class="link-column-wrapper" @click="onclick">
    <slot name="title">
      <label class="column-title link-column-title">{{ title }}</label>
    </slot>
    <img class="indicator" src="../../assets/image/hh-icon/f0-profile/icon-tip.png" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
.link-column-wrapper {
  height: 49px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  flex-shrink: 0;
  padding: 0 15px;
  @include thin-border(#eaebec, 15px);
}

.column-title {
  font-size: 15px;
  color: $baseColor;
}
.link-column-title {
  flex: 1;
}
.indicator {
  width: 6px;
}
.section-header {
  margin-top: 10px;
}
.section-footer {
  &:after {
    height: 0;
  }
}
</style>
