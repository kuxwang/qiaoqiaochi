<template>
  <div class="page">
    <mt-header fixed title="管理收货地址">
      <a slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="container">
      <ul class="user__list">
        <li class="user" v-for="(v,i) in addressLists" @click.prevent="getMyAddress(v,i)">
          <div class="info">
            <span class="name">{{v.realname}}</span>
            <span class="tel">{{v.mobile}}</span>
          </div>
          <div class="area">
            {{v.province}}{{v.city}}{{v.area}}{{v.address}}
          </div>
          <div class="set">
            <div class="default">设为默认地址</div>
            <div class="right">
              <span @click.stop="edit(v)"><span class="iconfont edit">&#xe64e;</span>编辑</span>
              <span @click="deleteAddress(v.id)"><span class="iconfont tranch">&#xe6db;</span>删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        value:2
      }
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
  .container {
    margin-top: .45rem;
    height: 100%;
    .user__list {
      width: 100%;
      .user {
        height: 1.2rem;
        padding: 0 .22rem;

        text-align: left;
        .info {
          display: flex;
          padding-top: .1rem;
          line-height: .22rem;
          margin-bottom: .08rem;
          .name {
            flex: 1;
            font-size: .12rem;
          }
          .tel {
            text-align: right;
            flex: 1;
            font-size: .1rem;
          }
        }
        .area {
          font-size: .12rem;
          /*line-height: .36rem;*/
          line-height: .2rem;
          border-bottom: 1px solid #eee;
          .text-overflow(2)
        }
        .set {
          display: flex;
          line-height: .46rem;
          .default {
            font-size: .11rem;
            flex: 1;
          }
          .right {
            flex: 1;
            text-align: right;
            span {
              font-size: .11rem;
              .tranch {
                font-size: .22rem;
                position: relative;
                top:.025rem;
              }
              .edit {
                font-size: .16rem;
                margin-right: .03rem;
                position: relative;
                top:.01rem;
              }
            }
          }
        }
      }
    }
  }



</style>
