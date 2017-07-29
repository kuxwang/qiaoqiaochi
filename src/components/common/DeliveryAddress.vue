<template>
	<div class="main">
      <mt-header fixed title="管理收货地址">
        <a slot="left" @click="goBack">
          <mt-button icon="back" ></mt-button>
        </a>
      </mt-header>
      <ul class="deliveryAddress">
      	<li :class="{on:onActive==i}" @click="getMyAddress(v,i)" v-for="(v,i) in addressLists">
      		<div class="clearfix deliveryAddress-tp">
      			<div class="fl">
	      			收货人：{{v.realname}}
	      		</div>
	      		<div class="fr">
	      			{{v.mobile}}
	      		</div>
      		</div>
      		<p class="deliveryAddress-mid lr2">
            {{v.province}}{{v.city}}{{v.area}}{{v.address}}
      		</p>
      	</li>
      </ul>
      <router-link class="addDeliveryAddress" tag="div" :to="{name:'addaddress'}">
      	新增收货地址
      </router-link>
	  	<transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight" >
	    	<router-view></router-view>
	    </transition>
    </div>
</template>
<script>
  import {mapActions,mapMutations} from 'vuex';
	export default{
    data(){
      return{
        onActive:'',
        addressLists:[
          {
              "id":"111",
              "uniacid":"2",
              "openid":"ombk8wiE8F5XPNFtBEga5s2voS_E",
              "realname":"2号",
              "mobile":"18912393729",
              "province":"西藏区",
              "city":"拉萨市",
              "area":"城关区",
              "address":"巴尔库路天海大酒店(测试)",
              "isdefault":"1",
              "zipcode":"",
              "deleted":"0"
          },
          {
              "id":"222",
              "uniacid":"2",
              "openid":"ombk8wiE8F5XPNFtBEga5s2voS_E",
              "realname":"2号",
              "mobile":"18912393729",
              "province":"西藏区",
              "city":"拉萨市",
              "area":"城关区",
              "address":"巴尔库路天海大酒店(测试)",
              "isdefault":"1",
              "zipcode":"",
              "deleted":"0"
          },
          {
              "id":"333",
              "uniacid":"2",
              "openid":"ombk8wiE8F5XPNFtBEga5s2voS_E",
              "realname":"2号",
              "mobile":"18912393729",
              "province":"西藏区",
              "city":"拉萨市",
              "area":"城关区",
              "address":"巴尔库路天海大酒店(测试)",
              "isdefault":"1",
              "zipcode":"",
              "deleted":"0"
          }
        ]
      }
    },
		methods:{
			goBack(){
				this.$router.go(-1);
			},
      getMyAddress(v,i){
        this.onActive=i;
        this.getUserAddress(v);
        // this.$router.push({name:'confirmorder'});
      },
      ...mapMutations({
        'getUserAddress':'GET_USERADDRESS'
      })
		},
    mounted(){
      this.onActive='2'
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
  	.header{
  		font-size: 0.16rem;
  		height: 0.44rem;
  	}
  	.deliveryAddress{
  		margin-top: 0.55rem;
  		margin-bottom: 0.58rem;
  	}
  	.deliveryAddress li{
  		height: 0.92rem;
  		padding:0.1rem 0.58rem 0.1rem 0.1rem;
  		background: #fff;
  		border-bottom: 0.01rem solid #D8D8D8;
  		position: relative;
  	}
  	.deliveryAddress-tp{
  		font-size: 0.16rem;
  		color:#666;
  	}
  	.deliveryAddress-mid{
  		font-size: 0.12rem;
  		color:#666;
  		text-align: left;
  		margin-top: 0.1rem;
  		line-height: 0.20rem;
  	}
  	.deliveryAddress li.on{
  		background: #5e6b85;
  	}
  	.deliveryAddress li.on:before {
    	content: "✔";
	    position: absolute;
	    top: 0.26rem;
	    right: 0.1rem;
	    font-size: 0.26rem;
	    color:#fff;
	}
  	.deliveryAddress li.on .deliveryAddress-tp{
  		color:#fff;
  	}
  	.deliveryAddress li.on .deliveryAddress-mid{
  		color:#fff;
  	}
  	.addDeliveryAddress{
  		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
  		height: 0.48rem;
  		line-height: 0.48rem;
  		background: #F5751D;
  		text-align: center;
  		color:#fff;
  		font-size: 0.16rem;
  	}
</style>