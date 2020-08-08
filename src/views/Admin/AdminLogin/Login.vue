<template>
  <div class="Register">
    <div class="info">
      <p class="heng"></p>
      <p class="logtext">管理员登录</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        @submit.native.prevent
      >
        <el-form-item label prop="phone">
          <el-input
            v-model="ruleForm.phone"
            autocomplete="off"
            placeholder="请输入手机号码"
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>

        <el-form-item label prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="picCode">
          <div class="small">
            <el-input
              v-model="ruleForm.picCode"
              autocomplete="off"
              placeholder="请输入验证码"
              class="aaa"
              prefix-icon="el-icon-discount"
            ></el-input>
          </div>
          <el-image :src="imgUrl" alt class="picCode" @click="getPicCode"></el-image>
        </el-form-item>

        <el-form-item>
          <div class="btnBox">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :disabled="flag"
              native-type="submit"
            >登录</el-button>
            <!-- <span @click="fogetPas">忘记密码</span> -->
            <!-- <span>|</span><span @click="toregister" class="toregister">立即注册</span> -->
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { checkUser } from "@/api/adminApi.js";
export default {
  data() {
    return {
      imgUrl: "",
      flag: false,
      ruleForm: {
        phone: "",
        password: "",
        picCode: "",
      },
      rules: {
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        picCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getPicCode();
  },
  methods: {
    getPicCode() {
      //获取图片流 需设置文件类型 且 只此一例  所以不在 公共api内设置
      axios
        .get(
          this.$header + "/admin/Login/sendPic", //开发环境 反向代理
          {
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((data) => {
          this.imgUrl = data; //图片地址 <img src='data' />
        });
    },

    //fogetPas(){   //忘记密码跳转传参
    //this.$router.push({path:"/Register",query:{type:"forgetPas"}})
    //},
    // toregister(){   //直接跳转注册
    //     this.$router.push("/Register")
    // },
    toAdminIndex() {
      this.$router.push("/Admin");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.flag = true; //节流
          let data = {
            phone: this.ruleForm.phone,
            password: this.$md5("$" + this.ruleForm.password),
            pic_code: this.ruleForm.picCode,
          };
          checkUser(data).then((res) => {
            console.log("resssssssssssslogin", res);
            if (res.data.code == 200) {
              this.$confirm(
                "您已成功登录，是否保存用户信息用于下次登录?",
                "提示",
                {
                  confirmButtonText: "是",
                  cancelButtonText: "否",
                  type: "warning",
                }
              )
                .then(() => {
                  localStorage.setItem(
                    "accessTokenAdmin",
                    res.data.data.app_key
                  );
                  localStorage.setItem("user_idAdmin", res.data.data.admin_id);
                  localStorage.setItem("phoneAdmin", res.data.data.phone);
                  localStorage.setItem(
                    "role_list",
                    JSON.stringify(res.data.data.role_list)
                  );
                  // console.log(JSON.stringify(res.data.data.role_list));
                  this.$message({
                    type: "success",
                    message: "已保存您的信息!",
                  });
                  if (res.data.data.role_list == "") {
                    this.$message({
                      type: "info",
                      message: "您暂时无权限，请联系管理员!",
                    });
                  } else {
                    this.toAdminIndex();
                  }
                })
                .catch(() => {
                  sessionStorage.setItem(
                    "accessTokenAdmin",
                    res.data.data.app_key
                  );
                  sessionStorage.setItem(
                    "user_idAdmin",
                    res.data.data.admin_id
                  );
                  sessionStorage.setItem("phoneAdmin", res.data.data.phone);
                  sessionStorage.setItem(
                    "role_list",
                    JSON.stringify(res.data.data.role_list)
                  );
                  this.$message({
                    type: "info",
                    message: "已暂时记录信息，离开页面将删除",
                  });
                  if (res.data.data.role_list == "") {
                    this.$message({
                      type: "info",
                      message: "您暂时无权限，请联系管理员!",
                    });
                  } else {
                    this.toAdminIndex();
                  }
                });
              this.flag = false;
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error",
              });
              this.flag = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.Register {
  .el-input__inner {
    height: 60px;
    font-size: 18px;
  }
  .el-button,
  .el-button--info {
    height: 60px;
    font-size: 18px;
    width: 125px;
    color: #000;
    background: #eee;
    border: none;
  }
  .el-input__icon,
  .el-icon-postcard {
    line-height: 60px;
    font-size: 20px;
  }
  .btnBox {
    .el-button {
      width: 230px;
      height: 50px;
      background: #44b5f9;
      color: #fff;
    }
  }
}
</style>
<style lang="scss" scoped >
.Register {
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url("../../../assets/loginbg.png");
}
.info {
  position: absolute;
  left: 16.4%;
  top: 33.3%;
  width: 466px;
  .heng {
    width: 65px;
    height: 8px;
    background: #57b4fa;
  }
  .logtext {
    font-size: 40px;
    font-weight: 800;
    margin-top: 30px;
    margin-bottom: 60px;
  }
}
.small {
  width: 320px;
  display: inline-block;
  margin-right: 20px;
}
.picCode {
  width: 125px;
  height: 60px;
  vertical-align: middle;
}
.btnBox {
  span {
    position: relative;
    top: 16px;
    height: 20px;
    display: inline-block;
    color: #ccc;
  }
  span:nth-of-type(1) {
    margin-left: 20px;
    padding-right: 10px;
    cursor: pointer;
  }
}
.toregister {
  color: #57b4fa !important;
  padding-left: 10px;
  margin-left: 0px !important;
  cursor: pointer;
}
</style>