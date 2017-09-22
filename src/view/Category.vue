<template>
  <div class="page">
    <v-search class="bgwhite"></v-search>
    <div class="list">
      <ul class="list-l">
        <li :class="['l-item',{tabActive: selected==index }]" v-for="(i,index) in list" @click="tab(index)">{{i.name}}
        </li>
      </ul>
      <div class="list-r">
        <router-link class="r-item" v-for=" (v,index) in goodslist"
                     :to="{ name:'clist',query:{pid: list[selected].id,cid:v.id,title:v.name}}"
                     tag="div"
                     :key="index">
          <img :src="v.thumb | dGoods">
          <span>{{v.name}}</span>
        </router-link>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <v-tabbar></v-tabbar>
  </div>
</template>


<script>
  import vTabbar from '../components/mode/Tabbar'
  import vSearch from '../components/mode/search';
  import {Category, ProductDetail, Categorys} from '../api/api'
  import {mapMutations, mapGetters, mapState} from 'vuex'
  import dGoods from '../assets/images/dGoods.png'



  export default {
    data(){
      return {
        img1: require('../assets/images/home-01.jpg'),
        img2: require('../assets/images/home-02.jpg'),
        list: [
          {
            name:'混合'
          },
          {
            name:'混合'
          },
          {
            name:'混合'
          },
          {
            name:'混合'
          }
        ],  //左侧列表
        goodslist: [
          {
            name:'呵呵',
            id:1,
          },
          {
            name:'呵呵',
            id:1,
          },
          {
            name:'呵呵',
            id:1,
          },
          {
            name:'呵呵',
            id:1,
          }
        ], //右侧商品,
        selected: 0,
        find: ''
      }
    },
    methods: {
        tab(index){
          this.selected = index;
          this.goodslist = [];
          let _this = this;
          let params = {
            data: {
              pid: _this.list[index].id
            }
          }
          Category(params, (res) => {
            if (res.statusCode === 1) {
              _this.goodslist = res.data
            } else {
            }
          })

        },
        init(){
          let _this = this;
          let params = {
            data: {}
          }
          Category(params, (res) => {
            if (res.statusCode === 1) {
              console.log(res)
              _this.list = res.data;
              _this.tab(0)
            }
          })
        }
    },
    filters: {
      dGoods (value) {
        return value ? value : dGoods
      }
    },
    components: {
      vTabbar,
      vSearch,
    }
    ,
    mounted() {
      this.init()
    }



  }



</script>









<style lang="less" scoped>
  @import '../assets/css/reset/reset.css';
  @import '../assets/css/reset/common.less';
  @import '../assets/css/fonts/iconfont.css';
  .page {
  .page-view();
  }

  .search {
    width: 100%;
    height: .5rem;
    display: flex;
    padding: 0 .2rem;
    text-align: center;
  }

  .search > input {
    display: block;
    height: .4rem;
    flex: 3;
  }

  .find-btn {
    /*flex: 1;*/
    line-height: .4rem;
    color: red;
    width: .6rem;
  }

  .list {
    width: 100%;
    display: flex;
    /*height: 6.17rem;*/
    height: 100%;
    text-align: center;
    /*margin-top: .48rem;*/
    /*border-top: 1px solid red;*/
  }

  .list-l {
    flex: 1;
    height: 100%;
    background-color: #eee;
    /*border: 1px solid #eee;*/
    /*margin-top: -0.02rem;*/
    padding-left: 0;
    background: #fff;
  }

  .l-item {
    width: 100%;
    height: .4rem;
    font-size: .12rem;
    /*border: 1px solid #eee;*/
    line-height: .4rem;
    border-bottom: 1px solid #f8f8f8;
    color: #232327;

  }

  .list-r {
    flex: 3.8;
    height: 100%;
    background-color: rgb(243, 245, 247);
    padding: .1rem;
    justify-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

  }

  .list-r > div {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .r-item {
    display: block;
    /* width: .68rem;
     height: 1rem;*/
    width: .83156rem;
    height: .83156rem;
    /*border: 1px solid #2c3e50;*/
    padding: .05rem;
    margin: .05rem;
  }

  .r-item img {
    /*      width: 100%;
        height: .6rem;*/
    width: .55rem;
    height: .55rem;
  }

  .r-item span {
    font-size: .1rem;
    line-height: .31rem;
    display: block;

    height: .31rem;
    color: #686868;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tabActive {
    background-color: rgb(243, 245, 247);
  }

  .search {
    height: .5rem;
    display: flex;
    /*margin: .2rem 2%;*/
    width: 100%;
    z-index: 2;
    background-color: #eee;
    /*top: 1.35rem;*/
    padding: 0 2%;

  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    padding: 0 0.2rem;
    background: #fff;
    margin: .1rem 0;
  }

  .search div {
    background-color: #F5751D;
    display: block;
    height: .3rem;
    flex: .3;
    color: #fff;
    line-height: .3rem;
    margin: .1rem 0;
  }

</style>
