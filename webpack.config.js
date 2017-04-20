var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');

var bannerPack = new webpack.BannerPlugin({
  banner:
    'HJtimeout v' + pkg.version + '\n' +
    'https://lw-ezio.com/\n' +
    'Copyright (c) 2017, Liang Yuyi',
  entryOnly: true
});
var constantPack = new webpack.DefinePlugin({
  QUILL_VERSION: JSON.stringify(pkg.version)
});

module.exports = {
  entry: "./HJtimeout.js",//入口文件
  output: {//打包输出的文件
    path: path.resolve(__dirname, 'dist'),
    filename: "HJtimeout.js",
    library: 'HJtimeout',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
    extensions: ['.js', '.json', '.coffee']
  }
};