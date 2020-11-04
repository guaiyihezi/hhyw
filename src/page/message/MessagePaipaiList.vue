<template>
  <div class="msg-pp-container">
    <div class="header-wrapper">
      <mt-header class="header" title="服务通知">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="goBack"></header-item>
      </mt-header>
    </div>

    <div class="list">
      <div v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <message-item
          v-for="(item, index) in messageList"
          :key="index"
          :title="item.title"
          :time="item.created_at"
          :content="item.content"
          @click="goDetail(item)"
        ></message-item>
      </div>
      <div v-if="!messageList.length && !isMore" class="null">
        <img src="../../assets/image/hh-icon/empty-list-icon.png" alt="暂无消息" />
        <span>暂无消息</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { REG_URL_HHYW_INNER } from '../../const/regExp'
import MessageItem from './child/MessagePaipaiItem'
import { unReadMessageList, checkMsgIsValid } from '../../api/message'
import { getDetailPP } from '../../api/myC2B'

export default {
  name: 'messagePaipaiList',
  data() {
    return {
      messageList: [],
      loading: false,
      isMore: true,

      search: {
        page: 1
      }
    }
  },
  components: {
    MessageItem
  },
  created() {
    // this.getMore()
  },
  methods: {
    ...mapMutations({
      saveSelectedCartGoods: 'saveSelectedCartGoods'
    }),
    getMore() {
      if (!this.isMore) return
      this.loading = true
      this.$indicator.open()
      unReadMessageList(1, this.search.page)
        .then(res => {
          ++this.search.page
          this.isMore = res.paged.more == 1 ? true : false
          this.messageList = [...this.messageList, ...res.list]
        })
        .finally(() => {
          this.$indicator.close()
          this.loading = false
        })
    },
    goBack() {
      this.$_goBack()
    },
    async goDetail(item) {
      // 检测竞拍消息是否已失效
      // this.$indicator.open()
      // let checkRes
      // try {
      //   checkRes = await checkMsgIsValid(item.id, item.related_id)
      // } catch (e) {
      //   checkRes = false
      // }
      // this.$indicator.close()

      // if (!checkRes) {
      //   return
      // }
      // if (checkRes['is_have_new'] == 1) {
      //   return this.$toast('竞拍状态已变更，该消息已失效')
      // }

      if (REG_URL_HHYW_INNER.test(item['go_url'])) {
        // 识别 vue h5站内链接
        const innerUrl = item['go_url'].replace(REG_URL_HHYW_INNER, '/')
        // 针对checkout 处理
        // if (/^\/checkout/i.test(innerUrl)) {
        //   this.$indicator.open()
        //   const paipai_id = this.utils.getUrlKey(item['go_url'], 'id')
        //   // 获取详情
        //   getDetailPP(paipai_id).then(res => {
        //     this.$indicator.close()
        //     this.saveSelectedCartGoods({
        //       cartGoods: [
        //         {
        //           goods: res, //商品内容
        //           amount: 1, // 购买数量
        //           isC2B: true // 标识为竞拍
        //         }
        //       ]
        //     })
        //     this.$router.push({ name: 'checkout' })
        //   })
        //   return
        // }
        let obj = { path: innerUrl }
        if (innerUrl.startsWith('/auctionOffer')) {
          obj.query = { toOffer: 1 }
        }
        return this.$router.push(obj)
      }
      // 站外
      window.location.href = item['go_url']
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-pp-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    @include header;
    @include thin-border(#f4f4f4);
    width: 100%;
  }

  .list {
    flex: 1;
    width: 100%;
    padding-bottom: 20px;
    background-color: #fff;
    overflow-y: auto;
  }

  .null {
    flex: 1;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      @include wh(135px, 135px);
      margin-top: 30px;
    }
    span {
      margin-top: 10px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 25px;
    }
  }
}
</style>
