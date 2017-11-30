<template>
  <div class="icons">
    <slot>
      <div v-if="loadingStatus==1" class="tips">
        <!-- <span class="iconfont">&#xe612;</span> -->
        <div>
          <img src="../../assets/images/wdhb.png">
        </div>
        <h3>
          未找到相关伙伴信息~
        </h3>
      </div>
      <!-- <div v-if="loadingStatus==0" class="loading">
        </div> -->
    </slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingStatus: 0
    }
  },
  props: [],
  methods: {},
  computed: {},
  created() {

  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/less/index.less";
  @import '../../assets/less/reset.less';
  @import '../../assets/fonts/iconfont.css';
.share-page {
  padding: .9rem 1rem;
  color: #999;
  background: @background;
}

.share-page>div.iconfont {
  font-size: .7rem;
}

.share-page>p {
  font-size: .14rem;
}

.share-page>button {
  width: .7rem;
  height: .35rem;
  border-radius: .03rem;
  margin-top: .15rem;
  background: #ff4f4f;
  outline: none;
  color: #ddd;
}

.tips {
  text-align: center;
  font-size: .14rem;
  color: #666;
  margin-top: 1rem;
}

.tips .iconfont {
  display: block;
  font-size: .8rem;
}

.tips h3{
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color:#666;
}

.loading {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5rem;
  /*url('../assets/images/Spinner.gif')*/
  /*background: url('../../assets/images/loading.gif') no-repeat center center;*/
  background: url('../../assets/images/Magnify.gif') no-repeat center center;
  background-size: 100% 100%;
}
</style>
