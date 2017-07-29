<template>
  <div class="mian1">
    <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">-->
    <ul class="p-list" >
      <li class="p-cell" v-for="i in personlist.lists">
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
    <!--</mt-loadmore>-->
  </div>
</template>

<script>
  import { Loadmore } from  'mint-ui';
  import { teamsLists } from '../../api/api.js'
  import {mapMutations, mapGetters} from 'vuex';
  export default{
    data(){
      return {
        thumb:require('../../assets/images/userinfo-02.png'),
        personlist:{}
      }
    },
    components: {

    },
    methods: {
      loadTop(){

      },
      loadButtom(){

      },
      allLoaded(){

      }
    },
    mounted(){
      let params={
        data: {
          type:'agent',
          page:1,
          psize:10
        }
      }
      teamsLists(params,(res)=>{
        if(res.statusCode==1){
          this.personlist=res.data;
          console.log(res)
          console.log(this.personlist)
        }else {
          console.log('请求失败')
        }


      })
    },

  }
</script>


<style scoped>
  .p-list {
    display: block;
    margin-bottom: .5rem;
    height: 4.68rem;
    overflow: hidden;
    overflow-y: scroll;

  }
  .p-cell {
    display: flex;
    height: 0.78rem;
    padding: 0.1rem 0.2rem;
    border-top:1px solid #e2e2e2;
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
    border-radius: 50%;
    display: block;
    margin: 10% auto;
  }
  .mian1 {
    position: fixed;
    top: 2.05rem;
    width: 100%;
    /*height: 100%;*/
    background: #eee;
    z-index: 10;
  }
  .usertime {
    position: absolute;
    right: 0;
    bottom:0.05rem;
    font-size: 0.12rem;
  }
</style>
