<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">理发店详情</h1>
    </header>
    <div class="mui-card">
      <img :src="hair.storePic" />
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p align="left" style="color: coral;" class="realPrice">
            {{hair.storeName}}
          </p>
          <p align="left" class="realPrice">￥
            ￥{{hair.newPrice}}

            <!-- {{product.normalPrice-product.discount}} -->
            <!-- <span v-if="product.isInDiscount==1" class="discountLogo">
              折扣商品
            </span>
            <span v-if="product.isInKill==1" class="discountLogo">
              秒杀商品
            </span> -->
          </p>

          <p align="left" class="huaxian normalPrice">门市价:￥{{hair.oldPrice}}</p><!-- ￥{{product.normalPrice}} -->
          <p align="left" style="color: #333;">
            {{hair.storeDescribe}}
          </p>
          <a class="mui-card-link">营业时间:9:00至21:00</a>
        </div>



      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">电话:{{hair.tel}}</a><!-- {{product.deliveryPrice}} -->
        <a class="mui-card-link">地址：{{hair.address}}</a><!-- {{product.orderCount}} -->
        <a class="mui-card-link"></a><!-- {{product.deliveryPlace}} -->
      </div>

      <div class="mui-card-footer">
        <a class="mui-card-link">商家评论(1999)</a>
        <a class="mui-card-link">></a>
      </div>
    </div>

    <div class="carAndOrder">
      <div @click="addTranToOrder" align="center" class="car">预约</div>
      <div @click="prePay(hair.id)" align="center" class="order">结算</div>
    </div>


  </div>

</template>

<script>
  export default {
    name: 'hairDetail',
    data() {
      return {
        hair: {},
        userInfo: {}
      }
    },
    methods: {
      getTHairById: function(id) {

        this.$http('http://localhost:8080/getTHairById/' + id).then(res => {
          console.log(res)
          this.hair = res.data.content
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
          var tranToOrderData = this.hair

          //删除原本Hair自增的主键id
          delete tranToOrderData.id //  删除id
          /* delete tranToOrderData.createTime */


          tranToOrderData.userId = this.userInfo.id
          tranToOrderData.userName=this.$getCookie('userName')
          tranToOrderData.price = this.hair.newPrice
          /* shoppingcarData.productId = proId */

          console.log(tranToOrderData)

          this.$http.post('http://localhost:8080/addTOrderHead', tranToOrderData).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.$mui.toast('预约成功')
              this.$router.push('/')
            } else {
              this.$mui.toast('预约失败')
            }
          })

        }
      },
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      prePay: function(HairId) {
        console.log('id' + HairId)
        this.$router.push({
          path: '/pay',
          query: {
            id: HairId
          }
        })
      },
      getUserInfo: function() {
        var that = this
        this.$http({
          url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
          method: 'post',
          data: {}
        }).then(function(res) {
          /* console.log(that.$getCookie('userName'))
        		console.log(res.data.content) */
          that.userInfo = res.data.content //将查出来的用户信息保存下来
          /* console.log(userInfo) */
        }).catch(function(err) {

          console.log(err)
          that.$mui.toast('获取用户信息失败')
        })

      }
    },
    mounted: function() {
      console.log(this.$route.query.id) //将主页理发店列表信息id传值过来
      this.getTHairById(this.$route.query.id)
      this.getUserInfo()

      /* console.log(this.product.productName) */
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");

  .huaxian {
    text-decoration: line-through;
  }

  .normalPrice {
    color: darkgray;
  }

  .realPrice {
    color: orangered;
    font-size: 20px;
    font-weight: bold;
  }

  .discountLogo {
    font-size: 10px;
    padding-left: 10px;
    padding-right: 10px;
    /* border: 2px solid inherit; */
    border-radius: 14px;
    background-color: moccasin;
  }

  .mui-card {
    margin: 0px;
    background-color: inherit;
    border: 0px solid;
    box-shadow: none;
  }

  .mui-card img {
    width: 100%;
  }

  .mui-card-footer a {
    color: darkgray;
  }

  /* 按钮组样式  */
  .carAndOrder {
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: 50px;
    font-size: 17px;
    color: white;
    line-height: 47px;
    /* border: 1px solid #888888; */
    /* border-radius: 30px; */
  }

  .car {
    height: 100%;
    width: 50%;
    background-color: orange;
    float: left;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .order {
    height: 100%;
    width: 50%;
    background-color: orangered;
    float: right;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
</style>
