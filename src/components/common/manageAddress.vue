<template>
  <div class="main">
    <mt-header fixed title="管理收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
      <!--<a slot="right" @click="manage">-->
      <!--<mt-button  title="管理">管理</mt-button>-->
      <!--</a>-->
    </mt-header>
    <ul class="deliveryAddress">
      <!--<li :class="{on:onActives==i}" @click.prevent="getMyAddress(v,i)" v-for="(v,i) in addressLists">-->
      <!--<li @click.prevent="getMyAddress(v,i)" v-for="(v,i) in addressLists">-->
      <li v-for="(v,i) in addressLists">
        <div class="clearfix deliveryAddress-tp">
          <div class="fl">
            {{v.realname}}
          </div>
          <div class="fr">
            {{v.mobile}}
          </div>
        </div>
        <p class="deliveryAddress-mid lr2">
          {{v.province}}{{v.city}}{{v.area}}{{v.address}}
        </p>
        <div class="div-hr"></div>
        <!--<i class="iconfont mySelected" v-show="onActives==i">&#xe67f;</i>-->
        <!--<i class="iconfont mySelected" >&#xe67f;</i>-->
        <label class="mint-checklist-label fl">
            <span class="mint-checkbox">
              <!--<input type="checkbox" :checked="v.isdefault==1" class="mint-checkbox-input">-->
              <!--<span class="mint-checkbox-core"></span>-->
              <!--<span class="defaultcheck">设置为默认</span>-->
            </span>

        </label>
        <div class="edit" @click="edit(v)">
          编辑
        </div>
        <div class="delete" @click="deleteAddress(v.id)">
          删除
        </div>
      </li>
    </ul>
    <router-link class="addDeliveryAddress" tag="div" :to="{name:'addaddress'}">
      新增收货地址
    </router-link>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import {addresses_get, addresses_delete} from '../../api/api';
  import {MessageBox} from 'mint-ui';
  //  import {Checklist} from 'mint-ui';

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
      getMyAddress(v, i) {
        this.onActives = i;
        this.isnull(false)
        this.$router.push('/confirmorder?type=1');
        this.getUserAddress(v);
        this.getOnActive(i);
      },
      manage() {
        this.$router.push({name: '/manageAddress'})
      },
      edit(value) {
        this.seteditAddresses(value)
        this.oldaddress(value.province + ' ' + value.city + ' ' + value.area)
        this.$router.push({path: '/editAddress', query: {id: value.id}})
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
      ...mapMutations({
        'getUserAddress': 'GET_USERADDRESS',
        'getOnActive': 'GET_ONACTIVE',
        'getaddressnum': 'ADDRESSLISTNUM',
        'seteditAddresses': 'SETEDITADDRESS',
        'oldaddress': 'OLDADDRESS',
        'isnull':"ISNULL"
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
    mounted() {
      this.onActives = this.onActive
    },

    created() {
      let _this = this
      addresses_get({}, res => {
        if (res.statusCode == 1) {
          _this.getaddressnum(res.data.list.length)
          _this.addressLists = res.data.list
          console.log(res)
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

  .div-hr {
    position: absolute;
    left: 0;
    width: 3.75rem;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    top:.8rem;
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
</style>
