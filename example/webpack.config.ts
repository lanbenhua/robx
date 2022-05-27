import {
  defineConfig,
  WebpackConfigurations,
  WebpackConfigUserOptions,
} from '@shopee-data/webpack-base-config';

const userConfigs: WebpackConfigurations = {
  devServer: {
    proxy: {
      // proxy forward to the YAPI mock server
      '/api/mock': {
        target: `http://yapi.idata.shopee.io`,
        changeOrigin: true,
        pathRewrite: { '^/api/mock': '/mock/15' },
      },
      // proxy forward to the BE test APIs server
      '/ram/api': {
        target: `http://datasuite.test.shopee.io`,
        changeOrigin: true,
      },
      '/datasuite-homepage/api': {
        target: `http://datasuite.staging.shopee.io`,
        changeOrigin: true,
      },
    },
  },
};

const userOptions: WebpackConfigUserOptions = {
  plugins: {
    bundleAnalyzerPlugin: false,
  },
  externalCdnAssets: {
    echarts: {
      required: true,
    },
  },
};

module.exports = defineConfig(userConfigs, userOptions);
