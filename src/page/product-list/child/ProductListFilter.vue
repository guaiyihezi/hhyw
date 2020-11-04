<!-- ProductListFilter.vue -->
<template>
  <div class="ui-product-filter">
    <ul class="filter-list">
      <li
        class="item"
        v-for="(item, index) in SORTKEY"
        :key="item.id"
        @click="setActiveSortkey(item, index)"
        :class="{
          sortactive: isTabActive(item),
          sortnormal: !isTabActive(item)
        }"
      >
        <a v-if="item.isMore">{{ currentChildSortData[index].name }}</a>
        <a v-else>{{ item.name }}</a>

        <div class="icon-row">
          <img
            class="arrow-icon"
            :class="{ handstand: item.isMore && isShowMore }"
            src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头-down.svg"
            v-if="item.isMore && index == currentSortIndex"
          />
          <img
            class="arrow-icon"
            src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头灰-down.svg"
            v-if="item.isMore && index != currentSortIndex"
          />
          <img
            class="filter-icon"
            src="../../../assets/image/hh-icon/b0-home/icon-search-筛选.svg"
            v-if="item.isFilter && isSideFilterMore"
          />
          <img
            class="filter-icon"
            src="../../../assets/image/hh-icon/b0-home/icon-search-筛选灰.svg"
            v-if="item.isFilter && !isSideFilterMore"
          />

          <template v-if="item.isTurn">
            <img
              class="arrow-icon"
              :class="{ handstand: true }"
              src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头-down.svg"
              v-if="index == currentSortIndex && !item.childId"
            />
            <img
              class="arrow-icon"
              :class="{ handstand: true }"
              src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头灰-down.svg"
              v-else-if="item.id != currentSortData.id"
            />
            <img
              class="arrow-icon"
              src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头-down.svg"
              v-if="index == currentSortIndex && item.childId"
            />
            <img
              class="arrow-icon"
              src="../../../assets/image/hh-icon/b0-home/icon-search-空心箭头灰-down.svg"
              v-else-if="item.id != currentSortData.id"
            />
          </template>
        </div>
      </li>
    </ul>

    <div class="sort-container" v-if="isShowMore">
      <div v-for="(items, index) in itemChildSort" :key="index">
        <template v-if="index == currentSortIndex">
          <div
            v-for="item in items"
            :key="item.id"
            @click="getSortChild(item, index)"
            class="sort-list"
            :class="{ active: item.id == currentChildSortData[index].id }"
          >
            <a>{{ item.name }}</a>
            <img
              src="../../../assets/image/change-icon/c1_choose@2x.png"
              v-if="item.id == currentChildSortData[index].id"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="side-container" v-if="isShowSideMore">
      <div class="side-content">
        <div v-for="(item, index) in currentSideFilterData" :key="index">
          <h3>{{ item.name }}</h3>
          <div class="filter-content">
            <template v-if="item.type == 'checkbox'">
              <div class="checkbox-content">
                <div v-for="(option, index) in item.options" :key="index" class="option-content">
                  <input
                    class="input-option"
                    type="checkbox"
                    :value="index"
                    :id="'item_' + item.key + '_' + index"
                    v-model="bindFilterData[item.key]"
                  />
                  <label :for="'item_' + item.key + '_' + index">
                    <span>{{ option }}</span>
                  </label>
                </div>
              </div>
            </template>
            <template v-if="item.type == 'range'">
              <div class="range-content">
                <input class="input-price" type="number" placeholder="最低价" v-model="bindFilterData[item.key][0]" />
                <input class="input-price" type="number" placeholder="最高价" v-model="bindFilterData[item.key][1]" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="side-floor">
        <gk-button class="button" type="primary-secondary-white" @click="resetFilterData()">重置</gk-button>
        <gk-button class="button" type="primary" @click="setFilterDataConfim()">确定</gk-button>
      </div>
    </div>
    <img class="goTop" src="../../../assets/image/hh-icon/b0-home/icon-返回顶部.svg" />
  </div>
</template>

<script>
import { SORTKEY } from '../static'
import { mapMutations } from 'vuex'
export default {
  props: ['value', 'isHb'],

  data() {
    return {
      SORTKEY: [], // 排序数据
      currentSortIndex: 0, // 当前选中的排序，所在的数组索引
      currentSortData: SORTKEY[0], // 当前选中的排序数据(预设索引0的数据)
      itemChildSort: {}, // 主筛选栏下的子筛选数据
      currentChildSortData: {}, // 选中的筛选子集
      isShowMore: false, // 是否显示综合筛选模态框
      isFirstTriggerClick: true, // 是否是第一次触发主摘选卡

      currentSideFilterData: {}, // 更多筛选栏下的筛选数据
      isShowSideMore: false, // 是否显示更多维度筛选模态框
      isSideFilterMore: false, // 是否有更多维度筛选模态框
      scopeFilterData: {}, // 筛选原始数据
      bindFilterData: {} // 筛选绑定数据
    }
  },
  created() {
    this.initFilter()
  },
  methods: {
    ...mapMutations({
      isShowProductModel: 'changeIsShowProductModel'
      // changeSearch: 'changeSearch'
    }),

    /**
     * 判断是否要高亮tab
     */
    isTabActive(item) {
      if (item.isFilter) {
        return this.isSideFilterMore
      } else {
        return item.id == this.currentSortData.id
      }
    },

    /*
     * closeFiler: 关闭下拉筛选模态框
     */
    closeFiler() {
      this.isShowMore = false
      this.isShowSideMore = false
      this.isShowProductModel(0)
    },

    /*
     * setActiveSortkey: 点击切换数据并设置选中的样式
     * @param: item 当前选中的item
     */
    setActiveSortkey(item, index) {
      this.isShowSideMore = false

      let getValue = false
      if (item.isMore) {
        if (this.isFirstTriggerClick) {
          this.isShowMore = !this.isShowMore
          this.isShowProductModel(this.isShowMore ? 1 : 0)
        } else if (!this.isFirstTriggerClick && !this.isShowMore) {
          getValue = true
          this.isFirstTriggerClick = true
        }
      } else {
        this.isFirstTriggerClick = false
        this.closeFiler()
        if (item.isFilter) {
          this.isShowSideMore = true
          this.isShowProductModel(2)
          this.currentSideFilterData = item.child
          return
        } else if (item.isTurn && this.currentSortIndex == index) {
          item.childId ^= 1
        }
        getValue = true
      }

      this.currentSortData = item
      if (this.currentSortIndex != index) {
        this.currentSortIndex = index
        this.currentChildSortData[0] = this.SORTKEY[0].child[0] // 第一个tab跳回第一条子筛选
      }

      if (getValue) {
        this.getValue()
      }
    },

    /*
     * getValue: 向父级组件发送改变列表事件， 并传递当前的sort_key， sort_value
     */
    getValue() {
      let data = this.getSortValue()
      this.$parent.$emit('change-list', data)
    },

    /*
     *  getSortValue: 获取排序值
     */
    getSortValue() {
      const filterData = this.getFilterData()
      let sort = this.currentSortData,
        value = { sort_key: '', sort_value: '', filter: filterData.data }
      if (sort.isMore) {
        value.sort_key = this.currentChildSortData[this.currentSortIndex].key
        value.sort_value = this.currentChildSortData[this.currentSortIndex].value
      } else if (sort.isTurn) {
        value.sort_key = sort.child[sort.childId].key
        value.sort_value = sort.child[sort.childId].value
      } else {
        value.sort_key = sort.key
        value.sort_value = sort.value
      }

      return value
    },

    /*
     *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
     *  @param: item 模态框的item
     */
    getSortChild(item, index) {
      this.isShowProductModel(0)
      this.currentChildSortData[index] = item
      this.isShowMore = !this.isShowMore
      this.getValue()
    },

    /**
     * 重置筛选数据
     */
    resetFilterData(isInit = false) {
      const data = this.bindFilterData
      this.scopeFilterData.forEach(item => {
        this.$set(data, item.key, [])
      })
    },
    /**
     * 确定筛选
     */
    setFilterDataConfim() {
      this.closeFiler()
      this.getValue()
      const filterData = this.getFilterData()

      this.isSideFilterMore = filterData.isFilter
    },
    /**
     * 返回筛选数据
     */
    getFilterData() {
      let isFilter = false
      const data = {}
      this.scopeFilterData.forEach(item => {
        const v = this.bindFilterData[item.key]
        if ((item.type == 'range' && !(v[0] || v[1])) || !v.length) {
          return
        }
        data[item.key] = v
        isFilter = true
      })
      return { isFilter, data }
    },

    /**
     * 初始化
     */
    async initFilter() {
      let _SORTKEY = JSON.parse(JSON.stringify(SORTKEY))

      _SORTKEY.forEach((item, index) => {
        if (item.isFilter) {
          this.scopeFilterData = item.child
          this.resetFilterData(true)
        } else if (item.child) {
          this.itemChildSort[index] = item.child
          this.currentChildSortData[index] = item.child[0]
        }

        if (this.value) {
          // 显示选择的主筛选
          if (item.key == this.value) {
            this.currentSortIndex = index
            this.currentSortData = item
          }
          if (item.child) {
            item.child.forEach((c_item, c_index) => {
              if (c_item.key == this.value) {
                this.currentChildSortData[index] = c_item
              }
            })
          }
        }
      })

      this.SORTKEY = _SORTKEY
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-product-filter {
  background-color: #fff;
  margin-top: 10px;
  ul.filter-list {
    display: flex;
    padding: 0 10px 0 14px;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    border: 0;
    li {
      font-size: 14px;
      color: #4e545d;
      position: relative;
      flex: 1 1 auto;
      text-align: left;
      height: 40px;
      padding: 0;
      line-height: 40px;
      .icon-row {
        width: 12px;
        height: 100%;
        float: left;
        margin-left: 4px;
        padding-top: 16px;
        img {
          float: left;
        }
      }
      &:last-child {
        flex-basis: 27px;
      }
      a {
        height: 40px;
        line-height: 40px;
        float: left;
      }
      img {
        height: 4px;
        width: 8px;
        vertical-align: middle;
      }
    }
    li.sortactive {
      border-bottom-color: $primaryColor;
      a {
        color: #552e20;
      }
    }
    li.sortnormal {
      border-bottom-color: transparent;
      a {
        color: #888888;
      }
    }
    .arrow-icon {
      width: 10px;
      height: 10px;
      &:nth-last-child(2) {
        margin-top: -3px;
      }
      &:nth-child(2) {
        margin-top: -5px;
      }
    }
    .filter-icon {
      width: 12px;
      height: 15px;
      margin-top: -3px;
    }
    .handstand {
      transform: rotate(180deg);
    }
  }
  .sort-container {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 10;
    .sort-list {
      color: #4e545d;
      padding: 15px;
      font-size: 13px;
      font-family: 'PingFangSC';
      background-color: #fff;
      margin: 0;
      border-bottom: 1px solid #e8eaed;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      img {
        float: right;
        width: 16px;
        height: 16px;
      }
      &.active {
        color: $primaryColor;
      }
    }
  }
  .side-container {
    position: absolute;
    left: 49px;
    top: 0;
    width: 326px;
    height: 100%;
    min-height: 100%;
    z-index: 10;
    background-color: #fff;
    border-radius: 6px 0px 0px 6px;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    animation: side_overlayGrey 220ms linear both;
    .side-content {
      flex: 1;
      max-height: 100%;
      overflow-x: hidden;
      h3 {
        font-size: 13px;
        font-weight: bold;
        line-height: 18px;
        margin-top: 20px;
      }
      .filter-content {
        margin-top: 20px;
        .checkbox-content {
          margin: -5px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: space-between;
          // align-items: stretch;
          .option-content {
            min-width: 92px;
            max-width: 92px;
            height: 30px;
            line-height: 30px;
            margin: 5px;
            flex: 1 1 auto;
            text-align: center;
            label {
              @include button($margin: 0, $radius: 3px, $spacing: 0, $height: 100%);
              width: 100%;
              background: #f2f2f2;
              display: inline-block;
              span {
                @include sc(10px, #404040);
              }
            }
            .input-option {
              display: none;
              &:checked + label {
                background-color: #cb4111;
                span {
                  color: #fff;
                }
              }
            }
          }
        }
        .range-content {
          display: flex;
          position: relative;
          .input-price {
            @include button($margin: 0, $radius: 3px, $spacing: 0, $height: 30px);
            width: 135px;
            background: #f2f2f2;
            flex: 1 1 auto;
            text-align: center;
            vertical-align: middel;
            font-weight: bold;
            color: #cb4111;
            border: none;
            // -webkit-transform: scale(floor($size / 0.12px) / 100);
            &::-webkit-input-placeholder {
              @include sc(10px, #404040);
            }
            &:first-child {
              margin-right: 26px;
            }
          }
          &:after {
            content: '';
            width: 12px;
            height: 2px;
            background-color: #8c8c8c;
            position: absolute;
            margin: 0 auto;
            left: -50%;
            right: -50%;
            top: 50%;
          }
        }
      }
    }
    .side-floor {
      display: flex;
      position: relative;
      padding: 0 15px;
      margin: 20px 0;
    }
  }
  @keyframes side_overlayGrey {
    0% {
      left: 100%;
    }
    75% {
      left: 60px;
    }
  }
  .button {
    @include button($margin: 0, $radius: 0, $spacing: 2px, $height: 36px);
    flex: 1;
    &:first-child {
      border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
      border-radius: 0px 4px 4px 0px;
    }
  }
  .goTop {
    width: 42px;
    height: 42px;
    position: fixed;
    right: 14px;
    bottom: 92px;
  }
}
</style>
