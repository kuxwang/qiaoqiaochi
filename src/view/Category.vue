<template>
  <div class="content">

    <transition name="slide">
      <router-view></router-view>
    </transition>
    <v-tabbar></v-tabbar>
  </div>
</template>


<style scoped>
  .content {

  }

  .search {
    width: 100%;
    height: .5rem;
    display: flex;
    padding: 0 .2rem;
    text-align: center;
  }

  .search > input {
    display: block;
    height: .4rem;
    flex: 3;
  }

  .find-btn {
    /*flex: 1;*/
    line-height: .4rem;
    color: red;
    width: .6rem;
  }

  .list {
    width: 100%;
    display: flex;
    /*height: 6.17rem;*/
    height: 100%;
    text-align: center;
    margin-top: .48rem;
    /*border-top: 1px solid red;*/
  }

  .list-l {
    flex: 1;
    height: 100%;
    background-color: #eee;
    /*border: 1px solid #eee;*/
    /*margin-top: -0.02rem;*/
    padding-left: 0;
    background: #fff;
  }

  .l-item {
    width: 100%;
    height: .4rem;
    font-size: .12rem;
    /*border: 1px solid #eee;*/
    line-height: .4rem;
    border-bottom: 1px solid #f8f8f8;
    color: #232327;

  }

  .list-r {
    flex: 3.8;
    height: 100%;
    background-color: rgb(243, 245, 247);
    padding: .1rem;
    justify-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

  }

  .list-r > div {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .r-item {
    display: block;
    /* width: .68rem;
     height: 1rem;*/
    width: .83156rem;
    height: .83156rem;
    /*border: 1px solid #2c3e50;*/
    padding: .05rem;
    margin: .05rem;
  }

  .r-item img {
    /*      width: 100%;
        height: .6rem;*/
    width: .55rem;
    height: .55rem;
  }

  .r-item span {
    font-size: .1rem;
    line-height: .31rem;
    display: block;

    height: .31rem;
    color: #686868;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tabActive {
    background-color: rgb(243, 245, 247);
  }

  .search {
    height: .5rem;
    display: flex;
    /*margin: .2rem 2%;*/
    width: 100%;
    z-index: 2;
    background-color: #eee;
    /*top: 1.35rem;*/
    padding: 0 2%;

  }

  .search input {
    border: none;
    display: block;
    height: .3rem;
    flex: 1;
    padding: 0 0.2rem;
    background: #fff;
    margin: .1rem 0;
  }

  .search div {
    background-color: #F5751D;
    display: block;
    height: .3rem;
    flex: .3;
    color: #fff;
    line-height: .3rem;
    margin: .1rem 0;
  }

</style>
