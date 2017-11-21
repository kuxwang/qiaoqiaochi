<template>
  <div class="page">
    <mt-header fixed title="管理收货地址">
      <a slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container" v-show="defShow">
      <ul class="user__list">
        <li class="user" v-for="(v,i) in addressLists" :key="i" @click.prevent="getMyAddress(v,i)">
          <div class="info">
            <span class="name">{{v.realname}}</span>
            <span class="tel">{{v.mobile}}</span>
          </div>
          <div class="area">
            <div class="lr2">
              {{v.province}} {{v.city}} {{v.area}} {{v.address}}
            </div>
          </div>
          <div class="set">
            <div class="default">
              <span :class="['iconfont',{'checked':isChecked==v.id} ]">&#xe69a;</span>
              <span :class="['title',{'blue':isChecked==v.id}]">默认地址</span>
            </div>
            <div class="right">
              <span @click.stop="edit(v)" class="edit">
                <span class="iconfont edit">&#xe64e;</span>编辑</span>
              <span @click.stop="deleteAddress(i,v.id)">
                <span class="iconfont tranch">&#xe6db;</span>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 没有订单时 -->
    <default-img :defData="defMsg" v-show="!defShow"></default-img>
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
import { mapGetters, mapMutations, mapState } from "vuex";
import { addresses_get, addresses_delete } from "../../../api/api";
import { MessageBox, Toast } from "mint-ui";
import myDefImg from "../../../assets/images/ddgl.png";
import defaultImg from "../../base/defaultImg/defaultImg";
export default {
  data() {
    return {
      addressLists: [],
      isChecked: "",
      defMsg: {
        img: myDefImg,
        title1: "您的地址列表空空如也~",
        title2: "赶快去设置新的地址吧"
      },
      defShow: true //如果有商品列表的情况下，优先显示商品，反之default图
    };
  },
  methods: {
    goBack() {
      let _this = this;
      _this.$router.go(-1);
    },
    init() {
      //初始化
      let _this = this;
      addresses_get({ data: {} }, res => {
        if (res.statusCode == 1) {
          _this.addressLists = res.data.list;
          _this.on1 = false;
          _this.addressLists.length <= 0
            ? (_this.defShow = false)
            : (_this.defShow = true);
          _this.selectedAddress();
        } else {
          Toast({
            message: `${res.data}`,
            position: "middle",
            duration: 1500
          });
          _this.defShow = false;
          _this.on1 = false;
        }
      });
    },
    selectedAddress() {
      //默认选中地址
      let _this = this;
      if (_this.changeAddress.id !== undefined) {
        _this.isChecked = _this.changeAddress.id;
      } else {
        _this.addressLists.length > 0
          ? (_this.isChecked = _this.addressLists[0].id)
          : (_this.isChecked = "");
      }
    },
    edit(value) {
      //编辑地址
      this.seteditAddresses(value);
      let params = {
        province: value.province,
        city: value.city,
        area: value.area
      };
      this.$router.push({
        name: "editAddress",
        query: { id: value.id, state: 2 }
      });
    },
    addaddr() {
      //新增地址
      this.$router.push({ name: "editAddress", query: { state: 1 } });
    },
    deleteAddress(i, value) {
      //删除地址
      let _this = this;
      let params = {
        data: {
          addressid: value
        }
      };
      MessageBox({
        title: "提示",
        message: "是否删除该地址",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //表示点击了确定
          addresses_delete(params, res => {
            if (res.statusCode == 1) {
              _this.addressLists.map((item, index, input) => {
                if (index === i) {
                  _this.addressLists.splice(index, 1);
                  _this.selectedAddress();
                  _this.getChangeAddress({});
                  _this.init();
                }
              });
            } else {
              Toast({
                message: `${res.data}`,
                position: "middle",
                duration: 1500
              });
            }
          });
        } else if (action == "cancel") {
          //表示点击了取消
          console.log("点击了取消");
        }
      });
    },
    getMyAddress(v, i) {
      //点击地址到地址管理页面
      let _this = this;
      _this.getChangeAddress(v);
      _this.isChecked = v.id;
      _this.$router.replace({ name: "confirmorder" });
    },
    ...mapMutations({
      seteditAddresses: "SETEDITADDRESS",
      getChangeAddress: "GET_CHANGEADDRESS"
    })
  },
  computed: {
    ...mapGetters(["changeAddress"])
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  components: {
    defaultImg
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/common.less";
.page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: auto;
  z-index: 40;
  .container {
    padding: 0.45rem 0rem 0.65rem 0rem;
    .scroll-view(100%);
    .user__list {
      width: 100%;
      .user {
        height: 1.2rem;
        border-bottom: 0.01rem solid #f6f6f9;
        text-align: left;
        background: #fff;
        margin-top: 0.1rem;
        .info {
          display: flex;
          padding: 0 0.22rem;
          padding-top: 0.1rem;
          line-height: 0.22rem;
          margin-bottom: 0.04rem;
          .name {
            flex: 1;
            font-size: 0.12rem;
          }
          .tel {
            text-align: right;
            flex: 1;
            font-size: 0.1rem;
          }
        }
        .area {
          width: 100%;
          font-size: 0.12rem;
          padding: 0 0.22rem;
          line-height: 0.15rem;
          height: 0.45rem;
          line-height: 0.18rem;
          border-bottom: 0.01rem solid #f6f6f9;
          margin-bottom: 0.04rem;
        }
        .set {
          display: flex;
          padding: 0 0.22rem;
          line-height: 0.38rem;
          .default {
            font-size: 0.11rem;
            flex: 1;
            color: #000;
            .iconfont {
              color: #fff;
              border: 1px solid #000;
              border-radius: 50%;
              font-size: 0.05rem;
            }
            .checked {
              color: @themeColor1;
              border: none;
              font-size: 0.15rem;
            }
            .title {
              color: #000;
              font-size: 0.11rem;
              display: inline-block;
              margin-left: 0.02rem;
            }
            .blue {
              color: @themeColor1;
            }
          }
          .right {
            flex: 1;
            text-align: right;
            span.edit {
              margin-right: 0.2rem;
            }
            span {
              display: inline-block;
              font-size: 0.11rem;
              color: #666;
              height: 100%;
              .tranch {
                font-size: 0.22rem;
                position: relative;
                top: 0.025rem;
              }
              .edit {
                font-size: 0.16rem;
                margin-right: 0.03rem;
                position: relative;
                top: 0.01rem;
              }
            }
          }
        }
      }
    }
  }
  .loading-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    height: 0.5rem;
    background-color: @background;
    .add {
      display: inline-block;
      line-height: 0.5rem;
      color: @themeColor1;
      border-top: 1px solid #f6f6f9;
    }
  }
}
</style>
