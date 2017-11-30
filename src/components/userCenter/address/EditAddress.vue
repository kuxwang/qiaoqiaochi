<template>
  <div class="main">
    <mt-header fixed :title="myTitle">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <ul class="addAddress-list">
      <li @click="setCity">
        <input type="text" disabled v-model="temp_addr" placeholder="请选择地址">
      </li>
      <li>
        <input type="text" v-model="name" placeholder="请输入收货人姓名">
      </li>
      <li>
        <input type="text" v-model="getAddress" placeholder="请输入收货人地址">
      </li>
      <li>
        <input type="number" v-model="tel" maxlength="11" placeholder="请输入收货人联系电话" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
      </li>
    </ul>
    <div class="newlyAdded" @click="save">
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
import { Toast, Picker, Popup, DatetimePicker, Checklist } from 'mint-ui';
import { address, slots } from '../../../assets/js/address';
import { mapState, mapMutations, mapGetters } from 'Vuex';
import { addresses_post, addresses_put } from '../../../api/api';
export default {
  data() {
    return {
      mypopup1: false,
      slots: slots,
      visibleItemCount: 5,
      address: '',
      name: '',  //昵称
      temp_addr: '', //收货人省市区
      getAddress: '', //收货人详细地址
      tel: '', //收货人联系电话
      // area: [], //地区
      province: '',  //省
      city: '',  //市
      area: '',  //区
      myTitle: '', //title
      state: '' //1：新增  2：编辑
    }
  },
  computed: {
    ...mapState([
      'addressListNum',
      'seteditAddress',
      'oldprovince',
      'oldcity',
      'oldarea'
    ]),
    ...mapGetters([
      'oldaddress'
    ]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // let _this = this;
      // _this.$router.push({ name: 'manageAddress' });
    },
    setCity() {  //所在城市显示
      this.mypopup1 = true;
    },
    cityConfirm() {  //城市确认
      let _this = this;
      _this.mypopup1 = false;
      _this.temp_addr = `${_this.province} ${_this.city} ${_this.area}`;  //每次确定时赋值
    },
    cityCancel() {  //城市取消
      this.mypopup1 = false;
    },
    initAddress() {  //城市初始化
      this.slots[0].values = address.filter((item, index) => {
        if (item.apid === 0) {
          return item;
        }
      });
    },
    cityValuesChange(picker, values) {
      console.log(values)
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
        // this.temp_addr = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
        this.province = values[0].aname;
        this.city = values[1].aname;
        this.area = values[2].aname;

        console.log(this.province);
        console.log(this.city);
        console.log(this.area);
      }
    },
    save() {
      if (!this.temp_addr) {
        Toast('您尚未选择地区')
        return
      } else if (!this.name) {
        Toast('请填写姓名')
        return
      } else if (!this.temp_addr) {
        Toast('请填写收货人地址')
        return
      } else if (!this.tel) {
        Toast('请填写收货人手机号')
        return
      }
      let telreg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
      if (!telreg.test(this.tel)) {
        Toast('手机格式错误')
        return
      }
      let _this = this;
      if (_this.state === 1) {  //state:1 是新增 2是修改
        let params = {
          data: {
            realname: _this.name,
            mobile: _this.tel,
            province: _this.province,
            city: _this.city,
            area: _this.area,
            address: _this.getAddress,
          }
        }
        addresses_post(params, res => {
          if (res.statusCode == 1) {
            params.data.id = res.data;
            _this.getChangeAddress(params.data);//新增过的地址保存到vuex中
            Toast({
              message: '地址新增成功',
              position: 'top',
              duration: 1500
            });
            this.$router.go(-1);
          } else {
            Toast({
              message: `${res.data}`,
              position: 'top',
              duration: 1500
            });
          }
        })
      } else if (_this.state === 2) {
        let params = {
          data: {
            realname: _this.name,
            mobile: _this.tel,
            province: _this.province,
            city: _this.city,
            area: _this.area,
            address: _this.getAddress,
            addressid: _this.$route.query.id
          }
        }
        addresses_put(params, res => {
          console.log(res);
          if (res.statusCode == 1) {
            params.data['id'] = _this.$route.query.id;
            delete params.data['addressid'];
            _this.getChangeAddress(params.data);  //修改过的地址保存到vuex中
            Toast({
              message: '地址修改成功',
              position: 'top',
              duration: 1500
            });
            this.$router.go(-1);
          } else {
            Toast({
              message: `${res.data}`,
              position: 'top',
              duration: 1500
            });
          }
        })
      }
    },
    ...mapMutations({
      'getUserAddress': 'GET_USERADDRESS',
      'getOnActive': 'GET_ONACTIVE',
      'getChangeAddress': 'GET_CHANGEADDRESS'
    }),
  },
  mounted() {
    let _this = this;
    _this.initAddress();//初始化地址
    _this.state = _this.$route.query.state; //获取state 判断是新增 还是编辑  1是新增  2是编辑
    if (Number(_this.state) === 1) {
      _this.myTitle = '新增收货地址';
      _this.temp_addr = '';
    } else if (Number(_this.state) === 2) {
      _this.myTitle = '修改收货地址';
      _this.temp_addr = `${_this.seteditAddress.province} ${_this.seteditAddress.city} ${_this.seteditAddress.area}`;  //收货人省市区
      _this.name = _this.seteditAddress.realname;  //昵称
      _this.getAddress = _this.seteditAddress.address;  //收货人详细地址
      _this.tel = _this.seteditAddress.mobile;  //收货人联系电话
      _this.province = _this.seteditAddress.province;  //省
      _this.city = _this.seteditAddress.city;  //市
      _this.area = _this.seteditAddress.area;  //区
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../assets/less/index.less';
  @import '../../../assets/less/reset.less';
  @import '../../../assets/fonts/iconfont.css';

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow:hidden;
  z-index: 50
}

.header {
  font-size: 0.16rem;
  height: 0.44rem;
}

.addAddress-list {
  margin-top: .48rem;
}

.addAddress-list li {
  padding: 0rem 0.10rem; // height: 0.5rem;
  // line-height: 0.5rem;
  border-bottom: 0.01rem solid #F3F4F5;
  position: relative;
  background: #fff;
}

.addAddress-list li:after {
  content: '';
  position: absolute;
  width: 0.065rem;
  height: 0.12rem;
  top: 0.18rem;
  right: 0.2rem;
  background: url('../../../assets/images/userinfo-01.png') no-repeat center center;
  background-size: cover;
}

.addAddress-list li input {
  display: block;
  width: 90%;
  height: 0.24rem;
  padding: 0.12rem 0rem;
  padding-right: 0.20rem;
  font-size: 0.14rem;
  color: #727272;
  background: #fff;
}

.newlyAdded {
  width: 95%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  background: #19AC15;
  color: #fff;
  margin-top: 0.4rem;
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
  color: #F5751D;
}

.picker-item {
  font-size: 0.16rem;
}
</style>
