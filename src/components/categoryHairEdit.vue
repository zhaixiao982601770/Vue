<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">修改商店信息</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>名字</label>
        <input v-model="hairInfo.storeName" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>地址</label>
        <input v-model="hairInfo.address" type="text" class="mui-input-clear" placeholder="请输入">
      </div>

      <div class="mui-input-row">
        <label>电话</label>
        <input v-model="hairInfo.tel" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>折扣价</label>
        <input v-model="hairInfo.newPrice" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>原价</label>
        <input v-model="hairInfo.oldPrice" type="text" class="mui-input-clear" placeholder="请输入">
      </div>

      <div class="mui-input-row">
        <label>上传头像</label>
        <input @change="uploadHeadPic" type="file" class="mui-input-clear" placeholder="请输入">
      </div>
      <div style="background-color: green;" class="mui-input-row">
        <!-- <label>收货地址</label> -->
        <input type="button" @click="saveHair" class="mui-button-row" value="保存">
      </div>
    </form>


  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        hairInfo: {}
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/category'
        })
      },
      getHairById:function(id){
        this.$http('http://localhost:8080/getTHairById/' + id).then(res => {
          console.log(res)
          this.hairInfo = res.data.content
        })
      },
      saveHair: function() {
        var that = this

        this.$http({
          method: 'put',
          url: 'http://localhost:8080/updateTHair',
          data: that.hairInfo
        }).then(function(res) {
          console.log(res)
          if (res.data.code == 200) {
            that.$mui.alert('修改成功')
            that.$router.push('/category')
          } else {
            that.$mui.toast('修改失败')
          }
        }).catch(function(err) {
          console.log(err)
        })
      },
      uploadHeadPic: function(e) {
        console.log('uploadHeadPic')
        let that = this;
        if (e.target.files.length !== 0) {
          var formData = new FormData()
          formData.append('image_data', e.target.files[0]);

          this.$http.post('http://localhost:8080/upload/addImage', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(response => {
            console.log('upload success')

            that.hairInfo.storePic = (that.$http.defaults.baseURL+"/static/" + e.target.files[0].name)
            // that.$mui.alert('头像传好了','shop',function(){
            //   that.saveUser()
            // });
          })
        }
      }
    },
    mounted: function() {
      console.log("已经到了categoryHairEdit")
      console.log(this.$route.query.id)
      this.getHairById(this.$route.query.id)
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");
</style>
