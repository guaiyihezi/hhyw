<template>
  <div class="container-comp-list-love-people">
    <arrow-love-title title="爱心用户TOP10" class="list-title"></arrow-love-title>
    <div class="content">
      <div class="list-header">
        <ul>
          <li>
            <span class="col1">榜单</span>
            <span class="col2">下单用户</span>
            <span class="col3">订单数量</span>
          </li>
        </ul>
      </div>
      <div class="list-body">
        <swiper v-if="list.length" :key="count" :options="swiperOption" class="swipe-wrapper">
          <template v-for="(item1, index1) in listGroup">
            <swiper-slide :key="index1">
              <ul>
                <li v-for="(item2, index2) in item1" :key="`${index1}_${index2}`">
                  <span class="col1"><img :src="getOrderRank(`${index1}_${index2}`)"/></span>
                  <span class="col2">{{ item2.mask_phone }}</span>
                  <span class="col3">{{ item2.num }}</span>
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
import { ORDER_RANK } from './static'

export default {
  name: 'ListLovePeople',
  data() {
    return {
      orderRank: ORDER_RANK,
      swiperOption: {
        direction: 'vertical',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true
      },
      count: 0
    }
  },
  watch: {
    list() {
      this.count++
    }
  },
  props: {
    list: {
      type: Array
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
  methods: {
    getOrderRank(index) {
      const indexs = index.split('_')
      return this.orderRank[indexs[0] * 5 + Number(indexs[1])]
    }
  },
  components: {
    ArrowLoveTitle
  }
}
</script>

<style lang="scss" scoped>
.container-comp-list-love-people {
  text-align: center;

  .list-title {
    margin-bottom: 12px;
  }
  ul li {
    width: 100%;
    display: flex;
    text-align: center;

    .col1 {
      width: 23%;
    }
    .col2 {
      width: 50%;
    }
    .col3 {
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

      .col1 img {
        width: 19px;
      }
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
