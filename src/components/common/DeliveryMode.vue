<template>
  <div class="main">
    <mt-header fixed title="配送方式">
      <a slot="left" @click="goBack">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
    <ul class="deliverymode-list">
      <li :class="{on:busActives==i}" v-for="(v,i) in businessList" @click="getDispatchName(v,i)">
      		<span>
      			{{v.dispatchname}}
      		</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {dispatchs_get} from '../../api/api';
  export default{
    data(){
      return {
        busActives: '',
        businessList: [
          {
            "id": "1",
            "uniacid": "2",
            "dispatchname": "商家配送"
          },
          {
            "id": "1",
            "uniacid": "2",
            "dispatchname": "免费配送"
          },
          {
            "id": "1",
            "uniacid": "2",
            "dispatchname": "商家配送"
          }
        ]
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1);
      },
      getDispatchName(v, i){
        this.busActives = i
        this.getBusActive(i)
        this.getdelivery(v)
        this.$router.push('/confirmorder');
      },
      ...mapMutations({
        'getBusActive': 'GET_BUSACTIVE',
        'getdelivery': 'DELIVERY'
      })
    },
    created () {
      let params = {};
      dispatchs_get(params, res => {
        if (res.statusCode == 1) {
          this.businessList = res.data
        } else {
          console.log('配送列表接口异常')
        }
      })
    },
    computed: {
      ...mapGetters([
        'busActive'
      ])
    },
    mounted(){
      this.busActives = this.busActive
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    overflow: auto;
    z-index: 50
  }

  .header {
    font-size: 0.16rem;
    height: 0.44rem;
  }

  .deliverymode-list {
    margin-top: 0.55rem;
  }

  .deliverymode-list li {
    height: 0.5rem;
    line-height: 0.5rem;
    background: #fff;
    border-bottom: 0.01rem solid #D8D8D8;
    font-size: 0.15rem;
    padding: 0rem 0.1rem;
    text-align: left;
    color: #666;
    position: relative;
  }

  .deliverymode-list li.on:after {
    content: '✔';
    position: absolute;
    left: 0.2rem;
    top: 0px;
    font-size: 0.20rem;
    color: #F5751D;
  }

  .deliverymode-list li:before {
    content: '';
    position: absolute;
    width: 0.065rem;
    height: 0.12rem;
    top: 0.18rem;
    right: 0.2rem;
    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .deliverymode-list li span {
    padding-left: 0.4rem;
  }
</style>
