<template>
  <div class="page">
    <header class="header">
      <form @submit="goList()">
        <input type="text"  v-model="find" placeholder="请输入商品名称"/>
      </form>
      <div class="cancel" @click="cancel">取消</div>
    </header>
    <div class="container">
      <search-void>
      <ul v-if="resultlist.length">
          <li v-for="(v, k) in resultlist" :key="k" @click="goInfo(v.id)">
            {{v.title}}
          </li>
      </ul>
      </search-void>
    </div>

  </div>
</template>
<script>
    import searchVoid from './searchVoid'
  import {Search} from '../../api/api'
  import { mapMutations, mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    data(){
      return {
        find: '',
        resultlist:''
      }
    },
    methods: {
      goList(){}, //回车跳转
      cancel(){
        this.$router.go(-1)
      }, //取消搜索
      getSearch: _.debounce(function (value) {
        this.loading = false;
        let params = {
          data: {
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
        })

      }, 200),  //根据关键字搜索
      goInfo(v){
        this.find='';
        this.$router.replace({name:'details',query:{id:v}})
      },


    },
    watch: {
      find(newValue){
        this.getSearch(newValue)
      }
    },
    components: {
      searchVoid
    }




  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';
  .page {
    .page-view(1);
  }

  header {
    width: 100%;
    padding: 0 .08rem;
    display: flex;
    position: fixed;
    form {
      flex: 1;
      display: block;
      height: 100%;
      input {
        display: block;
        width: 100%;
        text-align: center;
        background: #e8e8e8;
        height: .29rem;
        font-size: .13rem;
        padding: 0 0.2rem;
        color: #333;
        margin: .08rem 0;
        border-radius: .1rem .1rem .1rem .1rem;
      }
    };
    .cancel {
      font-size: .16rem;
      text-align: right;
      padding: 0 .1rem;
      line-height: .45rem;
    }
  }
  .container {
    margin-top: .45rem;
    background: #ececec;
    .scroll-view(100%);
    ul {
      width: 100%;
      li {
        padding: .1rem .1rem .1rem .2rem;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        background: #fff;
        font-size: .13rem;
        text-align: left;
        span {
          color: #5f5f5f;
          font-size: .14rem;
          .text-overflow(1)
        }
      }
    }
  }



</style>
