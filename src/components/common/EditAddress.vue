<template>
  <div class="main">
    <mt-header fixed title="修改收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <ul class="addAddress-list">
      <li @click="setCity">
        <input type="text" disabled v-model="temp_addr" placeholder="请选择地址">
      </li>
      <li>
        <!--<input type="text" name="" placeholder="请输入收货人姓名" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">-->
        <input type="text" v-model="name" placeholder="请输入收货人姓名">
      </li>
      <li>
        <input type="text" v-model="getAddress" placeholder="请输入收货人地址">
      </li>
      <li>
        <input v-model="tel" maxlength="12" placeholder="请输入收货人联系电话" onkeyup="this.value=this.value.replace(/\D/g,'')"
               onafterpaste="this.value=this.value.replace(/\D/g,'')">
      </li>
      <!--<li>-->
      <!--<input v-model="zipCode" maxlength="6" placeholder="请输入邮编" onkeyup="this.value=this.value.replace(/\D/g,'')"-->
      <!--onafterpaste="this.value=this.value.replace(/\D/g,'')">-->
      <!--</li>-->
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
  import {Toast, Picker, Popup, DatetimePicker, Checklist} from 'mint-ui';
  import {address, slots} from '../../assets/js/address';
  import {mapState, mapMutations, mapGetters} from 'Vuex';
  import {addresses_post, addresses_put} from '../../api/api';
  export default{
    data(){
      return {
        mypopup1: false,
        slots: slots,
        visibleItemCount: 5,
        address: '',
        name: '',
        temp_addr: '', //地址
        getAddress: '', //收货人地址
        tel: '', //收货人联系电话
        zipCode: '',//邮编
        area: [] //地区
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
      ...mapMutations({
        'getUserAddress': 'GET_USERADDRESS',
        'getOnActive': 'GET_ONACTIVE',
      }),
      goBack(){
        this.$router.go(-1);
      },
      setCity(){//所在城市显示
        this.mypopup1 = true;
      },
      cityConfirm(){//城市确认
        this.mypopup1 = false;
//        console.log(this.temp_addr)
      },
      cityCancel(){//城市取消
        this.mypopup1 = false;
      },
      initAddress() {//城市初始化
        this.slots[0].values = address.filter((item, index) => {
          if (item.apid === 0) {
            return item;
          }
          /*if(item.aname == this.prov){
           return item;
           }*/
        });
        /*this.slots[0].values[0].aname='ceshi';
         this.slots[1].values[0].aname='ceshi';
         this.slots[2].values[0].aname='ceshi'*/
        console.log(this.slots[0])
        console.log(this.slots[1])
        /* console.log(this.slots[1])
         console.log(this.slots[2])*/
//        this.slots[0].values.push({aname:})
//        console.log(this.slots[0].values.length)
      },
      cityValuesChange(picker, values) {
//          console.log(values)
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
          console.log(this.temp_addr)
          console.log(values)
          this.area = {
            province: values[0].aname,
            city: values[1].aname,
            area: values[2].aname
          }
        }
      },
      save () {
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
//        else if (!this.zipCode) {
//          Toast('请填写邮编')
//          return
//        }
        let telreg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/; //验证手机号
//        let zipCodereg = /^\d{6}$/; //验证邮政编码
        if (!telreg.test(this.tel)) {
          Toast('手机格式错误')
          return
        }
//        if (!zipCodereg.test(this.zipCode)) {
//          Toast('邮编格式错误')
//          return
//        }
        let _this = this
        let params = {
          data: {
            realname: this.name,
            mobile: this.tel,
            province: this.area.province,
            city: this.area.city,
            area: this.area.area,
            address: this.getAddress,
            addressid: _this.$route.query.id
          }
        }
        addresses_put(params, res => {
          console.log(res)
          if (res.statusCode == 1) {
            let info = {
              realname: _this.name,
              mobile: _this.tel,
              province: _this.area.province,
              city: _this.area.city,
              area: _this.area.area,
              address: _this.getAddress,
              id: res.addressid,

            }
            console.log(res)
            console.log(info)
            this.getUserAddress(info);
            this.getOnActive(this.addressListNum)
            Toast({
              message: '地址保存成功',
              position: 'middle',
              duration: 2000
            });

            setTimeout(() => {
//              _this.$router.push('/confirmorder?type=1')
//              _this.$router.push({name:'deliveryaddress'})
              _this.$router.push({name: 'deliveryaddress'})

            }, 2000)
          }
        })
      },
      setValues(values){

      },
    },
    mounted () {
      this.initAddress()
    },
    created () {
      this.name = this.seteditAddress.realname
      this.getAddress = this.seteditAddress.address
//        this.getAddress = this.seteditAddress.province + this.seteditAddress.city + this.seteditAddress.area
      this.tel = this.seteditAddress.mobile
      this.zipcode = this.seteditAddress.zipCode
      setTimeout(() => {
        this.temp_addr = this.oldaddress;
        this.area = {
          province: this.oldprovince,
          city: this.oldcity,
          area: this.oldarea
        }
      }, 100)


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

  .addAddress-list {
    margin-top: 0.54rem;
  }

  .addAddress-list li {
    padding: 0rem 0.10rem;
    height: 0.5rem;
    line-height: 0.5rem;
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
    background: url('../../assets/images/userinfo-01.png') no-repeat center center;
    background-size: cover;
  }

  .addAddress-list li input {
    display: block;
    width: 100%;
    height: 0.48rem;
    line-height: 0.48rem;
    padding-right: 0.20rem;
    font-size: 0.14rem;
    color: #727272;
    background: #fff;
  }

  .newlyAdded {
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
