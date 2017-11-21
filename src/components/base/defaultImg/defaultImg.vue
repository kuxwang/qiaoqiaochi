<template>
    <div class="nogoods">
      <div class="nogoods-content"> 
            <div class="nogoods-tp">
            <img :src="defData.img">
        </div>
        <div class="nogoods-mid">
            <h3>{{defData.title1}}</h3>
            <h4>{{defData.title2}}</h4>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    defData: Object
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/common.less";
.nogoods {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content:center;
  .nogoods-content {
    .nogoods-tp {
      width: 1.1rem;
      height: 1.1rem;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      .nogoods-tp img {
        display: block;
        width: 100%;
      }
    }
    .nogoods-mid {
      margin-top: 0.2rem;
      font-size: 0.14em;
      color: #666;
      h3 {
        color: #666;
        font-size: 0.16rem;
        text-align: center;
      }
      h4 {
        color: #999;
        font-size: 0.14rem;
        margin-top: 0.1rem;
        text-align: center;
      }
    }
  }
}
</style>
