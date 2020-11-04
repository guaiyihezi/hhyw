<template>
  <div>
    <mt-popup v-model="value" class="popupShare" v-bind:close-on-click-modal="false">
      <img src="../../assets/image/hh-icon/juanzeng1.png" />
    </mt-popup>
    <mt-popup
      v-model="value"
      position="bottom"
      :modal="false"
      v-bind:close-on-click-modal="false"
      class="friend-pay-popup"
    >
      <div class="f-p-container">
        <div class="f-p-body">
          <div class="title">请选择分享平台</div>
          <div class="subtitle"></div>
          <div class="share-types">
            <template v-for="(item, index) in share_types">
              <div class="item" :key="index" :class="`item-${item.type}`" @click="app_share(item)">
                <img :src="item.url" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="f-p-footer" @click="close">取消分享</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'PopupImageShare',
  data() {
    return {
      share_types: [
        {
          type: 'WechatSession',
          url: require('../../assets/image/hh-icon/WechatSession.png'),
          name: '微信'
        },
        {
          type: 'WechatTimeline',
          url: require('../../assets/image/hh-icon/WechatTimeline.png'),
          name: '朋友圈'
        },
        {
          type: 'QQ',
          url: require('../../assets/image/hh-icon/QQ.png'),
          name: 'QQ'
        },
        {
          type: 'Qzone',
          url: require('../../assets/image/hh-icon/Qzone.png'),
          name: 'QQ空间'
        }
      ],
      share_options: {
        info: 'https://huanhuanoss.oss-cn-beijing.aliyuncs.com/202025/juanzeng1.png',
        thumb: 'https://huanhuanoss.oss-cn-beijing.aliyuncs.com/202025/juanzeng1.png',
        actName: '抗击肺炎--爱心捐赠',
        description: ''
      }
    }
  },
  props: {
    value: Boolean
  },
  model: {
    prop: 'value', //绑定的值，通过父组件传递
    event: 'toggle' //自定义事件名
  },
  methods: {
    close() {
      this.$emit('toggle', false)
    },
    app_share(item) {
      this.hhApp.pureShare(
        this.share_options.info,
        item.type,
        1,
        this.share_options.thumb,
        this.share_options.actName,
        this.share_options.description
      )
      this.close()
    }
  },
  created() {
    console.log('created')
  }
}
</script>

<style lang="scss" scoped>
.friend-pay-popup {
  background: #ededed;
  height: auto;
  display: flex;
  .f-p-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .f-p-body {
    background: #ffffff;
    flex: 1;
    padding: 0 15px;
    .title {
      font-size: 14px;
      color: #404040;
      margin-top: 20px;
      text-align: center;
      line-height: 1.5;
    }
    .subtitle {
      margin-top: 10px;
      line-height: 1.4;
      @include sc(11px, #999999, left);
    }
    .share-types {
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 50px;
        margin: 0 18px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 45px;
          height: 45px;
        }
        span {
          font-size: 12px;
          color: #333333;
          margin-top: 10px;
        }
      }
    }
  }
  .f-p-footer {
    background: #fff;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
}
/deep/.popupShare.mint-popup {
  top: 5%;
  width: 80%;
  background: none;
  transform: translate3d(-50%, 0, 0);
  img {
    width: 100%;
    height: auto;
  }
}
</style>
