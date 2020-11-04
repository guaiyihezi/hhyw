<template>
  <div class="container-comp-list-love-order">
    <arrow-love-title title="最新爱心订单" class="list-title"></arrow-love-title>
    <div class="content">
      <div class="list-header">
        <ul>
          <li>
            <span class="who">下单用户</span>
            <span class="when">下单时间</span>
            <span class="order-num">订单号</span>
          </li>
        </ul>
      </div>
      <div class="list-body">
        <swiper v-if="list.length" :key="count" :options="swiperOption" class="swipe-wrapper">
          <template v-for="(item1, index1) in listGroup">
            <swiper-slide :key="index1">
              <ul>
                <li v-for="(item2, index2) in item1" :key="`${index1}_${index2}`">
                  <span class="who">{{ item2.mask_phone }}</span>
                  <span class="when">{{ item2.add_time | convertTime }}</span>
                  <span class="order-num">{{ item2.order_sn }}</span>
                </li>
              </ul>
            </swiper-slide>
          </template>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowLoveTitle from './ArrowLoveTitle'

export default {
  name: 'ListLoveOrder',
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true
      },
      count: 0
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    list() {
      this.count++
    }
  },
  computed: {
    listGroup() {
      const res = []
      this.list.forEach((item, index) => {
        const _index = Math.floor(index / 5)
        typeof res[_index] == 'undefined' && (res[_index] = [])
        res[_index].push(item)
      })
      console.log(res)
      return res
    }
  },
  components: {
    ArrowLoveTitle
  }
}
</script>

<style lang="scss" scoped>
.container-comp-list-love-order {
  text-align: center;

  .list-title {
    margin-bottom: 12px;
  }
  ul li {
    width: 100%;
    display: flex;
    text-align: center;

    .who {
      width: 25.5%;
    }
    .when {
      width: 40%;
    }
    .order-num {
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
      height: 30px;
      line-height: 30px;
      font-size: 10px;
      color: rgba(64, 64, 64, 1);
    }
    .swipe-wrapper {
      height: 150px;
    }
  }
  .content {
    border-radius: 1px;
    border: 1px solid #ffecec;
  }
}
</style>
