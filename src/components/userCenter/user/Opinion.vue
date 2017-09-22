<template>
  <div class="page">
    <mt-header title="意见反馈" fixed>
      <router-link to="/userCenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <h3>问题和意见</h3>
      <div class="text">
        <textarea :maxlength="140" placeholder="请输入不少于10个字的描述" v-model="text"> </textarea>
        <span class="textleng">{{text.length}}/140</span>
      </div>


      <div class="pic-group">
        <p>请提供相关问题的截图或照片<span>{{pic.length}}/4</span></p>
        <div class="pic-view">
        <div class="img-box" v-if="pic" v-for="i in pic">
          <img :src="test"/>
        </div>
        <div class="img-box add" @click="uploadImg" v-if="pic.length<4">
          <span class="iconfont">&#xe62b;</span>
          <div>相机/相册</div>
        </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {_webapp} from '../../../config/webapp.js';
  export default {
    data(){
      return {
        text:'',
        pic:[1,1,1],
        test:'../../../assets/images/confirmorder-01.png',

      }
    },
    methods:{
      uploadImg(){
        let that = this;
        _webapp.uploadImg((res) => {
//          that.myImg = res.data;
          that.pic.push()
        })
      }
    },
    created(){

    }
  }
</script>



<style lang="less" scoped>
  @import '../../../assets/css/reset/reset.css';
  @import '../../../assets/css/reset/common.less';
  @import '../../../assets/css/fonts/iconfont.css';

  .page {
    .page-view(1);
  }
  .container {
    margin-top: .64rem;
    text-align: left;
    h3 {
      padding: 0 .16rem;
      font-size: .14rem;
      color: #999;
      line-height: .4rem;
    }
    .text {
      position: relative;
      textarea {
        padding: .13rem .16rem;
        width: 100%;
        height: 1.6rem;
        /*margin-bottom: .22rem;*/
        background-color: #eee;
      }
      .textleng {
        position: absolute;
        right: .1rem;
        bottom: .1rem;
      }
    }




    .pic-group{
      width: 100%;
      margin-top: .2rem;
      padding: .14rem .16rem;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      p {
        /*display: flex;*/
        color: #333;
        font-size: .18rem;
        margin-bottom: .12rem;
        /*line-height: .44rem;*/
        span {
          float: right;
        }
      }
      .pic-view{
        display: flex;
        /*justify-content: space-around;*/
        .img-box {
          width: .76rem;
          height: .76rem;
          border: 1px solid #e5e5e5;
          margin: 0 0.07rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .add {
          text-align: center;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .iconfont {
            font-size: .3rem;
            display: block;
            padding-top: .1rem;
          }
          div {
            font-size: .13rem;
          }
        }
      }

    }

  }

</style>

