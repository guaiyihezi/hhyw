<template>
  <div class="records-container">
    <mt-header class="header" :title="title">
      <header-item slot="left" :isBack="true" v-on:onclick="$_goBack"></header-item>
    </mt-header>
    <div class="content">
      <div class="list-header">
        <ul>
          <li>
            <span v-if="isShowPhone" class="who">捐赠用户</span>
            <div class="space-rest">
              <span class="when">捐赠时间</span>
              <span class="money">捐赠金额</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-body">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <span v-if="isShowPhone" class="who">{{ item.phone }}</span>
            <div class="space-rest">
              <span class="when">{{ item.created_at | convertTime }}</span>
              <span class="money">{{ item.money }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-bottom" v-if="list.length <= 0 && !isMore">
        <p>列表为空</p>
      </div>
      <div class="list-bottom" v-if="list.length > 0 && !isMore">
        <p>没有更多了</p>
      </div>
      <div class="list-bottom" v-if="isMore">
        <p @click="getMore">查看更多 ></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getDonateList } from '../../api/donate'

// Mock
// import { allDonateList } from './Mock'

export default {
  name: 'DonateRecords',
  data() {
    return {
      listParams: { page: 1, size: 20, is_self: 0 },
      list: [],
      isMore: true
    }
  },
  computed: {
    title() {
      return this.listParams.is_self === 0 ? '捐赠名单' : '我的捐赠'
    },
    isShowPhone() {
      return this.listParams.is_self === 0
    }
  },
  created() {
    this.saveQueryStatus()
    this.getList()
  },
  methods: {
    saveQueryStatus() {
      const is_self = this.$route.query.is_self
      typeof is_self !== 'undefined' && (this.listParams.is_self = is_self)
    },
    // 获取订单列表
    getList() {
      this.$indicator.open()
      // setTimeout(()=>{
      //   this.$indicator.close()
      //   this.list = [...this.list, ...allDonateList]
      // }, 2000)

      getDonateList(this.listParams)
        .then(res => {
          this.list = [...this.list, ...res.list]
          this.isMore = res.paged.more == 1 ? true : false
        })
        .finally(() => {
          this.$indicator.close()
        })
    },
    //  加载更多数据
    getMore() {
      this.listParams.page++
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.records-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;

    ul li {
      width: 100%;
      display: flex;

      .who {
        width: 33%;
        box-sizing: border-box;
        padding-left: 16px;
        text-align: left;
      }
      .space-rest {
        flex: 1 0 0;
        display: flex;
        text-align: center;

        .when {
          width: 62%;
        }
        .money {
          flex: 1 0 0;
        }
      }
    }
  }
  .list-header {
    li {
      height: 46px;
      line-height: 46px;
      background: rgba(249, 245, 245, 1);
      font-size: 14px;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
    }
  }
  .list-body {
    li {
      height: 49px;
      line-height: 49px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      @include thin-border(rgba(242, 242, 242, 1));
    }
  }
  .list-bottom {
    padding: 20px 0 16px;
    text-align: center;

    p {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 14px;
      background: rgba(253, 242, 242, 1);
      border-radius: 10px;
      font-size: 12px;
      color: rgba(188, 150, 150, 1);
    }
  }
}
</style>
