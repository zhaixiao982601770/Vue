<template>

  <div>

    <div class="jd_layout">
      <!-- 底部通栏-->
      <header class="jd_topBar">
        <a href="javascript:history.back(-1)" class="icon_back"></a>
        <form action="#">
          <input type="search" placeholder="顶部搜索栏" />
        </form>
        <a href="#" class="icon_menu"></a>
      </header>

      <!-- 分类主体-->
      <div class="jd_main">
        <div class="jd_cateLeft">
          <ul class="clearFix">
            <li class="now"><a href="javascript:;">用户信息</a></li>
            <li class=""><a @click="toCategory()">理发店信息</a></li>
            <li class=""><a @click="addHair()">添加理发店</a></li>
          </ul>
        </div>
        <div class="jd_cateRight">
          <div class="jd_cateRight_box">
            <div class="hot">
              <ul class="clearFix">
                <li class="mui-table-view-cell mui-transitioning" v-for="list in tUserList">
                  <div class="mui-slider-right mui-disabled">
                    <a class="mui-btn mui-btn-yellow" @click="toCategoryUserEdit(list.id)">修改</a>
                    <a class="mui-btn mui-btn-red" @click="toDeleteUserById(list.id)">删除</a>
                  </div>

                  <div class="mui-slider-handle" style="transform: translate(0px,0px);">
                    <div class="oa-contact-cell mui-table">
                      <div class="oa-contact-content mui-table-cell">
                        <div class="mui-clearfix">
                          <h4 class="oa-contact-name">用户名:{{list.username}}</h4>
                          <span class="oa-contact-position mui-h6" v-if="list.gender==1">用户身份：管理员</span>
                          <span class="oa-contact-position mui-h6" v-if="list.gender==2">用户身份：普通用户</span>
                          <span class="oa-contact-position mui-h6" v-if="list.gender==3">用户身份：商家</span>
                          <a class="oa-contact-email mui-h6">
                            用户真实名字：{{list.realname}}
                          </a>
                        </div>
                        <div>
                          <a class="oa-contact-email mui-h6">
                            邮箱：{{list.email}}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>



          </div>
        </div>

      </div>


    </div>


  </div>

</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        tUserList: []
      }
    },
    methods: {
      addHair:function(){
        this.$router.push({
          path: '/categoryAddHair'
        })
      },
      toCategoryUserEdit: function(HairId) {
        console.log('id' + HairId)
        this.$router.push({
          path: '/categoryUserEdit',
          query: {
            id: HairId
          }
        })
      },
      toCategory: function() {
        this.$router.push({
          path: '/category'
        })
      },
      toDeleteHairById: function(id) {
        console.log(id)
        var that = this
        that.id=id
        this.$mui.confirm('是否退出登录', '退出', ['否', '是'], function(e) {
          console.log(that.id)
          if (e.index == 1) {
            that.$http({
                method: 'get',
                url: 'http://localhost:8080/removeTUserById/' + that.id,
                data: {}
              }).then(function(res) {
                console.log(res)
              })
              .catch(function(error) {
                console.log(error)
              })
            that.$mui.toast('刪除成功')
            that.$router.go(0) //主页刷新
          }
        })
      },
      getUserList: function() {

        var that = this

        this.$http({
          method: 'post',
          url: 'http://localhost:8080/getAllTUser',
          data: {
            model: {

            },
            orderParams: [],
            pageNum: 0,
            pageSize: 100
          }
        }).then(function(res) {
          console.log(res)
          that.tUserList = res.data.content.list
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取用户列表信息失败')

        })
      }
    },
    mounted: function() {
      this.getUserList()
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/base.css");
  @import url("../assets/css/category.css");

  .mui-clearfix {
    width: 80%;
    margin: auto;
    /* text-align: left; */
  }

  .title {
    margin: 20px 15px 10px;
    color: #6d6d72;
    font-size: 15px;
  }

  .oa-contact-cell.mui-table .mui-table-cell {
    padding: 11px 0;
    vertical-align: middle;
  }

  .oa-contact-cell {
    position: relative;
    margin: -11px 0;
  }

  .oa-contact-avatar {
    width: 75px;
    height: 75px;
  }

  .oa-contact-avatar img {
    /*  border-radius: 60%; */
    width: 75px;
    height: 75px;
  }

  .oa-contact-content {
    width: 100%;
  }

  /* .oa-contact-name {
    margin-right: 5px;
  } */

  /* .oa-contact-name,
  oa-contact-position {
    float: left;
    margin-right: 10px;
  } */
</style>
