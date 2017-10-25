<template>
  <div class="comment">
    <ul>
      <li v-for="(i,index) in list">
        <div class="title">
          <div class="user">
          <div class="logo">
            <img :src="i.headimgurl" />
          </div>
          <div class="name">{{i.nickname}}</div>
          </div>
          <div class="star">
            <div class="star_item" v-for="(s,idx) in 5">
              <img :src="star" v-if="i.level >= idx+1">
              <img :src="stars" v-if="i.level <= idx">
            </div>
          </div>
        </div>
        <div class="text">
          奥术大师大所大
        </div>
        <div class="time">
          2017-10-18
        </div>
      </li>
      <li v-for="(i,index) in list">
        <div class="title">
          <div class="user">
            <div class="logo">
              <img :src="i.headimgurl" />
            </div>
            <div class="name">{{i.nickname}}</div>
          </div>
          <div class="star">
            <div class="star_item" v-for="(s,idx) in 5">
              <img :src="star" v-if="i.level >= idx+1">
              <img :src="stars" v-if="i.level <= idx">
            </div>
          </div>
        </div>
        <div class="text">
          奥术大师大所大
        </div>
        <div class="time">
          2017-10-18
        </div>
      </li>
      <li v-for="(i,index) in list">
        <div class="title">
          <div class="user">
            <div class="logo">
              <img :src="i.headimgurl" />
            </div>
            <div class="name">{{i.nickname}}</div>
          </div>
          <div class="star">
            <div class="star_item" v-for="(s,idx) in 5">
              <img :src="star" v-if="i.level >= idx+1">
              <img :src="stars" v-if="i.level <= idx">
            </div>
          </div>
        </div>
        <div class="text">
          奥术大师大所大
        </div>
        <div class="time">
          2017-10-18
        </div>
      </li>

    </ul>
  </div>
</template>

<script>

  import {CommentsList} from '../../api/api'
  export default {
    data(){
      return {
        star: require('../../assets/images/star.png'),
        stars: require('../../assets/images/starnull.png'),
        list:[],
        page:1
      }
    },
    methods:{
      init(){
        let params={
          data:{
            goodsid:this.$route.query.id,
            page:this.page
          }
        }
        CommentsList(params,(res)=>{
          if(res.statusCode==1){
            console.log(res.data)
            this.list=this.list.concat(res.data)
          }
        })
      }
    },
    created(){
      this.init()
    }
  }
</script>


<style lang="less" scoped>
  @import '../../assets/css/reset/reset.css';
  @import '../../assets/css/reset/common.less';
  @import '../../assets/css/fonts/iconfont.css';

  .comment {
    width: 100%;
    ul {
      width: 100%;
      padding: .1rem;
      box-sizing: border-box;
      li {
        border-bottom:1px solid #CDCDCD;
        padding: .1rem 0;
        display:block;
        text-align: left;
        .title {
          display: flex;
          justify-content: space-between;
          line-height: .37rem;
          .user{
            display: flex;
            .logo {
              width: .35rem;
              height: .35rem;
              margin-right: .1rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .name {
              font-size: .15rem;
            }
          }

          .star {
            display: flex;
            text-align: right;
            .star_item {
              width: .18rem;
              height: .18rem;
              img {
                width: 100%;
                height: 100%;
              }
            }

          }

        }
        .text {
          padding:.1rem .1rem .1rem 0;
          /*padding-right: .1rem;*/
          font-size: .13rem;
          color:#5F5F5F;
        }
        .time {
          font-size:.13rem;
          color:#5F5F5F;
          margin-top: .05rem;
        }
      }
    }
  }









</style>
