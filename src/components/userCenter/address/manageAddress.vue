<!--<template>-->
  <!--<div class="main">-->
    <!--<mt-header fixed title="管理收货地址">-->
      <!--<a slot="left" @click="goBack">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</a>-->
    <!--</mt-header>-->
    <!--<ul class="deliveryAddress">-->
      <!--<li v-for="(v,i) in addressLists" @click.prevent="getMyAddress(v,i)">-->
        <!--<div class="clearfix deliveryAddress-tp">-->
          <!--<div class="fl">-->
            <!--{{v.realname}}-->
          <!--</div>-->
          <!--<div class="fr">-->
            <!--{{v.mobile}}-->
          <!--</div>-->
        <!--</div>-->
        <!--<p class="deliveryAddress-mid lr2">-->
          <!--{{v.province}}{{v.city}}{{v.area}}{{v.address}}-->
        <!--</p>-->
        <!--<div class="div-hr"></div>-->
        <!--<i class="iconfont mySelected" v-show="onActives==i">&#xe67f;</i>-->
        <!--<i class="iconfont mySelected" >&#xe67f;</i>-->
        <!--<label class="mint-checklist-label fl">-->
            <!--<span class="mint-checkbox">-->
              <!--<input type="checkbox" :checked="v.isdefault==1" class="mint-checkbox-input">-->
              <!--<span class="mint-checkbox-core"></span>-->
              <!--<span class="defaultcheck">设置为默认</span>-->
            <!--</span>-->

        <!--</label>-->
        <!--<div class="edit" @click.stop="edit(v)">-->
          <!--编辑-->
        <!--</div>-->
        <!--<div class="delete" @click="deleteAddress(v.id)">-->
          <!--删除-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->
    <!--<div class="addDeliveryAddress" @click="addaddr">-->
      <!--新增收货地址-->
    <!--</div>-->
    <!--<transition name="slide">-->
      <!--<router-view></router-view>-->
    <!--</transition>-->
  <!--</div>-->
<!--</template>-->

<template>
  <div class="page">
    <mt-header fixed title="管理收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
      <ul class="user__list">
        <li class="user" v-for="(v,i) in addressLists" >
          <div class="info" @click.prevent="getMyAddress(v,i)">
            <span class="name">{{v.realname}}</span>
            <span class="tel">{{v.mobile}}</span>
          </div>
          <div class="area" @click.prevent="getMyAddress(v,i)">
            {{v.province}}{{v.city}}{{v.area}}{{v.address}}
          </div>
          <div class="set">
            <div class="default">默认地址</div>
            <div class="right">
              <span @click.stop="edit(v)"><span class="iconfont edit">&#xe64e;</span>编辑</span>
              <span @click="deleteAddress(v.id)"><span class="iconfont tranch">&#xe6db;</span>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer>
      <div class="add" @click="addaddr">
        <span class="iconfont">&#xe6cd;</span>
        添加新地址
      </div>
    </footer>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>








<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import {addresses_get, addresses_delete} from '../../../api/api';
  import {MessageBox} from 'mint-ui';

  export default {
    data() {
      return {
        onActives: '',
        addressLists: [],
        isChecked: 1
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      init(){
        let _this = this
        addresses_get({data : {}}, res => {
          if (res.statusCode == 1) {
            _this.getaddressnum(res.data.list.length)
            _this.addressLists = res.data.list
            console.log(res)
          } else {
            console.log('获取收货地址接口异常')
          }
        })
      },
      edit(value) {
        this.seteditAddresses(value)
        let params = {
          province: value.province,
          city: value.city,
          area: value.area
        }
        this.oldaddress(params)
        console.log('修改')
        if(this.$route.name=='manageAddress'){
          this.$router.push({name: 'editAddress', query: {id: value.id}})
        }else if(this.$route.name=='address'){
          this.$router.push({name: 'useredit', query: {id: value.id}})
        }
      },
      addaddr(){
        console.log('添加')
        if(this.$route.name=='manageAddress'){
          this.$router.push({name: 'addaddress'})
        }else if(this.$route.name=='address'){
          this.$router.push({name: 'useradd'})
        }
      },
      deleteAddress(value) {
        let params = {
          data: {
            addressid: value
          }
        }
        addresses_delete(params, res => {
          if (res.statusCode == 1) {
            MessageBox({
              title: '提示',
              message: '是否删除该地址',
              showCancelButton: true
            }).then(res => {
              if (res == 'confirm') {
                for (let i = 0; i < this.addressLists.length; i++) {
                  if (this.addressLists[i].id === value) {
                    this.addressLists.splice(i, 1);
                    break;
                  }
                }
              }
            })

          } else {
            console.log('删除失败')
          }
        })

      },
      getMyAddress(v, i){
        if(this.addtype==0){
          console.log('addtype是从订单进来的')
          this.isnull(false)
//          this.onActives = i;
          this.getUserAddress(v);
          this.$router.go(-1)
//          this.getOnActive(i);
        }
      },
      ...mapMutations({
        'getUserAddress': 'GET_USERADDRESS',
        'getOnActive': 'GET_ONACTIVE',
        'getaddressnum': 'ADDRESSLISTNUM',
        'seteditAddresses': 'SETEDITADDRESS',
        'oldaddress': 'OLDADDRESS',
        'isnull': "ISNULL",
      })
    },
    computed: {
      ...mapGetters([
        "onActive",
        'addtype'
      ]),
      ...mapState([
        'addressListNum'
      ])
    },

    beforeRouteUpdate(to, from, next){
      if(from.path=='/address/add' || from.path =='/address/edit'){
        console.log('来自')
        console.log(from)
        this.init()
      }
      next()
    },


    mounted() {
      this.onActives = this.onActive


      console.log(this.$route.name)
    },

    created() {
      this.init()
    }
  }
</script>
<!--<style scoped>
  @import '../../../assets/css/fonts/iconfont.css';
  @import '../../../assets/css/reset/reset.css';

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
    /*margin-top: 0.7rem;*/
    margin-top: .48rem;
    margin-bottom: 0.58rem;
  }

  .deliveryAddress li {
    height: 1.15rem;
    padding: 0.1rem 0.58rem 0.1rem 0.1rem;
    background: #fff;
    border-bottom: 0.01rem solid #D8D8D8;
    margin-bottom: .05rem;
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
    margin-bottom: .05rem;
    line-height: 0.20rem;

  }

  .deliveryAddress li.on {
    /*background: #5e6b85;*/
    background: #c3c3c3;
  }

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
    /*background: #F5751D;*/
    background: #333;
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

  .div-hr {
    position: absolute;
    left: 0;
    width: 3.75rem;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    top: .8rem;
  }

  .mint-checklist-label {
    width: 2rem;
    /*z-index: 1;*/
    position: absolute;
    margin-top: .08rem;
  }

  .mint-checkbox {
    display: block;
    height: .3rem;
    float: left;
  }

  .mint-checkbox-core {
    width: .15rem;
    height: .15rem;
    float: left;
    display: block;
    vertical-align: middle;
    margin-top: .08rem;
  }

  .defaultcheck {
    float: left;
    font-size: .16rem;
    line-height: .3rem;
    margin-left: .1rem;
    color: #666;
  }

  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #F5751D;
    border-color: #F5751D;
  }

  .mint-checkbox-core::after {
    width: 3px;
    height: 6px;
    top: 3px;
    left: 4px;
  }

  .edit {
    position: absolute;
    font-size: .16rem;
    /*right: .5rem;*/
    color: #666;
    left: .1rem;
    padding: 0 .05rem;
    line-height: .5rem;
    bottom: -0.07rem;
  }

  .delete {
    position: absolute;
    font-size: .16rem;
    color: #666;
    right: .1rem;
    padding: 0 .05rem;
    line-height: .5rem;
    bottom: -0.07rem;
  }
</style>-->

<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';
  .page {
    .page-view(2);
  }
  .container {
    margin-top: .45rem;
    margin-bottom: .5rem;
    padding-bottom: 1rem;
    .scroll-view(100%);
    .user__list {
      width: 100%;
      /*padding-bottom: .5rem;*/
      .user {
        height: 1.2rem;
        border-bottom: 1px solid #dadada;
        text-align: left;
        .info {
          display: flex;
          padding: 0 .22rem;
          padding-top: .1rem;
          line-height: .22rem;
          margin-bottom: .04rem;

          .name {
            flex: 1;
            font-size: .12rem;
          }
          .tel {
            text-align: right;
            flex: 1;
            font-size: .1rem;
          }
        }
        .area {
          font-size: .12rem;
          padding: 0 .22rem;
          line-height: .2rem;
          height: .45rem;
          border-bottom: 1px solid #eee;
          .text-overflow(2);
          padding-bottom: .04rem;
        }
        .set {
          display: flex;
          padding: 0 .22rem;
          line-height: .38rem;
          .default {
            font-size: .11rem;
            flex: 1;
            color: #0076ff;
          }
          .right {
            flex: 1;
            text-align: right;
            span {
              font-size: .11rem;
              color: #666;
              .tranch {
                font-size: .22rem;
                position: relative;
                top:.025rem;

              }
              .edit {
                font-size: .16rem;
                margin-right: .03rem;
                position: relative;
                top:.01rem;
              }
            }
          }
        }
      }
    }
  }
  footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    height: .5rem;
    background-color: #fff;
    .add {
      display: inline-block;
      line-height: .5rem;
      color: #0076ff;
      border-top: 1px solid #eee;
      .iconfont {

      }
    }
  }



</style>
