<template>
  <div>
    <mt-header class="header" title="消息">
      <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
    </mt-header>
    <message-item
      :key="1"
      :img="require('../../assets/image/hh-icon/message/icon-saleafter.png')"
      :isRead="isRead"
      title="售后提醒"
      :time="time"
      :line="true"
      :content="isRead ? '您有新的售后提醒' : ''"
      v-on:click="goList"
    ></message-item>
    <message-item
      :key="2"
      :img="require('../../assets/image/hh-icon/message/icon-message.png')"
      :isRead="!isPaiPaiRead"
      title="服务通知"
      :time="time"
      :line="true"
      :content="content"
      v-on:click="goPaiPaiList"
    ></message-item>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import MessageItem from './child/MessageItem'
import { unReadMsg, unReadMsgNum, saveMagAsReaded, unReadMessageList } from '../../api/message'
export default {
  data() {
    return {
      isRead: false,
      isPaiPaiRead: false,
      time: 0,
      content: ''
    }
  },
  created() {
    this.getUnReadMsg()
    this.getUnReadPaipaiMsg()
    unReadMessageList(1, 1).then(res => {
      this.content = res.list[0].content
    })
  },
  components: {
    MessageItem
  },
  methods: {
    getUnReadMsg() {
      unReadMsg().then(res => {
        this.isRead = res.isRead === 'yes' ? true : false
        this.time = res.time / 1e3
      })
    },
    getUnReadPaipaiMsg() {
      unReadMsgNum(1).then(res => {
        this.isPaiPaiRead = res.num > 0 ? false : true
      })
    },
    goBack() {
      this.$_goBack()
    },
    goList() {
      this.$router.push({ name: 'messageList' })
    },
    goPaiPaiList() {
      saveMagAsReaded(1)
      this.$router.push({ name: 'messagePaipaiList' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  @include thin-border(#f4f4f4);
}
</style>
