<template>
  <div class="container">
    <div class="box-pro" @click="isClick">
      <div class="box-pro-left"><span>*</span>请选择比价平台</div>
      <div class="box-pro-right">
        {{ plaint }}<img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
      </div>
    </div>
    <mt-popup v-model="sheetVisible" position="bottom">
      <div class="box-popup" v-for="(item, index) in rows" :key="index" @click="sheet(item)">{{ item.nameCn }}</div>
      <div class="box-btn" @click="sheet(false)">取消</div>
    </mt-popup>
  </div>
</template>

<script>
import { getPlatformInfo } from '../../../api/PriceComplaint'
export default {
  name: 'platform',
  data() {
    return {
      rows: [],
      sheetVisible: false,
      plaint: '请选择平台'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getPlatformInfo().then(res => {
        // console.log(res.rows)
        this.rows = res.rows
      })
    },
    isClick() {
      this.sheetVisible = !this.sheetVisible
    },
    sheet(e) {
      if (e) {
        this.plaint = e.nameCn
        this.$emit('child-event', e.id)
      }
      this.sheetVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.mint-popup-bottom {
  height: 31.5%;
  background-color: #e8e6e6;
}
.box-popup {
  text-align: center;
  height: 50px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
  background-color: #fff;
  &:hover {
    background-color: #fbf8f7;
    color: rgba(119, 53, 8, 1);
  }
}
.box-btn {
  margin-top: 10px;
  height: 50px;
  line-height: 50px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  color: rgba(38, 45, 55, 1);
}
.box-pro {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .box-pro-left {
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(64, 64, 64, 1);
    span {
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(236, 28, 25, 1);
      margin-right: 2px;
    }
  }
  .box-pro-right {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(187, 187, 187, 1);
    img {
      width: 7px;
      height: 11px;
      margin-left: 10px;
    }
  }
}
</style>
