<template>
  <div class="main">
    <mt-header fixed title="配送方式">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <ul class="deliverymode-list">
      <li :class="{on:busActives==i}" v-for="(v,i) in businessList" @click="getDispatchName(v,i)" :key="i">
      		<span>
      			{{v.dispatchname}}
      		</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {dispatchs_get} from '../../../api/api';
  export default{
    data(){
      return {
        busActives: '',
        businessList: []
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1);
      },
      getDispatchName(v, i){
        this.busActives = i
        this.getChangeDelivery(v);
        this.getChangeDeliveryIndex(i);
        this.$router.replace({name:'confirmorder'});
      },
      ...mapMutations({
        'getChangeDelivery':'GET_CHANGEDELIVERY',
        'getChangeDeliveryIndex':'GET_CHANGEDELIVERYINDEX'
      })
    },
    created () {
      let params = {data:{}};
      dispatchs_get(params, res => {
        if (res.statusCode == 1) {
          console.log(res.data)
          this.businessList = res.data
        } else {
          console.log('配送列表接口异常')
        }
      })
    },
    computed: {
      ...mapGetters([
        'changeDeliveryIndex'
      ])
    },
    mounted(){
      this.changeDeliveryIndex!=''? this.busActives =this.changeDeliveryIndex:this.busActives=0;
    }
  }
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: @background;
    overflow: auto;
    z-index: 50
  }

  .header {
    font-size: 0.16rem;
    height: 0.44rem;
  }

  .deliverymode-list {
    margin-top: 0.45rem;
  }

  .deliverymode-list li {
    height: 0.5rem;
    line-height: 0.5rem;
    background: #fff;
    border-bottom: 0.01rem solid #F6F6F9;
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
    background: url('../../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .deliverymode-list li span {
    padding-left: 0.4rem;
  }
</style>
