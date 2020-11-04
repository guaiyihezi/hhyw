<template>
  <div class="container-comp-list-juanzeng-records">
    <div class="content">
      <div class="list-header">
        <ul>
          <li>
            <span class="col1">捐赠记录</span>
            <span class="col2">捐赠时间</span>
            <span class="col3">捐赠金额</span>
          </li>
        </ul>
      </div>
      <div class="list-body">
        <ul>
          <li v-for="(item, index) in list" :key="index" @click="toDetail(item)">
            <span class="col1">第{{ numToChinese[index] }}次捐赠</span>
            <span class="col2">{{ item.donate_time | convertTimeToDay }}</span>
            <span class="col3"
              ><span class="col-left">{{ item.money | formatMoney }}元</span><span class="col-right">></span></span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { NUM_TO_CHINESE } from './static'

export default {
  name: 'ListJuanzengRecords',
  data() {
    return {
      numToChinese: NUM_TO_CHINESE
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    toDetail(item) {
      // item.log_id
      this.$router.push({ name: 'donateStatDetail', params: { log_id: item.log_id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-comp-list-juanzeng-records {
  .list-title {
    margin-bottom: 12px;
  }
  ul li {
    width: 100%;
    display: flex;
    text-align: left;

    .col1 {
      box-sizing: border-box;
      width: 36%;
      padding-left: 12px;
    }
    .col2 {
      box-sizing: border-box;
      width: 32%;
    }
    .col3 {
      box-sizing: border-box;
      flex: 1 0 0;
    }
  }
  .list-header {
    li {
      height: 30px;
      line-height: 30px;
      background: rgba(255, 241, 241, 1);
      font-size: 10px;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
    }
  }
  .list-body {
    li {
      box-sizing: border-box;
      height: 50px;
      padding-top: 10px;
      line-height: 40px;
      font-size: 11px;
      font-weight: bold;
      color: rgba(64, 64, 64, 1);
      box-shadow: 0px 1px 6px 0px rgba(249, 214, 214, 0.55);
      border-radius: 2px;
    }
    .col3 {
      display: flex;
      justify-content: space-between;
      padding-right: 15px;
    }
  }
  .content {
    border-radius: 1px;
    border: 1px solid #ffecec;
  }
}
</style>
