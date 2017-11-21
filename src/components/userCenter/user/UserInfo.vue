<template>
  <div class="main">
    <section>
      <mt-header fixed title="个人信息">
        <router-link to="/userCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <div class="hehe">
      <ul class="userinfo-list">
        <li class="userinfo-header">
          <span class="fl">
            头像
          </span>
          <span class="fr">
            <img id="img_upload" :src="userPhoto" />
          </span>
          <input id="file_head" type="button" @click="getUserImg()" />
        </li>
        <li>
          <span class="userinfo-list-lf fl">
            真实姓名
          </span>
          <input type="search" name="" class="userinfo-list-lr fl" placeholder="请输入真实姓名" v-model="realname">
        </li>
        <li @click="toastPhone">
          <span class="userinfo-list-lf fl">
            手机号码
          </span>
          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请输入手机号码" v-model="mobile" disabled>
        </li>
        <li>
          <span class="userinfo-list-lf fl">
            支付宝-账
          </span>
          <input type="search" name="" class="userinfo-list-lr fl" placeholder="请输入支付宝账号" v-model="alipay_account">
        </li>
        <li>
          <span class="userinfo-list-lf fl">
            支付宝-名
          </span>
          <input type="search" name="" class="userinfo-list-lr fl" placeholder="请输入支付宝真实姓名" v-model="alipay_name">
        </li>
     
        <li @click="setCity">
          <span class="userinfo-list-lf fl">
            所在城市
          </span>
          <input type="text" name="" class="userinfo-list-lr fl" placeholder="请选择所在城市" v-model="userPlace" disabled>
        </li>
      </ul>
      <div class="postUserInfo" @click="postUserInfo">
        <button class="postUserInfo-item">
          提交
        </button>
      </div>
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
  </div>
</template>
<script>
import { Toast, Picker, Popup, DatetimePicker } from "mint-ui";
import { address, slots } from "../../../assets/js/address";
import { mapMutations } from "Vuex";
import {
  memberInfo,
  PUT_USERINFO,
  PUT_USERAVATARS,
  USERPHOTO
} from "../../../api/api";
import { _webapp } from "../../../config/webapp.js";
export default {
  data() {
    return {
      mobile: "", //电话
      alipay_account: "", //支付宝账号
      alipay_name: "", //支付宝真实姓名
      realname: "", //真实姓名
      userPlace: "", //省市区拼接
      province: "", //省
      city: "", //市
      area: "", //区
      userPhoto: "",
      mypopup1: false,
      slots: slots
    };
  },
  methods: {
    init() {
      //初始化

      let params = { data: {} };
      let _this = this;
      memberInfo(params, function(res) {
        console.log(res.data);
        if (res.statusCode === 1) {
          _this.mobile = res.data.mobile;
          _this.realname = res.data.realname;
          _this.alipay_account = res.data.alipay_account;
          _this.userPhoto = res.data.avatar;
          _this.alipay_name = res.data.alipay_name;
          _this.userPlace = res.data.province+' '+ res.data.city+' '+ res.data.area;
          _this.province = res.data.province;
          _this.city = res.data.city;
          _this.area = res.data.area;

          setTimeout(() => {
            _this.initAddress(); //初始化地址
          }, 70);
          // if (
          //   res.data.birthyear != "" &&
          //   res.data.birthmonth != "" &&
          //   res.data.birthday != ""
          // ) {
          //   _this.myDate = `${res.data.birthyear}年 ${res.data.birthmonth}月 ${res
          //     .data.birthday}日`;
          // } else {
          // }
        }
      });
    },
    initAddress() {
      //城市初始化
      let _this = this;
      _this.slots[0].values = address.filter((item, index) => {
        if (item.apid === 0) {
          return item;
        }
      });
    },
    setCity() {
      //所在城市显示
      let _this = this;
      _this.mypopup1 = true;
    },
    cityConfirm() {
      //城市确认
      let _this = this;
      _this.mypopup1 = false;
      _this.userPlace = `${_this.province} ${_this.city} ${_this.area}`;
    },
    cityCancel() {
      //城市取消
      this.mypopup1 = false;
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
        this.province = values[0].aname;
        this.city = values[1].aname;
        this.area = values[2].aname;
      }
    },
    postUserInfo() {
      //提交个人信息
      let _this = this;
      let params = {
        data: {
          nickname: "", //昵称
          realname: _this.realname, //真实姓名
          province: _this.province, //省
          city: _this.city, //市
          area: _this.area, //区
          alipay_name: _this.alipay_name, //支付宝真实姓名
          alipay_account: _this.alipay_account, //支付宝账号
          weixin: "", //微信
          birth: "", //生日
          avatar: _this.userPhoto //照片
        }
      };

      if (!params.data.alipay_name || !params.data.alipay_account) {
        Toast("请将您的支付宝信息填写完整");
        return false;
      }

      if (!params.data.realname) {
        Toast("请输入您的真实姓名");
        return false;
      }

      if (!params.data.province || !params.data.city || !params.data.area) {
        Toast("请选择您所在的城市");
        return false;
      }

      PUT_USERINFO(params, function(res) {
        if (res.statusCode === 1) {
          _this.$router.go(-1);
          Toast({
            message: "个人信息提交成功!",
            position: "middle",
            duration: 1000
          });
        } else {
          Toast({
            message: res.data,
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    getUserImg(e) {
      let that = this;
      _webapp.uploadImg(res => {
        that.userPhoto = res.data;
        // that.IMGURL(res.data);
      });
    },
    toastPhone() {
      Toast({
        message: "手机号已经绑定无法修改",
        position: "top",
        duration: 2000
      });
    }
  },
  mounted() {
    let _this = this;
    _this.init();
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/common.less";

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: @background;
  background: @background;
  /*overflow: hidden;*/
  z-index: 30;
  /*overflow-y: scroll;*/
}

.hehe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  /*overflow: hidden;*/
  z-index: 30;
  overflow-y: scroll;
}

.header {
  font-size: 0.16rem;
  height: 0.44rem;
}

.userinfo-list {
  margin-top: 0.55rem;
  overflow: hidden;
}

.userinfo-list li {
  padding: 0rem 0.1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #fff;
  border-bottom: 0.01rem solid #f3f4f5;
  position: relative;
  display: flex;
}

.userinfo-list li input {
  background: #fff;
  flex: 1;
}

.userinfo-list li span:nth-child(1) {
  font-size: 0.14rem;
  color: #333;
}

.userinfo-header {
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: space-between;
}

.userinfo-header span:nth-child(2) {
  width: 0.25rem;
  height: 0.25rem;
  /*background: url('../../assets/images/userinfo-02.png') no-repeat center center;*/
  background-size: cover;
  margin-top: 0.13rem;
  font-size: 0.12rem;
  color: #969696;
  border-radius: 50%;
}

.userinfo-header span:nth-child(2) img {
  display: block;
  width: 0.25rem;
  height: 0.25rem;
  border: none;
  border-radius: 50%;
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
  border-radius: 50%;
}

.userinfo-list-lf {
  /*width: 20%;*/
  text-align: left;
}

.userinfo-list-lr {
  width: 80%;
  padding-left: 0.1rem;
  color: #727272;
  font-size: 0.12rem;
}

.postUserInfo {
  width: 100%;
  // margin-top: 0.2rem;
}

.postUserInfo-item {
  width: 95%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  background: #19ac15;
  color: #fff;
  margin: 0.4rem 0rem;
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
  font-size: 0.16rem;
  color: #2c2c2c;
  border-bottom: 0.01rem solid #ddd;
}

.userpopup-lf {
  font-size: 0.135rem;
  color: #979696;
}

.userpopup-lr {
  font-size: 0.135rem;
  color: #f5751d;
}

.picker-item {
  font-size: 0.16rem;
}

.mint-header {
  z-index: 31 !important;
}
</style>

