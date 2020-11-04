<template>
  <div class="list-item" @click="toDetail">
    <div class="row row-time">
      <span class="title">提交时间</span>
      <span class="value">{{ item.createTime | convertTime }}</span>
    </div>
    <div class="row row-product">
      <span class="title">投诉商品</span>
      <span class="value">{{ item.goodsName }}</span>
    </div>
    <div class="row row-status" v-if="statusFinished">
      <span class="title"></span>
      <span :class="{ value: true, success: isStatusSuccess }">{{ statusTxt }}</span>
    </div>
  </div>
</template>
<script>
import { ENUM } from '../../../const/enum'
const { PRICE_JUDGE_STATUS } = ENUM
export default {
  data() {
    return {}
  },
  props: {
    item: Object
  },
  computed: {
    statusFinished() {
      // 是否已处理
      return [PRICE_JUDGE_STATUS.ST_SUCCESS, PRICE_JUDGE_STATUS.ST_FAIL].includes(this.item.status)
    },
    statusTxt() {
      return {
        1: '待处理',
        2: '投诉成功',
        3: '投诉失败'
      }[this.item.status]
    },
    isStatusSuccess() {
      return PRICE_JUDGE_STATUS.ST_SUCCESS === this.item.status
    }
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'goodspricecomplaintDetail', params: { id: this.item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  margin: 10px 15px 0;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
}
.row {
  font-size: 13px;
  color: rgba(64, 64, 64, 1);
  line-height: 18px;

  display: flex;
  .value {
    flex: 1 0 0;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;

    &.success {
      color: #772508;
    }
  }

  &.row-product {
    margin-top: 20px;
  }
  &.row-status {
    margin-top: 15px;
  }
}
</style>
