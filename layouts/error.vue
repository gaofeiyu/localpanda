 <template>
    <div class="falsePage">
    	<HeaderCommon :logIn="logIn"></HeaderCommon>
      <div class="content">
 			<div class="iconfont">
 				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-icon-test"></use>
				</svg>
 			</div>
 			<p>So Sorry! :(</p>
 			<div class="text">"The document you are looking for may have been removed or re-named. Please contact the web site owner 
for further  assistance"</div>
			<div class="backBtn">
				<button @click="goback">Back to Home</button>
			</div>
			
      </div>
     
    </div>
</template>

<script>
import HeaderCommon from "~/components/HeaderCommon/HeaderCommon";

export default {
  name: "error",
  props: ["error"],
  data() {
    return {
      logIn: ""
    };
  },
  components: {
    HeaderCommon
  },
  methods: {
    goback() {
      window.location.href = "index.html";
    }
  },
  mounted: function() {
    let that = this;
    that.logIn = window.localStorage.getItem("logstate");
  }
};
</script>
<style lang="scss">
@import "~assets/scss/_main.scss";
@import "~/assets/font/iconfont.css";
#header {
  box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
}
</style>
<style lang="scss" scoped>
@import "~assets/scss/base/_setting.scss";
.icon {
  width: 254px;
  height: 202px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.falsePage {
  .content {
    width: 1170px;
    margin: 0 auto;
    padding: 125px 0;
    .iconfont {
      text-align: center;
    }
    p {
      text-align: center;
      color: #353a3f;
      font-size: 36px;
      font-weight: bold;
    }
    .text {
      font-size: 20px;
      text-align: center;
      color: #353a3f;
      margin-top: 43px;
    }
    .backBtn {
      text-align: center;
      margin-top: 53px;
      button {
        width: 155px;
        height: 52px;
        border: 2px solid #1bbc9d;
        text-align: center;
        line-height: 52px;
        border-radius: 30px;
        color: #353a3f;
        font-size: 14px;
        background: #fff;
      }
    }
  }
}
</style>
