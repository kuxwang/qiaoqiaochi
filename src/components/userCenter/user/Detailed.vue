<template>
  <div class="main">
    <section>
      <mt-header fixed title="历史明细">
        <a slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div class="detailed">
        <div class="detailed-content" v-for="(v,i ) in msg" :key="i">
          <div class="detailed-year">
            {{i}}
          </div>
          <div class="detailed-item" v-for="(v2,i2) in v" :key="i2">
            <div class="detailed-info">
              <div class="detailed-title">
                {{v2.title}}
              </div>
              <div class="detailed-time">
                {{v2.time}}
              </div>
            </div>
            <div class="detailed-number">
              ￥{{v2.price}}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { Toast, Picker, Popup, DatetimePicker } from 'mint-ui';
import { address } from '../../../assets/js/address';
import { mapMutations } from 'Vuex';
import { memberInfo, PUT_USERINFO, PUT_USERAVATARS, USERPHOTO } from '../../../api/api';
import { _webapp } from '../../../config/webapp.js';
//  import {_webapp} from '../../config/webapp.js';

export default {
  data() {
    return {
      msg: {
        '2017年': [
          { title: ' 9月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 8月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 7月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 6月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 5月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
        ],
        '2016年': [
          { title: ' 9月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 8月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 7月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 6月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 5月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
          { title: ' 4月账单', time: '2017/08/17-2017/09/15', price: '1036.00' },
        ],

      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped lang="less">
@import '../../../assets/css/fonts/iconfont.css';
@import '../../../assets/css/reset/reset.css';

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ececec;
  z-index: 30;
  overflow: auto;
  .detailed {
    margin-top: 0.55rem;
    .detailed-content {
      .detailed-year {
        display: flex;
        align-items: center;
        height: 0.25rem;
        background: #EFF3F6;
        padding: 0rem 0.1rem;
        font-size: 0.13rem;
        color: #666;
      }
      .detailed-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.66rem;
        border-bottom: 1px solid #eee;
        padding: 0rem 0.1rem;
        text-align: left;
        background: #FEFEFE;
        .detailed-info {
          .detailed-title {
            font-size: 0.16rem;
            color: #333;
            font-weight: 600
          }
          .detailed-time {
            font-size: 0.12rem;
            color: #666;
            margin-top: 0.05rem;
          }
        }
        .detailed-number {
          font-size: 0.15rem;
          color: #333;
        }
      }
    }
  }
}

.header {
  font-size: 0.16rem;
  height: 0.44rem;
}

.mint-header {
  z-index: 31 !important;
}
</style>

