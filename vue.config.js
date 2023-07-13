const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
         isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  },
  transpileDependencies: true,
});
