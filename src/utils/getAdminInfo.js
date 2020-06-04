
import router from '../router/index.js';
export default function getAdminInfo(info) {
    //赋值 token 和 id
    if(localStorage.getItem('accessTokenAdmin')){
        info.admin_info = localStorage.getItem('accessTokenAdmin')
        info.admin_id = localStorage.getItem('user_idAdmin')
        return true
    }else if(sessionStorage.getItem('accessTokenAdmin')){
        info.admin_info = sessionStorage.getItem('accessTokenAdmin')
        info.admin_id = sessionStorage.getItem('user_idAdmin')
        return true
    }else{
        router.push("/AdminLogin")
        return false
    }
  }
          