<template>
  <div class="main">
    <section>
      <mt-header fixed title="推广订单" >
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>

      </mt-header>
    </section>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <ul class="nav-tab">
      <li :class="{tabActive: selected==1 }" @click="selecttab(1)">
      <!--<router-link @click="selecttab(1)" to="/extension1" tag="li" :class="{tabActive: selected==1 }"  >-->
        <div class="title">全部{{selected}}</div>
        <div class="iconfont listicon">&#xe624;</div>
        <div>
          <span class="num">1</span><span class="yuan"> 单</span>
        </div>
      <!--</router-link>-->
      </li>
      <li :class="{tabActive: selected==2 }" @click="selecttab(2)">
      <!--<router-link @click="selecttab(2)" to="/extension2" tag="li" :class="{tabActive: selected==2 }" >-->
        <div class="title">未结算</div>
        <div class="iconfont listicon">&#xe624;</div>
        <div>
          <span class="num">1</span><span class="yuan"> 单</span>
        </div>
      <!--</router-link>-->
      <!--</li>-->
      <!--<router-link  @click="selecttab(3)" to="/extension3" tag="li" :class="{tabActive: selected==3 }">-->
      </li>
      <li :class="{tabActive: selected==3 }" @click="selecttab(3)">
        <!--<li class="li2">-->
        <div class="title">已退款</div>
        <div class="iconfont listicon">&#xe8b5;</div>
        <div>
          <span class="num">1</span><span class="yuan"> 单</span>
        </div>
        </li>
      <!--</router-link>-->

      <li :class="{tabActive: selected==4 }" @click="selecttab(4)">
      <!--<router-link to="/extension4" tag="li" :class="{tabActive: selected==4 }" @click="selecttab(4)">-->
        <!--<li class="li3">-->
        <div class="title">已结算</div>
        <div class="iconfont listicon">&#xe619;</div>
        <div>
          <span class="num">1</span><span class="yuan"> 单</span>
        </div>
        </li>
      <!--</router-link>-->
    </ul>


    <div class="search">
      <input type="search" results="1" v-model="find" placeholder="输入订单号、粉丝ID"/>
      <button>搜索</button>
    </div>


      <router-view></router-view>



  </div>

</template>
<script>
  import MtCell from "../../../node_modules/mint-ui/packages/cell/src/cell";
//  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  import { Search } from 'mint-ui';
  import {mapMutations, mapGetters} from 'vuex';
  export default{
    data () {
      return {
        active:'tab-container1',
        selected: 1,
        find:''
      }
    },
    components: {
      mtSearch:Search

    },
    methods: {
      selecttab(idx){
        this.selected = idx;
        this.$router.push({name: `extension${idx}`})
      },


    },
    created(){
      this.selected=this.tabselect
    },
    computed:{
    ...mapGetters([
        'tabselect',
      ]),
    }
  }
</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }
  .mint-header {
    border-bottom: 0;
    color: #fff;
  }

  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;

  }

  .avatar {
    position: relative;
    top: 0;
    left: 0;
    margin-top: .4rem;
    height: 1rem;
    padding: .15rem;
    color: #fff;
    background-color: #f47f2f;
  }

  .icon {
    width: .70rem;
    height: .70rem;
    background: grey;
    float: left;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .message {
    width: 78%;
    height: 100%;
    float: left;
  }

  .message div {
    width: 100%;
    height: 33%;
  }

  .message > div > span {
    display: block;
    max-width: 100%;
    height: 100%;
    float: left;
    font-size: .14rem;
    line-height: .23rem;
    padding: 0 0 0 10px;
  }

  .message > span {
    font-size: .14rem;
    float: left;
    display: block;
    padding: 0 0 0 10px;
  }

  .avatar > .right {
    position: absolute;
    top: .4rem;
    right: .2rem;
  }

  .top {
    /*height: .64rem;*/
    /*background: #fff;*/
    margin-top:.4rem;
    background: rgb(244, 127, 47);
    -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    /*display: flex;*/
  }
/*

  .top > div {
    position: relative;
    !*width: 50%;*!
    height: 100%;
    background: rgba(0, 0, 0, .2);
    !*float: left;*!
    flex: 1;
  }

  .top > div > span {
    line-height: .32rem;
    !*color: red;*!
    color: #fff;
  }

  .top .title {
    display: block;
    height: .25rem;
    font-size: .14rem;
    !*color: #666;*!
    color: #fff;
  }
*/

  .yuan {
    color: red;
    font-size: .10rem;
  }

  .num {
    color: red;
    font-size: .18rem;
  }

  .top_1:after {
    content: '';
    position: absolute;
    right: 0;
    top: .1rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }


  .details li {
    margin-top: .04rem;
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
  }
  .p-list {
    display: block;
    background-color: #fff;

  }
  .p-cell {
    display: flex;
    flex-direction: column;
    padding:  0;
    margin-top: 0.05rem;
    background-color: #fff;
    border-top:1px solid #e2e2e2;
  }
  .up {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    padding: 0 0.1rem;
    line-height: 0.32rem;

  }

.up .time {
  float: right;
  font-size: 0.12rem;

}

  .down {
    flex: 2.5;
    height: 0.68rem;
    display: flex;
    padding: 0 0.1rem;
  }
  .logo {
    flex: 1;
    padding: 0.1rem 0;
  }
  .info {
    flex: 4;
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.05rem 0;
    color: #666;
  }
  .info h5 {
    margin: 0.05rem 0;
    color: #666;
  }
  .info span {
    color: #000;
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
    vertical-align: middle;
    display: block;
  }
  .ordertype {
    flex: 3;
    padding: 0.05rem 0;
    color: #666;
  }
  .ordertype span {
    display: block;
    text-align: right;
    font-size: 0.14rem;
    margin-top: 0.05rem;
  }
  .ordertype span:last-child {
    margin-top: 0.1rem;
  }
  .mint-tab-container-item {
    overflow: hidden;
    overflow-y: scroll;
    height: 4.8rem;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: #F5751D;

  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom:2px solid #F5751D;
  }

  .nav-tab {
    margin-top: .5rem;
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    display: flex;
  }


  .nav-tab li {
    position: relative;
    display: block;
    /*width: 33.3%;*/
    height: .90rem;
    /*float: left*/
    background-color: #fff;
    padding: .1rem .2rem;
    flex: 1;
  }

  .nav-tab .li1:after, .nav-tab .li2:after,.nav-tab .li4:after, .nav-tab .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .nav-tab .li4, .content .li5, .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .nav-tab .title {
    color: rgba(0, 0, 0, .5);
    font-size: .14rem;
    line-height: .2rem;
  }

  .nav-tab .iconfont {
    width: .28rem;
    height: .30rem;
    margin-left: auto;
    margin-right: auto;
    font-size: .20rem;
    /*border: 1px solid #F5751D;*/
    line-height: .3rem;
    /*color: #F5751D;*/
    border-radius: 50%;
  }
  .search {
    height: .3rem;
    display: flex;
    margin: .2rem 2% ;
    width: 96%;
  }
  .search input {
    border: none;
    display: block;
    height: 100%;
    flex: 1;
    padding: 0 0.2rem;
  }
  .search button {
    background-color: #F5751D;
    display: block;
    height: 100%;
    flex: .3;
    color: #fff;
  }
  .mint-header {
    color: #252522 !important;
  }
  .nav-tab .tabActive{
    background-color: #f5751d;
    color: #fff;
  }
  .nav-tab .tabActive .title {
    color: #fff;
  }
  .tabActive .num,.tabActive .yuan {
    color: #fff;
  }
</style>
