<template>
  <div v-if="popupFlag">
    <mt-popup v-model="popupFlag" position="bottom" v-bind:close-on-click-modal="true" class="friend-pay-popup">
      <div class="f-p-container">
        <div class="f-p-body">
          <div class="title">通过以下方式，分销给好友该商品</div>
          <div class="subtitle"></div>
          <div class="share-types">
            <template v-for="(item, index) in share_items">
              <div
                class="item"
                :key="index"
                :class="`item-${item.type}`"
                :data-clipboard-text="share_options.url"
                @click="app_share(item)"
              >
                <img :src="item.url" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="f-p-footer" @click="close">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
const share_types = [
  {
    type: 'QQ',
    url: require('../../assets/image/hh-icon/QQ.png'),
    name: 'QQ'
  },
  {
    type: 'Qzone',
    url: require('../../assets/image/hh-icon/Qzone.png'),
    name: 'QQ空间'
  },
  // {
  //   type: 'Sina',
  //   url: require('../../assets/image/hh-icon/Sina.png'),
  //   name: '微博'
  // },
  {
    type: 'WechatSession',
    url: require('../../assets/image/hh-icon/WechatSession.png'),
    name: '微信'
  },
  {
    type: 'WechatTimeline',
    url: require('../../assets/image/hh-icon/WechatTimeline.png'),
    name: '朋友圈'
  }
]

export default {
  name: 'PopupMlmShare',
  data() {
    return {
      popupFlag: false,
      share_types
    }
  },
  props: {
    value: Boolean,
    options: Array,
    share_options: Object
  },
  model: {
    prop: 'value', //绑定的值，通过父组件传递
    event: 'toggle' //自定义时间名
  },
  computed: {
    share_items() {
      let arr = []
      if (this.isHHApp) {
        this.share_types.forEach((item, index) => {
          if (this.options.indexOf(item.type) > -1) {
            arr.push(item)
          }
        })
      }
      arr.push({
        type: 'TXT',
        url: require('../../assets/image/hh-icon/TXT.png'),
        name: '文字链接'
      })
      return arr
    }
  },
  methods: {
    open() {
      this.popupFlag = true
    },
    close() {
      this.popupFlag = false
    },
    app_share(item) {
      if (item.type == 'TXT') {
        var clipboard = new Clipboard('.item-TXT')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
        this.$toast({
          message: '复制成功',
          iconClass: 'mintui mintui-field-success',
          duration: 2000
        })
      } else {
        this.hhApp.share(
          this.share_options.text,
          this.share_options.imageUrl,
          item.type,
          this.share_options.flag,
          this.share_options.title,
          encodeURIComponent(this.share_options.url),
          this.share_options.description
        )
      }
      this.close()
    }
  },
  created() {
    this.popupFlag = this.value
  },
  watch: {
    popupFlag(value) {
      this.$emit('toggle', value) //子组件与父组件通讯，告知父组件更新绑定的值
      if (value == false) {
        this.$emit('close')
      }
      if (value == true) {
        this.$emit('open')
      }
    }
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
</style>
