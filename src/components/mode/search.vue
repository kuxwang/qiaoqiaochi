<template>
  <div class="main" :class="{'main-search':isfocus}">
    <div id="search" class="search" :class="{white : isfocus}" >
      <form @submit="goList()">
      <input type="text" :class="{'grey' : isfocus}" v-model="find" placeholder="请输入商品名称" @focus="getFocus()"/>
      </form>
      <div class="cancel" @click="cancel" v-if="isfocus">取消</div>
    </div>
    <div class="search-content grey" v-if="isfocus">
      <div id="list" class="list">
        <!--<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">-->
        <ul>
          <search-void>
            <li v-for="(v, k) in resultlist" :key="k" @click="goInfo(v.id)">
            <!--<router-link v-for="(v, k) in resultlist" :key="k" :to="{name:'storeinfo',query:{id:v.id}}" tag="li">-->
              {{v.storename}}
              <span>{{v.city}}{{v.area}}{{v.address}} </span>
            <!--</router-link>-->
            </li>
            <!--<p class="page-infinite-loading" v-if="loading&&isloading">-->
              <!--加载中...-->
            <!--</p>-->
          </search-void>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import searchVoid from './searchVoid'
  import {Search} from '../../api/api'
  import { mapMutations, mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    data () {
      return {
        find: '',
        isfocus: false,
        resultlist: [],
        loading: false,
        page: 1,
        isloading: false,
        pagesize:10
      }
    },
    props: [],
    methods: {
      goList(){
        if(this.$route.name=='store'){
          this.$emit('clickfn',this.find);
        } else {
          this.$router.push({name: 'store',query:{keywords:this.find}})
        }
      },

      goBack(){
        this.$router.go(-1)
      },
      getFocus () {
//          console.log(this.$route)
          if(this.$route.name=='store'){
              this.isfocus=false;
          }else {
            this.$emit('typechange1',1);
//            this.isfocus = true
//            this.setarealist(false);
//            this.setsearchlist(true)
//            console.log(this.isfocus);
//            console.log('active');
//            console.log(this.searchlist);
            setTimeout(() => {
              this.setHeight()
            }, 500)
          }

      },
      cancel () {
        this.isfocus = false
        this.find = ''
      },
      getGoods: _.debounce(function (value) {
        this.loading = false;
        /*let params = {
          data: {
//            page: this.page,
            page: 1,
            psize: 100,
            keywords: value,
            fields:'id,title'
          }
        }
        Search(params, res => {
          if (res.statusCode === 1) {
            this.resultlist = res.data
          } else if (res.statusCode === -1) {
            this.resultlist = []
          }
        })*/

        let params = {
          data: {
            keyword: this.find,
            page: 1,
            pagesize: this.pagesize,
            lat: this.addressInfo.lat,
            lng: this.addressInfo.lng
          }
        }
        Merchants (params,res => {
          if (res.statusCode === 1) {
            this.resultlist = res.data
          } else if (res.statusCode === -1) {
            this.resultlist = []
          }
        })





      }, 700),
      loadMore () {
        this.loading = true;
//        let params = {
//          data: {
//            page: ++this.page,
//            psize: 15,
//            keywords: this.find,
//          }
//        }
        let params = {
          data: {
            keyword: this.find,
            page: 1,
            pagesize: this.pagesize,
            lat: this.addressInfo.lat,
            lng: this.addressInfo.lng
          }
        }
        Merchants(params, res => {
          if (res.statusCode === 1) {
            if (res.data.length > 0) {
              this.resultlist = this.resultlist.concat(res.data);
              setTimeout(() => {
                this.loading = false;
              }, 1000)
            } else {
              this.isloading = false;
              this.loading = true;
            }
          } else {
            this.isloading = false;
            this.loading = true;
          }
        })

      },
      setHeight () {
        let maindom = document.getElementById('list');
        let topdomheight = document.getElementById('search').clientHeight;
        let bodydomheight = document.body.clientHeight
        maindom.style.height = (bodydomheight - topdomheight) + 'px'
      },
      goInfo(v){
        this.isfocus=false;
        this.find=''
        this.$router.push({name:'storeinfo',query:{id:v}})
      },
      ...mapMutations({
       /* addressInfo: 'ADDRESSINFO',
        setsearchlist:'SEARCHLIST',
        setarealist:'AREALIST'*/
      }),
    },
    watch: {
      find (newValue) {
        this.getGoods(newValue)
      },
      loading(newValue){
//        console.log(newValue)
      }
    },
    components: {
      searchVoid
    },
    created(){
    },
    mounted () {
//      this.setHeight()
    },
    computed: {
      ...mapGetters([
        'searchlist',
        'addressInfo'
      ]),
    }
  }
</script>
<style lang="less" scoped>
  /*@import '../assets/css/reset/reset.css';*/
  @import '../../assets/css/reset/common.less';
  .main {
    /*position: fixed;*/
    /*width: 100%;*/
    background: transparent;
    z-index: 1;

  }

  .main-search {
    height: 100%;
    background: rgb(240, 242, 245);
  }

  .search {
    /*position: absolute;*/
    font-size: .14rem;
    height: .45rem;
    display: flex;
    width: 100%;
    z-index: 3;
    padding: 0 2%;
    /*background: url('../../assets/images/topbg.png') center center no-repeat;*/
    /*background-color: #eee;*/
    background-size: 100% 100%;
    -webkit-box-shadow: 0 1px 4px rgba(138, 138, 138, .3);
    -moz-box-shadow: 0 1px 4px rgba(138, 138, 138, .3);
    box-shadow: 0 1px 4px rgba(138, 138, 138, .3);
  }

  .white {
    /*background: rgb(255, 255, 255) !important;*/
    /*background-color: ;*/
  }

  .grey {
    background: rgb(240, 242, 245) !important;
  }

  .search input {
    border: none;
    display: block;
    height: .3rem;

    font-size: .13rem;
    padding: 0 0.2rem;
    color: #333;
    background: rgba(255, 255, 255, .7);
    margin: .08rem 0;
    border-radius: .1rem .1rem .1rem .1rem;
  }
  .search form {
    flex: 1;
  }

  .cancel {
    font-size: .16rem;
    text-align: right;
    padding: 0 .1rem;
    line-height: .45rem;
  }

  .search-content {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin-top: .45rem;
    text-align: left;
    /*background: #fff;*/
    z-index: 1;
    -webkit-overflow-scrolling: touch;
  }

  .list {
    margin-top: .1rem;
    overflow: scroll;
  }

  .list li {
    padding: .1rem .1rem .1rem .2rem;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #fff;
  }
  .list li span {
    color: #5f5f5f;
    font-size: .14rem;
    .text-overflow(1)
  }
  .search form {
    width: 100%;
  }
  form input {
    width: 100%;
  }

</style>
