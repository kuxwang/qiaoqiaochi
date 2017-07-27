<template>
 	<div class="main">
 		<section>
	      <mt-header fixed title="我的资料" class="ocolor">
	        <router-link to="/vipCenter" slot="left">
	          <mt-button icon="back" >返回</mt-button>
	        </router-link>
	      </mt-header>
	    </section>
	    <ul class="userinfo-list">
	    	 <li class="userinfo-header" style="position: relative">
	          <span class="fl">
	            头像
	          </span>
	          <span class="fr" style="display: block">
	            <img id="img_upload" :src="imgurl"/>
	          </span>
	          <input id="file_head" type="file" @change="getMyImg($event)"/>
	        </li>
	        <li @click="getMyName">
	          <span class="fl">
	            姓名
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	        <li @click="getMyWx">
	          <span class="fl">
	            微信号
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	        <li @click="getMyZfb">
	          <span class="fl">
	            支付宝账号
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	        <li @click="getMyRelName">
	          <span class="fl">
	            真实姓名
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	        <li @click="getCity">
	          <span class="fl">
	            所在城市
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	        <li @click="getMyAge">
	          <span class="fl">
	            年龄
	          </span>
	          <span class="fr">
	            请填写
	          </span>
	        </li>
	    </ul>
	    <!-- 姓名弹窗 -->
	    <div class="mark" @click="hideNameMrak" v-show="!mypopup1">
	    	<div class="msgbox" @click.stop="">
		        <div class="msgbox-header">
		          <div class="msgbox-title">
		            姓名
		          </div>
		        </div>
		        <div class="msgbox-input">
		          <input placeholder="" type="text" v-model="userName" autofocus="autofocus" placeholder="请输入您的姓名"
		                 onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
		        </div>
		        <div class="msgbox-btns">
		          <button class="msgbox-btn msgbox-cancel " @click="msgboxNameCancel">取消</button>
		          <button class="msgbox-btn msgbox-confirm " @click="msgboxNameConfirm">确定</button>
		        </div>
	    	</div>
    	</div>
    	<!-- 微信弹窗 -->
	    <div class="mark" @click="hideWxMrak" v-show="!mypopup2">
	    	<div class="msgbox" @click.stop="">
		        <div class="msgbox-header">
		          <div class="msgbox-title">
		            微信号
		          </div>
		        </div>
		        <div class="msgbox-input">
		          <input placeholder="" type="text" v-model="userWx" autofocus="autofocus" placeholder="请输入您的微信号"
		                 onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
		        </div>
		        <div class="msgbox-btns">
		          <button class="msgbox-btn msgbox-cancel " @click="msgboxWxCancel">取消</button>
		          <button class="msgbox-btn msgbox-confirm " @click="msgboxWxConfirm">确定</button>
		        </div>
	    	</div>
    	</div>
    	<!-- 支付宝账号弹窗 -->
	    <div class="mark" @click="hideZfbMrak" v-show="!mypopup3">
	    	<div class="msgbox" @click.stop="">
		        <div class="msgbox-header">
		          <div class="msgbox-title">
		            支付宝账号
		          </div>
		        </div>
		        <div class="msgbox-input">
		          <input placeholder="" type="text" v-model="userZfb" autofocus="autofocus" placeholder="请输入您的支付宝账号"
		                 onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
		        </div>
		        <div class="msgbox-btns">
		          <button class="msgbox-btn msgbox-cancel " @click="msgboxZfbCancel">取消</button>
		          <button class="msgbox-btn msgbox-confirm " @click="msgboxZfbConfirm">确定</button>
		        </div>
	    	</div>
    	</div>
    	<!-- 真实姓名弹窗 -->
	    <div class="mark" @click="hideRelMrak" v-show="!mypopup4">
	    	<div class="msgbox" @click.stop="">
		        <div class="msgbox-header">
		          <div class="msgbox-title">
		            真实姓名
		          </div>
		        </div>
		        <div class="msgbox-input">
		          <input placeholder="" type="text" v-model="userRelName" autofocus="autofocus" placeholder="请输入您的真实姓名"
		                 onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
		        </div>
		        <div class="msgbox-btns">
		          <button class="msgbox-btn msgbox-cancel " @click="msgboxRelCancel">取消</button>
		          <button class="msgbox-btn msgbox-confirm " @click="msgboxRelConfirm">确定</button>
		        </div>
	    	</div>
    	</div>
    	<!-- 年龄 -->
	    <mt-popup v-model="mypopup5" position="bottom">
	      <div class="usersex">
	        <div class="usersex-tp clearfix">
	          <span class="fl usersex-lf" @click="ageCancel">取消</span>
	          选择出生年份
	          <span class="fr usersex-lr" @click="ageConfirm">确定</span>
	        </div>
	        <!-- <mt-picker :slots="ageSlots" @change="ageValuesChange"></mt-picker> -->
	      </div>
	    </mt-popup>
	    <!-- 所在城市 -->
	    <mt-popup v-model="mypopup6" position="bottom">
	      <div class="usersex">
	        <div class="usersex-tp clearfix">
	          <span class="fl usersex-lf" @click="cityCancel">取消</span>
	          选择所在城市
	          <span class="fr usersex-lr" @click="cityConfirm">确定</span>
	        </div>
	        <mt-picker :slots="citySlots" @change="cityValuesChange"></mt-picker>
	      </div>
	    </mt-popup>
 	</div>
</template>
<script>
	import {Toast, Picker, Popup} from 'mint-ui';
	export default{
		data(){
			return{
				getUserData:[],
				imgurl: '',
				mypopup1: true,
				mypopup2: true,
				mypopup3: true,
				mypopup4: true,
				mypopup5: false,
				mypopup6: false,
				userName:'',
				userWx:'',
				userZfb:'',
				userRelName:'',
				myAge: '',
				myCity:'',
				ageSlots: [
		          {
		            flex: 1,
		            values: []
		          }
		        ],
		        citySlots: [
		          {
		            flex: 1,
		            values: []
		          }
		        ],
			}
		},
		methods:{
			getMyImg(){

			},
			getMyName(){//姓名弹窗显示
		        this.mypopup1 = false;
		        this.userName = '';
		    },
			hideNameMrak(){//姓名弹窗消失
		        this.mypopup1 = true;
		    },
		    msgboxNameConfirm(){//姓名确认按钮
		        this.mypopup1 = true;
		        // var reg = /^[\u4E00-\u9FA5]+$/;
		        // if (reg.test(this.myName)) {
		        // } else {
		        //   Toast({
		        //     message: '姓名不能为空',
		        //     position: 'middle',
		        //     duration: 2000
		        //   });
		        // }
		    },
		    msgboxNameCancel(){//姓名取消按钮
		    	this.mypopup1 = true;
		    },
			getMyWx(){//微信弹窗显示
				this.mypopup2 = false;
		        this.userWx = '';
			},
			hideWxMrak(){//微信弹窗消失
		        this.mypopup2 = true;
		    },
		    msgboxWxConfirm(){//微信确认按钮
		    	this.mypopup2 = true;
		    },
		    msgboxWxCancel(){//微信取消按钮
		    	this.mypopup2 = true;
		    },
		    getMyZfb(){//支付宝弹窗显示
				this.mypopup3 = false;
		        this.userZfb = '';
			},
			hideZfbMrak(){//微信弹窗消失
		        this.mypopup3 = true;
		    },
		    msgboxZfbConfirm(){//微信确认按钮
		    	this.mypopup3 = true;
		    },
		    msgboxZfbCancel(){//微信取消按钮
		    	this.mypopup3 = true;
		    },
		    getMyRelName(){//真实姓名弹窗显示
		    	this.mypopup4 = false;
		        this.userRelName = '';
		    },
		    hideRelMrak(){//微信弹窗消失
		        this.mypopup4 = true;
		    },
		    msgboxRelConfirm(){//微信确认按钮
		    	this.mypopup4 = true;
		    },
		    msgboxRelCancel(){//微信取消按钮
		    	this.mypopup4 = true;
		    },
		    getMyAge(){//年龄弹窗显示
		    	this.mypopup5=true;
		    },
		    ageConfirm(){//年龄确认按钮
		    	this.mypopup5=false;
		    },
		    ageCancel(){//年龄取消按钮
		    	this.mypopup5=false;
		    },
		    ageYears(){
		        // var nowYear = new Date().getFullYear();
		        // var yearsArr =[];
		        // for (let i = 1940; i <= nowYear; i++) {
		        //   yearsArr.push(i)
		        // }
		        // yearsArr.sort(function(a,b){return b-a});
		        // this.ageSlots[0].values = yearsArr;
		   	},
		   	ageValuesChange(){//获取当前年龄
		        // this.myAge = new Date().getFullYear() - Number(values.join(''));
		        // console.log(myAge)
		    },
		    getCity(){//城市弹窗显示
		    	this.mypopup6=true;
		    },
		    cityConfirm(){//城市确认按钮
		    	this.mypopup6=false;
		    },
		    cityCancel(){//城市取消按钮
		    	this.mypopup6=false;
		    },
		    cityValuesChange(){

		    }
		},
		mounted(){
			// this.ageYears();
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
	    /*overflow: auto;*/
	    z-index: 30
  	}
  	.userinfo-list{
  		margin-top: 0.60rem;
  		overflow: hidden;
  	}
	.userinfo-list li {
		padding: 0rem 0.18rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    background: #fff;
	    border-bottom: 0.01rem solid #F3F4F5;
	    position: relative;
	}
	.userinfo-list li:after {
	   	content: '';
	    position: absolute;
	    width: 0.05rem;
	    height: 0.09rem;
	    top: 0.20rem;
	    right: 0.175rem;
	    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
	    background-size: cover;
	    z-index: 999
	}
	.userinfo-list li span:nth-child(1) {
	    font-size: 0.13rem;
	    color: #666;
	}
	.userinfo-list li span:nth-child(2) {
	    font-size: 0.12rem;
	    color: #969696;
	    margin-right: 0.2rem;
	}
	.userinfo-header span:nth-child(2) {
	    width: 0.25rem;
	    height: 0.25rem;
	     background: url('../../assets/images/userinfo-02.png') no-repeat center center;
	    background-size: cover;
	    margin-top: 0.13rem;
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
  	.mark {
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(0, 0, 0, .5);
	    z-index: 50;
  	}
	.msgbox {
	    width: 3rem;
	    position: fixed;
	    top: 50%;
	    background: #fff;
	    left: 50%;
	    margin-left: -1.5rem;
	    margin-top: -1.27rem;
	    border-radius: 1.5px;
	    /*font-size: 16px;*/
	    -webkit-user-select: none;
	    overflow: hidden;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	    /*-webkit-animation: fadeIn 1s .2s ease both;*/
	    /*-moz-animation: bounceIn 1s .2s ease both;*/
	}

  .msgbox-header {
    padding: 0.25rem 0 0;
    margin-bottom: 0.32rem;
  }

  .msgbox-input {
    display: block;
    width: 2rem;
    margin: 0 auto;
    margin-bottom: 0.38rem;
  }

  .msgbox-input input {
    border-bottom: 1px solid #666;
    padding: 0.08rem 0rem;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    text-align: center;
    font-size: 0.14rem
  }

  .msgbox-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 0.5rem;
    line-height: 0.5rem;
    border-top: 0.01rem solid #eee;
  }

  .msgbox-btn {
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
    font-size: 0.15rem;
  }
  .msgbox-cancel {
    width: 50%;
    border-right: 1px solid #eee;
    color: #969696;
  }

  .msgbox-confirm {
    color: #FFCB05;
    width: 50%;
  }

  .msgbox-title {
    font-size: 0.165rem;
    color: #2C2C2C;
  }
  .picker-toolbar .mint-datetime-action {
    color: #979696 !important;
  }

  .mint-popup.mint-popup-bottom {
    width: 100%;
    background: #fff;
  }

  .usersex-tp {
    padding: 0.19rem 0.33rem;
    font-size: 0.165rem;
    color: #2C2C2C;
    border-bottom: 0.01rem solid #ddd;
  }

  .usersex-lf {
    font-size: 0.135rem;
    color: #979696;
  }
  .usersex-lr{
  	font-size: 0.135rem;
    color: #FFCB05;
  }
</style>