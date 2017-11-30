<template>
  <div class="main">
    <section>
      <mt-header fixed title="我的收藏">
        <router-link :to="{name:'userCenter'}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" class="header-right" @click="clearList">清空</mt-button>
        <mt-button slot="right" class="header-right" @click="edit()">编辑</mt-button>
      </mt-header>
    </section>
    <section class="mt-main">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <!--<router-link class="li—laber clearfix" :to="{name:'details',query:{id:1}}" tag="li">-->
        <li class="li—laber-selected clearfix" @click="selected(v)" v-if="isEdit" v-for="(v, i) in resultArr" :key="i">
          <label class="mint-checklist-label">
            <!--<span class="mint-checkbox">-->
            <input type="checkbox" class="mint-checkbox-input input-box" :data-idx="v.id">
            <span class="mint-checkbox-core"></span>
            <!--</span>-->
          </label>
          <div class="info">
            <img :src="getdefaluteimage(v.thumb)" alt="这是一个商品" />
            <div class="li-content-edit">
              <p class="title lr2">{{v.title}}</p>
              <p class="price">
                ¥
                <span class="goods-intPrice">{{v.marketprice | calculatePrice1}}.</span>
                <span class="goods-folatPrice">{{v.marketprice | calculatePrice2}}</span>
                <span class="goods-intPrice oldprice">¥{{v.marketprice | calculatePrice1}}.{{v.marketprice | calculatePrice2}}</span>
              </p>
            </div>
          </div>
        </li>
        <!-- <div class="bottomtools" v-if="isEdit">
          <div @click="selectAll">
            <label class="mint-checklist-label fl">
              <input id="allselect" type="checkbox" class="mint-checkbox-input">
              <span class="mint-checkbox-core"></span>
              全选
            </label>
          </div>
          <div @click="deletedata">删除</div>
        </div> -->
        <div class="newlyAdded" @click="deletedata" v-if="isEdit">
          删除
        </div>

        <router-link class="li—laber clearfix" :to="{name:'cdetails',query:{id:v.id}}" tag="li" v-if="!isEdit" v-for="(v, i) in resultArr" :key="i">
          <img :src="getdefaluteimage(v.thumb)" alt="这是一个商品" />
          <div class="li-content">
            <p class="title lr2">{{v.title}}</p>
            <p class="price">
              ¥
              <span class="goods-intPrice">{{v.marketprice | calculatePrice1}}.</span>
              <span class="goods-folatPrice">{{v.marketprice | calculatePrice2}}</span>

              <span class="goods-intPrice oldprice">¥{{v.marketprice | calculatePrice1}}.{{v.marketprice | calculatePrice2}}</span>

              <div class="find iconfont">&#xe728;</div>
            </p>
          </div>
        </router-link>
      </ul>
      <div class="nogoods" v-show="isShow">
        <div class="nogoods-tp">
          <img src="../../../assets/images/gwc.png">
        </div>
        <p class="nogoods-mid">
          <h3>没有添加商品</h3>
          <h4>收藏夹快饿扁了，快去喂它吧~</h4>
        </p>
      </div>
    </section>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { Toast, MessageBox, InfiniteScroll } from "mint-ui";
import { mapMutations } from "Vuex";
import {
  History,
  Deletehistory,
  Favorites,
  Favorite_remove
} from "../../../api/api";
export default {
  data() {
    return {
      marketprice: "",
      test1: "",
      isChecked: 0,
      isEdit: false,
      resultArr: [],
      page: 1,
      loading: true,
      isShow: true,
      psizes: 10,
      isAll: []
    };
  },
  watch: {
    resultArr(value) {
      if (value.length > 0) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  methods: {
    ...mapMutations([]),
    getdefaluteimage(value) {
      return value || defalutImage;
    },
    selected(v) {
      console.log(v);
    },
    edit() {
      if (this.resultArr.length) {
        this.isEdit = !this.isEdit;
      } else {
        Toast({
          message: `暂无收藏`,
          position: "middle",
          duration: 2000
        });
      }
    },
    selectAll() {
      let inputArr = document.getElementsByClassName("input-box");
      let allselect = document.getElementById("allselect").checked;
      if (!allselect) {
        for (let i = 0, j = inputArr.length; i < j; i++) {
          inputArr[i].checked = false;
        }
      } else {
        for (let i = 0, j = inputArr.length; i < j; i++) {
          inputArr[i].checked = true;
        }
      }
    },
    deletedata() {
      let inputArr = document.getElementsByClassName("input-box");
      let inputselect = "";
      for (let i = 0, j = inputArr.length; i < j; i++) {
        if (inputArr[i].checked) {
          let idx = inputArr[i].attributes["data-idx"].nodeValue;
          if (inputselect) {
            inputselect = inputselect + "," + idx;
          } else {
            inputselect = idx;
          }
        }
      }
      let params = {
        data: {
          goodsid: inputselect
        }
      };
      Favorite_remove(params, res => {
        if (res.statusCode == 1) {
          this.page = 1;

          let params = {
            data: {
              page: this.page,
              psize: this.psizes,
              fields: "id,thumb,title,productprice,marketprice"
            }
          };
          Favorites(params, res => {
            if (res.statusCode == 1) {
              if (res.data.length > 0) {
                this.resultArr = res.data;
                this.isEdit = false;
                // Toast("刷新");
                setTimeout(() => {
                  this.loading = false;
                }, 1000);
              } else {
                this.resultArr = [];
                this.loading = true;
                this.isEdit=false;
              }
            } else {
              this.loading = true;
            }
          });
        }
      });
      console.log(inputselect);
    },
    clearList() {
      MessageBox({
        title: "提示",
        message: "是否全部清空",
        showCancelButton: true
      }).then(res => {
        if (res == "confirm") {
          let params = {
            data: {
              clearall: 1
            }
          };
          Favorite_remove(params, res => {
            if (res.statusCode) {
              this.resultArr = [];
            }
          });
        }
      });
    },
    loadMore() {
      this.page = this.page + 1;

      let params = {
        data: {
          page: this.page,
          psize: this.psizes,
          fields: "id,thumb,title,productprice,marketprice"
        }
      };
      Favorites(params, res => {
        if (res.statusCode === 1) {
          this.resultArr = this.resultArr.concat(res.data);
          if (res.data.length < this.psizes) {
            this.loading = true;
          }
        } else {
          this.loading = true;
          console.log("请求失败`${res.statusCode} , ${res.data}` ");
        }
      });
    }
  },
  mounted() {
    let params = {
      data: {
        page: this.page,
        psize: this.psizes,
        fields: "id,thumb,title,productprice,marketprice"
      }
    };
    Favorites(params, res => {
      if (res.statusCode == 1) {
        this.loading = false;
        if (res.data.length > 0) {
          this.resultArr = res.data;
          if (res.data.length < this.psizes) {
            this.loading = true;
          }
        } else {
          this.loading = true;
        }
      } else {
        this.loading = true;
      }
    });
  },
  filters: {
    calculatePrice1(value) {
      let num = "";
      if (typeof value === "number") {
        num = Math.floor(value) || 0;
      } else if (typeof value === "string") {
        num = Math.floor(Number(value)) || 0;
      }
      return num || 0;
    },
    calculatePrice2(value) {
      let num = "";
      if (typeof value == "number") {
        num = value
          .toFixed(2)
          .toString()
          .split(".")[1];
      }
      if (typeof value == "string") {
        num = value.split(".")[1];
      }
      return num.length == 0
        ? num + "00"
        : num.length == 1 ? num + "0" : num || "00";
    }
    // listimages (value) {
    //   return value ? value : this.defaultIcon
    // },
  }
};
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
  overflow: hidden;
  z-index: 10;
}

.mt-main {
  position: absolute;
  top: 0;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  background: @background;
}

.mt-main > ul {
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
  /*overflow-y: scroll;*/
}

.mt-main li {
  width: 100%;
  height: 1.1rem;
  background: #fff;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 0rem 0.1rem;
}

.mt-main > ul img {
  width: 0.9rem;
  height: 0.9rem; // padding: .1rem;
  // float: left;
}

.li-content {
  position: relative;
  width: 63%;
  height: 1rem;
  float: left;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.li-content-edit {
  position: relative;
  width: 63%;
  height: 1rem;
  float: left;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.li—laber {
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.li—laber-selected {
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
}

.title {
  font-size: 0.13rem;
  text-align: left;
  line-height: 0.2rem;
}

.oldprice {
  font-size: 0.1rem;
  text-align: left;
  margin-left: 0.1rem;
  margin-top: 0.05rem;
  bottom: 0.3rem;
  color: #777777;
  text-decoration: line-through;
}

.oldprice .goods-intPrice {
  font-size: 0.12rem;
}

.oldprice .goods-folatPrice {
}

.price {
  position: absolute;
  text-align: left;
  // margin-top: .05rem;
  bottom: 0.05rem;
  color: red;
}

.info {
  // width: 90%;
  // float: right;
  // display: flex;
  // align-items: center;
  flex: 1;
  display: flex;
  align-items: center;
  // justify-content: space-between;
}

.goods-intPrice {
  font-size: 0.12rem;
}

.goods-folatPrice {
  font-size: 0.12rem;
}

.header-right {
  font-size: 0.15rem;
  /*color: rgb(120, 120, 120);*/
  // color: #ffffff;
}

.bottomtools {
  width: 100%;
  height: 0.45rem;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.bottomtools > div:first-child {
  width: 50%;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.18rem;
}
.bottomtools > div:last-child {
  width: 1.1rem;
  height: 0.45rem;
  line-height: 0.45rem;
  background: #f5751d;
  font-size: 0.16rem;
  color: #fff;
}

.bottomtools .mint-checkbox-core {
  margin-top: 0;
}

.bottomtools .mint-checklist-label {
  width: 50%;
}

.mint-checklist-label {
  position: absolute;
  width: 100%;
  height: 1.2rem;
  text-align: left;
  /*margin-top: .45rem;*/
}

.mint-checkbox-core {
  // margin-top: .45rem;
}

.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #f5751d;
  border-color: #f5751d;
  vertical-align: middle;
}

.nogoods {
  margin-top: 1.5rem;
}

.nogoods-tp {
  width: 1.1rem;
  height: 1.1rem;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.nogoods-tp img {
  display: block;
  width: 100%;
}

.nogoods h3 {
  color: #666;
  font-size: 0.16rem;
  text-align: center;
}

.nogoods h4 {
  color: #999;
  font-size: 0.14rem;
  margin-top: 0.2rem;
  text-align: center;
}

.nogoods-mid {
  margin-top: 0.2rem;
  font-size: 0.14em;
  color: #666;
}

.find {
  position: absolute;
  right: 0.15rem;
  top: 0.9rem;
  /*margin-left:.15rem;*/
  font-size: 0.12rem;
  padding: 0 0.05rem;
  display: inline-block;
  /*border: 1px solid rgba(0, 0, 0, .1);*/
  /*-webkit-border-radius:;*/
  /*-moz-border-radius:;*/
  border-radius: 0.03rem;
  display: none;
}

.li—laber-selected .mint-checklist-label {
  display: flex;
  align-items: center;
}

.newlyAdded {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.16rem;
  margin: 0 auto;
  background: @themeColor1;
  color: #fff;
  margin-top: 0.4rem;
}
</style>

