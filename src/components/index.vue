<template>
  <div>

    <div class="jd_container">
      <!-- 顶部搜索 -->
      <header class="jd_search">
        <div class="jd_search_box">
          <a href="#" class="icon_logo">
            <img src="../assets/images/hairlogo.jpg" alt="">
          </a>
          <form action="#">
            <span class="icon_search"></span>
            <input type="search" placeholder="请输入">
          </form>
          <a @click="toLogin" class="login">{{isLogin}}</a>
        </div>
      </header>

      <!-- 轮播图 -->
      <div id="slider" class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
          <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../assets/images/l8.jpg" alt="">
            </a>
          </div>
          <!-- 第一张 -->
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l1.jpg" alt="">
            </a>
          </div>
          <!-- 第二张 -->
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l2.jpg" alt="">
            </a>
          </div>
          <!-- 第三张 -->
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l3.jpg" alt="">
            </a>
          </div>
          <!-- 第四张 -->
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l4.jpg" alt="">
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l5.jpg" alt="">
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l6.jpg" alt="">
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l7.jpg" alt="">
            </a>
          </div>
          <div class="mui-slider-item">
            <a href="#">
              <img src="../assets/images/l8.jpg" alt="">
            </a>
          </div>
          <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href="#">
              <img src="../assets/images/l1.jpg" alt="">
            </a>
          </div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator mui-active"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
        </div>
      </div>
      <!-- 导航栏 -->
      <nav class="jd_nav">
        <ul class="clearFix">
          <li @click="toCategory()"><a href="#"><img src="../assets/images/nav0.png" alt="">
              <p>信息管理</p>
            </a></li>
          <li @click="toOrder()"><a href="#"><img src="../assets/images/nav2.png" alt="">
              <p>预约管理</p>
            </a></li>
          <li @click="toTrans()"><a href="#"><img src="../assets/images/nav8.png" alt="">
              <p>订单管理</p>
            </a></li>
          <li @click="toUserCenter()"><a href="#"><img src="../assets/images/nav3.png" alt="">
              <p>个人中心</p>
            </a></li>
          <!-- <li><a href="#"><img src="../assets/images/nav4.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav5.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav6.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav7.png" alt=""><p>分类</p></a></li> -->
        </ul>
      </nav>

      <!--产品区块-->
      <div class="jd_product">
        <section class="jd_product_box sk">
          <!--second kill-->
          <div class="tit nb">
            <div class="f_left">
              <span class="icon"></span>
              <span class="name">理发店</span>
            </div>
            <div class="f_right"><a class="m_r10">更多&gt;</a></div>
          </div>


          <div class="con">
            <ul class="pro clearFix">
              <!-- 循环查询出理发店列表，点击跳转详情页面 -->
              <li v-for="list in tHairList" @click="toHairDetail(list.id)">
                <div class="con_first">
                  <div class="con_first_a">
                    <a><img :src="list.storePic" alt="" style="width: 7.5rem;height: 7.5rem;"></a>
                    <div class="con_first_a_div">
                      {{list.storeName}}
                      <div class="con_first_a_div_p">
                        <p class="nowPrice">&yen;优惠价:{{list.newPrice}}</p>
                        <p class="oldPrice">&yen;门市价:{{list.oldPrice}}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </div>

        </section>
      </div>
    </div>



  </div>





</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        isLogin: '登录',
        tHairList: [] //返回理发店信息列表
      }
    },
    methods: {
      toLogin: function() {
        if (this.isLogin === '登录') {
          this.$router.push({
            path: '/login'
          })
        } else { //点登出时给出提示框
          var that = this
          this.$mui.confirm('是否退出登录', '退出', ['否', '是'], function(e) {
            if (e.index == 1) {
              that.isLogin === '登录'
              that.$deleteCookie('token')
              that.$deleteCookie('userName')
              that.$mui.toast('退出成功')
              that.$router.go(0) //主页刷新
            }
          })

        }
      },
      //信息管理模块
      toCategory: function() {
        if (this.$getCookie('userName') == null) {
          this.$mui.alert('你还没有登录，请登录')
          this.$router.push({
            path: '/'
          })
        } else {
          var that = this
          this.$http({
            url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
            method: 'post',
            data: {}
          }).then(function(res) {
            console.log(res)
            that.userInfo = res.data.content //将查出来的用户信息保存下来
            if (that.userInfo.gender == 1) {
              console.log('来到了管理员页面!')
              that.$router.push({
                path: '/category'
              })
            } else if (that.userInfo.gender == 3) {
              console.log('来到了商家页面!')
              that.$router.push({
                path: '/hairCenter'
              })
            } else {
              that.$mui.alert('对不起，你不是管理员!')
            }
          }).catch(function(err) {
            console.log(err)
            that.$mui.toast('获取用户信息失败')
          })
        }
      },
      //预约管理模块
      /* 判断商家还是用户登录,去到不同的页面 */
      toOrder: function() {
        if (this.$getCookie('userName') == null) {
          this.$mui.alert('你还没有登录，请登录')
          this.$router.push({
            path: '/'
          })
        } else {
          var that = this
          this.$http({
            url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
            method: 'post',
            data: {}
          }).then(function(res) {
            console.log(res)
            that.userInfo = res.data.content //将查出来的用户信息保存下来
            if (that.userInfo.gender == 3) {
              console.log('来到了商家页面')
              that.$router.push({
                path: '/orderBusiness'
              })
            } else {
              console.log('来到了用户页面')
              that.$router.push({
                path: '/order'
              })
            }
          }).catch(function(err) {
            console.log(err)
            that.$mui.toast('获取用户信息失败')
          })
        }

      },
      //订单管理模块
      toTrans: function() {
        if (this.$getCookie('userName') == null) {
          this.$mui.alert('你还没有登录，请登录')
          this.$router.push({
            path: '/'
          })
        } else {
          var that = this
          this.$http({
            url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
            method: 'post',
            data: {}
          }).then(function(res) {
            console.log(res)
            that.userInfo = res.data.content //将查出来的用户信息保存下来
            if (that.userInfo.gender == 3) {
              console.log('来到了商家页面')
              that.$router.push({
                path: '/transBusiness'
              })
            } else {
              console.log('来到了用户页面')
              that.$router.push({
                path: '/trans'
              })
            }
          }).catch(function(err) {
            console.log(err)
            that.$mui.toast('获取用户信息失败')
          })
        }
      },
      toHairDetail: function(HairId) {
        console.log('id' + HairId)
        this.$router.push({
          path: '/hairDetail',
          query: {
            id: HairId
          }
        })
      },
      toUserCenter: function() {
        this.$router.push({
          path: '/userCenter'
        })
      },
      getAllHairList: function() {
        var that = this

        this.$http({
          method: 'post',
          url: 'http://localhost:8080/getAllTHair',
          data: {
            model: {

            },
            orderParams: [],
            pageNum: 0,
            pageSize: 100
          }
        }).then(function(res) {
          console.log(res)
          that.tHairList = res.data.content.list
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取理发店列表信息失败')

        })

      }
    },
    mounted: function() {


      //轮播图
      this.$mui.init({
        swipeBack: true //启用右滑关闭功能
      });
      var slider = this.$mui("#slider");
      slider.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 判断cookie中是否有token 改变登录和登出的显示内容
      if (this.$getCookie('userName') != null && this.$getCookie('userName').length != 0 && this.$getCookie(
          'userName') != '') {
        this.isLogin = '登出'
      } else {
        this.isLogin = '登录'
      }
      this.getAllHairList()
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/base.css");
  @import url("../assets/css/index.css");

  #slider {
    margin-top: -80px;
  }
</style>
