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
      <li :class="{tabActive: selected==1 }" @click="selecttab(1,1)">
        <div class="title">所有伙伴</div>
        <div class="iconfont listicon">&#xe646;</div>
        <div>
          <span class="num">{{personnum.all}}</span><span class="yuan"> 人</span>
        </div>

      </li>
      <li :class="{tabActive: selected==2}" @click="selecttab(2,1)">
        <div class="title">已购买伙伴</div>
        <div class="iconfont listicon">&#xe600;</div>
        <div>
          <span class="num">{{personnum.purchased}}</span><span class="yuan"> 人</span>
        </div>
      </li>
      <li :class="{tabActive: selected==3 }" @click="selecttab(3,1)">
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

    <mt-loadmore :bottom-method="loadBottom" class="list-content" @bottom-status-change="handleBottomChange"
                 :autoFill="isTrue"
                 :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="p-list" v-if="personlist.length">
        <li class="p-cell" v-for="(i,index) in personlist" @click="popshow(index)">
          <!--<li class="p-cell" >-->
          <div class="logo">
            <img :src="i.avatar"/>
          </div>
          <div class="info">
            <h5>{{i.nickname}}</h5>
            <span>{{i.id}}</span>
            <span class="usertime">{{i.createtime}}关注</span>
          </div>
        </li>
      </ul>
      <div slot="bottom" class="mint-loadmore-bottom" style="text-align:center" v-show="allLoaded == false">
      <!--<div slot="bottom" class="mint-loadmore-bottom" style="text-align:center" v-show="allLoaded">-->
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">继续滚动，可加载更多</span>
        <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
      </div>
    </mt-loadmore>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" v-if="popupVisible">
      <div class="pop-up">
        <img class="sharelogo" :src="teamsinfo.avatar"/>
        <h5>{{teamsinfo.nickname}}</h5>
        <span>ID:{{teamsinfo.id}}</span>
      </div>
      <div class="pop-down">
        <ul>
          <li><span class="pop-left">粉丝：</span><span class="pop-right">{{teamsinfo.agentid}}</span></li>
          <li><span class="pop-left">关注方式：</span><span class="pop-right">{{teamsinfo.agentid}}</span></li>
          <li><span class="pop-left">等级：</span><span class="pop-right">{{teamsinfo.level.levelname}}</span></li>
          <li><span class="pop-left">消费金额：</span><span
            class="pop-right">{{teamsinfo.recordStatistics.c_money_sum}}</span></li>
          <li><span class="pop-left">手机号：</span><span class="pop-right">{{teamsinfo.mobile}}</span></li>
          <!--<li><span class="pop-left">创建时间： </span><span class="pop-right">{{teamsinfo.createtime}}</span></li>-->
        </ul>
      </div>
    </mt-popup>
    <div v-else class="tips">
      <span class="iconfont">&#xe612;</span>
      未找到伙伴<br>
    </div>
  </div>

</template>
<script>
  import {Popup, Picker, Toast} from 'mint-ui';

  //  import {TabContainer, TabContainerItem, Cell}  from 'mint-ui'
  import {teamsStatistics, teamsLists, teams} from '../../api/api.js'
  import {mapMutations, mapGetters} from 'vuex';
  export default{
    data () {
      return {
        active: 'tab-container1',
        selected: 1,
        find: '',
        popupVisible: false,
        personnum: {},
        personlist: [],
        myCurNo: 1,
        bottomAllLoaded: false,
        psizes: 10,
        bottomStatus: '',
        allLoaded: false,
        isTrue: false,
        onePage: false
      }
    },
    components: {
      'mt-popup': Popup
    },
    methods: {
      open(){
        this.popupVisible = true
      },
      selecttab(idx, page){
        let _this = this;
        this.selected = idx;
        if (page === 1) {
          this.personlist = [];
          this.allLoaded = false;
        }

        switch (idx) {
          case 1:
            let params = {
              data: {
                type: 'all',
                page: page,
                psize: this.psizes
              }
            }
            teamsLists(params, (res) => {
              if (res.statusCode == 1) {
                this.personlist = this.personlist.concat(res.data.lists);
                if (res.data.next === true) {
                  _this.allLoaded = false;
                }else{
                  _this.allLoaded = true;
                }
              } else {
                _this.allLoaded = true;
                console.log(`请求失败${res.statusCode} , ${res.data}`)
              }
            })
            break;
          case 2:
            params = {
              data: {
                type: 'agent',
                page: page,
                psize: this.psizes
              }
            }
            teamsLists(params, (res) => {
              if (res.statusCode == 1) {
                _this.personlist = _this.personlist.concat(res.data.lists);
                if (res.data.next === true) {
                  _this.allLoaded = false;
                }else{
                  _this.allLoaded = true;
                }
              } else {
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }
            })
            break;
          case 3:
            params = {
              data: {
                type: 'fans',
                page: page,
                psize: this.psizes
              }
            }
            teamsLists(params, (res) => {
                console.log(res)
              if (res.statusCode == 1) {
                _this.personlist = _this.personlist.concat(res.data.lists);
                if (res.data.next === true) {
                  _this.allLoaded = false;
                }else{
                  _this.allLoaded = true;
                }
              } else {
                _this.allLoaded = true;
                console.log('请求失败`${res.statusCode} , ${res.data}` ')
              }
            })
            break;
          case 4:
            if (this.find.length === 11) {
              var obj = {
                mobile: this.find
              }
            } else if (Number(this.find)) {
              var obj = {
                id: this.find
              }
            }else{
              Toast({
                message: '请属于正确的会员ID或会员手机号。',
                position: 'middle',
                duration: 2000
              });
            }
            params = {
              data: obj
            };

            teams(params, (res) => {
              if (res.statusCode === 1) {
                this.personlist = res.data;
                if (!this.personlist || this.personlist.length <= 1) {
                  this.searched = false

                } else {
                  let obji = []
                  obji.push(res.data)
                  this.personlist = obji
//                  console.log(this.personlist)
                }
              } else {
                Toast({
                  message: res.data,
                  position: 'middle',
                  duration: 2000
                });
              }
            })
            break;
          default:
            console.log('hehhe')

        }

      },
      popshow(index){
        let params = {
          data: {
            openid: this.personlist[index].openid,
          }
        }
        teams(params, (res) => {
          if (res.statusCode == 1) {
            this.teamsinfo = res.data;
//            console.log(this.teamsinfo)
            this.popupVisible = true
          }
        });

      },
      loadTop (){
//        this.selecttab(this.selected,1)
//        this.$refs.loadmore.onBottomLoaded();
      },
      loadBottom() {
        this.myCurNo += 1;
        this.selecttab(this.selected, this.myCurNo);
        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange(status) {
//        console.log(status);
        this.bottomStatus = status
      },

      search(){

        let mobilereg = /^1[3|4|5|7|8][0-9]{9}$/;
        let idreg = /^[0-9]*$/;

        if (mobilereg.test(!this.find) || idreg.test(this.find)) {
            this.searchnum(this.find);
            // console.log(Number(this.find))
            this.$router.push({name: `partnerlist4`}),
          this.selected = 4
          this.selecttab(4)

        } else {
          Toast({
            message: '请属于正确的会员ID或会员手机号。',
            position: 'middle',
            duration: 2000
          });
        }

      },
      ...mapMutations({
        'searchnum': 'SEARCHNUM',
      }),

    },
    created(){
      this.selected = this.tabselect;
      this.selecttab(this.tabselect, 1)
    },
    computed: {
      ...mapGetters([
        'tabselect',
      ])
    },

    mounted() {
      let params = {}
      teamsStatistics(params, (res) => {
        if (res.statusCode == 1) {
//          console.log(res);
          this.personnum = res.data
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

  .main, .main1 {
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
    margin-top: .4rem;
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
    background-color: #ececec;
  }

  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
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
    bottom: 0.05rem;
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
    height: .90rem;
    -webkit-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    -moz-box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    box-shadow: 0 1px 2px rgba(138, 138, 138, .4);
    display: flex;
    position: fixed;
    width: 100%;
    top: .45rem;
    z-index: 1;
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

  .nav-tab .li1:after, .nav-tab .li2:after, .nav-tab .li4:after, .nav-tab .li5:after {
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
    height: .5rem;
    display: flex;
    /*margin: .2rem 2%;*/
    width: 100%;

    position: fixed;
    z-index: 2;
    background-color: #eee;
    top: 1.3rem;
    padding: 0 2%;

  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    padding: 0 0.2rem;
    background: #fff;
    margin-top: .15rem;
  }

  .search div {
    background-color: #F5751D;
    display: block;
    height: .3rem;
    flex: .3;
    color: #fff;
    line-height: .3rem;
    margin-top: .15rem;
  }

  .mint-header {
    color: #252525 !important;
  }

  .nav-tab .tabActive {
    background-color: #f5751d;
    color: #fff;
  }

  .nav-tab .tabActive .title {
    color: #fff;
  }

  .tabActive .num, .tabActive .yuan {
    color: #fff;
  }

  /*修改样式哦*/
  .p-list {
    display: block;
    /*margin-bottom: .5rem;*/
    height: 4.68rem;
    overflow: hidden;
    overflow-y: scroll;

  }

  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    border-top: 1px solid #e2e2e2;
    background-color: #fff;
    margin-top: 0.05rem;
  }

  .logo {
    flex: 1;
  }

  .info {
    flex: 5;
    text-align: left;
    margin-left: 0.1rem;
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
    width: 80%;
    height:80%;
    border-radius: 50%;
    display: block;
    margin: 10% auto;
  }

  .usertime {
    position: absolute;
    right: 0;
    bottom: 0.05rem;
    font-size: 0.12rem;
  }

  .mint-popup {
    width: 2rem;
    padding: 0.1rem;
  }

  .pop-up img {
    width: 60%;
  }

  .pop-up h5 {
    font-size: 0.16rem;
  }

  .pop-up span {
    font-size: 0.12rem;
  }

  .pop-down ul {
    width: 100%;
    font-size: 0.1rem;
    color: #333;
    font-weight: 300;;
  }

  .pop-down li {
    display: block;
    text-align: left;
    padding-left: 0.1rem;
  }

  .pop-left {
    /*flex: 1;*/
  }

  .pop-right {
    /*flex: 3;*/
    text-align: right;
  }

  .mint-loadmore {
    position: absolute;
    top: 1.9rem;
  }

  .mint-loadmore {
    /*overflow-y: scroll;*/
    width: 100%;
    overflow: hidden;
  }


</style>
