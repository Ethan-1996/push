
module.exports = {
  lintOnSave: true,
  publicPath: './',
 
  devServer: {
    // https:true,
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'https://tlt.yanxuandan.com',   //代理接口 http://business.com
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'    //代理的路径
        }
      }
    }
  }
};
