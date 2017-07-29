<template>
 	<div class="main">
 		<section>
	      <mt-header fixed title="我的资料">
	        <router-link to="/vipCenter" slot="left">
	          <mt-button icon="back" ></mt-button>
	        </router-link>
	      </mt-header>
	    </section>
	    <ul class="userinfo-list">
	    	 <li class="userinfo-header">
	          <span class="fl">
	            头像
	          </span>
	          <span class="fr">
	            <img id="img_upload" :src="imgurl"/>
	          </span>
	          <input id="file_head" type="file" @change="getMyImg($event)"/>
	        </li>
	         <li>
	          <span class="userinfo-list-lf fl">
	            昵称
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入昵称" v-model="myNc" @blur="testNc(myNc)">
	        </li>
	        <li>
	          <span class="userinfo-list-lf fl">
	            手机号码
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入手机号码" v-model="myPhone" disabled>
	        </li>
	        <li>
	          <span class="userinfo-list-lf fl">
	            微信号
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入微信号" v-model="myWx" @blur="testWx(myWx)">
	        </li>
	        <li>
	          <span class="userinfo-list-lf fl">
	            支付宝-账
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入支付宝账号" v-model="myZfb" @blur="testZfb(myZfb)">
	        </li>
	        <li>
	          <span class="userinfo-list-lf fl">
	            支付宝-名
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入支付宝真实姓名" v-model="myZfbName" @blur="testZfbName(myZfbName)" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
	        </li>
	        <li @click="setCity">
	          <span class="userinfo-list-lf fl">
	            所在城市
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请选择所在城市" v-model="myCity" disabled>
	        </li>
	        <li @click="open('picker1')">
	          <span class="userinfo-list-lf fl">
	            出生日期
	          </span>
	          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请选择出生日期" v-model="myDate" disabled>
	        </li>
	    </ul>
	    <div class="postUserInfo">
	    	 <button class="postUserInfo-item">
	    		提交
	    	</button>
	    </div>
	    <!-- 所在城市 -->
	    <mt-popup v-model="mypopup1" position="bottom" class="cityPopup">
	      <div class="userpopup">
	        <div class="userpopup-tp clearfix">
	          <span class="fl userpopup-lf" @click="cityCancel">取消</span>
	          选择所在城市
	          <span class="fr userpopup-lr" @click="cityConfirm">确定</span>
	        </div>
	       <mt-picker :slots="slots" value-key="aname" @change="cityValuesChange" class="myCityPopup"></mt-picker>
	      </div>
	    </mt-popup>
	     <!-- 出生日期 -->
	     <mt-datetime-picker
	      ref="picker1"
	      type="date"
	      v-model="value1"
	      year-format="{value} 年"
	      month-format="{value} 月"
	      date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
	      @confirm="handleChange" class="myBirthPicker">
	    </mt-datetime-picker>
 	</div>
</template>
<script>
	import {Toast, Picker, Popup, DatetimePicker} from 'mint-ui';
	import {address, slots} from '../../assets/js/address';
	export default{
		data(){
			return{
				myNc:'',
				myPhone:'18395319906',
				myWx:'',
				myZfb:'',
				myZfbName:'',
				myCity:'',
				myDate:'',
				imgurl:'',
				mypopup1:false,
				mypopup2:false,
				slots: slots,
		        visibleItemCount:5,
		    	address: '',
		    	temp_addr:'',
		    	value1:null,
		        startDate: new Date('1960'),
		        endDate: new Date()
			}
		},
		methods:{
			testNc(val){//昵称

			},
			testWx(val){//微信号

			},
			testZfb(val){//支付宝账号

			},
			testZfbName(val){//支支付宝真实姓名
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
		    setbirth(){//出生日期显示
		    	this.mypopup2=true;
		    },
		    open(picker) {
		        this.$refs[picker].open();
		    },
		    handleChange(value) {
		    	console.log(value)
		    }
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
	    /*overflow: hidden;*/
	    z-index: 30
  	}
  	.header{
  		font-size: 0.16rem;
  		height: 0.44rem;
  	}
  	.userinfo-list{
  		margin-top: 0.54rem;
  		overflow: hidden;
  	}
	.userinfo-list li {
		padding: 0rem 0.10rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    background: #fff;
	    border-bottom: 0.01rem solid #F3F4F5;
	    position: relative;
	}
	.userinfo-list li input{
		background: #fff;
	}
	.userinfo-list li span:nth-child(1) {
	    font-size: 0.14rem;
	    color: #333;
	}
	.userinfo-header{
		margin-bottom: 0.1rem
	}
	.userinfo-header span:nth-child(2) {
	    width: 0.25rem;
	    height: 0.25rem;
	     background: url('../../assets/images/userinfo-02.png') no-repeat center center;
	    background-size: cover;
	    margin-top: 0.13rem;
	    font-size: 0.12rem;
	    color: #969696;
	}
	#file_head {
	    display: block;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	    position: absolute;
	}
  	#img_upload {
	    width: 0.25rem;
	    height: 0.25rem;
	    border: none;
	    visibility: hidden;
	    border-radius: 50%;
  	}
  	.userinfo-list-lf{
  		/*width: 20%;*/
  		text-align: left;
  	}
  	.userinfo-list-lr{
  		height: 100%;
  		line-height: 100%;
  		width: 80%;
  		padding-left:0.1rem;
  		color:#727272;
  	}
  	.postUserInfo{
  		width:100%;
  		padding: 0rem 0.1rem;
  		margin-top: 0.2rem;
  	}
  	.postUserInfo-item{
  		width:100%;
  		height: 0.45rem;
  		box-shadow: 0 0.02rem 0.06rem rgba(138, 138, 138, .3);
  		background: #F5751D;
  		color:#fff;
  		font-size: 0.16rem;
  		border-radius: 0.04rem;
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

