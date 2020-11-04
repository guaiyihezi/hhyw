<template>
  <div class="hb-iscount" @click="showHBRules">
    <div class="hb-discount-title">
      <span class="hb-price-desc">
        <!-- <img v-if="hasSurplus" src="../../../assets/image/hh-icon/b0-home/money-icon.png" class="sur-icon" />
        <span class="hb-price-desc-txt">
          {{ priceCombo }}
        </span> -->
        <div class="hb-price-snew">
          <PriceItem 
            :cash="this.instalment.cash" 
            :surplus="this.instalment.surplus" 
            classType="price-style-two"
          />
        </div>
        <span class="fq-label">首期</span>
      </span>
    </div>
    <img src="../../../assets/image/change-icon/icon_more.png" />
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import InfoPromotions from './InfoPromotions'
import { ENUM } from '../../../const/enum'
import { PRODUCT_SHOW_SHOUQI } from '../static.js'
import PriceItem from "../../../components/common/ListItemPrice"

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState({
      detailInfo: state => state.detail.detailInfo
    }),
    instalment() {
      return this.detailInfo.instalment[this.detailInfo.instalment.length - 1]
    },
    hasSurplus() {
      return Number(this.instalment.surplus) > 0
    },
    priceCombo() {
      return this.hasSurplus
        ? this.utils.formatFloat(this.instalment.surplus) + '权益+￥' + this.utils.formatFloat(this.instalment.cash)
        : '￥' + this.utils.formatFloat(this.instalment.cash)
    }
  },

  methods: {
    ...mapMutations({
      saveHBRulesPopupState: 'saveHBRulesPopupState'
    }),
    showHBRules() {
      this.saveHBRulesPopupState(true)
    }
  },

  components:{
    PriceItem,
  }
}
</script>
<style lang="scss" scoped>
.hb-iscount {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
  .hb-discount-title {
    color: #666666;
    font-size: 14px;
    display: flex;
    align-items: center;

    .hb-price-desc {
      display: flex;
      align-items: center;
      line-height: 1;
      .sur-icon {
        width: 20px;
      }
      .hb-price-desc-txt {
        font-size: 20px;
        font-weight: bold;
        color: rgba(119, 37, 8, 1);
        line-height: 20px;
        transform: none;
        margin-left: 4px;
      }
      .fq-label {
        line-height: 16px;
        background: rgba(99, 73, 3, 1);
        border-radius: 7px;
        padding: 0 5px;
        margin-left: 2px;
        display: inline-block;
        font-size: 11px;
        color: #fff;
      }
    }
  }
  & > img {
    width: 19px;
  }
}
</style>
