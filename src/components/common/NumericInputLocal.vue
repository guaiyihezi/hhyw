<template>
  <mt-popup
    v-model="show"
    position="bottom"
    :modal="true"
    v-bind:close-on-click-modal="false"
    class="input-numeric-keyboard-popup"
  >
    <div class="top-wrapper">
      <mt-header class="head-pop" :title="title">
        <header-item slot="left" v-bind:isBack="true" v-on:onclick="leftClick"></header-item>
      </mt-header>
      <div class="num-input-wrapper">
        <ul>
          <li v-for="(it, index) in val" :key="index" :class="{ 'b-r': index < NumberLength - 1 }">
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
      <div class="forget-pwd">
        <a @click="forgetPwd">忘记密码？</a>
      </div>
    </div>

    <div class="keyboard-wrapper">
      <numeric-keyboard :layout="keyBoradLayout" @press="press" />
    </div>
  </mt-popup>
</template>

<script>
import { NumericKeyboard } from 'numeric-keyboard'
const _Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const NumberLength = 6
const keyBoradLayout = [
  [
    {
      key: _Numbers[1]
    },
    {
      key: _Numbers[2]
    },
    {
      key: _Numbers[3]
    }
  ],
  [
    {
      key: _Numbers[4]
    },
    {
      key: _Numbers[5]
    },
    {
      key: _Numbers[6]
    }
  ],
  [
    {
      key: _Numbers[7]
    },
    {
      key: _Numbers[8]
    },
    {
      key: _Numbers[9]
    }
  ],
  [
    {
      key: '.'
    },
    {
      key: _Numbers[0]
    },
    {
      key: 'del'
    }
  ]
]
export default {
  name: 'NumericInputLocal',
  data() {
    return {
      keyBoradLayout: keyBoradLayout,
      pwd: [],
      NumberLength: NumberLength
    }
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '请输入密码'
    },
    count: Number
  },
  model: {
    prop: 'show',
    event: 'toggle'
  },
  computed: {
    val() {
      const res = []
      for (let i = 0; i < NumberLength; i++) {
        res[i] = typeof this.pwd[i] !== 'undefined' ? '*' : ''
      }
      return res
    }
  },
  watch: {
    show(newV) {
      this.$emit('toggle', newV)
      if (newV) {
        this.pwd = []
      }
    },
    pwd(newV) {
      if (newV.length >= NumberLength) {
        this.$emit('done', this.pwd.slice(0, 6).join(''))
      }
    },
    count(newV) {
      // 密码输入框置空
      this.pwd = []
    }
  },
  methods: {
    press(key) {
      // del
      if ('del' == key) {
        this.pwd.pop()
        return
      }
      if (!_Numbers.includes(key)) {
        return
      }
      if (this.pwd.length >= NumberLength) {
        return
      }
      this.pwd.push(key)
    },
    leftClick() {
      this.$emit('toggle', false)
      this.$emit('clickBack')
    },
    forgetPwd() {
      this.$emit('toggle', false)
      this.$emit('resetPwd')
    }
  },
  components: {
    NumericKeyboard
  }
}
</script>

<style lang="scss" scoped>
.input-numeric-keyboard-popup {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.input-numeric-keyboard-popup /deep/ {
  .numeric-keyboard {
    border-spacing: 6px;
    background-color: rgba(210, 213, 219, 0.9);
    font-size: 25px;
  }
  .numeric-keyboard-key {
    border-radius: 5px;
    box-shadow: 0px 1px 0px 0px rgba(132, 134, 136, 1);
  }
  td[data-key='.'] {
    visibility: hidden;
    pointer-events: none;
  }
}
.num-input-wrapper {
  margin: 31px 15px 0;
  border-radius: 4px;
  @include thin-border-2019([top, left, bottom, right], rgba(187, 187, 187, 1), [4px, 4px, 4px, 4px]);
  overflow: hidden;
  ul {
    display: flex;

    li {
      flex: 1 0 0;
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;

      &.b-r {
        @include thin-border-2019(right, rgba(187, 187, 187, 1));
      }
    }
  }
}
.keyboard-wrapper {
  height: 216px;
}
.forget-pwd {
  margin-top: 20px;
  text-align: center;
  a {
    text-decoration: none;
    font-size: 14px;
    color: rgba(119, 37, 8, 1);
    line-height: 20px;
  }
}
.head-pop {
  height: 44px;
  background: rgba(255, 255, 255, 1);
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
}
</style>
