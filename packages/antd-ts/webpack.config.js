const path = require('path')
const htmlWebpack = require('html-webpack-plugin')

module.exports = {
  // JavaScript 执行入口文件
  entry: './src/index.tsx',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[hash].bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        include: '/src/',
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [["import", { "libraryName": "antd", "style": "css" }]]
          }
        },
      },
      {
        test: /\.css?$/,
        // exclude: path.resolve(__dirname, 'node_modules'),
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.less$/,
      //   use: [{
      //     loader: 'style-loader'
      //   }, {
      //     loader: 'css-loader',
      //     options: {
      //       modules: true,
      //     }
      //   }, {
      //     loader: 'less-loader'
      //   }],
      //   include: path.resolve(__dirname, 'node_modules'),
      // },
      { test: /\.(tsx|ts)?$/, use: ['ts-loader'] }
    ]
  },
  plugins: [
    new htmlWebpack({
      title: 'Lixin App',
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    port: 9001,
    open: true,
  },
};