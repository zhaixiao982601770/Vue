<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">订单消费支付</h1>
    </header>

    <div class="mui-page-content" style="margin-top: 2.1875rem;">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media">
              <a class="mui-navigate-right">
                <!-- <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="userInfo.headPicture"> -->
                <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="Hair.storePic">

                <div class="mui-media-body">
                  {{Hair.storeName}}
                  <!-- {{userInfo.userName}} -->
                  <!-- <p class='mui-ellipsis'>{{userInfo.email}}</p> -->
                  <p class='mui-ellipsis'>理发店地址：{{Hair.address}}</p>
                </div>
              </a>
            </li>
          </ul>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">优惠券(0)</a>
            </li>
          </ul>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <a class="">订单金额<i class="mui-pull-right update">￥{{Hair.price}}</i></a>
            </li>
            <li class="mui-table-view-cell">
              <!-- <a class="">普通折扣<i class="mui-pull-right update">-￥{{orderHead.discount}}</i></a> -->
              <a class="">普通折扣<i class="mui-pull-right update">-￥0</i></a>
            </li>
            <li class="mui-table-view-cell">
              <a class="">活动折扣<i class="mui-pull-right update">-￥0</i></a>
              <!-- <a class="">活动折扣<i class="mui-pull-right update">-￥{{orderHead.killDiscount}}</i></a> -->
            </li>
            <li class="mui-table-view-cell">
              <a class="">优惠券<i class="mui-pull-right update">-￥0</i></a>
              <!-- <a class="">优惠券<i class="mui-pull-right update">-￥{{orderHead.coupon}}</i></a> -->
            </li>
          </ul>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">电子发票 <i class="mui-pull-right update"></i></a>
            </li>
          </ul>
          <!-- <ul class="mui-table-view">
						<li class="mui-table-view-cell" style="text-align: center;">
							<a>退出登录</a>
						</li>
					</ul> -->
        </div>
      </div>
    </div>



    <div class="calBanner">
      <span class="left">
        <span style="color: orangered;font-weight: bold;">合计：￥{{Hair.price}}
          <!-- {{orderHead.totalPrice}} --></span>
      </span>
      <span @click="fakePay" class="right2">
        去支付
      </span>
      <!-- <span class="right1">

					</span> -->

    </div>

  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        Hair: {}
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      getTOrderHeadById: function(orderId) {
        this.$http('http://localhost:8080/getTOrderHeadById/' + orderId).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.Hair = res.data.content
          } else {
            this.$mui.toast(res.data.msg)
          }

        })
      },
      fakePay: function() {

        var that = this
        var btnArray = ['否', '是'];
        this.$mui.confirm('需付￥' + that.Hair.price, '支付', btnArray, function(e) { /* +that.orderHead.totalPrice */
          if (e.index == 1) {
            that.addTranToOrder()
          } else {
            that.$mui.toast('支付失败')
          }
        })
      },
      addTranToOrder: function() {
        if (this.$getCookie('userName') == null) {
          this.$mui.alert('登录信息已经过期，请重新登录')
          this.$router.push({
            path: '/'
          })
        } else {
          //新建一个对象将hair的值存起来
          var tranToOrderData = this.Hair

          //删除原本Hair自增的主键id
          delete tranToOrderData.id //  删除id
          delete tranToOrderData.type
          delete tranToOrderData.address
          /* delete tranToOrderData.createTime */

          /* shoppingcarData.productId = proId */
          tranToOrderData.orderStatus=3
          console.log(tranToOrderData)

          this.$http.post('http://localhost:8080/addTOrder', tranToOrderData).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.deleteOrderHead()
              this.$mui.toast('支付成功')
            } else {
              this.$mui.toast('支付失败')
            }
          })
        }
      },
      deleteOrderHead:function(){
        console.log(this.$route.query.id)
        this.$http('http://localhost:8080/removeTOrderHeadById/' + this.$route.query.id).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$router.push('/')
          } else {
            this.$mui.toast(res.data.msg)
          }

        })
      }
    },
    mounted: function() {
      console.log(this.$route.query.id)
      this.getTOrderHeadById(this.$route.query.id)
      /*
      			console.log(this.$route.query.orderId)
      			if(typeof(this.$userInfo.id)=='undefined'){
      				this.getUserInfo()
      			}else{
      				this.userInfo=this.$userInfo
      			}

      			this.getOrderHeadById(this.$route.query.orderId)
      */
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");


  /* 购物车样式 */
  .carProList {
    padding: 0px;
  }

  .carProduct {
    list-style: none;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background-color: white;
  }

  .carProduct img {
    float: left;
    height: 100%;
    width: 30%;
    margin-top: -10px;
    vertical-align: middle;
  }

  .carProduct .proInfoAndOption {
    float: right;
    width: 60%;
    height: 100%;
    /* border: 1px solid red; */
  }

  .proInfoAndOption ul {
    list-style: none;
    padding: 0px;
    height: 100%;
    width: 100%;
    margin: 0px;

  }

  .proInfoAndOption ul li {
    width: 100%;
    height: 33%;
    margin-top: -10px;
    /* border: 1px solid red; */
  }

  .carProduct input {
    float: left;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 18px;
    position: relative;
    margin-top: 30px;
    margin-left: 3%;
  }

  .name {
    font-weight: bold;
    text-align: left;
    font-size: 15px;
    line-height: 30px;
  }

  .miaoshu {
    text-align: left;
    font-size: 10px;
    line-height: 30px;
  }

  .opt span {
    font-size: 17px;
    line-height: 33px;
  }

  .opt .left {
    float: left;
    color: orangered;
    font-weight: bold;
  }

  .opt .right {
    float: right;
    margin-right: 10px;
  }

  .opt .right span {
    margin-right: 10px;
  }


  /* 计算样式 */
  .calBanner {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
    background-color: white;
    z-index: 21;
    /* border: 1px solid red; */
  }

  .calBanner span {
    height: 100%;
  }

  .calBanner span.left {
    float: left;
    width: 20%;
    /* border: 1px solid red; */
  }

  .calBanner span.right2 {
    float: right;
    width: 35%;
    /* border: 1px solid red; */
    font-size: 16px;
    line-height: 50px;
    background-color: orangered;
    color: white;
  }

  .calBanner span.right1 {
    float: right;
    width: 40%;
    /* border: 1px solid red; */
    font-size: 15px;
    line-height: 50px;
  }

  .calBanner span.left input {
    margin-top: 15px;
    width: 20px;
    height: 20px;
  }

  .calBanner span.left span {
    font-size: 16px;
    line-height: 20px;
    margin-left: 10px;
    font-weight: bold;
  }

  /* 推荐商品 */

  /* #tuijianPro {
		background-color: white;
		padding: 0px;
	} */

  html,
  body {
    background-color: #efeff4;
  }

  .mui-views,
  .mui-view,
  .mui-pages,
  .mui-page,
  .mui-page-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #efeff4;
  }

  .mui-pages {
    top: 46px;
    height: auto;
  }

  .mui-scroll-wrapper,
  .mui-scroll {
    background-color: #efeff4;
  }

  .mui-page.mui-transitioning {
    -webkit-transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
  }

  .mui-page-left {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .mui-ios .mui-page-left {
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }

  .mui-navbar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 10;
    height: 44px;
    background-color: #f7f7f8;
  }

  .mui-navbar .mui-bar {
    position: absolute;
    background: transparent;
    text-align: center;
  }

  .mui-android .mui-navbar-inner.mui-navbar-left {
    opacity: 0;
  }

  .mui-ios .mui-navbar-left .mui-left,
  .mui-ios .mui-navbar-left .mui-center,
  .mui-ios .mui-navbar-left .mui-right {
    opacity: 0;
  }

  .mui-navbar .mui-btn-nav {
    -webkit-transition: none;
    transition: none;
    -webkit-transition-duration: .0s;
    transition-duration: .0s;
  }

  .mui-navbar .mui-bar .mui-title {
    display: inline-block;
    width: auto;
  }

  .mui-page-shadow {
    position: absolute;
    right: 100%;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: -1;
    content: '';
  }

  .mui-page-shadow {
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
  }

  .mui-navbar-inner.mui-transitioning,
  .mui-navbar-inner .mui-transitioning {
    -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
    transition: opacity 300ms ease, transform 300ms ease;
  }

  .mui-page {
    display: none;
  }

  .mui-pages .mui-page {
    display: block;
  }

  .mui-page .mui-table-view:first-child {
    margin-top: 15px;
  }

  .mui-page .mui-table-view:last-child {
    margin-bottom: 30px;
  }

  .mui-table-view {
    margin-top: 20px;
  }

  .mui-table-view span.mui-pull-right {
    color: #999;
  }

  .mui-table-view-divider {
    background-color: #efeff4;
    font-size: 14px;
  }

  .mui-table-view-divider:before,
  .mui-table-view-divider:after {
    height: 0;
  }

  .head {
    height: 40px;
  }

  #head {
    line-height: 40px;
  }

  .head-img {
    width: 40px;
    height: 40px;
  }

  #head-img1 {
    position: absolute;
    bottom: 10px;
    right: 40px;
    width: 40px;
    height: 40px;
  }

  .update {
    font-style: normal;
    color: #999999;
    margin-right: -25px;
    font-size: 15px
  }

  .mui-fullscreen {
    position: fixed;
    z-index: 20;
    background-color: #000;
  }

  .mui-ios .mui-navbar .mui-bar .mui-title {
    position: static;
  }

  /*问题反馈在setting页面单独的css*/
  #feedback .mui-popover {
    position: fixed;
  }

  #feedback .mui-table-view:last-child {
    margin-bottom: 0px;
  }

  #feedback .mui-table-view:first-child {
    margin-top: 0px;
  }

  .mui-plus.mui-plus-stream .mui-stream-hidden {
    display: none !important;
  }

  .mui-page-content li {
    text-align: left;
  }
</style>
