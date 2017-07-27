<template>
	<div class="main">
      <mt-header fixed title="新增收货地址" class="ocolor header">
        <a slot="left" @click="goBack">
          <mt-button icon="back" >返回</mt-button>
        </a>
      </mt-header>
      <ul class="addAddress-list">
      	<li @click="setCity">
      		<input type="text" disabled placeholder="请选择地址">
      	</li>
      	<li>
      		<input type="text" name="" placeholder="请输入收货人姓名" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
      	</li>
      	<li>
      		<input type="text"  placeholder="请输入收货人地址">
      	</li>
      	<li>
      		<input type="text"  placeholder="请输入收货人联系电话">
      	</li>
      	<li>
      		<input type="text"  placeholder="请输入邮编">
      	</li>
      </ul>
      <div class="newlyAdded">
      	保存地址
      </div>
	   <!-- 所在城市 -->
	    <mt-popup v-model="mypopup1" position="bottom" class="cityPopup">
	      <div class="userpopup">
	        <div class="userpopup-tp clearfix">
	          <span class="fl userpopup-lf" @click="cityCancel">取消</span>
	          选择地址
	          <span class="fr userpopup-lr" @click="cityConfirm">确定</span>
	        </div>
	       <mt-picker :slots="slots" value-key="aname" @change="cityValuesChange" class="myCityPopup"></mt-picker>
	      </div>
	    </mt-popup>
    </div>
</template>
<script>
	import {Toast, Picker, Popup, DatetimePicker} from 'mint-ui';
	import {address, slots} from '../../assets/js/address';
	export default{
		data(){
			return{
				mypopup1:false,
				slots: slots,
		        visibleItemCount:5,
		    	address: '',
		    	temp_addr:'',
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			setCity(){//所在城市显示
				this.mypopup1=true;
			},
			cityConfirm(){//城市确认
				this.mypopup1=false;
				console.log(this.temp_addr)
			},
			cityCancel(){//城市取消
				this.mypopup1=false;
			},
			initAddress() {//城市初始化
		        this.slots[0].values = address.filter((item, index) => {
		          if (item.apid === 0) {
		            return item;
		          }
		        });
		    },
	    	cityValuesChange(picker, values) {
		        // 防止没有省份时报错
		        if (values[0]) {
		          this.slots[1].values = address.filter((item, index) => {
		            if (item.apid === values[0].aid) {
		              return item;
		            }
		          });
		        }
		        // 防止没有市时报错
		        if (values[1]) {
		          this.slots[2].values = address.filter((item, index) => {
		            if (item.apid === values[1].aid) {
		              return item;
		            }
		          });
		        }
		        // 防止没有区时报错
		        if (values[2]) {
		          // 这里可以指定地址符，此处以空格进行连接
		          this.temp_addr = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
		        }
		    },
		},
		mounted() {
	      this.initAddress()
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
	    background: #ececec;
	    overflow: auto;
	    z-index: 50
  	}
  	.header{
  		font-size: 0.16rem;
  		height: 0.44rem;
  	}
  	.addAddress-list{
  		margin-top: 0.54rem;
  	}
  	.addAddress-list li{
  		padding: 0rem 0.10rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    border-bottom: 0.01rem solid #F3F4F5;
	    position: relative;
	    background: #fff;
  	}
  	.addAddress-list li:after{
  		content: '';
	    position: absolute;
	    width: 0.065rem;
	    height: 0.12rem;
	    top: 0.18rem;
	    right: 0.2rem;
	    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
	    background-size: cover;
  	}
  	.addAddress-list li input{
  		display: block;
  		width: 100%;
  		height: 0.48rem;
	    line-height: 0.48rem;
  		padding-right: 0.20rem;
  		font-size: 0.14rem;
  		color:#727272;
  	}
  	.newlyAdded{
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
  	.picker-toolbar .mint-datetime-action {
   		color: #979696 !important;
  	}
  	.mint-popup.mint-popup-bottom {
    	width: 100%;
    	background: #fff;
  	}
  	.userpopup-tp {
	    padding: 0.12rem 0.33rem;
	    font-size: 0.165rem;
	    color: #2C2C2C;
	    border-bottom: 0.01rem solid #ddd;
	}

	.userpopup-lf {
	    font-size: 0.135rem;
	    color: #979696;
	}

	.userpopup-lr {
	    font-size: 0.135rem;
	    color: #F5751D ;
	}
	.picker-item{
		font-size: 0.16rem;
	}
</style>