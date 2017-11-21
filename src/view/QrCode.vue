<template>
  <div class="main">
    <div class="container" v-show="!on1">
      <div class="imgbox" @click="clickhavib()" v-if="defShow">
        <img :src="qrimg" />
      </div>
      <!-- default图 -->
      <default-img :defData="defMsg" v-show="!defShow"></default-img>
      <!-- <div class="tip" v-if="!qrimg">
        <div>
          <img src="../assets/images/wdhb.png">
        </div>
        <h3>
          您还不是分销商~
        </h3>
      </div> -->
    </div>
    <div class="loading-container" v-show="on1">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import { Qrimg, QrimgSave } from "../api/api";
import { Toast, MessageBox } from "mint-ui";
import Loading from "../components/base/loading/loading";
import defaultImg from "../components/base/defaultImg/defaultImg";
import myDefImg from "../assets/images/wdhb.png";
export default {
  data() {
    return {
      qrimg: "",
      topStatus: "",
      disindex: 3,
      type: "",
      on1: true,
      defShow: true,
      defMsg: {
        img: myDefImg,
        title1: "您还不是分销商",
        title2: ""
      }
    };
  },
  methods: {
    init() {
      let _this = this;
      Qrimg({ data: {} }, res => {
        if (res.statusCode === 1) {
          _this.qrimg = res.data;
          _this.on1 = false;
          _this.qrimg == "" ? (_this.defShow = false) : (_this.defShow = true);
        } else {
          _this.on1 = false;
          _this.defShow = false;
          MessageBox.alert(res.data).then(action => {
            _this.$router.replace({ name: "userInfo" });
          });
        }
      });
    },
    clickhavib() {
      let _this = this;
      QrimgSave(_this.qrimg, res => {
        if (res.statusCode == 1) {
          console.log("ok");
        }
      });
    }
  },
  components: {
    Loading,
    defaultImg
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/common.less";

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  overflow: hidden;
}

.imgbox {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.imgbox img {
  display: block;
  width: 100%;
  height: 100%;
}

button {
  display: block;
  width: 1rem;
  height: 0.35rem;
  margin: 0 auto;
  position: relative;
  top: 2.5rem;
  outline: none;
}

.container {
  width: 100%;
  height: 100%;
  padding-bottom: 0.5rem;
}

.title {
  display: flex;
  height: 0.8rem;
  width: 76%;

  position: absolute;
  margin-left: 12%;
  top: 15%;
}

.logo {
  flex: 1;
}

.title img {
  display: block;
  flex: 1;
  width: 0.6rem;
}

.title p {
  flex: 3;
  font-size: 0.24rem;
  padding: 0.1rem;
  text-align: left;
}

.backg {
  width: 100%;
}

.tip {
  font-size: 0.2rem;
  position: relative;
  top: 2rem;
}

.tip .iconfont {
  display: block;
  font-size: 1rem;
}

.tip h3 {
  font-size: 0.16rem;
  color: #666;
  margin-top: 0.1rem;
  font-weight: 400;
}

.mint-loadmore-top {
  background: rgba(255, 255, 255, 0.7);
}

.loading {
  position: relative;
}

.loading:before {
  content: "";
  position: absolute;
  left: -0.35rem;
  top: -0.08rem;
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  background: url("../assets/images/Spinner.gif") no-repeat 100% 100%;
  background-size: 100% 100%;
}
</style>
