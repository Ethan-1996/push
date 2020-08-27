
module.exports = {
  lintOnSave: true,
  publicPath: './',
  productionSourceMap:false,  // 设置上线后是否加载webpack文件
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
