<template>
  <!-- <div class="settingContent">
    <el-breadcrumb separator="/" style="margin:20px 0 20px 40px">
      <el-breadcrumb-item :to="{ path: '/Admin/SettingPowers/Change' }">呼叫中心</el-breadcrumb-item>
      <el-breadcrumb-item>上传数据</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="upload">
      <el-upload
        class="upload-demo"
        ref="upload"
        :headers="this.header"
        :action="this.$header + '/admin/Callcenter/uploadPhoneExcel'"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
    </div>

  
  <!-- </div> -->
</template>

<script>
import getAdminInfo from '@/utils/getAdminInfo.js';
export default {
    name:'UploadPhone',
    data(){
        return {
            fileList:[],
            info:{},
            header:{}
        }
    },
    created(){
      getAdminInfo(this.info)
      this.header = {
        "admin-info":this.info.admin_info,
        "admin-id":this.info.admin_id
      }
      
    },
    methods:{
      // 手动提交上传 
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 上传文件前的 校验
      beforeAvatarUpload(file) {
         console.log(file)
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xls'
            const extension2 = testmsg === 'xlsx'
            if(!extension && !extension2) {
                this.$message({
                    message: '上传文件只能是 xls、xlsx格式!',
                    type: 'error'
                });
            }
            return extension || extension2
      },
      // 上传文件成功回调 
       handleAvatarSuccess(res, file) {
         if(res.data.code == 200){
           this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
         }else{
           this.$message({
                    message: res,
                    type: 'error'
                });
         }
      },
      // 超出数量限制 函数
      handleExceed(files, fileList) {
        this.$message.warning(`每次只能上传一个文件！`);
      },
    }
}
</script>
<style lang="scss">
.settingContent{
  .cell{
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
    .settingContent{
        width: 1200px;
        min-height: 700px;
        background: #fff;
    }
    .small{
        width:400px;
    }
    .upload{
      width: 250px;
      padding: 10px;
    }
</style>