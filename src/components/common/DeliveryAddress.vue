<template>
  <div class="main">
    <mt-header fixed title="选择收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
      <a slot="right" @click="manage">
        <mt-button title="管理">管理</mt-button>
      </a>
    </mt-header>
    <ul class="deliveryAddress">
      <!--<li :class="{on:onActives==i}" @click.prevent="getMyAddress(v,i)" v-for="(v,i) in addressLists">-->
      <li @click.prevent="getMyAddress(v,i)" v-for="(v,i) in addressLists">
        <div class="clearfix deliveryAddress-tp">
          <div class="fl">
            {{v.realname}}
          </div>
          <div class="fr">
            {{v.mobile}}
          </div>
        </div>
        <p class="deliveryAddress-mid lr2">
          <span class="defalutcolor" v-if="v.isdefault == 1">[默认地址]</span>{{v.province}}{{v.city}}{{v.area}}{{v.address}}
        </p>
        <!--<i class="iconfont mySelected" v-show="onActives==i">&#xe67f;</i>-->
        <i class="iconfont mySelected">&#xe67f;</i>
      </li>
    </ul>
    <!--<router-link class="addDeliveryAddress" tag="div" :to="{name:'addaddress'}">-->
    <!--新增收货地址-->
    <!--</router-link>-->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import {addresses_get} from '../../api/api';

  export default{
    data(){
      return {
        onActives: '',
        addressLists: []
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      getMyAddress(v, i){
        this.onActives = i;
        this.$router.push('/confirmorder?type=1');
        this.getUserAddress(v);
        this.getOnActive(i);
      },
      manage () {
        this.$router.push('/manageAddress')
      },
      ...mapMutations({
        'getUserAddress': 'GET_USERADDRESS',
        'getOnActive': 'GET_ONACTIVE',
        'getaddressnum': 'ADDRESSLISTNUM'
      })
    },
    computed: {
      ...mapGetters([
        "onActive"
      ]),
      ...mapState([
        'addressListNum'
      ])
    },
    mounted(){
      this.onActives = this.onActive
    },
    created () {
      let _this = this
      addresses_get({}, res => {
        console.log(res)
        if (res.statusCode == 1) {
          _this.getaddressnum(res.data.list.length)
          _this.addressLists = res.data.list
        } else {
          console.log('获取收货地址接口异常')
        }
      })
//      console.log(this.address)
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

  .deliveryAddress {
    margin-top: 0.55rem;
    /*margin-bottom: 0.58rem;*/
  }

  .deliveryAddress li {
    height: 0.92rem;
    padding: 0.1rem 0.58rem 0.1rem 0.1rem;
    background: #fff;
    border-bottom: 0.01rem solid #D8D8D8;
    position: relative;
  }

  .deliveryAddress-tp {
    font-size: 0.16rem;
    color: #666;
  }

  .deliveryAddress-mid {
    font-size: 0.12rem;
    color: #666;
    text-align: left;
    margin-top: 0.1rem;
    line-height: 0.20rem;
  }

  .deliveryAddress li.on {
    /*background: #5e6b85;*/
    background: #c3c3c3;
  }

  /* .deliveryAddress li.on:before {
     content: "✔";
     position: absolute;
     top: 0.26rem;
     right: 0.1rem;
     font-size: 0.26rem;
     color: #fff;
   }*/

  .deliveryAddress li.on .deliveryAddress-tp {
    color: #fff;
    /*color: #666;*/
  }

  .deliveryAddress li.on .deliveryAddress-mid {
    color: #fff;
    /*color: #666;*/
  }

  .addDeliveryAddress {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.48rem;
    line-height: 0.48rem;
    background: #F5751D;
    text-align: center;
    color: #fff;
    font-size: 0.16rem;
  }

  .mySelected {
    position: absolute;
    top: 0.26rem;
    right: 0.1rem;
    font-size: 0.26rem;
    color: #fff;
  }

  .defalutcolor {
    color: red
  }
</style>
