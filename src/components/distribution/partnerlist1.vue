<template>
  <div class="mian1">
      <ul class="p-list" >
        <li class="p-cell" v-for="(i,index) in personlist.lists" @click="popshow(index)">
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
          <li><span class="pop-left">消费金额：</span><span class="pop-right">{{teamsinfo.recordStatistics.c_money_sum}}</span></li>
          <li><span class="pop-left">手机号：</span><span class="pop-right">{{teamsinfo.mobile}}</span></li>
          <!--<li><span class="pop-left">创建时间： </span><span class="pop-right">{{teamsinfo.createtime}}</span></li>-->
        </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Loadmore,Popup, Picker } from  'mint-ui';
  import { teamsLists,teams } from '../../api/api.js'
  import {mapMutations, mapGetters} from 'vuex';
  export default{
      data(){
          return {
            thumb:require('../../assets/images/userinfo-02.png'),
            personlist:{},
            popupVisible:false,
            teamsinfo:{

            }
        }
      },
      components: {
        'mt-popup':Popup
      },
      methods: {
          loadTop(){

          },
          loadButtom(){

          },
          allLoaded(){

          },
        popshow(index){
              let params={
                  data: {
                      openid:this.personlist.lists[index].openid,
//                     id:this.personlist.lists[index].id,
//                     mobile:this.personlist.lists[index].mobile
                  }
              }
          teams(params,(res)=>{
             if(res.statusCode==1){
               this.teamsinfo=res.data;
               console.log(this.teamsinfo)
               this.popupVisible=true
             }
          })
        }
      },
    mounted(){
      let params={
        data: {
          type:'all',
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
  .mint-popup {
    width: 2rem;
    padding: 0.1rem;
  }
  .pop-up img{
    width: 60%;
  }
  .pop-up h5 {
    font-size: 0.14rem;
  }
  .pop-up span {
    font-size: 0.12rem;
  }

  .pop-down ul {
    width: 100%;
    font-size: 0.12rem;
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

</style>
