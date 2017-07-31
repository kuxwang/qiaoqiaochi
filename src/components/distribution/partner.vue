<template>
  <div class="main">
    <section>
      <mt-header fixed title="我的伙伴" style="z-index: 3">
        <router-link to="/vipCenter" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </section>
    <section class="top">
    </section>

    <ul class="nav-tab">
      <!--<router-link to="/partner1" tag="li">-->
        <li :class="{tabActive: selected==1 }" @click="selecttab(1)">
        <div class="title">所有伙伴</div>
        <div class="iconfont listicon">&#xe646;</div>
        <div>
          <span class="num">{{personnum.all}}</span><span class="yuan"> 人</span>
        </div>
      <!--</router-link>-->
      <!--<router-link to="/partner2" tag="li">-->
        </li>
        <li :class="{tabActive: selected==2}" @click="selecttab(2)">
        <div class="title">已购买伙伴</div>
        <div class="iconfont listicon">&#xe600;</div>
        <div>
          <span class="num">{{personnum.purchased}}</span><span class="yuan"> 人</span>
        </div>
      <!--</router-link>
      <router-link to="/partner3" tag="li">-->
        </li>
      <li :class="{tabActive: selected==3 }" @click="selecttab(3)">
        <div class="title">未购买伙伴</div>
        <div class="iconfont listicon">&#xe60d;</div>
        <div>
          <span class="num">{{personnum.no_purchased}}</span><span class="yuan"> 人</span>
        </div>
      <!--</router-link>-->
      </li>
    </ul>
    <div class="search">
      <input type="text" results="1" v-model="find" placeholder="输入手机号、粉丝ID"/>
      <div @click="search">搜索</div>
    </div>

    <!--<transition name="slide">-->
      <router-view></router-view>
    <!--</transition>-->



  </div>

</template>
<script>
  import {Popup, Picker} from 'mint-ui';
  //  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  import {teamsStatistics} from '../../api/api.js'
  import {mapMutations, mapGetters} from 'vuex';
  export default{
    data () {
      return {
        active:'tab-container1',
        selected: 1,
        find:'',
        popupVisible:false,
        personnum:{}
      }
    },
    components: {
//      'mt-cell': Cell,
//      'mt-tab-container': TabContainer,
//      'mt-tab-container-item': TabContainerItem,
    },
    methods: {
        open(){
            this.popupVisible=true
        },
      selecttab(idx){
        this.selected = idx;
        this.$router.push({name: `partnerlist${idx}`})
      },
      search(){
          let mobilereg=/^1[3|4|5|7|8][0-9]{9}$/;
          let idreg=/^[0-9]*$/;
     /*     console.log(mobilereg.test(this.find))
          console.log(idreg.test(this.find))*/
          if(mobilereg.test(!this.find) || idreg.test(this.find)){
            this.searchnum(this.find);
            console.log(Number(this.find))
            this.$router.push({name: `partnerlist4`}),
              this.selected=4

          }else {

          }

      },
      ...mapMutations({
        'searchnum' : 'SEARCHNUM',

      }),

    },
    computed:{
    ...mapGetters([
        'tabselect',
      ])
    },
    created(){
      this.selected = this.tabselect;
      console.log(this.selected)
    },
    mounted() {
        let params={

        }
      teamsStatistics(params,(res)=>{
          if(res.statusCode==1){
              console.log(res);
              this.personnum=res.data
          }
      })


    }




  }

</script>
<style scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/reset/reset.css';

  * {
    font-size: .16rem;
  }

  .main,.main1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ececec;
    overflow: auto;
    z-index: 3;
  }
  .mint-header {
    border-bottom: 0;
    color: #fff;
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
    height: 0rem;
    /*background: #fff;*/
    margin-top:.4rem;
    background: rgb(244, 127, 47);
    -webkit-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
    box-shadow: 0 2px 8px rgba(138, 138, 138, .4);
  }

  .top > div {
    position: relative;
    width: 50%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    float: left;
  }

  .top > div > span {
    line-height: .32rem;
    /*color: red;*/
    color: #fff;
  }

  .top .title {
    display: block;
    height: .25rem;
    font-size: .14rem;
    /*color: #666;*/
    color: #fff;
  }

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

  .content {
    margin-bottom: .6rem;
  }

  .content .mfriend {
    margin-top: .05rem;
    text-align: left;
    color: rgba(0, 0, 0, .7);
    background-color: #fff;
    padding: .1rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .content ul {
    /*margin-top: .1rem;*/
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
  }

  .content .tuiguang {
    height: 1.8rem;
  }

  .content li {
    position: relative;
    display: block;
    width: 33.3%;
    height: .90rem;
    float: left;
    background-color: #fff;
    padding: .1rem .2rem;
  }

  .content .li1:after, .content .li2:after, .content .li4:after, .content .li5:after {
    content: '';
    position: absolute;
    right: 0;
    top: .14rem;
    width: 1px;
    height: 70%;
    background-color: rgba(0, 0, 0, .1);
  }

  .content .li4, .content .li5, .content .li6 {
    border-top: 1px solid rgba(0, 0, 0, .2)
  }

  .content .title {
    color: rgba(0, 0, 0, .5);
    font-size: .14rem;
    line-height: .2rem;
  }

  .content .iconfont {
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

  .details {
    margin-top: .1rem;
  }

  .details li {
    margin-top: .04rem;
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
    /*border-top: 1px solid rgba(0, 0, 0, .3)*/
  }
  .list-type {
    height: 0.4rem;
    border-bottom: 1px solid #e2e2e2;
    text-align: left;
    padding: 0.05rem 0.2rem;
    line-height: 0.3rem;

  }
  .list-type .num-right {
    float: right;
  }
  .p-list {
    display: block;
    background-color: #fff;
  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border-top:1px solid #e2e2e2;
    border-bottom:1px solid #e2e2e2;
  }
  .logo {

    width: 0.58rem;
    height: 0.58rem;
  }
  .info {
    flex: 1;
    text-align: left;
    margin-left: 0.2rem;
    position: relative;
  }
  .info h5 {
    margin-top: 0.1rem;
    color: #27272f;
    font-size: 0.14rem;

  }
  .info span {
    font-size: 0.14rem;
    color: #666;
  }
  .logo img {
    width: 100%;
    border-radius: 50%;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color: #F5751D;
    border-bottom: none;
  }
  .mint-tab-container-item {
    overflow: hidden;
    overflow-y: scroll;
    height: 4.2rem;
  }
  .iconfont {
    display: inline-block;
    margin-right: 0.05rem;
    font-size: 0.2rem;
  }
  .usertime {
    position: absolute;
    right: 0;
    bottom:0.05rem;
    font-size: 0.12rem;
  }
  .partner-type {
    background: #fff;
    color: #666;
    margin-top: 0.5rem;
  }
  .mint-navbar .mint-tab-item {
    padding: 0.1rem 0;
    font-size: 0.2rem;
    border-right: 1px solid #e2e2e2;
  }
  .mint-navbar {
    margin: 0.05rem 0;
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
    background: #fff;
  }
  .search div {
    background-color: #F5751D;
    display: block;
    height: 100%;
    flex: .3;
    color: #fff;
  }
  .mint-header {
    color: #252525 !important;
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
